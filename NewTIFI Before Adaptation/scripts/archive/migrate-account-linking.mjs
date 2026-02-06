#!/usr/bin/env node

/**
 * Database Migration for Account Linking
 * Adds LinkedAccount table and migrates existing OAuth data
 */

import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

async function migrateAccountLinking() {
  console.log('🔄 Starting account linking migration...');
  
  try {
    // Get all users with OAuth data
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { googleId: { not: null } },
          { linkedinId: { not: null } }
        ]
      }
    });

    console.log(`📊 Found ${users.length} users with OAuth data`);

    for (const user of users) {
      console.log(`👤 Processing user: ${user.email}`);
      
      // Create linked accounts for existing OAuth data
      const linkedAccounts = [];
      
      if (user.googleId) {
        linkedAccounts.push({
          provider: 'google',
          providerId: user.googleId,
          email: user.email,
          name: user.name,
          avatarUrl: user.avatarUrl,
          isPrimary: true
        });
      }
      
      if (user.linkedinId) {
        linkedAccounts.push({
          provider: 'linkedin',
          providerId: user.linkedinId,
          email: user.email,
          name: user.name,
          avatarUrl: user.avatarUrl,
          isPrimary: !user.googleId // Primary if no Google account
        });
      }
      
      // Create linked accounts
      for (const account of linkedAccounts) {
        await prisma.linkedAccount.create({
          data: {
            userId: user.id,
            ...account
          }
        });
        console.log(`  ✅ Created ${account.provider} linked account`);
      }
    }

    // Create linked accounts for email/password users
    const emailUsers = await prisma.user.findMany({
      where: {
        AND: [
          { passwordHash: { not: null } },
          { googleId: null },
          { linkedinId: null }
        ]
      }
    });

    console.log(`📧 Found ${emailUsers.length} email/password users`);

    for (const user of emailUsers) {
      await prisma.linkedAccount.create({
        data: {
          userId: user.id,
          provider: 'email',
          providerId: null,
          email: user.email,
          name: user.name,
          avatarUrl: user.avatarUrl,
          isPrimary: true
        }
      });
      console.log(`  ✅ Created email linked account for ${user.email}`);
    }

    console.log('✅ Account linking migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run migration
migrateAccountLinking().catch(console.error);

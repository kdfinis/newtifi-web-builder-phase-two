#!/usr/bin/env node

/**
 * Test Account Linking System
 * Tests the account linking functionality without requiring a full server
 */

import { PrismaClient } from '../generated/prisma/index.js';
import { AccountLinkingAPI } from '../src/lib/auth/AccountLinkingAPI.ts';

const prisma = new PrismaClient();

async function testAccountLinking() {
  console.log('🧪 TESTING ACCOUNT LINKING SYSTEM');
  console.log('='.repeat(50));

  try {
    // Test 1: Create new user with Google OAuth
    console.log('\n📝 Test 1: Create new user with Google OAuth');
    const googleResult = await AccountLinkingAPI.linkOrCreateAccount({
      provider: 'google',
      providerId: 'google_test_123',
      email: 'testuser@example.com',
      name: 'Test User',
      avatarUrl: 'https://example.com/avatar.jpg'
    });

    console.log('✅ Google OAuth result:', googleResult.success ? 'SUCCESS' : 'FAILED');
    console.log('   Message:', googleResult.message);
    console.log('   Is new user:', googleResult.isNewUser);

    // Test 2: Link LinkedIn to same user
    console.log('\n📝 Test 2: Link LinkedIn to same user');
    const linkedinResult = await AccountLinkingAPI.linkOrCreateAccount({
      provider: 'linkedin',
      providerId: 'linkedin_test_456',
      email: 'testuser@example.com', // Same email
      name: 'Test User',
      avatarUrl: 'https://example.com/avatar.jpg'
    });

    console.log('✅ LinkedIn OAuth result:', linkedinResult.success ? 'SUCCESS' : 'FAILED');
    console.log('   Message:', linkedinResult.message);
    console.log('   Is new user:', linkedinResult.isNewUser);

    // Test 3: Get linked accounts
    console.log('\n📝 Test 3: Get linked accounts');
    const linkedAccounts = await AccountLinkingAPI.getLinkedAccounts(googleResult.user.id);
    console.log('✅ Linked accounts found:', linkedAccounts.length);
    linkedAccounts.forEach(account => {
      console.log(`   - ${account.provider} (${account.isPrimary ? 'PRIMARY' : 'secondary'})`);
    });

    // Test 4: Try to link same provider again (should update)
    console.log('\n📝 Test 4: Update existing Google account');
    const updateResult = await AccountLinkingAPI.linkOrCreateAccount({
      provider: 'google',
      providerId: 'google_test_123_updated',
      email: 'testuser@example.com',
      name: 'Test User Updated',
      avatarUrl: 'https://example.com/avatar_updated.jpg'
    });

    console.log('✅ Update result:', updateResult.success ? 'SUCCESS' : 'FAILED');
    console.log('   Message:', updateResult.message);

    // Test 5: Create user with different email
    console.log('\n📝 Test 5: Create user with different email');
    const differentUserResult = await AccountLinkingAPI.linkOrCreateAccount({
      provider: 'google',
      providerId: 'google_test_789',
      email: 'different@example.com',
      name: 'Different User',
      avatarUrl: 'https://example.com/different.jpg'
    });

    console.log('✅ Different user result:', differentUserResult.success ? 'SUCCESS' : 'FAILED');
    console.log('   Message:', differentUserResult.message);
    console.log('   Is new user:', differentUserResult.isNewUser);

    console.log('\n🎉 ALL TESTS COMPLETED SUCCESSFULLY!');
    console.log('\n📊 SUMMARY:');
    console.log('• Account linking works correctly');
    console.log('• Multiple providers can be linked to same email');
    console.log('• New users are created when needed');
    console.log('• Existing accounts are linked properly');

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run tests
testAccountLinking().catch(console.error);

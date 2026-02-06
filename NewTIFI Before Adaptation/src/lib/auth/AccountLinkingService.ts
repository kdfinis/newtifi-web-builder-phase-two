/**
 * Account Linking Service
 * Handles linking OAuth accounts to existing users by email
 */

import { PrismaClient } from '../../generated/prisma/index.js';

const prisma = new PrismaClient();

export interface OAuthUserData {
  provider: 'google' | 'linkedin';
  providerId: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

export interface LinkedAccount {
  id: string;
  provider: string;
  providerId: string | null;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  isPrimary: boolean;
}

export class AccountLinkingService {
  /**
   * Link or create account for OAuth user
   */
  static async linkOrCreateAccount(oauthData: OAuthUserData) {
    try {
      // First, check if user exists by email
      let user = await prisma.user.findUnique({
        where: { email: oauthData.email },
        include: { linkedAccounts: true }
      });

      if (user) {
        // User exists - check if this provider is already linked
        const existingLink = user.linkedAccounts.find(
          account => account.provider === oauthData.provider
        );

        if (existingLink) {
          // Update existing linked account
          await prisma.linkedAccount.update({
            where: { id: existingLink.id },
            data: {
              providerId: oauthData.providerId,
              name: oauthData.name,
              avatarUrl: oauthData.avatarUrl,
              updatedAt: new Date()
            }
          });
          console.log(`✅ Updated existing ${oauthData.provider} link for ${user.email}`);
        } else {
          // Link new provider to existing user
          await prisma.linkedAccount.create({
            data: {
              userId: user.id,
              provider: oauthData.provider,
              providerId: oauthData.providerId,
              email: oauthData.email,
              name: oauthData.name,
              avatarUrl: oauthData.avatarUrl,
              isPrimary: false // Don't override existing primary
            }
          });
          console.log(`✅ Linked ${oauthData.provider} to existing user ${user.email}`);
        }

        // Update user's OAuth IDs for backward compatibility
        const updateData: any = {};
        if (oauthData.provider === 'google') {
          updateData.googleId = oauthData.providerId;
        } else if (oauthData.provider === 'linkedin') {
          updateData.linkedinId = oauthData.providerId;
        }

        if (Object.keys(updateData).length > 0) {
          await prisma.user.update({
            where: { id: user.id },
            data: updateData
          });
        }

        return {
          success: true,
          user: user,
          isNewUser: false,
          message: `Linked ${oauthData.provider} to existing account`
        };

      } else {
        // User doesn't exist - create new user and linked account
        const newUser = await prisma.user.create({
          data: {
            email: oauthData.email,
            name: oauthData.name,
            avatarUrl: oauthData.avatarUrl,
            role: 'MEMBER',
            [oauthData.provider === 'google' ? 'googleId' : 'linkedinId']: oauthData.providerId
          }
        });

        // Create primary linked account
        await prisma.linkedAccount.create({
          data: {
            userId: newUser.id,
            provider: oauthData.provider,
            providerId: oauthData.providerId,
            email: oauthData.email,
            name: oauthData.name,
            avatarUrl: oauthData.avatarUrl,
            isPrimary: true
          }
        });

        console.log(`✅ Created new user and linked ${oauthData.provider} account for ${oauthData.email}`);

        return {
          success: true,
          user: newUser,
          isNewUser: true,
          message: `Created new account with ${oauthData.provider}`
        };
      }

    } catch (error) {
      console.error('❌ Account linking failed:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to link account'
      };
    }
  }

  /**
   * Get all linked accounts for a user
   */
  static async getLinkedAccounts(userId: string): Promise<LinkedAccount[]> {
    try {
      const linkedAccounts = await prisma.linkedAccount.findMany({
        where: { userId },
        orderBy: [
          { isPrimary: 'desc' },
          { createdAt: 'asc' }
        ]
      });

      return linkedAccounts.map(account => ({
        id: account.id,
        provider: account.provider,
        providerId: account.providerId,
        email: account.email,
        name: account.name,
        avatarUrl: account.avatarUrl,
        isPrimary: account.isPrimary
      }));

    } catch (error) {
      console.error('❌ Failed to get linked accounts:', error);
      return [];
    }
  }

  /**
   * Unlink an account
   */
  static async unlinkAccount(userId: string, accountId: string) {
    try {
      const account = await prisma.linkedAccount.findFirst({
        where: { id: accountId, userId }
      });

      if (!account) {
        throw new Error('Account not found');
      }

      if (account.isPrimary) {
        throw new Error('Cannot unlink primary account');
      }

      await prisma.linkedAccount.delete({
        where: { id: accountId }
      });

      console.log(`✅ Unlinked ${account.provider} account for user ${userId}`);
      return { success: true };

    } catch (error) {
      console.error('❌ Failed to unlink account:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Set primary account
   */
  static async setPrimaryAccount(userId: string, accountId: string) {
    try {
      // First, unset all primary accounts
      await prisma.linkedAccount.updateMany({
        where: { userId },
        data: { isPrimary: false }
      });

      // Set new primary
      await prisma.linkedAccount.update({
        where: { id: accountId },
        data: { isPrimary: true }
      });

      console.log(`✅ Set primary account for user ${userId}`);
      return { success: true };

    } catch (error) {
      console.error('❌ Failed to set primary account:', error);
      return { success: false, error: error.message };
    }
  }
}

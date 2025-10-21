// Simple in-memory database for Render free tier
// This replaces Prisma for OAuth functionality

const users = new Map();
const sessions = new Map();

class SimpleDB {
  // User operations
  async findUserByEmail(email) {
    return users.get(email) || null;
  }

  async findUserByGoogleId(googleId) {
    for (const user of users.values()) {
      if (user.googleId === googleId) return user;
    }
    return null;
  }

  async findUserByLinkedInId(linkedinId) {
    for (const user of users.values()) {
      if (user.linkedinId === linkedinId) return user;
    }
    return null;
  }

  async createUser(userData) {
    const user = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: userData.email,
      name: userData.name,
      googleId: userData.googleId,
      linkedinId: userData.linkedinId,
      avatarUrl: userData.avatarUrl,
      role: 'MEMBER',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    users.set(user.email, user);
    return user;
  }

  async updateUser(email, updates) {
    const user = users.get(email);
    if (user) {
      Object.assign(user, updates, { updatedAt: new Date() });
      users.set(email, user);
    }
    return user;
  }

  // Session operations
  async createSession(userId, sessionId) {
    sessions.set(sessionId, { userId, createdAt: new Date() });
  }

  async findSession(sessionId) {
    return sessions.get(sessionId) || null;
  }

  async deleteSession(sessionId) {
    sessions.delete(sessionId);
  }
}

module.exports = new SimpleDB();

import { PrismaClient } from '../generated/prisma/index.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@newtifi.org' },
    update: {},
    create: {
      email: 'admin@newtifi.org',
      passwordHash: hash,
      name: 'Admin',
      role: 'ADMIN'
    }
  });
  console.log('✅ Admin user created: admin@newtifi.org / admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

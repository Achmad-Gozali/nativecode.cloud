import 'dotenv/config';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const email = 'admin@nativecode.id';
  const passwordPlain = 'nativecode123';
  const passwordHash = await bcrypt.hash(passwordPlain, 10);

  const admin = await prisma.admin.upsert({
    where: { email },
    update: {},
    create: {
      email,
      passwordHash,
      nama: 'Admin nativecode.id',
    },
  });

  console.log('Akun admin siap:', admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
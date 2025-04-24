import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
      password: 'A123',
      createdAt: new Date('2025-04-19') // Fournir une instance de Date
    },
  })

  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
     name: 'Bob',
      firstname: 'Bob',
      password: 'B456',
      createdAt: new Date('2025-04-19') // Fournir une instance de Date
    },
  })

  console.log({ alice, bob })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
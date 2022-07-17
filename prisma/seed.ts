import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.$connect();
    await seedUsers()
}

async function seedUsers() {
    if (await prisma.user.count() > 0) {
        return;
    }

    await prisma.user.create({
        data: {
            id: 1,
            uid: "wrC7sct9aRtVzPfK",
            username: "admin",
        }
    })
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
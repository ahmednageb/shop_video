import { PrismaClient } from "@/generated/prisma/client"

const prismaClientSingleton = () => {
    return new PrismaClient()
}

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const db = globalThis.prisma ?? prismaClientSingleton()

export default db

if (process.env.DATABASE_URL !== "production") globalThis.prisma = db

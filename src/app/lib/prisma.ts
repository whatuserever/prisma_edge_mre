import { PrismaClient } from "@prisma/client";

function createExtendedPrismaClient() {
  return new PrismaClient().$extends({
    result: {
      user: {
        fullName: {
          // the dependencies
          needs: { firstName: true, lastName: true },
          compute(user) {
            // the computation logic
            return `${user.firstName} ${user.lastName}`
          },
        },
      },
    }
  })
}

type ExtendedPrismaClient = ReturnType<typeof createExtendedPrismaClient>;

const globalForPrisma = global as unknown as { prisma: ExtendedPrismaClient };

export const prisma = globalForPrisma.prisma || createExtendedPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
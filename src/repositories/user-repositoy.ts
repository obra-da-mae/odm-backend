import { PrismaClient } from "@prisma/client";

export const userRepository = new PrismaClient().user;

import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
import { prismaClient as prisma } from "../../src/database/prisma.client";

jest.mock("../../src/database/prisma.client", () => ({
  __esModule: true,
  prismaClient: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
  console.log("Mock do Prisma resetado"); // Log para depuração
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
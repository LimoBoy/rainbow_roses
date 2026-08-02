import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({
  adapter,
});
const userData: Prisma.UserCreateInput[] = [
  {
    firstName: "Alice",
    email: "alice@prisma.io",
    posts: {
      create: [
        {
          title: "Join the Prisma Discord",
          content: "https://pris.ly/discord",
          published: true,
        },
        {
          title: "Prisma on YouTube",
          content: "https://pris.ly/youtube",
        },
      ],
    },
    password: "$2b$12$8xYJWi0lAJG/Zg3B.vhPLuO9oYvtU6z1DTJ7qZvUGZiZ71yrtSe1e",
    activationCode: ""
  },
  {
    firstName: "Bob",
    email: "bob@prisma.io",
    posts: {
      create: [
        {
          title: "Follow Prisma on Twitter",
          content: "https://www.twitter.com/prisma",
          published: true,
        },
      ],
    },
    password: "$2b$12$8xYJWi0lAJG/Zg3B.vhPLuO9oYvtU6z1DTJ7qZvUGZiZ71yrtSe1e",
    activationCode: ""
  },
];
export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}
main();
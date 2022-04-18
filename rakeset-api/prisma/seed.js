const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const potato = await prisma.user.upsert({
    where: { id: "1" },
    update: {},
    create: {
      id: "1",
      username: "potato",
      tinyURLs: {
        create: [
          {
            id: "twitter",
            url: "https://en.wikipedia.org/wiki/Darvaza_gas_crater",
          },
          {
            id: "chud",
            url: "https://en.wikipedia.org/wiki/C.H.U.D.",
          },
          {
            id: "horse",
            url: "https://en.wikipedia.org/wiki/Potoooooooo",
          },
        ],
      },
    },
  });

  const bob = await prisma.user.upsert({
    where: { id: "2" },
    update: {},
    create: {
      id: "2",
      username: "pepper",
      tinyURLs: {
        create: [
          {
            id: "yo",
            url: "https://en.wikipedia.org/wiki/Yo_(app)",
          },
          {
            id: "lol",
            url: "https://en.wikipedia.org/wiki/Paint_Drying",
          },
        ],
      },
    },
  });
  console.log({ potato, bob });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

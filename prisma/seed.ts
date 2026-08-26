import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.serviceProfile.findFirst();
  if (!existing) {
    await prisma.serviceProfile.create({
      data: {
        offer:
          "I build clean, modern websites for local businesses so customers can find you and get in touch easily.",
        fromName: "Scouter",
        fromEmail: process.env.RESEND_FROM_EMAIL ?? "",
        pitchTone: "friendly and professional",
        cta: "Would you be open to a quick 15-minute call this week?",
      },
    });
    console.log("Seeded ServiceProfile");
  } else {
    console.log("ServiceProfile already exists, skipping");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

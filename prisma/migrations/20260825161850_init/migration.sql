-- CreateTable
CREATE TABLE "ServiceProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "offer" TEXT NOT NULL DEFAULT 'Custom websites for local businesses',
    "fromName" TEXT NOT NULL DEFAULT 'Scouter',
    "fromEmail" TEXT NOT NULL DEFAULT '',
    "pitchTone" TEXT NOT NULL DEFAULT 'friendly and professional',
    "cta" TEXT NOT NULL DEFAULT 'Would you be open to a quick 15-minute call this week?',
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "businessName" TEXT NOT NULL,
    "category" TEXT,
    "city" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "websiteUrl" TEXT,
    "source" TEXT NOT NULL DEFAULT 'Google Business',
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Pitch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "leadId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "sentAt" DATETIME,
    CONSTRAINT "Pitch_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EmailEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "leadId" TEXT NOT NULL,
    "pitchId" TEXT NOT NULL,
    "providerId" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EmailEvent_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "EmailEvent_pitchId_fkey" FOREIGN KEY ("pitchId") REFERENCES "Pitch" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

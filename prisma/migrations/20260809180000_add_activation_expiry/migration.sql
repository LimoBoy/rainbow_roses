-- An activation token is single-use and only valid for a limited time.
ALTER TABLE "User"
ADD COLUMN "activationExpiresAt" TIMESTAMP(3);

ALTER TABLE "User"
ALTER COLUMN "activationCode" DROP NOT NULL;

-- Existing seeded/legacy accounts used an empty string as a placeholder. Convert
-- it before enforcing uniqueness so those accounts can request a fresh link.
UPDATE "User" SET "activationCode" = NULL WHERE "activationCode" = '';

CREATE UNIQUE INDEX "User_activationCode_key" ON "User"("activationCode");

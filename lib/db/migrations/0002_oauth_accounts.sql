CREATE TABLE IF NOT EXISTS "oauth_accounts" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "provider" varchar(255) NOT NULL,
  "providerAccountId" varchar(255) NOT NULL,
  "refresh_token" text,
  "access_token" text,
  "expires_at" timestamp,
  "token_type" varchar(255),
  "scope" varchar(255),
  "id_token" text,
  "session_state" varchar(255),
  UNIQUE("provider", "providerAccountId")
);

CREATE INDEX "oauth_accounts_userId_idx" ON "oauth_accounts"("userId");
CREATE INDEX "oauth_accounts_provider_providerAccountId_idx" ON "oauth_accounts"("provider", "providerAccountId");


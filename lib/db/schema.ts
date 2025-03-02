import { pgTable, text, timestamp, uuid, varchar, boolean, json, index, date } from "drizzle-orm/pg-core"
import { relations, type InferModel } from "drizzle-orm"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

// Users table
export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name"),
    email: text("email").unique().notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    password: text("password"), // Add this line
    image: text("image"),
    role: text("role").default("user").notNull(),
    metadata: json("metadata").$type<Record<string, any>>(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (table) => ({
    emailIdx: index("email_idx").on(table.email),
  }),
)

// OAuth accounts linked to users
export const oauthAccounts = pgTable(
  "oauth_accounts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: timestamp("expires_at", { mode: "date" }),
    tokenType: varchar("token_type", { length: 255 }),
    scope: text("scope"),
    idToken: text("id_token"),
    sessionState: text("session_state"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (table) => ({
    providerAccountIdx: index("provider_account_idx").on(table.provider, table.providerAccountId),
    userIdIdx: index("user_id_idx").on(table.userId),
  }),
)

// Sessions for authenticated users
export const sessions = pgTable(
  "sessions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    // Additional session data
    userAgent: text("user_agent"),
    ipAddress: text("ip_address"),
    lastActive: timestamp("last_active").defaultNow(),
    isValid: boolean("is_valid").default(true),
  },
  (table) => ({
    userIdIdx: index("session_user_id_idx").on(table.userId),
    expiresAtIdx: index("session_expires_at_idx").on(table.expiresAt),
  }),
)

// Verification tokens for email verification
export const verificationTokens = pgTable(
  "verification_tokens",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    token: varchar("token", { length: 255 }).notNull(),
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 }).notNull(), // 'email', 'password-reset', etc.
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (table) => ({
    tokenIdx: index("token_idx").on(table.token),
    userIdIdx: index("verification_user_id_idx").on(table.userId),
    expiresAtIdx: index("verification_expires_at_idx").on(table.expiresAt),
  }),
)

export const meetings = pgTable("meetings", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  service: text("service").notNull(),
  date: date("date").notNull(),
  message: text("message"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

// Define relations between tables
export const usersRelations = relations(users, ({ many }) => ({
  oauthAccounts: many(oauthAccounts),
  sessions: many(sessions),
  verificationTokens: many(verificationTokens),
}))

export const oauthAccountsRelations = relations(oauthAccounts, ({ one }) => ({
  user: one(users, {
    fields: [oauthAccounts.userId],
    references: [users.id],
  }),
}))

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}))

export const verificationTokensRelations = relations(verificationTokens, ({ one }) => ({
  user: one(users, {
    fields: [verificationTokens.userId],
    references: [users.id],
  }),
}))

// Types
export type User = InferModel<typeof users>
export type NewUser = InferModel<typeof users, "insert">
export type OAuthAccount = InferModel<typeof oauthAccounts>
export type NewOAuthAccount = InferModel<typeof oauthAccounts, "insert">
export type Session = InferModel<typeof sessions>
export type NewSession = InferModel<typeof sessions, "insert">
export type VerificationToken = InferModel<typeof verificationTokens>
export type NewVerificationToken = InferModel<typeof verificationTokens, "insert">

// Zod Schemas for validation
export const insertUserSchema = createInsertSchema(users)
export const selectUserSchema = createSelectSchema(users)
export const insertOAuthAccountSchema = createInsertSchema(oauthAccounts)
export const selectOAuthAccountSchema = createSelectSchema(oauthAccounts)
export const insertSessionSchema = createInsertSchema(sessions)
export const selectSessionSchema = createSelectSchema(sessions)
export const insertVerificationTokenSchema = createInsertSchema(verificationTokens)
export const selectVerificationTokenSchema = createSelectSchema(verificationTokens)

// Custom Zod schemas for specific operations
export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  image: z.string().url().optional(),
})

export const updateUserSchema = z.object({
  name: z.string().optional(),
  image: z.string().url().optional(),
  metadata: z.record(z.any()).optional(),
})

export const createSessionSchema = z.object({
  userId: z.string().uuid(),
  userAgent: z.string().optional(),
  ipAddress: z.string().optional(),
})


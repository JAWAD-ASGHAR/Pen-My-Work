import { pgTable, text, uuid, timestamp, integer, boolean, serial } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const assignment = pgTable("assignment", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  paper: text("paper").notNull(), 
  ink: text("ink").notNull(), 
  text: text("text").notNull(), 
  specialQuery: text("special_query"), 
  imageURLs: text("image_urls").array(),
  resultImageURL: text("result_image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}).enableRLS();

export const paperImages = pgTable("paper_images", {
  paperName: text("paper_name").primaryKey(),
  imageURLs: text("image_urls").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}).enableRLS();

export const plans = pgTable('plan', {
  planId: text("plan_id").notNull().primaryKey(),
  productId: integer('productId'),
  productName: text('productName'),
  variantId: integer('variantId').unique(),
  name: text('name').notNull(),
  description: text('description'),
  price: text('price').notNull(),
  isUsageBased: boolean('isUsageBased').default(false),
  interval: text('interval'),
  intervalCount: integer('intervalCount'),
  trialInterval: text('trialInterval'),
  trialIntervalCount: integer('trialIntervalCount'),
  sort: integer('sort'),
  features: text('features').array(),
  limitations: text('limitations').array(),
})
.enableRLS(); 

export const subscriptions = pgTable('subscription', {
  id: serial('id').primaryKey(),
  lemonSqueezyId: text('lemonSqueezyId').unique().notNull(),
  orderId: integer('orderId').notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  status: text('status').notNull(),
  statusFormatted: text('statusFormatted').notNull(),
  renewsAt: text('renewsAt'),
  endsAt: text('endsAt'),
  trialEndsAt: text('trialEndsAt'),
  price: text('price').notNull(),
  isUsageBased: boolean('isUsageBased').default(false),
  isPaused: boolean('isPaused').default(false),
  subscriptionItemId: serial('subscriptionItemId'),
  userId: text('userId')
    .notNull().unique()
    .references(() => user.id),
  planId: text('planId')
    .notNull()
    .references(() => plans.planId),
})

export const userCredits = pgTable('user_credits', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  totalCredits: integer('total_credits').notNull().default(0),
  usedCredits: integer('used_credits').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}).enableRLS();
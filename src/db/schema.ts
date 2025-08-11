import { pgTable, text, uuid, timestamp, integer, serial, boolean } from "drizzle-orm/pg-core";
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
  productId: integer('productId').notNull(),
  productName: text('productName'),
  variantId: integer('variantId').notNull().unique(),
  name: text('name').notNull(),
  description: text('description'),
  price: text('price').notNull(),
  isUsageBased: boolean('isUsageBased').default(false),
  interval: text('interval'),
  intervalCount: integer('intervalCount'),
  trialInterval: text('trialInterval'),
  trialIntervalCount: integer('trialIntervalCount'),
  sort: integer('sort'),
})
.enableRLS(); 

export const userPlans = pgTable("user_plans",{
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  planId: text("plan_id").notNull().references(() => plans.planId, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}).enableRLS();
import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
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
});

export const paperImages = pgTable("paper_images", {
  paperName: text("paper_name").primaryKey(),
  imageURLs: text("image_urls").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
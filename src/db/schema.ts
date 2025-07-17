import { pgTable, text, uuid, timestamp, boolean, jsonb, integer } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const client = pgTable("client", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  company: text("company"),
  email: text("email"),
  industry: text("industry"),
  notes: text("notes"),
  additionalInfo: jsonb("additional_info"),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const project = pgTable("project", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id").notNull().references(() => client.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  budget: integer("budget"),
  status: text("status").default("in-progress"),
  additionalInfo: jsonb("additional_info"),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const screen = pgTable("screen", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").notNull().references(() => project.id, { onDelete: "cascade" }),
  clientId: uuid("client_id").notNull().references(() => client.id, { onDelete: "cascade" }),
  // userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  type: text("type").notNull(), // e.g. "proposal", "thank_you", "invoice"
  title: text("title"),
  templateId: uuid("template_id"), // optional reference
  status: text("status").default("draft"), // "draft", "final", "exported"
  aiPrompt: text("ai_prompt"),
  aiResponse: text("ai_response"),
  html: text("html"), // editable HTML or markdown
  css: text("css"), // editable HTML or markdown
  exportedAt: timestamp("exported_at"),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const template = pgTable("template", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  type: text("type").notNull(), 
  description: text("description"),
  html: text("html"), 
  css: text("css"),
  active: boolean("active").default(true),
  // createdBy: text("created_by").references(() => user.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const favoriteTemplate = pgTable("favorite_template", {
  id: uuid("id").primaryKey().defaultRandom(),
  templateId: uuid("template_id").notNull().references(() => template.id),
  userId: text("user_id").notNull().references(() => user.id),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const exportLog = pgTable("export_log", {
  id: uuid("id").primaryKey().defaultRandom(),
  screenId: uuid("screen_id").notNull().references(() => screen.id),
  userId: text("user_id").notNull().references(() => user.id),
  exportUrl: text("export_url"),
  exportedAt: timestamp("exported_at").defaultNow().notNull(),
});
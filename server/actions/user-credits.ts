"use server"
import { userCredits } from "@/src/db/schema";
import { db } from "@/src/db";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { headers } from "next/headers";

export const getUserCredits = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    throw new Error('User not authenticated')
  }
  const userId = session.user.id;
  let userCreditsData = await db.select().from(userCredits).where(eq(userCredits.userId, userId));
  if (!userCreditsData[0]) {
    await db.insert(userCredits).values({ userId, totalCredits: 10, usedCredits: 0 });
    userCreditsData = await db.select().from(userCredits).where(eq(userCredits.userId, userId));
  }
  return userCreditsData[0];
};  

export const updateUserCredits = async (userId: string, totalCredits: number, usedCredits: number) => {
  let userCreditsData = await db.update(userCredits).set({ totalCredits, usedCredits }).where(eq(userCredits.userId, userId)).returning();
  if (userCreditsData.length === 0) {
    return await db.insert(userCredits).values({ userId, totalCredits, usedCredits }).returning();
  }
  return userCreditsData[0];
};

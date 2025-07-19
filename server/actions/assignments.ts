"use server"

import { auth } from "@/auth"
import { db } from "@/src/db"
import { assignment } from "@/src/db/schema"
import { eq, desc } from "drizzle-orm"
import { headers } from "next/headers"

export type Assignment = {
  id: string
  paper: string
  ink: string
  text: string
  specialQuery?: string
  imageURLs?: string[]
  resultImageURL?: string
  createdAt: Date
  updatedAt: Date
}

export async function getAssignments(): Promise<Assignment[]> {
  try {
    const headersList = await headers()
    const session = await auth.api.getSession({ headers: headersList })
    
    if (!session?.user?.id) {
      throw new Error("Unauthorized")
    }

    const assignments = await db
      .select()
      .from(assignment)
      .where(eq(assignment.userId, session.user.id))
      .orderBy(desc(assignment.createdAt))

    // Transform the database results to match our Assignment type
    return assignments.map(assignment => ({
      id: assignment.id,
      paper: assignment.paper,
      ink: assignment.ink,
      text: assignment.text,
      specialQuery: assignment.specialQuery || undefined,
      imageURLs: assignment.imageURLs || undefined,
      resultImageURL: assignment.resultImageURL || undefined,
      createdAt: assignment.createdAt,
      updatedAt: assignment.updatedAt,
    }))
  } catch (error) {
    console.error("Error fetching assignments:", error)
    return []
  }
}

export async function getAssignmentById(id: string): Promise<Assignment | null> {
  try {
    const headersList = await headers()
    const session = await auth.api.getSession({ headers: headersList })
    
    if (!session?.user?.id) {
      throw new Error("Unauthorized")
    }

    const assignments = await db
      .select()
      .from(assignment)
      .where(eq(assignment.id, id))
      .limit(1)

    if (assignments.length === 0) {
      return null
    }

    const assignmentData = assignments[0]
    
    // Transform the database result to match our Assignment type
    return {
      id: assignmentData.id,
      paper: assignmentData.paper,
      ink: assignmentData.ink,
      text: assignmentData.text,
      specialQuery: assignmentData.specialQuery || undefined,
      imageURLs: assignmentData.imageURLs || undefined,
      resultImageURL: assignmentData.resultImageURL || undefined,
      createdAt: assignmentData.createdAt,
      updatedAt: assignmentData.updatedAt,
    }
  } catch (error) {
    console.error("Error fetching assignment:", error)
    return null
  }
} 
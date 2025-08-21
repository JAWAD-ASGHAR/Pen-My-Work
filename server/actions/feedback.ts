'use server'

import { db } from "@/src/db"
import { feedback } from "@/src/db/schema"

interface FeedBackSchema{
    name:string,
    email:string,
    message:string,
    subject:string,
}


export async function sendFeedback(formData: FeedBackSchema) {
    try{
        const {email,message,name,subject} = formData
       return await db.insert(feedback).values({email,message,name,subject}).returning()
        
    }catch(error){
        console.error(error)
        throw new Error("Failed to send feedback")
    }
}

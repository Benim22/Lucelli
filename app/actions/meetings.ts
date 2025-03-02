"use server"

import { db } from "@/lib/db"
import { meetings } from "@/lib/db/schema"
import { revalidatePath } from "next/cache"
import { sendMeetingNotification } from "@/lib/email/meeting-notification"

export async function createMeeting(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const company = formData.get("company") as string
    const service = formData.get("service") as string
    const date = formData.get("date") as string
    const message = formData.get("message") as string

    // Validate the data
    if (!name || !email || !service || !date) {
      throw new Error("Missing required fields")
    }

    // Insert the meeting into the database
    const result = await db.insert(meetings).values({
      name,
      email,
      phone,
      company,
      service,
      date: new Date(date),
      message,
    })

    // Send email notification
    await sendMeetingNotification({
      name,
      email,
      phone,
      company,
      service,
      date: new Date(date),
      message,
    })

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error creating meeting:", error)
    return { success: false, error: "Failed to create meeting" }
  }
}


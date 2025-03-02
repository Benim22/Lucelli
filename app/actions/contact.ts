"use server"

import { sendContactNotification } from "@/lib/email/contact-notification"

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    // Validate the data
    if (!name || !email || !message) {
      throw new Error("Missing required fields")
    }

    // Send email notification
    await sendContactNotification({
      name,
      email,
      subject,
      message,
    })

    return { success: true }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return { success: false, error: "Failed to submit contact form" }
  }
}


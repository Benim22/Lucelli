import { sendEmail } from "./mailer-send"

interface ContactNotificationProps {
  name: string
  email: string
  subject?: string
  message: string
}

export async function sendContactNotification(contact: ContactNotificationProps) {
  try {
    const { name, email, subject, message } = contact

    // Create HTML content for the email
    const html = `
      <h1>New Contact Form Submission</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject || "N/A"}</p>
      <h2>Message:</h2>
      <p>${message}</p>
    `

    // Create plain text version
    const text = `
      New Contact Form Submission
      
      Name: ${name}
      Email: ${email}
      Subject: ${subject || "N/A"}
      
      Message:
      ${message}
    `

    // Send email to admin
    await sendEmail({
      to: [{ email: process.env.ADMIN_EMAIL || "admin@lucelli.se", name: "Lucelli Admin" }],
      subject: `New Contact Form: ${subject || "Website Inquiry"}`,
      html,
      text,
    })

    return true
  } catch (error) {
    console.error("Failed to send contact email:", error)
    throw new Error("Failed to send contact notification")
  }
}


import { MailerSend } from "mailersend"

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || "",
})

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: { email: string; name?: string }[]
  subject: string
  html: string
  text?: string
}) {
  try {
    const response = await mailerSend.email.send({
      from: {
        email: process.env.MAILERSEND_FROM_EMAIL || "",
        name: process.env.MAILERSEND_FROM_NAME || "Lucelli",
      },
      to: to.map((recipient) => ({
        email: recipient.email,
        name: recipient.name || recipient.email,
      })),
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ""), // Fallback to stripped HTML if no text provided
    })

    console.log("Email sent successfully:", response)
    return response
  } catch (error) {
    console.error("Error sending email:", error)
    throw error
  }
}


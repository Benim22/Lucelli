import { sendEmail } from "./mailer-send"

interface MeetingNotificationProps {
  name: string
  email: string
  phone?: string
  company?: string
  service: string
  date: Date
  message?: string
}

export async function sendMeetingNotification(meeting: MeetingNotificationProps) {
  try {
    const { name, email, phone, company, service, date, message } = meeting

    // Format date
    const formattedDate = date.toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

    // Create HTML content for the email
    const html = `
      <h1>New Meeting Request</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      <p><strong>Company:</strong> ${company || "N/A"}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Requested Date:</strong> ${formattedDate}</p>
      <h2>Message:</h2>
      <p>${message || "No message provided"}</p>
    `

    // Create plain text version
    const text = `
      New Meeting Request
      
      Name: ${name}
      Email: ${email}
      Phone: ${phone || "N/A"}
      Company: ${company || "N/A"}
      Service: ${service}
      Requested Date: ${formattedDate}
      
      Message:
      ${message || "No message provided"}
    `

    // Send email to admin
    await sendEmail({
      to: [{ email: process.env.ADMIN_EMAIL || "admin@lucelli.se", name: "Lucelli Admin" }],
      subject: `New Meeting Request: ${service}`,
      html,
      text,
    })

    // Send confirmation email to user
    await sendEmail({
      to: [{ email, name }],
      subject: "Your Meeting Request Confirmation",
      html: `
        <h1>Thank you for your meeting request!</h1>
        <p>Dear ${name},</p>
        <p>We have received your request for a meeting regarding ${service} on ${formattedDate}.</p>
        <p>Our team will review your request and get back to you shortly to confirm the details.</p>
        <p>Best regards,<br>The Lucelli Team</p>
      `,
    })

    return true
  } catch (error) {
    console.error("Failed to send email:", error)
    throw new Error("Failed to send meeting notification")
  }
}


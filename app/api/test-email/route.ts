import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/email/mailer-send"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const testEmail = searchParams.get("email") || process.env.TEST_EMAIL

    if (!testEmail) {
      return NextResponse.json({ success: false, error: "No test email provided" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(testEmail)) {
      return NextResponse.json({ success: false, error: "Invalid email format" }, { status: 400 })
    }

    console.log("Attempting to send test email to:", testEmail)

    const response = await sendEmail({
      to: [{ email: testEmail }],
      subject: "Test Email from Lucelli Website",
      html: `
        <h1>This is a test email</h1>
        <p>If you're seeing this, the email configuration is working correctly!</p>
        <p>Sent at: ${new Date().toLocaleString()}</p>
      `,
      text: `This is a test email. If you're seeing this, the email configuration is working correctly! Sent at: ${new Date().toLocaleString()}`,
    })

    return NextResponse.json({
      success: true,
      message: `Test email sent to ${testEmail}`,
      response,
    })
  } catch (error) {
    console.error("Error sending test email:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
        details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 },
    )
  }
}


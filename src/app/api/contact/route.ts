import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    const resendKey = process.env.RESEND_API_KEY;

    // Direct mailto fallback builder
    const mailtoFallback = `mailto:ashishramana1708@gmail.com?subject=${encodeURIComponent(
      `Portfolio Inquiry: ${validatedData.subject}`
    )}&body=${encodeURIComponent(
      `Hi Ashish,\n\nFrom: ${validatedData.name} (${validatedData.email})\nSubject: ${validatedData.subject}\n\nMessage:\n${validatedData.message}`
    )}`;

    // If Resend API Key is provided, send email via Resend
    if (resendKey && resendKey.startsWith("re_")) {
      const recipientEmail = process.env.RESEND_TO_EMAIL || "ashishramana2004@gmail.com";
      const fromEmail = process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [recipientEmail],
          reply_to: validatedData.email,
          subject: `Portfolio Message from ${validatedData.name}: ${validatedData.subject}`,
          text: `Name: ${validatedData.name}\nEmail: ${validatedData.email}\nSubject: ${validatedData.subject}\n\nMessage:\n${validatedData.message}`,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.warn("Resend API delivery error:", errorText);
        return NextResponse.json(
          {
            success: false,
            deliveryStatus: "error",
            message: "Direct delivery failed. Please click below to send via your email client directly to Ashish.",
            mailtoFallback,
          },
          { status: 502 }
        );
      }

      return NextResponse.json({
        success: true,
        deliveryStatus: "sent",
        message: "Your message has been delivered to Ashish's inbox! He will reply shortly.",
      });
    }

    // Explicit fallback when email provider API key is not configured
    console.info("📬 Contact Form: RESEND_API_KEY not configured. Falling back to direct email link.");
    return NextResponse.json({
      success: false,
      deliveryStatus: "unconfigured",
      message: "Direct email API is not configured in this environment. Please click below to open your email client or send to ashishramana1708@gmail.com.",
      mailtoFallback,
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to process message. Please email directly at ashishramana1708@gmail.com.",
        mailtoFallback: "mailto:ashishramana1708@gmail.com",
      },
      { status: 500 }
    );
  }
}

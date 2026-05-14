import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: ["din-email@gmail.com"], // DIN EMAIL!
      subject: `Nytt meddelande från ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">📬 Nytt meddelande från din portfolio!</h1>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Från:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Tid:</strong> ${new Date().toLocaleString("sv-SE")}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
            <h3>💬 Meddelande:</h3>
            <p style="font-size: 16px; line-height: 1.5;">${message}</p>
          </div>
          
          <p style="margin-top: 20px; color: #6b7280; font-size: 14px;">
            Svara direkt på detta email för att kontakta ${name}.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}

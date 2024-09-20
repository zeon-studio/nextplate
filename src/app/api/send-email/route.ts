import { sendEmail } from "sendgrid"; // Adjust the path based on your project structure
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Extract data from the request
  const formData = await req.formData();
  const firstName = formData.get("fname");
  const lastName = formData.get("lname");
  const email = formData.get("email");
  const interest = formData.get("interest");
  const message = formData.get("message");

  const subject = "NAF Website Customer Query";
  const text = "This is a customer query from the NAF website";
  const to = ["ceiaram@ninthavenuefoods.com", "madrigalceiara@gmail.com"];
  const html = `<!doctype html>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <title>Customer Query</title>
            <meta name="description" content="Customer Query" />
            <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
            <style>
              body {
                font-family: "Gill Sans", sans-serif;
                color: #18181b;
              }

              .container {
                margin-left: 20px;
                margin-right: 20px;
              }

              div {
                font-size: 16px;
              }

              .field {
                font-weight: bold;
              }

              .footer {
                font-size: 16px;
                padding-bottom: 20px;
                border-bottom: 1px solid #d1d5db;
              }

              .footer-links {
                display: flex;
                justify-content: center;
                align-items: center;
                color: #9ca3af;
              }

              a {
                text-decoration: none;
                margin: 8px;
                color: #9ca3af;
              }
            </style>
          </head>

          <body>
            <h2>Customer query from the NAF website</h2>
            <div class="container">
              <h4>
                ✉️ You've got a new message from ${firstName} ${lastName}
              </h4>
              <div>
                <h3>Customer Query❓</h3>
                <p>👤 <span class="field">Full Name: </span>${firstName} ${lastName}</p>
                <p>📧 <span class="field">Email address: </span>${email}</p>
                <p>✨ <span class="field">Area of Interest: </span>${interest}</p>
                <p>🗨️ <span class="field">Message: </span>${message}</p>
                <br />
              </div>

              <div class="footer"></div>
              <div class="footer-links">
                <p>This is an automated message sent by SendGrid</p>
              </div>
            </div>
          </body>
        </html>
        `;
  try {
    // Call sendEmail with subject and text, recipients are defined in the sendEmail function
    await sendEmail(to, subject, text, html);
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: error.message || "An unknown error occurred" },
      { status: 500 },
    );
  }
}

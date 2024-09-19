import sgMail from "@sendgrid/mail";

export const sendEmail = async (to, subject, text, html) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${to} successfully`);
  } catch (error) {
    console.error(error);
  }
};

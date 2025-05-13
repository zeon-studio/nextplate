import sgMail from "@sendgrid/mail";

export const sendEmail = async (to, subject, text, html, replyTo) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to,
    from: replyTo,
    subject,
    text,
    html,
    replyTo,
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${to} successfully`);
  } catch (error) {
    console.error(error);
  }
};

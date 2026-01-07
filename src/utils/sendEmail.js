const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEventRegistrationEmail(to, eventTitle, eventDate) {
  await resend.emails.send({
    from: "UniNow <onboarding@resend.dev>",
    to,
    subject: "🎉 Event Registration Successful!",
    html: `
      <h2>You’re registered!</h2>
      <p>You have successfully registered for:</p>
      <p><b>${eventTitle}</b></p>
      <p>📅 ${new Date(eventDate).toLocaleString()}</p>
      <p>We’ll see you there 🚀</p>
      <br/>
      <p>— UniNow Team</p>
    `,
  });
}

module.exports = { sendEventRegistrationEmail };

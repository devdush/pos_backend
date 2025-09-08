import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!, 
  },
});

export const sendVerificationEmail = async (email: string, token: string): Promise<void> => {
  const verificationLink = `https://vys.lk/verify-email/${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Email",
    html: `
      <p>Click the link below to verify your email:</p>
      <a href="${verificationLink}">${verificationLink}</a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent at:", new Date().toISOString());
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

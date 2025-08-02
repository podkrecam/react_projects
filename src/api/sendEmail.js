import nodemailer from "nodemailer";

export default async function handler(req, res) {
  console.log(req);
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    // Transporter SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: import.meta.env.EMAIL_USER,
        pass: import.meta.env.EMAIL_PASS,
      },
    });

    // Wysyłanie maila
    await transporter.sendMail({
      from: `"Portfolio Contact" <${import.meta.env.EMAIL_USER}>`,
      to: import.meta.env.EMAIL_TO,
      subject: `Nowa wiadomość od ${name}`,
      text: `Od: ${name} (${email})\n\n${message}`,
    });

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error sending email", error });
  }
}

import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message, token } = req.body;

  // Walidacja reCAPTCHA
  try {
    const recaptchaRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      { method: "POST" },
    );
    const recaptchaData = await recaptchaRes.json();
    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      return res
        .status(400)
        .json({ message: "Błąd reCAPTCHA. Spróbuj ponownie." });
    }
  } catch {
    return res.status(500).json({ message: "Błąd reCAPTCHA." });
  }

  // Transporter Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    // Mail do Ciebie
    await transporter.sendMail({
      from: `"Formularz kontaktowy" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: `Nowa wiadomość od ${name}`,
      text: `Imię: ${name}\nEmail: ${email}\n\nWiadomość:\n${message}`,
    });

    // Auto-reply do nadawcy
    await transporter.sendMail({
      from: `"Jadwiga Osial Art" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Dziękujemy za kontakt",
      text: `Dzień dobry ${name},\n\nDziękuję za wiadomość. Odpowiem tak szybko, jak to możliwe.\n\nPozdrawiam,\nJadwiga Osial`,
    });

    res.status(200).json({ message: "Wiadomość wysłana." });
  } catch (error) {
    res.status(500).json({ message: "Błąd przy wysyłaniu maila.", error });
  }
}

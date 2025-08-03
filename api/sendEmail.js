import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message, token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Brak tokenu reCAPTCHA" });
  }

  try {
    const params = new URLSearchParams();
    params.append("secret", process.env.RECAPTCHA_SECRET_KEY);
    params.append("response", token);

    const recaptchaRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      },
    );

    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      return res
        .status(400)
        .json({ message: "Błąd reCAPTCHA. Spróbuj ponownie." });
    }
  } catch (error) {
    console.error("Błąd weryfikacji reCAPTCHA:", error);
    return res.status(500).json({ message: "Błąd reCAPTCHA." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Formularz kontaktowy" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: `Nowa wiadomość od ${name}`,
      text: `Imię: ${name}\nEmail: ${email}\n\nWiadomość:\n${message}`,
    });

    await transporter.sendMail({
      from: `"Jadwiga Osial Art" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Dziękujemy za kontakt",
      text: `Dzień dobry ${name},\n\nDziękuję za wiadomość. Odpowiem tak szybko, jak to możliwe.\n\nPozdrawiam,\nJadwiga Osial`,
    });

    return res.status(200).json({ message: "Wiadomość wysłana." });
  } catch (error) {
    console.error("Błąd wysyłania maila:", error);
    return res
      .status(500)
      .json({ message: "Błąd przy wysyłaniu maila.", error: error.message });
  }
}

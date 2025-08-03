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
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Formularz kontaktowy" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `Nowa wiadomość od ${name}`,
      text: `Imię: ${name}\nEmail: ${email}\n\nWiadomość:\n${message}`,
    });

    await transporter.sendMail({
      from: `"Jadwiga Osial Art" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Dziękujemy za kontakt",
      html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #4A90E2;">Dzień dobry ${name},</h2>
      <p>Dziękujemy za wiadomość! Bardzo cieszymy się, że się z nami skontaktowałeś/aś.</p>
      <p>Odpowiemy na Twoją wiadomość tak szybko, jak to będzie możliwe.</p>
      <br />
      <p>Pozdrawiamy serdecznie,<br /><strong>Zespół Jadwiga Osial Art</strong></p>
      <hr style="border:none; border-top:1px solid #eee; margin:20px 0;" />
      <p style="font-size: 12px; color: #999;">
        To jest wiadomość automatyczna, prosimy na nią nie odpowiadać.
      </p>
    </div>
  `,
    });

    return res.status(200).json({ message: "Wiadomość wysłana." });
  } catch (error) {
    console.error("Błąd wysyłania maila:", error);
    return res
      .status(500)
      .json({ message: "Błąd przy wysyłaniu maila.", error: error.message });
  }
}

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
      subject: "Dziękuje za kontakt",
      html: `
    <div style="
      font-family: Arial, sans-serif; 
      color: #333; 
      background-color: #f9f9f9; 
      padding: 20px; 
      border-radius: 8px;
      max-width: 600px;
      margin: auto;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    ">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://www.jadwigaosialart.pl/assets/hero3-C2GsXEO6.jpg" alt="Jadwiga Osial Art" style="height: 50px;"/>
      </div>
      <h2 style="color: #4a6b5f; margin-bottom: 16px;">Dzień dobry ${name},</h2>
      <p style="font-size: 16px; line-height: 1.5;">
        Dziękuję za wiadomość! Bardzo cieszę się, że się ze mną skontaktowałeś/aś.
      </p>
      <p style="font-size: 16px; line-height: 1.5;">
        Odpowiem na Twoją wiadomość tak szybko, jak to będzie możliwe.
      </p>
      <br />
      <p style="font-size: 16px; line-height: 1.5;">
        Pozdrawiam serdecznie,<br />
        <strong>Jadwiga Osial</strong>
      </p>
      <hr style="border:none; border-top:1px solid #eee; margin:30px 0;" />
      <p style="font-size: 12px; color: #999; text-align: center;">
        To jest wiadomość automatyczna, proszę na nią nie odpowiadać.
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

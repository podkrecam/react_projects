import { useState } from "react";
import Section from "../components/Section";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Wysyłanie...");

    try {
      // Pobranie tokena reCAPTCHA
      const token = await window.grecaptcha.execute(
        import.meta.env.VITE_RECAPTCHA_SITE_KEY,
        { action: "submit" },
      );

      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, token }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("✅ Wiadomość wysłana!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(`❌ Błąd: ${data.message}`);
      }
    } catch {
      setStatus("❌ Błąd serwera.");
    }
  };

  return (
    <Section className="bg-primary text-text flex flex-col items-center px-5 py-20">
      <h2 className="text-accent font-primary mb-10 text-4xl font-bold uppercase">
        Kontakt
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-lg flex-col gap-6"
      >
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Imię"
          className="text-text focus:ring-accent rounded-lg border border-neutral-700 p-3 focus:ring-2 focus:outline-none"
          required
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="text-text focus:ring-accent rounded-lg border border-neutral-700 p-3 focus:ring-2 focus:outline-none"
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Wiadomość"
          rows={5}
          className="text-text focus:ring-accent rounded-lg border border-neutral-700 p-3 focus:ring-2 focus:outline-none"
          required
        />
        <button
          type="submit"
          className="bg-accent text-primary hover:bg-accent/80 rounded-lg py-3 font-bold transition-colors"
        >
          Wyślij
        </button>
      </form>

      {status && <p className="mt-4 text-sm">{status}</p>}
      <script
        src={`https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY}`}
      ></script>
    </Section>
  );
}

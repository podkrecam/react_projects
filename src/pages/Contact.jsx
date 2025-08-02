import { useState } from "react";

export default function Contact() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div>
      <form className="contact-form" onSubmit={() => {}}>
        <label htmlFor="message-input">Your Message</label>
        <textarea
          onChange={(e) => setMessage({ message: e.target.value })}
          name="message"
          type="text"
          placeholder="Please write your message here"
          value={message}
          required
        />

        <label htmlFor="message-name">Your Name</label>
        <input
          onChange={(e) => setName({ name: e.target.value })}
          name="name"
          type="text"
          placeholder="Your Name"
          value={name}
        />

        <label htmlFor="message-email">Your Email</label>
        <input
          onChange={(e) => setEmail({ email: e.target.value })}
          name="email"
          type="email"
          placeholder="your@email.com"
          required
          value={email}
        />

        <div className="button--container">
          <button type="submit" className="button button-primary">
            {}
          </button>
        </div>
      </form>
    </div>
  );
}

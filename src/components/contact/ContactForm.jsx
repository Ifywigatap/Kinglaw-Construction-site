import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Button from "../common/Button";
import { getRateLimitRemaining, recordRateLimitHit } from "../../utils/rateLimit"; // Keep for client-side rate limit
import { apiClient } from "../../utils/apiClient"; // Keep for API call
import { endpoints } from "../../config/api";

const COOLDOWN_PERIOD = 60000; // 60 seconds
const STORAGE_KEY = "last_contact_message_timestamp";

export default function ContactForm({ defaultSubject = "" }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: defaultSubject,
    message: "",
    _hp: "", // Honeypot field for spam prevention
  });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = useCallback((e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }, [formData]);

  // Function to reset form data (used after successful submission)
  const resetFormData = useCallback(() => {
    setFormData({ name: "", email: "", subject: defaultSubject, message: "", _hp: "" });
    setStatus("idle");
  }, [defaultSubject]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Rate limiting check
    const remaining = getRateLimitRemaining(STORAGE_KEY, COOLDOWN_PERIOD);

    if (remaining > 0) {
      setErrorMsg(`Please wait ${remaining} seconds before sending another message.`);
      return;
    }

    // 1. Honeypot check: If the hidden field is filled, it's likely a bot.
    if (formData._hp) {
      setStatus("success"); // Return success to fool the bot without sending mail
      return;
    }

    // Client-side validation logic
    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.length < 2) {
      setErrorMsg("Please enter your full name.");
      return;
    }

    if (!emailRegex.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (message.length < 10) {
      setErrorMsg("Please provide a more detailed message (min 10 characters).");
      return;
    }

    setStatus("loading");

    try {
      await apiClient(endpoints.contact, {
        body: { name, email, subject, message, _hp: formData._hp } // Ensure honeypot is sent to backend for server-side check
      });

      setStatus("success");
      recordRateLimitHit(STORAGE_KEY);
      resetFormData();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "There was an error sending your message. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl transition-colors duration-300"
    >
      {status === "success" ? (
        <div className="text-center py-12">
          <h3 className="text-2xl font-bold text-amber-500 mb-2">Message Sent!</h3>
          <p className="text-slate-600 dark:text-slate-400">
            We've received your message and will get back to you within 24 hours.
          </p>
          <Button onClick={resetFormData} className="mt-8">
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-4 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-4 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              placeholder="Project Inquiry"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-4 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Message
            </label>
            <textarea
              name="message"
              required
              rows="6"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project..."
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-4 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
            ></textarea>
          </div>

          {/* Honeypot Field - Hidden from users */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="_hp"
              value={formData._hp}
              onChange={handleChange}
              tabIndex="-1"
              autoComplete="off"
            />
          </div>

          <Button type="submit" className="w-full" disabled={status === "loading"}>
            {status === "loading" ? "Sending..." : "Send Message"}
          </Button>
          {(status === "error" || errorMsg) && (
            <p className="text-red-500 text-sm mt-3 text-center">{errorMsg || "There was an error sending your message. Please try again."}</p>
          )}
        </form>
      )}
    </motion.div>
  );
}
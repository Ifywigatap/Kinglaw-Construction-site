import { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar } from "react-icons/fi";
import { endpoints } from "../../config/api";
import { getRateLimitRemaining, recordRateLimitHit } from "../../utils/rateLimit";
import Button from "./Button";
import { apiClient } from "../../utils/apiClient";

const COOLDOWN_PERIOD = 60000; // 60 seconds in milliseconds
const STORAGE_KEY = "last_property_inquiry_timestamp";

const CustomDateInput = forwardRef(({ value, onClick, placeholder, required }, ref) => (
  <div className="relative group">
    <input
      value={value}
      onClick={onClick}
      placeholder={placeholder}
      readOnly
      required={required}
      ref={ref}
      className="w-full bg-secondary border border-border rounded-xl px-4 py-3 pr-10 text-foreground focus:outline-none focus:border-primary transition-colors text-sm cursor-pointer"
    />
    <FiCalendar 
      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors pointer-events-none" 
      size={18} 
    />
  </div>
));

export default function PropertyInquiryForm({ itemTitle, itemCategory }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    requestVisit: false,
    preferredDate: null,
    message: `I am interested in "${itemTitle}" (${itemCategory}). Please provide more information.`,
    _hp: "", // Honeypot field for spam prevention
  });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, preferredDate: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Rate limiting check
    const remaining = getRateLimitRemaining(STORAGE_KEY, COOLDOWN_PERIOD);

    if (remaining > 0) {
      setErrorMsg(`Please wait ${remaining} seconds before sending another inquiry.`);
      return;
    }

    // 1. Honeypot check: If the hidden field is filled, it's likely a bot.
    if (formData._hp) {
      setStatus("success"); // Return success to fool the bot without sending mail
      return;
    }

    // 2. Client-side validation logic
    const name = formData.name.trim();
    const email = formData.email.trim();
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
      await apiClient(endpoints.inquiry, {
        body: { ...formData, name, email, message, itemTitle, itemCategory }
      });

      setStatus("success");
      // Save success timestamp for rate limiting
      recordRateLimitHit(STORAGE_KEY);

      setFormData({
        name: "",
        email: "",
        phone: "",
        requestVisit: false,
        preferredDate: null,
        message: `I am interested in "${itemTitle}" (${itemCategory}). Please provide more information.`,
        _hp: "",
      });
    } catch (error) {
      setStatus("error");
      setErrorMsg(error.message || "There was an error sending your inquiry. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl transition-colors duration-300"
    >
      <h3 className="text-2xl font-bold mb-6 text-foreground transition-colors">Inquire About This Property</h3>
      {status === "success" ? (
        <div className="text-center py-8">
          <p className="text-primary text-lg font-semibold mb-2">Inquiry Sent Successfully!</p>
          <p className="text-muted-foreground transition-colors">Thank you for your interest. We will get back to you shortly.</p>
          <Button onClick={() => setStatus("idle")} variant="outline" className="mt-6">
            Send Another Inquiry
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-2 transition-colors">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-2 transition-colors">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground text-sm"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-card-foreground mb-2 transition-colors">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground text-sm"
            />
          </div>
          <div>
            <div className="flex items-center gap-3 py-2 mb-2">
              <input
                type="checkbox"
                id="requestVisit"
                name="requestVisit"
                checked={formData.requestVisit}
                onChange={handleChange}
                className="w-5 h-5 bg-secondary border-border rounded text-primary focus:ring-primary/20 cursor-pointer accent-primary transition-colors"
              />
              <label htmlFor="requestVisit" className="text-sm font-medium text-card-foreground cursor-pointer transition-colors">
                I would like to schedule a site visit
              </label>
            </div>

            <AnimatePresence>
              {formData.requestVisit && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="overflow-hidden space-y-2"
                >
                  <label htmlFor="preferredDate" className="block text-sm font-medium text-card-foreground transition-colors">
                    Preferred Date
                  </label>
                  <DatePicker
                    selected={formData.preferredDate}
                    onChange={handleDateChange}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    minDate={new Date()}
                    placeholderText="Select date and time"
                    customInput={<CustomDateInput required={formData.requestVisit} />}
                    calendarClassName="kinglaw-datepicker"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-card-foreground mb-2 transition-colors">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground text-sm resize-y"
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

          <Button type="submit" variant="primary" className="w-full justify-center py-3" disabled={status === "loading"}>
            {status === "loading" ? "Sending Inquiry..." : "Send Inquiry"}
          </Button>
          {(status === "error" || errorMsg) && (
            <p className="text-red-500 text-sm mt-3 text-center">{errorMsg || "There was an error sending your inquiry. Please try again."}</p>
          )}
        </form>
      )}
    </motion.div>
  );
}
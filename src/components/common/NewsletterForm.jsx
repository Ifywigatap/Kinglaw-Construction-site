import { useState } from "react";
import { motion } from "framer-motion";
import { endpoints } from "../../config/api";
import Button from "./Button";
import { getRateLimitRemaining, recordRateLimitHit } from "../../utils/rateLimit";
import { apiClient } from "../../utils/apiClient";

const COOLDOWN_PERIOD = 300000; // 5 minutes
const STORAGE_KEY = "last_newsletter_sub_timestamp";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Rate limiting check
    const remaining = getRateLimitRemaining(STORAGE_KEY, COOLDOWN_PERIOD);

    if (remaining > 0) {
      setErrorMsg("You have recently subscribed. Please check your email or try again later.");
      return;
    }

    setStatus("loading");
    
    try {
      await apiClient(endpoints.newsletter, { body: { email } });
      
      recordRateLimitHit(STORAGE_KEY);
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Failed to subscribe. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 text-center animate-in fade-in zoom-in duration-300">
        <p className="text-primary font-semibold mb-1 text-sm">Successfully Subscribed!</p>
        <p className="text-muted-foreground text-xs">Thank you for joining our community.</p>
        <button 
          onClick={() => setStatus("idle")}
          className="mt-3 text-primary text-xs underline underline-offset-4 hover:text-primary/90 transition-colors"
        >
          Subscribe another email
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-4"
    >
      <div>
        <h4 className="font-semibold text-foreground mb-2 transition-colors">Newsletter</h4>
        <p className="text-muted-foreground text-sm leading-relaxed transition-colors">
          Stay updated with our latest projects and building material offers.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground text-sm"
        />
        <Button 
          type="submit" 
          variant="primary"
          className="w-full justify-center !py-3"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Processing..." : "Subscribe Now"}
        </Button>
      </form>
      {(status === "error" || errorMsg) && (
        <p className="text-red-500 text-xs mt-2">{errorMsg}</p>
      )}
    </motion.div>
  );
}
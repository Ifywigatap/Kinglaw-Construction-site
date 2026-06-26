import { Share2 } from "lucide-react";
import Button from "./Button";
import { companyName } from "../../config/constants";

export default function ShareButton({ title, text, className = "" }) {
  const handleShare = async () => {
    const shareData = {
      title: title || companyName,
      text: text || `Check out this property from ${companyName}.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      // Silently handle user cancellation
      if (err.name !== "AbortError") {
        console.error("Error sharing:", err);
      }
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleShare}
      className={`flex items-center justify-center gap-2 ${className}`}
      title="Share this item"
    >
      <Share2 size={18} />
      <span>Share</span>
    </Button>
  );
}
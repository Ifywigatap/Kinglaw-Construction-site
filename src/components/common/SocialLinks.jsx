import { FaFacebookF, FaTwitter, FaTiktok, FaWhatsapp } from "react-icons/fa6";

const socialLinks = [
  { icon: FaFacebookF, href: "https://www.facebook.com/share/1Azkcv81sm/", label: "Facebook" },
  { icon: FaTwitter, href: "https://x.com/KinglawLtd?s=09", label: "X (Twitter)" },
  { icon: FaTiktok, href: "https://www.tiktok.com/@kinglaw.paradise.b", label: "TikTok" },
  { icon: FaWhatsapp, href: "https://wa.me/2348092382323", label: "WhatsApp" },
];

export default function SocialLinks({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card/50 text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:-translate-y-1"
            aria-label={social.label}
          >
            <Icon size={18} />
          </a>
        );
      })}
    </div>
  );
}
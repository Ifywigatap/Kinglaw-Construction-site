import OptimizedImage from "./OptimizedImage";
import { FaTwitter, FaLinkedin } from "react-icons/fa6";

const socialIconMap = {
  twitter: FaTwitter,
  linkedin: FaLinkedin,
};

export default function TeamCard({
  image,
  name,
  role,
  socials,
  bio,
}) {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-md transition-all duration-300 group h-full flex flex-col text-center">
      <div className="pt-10">
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-secondary group-hover:border-primary transition-all duration-300 shadow-lg">
          <OptimizedImage
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="128px"
          />
        </div>
      </div>

      <div className="p-6 pt-4 flex-grow flex flex-col">
        <div className="flex-grow flex flex-col justify-center min-h-[6rem]">
          <h3 className="text-xl font-bold text-foreground transition-colors">
            {name}
          </h3>
          
          {/* This container handles the swapping of role and bio */}
          <div className="relative flex-grow flex items-center justify-center mt-2">
            {/* Role (default view) */}
            <p className="text-muted-foreground transition-opacity duration-300 group-hover:opacity-0">
              {role}
            </p>
            {/* Bio (hover view) */}
            {bio && (
              <p className="absolute inset-0 flex items-center justify-center p-2 text-sm text-muted-foreground leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {bio}
              </p>
            )}
          </div>
        </div>

        {socials && Object.keys(socials).length > 0 && (
          <div className="mt-auto pt-4 flex justify-center gap-4">
            {Object.entries(socials).map(([key, url]) => {
              const Icon = socialIconMap[key];
              if (!Icon || !url) return null;
              return (
                <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label={`${name}'s ${key}`}>
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
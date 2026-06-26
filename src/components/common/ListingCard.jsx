import React from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import OptimizedImage from "./OptimizedImage";
import Button from "./Button";

export const ListingCardSkeleton = ({ className = "" }) => {
  return (
    <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden ${className}`}>
      <div className="animate-pulse">
        {/* Image Container Skeleton */}
        <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-800" />

        {/* Content Skeleton */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col gap-4">
            {/* Location Skeleton */}
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded bg-slate-300 dark:bg-slate-700" />
              <div className="w-32 h-3 bg-slate-300 dark:bg-slate-700 rounded" />
            </div>

            {/* Title Skeleton */}
            <div className="space-y-2">
              <div className="w-full h-6 bg-slate-300 dark:bg-slate-700 rounded-lg" />
              <div className="w-3/4 h-6 bg-slate-300 dark:bg-slate-700 rounded-lg" />
            </div>

            {/* Line Skeleton */}
            <div className="w-12 h-1 bg-slate-200 dark:bg-slate-800 rounded-full" />

            {/* Price & Button Skeleton */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex flex-col gap-2">
                <div className="w-12 h-2 bg-slate-300 dark:bg-slate-700 rounded" />
                <div className="w-24 h-8 bg-slate-300 dark:bg-slate-700 rounded" />
              </div>
              <div className="w-20 h-9 bg-slate-300 dark:bg-slate-700 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ListingCard = ({
  image,
  category,
  title,
  location,
  price,
  path,
  badge,
  className = "",
}) => {
  return (
    <div className={`group bg-card border border-border rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 ${className}`}>
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <OptimizedImage
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* Badges/Overlays */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {category && (
            <span className="px-3 py-1 bg-background/90 backdrop-blur-md text-primary text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">
              {category}
            </span>
          )}
          {badge && (
            <span className="px-3 py-1 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
              {badge}
            </span>
          )}
        </div>

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <div className="flex flex-col gap-4">
          {location && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin size={14} className="text-primary" />
              <span className="text-xs font-medium truncate">{location}</span>
            </div>
          )}

          <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>

          <div className="w-12 h-1 bg-secondary rounded-full group-hover:w-full group-hover:bg-primary/30 transition-all duration-500" />

          <div className="flex items-center justify-between mt-2">
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                Investment
              </span>
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {price}
              </span>
            </div>

            <Button 
              as={Link}
              to={path}
              variant="secondary" 
              size="sm" 
              className="!rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
            >
              Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
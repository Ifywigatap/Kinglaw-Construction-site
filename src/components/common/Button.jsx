import React from "react";

const Button = ({ 
  as: Component = "button",
  children, 
  variant = "primary", 
  size = "md",
  className = "", 
  type = "button",
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variants = {
    // Primary: Uses the main accent color from the theme.
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20",
    // Destructive: For actions that delete or have significant consequences.
    destructive: "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 shadow-lg shadow-red-500/20",
    // Outline: Transparent with a border of the primary color.
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
    // Secondary: A neutral color for less prominent actions.
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    // Accent 2: A secondary accent color for special calls to action.
    "accent-2": "bg-accent-2 text-accent-2-foreground hover:bg-accent-2/90",
    // Ghost: A transparent button that shows its background on hover.
    ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
  };

  return (
    <Component
      {...(Component === "button" ? { type } : {})}
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
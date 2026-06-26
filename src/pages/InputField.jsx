import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

/**
 * A reusable input field component with a label, icon, and error message display.
 * @param {{
 *   id: string,
 *   name: string,
 *   label: string,
 *   type?: string,
 *   value: string,
 *   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
 *   placeholder?: string,
 *   required?: boolean,
 *   icon?: React.ElementType,
 *   error?: string,
 * }} props
 */
export default function InputField({ id, name, label, type = "text", value, onChange, placeholder, required = false, icon: Icon, error, ...props }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPasswordField = type === 'password';
  const currentType = isPasswordField ? (isPasswordVisible ? 'text' : 'password') : type;

  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-medium text-card-foreground">
        {label}
      </label>
      <div className="relative">
        {Icon && <Icon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />}
        <input
          type={currentType}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-2xl border border-input bg-background py-4 outline-none focus:border-primary transition-colors ${Icon ? 'pl-12' : 'pl-4'} ${isPasswordField ? 'pr-12' : 'pr-4'}`}
          required={required}
          {...props}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
          >
            {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      <AnimatePresence>
        {error && (<motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-1 text-sm text-red-500">{error}</motion.p>)}
      </AnimatePresence>
    </div>
  );
}
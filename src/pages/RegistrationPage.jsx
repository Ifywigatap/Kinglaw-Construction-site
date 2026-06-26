import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Lock, Mail } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import Button from "../components/common/Button";
import InputField from "./InputField";
import SEO from "../components/common/SEO";
import { companyName } from "../config/constants";

export default function RegistrationPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [strength, setStrength] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    let score = 0;
    if (!password) {
      setStrength(0);
      return;
    }

    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*?&]/.test(password)) score++;
    setStrength(score);
  }, [password]);

  const strengthLevels = [
    { label: "", color: "" }, // 0
    { label: "Very Weak", color: "bg-red-500" }, // 1
    { label: "Weak", color: "bg-orange-500" }, // 2
    { label: "Medium", color: "bg-yellow-500" }, // 3
    { label: "Strong", color: "bg-green-500" }, // 4
    { label: "Very Strong", color: "bg-green-600" }, // 5
  ];

  const currentStrength = strengthLevels[strength];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Password strength validation
    if (strength < 5) {
      setError(
        "Please use a stronger password that meets all the criteria."
      );
      return;
    }

    setLoading(true);

    try {
      await auth.register({ name, email, password });
      // On successful registration, redirect to the admin dashboard.
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4 text-foreground">
      <SEO
        title={`Register | ${companyName}`}
        description={`Create a new admin account for ${companyName}.`}
      />
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary">Create Account</h1>
          <p className="mt-2 text-muted-foreground">
            Create a new account to manage the website.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              id="name"
              name="name"
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              icon={User}
              required
            />

            <InputField
              id="email"
              name="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              icon={Mail}
              required
            />

            <InputField
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              icon={Lock}
              required
            />

            <div className="space-y-2 -mt-4">
              <div className="flex items-center gap-2">
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${currentStrength.color}`}
                    style={{ width: `${(strength / 5) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-24 shrink-0 text-right font-medium">
                  {currentStrength.label}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Must be at least 8 characters and include uppercase, lowercase, number, and special characters (e.g., @, $, !).
              </p>
            </div>

            <InputField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              icon={Lock}
              required
            />

            {error && <p className="text-center text-sm text-red-500">{error}</p>}

            <Button type="submit" variant="primary" className="w-full py-3 text-lg" disabled={loading}>
              {loading ? "Creating Account..." : "Register"}
            </Button>
          </form>
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </main>
  );
}
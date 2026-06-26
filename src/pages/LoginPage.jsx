import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import Button from "../components/common/Button";
import InputField from "./InputField";
import SEO from "../components/common/SEO";
import { companyName } from "../config/constants";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  // Get the path to redirect to after login.
  // It comes from the `state` passed by `ProtectedRoute`.
  // Defaults to a sensible page like `/admin` if no previous location was stored.
  const from = location.state?.from?.pathname || "/admin";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await auth.login({ email, password });
      // On successful login, redirect the user to where they were trying to go.
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4 text-foreground">
      <SEO
        title={`Admin Login | ${companyName}`}
        description={`Admin login page for ${companyName}.`}
      />
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary">Admin Login</h1>
          <p className="mt-2 text-muted-foreground">
            Access the dashboard to manage your site content.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
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

            {error && (
              <p className="text-center text-sm text-red-500">{error}</p>
            )}

            <Button type="submit" variant="primary" className="w-full py-3 text-lg" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-primary hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </main>
  );
}
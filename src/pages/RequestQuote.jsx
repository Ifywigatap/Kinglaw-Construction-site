import { useState } from "react";
import { Calculator, Building2, User, Mail, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/common/SEO";
import Button from "../components/common/Button";
import InputField from "./InputField";
import { companyName, defaultEmail, defaultPhoneNumber } from "../config/constants";

export default function RequestQuote() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    location: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // 'idle', 'loading', 'success', 'error'
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      projectType: "",
      budget: "",
      location: "",
      description: "",
    });
    setStatus("idle");
  }

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.projectType) newErrors.projectType = "Please select a project type.";
    if (!formData.budget) newErrors.budget = "Please select a budget range.";
    if (!formData.description.trim() || formData.description.trim().length < 10) {
      newErrors.description = "Please provide a description of at least 10 characters.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStatus("loading");
    setErrorMsg("");

    const form = e.target;
    const web3FormData = new FormData(form);
    web3FormData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
    web3FormData.append("subject", `New Quote Request from ${formData.name}`);
    web3FormData.append("from_name", companyName);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: web3FormData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.message || "An error occurred. Please try again.");
        console.error("Form Submission Error:", data);
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("An error occurred. Please check your connection and try again.");
      console.error("Network or other error:", err);
    }
  };

  return (
    <main className="bg-background text-foreground transition-colors duration-300">
      <SEO
        title={`Request a Quote | ${companyName}`}
        description={`Get a free, detailed estimate for your construction project. Contact ${companyName} for residential, commercial, and design needs.`}
        keywords="request quote, construction estimate, project cost, building quote, Nigeria"
      />

      {/* Hero Section */}
      <section className="relative bg-secondary py-24 text-secondary-foreground">
        <div className="container text-center">
          <div className="mb-6 inline-flex items-center rounded-full bg-background/10 px-5 py-2 backdrop-blur">
            <Calculator className="mr-2 h-5 w-5 text-primary" />
            Request a Free Quote
          </div>

          <h1 className="mb-6 text-4xl font-bold md:text-6xl">
            Let's Build Your Dream Project
          </h1>

          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            Tell us about your construction project and receive a detailed
            estimate from our professional team.
          </p>
        </div>
      </section>

      {/* Quote Form */}
      <section className="container py-20">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl bg-card border border-border p-8 shadow-xl">
              <h2 className="mb-8 text-3xl font-bold text-foreground">
                Request Project Estimate
              </h2>

              {status === 'success' ? (
                <div className="text-center py-12">
                  <h3 className="text-2xl font-bold text-primary mb-2">Quote Request Sent!</h3>
                  <p className="text-muted-foreground">
                    Thank you for your interest. We have received your request and will get back to you with an estimate shortly.
                  </p>
                  <Button onClick={resetForm} className="mt-8">
                    Request Another Quote
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <InputField
                    id="name"
                    name="name"
                    label="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    icon={User}
                    error={errors.name}
                    required
                  />

                  {/* Email */}
                  <InputField
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    icon={Mail}
                    error={errors.email}
                    required
                  />

                  {/* Phone */}
                  <InputField
                    id="phone"
                    name="phone"
                    label="Phone Number (Optional)"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+234 800 000 0000"
                    icon={Phone}
                  />

                  {/* Project Type */}
                  <div>
                    <label htmlFor="projectType" className="mb-2 block font-medium text-card-foreground">
                      Project Type
                    </label>
                    <select id="projectType" name="projectType" value={formData.projectType} onChange={handleInputChange} required className="w-full rounded-2xl border border-input bg-background px-4 py-4 outline-none focus:border-primary transition-colors">
                      <option value="">Select Project Type</option>
                      <option value="Residential Building">Residential Building</option>
                      <option value="Commercial Building">Commercial Building</option>
                      <option value="Renovation">Renovation</option>
                      <option value="Road Construction">Road Construction</option>
                      <option value="Interior Design">Interior Design</option>
                      <option value="Architecture">Architecture</option>
                    </select>
                    <AnimatePresence>
                      {errors.projectType && ( <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-1 text-sm text-red-500">{errors.projectType}</motion.p> )}
                    </AnimatePresence>
                  </div>

                  {/* Budget */}
                  <div>
                    <label htmlFor="budget" className="mb-2 block font-medium text-card-foreground">
                      Estimated Budget
                    </label>
                    <select id="budget" name="budget" value={formData.budget} onChange={handleInputChange} required className="w-full rounded-2xl border border-input bg-background px-4 py-4 outline-none focus:border-primary transition-colors">
                      <option value="">Select Budget Range</option>
                      <option value="1M-5M">₦1M - ₦5M</option>
                      <option value="5M-20M">₦5M - ₦20M</option>
                      <option value="20M-50M">₦20M - ₦50M</option>
                      <option value="50M+">₦50M+</option>
                    </select>
                    <AnimatePresence>
                      {errors.budget && ( <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-1 text-sm text-red-500">{errors.budget}</motion.p> )}
                    </AnimatePresence>
                  </div>

                  {/* Location */}
                  <InputField
                    id="location"
                    name="location"
                    label="Project Location (Optional)"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Lagos, Abuja, Port Harcourt..."
                  />

                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="mb-2 block font-medium text-card-foreground">
                      Project Description
                    </label>
                    <textarea
                      rows={6}
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your project..."                      className="w-full rounded-2xl border border-input bg-background px-4 py-4 outline-none focus:border-primary transition-colors resize-none"
                      required
                    ></textarea>
                    <AnimatePresence>
                      {errors.description && ( <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-1 text-sm text-red-500">{errors.description}</motion.p> )}
                    </AnimatePresence>
                  </div>

                  {/* Submit */}
                  <Button type="submit" variant="primary" className="w-full py-4 text-lg" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Submitting...' : 'Submit Request'}
                  </Button>

                  {status === 'error' && (
                    <p className="text-red-500 text-sm mt-3 text-center">{errorMsg}</p>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-28 rounded-3xl bg-card border border-border p-8 shadow-xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Building2 size={32} />
              </div>

              <h3 className="mb-4 text-2xl font-bold text-foreground">
                Why Request a Quote?
              </h3>

              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-center gap-3"><span className="text-primary">✅</span> Free professional consultation</li>
                <li className="flex items-center gap-3"><span className="text-primary">✅</span> Accurate cost estimation</li>
                <li className="flex items-center gap-3"><span className="text-primary">✅</span> Expert project planning</li>
                <li className="flex items-center gap-3"><span className="text-primary">✅</span> Transparent pricing</li>
                <li className="flex items-center gap-3"><span className="text-primary">✅</span> Fast response within 24 hours</li>
              </ul>

              <div className="mt-8 rounded-2xl bg-secondary p-5 border border-border">
                <h4 className="mb-2 font-bold text-foreground">
                  Need Immediate Assistance?
                </h4>

                <p className="mb-3 text-sm text-muted-foreground">
                  Contact our project team directly.
                </p>

                <a href={`tel:${defaultPhoneNumber}`} className="font-semibold text-primary hover:underline">{defaultPhoneNumber}</a>
                <br />
                <a href={`mailto:${defaultEmail}`} className="text-primary hover:underline text-sm">{defaultEmail}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
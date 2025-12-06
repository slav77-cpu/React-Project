import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    rePassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValues((state) => ({
      ...state,
      [name]: value,
    }));
    setErrors((state) => ({
      ...state,
      [name]: "",
    }));
    setServerError("");
  }
  function validate(values) {
    const newErrors = {};

    // Email
    if (!values.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (values.email.length < 7) {
      newErrors.email = "Email must be at least 7 characters.";
    } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(values.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password
    if (!values.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (values.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters.";
    }

    // Repeat password
    if (!values.rePassword.trim()) {
      newErrors.rePassword = "Repeat password is required.";
    } else if (values.rePassword !== values.password) {
      newErrors.rePassword = "Passwords do not match.";
    }

    return newErrors;
  }

 async function handleSubmit(e) {
    e.preventDefault();
    setErrors("");
const validationErrors = validate(formValues);

if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    
    try {
      setIsSubmitting(true);

      await register(formValues.email, formValues.password);

      
      navigate("/");
    } catch (err) {
      console.error(err);
      setServerError(err.message || "Registration failed.");
    } finally {
      setIsSubmitting(false);
    }

    
    
  }

  return (
    <section className="mx-auto max-w-md px-4 py-10">
      <h1 className="mb-4 text-2xl font-bold text-slate-900">Register</h1>

      {serverError && (
        <p className="mb-4 rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700">
          {serverError}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formValues.email}
            onChange={handleChange}
             className={`w-full rounded-xl border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 ${
              errors.email
                ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formValues.password}
            onChange={handleChange}
            className={`w-full rounded-xl border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 ${
              errors.password
                ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
            }`}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-600">{errors.password}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="rePassword"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Repeat password
          </label>
          <input
            id="rePassword"
            name="rePassword"
            type="password"
            required
            value={formValues.rePassword}
            onChange={handleChange}
            className={`w-full rounded-xl border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 ${
              errors.rePassword
                ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
            }`}
          />
          {errors.rePassword && (
            <p className="mt-1 text-xs text-red-600">{errors.rePassword}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-50 hover:bg-slate-800"
        >

         {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </section>
  );
}
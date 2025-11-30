import { useState } from "react";
import { useNavigate } from "react-router";
import request from "../../utils/request";

export default function Login() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
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

    if (!values.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(values.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!values.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (values.password.length < 3) {
      newErrors.password = "Password must be at least 3 characters.";
    }

    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");

    const validationErrors = validate(formValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);

      const result = await request(
        "http://localhost:3030/users/login",
        "POST",
        {
          email: formValues.email,
          password: formValues.password,
        }
      );

      
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("userId", result._id);
      localStorage.setItem("email", result.email);

      // TODO:  AuthContext –  setUser(result)

      navigate("/"); 
    } catch (err) {
      console.error(err);
      setServerError(err.message || "Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-md px-4 py-10">
      <h1 className="mb-2 text-2xl font-bold text-slate-900">Log in</h1>

      <p className="mb-6 text-sm text-slate-600">
        Use one of the existing practice accounts or your own registered one.
      </p>

      {serverError && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
       
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
            value={formValues.email}
            onChange={handleChange}
            placeholder="@abv.bg"
            className={`w-full rounded-xl border px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-1 ${
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
            value={formValues.password}
            onChange={handleChange}
            placeholder="••••••"
            className={`w-full rounded-xl border px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-1 ${
              errors.password
                ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
            }`}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-600">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-50 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Logging in..." : "Log in"}
        </button>
      </form>
    </section>
  );
}
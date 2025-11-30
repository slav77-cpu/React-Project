import { useState } from "react";

export default function Register() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    rePassword: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValues((state) => ({
      ...state,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!formValues.email.trim() || !formValues.password.trim()) {
      setError("Email and password are required.");
      return;
    }

    if (formValues.password.length < 3) {
      setError("Password must be at least 3 characters.");
      return;
    }

    if (formValues.password !== formValues.rePassword) {
      setError("Passwords do not match.");
      return;
    }

    
    console.log("Register form:", formValues);
  }

  return (
    <section className="mx-auto max-w-md px-4 py-10">
      <h1 className="mb-4 text-2xl font-bold text-slate-900">Register</h1>

      {error && (
        <p className="mb-4 rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700">
          {error}
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
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
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
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
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
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-50 hover:bg-slate-800"
        >
          Register
        </button>
      </form>
    </section>
  );
}
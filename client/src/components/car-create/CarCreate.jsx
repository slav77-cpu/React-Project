// src/pages/CreateCar.jsx
import { useState } from "react";

export default function CarCreate() {
  const [formValues, setFormValues] = useState({
    brand: "",
    model: "",
    year: "",
    horsepower: "",
    price: "",
    imageUrl: "",
    description: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValues((state) => ({
      ...state,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // TODO: later connect to backend (POST /data/games)
    console.log("Create car form values:", formValues);
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-bold text-slate-900">
        Create new car
      </h1>

      <p className="mb-6 text-sm text-slate-600">
        Fill in the details below to create a new car listing. Later we will
        send this data to the backend API.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Brand + Model */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="brand"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Brand
            </label>
            <input
              id="brand"
              name="brand"
              type="text"
              required
              value={formValues.brand}
              onChange={handleChange}
              placeholder="e.g. BMW"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label
              htmlFor="model"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Model
            </label>
            <input
              id="model"
              name="model"
              type="text"
              required
              value={formValues.model}
              onChange={handleChange}
              placeholder="e.g. 320d"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Year + Horsepower + Price */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label
              htmlFor="year"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Year
            </label>
            <input
              id="year"
              name="year"
              type="number"
              min="1900"
              max="2100"
              required
              value={formValues.year}
              onChange={handleChange}
              placeholder="e.g. 2018"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label
              htmlFor="horsepower"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Horsepower
            </label>
            <input
              id="horsepower"
              name="horsepower"
              type="number"
              min="0"
              required
              value={formValues.horsepower}
              onChange={handleChange}
              placeholder="e.g. 190"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Price (€)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              required
              value={formValues.price}
              onChange={handleChange}
              placeholder="e.g. 24900"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label
            htmlFor="imageUrl"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Image URL
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="text"
            required
            value={formValues.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/car.jpg"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            required
            value={formValues.description}
            onChange={handleChange}
            placeholder="Short description of the car..."
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <button
          type="submit"
          className="mt-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-50 hover:bg-slate-800"
        >
          Create car
        </button>
      </form>
    </section>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router";
import request from "../../utils/request.js";


const MIN_YEAR = 1886; 
const MAX_YEAR = 2100;

const MIN_HP = 10;
const MAX_HP = 2000;

const MIN_PRICE = 100;

export default function CarCreate() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    brand: "",
    model: "",
    year: "",
    horsepower: "",
    price: "",
    imageUrl: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name,  } = e.target;
    let value = e.target.value;
    if (name === "brand") {
      value = value.replace(/[^a-zA-Z\s]/g, "");
    }
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

    // BRAND
    if (!values.brand.trim()) {
      newErrors.brand = "Brand is required.";
    } else if (values.brand.trim().length < 2) {
      newErrors.brand = "Brand must be at least 2 characters.";
    } else if (!/^[A-Za-z\s]+$/.test(values.brand.trim())) {
      newErrors.brand = "Brand must contain only letters.";
    }

    // MODEL
    if (!values.model.trim()) {
      newErrors.model = "Model is required.";
    }

    // YEAR
    const yearNum = Number(values.year);
    if (!values.year) {
      newErrors.year = "Year is required.";
    } else if (Number.isNaN(yearNum)) {
      newErrors.year = "Year must be a number.";
    } else if (yearNum < MIN_YEAR || yearNum > MAX_YEAR) {
      newErrors.year = `Year must be between ${MIN_YEAR} and ${MAX_YEAR}.`;
    }

    // HORSEPOWER
    const hpNum = Number(values.horsepower);
    if (!values.horsepower) {
      newErrors.horsepower = "Horsepower is required.";
    } else if (Number.isNaN(hpNum)) {
      newErrors.horsepower = "Horsepower must be a number.";
    } else if (hpNum < MIN_HP || hpNum > MAX_HP) {
      newErrors.horsepower = `Horsepower must be between ${MIN_HP} and ${MAX_HP}.`;
    }

    // PRICE
    const priceNum = Number(values.price);
    if (!values.price) {
      newErrors.price = "Price is required.";
    } else if (Number.isNaN(priceNum)) {
      newErrors.price = "Price must be a number.";
    } else if (priceNum < MIN_PRICE) {
      newErrors.price = `Price must be at least ${MIN_PRICE} €.`;
    }

    // IMAGE URL
    if (!values.imageUrl.trim()) {
      newErrors.imageUrl = "Image URL is required.";
    } else if (
      !/^https?:\/\/.+/.test(values.imageUrl.trim()) &&
      !values.imageUrl.trim().startsWith("/")
    ) {
      newErrors.imageUrl =
      "Image URL must start with http(s):// or be a relative path (/images/...).";
    }

    // DESCRIPTION
    if (!values.description.trim()) {
      newErrors.description = "Description is required.";
    } else if (values.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters.";
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
    
    const data = {
      ...formValues,
      year: Number(formValues.year),
      horsepower: Number(formValues.horsepower),
      price: Number(formValues.price),
    };

    try {
      setIsSubmitting(true);
      const createdCar = await request(
        "http://localhost:3030/data/cars",
        "POST",
        data
      );

      console.log("Created car:", createdCar);

      
      setFormValues({
        brand: "",
        model: "",
        year: "",
        horsepower: "",
        price: "",
        imageUrl: "",
        description: "",
      });

      
      navigate("/cars");
      
    } catch (err) {
setServerError(err.message || "Failed to create car.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-bold text-slate-900">
        Create new car
      </h1>

      <p className="mb-6 text-sm text-slate-600">
        Fill in the details below to create a new car listing.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        
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
               className={`w-full rounded-xl border px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-1 ${
                errors.brand
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                  : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
              }`}
            />
            {errors.brand && (
              <p className="mt-1 text-xs text-red-600">{errors.brand}</p>
            )}
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
              className={`w-full rounded-xl border px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-1 ${
                errors.model
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                  : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
              }`}
            />
            {errors.model && (
              <p className="mt-1 text-xs text-red-600">{errors.model}</p>
            )}
          </div>
        </div>

        
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
              min={MIN_YEAR}
              max={MAX_YEAR}
              required
              value={formValues.year}
              onChange={handleChange}
              placeholder="e.g. 2018"
              className={`w-full rounded-xl border px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-1 ${
                errors.year
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                  : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
              }`}
            />
            {errors.year && (
              <p className="mt-1 text-xs text-red-600">{errors.year}</p>
            )}
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
              min={MIN_HP}
              max={MAX_HP}
              required
              value={formValues.horsepower}
              onChange={handleChange}
              placeholder="e.g. 190"
               className={`w-full rounded-xl border px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-1 ${
                errors.horsepower
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                  : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
              }`}
            />
            {errors.horsepower && (
              <p className="mt-1 text-xs text-red-600">
                {errors.horsepower}
              </p>
            )}
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
              min={MIN_PRICE}
              required
              value={formValues.price}
              onChange={handleChange}
              placeholder="e.g. 24900"
               className={`w-full rounded-xl border px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-1 ${
                errors.price
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                  : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
              }`}
            />
            {errors.price && (
              <p className="mt-1 text-xs text-red-600">{errors.price}</p>
            )}
          </div>
        </div>

       
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
            className={`w-full rounded-xl border px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-1 ${
              errors.imageUrl
                ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
            }`}
          />
          {errors.imageUrl && (
            <p className="mt-1 text-xs text-red-600">{errors.imageUrl}</p>
          )}
        </div>

        
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
           className={`w-full rounded-xl border px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-1 ${
              errors.description
                ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
            }`}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-600">
              {errors.description}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-50 hover:bg-slate-800"
        >
          {isSubmitting ? "Creating..." : "Create Car"}
        </button>
      </form>
    </section>
  );
}
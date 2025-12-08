import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import request from "../../utils/request.js";

export default function CarEdit() {
  const { carId } = useParams();
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
  const [isLoading, setIsLoading] = useState(true);

 
  useEffect(() => {
    async function fetchCar() {
      try {
        const car = await request(
          `http://localhost:3030/data/cars/${carId}`
        );

        setFormValues({
          brand: car.brand || "",
          model: car.model || "",
          year: car.year != null ? String(car.year) : "",
          horsepower: car.horsepower != null ? String(car.horsepower) : "",
          price: car.price != null ? String(car.price) : "",
          imageUrl: car.imageUrl || "",
          description: car.description || "",
        });

        setIsLoading(false);
      } catch (err) {
        alert(err.message);
      }  finally {
        setIsLoading(false);
      }
    }

    fetchCar();
  }, [carId]);

  
  
  function validate(values) {
    const newErrors = {};
    const currentYear = new Date().getFullYear();
    
    
    if (!values.brand.trim()) {
      newErrors.brand = "Brand is required.";
    } else if (!/^[A-Za-z\s-]+$/.test(values.brand.trim())) {
      newErrors.brand = "Brand must contain only letters.";
    }
    
    
    if (!values.model.trim()) {
      newErrors.model = "Model is required.";
    }
    
    
    const yearNum = Number(values.year);
    if (!values.year.trim()) {
      newErrors.year = "Year is required.";
    } else if (Number.isNaN(yearNum)) {
      newErrors.year = "Year must be a number.";
    } else if (yearNum < 1886 || yearNum > currentYear + 1) {
      newErrors.year = `Year must be between 1886 and ${currentYear + 1}.`;
    }
    
    
    const hpNum = Number(values.horsepower);
    if (!values.horsepower.trim()) {
      newErrors.horsepower = "Horsepower is required.";
    } else if (Number.isNaN(hpNum)) {
      newErrors.horsepower = "Horsepower must be a number.";
    } else if (hpNum < 10) {
      newErrors.horsepower = "Horsepower must be at least 10 hp.";
    }
    
    
    const priceNum = Number(values.price);
    if (!values.price.trim()) {
      newErrors.price = "Price is required.";
    } else if (Number.isNaN(priceNum)) {
      newErrors.price = "Price must be a number.";
    } else if (priceNum <= 100) {
      newErrors.price = "Price must be at least 100 €.";
    }
    
    
    if (!values.imageUrl.trim()) {
      newErrors.imageUrl = "Image URL is required.";
    } else if (
      !/^https?:\/\/.+/.test(values.imageUrl.trim()) &&
      !values.imageUrl.trim().startsWith("/")
    ) {
      newErrors.imageUrl =
      "Image URL must start with http(s):// or be a relative path (/images/...).";
    }
    
    
    if (!values.description.trim()) {
      newErrors.description = "Description is required.";
    } else if (values.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters long.";
    }
    
    return newErrors;
  }

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
  }
  
  
  async function handleSubmit(e) {
    e.preventDefault();

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
      await request(
        `http://localhost:3030/data/cars/${carId}`,
        "PUT",
        data
      );
      
      navigate(`/cars/${carId}`);
    } catch (err) {
      alert(err.message);
    }
  }

  if (isLoading) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-10">
        <p className="text-sm text-slate-600">Loading car data...</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-bold text-slate-900">Edit car</h1>

      <p className="mb-6 text-sm text-slate-600">
        Update the fields below and save the changes for this car listing.
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
              min="1886"
              max="2100"
              required
              value={formValues.year}
              onChange={handleChange}
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
              min="10"
              required
              value={formValues.horsepower}
              onChange={handleChange}
              className={`w-full rounded-xl border px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-1 ${
                errors.horsepower
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                  : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
              }`}
            />
            {errors.horsepower && (
              <p className="mt-1 text-xs text-red-600">{errors.horsepower}</p>
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
              min="1"
              required
              value={formValues.price}
              onChange={handleChange}
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
            className={`w-full rounded-xl border px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-1 ${
              errors.description
                ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
            }`}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-600">{errors.description}</p>
          )}
        </div>

        <button
          type="submit"
          className="mt-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-50 hover:bg-slate-800"
        >
          Save changes
        </button>
      </form>
    </section>
  );
}
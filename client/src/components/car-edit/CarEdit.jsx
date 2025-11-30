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
      }
    }

    fetchCar();
  }, [carId]);

  
  function handleChange(e) {
    const { name, value } = e.target;

    setFormValues((state) => ({
      ...state,
      [name]: value,
    }));
  }

  
  async function handleSubmit(e) {
    e.preventDefault();

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
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
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
              min="1900"
              max="2100"
              required
              value={formValues.year}
              onChange={handleChange}
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
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
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
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
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
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
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

import { useEffect, useState } from "react";

import request from "../../utils/request.js";
import CarCard from "../../car-card/CarCard.jsx";


export default function Home() {
  const [latestCars, setLatestCars] = useState([]);

  useEffect(() => {
    request("http://localhost:3030/jsonstore/cars")
      .then((data) => {
        const recentCars = Object.values(data)
          .sort((a, b) => b._createdOn - a._createdOn)
          .slice(0, 3);

        setLatestCars(recentCars);
      })
      .catch((err) => alert(err.message));
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 lg:py-16">
      
      <div className="grid gap-10 lg:grid-cols-[3fr,2fr] items-center mb-10">
        <div className="space-y-6">
          <p className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
            React Car Marketplace Project
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
            Find your next car with{" "}
            <span className="text-emerald-600">CarHub</span>.
          </h1>

          <p className="max-w-xl text-sm sm:text-base text-slate-600">
            Browse the newest car listings added by our users. Below you can
            see the latest 3 cars added to the platform.
          </p>
        </div>

        
      </div>

      
      <div>
        <h2 className="mb-4 text-xl font-semibold text-slate-900">
          Latest listings
        </h2>

        {latestCars.length === 0 ? (
          <p className="text-sm text-slate-600">No cars to display.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestCars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

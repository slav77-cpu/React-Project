import { useEffect, useState } from "react";
import request from "../../utils/request.js";
import CarCard from "../car-card/CarCard.jsx";


export default function Cars() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    request("http://localhost:3030/data/cars")
      .then((data) => {
        
        setCars(data);
        
      })
      .catch((err) => alert(err.message));
  }, []);

  return (
   <div
      className="bg-cover bg-center bg-no-repeat min-h-screen"
      style={{ backgroundImage: 'url("/images/background.png")' }}
    >
      <section className="mx-auto max-w-6xl px-4 py-10 lg:py-16">

        <h1 className="mb-8 text-3xl sm:text-4xl font-extrabold text-slate-900">
          All Cars
        </h1>

        {cars.length === 0 ? (
          <p className="text-slate-700">No cars available.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        )}

      </section>
    </div>

  );
}
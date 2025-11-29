import { Link } from "react-router";

export default function CarCard({ car }) {
  const title = `${car.brand} ${car.model}`;

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-slate-900 shadow-lg">
     
      <img
        src={car.imageUrl}
        alt={title}
        className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />

      
      <div className="absolute bottom-4 left-4">
        <p className="text-xs uppercase tracking-wide text-slate-300">
          Horsepower
        </p>
        <p className="text-2xl font-extrabold text-emerald-400">
          {car.horsepower} hp
        </p>
      </div>

      
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-900/0 opacity-0 transition-all duration-300 group-hover:bg-slate-900/70 group-hover:opacity-100">
        <div className="space-y-3 text-center">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <Link
            to={`/cars/${car._id}`}
            className="pointer-events-auto inline-flex items-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 shadow-md transition-transform duration-200 hover:scale-105 hover:bg-emerald-400"
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
}

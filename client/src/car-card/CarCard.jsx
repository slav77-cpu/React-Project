// src/components/car/CarCard.jsx
import { Link } from "react-router-dom";

export default function CarCard({ car }) {
  
  const displayTitle =
    (car.brand || "") || (car.title || "Untitled car");
  const displayModel =
    car.model && car.brand ? ` ${car.model}` : car.model ? car.model : "";
  const fullTitle = `${car.brand || ""}${displayModel}`.trim() || car.title;

  const year = car.year || car.date || "-";
  const horsepower = car.horsepower || car.players;
  const price = car.price;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="h-40 w-full overflow-hidden bg-slate-200">
        {car.imageUrl ? (
          <img
            src={car.imageUrl}
            alt={fullTitle || "Car image"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
            No image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-slate-900 line-clamp-1">
          {fullTitle || displayTitle}
        </h3>

        {/* Subline */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span className="rounded-full bg-slate-100 px-2 py-0.5">
            Year: {year}
          </span>
          {horsepower != null && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5">
              {horsepower} hp
            </span>
          )}
          {price != null && (
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700">
              € {price}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 line-clamp-3">
          {car.summary || car.description || "No description provided."}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-xs text-slate-400">
            Added:{" "}
            {car._createdOn
              ? new Date(car._createdOn).toLocaleDateString()
              : "N/A"}
          </span>

          {/* To do: implement details page */}
          <Link
            to={`/catalog/${car._id}`}
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-50 hover:bg-slate-800"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}

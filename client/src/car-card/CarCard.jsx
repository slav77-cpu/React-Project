import { Link } from "react-router-dom";

export default function CarCard({ car }) {
  const title = `${car.brand} ${car.model}`;
  const year = car.year;
  const hp = car.horsepower;
  const price = car.price;

  return (
    <article className="flex flex-col rounded-2xl bg-white shadow-sm hover:shadow-md transition overflow-hidden">
      
     
      <div className="h-40 bg-slate-200 overflow-hidden">
        <img
          src={car.imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

   
      <div className="flex flex-col flex-1 p-4 gap-3">

       
        <h3 className="text-lg font-semibold text-slate-900 line-clamp-1">
          {title}
        </h3>

       
        <div className="flex items-center gap-3 text-xs text-slate-600">
          <span className="bg-slate-100 px-2 py-0.5 rounded-full">
            Year: {year}
          </span>

          <span className="bg-slate-100 px-2 py-0.5 rounded-full">
            {hp} hp
          </span>

          <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
            € {price}
          </span>
        </div>

        
        <p className="text-sm text-slate-600 line-clamp-3">
          {car.description}
        </p>

       
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-[11px] text-slate-400">
            Added: {new Date(car._createdOn).toLocaleDateString()}
          </span>

          <Link
            to={`/catalog/${car._id}`}
            className="rounded-full px-3 py-1.5 text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800"
          >
            Details
          </Link>
        </div>

      </div>
    </article>
  );
}

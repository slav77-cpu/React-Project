import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import request from "../../utils/request.js";
import { useAuth } from "../../context/authContext.jsx";

import {getLikesCount, getUserLike, addLike} from '../../services/likeService.js';

export default function CarDetails() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { user} = useAuth();
  const [car, setCar] = useState(null);

  const [likesCount, setLikesCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
   useEffect(() => {
    async function fetchData() {
      try {
       
        const carData = await request(`http://localhost:3030/data/cars/${carId}`);
        setCar(carData);

       
        const likes = await getLikesCount(carId);
        setLikesCount(likes);

        
        if (user?._id) {
          const userLike = await getUserLike(carId, user._id);
          setHasLiked(!!userLike);
        } else {
          setHasLiked(false);
        }
      } catch (err) {
        alert(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [carId, user?._id]);
  
  if ( isLoading||!car) {
    return (
      <div className="py-20 text-center text-xl text-slate-600">
        Loading car details...
      </div>
    );
  }
  
  const title = `${car.brand} ${car.model}`;
  const isOwner = user?._id === car._ownerId;


  // DELETE handler
async function handleDelete(id, navigate) {
  const choice = confirm("Are you sure you want to delete this car?");
  if (!choice) return;

  try {
    await request(`http://localhost:3030/data/cars/${id}`, "DELETE");
    navigate("/cars");
  } catch (err) {
    alert(err.message);
  }

  
}
// LIKE handler 
async function handleLike() {
    try {
      await addLike(carId);
      setHasLiked(true);
      setLikesCount((c) => c + 1);
    } catch (err) {
      alert(err.message);
    }
  }
  const canLike =
    user && !isOwner && !hasLiked;

  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen"
      style={{ backgroundImage: 'url("/images/background.png")' }}
    >
      <section className="mx-auto max-w-5xl px-4 py-10 lg:py-16">

        {/* HEADER */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-8">
          {title}
        </h1>

        <div className="grid lg:grid-cols-2 gap-10 p-6 rounded-2xl bg-white/80 shadow-xl backdrop-blur">

          {/* IMAGE */}
          <div className="flex items-center justify-center">
            <img
              src={car.imageUrl}
              alt={title}
              className="rounded-xl shadow-md max-h-[500px] object-cover"
            />
          </div>

          {/* DETAILS */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-800">{title}</h2>

            <p className="text-slate-700">
              <span className="font-semibold">Year:</span> {car.year}
            </p>

            <p className="text-slate-700">
              <span className="font-semibold">Horsepower:</span> {car.horsepower} hp
            </p>

            <p className="text-slate-700">
              <span className="font-semibold">Price:</span> {car.price} €
            </p>

            <p className="text-slate-700 leading-relaxed">
              {car.description}
            </p>
             {/* Likes info */}
            <p className="mt-4 text-sm text-slate-600">
              <span className="font-semibold">Likes:</span> {likesCount}
            </p>

            {/* ACTION BUTTONS */}
              {isOwner && (
            <div className="flex gap-4 pt-4">
              <Link
                to={`/cars/${carId}/edit`}
                className="px-4 py-2 rounded-md bg-emerald-500 text-slate-900 font-semibold hover:bg-emerald-400"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(carId, navigate)}
                className="px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-500"
              >
                Delete
              </button>

            </div>
            )}
            {/* Like – само за логнат не-owner, който още не е лайкнал */}
              {canLike && (
                <button
                  onClick={handleLike}
                  className="px-4 py-2 rounded-md bg-slate-900 text-slate-50 font-semibold hover:bg-slate-800"
                >
                 ♥️ Like
                </button>
              )}
          </div>

        </div>
      </section>
    </div>
  );
}



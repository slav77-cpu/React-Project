import { useEffect, useState } from "react";
import { Link } from "react-router";
import request from "../../utils/request.js";
import { useAuth } from "../../context/authContext.jsx";
import CarCard from "../car-card/CarCard.jsx";

export default function Profile() {
  const { user } = useAuth();
  const [myCars, setMyCars] = useState([]);
  const [likedCars, setLikedCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;

    async function fetchProfileData() {
      try {
    
        const myCarsQuery = encodeURIComponent(`_ownerId="${user._id}"`);
        const myCarsUrl = `http://localhost:3030/data/cars?where=${myCarsQuery}&sortBy=${encodeURIComponent('_createdOn desc')}`;
        const myCarsData = await request(myCarsUrl);

        
        // likes: { _id, carId, _ownerId } + load=car=carId:cars
        const likesQuery = encodeURIComponent(`_ownerId="${user._id}"`);
        const likesUrl = `http://localhost:3030/data/likes?where=${likesQuery}&load=${encodeURIComponent('car=carId:cars')}`;
        const likesData = await request(likesUrl);

        setMyCars(myCarsData || []);

        
        const onlyCars = (likesData || [])
          .map(l => l.car)
          .filter(Boolean); 

        setLikedCars(onlyCars);
      } catch (err) {
        alert(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfileData();
  }, [user?._id]);

  if (!user) {
    
    return (
      <div className="py-20 text-center text-slate-600">
        You must be logged in to see your profile.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="py-20 text-center text-xl text-slate-600">
        Loading profile...
      </div>
    );
  }

  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen"
      style={{ backgroundImage: 'url("/images/background.png")' }}
    >
      <section className="mx-auto max-w-6xl px-4 py-10 lg:py-16">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            My Profile
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Logged in as{" "}
            <span className="font-semibold text-slate-800">
              {user.email}
            </span>
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* My cars */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">
                My cars
              </h2>
              <span className="text-xs text-slate-500">
                {myCars.length} total
              </span>
            </div>

            {myCars.length === 0 ? (
              <p className="text-sm text-slate-600">
                You haven't created any car listings yet.{" "}
                <Link
                  to="/create"
                  className="font-semibold text-emerald-600 hover:underline"
                >
                  Create one now
                </Link>
                .
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {myCars.map((car) => (
                  <CarCard key={car._id} car={car} />
                ))}
              </div>
            )}
          </div>

          {/* Liked cars */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">
                Liked cars
              </h2>
              <span className="text-xs text-slate-500">
                {likedCars.length} liked
              </span>
            </div>

            {likedCars.length === 0 ? (
              <p className="text-sm text-slate-600">
                You haven't liked any cars yet.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {likedCars.map((car) => (
                  <CarCard key={car._id} car={car} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

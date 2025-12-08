import { Route, Routes } from "react-router"

import Home from "./components/home/Home"
import Header from "./components/header/Header"
import CarCreate from "./components/car-create/CarCreate"
import Cars from "./components/cars/Cars"
import CarDetails from "./components/car-details/CarDetails"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import CarEdit from "./components/car-edit/CarEdit"
import GuestGuard from "./guards/GuestGard"
import PrivateGuard from "./guards/PrivateGuard"
import NotFound from "./components/not-found/NotFound404"
import Profile from "./components/profile/Profile"



function App() {
  
  return (
    <>
    <div className="min-h-screen bg-slate-100 flex flex-col">


      <Header />
      <main> 
      <Routes >
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/:carId" element={<CarDetails />} />

        {/* Guest-only routes */}
        <Route element={<GuestGuard />}> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        </Route>

        {/* Private routes (only logged-in users) */}
        <Route element={<PrivateGuard />}> 
        <Route path="/create" element={<CarCreate />} />
        <Route path="/cars/:carId/edit" element={<CarEdit />} />
        <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound/>} />
      </Routes>
      </main>
    </div>
     
    </>
  )
}

export default App

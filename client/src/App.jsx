import { Route, Routes } from "react-router"

import Home from "./components/home/Home"
import Header from "./components/header/Header"
import CarCreate from "./components/car-create/CarCreate"
import Cars from "./components/cars/Cars"
import CarDetails from "./components/car-details/CarDetails"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import CarEdit from "./components/car-edit/CarEdit"



function App() {
  
  return (
    <>
    <div className="min-h-screen bg-slate-100 flex flex-col">

      <Header />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CarCreate />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/:carId" element={<CarDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cars/:carId/edit" element={<CarEdit />} />
      </Routes>
    </div>
     
    </>
  )
}

export default App

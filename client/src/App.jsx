import { Route, Routes } from "react-router"

import Home from "./components/home/Home"
import Header from "./components/header/Header"
import CarCreate from "./components/car-create/CarCreate"



function App() {
  
  return (
    <>
    <div className="min-h-screen bg-slate-100 flex flex-col">

      <Header />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CarCreate />} />
      </Routes>
    </div>
     
    </>
  )
}

export default App

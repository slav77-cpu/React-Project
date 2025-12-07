import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/authContext.jsx";

export default function GuestGuard() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    
    return <Navigate to="/" replace />;
  }

  
  return <Outlet />;
}

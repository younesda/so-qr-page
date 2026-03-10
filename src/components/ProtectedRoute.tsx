import { Navigate, Outlet } from "react-router-dom";
import { authStore } from "@/utils/auth";

const ProtectedRoute = () => {
  if (!authStore.isAuthenticated()) {
    return <Navigate replace to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;

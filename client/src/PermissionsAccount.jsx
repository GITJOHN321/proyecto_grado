import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function PermissionsAccount() {
  const {user, loading, isAuthenticated } = useAuth();

  if (user.user_type === "user_user") return <Navigate to="/" replace />;
  return <Outlet />;
}

export default PermissionsAccount;
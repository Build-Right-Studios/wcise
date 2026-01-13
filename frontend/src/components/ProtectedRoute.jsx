import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
  return <Navigate to={`/${role?.toLowerCase()}/dashboard`} replace />;
}

  return children;
};

export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  const alertedRef = useRef(false);

  // 🔔 Show alert only once
  useEffect(() => {
    if (token && role && !allowedRoles.includes(role) && !alertedRef.current) {
      alert("You are not authorized to access this page.");
      alertedRef.current = true;
    }
  }, [token, role, allowedRoles]);

  // 🔐 Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 Logged in but wrong role
  if (!allowedRoles.includes(role)) {
    return <Navigate to={`/${role?.toLowerCase()}/dashboard`} replace />;
  }

  // ✅ Authorized
  return children;
};

export default ProtectedRoute;

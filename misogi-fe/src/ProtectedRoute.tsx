import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }:any) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!user?._id) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

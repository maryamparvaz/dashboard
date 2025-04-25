
import { Navigate } from "react-router-dom";

const Index = () => {
  // This component just redirects to the login page
  return <Navigate to="/" replace />;
};

export default Index;


import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token")

  if (!token) {
    // Redirect to login page if no token is found
    return <Navigate to="/login" />
  }

  // Render the protected content if the user is authenticated
  return <>{children}</>
}

export default ProtectedRoute


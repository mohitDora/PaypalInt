import { Navigate } from 'react-router-dom'

function ProtectedRoute({children,user}) {
  return (
    user?children:<Navigate to="/signin"></Navigate>
  )
}

export default ProtectedRoute
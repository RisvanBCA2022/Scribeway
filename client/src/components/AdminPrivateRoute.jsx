import { useSelector } from "react-redux"
import { Outlet,Navigate } from "react-router-dom"

const AdminPrivateRoute = () => {
    const {currentUser}=useSelector((state)=>state.user)
  return currentUser && currentUser.isAdmin || currentUser.role === 'admin'? <Outlet /> : <Navigate to="/" />
}

export default AdminPrivateRoute

import { Navigate, Outlet } from "react-router-dom"

const isLogged = () => {
    return !!localStorage.getItem('token')
}

export default function PrivateRoutes() {
    return isLogged() ? <Outlet /> : <Navigate to='/login'/>
}
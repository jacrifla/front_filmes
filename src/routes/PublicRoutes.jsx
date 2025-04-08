import { Navigate, Outlet } from "react-router-dom"

const isLogged = () => {
    return !!localStorage.getItem('token')
}

export default function PublicRoutes() {
    return !isLogged() ? <Outlet /> : <Navigate to='/home' />
}
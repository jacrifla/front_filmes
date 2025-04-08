import { Routes, Route } from "react-router-dom";
import PublicRoutes from './PublicRoutes'
import PrivateRoutes from './PrivateRoutes'

import Login from '../pages/Login'
import Register from '../pages/Register'
import ResetPassword from '../pages/ResetPassword'
import Movies from '../pages/Movies'
import MovieDetails from '../pages/MovieDetails'
import Home from '../pages/Home'
import Saved from '../pages/Saved'
import Watched from '../pages/Watched'
import Settings from '../pages/Settings'
import TestTMDB from "../components/TestTMDB";

export default function AppRoutes() {
    return (
      <Routes>
        {/* ROTAS PÚBLICAS */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Route>
  
        {/* ROTAS PRIVADAS */}
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/watched" element={<Watched />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="/test-tmdb" element={<TestTMDB />} />

      </Routes>
    )
  }

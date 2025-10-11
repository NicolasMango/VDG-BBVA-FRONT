import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Oferta from './Oferta';
import BannerHipotecario from './OfertaHipotecario';
import BannerFamilia from './OfertaBebe';   
import MainContent from './MainContent';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainContent />} />
      <Route path="/login" element={<Login />} />
      <Route path="/oferta" element={<Oferta />} />
      <Route path="/oferta-hipotecario" element={<BannerHipotecario />} />
      <Route path="/oferta-bebe" element={<BannerFamilia />} />
    </Routes>
  );
}

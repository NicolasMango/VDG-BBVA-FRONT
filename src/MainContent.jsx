import React from 'react';
import tarjeta from './assets/tarjeta.png';
import moneda from './assets/moneda.png';
import { useNavigate } from 'react-router-dom';

export default function MainContent() {
  const navigate = useNavigate();
  return (
    <div className="bbva-container">
      <div className="floating-elements">
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
      </div>
      <header className="header">
        <div className="header-content">
          <a href="/" className="logo">BBVA</a>
          <nav>
            <ul className="nav-links">
              <li><a href="#personas">Personas</a></li>
              <li><a href="#empresas">Empresas</a></li>
              <li><a href="#inversiones">Inversiones</a></li>
              <li><a href="#seguros">Seguros</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="main-content">
        <div className="content-left">
          <p className="subtitle">Creando oportunidades</p>
          <h1 className="main-title">
            Tu <strong>tarjeta de crédito</strong><br />
            para disfrutar la vida
          </h1>
          <ul className="benefits-list">
            <li>Reintegros en supermercados, restaurantes y entretenimiento</li>
            <li>Suma Millas BBVA para canjear por viajes y experiencias únicas</li>
            <li>Bonificación total desde el mes 7 según tus consumos</li>
            <li>Acceso a promociones exclusivas y descuentos especiales</li>
          </ul>
          <div className="cta-buttons">
            <button 
              className="btn-primary"
              onClick={() => navigate('/login')}
            >
              Solicitar ahora
            </button>
            <button className="btn-secondary">
              Conocer beneficios
            </button>
          </div>
        </div>
        <div className="content-right">
          <div className="card-container">
            <img src={tarjeta} alt="Tarjeta BBVA" className="card-image" />
            <img src={moneda} alt="Millas BBVA" className="coin-image" />
          </div>
        </div>
      </main>
    </div>
  );
}

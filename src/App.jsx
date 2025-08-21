import { useNavigate } from 'react-router-dom'
import tarjeta from './assets/tarjeta.png'
import moneda from './assets/moneda.png'

export default function App() {
  const navigate = useNavigate()

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, sans-serif;
      line-height: 1.6;
      color: #043263;
      height: 100vh;
      overflow: hidden;
    }

    .bbva-container {
      width: 100vw;
      height: 100vh;
      background: linear-gradient(135deg, #004481 0%, #1464A0 25%, #5BBAD5 100%);
      position: fixed;
      top: 0;
      left: 0;
      overflow: hidden;
    }

    .bbva-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.03)"/><circle cx="75" cy="75" r="1.5" fill="rgba(255,255,255,0.02)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.04)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
      opacity: 0.5;
    }

    .header {
      position: relative;
      z-index: 10;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(4, 68, 129, 0.1);
      padding: 1rem 0;
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 2rem;
      font-weight: 700;
      color: #004481;
      text-decoration: none;
    }

    .nav-links {
      display: flex;
      gap: 2rem;
      list-style: none;
    }

    .nav-links a {
      color: #043263;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .nav-links a:hover {
      color: #004481;
    }

    .main-content {
      position: relative;
      z-index: 5;
      max-width: 1200px;
      margin: 0 auto;
      padding: 4rem 2rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
      min-height: calc(100vh - 80px);
    }

    .content-left {
      color: white;
    }

    .subtitle {
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 1rem;
      font-weight: 400;
    }

    .main-title {
      font-size: 3.5rem;
      font-weight: 300;
      line-height: 1.1;
      margin-bottom: 2rem;
      color: white;
    }

    .main-title strong {
      font-weight: 700;
    }

    .benefits-list {
      list-style: none;
      margin-bottom: 3rem;
    }

    .benefits-list li {
      padding: 0.75rem 0;
      padding-left: 2rem;
      position: relative;
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.9);
      line-height: 1.5;
    }

    .benefits-list li::before {
      content: '✓';
      position: absolute;
      left: 0;
      top: 0.75rem;
      width: 1.5rem;
      height: 1.5rem;
      background: #5BBAD5;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: white;
      font-size: 0.8rem;
    }

    .cta-buttons {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .btn-primary {
      background: #5BBAD5;
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-block;
      text-align: center;
    }

    .btn-primary:hover {
      background: #4BA5C8;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(91, 186, 213, 0.3);
    }

    .btn-secondary {
      background: transparent;
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.6);
      padding: 1rem 2rem;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-block;
      text-align: center;
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: white;
      transform: translateY(-2px);
    }

    .content-right {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .card-container {
      position: relative;
      animation: float 6s ease-in-out infinite;
    }

    .card-image {
      width: 400px;
      max-width: 100%;
      height: auto;
      filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3));
      transition: transform 0.3s ease;
    }

    .card-image:hover {
      transform: scale(1.05);
    }

    .coin-image {
      position: absolute;
      bottom: -20px;
      right: 20px;
      width: 60px;
      height: 60px;
      animation: spin 8s linear infinite;
      filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2));
    }

    .floating-elements {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }

    .floating-circle {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      animation: float-circles 8s ease-in-out infinite;
    }

    .floating-circle:nth-child(1) {
      width: 80px;
      height: 80px;
      top: 10%;
      left: 10%;
      animation-delay: -2s;
    }

    .floating-circle:nth-child(2) {
      width: 120px;
      height: 120px;
      top: 60%;
      right: 10%;
      animation-delay: -4s;
    }

    .floating-circle:nth-child(3) {
      width: 60px;
      height: 60px;
      bottom: 20%;
      left: 5%;
      animation-delay: -6s;
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0px) rotate(0deg);
      }
      50% {
        transform: translateY(-20px) rotate(2deg);
      }
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes float-circles {
      0%, 100% {
        transform: translateY(0px);
        opacity: 0.3;
      }
      50% {
        transform: translateY(-30px);
        opacity: 0.6;
      }
    }

    @media (max-width: 768px) {
      .main-content {
        grid-template-columns: 1fr;
        gap: 2rem;
        padding: 2rem 1rem;
        text-align: center;
      }

      .main-title {
        font-size: 2.5rem;
      }

      .nav-links {
        display: none;
      }

      .cta-buttons {
        justify-content: center;
      }

      .btn-primary,
      .btn-secondary {
        width: 100%;
        max-width: 280px;
      }

      .card-image {
        width: 300px;
      }
    }
  `;

  return (
    <div>
      <style>{styles}</style>
      
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
    </div>
  )
}

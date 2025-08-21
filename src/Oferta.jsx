import { useEffect, useState } from 'react'

const styles = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Roboto:wght@400;500;700&display=swap');

    body, #root {
        margin: 0;
        padding: 0;
        font-family: 'Roboto', sans-serif;
        min-height: 100vh;
        overflow-x: hidden;
        display: flex;
        justify-content: center;
    }

    /* Animación de fondo tipo nova.app - SIEMPRE VISIBLE */
    .animated-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(-45deg, #004481, #1464A0, #5BBAD5, #85C8FF);
        background-size: 400% 400%;
        animation: gradientShift 15s ease infinite;
        z-index: 0;
    }

    .animated-background::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 20% 50%, rgba(0, 68, 129, 0.4) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(20, 100, 160, 0.4) 0%, transparent 50%),
                    radial-gradient(circle at 40% 80%, rgba(91, 186, 213, 0.4) 0%, transparent 50%);
        animation: floatingOrbs 20s ease-in-out infinite;
    }

    .animated-background::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 60% 70%, rgba(133, 200, 255, 0.2) 0%, transparent 40%),
                    radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 40%);
        animation: floatingOrbs 25s ease-in-out infinite reverse;
    }

    @keyframes gradientShift {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    @keyframes floatingOrbs {
        0%, 100% {
            transform: translate(0px, 0px) scale(1) rotate(0deg);
        }
        25% {
            transform: translate(30px, -30px) scale(1.1) rotate(90deg);
        }
        50% {
            transform: translate(-20px, 20px) scale(0.9) rotate(180deg);
        }
        75% {
            transform: translate(40px, 10px) scale(1.05) rotate(270deg);
        }
    }

    /* Animación de entrada para las tarjetas */
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    /* Contenedor principal */
    .oferta-container {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 28px;
        width: 100%;
        max-width: 1200px;
        box-sizing: border-box;
        margin: 0 auto;
    }

    /* Título principal */
    .oferta-title {
        font-family: 'DM Serif Display', serif;
        font-size: 32px;
        font-weight: 700;
        text-align: center;
        margin-bottom: 40px;
        color: #FFFFFF;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        padding: 20px;
        border-radius: 15px;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    /* Contenedor para las tarjetas */
    .cards-container {
        display: flex;
        gap: 28px;
        padding: 28px;
        flex-wrap: wrap;
        justify-content: center;
        max-width: 1200px;
        width: 100%;
    }

    /* Estilo individual de cada tarjeta */
    .promo-card {
        border-radius: 20px;
        padding: 28px;
        text-decoration: none;
        display: flex;
        flex-direction: column;
        gap: 14px;
        flex: 1;
        min-width: 300px;
        max-width: 400px;
        box-shadow: 0 10px 30px -15px rgba(0, 20, 145, 0.2);
        transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        position: relative;
        overflow: hidden;
        animation: fadeIn 0.7s ease-out forwards;
        opacity: 0;
        cursor: pointer;
    }

    /* Estilo de la tarjeta CLARA */
    .promo-card--light {
        background: linear-gradient(135deg, #FFFFFF 0%, #E3F2FD 100%);
        border: 1px solid #E2E6EA;
        color: #060E46;
    }

    /* Estilo de la tarjeta OSCURA */
    .promo-card--dark {
        background: linear-gradient(135deg, #001391 0%, #000519 100%);
        border: 1px solid #46526D;
        color: #FFFFFF;
        animation-delay: 0.2s;
    }

    .promo-card:hover {
        transform: translateY(-10px) scale(1.03);
        box-shadow: 0 20px 45px -15px rgba(0, 20, 145, 0.35);
    }

    /* Título de la tarjeta */
    .card-title {
        font-family: 'DM Serif Display', serif;
        font-size: 24px;
        margin: 0;
        line-height: 1.25;
        margin-bottom: 10px;
    }

    .promo-card--dark .card-title {
        color: #FFFFFF;
        text-shadow: 0 0 10px rgba(139, 225, 233, 0.3);
    }

    /* Descripción de la tarjeta */
    .card-description {
        font-size: 15px;
        line-height: 1.6;
        margin: 0;
        margin-bottom: 15px;
    }

    .promo-card--light .card-description {
        color: #46526D;
    }

    .promo-card--dark .card-description {
        color: #CAD1D8;
    }

    /* Información adicional */
    .card-info {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 20px;
    }

    .card-info-item {
        font-size: 13px;
        font-weight: 500;
    }

    .promo-card--light .card-info-item {
        color: #46526D;
    }

    .promo-card--dark .card-info-item {
        color: #85C8FF;
    }

    /* Botón de acción */
    .card-button {
        background: transparent;
        border: 2px solid;
        border-radius: 8px;
        padding: 12px 24px;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-top: auto;
    }

    .promo-card--light .card-button {
        border-color: #001391;
        color: #001391;
    }

    .promo-card--light .card-button:hover {
        background: #001391;
        color: #FFFFFF;
        transform: translateY(-2px);
    }

    .promo-card--dark .card-button {
        border-color: #85C8FF;
        color: #85C8FF;
    }

    .promo-card--dark .card-button:hover {
        background: #85C8FF;
        color: #001391;
        transform: translateY(-2px);
    }

    /* Mensaje de carga */
    .loading-message {
        font-family: 'Roboto', sans-serif;
        font-size: 18px;
        color: #FFFFFF;
        text-align: center;
        padding: 40px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 15px;
        backdrop-filter: blur(15px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        animation: pulse 2s ease-in-out infinite;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.05);
            opacity: 0.8;
        }
    }

    /* Adaptación para dispositivos móviles */
    @media (max-width: 768px) {
        .cards-container {
            flex-direction: column;
            padding: 16px;
            gap: 20px;
        }
        .card-title {
            font-size: 20px;
        }
        .oferta-title {
            font-size: 24px;
        }
    }
`;

// Componente para cada tarjeta de oferta
const OfertaCard = ({ oferta, index }) => {
    const theme = 'dark'; // Forzar tema oscuro
    const cardClass = `promo-card promo-card--${theme}`;

    return (
        <div className={cardClass} style={{ animationDelay: `${index * 0.2}s` }}>
            <h2 className="card-title">{oferta.titulo}</h2>
            <p className="card-description">{oferta.cuerpo}</p>
            
            <div className="card-info">
                <div className="card-info-item">
                    <strong>Motivo:</strong> {oferta.motivo_interno}
                </div>
                <div className="card-info-item">
                    <strong>Confianza:</strong> {oferta.score_confianza}/10
                </div>
            </div>

            <button className="card-button">
                {oferta.cta}
            </button>
        </div>
    );
};

export default function Oferta() {
    const [oferta, setOferta] = useState(null)
    const [loading, setLoading] = useState(true)
    const dni = sessionStorage.getItem('dni')

    useEffect(() => {
        if (dni) {
            fetch(`/api/oferta/${dni}`)
                .then(res => res.json())
                .then(data => {
                    setOferta(data)
                    setLoading(false)
                })
                .catch(err => {
                    console.error(err)
                    setLoading(false)
                })
        }
    }, [dni])

    return (
        <div>
            <style>{styles}</style>
            
            {/* Fondo animado que aparece solo durante la carga */}
            {loading && <div className="animated-background"></div>}
            
            <div className="oferta-container">
                <h1 className="oferta-title">
                    Ofertas personalizadas para DNI: {dni}
                </h1>
                
                {loading ? (
                    <div className="loading-message">
                        Cargando ofertas personalizadas...
                    </div>
                ) : oferta ? (
                    <div className="cards-container">
                        {oferta.ofertas_generadas.map((of, index) => (
                            <OfertaCard 
                                key={index} 
                                oferta={of} 
                                index={index}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="loading-message">
                        Error al cargar las ofertas
                    </div>
                )}
            </div>
        </div>
    )
}
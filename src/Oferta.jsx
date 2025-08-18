import { useEffect, useState } from 'react'

const styles = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Roboto:wght@400;500;700&display=swap');

    body, #root {
        margin: 0;
        padding: 0;
        font-family: 'Roboto', sans-serif;
        background-color: #f0f4f8;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
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
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;
        padding: 28px;
        width: 100%;
        box-sizing: border-box;
    }

    /* Título principal */
    .oferta-title {
        font-family: 'DM Serif Display', serif;
        font-size: 32px;
        font-weight: 700;
        text-align: center;
        margin-bottom: 40px;
        color: #060E46;
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

    /* Alternancia de estilos claros y oscuros */
    .promo-card--light {
        background: linear-gradient(135deg, #FFFFFF 0%, #E3F2FD 100%);
        border: 1px solid #E2E6EA;
        color: #060E46;
    }

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
    }

    .promo-card--dark .card-button {
        border-color: #85C8FF;
        color: #85C8FF;
    }

    .promo-card--dark .card-button:hover {
        background: #85C8FF;
        color: #001391;
    }

    /* Mensaje de carga */
    .loading-message {
        font-family: 'Roboto', sans-serif;
        font-size: 18px;
        color: #46526D;
        text-align: center;
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
    //const theme = index % 2 === 0 ? 'light' : 'dark';
    const theme = 'dark'; // Todas las tarjetas serán oscuras
    const cardClass = `promo-card promo-card--${theme}`;

    return (
        <div className={cardClass} style={{ animationDelay: `${index * 0.1}s` }}>
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
    const dni = sessionStorage.getItem('dni')

    useEffect(() => {
        if (dni) {
            fetch(`/api/oferta/${dni}`)
                .then(res => res.json())
                .then(data => setOferta(data))
                .catch(err => console.error(err))
        }
    }, [dni])

    return (
        <div>
            <style>{styles}</style>
            <div className="oferta-container">
                <h1 className="oferta-title">
                    Ofertas personalizadas para DNI: {dni}
                </h1>
                
                {oferta ? (
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
                        Cargando ofertas personalizadas...
                    </div>
                )}
            </div>
        </div>
    )
}
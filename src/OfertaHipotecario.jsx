import React, { useState } from 'react';
import hipotecarioBg from './assets/hipotecario.png';
// --- Datos del Escenario Hipotecario ---
const scenario = {
    id: "hipotecario",
    step1: {
        h1: "A tu sueño le faltaba solo un empujón.",
        p: "Sabemos lo que significa construir tu lugar en el mundo. Por eso, te pre-aprobamos <span class='highlight'>$1.500.000</span> para que des el siguiente paso y transformes tu casa en el hogar que siempre quisiste.",
        cta: "Hacerlo realidad",
    },
    step2: {
        h1: "Estás a un clic de empezar.",
        p: "Confirmá la solicitud y comenzá a planificar. El dinero se acreditará en tu cuenta en las próximas 24hs hábiles para que no esperes más.",
        cta: "Sí, quiero mi préstamo",
        subtext: "Acreditación inmediata"
    },
    backgroundImage: hipotecarioBg
};
// --- Componente Banner Hipotecario ---
const BannerHipotecario = () => {
    const [step, setStep] = useState(1);
    const { id, step1, step2, backgroundImage } = scenario;

    const handleCtaClick = () => {
        if (step2) {
            setStep(2);
        } else {
            console.log("Acción final para escenario sin paso 2");
        }
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Lato:wght@400;700&display=swap');
                body {
                    font-family: 'Lato', sans-serif;
                    background-color: #f1f5f9;
                    margin: 0; padding: 0; box-sizing: border-box;
                }
                .showcase-wrapper {
                    display: grid;
                    place-items: center;
                    min-height: 100vh;
                    padding: 2rem;
                    box-sizing: border-box;
                }
                .gse-v10-banner-container {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    max-width: 1100px;
                    min-height: 650px;
                    height: 80vh;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 25px 50px -12px rgba(0, 19, 145, 0.35);
                    background-color: #060E46;
                }
                @media (min-width: 768px) {
                    .gse-v10-banner-container {
                        flex-direction: row;
                        aspect-ratio: 16 / 9;
                        min-height: 500px;
                        height: 80vh;
                    }
                }
                .gse-v10-visual-pane {
                    flex: 1.1;
                    position: relative;
                    user-select: none;
                    min-height: 250px;
                    overflow: hidden;
                }
                @keyframes zoomIn {
                    from { transform: scale(1); }
                    to { transform: scale(1.05); }
                }
                .gse-v10-background-image {
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                    background-position: center;
                    animation: zoomIn 15s ease-out alternate infinite;
                }
                .gse-v10-content-pane {
                    flex: 0.9;
                    position: relative;
                    padding: clamp(25px, 4vw, 40px);
                    display: grid;
                    place-items: center;
                    color: white;
                    overflow: hidden;
                    min-height: 250px;
                }
                .gse-v10-content-step {
                     grid-area: 1 / 1;
                     width: 100%;
                     height: 100%;
                     display: flex;
                     flex-direction: column;
                     opacity: 0;
                     transform: translateY(10px);
                     pointer-events: none;
                     transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
                }
                .gse-v10-text-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    min-height: 0;
                }
                .gse-v10-button-group {
                    flex-shrink: 0;
                    padding-top: 15px;
                }
                .gse-v10-content-step.visible {
                    opacity: 1;
                    transform: translateY(0);
                    pointer-events: auto;
                }
                .gse-v10-content-pane::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 150%;
                    padding-bottom: 150%;
                    background: radial-gradient(circle, rgba(0, 19, 145, 0.4) 0%, rgba(6, 14, 70, 0) 60%);
                    transform: translate(-50%, -50%);
                    animation: aurora 15s linear infinite;
                    will-change: transform;
                }
                @keyframes aurora {
                    0% { transform: translate(-50%, -50%) rotate(0deg); }
                    100% { transform: translate(-50%, -50%) rotate(360deg); }
                }
                .gse-v10-content-pane h1 {
                    font-family: 'DM Serif Display', serif;
                    font-size: clamp(2rem, 3.5vw, 2.8rem);
                    color: #FFFFFF;
                    margin-bottom: 20px;
                    line-height: 1.2;
                    text-shadow: 0 2px 10px rgba(0,0,0,0.3);
                }
                .gse-v10-content-pane p {
                    font-size: clamp(1rem, 1.6vw, 1.1rem);
                    color: #dbeafe;
                    line-height: 1.6;
                    max-width: 450px;
                    margin-bottom: 0;
                    text-shadow: 0 1px 5px rgba(0,0,0,0.3);
                }
                .gse-v10-content-pane .highlight {
                    color: #FFB56B;
                    font-weight: 700;
                }
                .gse-v10-button-group {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                    align-items: center;
                }
                .gse-v10-cta-button, .gse-v10-secondary-button {
                    display: inline-flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 12px 28px;
                    font-family: 'Lato', sans-serif;
                    font-weight: 700;
                    font-size: clamp(0.9rem, 1.3vw, 1rem);
                    border-radius: 50px;
                    text-decoration: none;
                    cursor: pointer;
                    border: 2px solid transparent;
                    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                }
                .gse-v10-cta-button {
                    color: #060E46;
                    background-color: #FFB56B;
                    border-color: #FFB56B;
                    box-shadow: 0 5px 20px rgba(0,0,0, 0.2);
                }
                .gse-v10-cta-button:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 10px 25px rgba(255, 181, 107, 0.3);
                }
                .gse-v10-cta-subtext {
                    font-size: clamp(0.7rem, 1vw, 0.75rem);
                    font-weight: 400;
                    opacity: 0.8;
                    margin-top: 2px;
                }
                .gse-v10-secondary-button {
                    background-color: transparent;
                    color: #a3d5ff;
                    border-color: #a3d5ff;
                }
                .gse-v10-secondary-button:hover {
                    background-color: rgba(133, 200, 255, 0.1);
                    color: #dbeafe;
                    border-color: #dbeafe;
                }
                @keyframes pulse-glow {
                    0% { box-shadow: 0 0 0 0 rgba(255, 181, 107, 0.7); }
                    70% { box-shadow: 0 0 0 12px rgba(255, 181, 107, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(255, 181, 107, 0); }
                }
                .pulse-animation {
                    animation: pulse-glow 2s infinite;
                }
            `}</style>
            <div className="showcase-wrapper">
                <div className="gse-v10-banner-container">
                    <div className="gse-v10-visual-pane">
                        <div
                            className="gse-v10-background-image"
                            style={{ backgroundImage: `url(${backgroundImage})` }}
                        ></div>
                    </div>

                    <div className="gse-v10-content-pane">
                        {/* Vista del Paso 1 */}
                        <div className={`gse-v10-content-step ${step === 1 ? 'visible' : ''}`}>
                            <div className="gse-v10-text-content">
                                <h1>{step1.h1}</h1>
                                <p dangerouslySetInnerHTML={{ __html: step1.p }}></p>
                            </div>
                            <div className="gse-v10-button-group">
                                <button onClick={handleCtaClick} className="gse-v10-cta-button pulse-animation">
                                    {step1.cta}
                                </button>
                            </div>
                        </div>
                       
                        {/* Vista del Paso 2 */}
                        <div className={`gse-v10-content-step ${step === 2 ? 'visible' : ''}`}>
                            <div className="gse-v10-text-content">
                                <h1>{step2.h1}</h1>
                                <p dangerouslySetInnerHTML={{ __html: step2.p }}></p>
                            </div>
                            <div className="gse-v10-button-group">
                                 <button onClick={() => setStep(1)} className="gse-v10-secondary-button">Volver</button>
                                <button className="gse-v10-cta-button">
                                    {step2.cta}
                                    {step2.subtext && <span className="gse-v10-cta-subtext">{step2.subtext}</span>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BannerHipotecario;

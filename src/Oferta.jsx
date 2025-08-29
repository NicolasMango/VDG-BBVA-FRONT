import { useEffect, useState } from 'react'



/* ==== EFECTOS (ADD-ON, NO ROMPE NADA) ==== */
const EXTRA_STYLES = `
/* reveal */
.fx-reveal{opacity:0;transform:translateY(10px) scale(.985)}
.fx-visible{opacity:1;transform:translateY(0) scale(1);transition:opacity .55s ease,transform .55s ease}

/* tilt 3D con CSS vars */
.promo-card[data-tilt="1"]{transform:perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translateY(-4px) scale(1.015)}

/* destello diagonal */
.card-shine{position:absolute;inset:0;background:linear-gradient(120deg,transparent 0%,rgba(255,255,255,.08) 35%,transparent 65%);transform:translateX(-110%);transition:transform .8s ease;pointer-events:none}
.promo-card:hover .card-shine{transform:translateX(110%)}

/* badge superior */
.badge{align-self:flex-start;background:linear-gradient(90deg,#85C8FF,#7C8CFF);color:#00143a;font-weight:800;letter-spacing:.2px;padding:6px 10px;border-radius:999px;font-size:12px;box-shadow:0 6px 16px rgba(133,200,255,.35)}

/* CTA con glow + ripple */
.card-button{position:relative;overflow:hidden}
.card-button.fx-cta{box-shadow:0 0 0 rgba(133,200,255,0);transition:box-shadow .25s ease}
.card-button.fx-cta:hover{box-shadow:0 8px 26px rgba(133,200,255,.35)}
.ripple{position:absolute;border-radius:50%;background:rgba(255,255,255,.35);transform:scale(0);animation:ripple .6s ease-out;pointer-events:none}
@keyframes ripple{to{transform:scale(3);opacity:0}}

/* confetti simple */
.confetti-piece{position:fixed;width:8px;height:8px;border-radius:2px;opacity:1;animation:confetti-fall 1.1s ease-out forwards;z-index:9999;pointer-events:none}
@keyframes confetti-fall{to{transform:translate(var(--tx),var(--ty)) rotate(var(--rz));opacity:0}}
`;

function injectExtraStyles(){
  if(document.getElementById('fx-extra-css')) return;
  const s=document.createElement('style');
  s.id='fx-extra-css';
  s.textContent=EXTRA_STYLES;
  document.head.appendChild(s);
}

function addBadge(card, index){
  if(card.querySelector('.badge')) return;
  const b=document.createElement('span');
  b.className='badge';
  b.textContent = index===0 ? 'Recomendado' : 'Exclusivo'; // cambiá textos si querés
  card.prepend(b);
}

function addShine(card){
  if(card.querySelector('.card-shine')) return;
  const shine=document.createElement('span');
  shine.className='card-shine';
  card.appendChild(shine);
}

function addReveal(card){
  card.classList.add('fx-reveal');
  const io=new IntersectionObserver(([e])=>{
    if(e.isIntersecting){ card.classList.add('fx-visible'); io.disconnect(); }
  },{threshold:.25});
  io.observe(card);
}

function addTilt(card,max=7){
  const onMove=(e)=>{
    const r=card.getBoundingClientRect();
    const x=e.clientX-r.left, y=e.clientY-r.top;
    const rx=((y-r.height/2)/(r.height/2))*-max;
    const ry=((x-r.width/2)/(r.width/2))* max;
    card.style.setProperty('--rx',`${rx}deg`);
    card.style.setProperty('--ry',`${ry}deg`);
    card.setAttribute('data-tilt','1');
  };
  const onLeave=()=>{
    card.style.setProperty('--rx','0deg');
    card.style.setProperty('--ry','0deg');
    card.removeAttribute('data-tilt');
  };
  card.addEventListener('mousemove', onMove);
  card.addEventListener('mouseleave', onLeave);
}

function enhanceCTA(btn){
  if(btn.dataset.fx) return;
  btn.classList.add('fx-cta');
  btn.addEventListener('click',(e)=>{
    const rect=btn.getBoundingClientRect();
    // ripple
    const d=Math.max(rect.width,rect.height);
    const circle=document.createElement('span');
    circle.className='ripple';
    circle.style.width=circle.style.height=`${d}px`;
    circle.style.left=`${e.clientX-rect.left-d/2}px`;
    circle.style.top =`${e.clientY-rect.top -d/2}px`;
    btn.appendChild(circle);
    setTimeout(()=>circle.remove(),600);
    // confetti
    const colors=['#85C8FF','#7C8CFF','#00E5FF','#00FFA3'];
    const cx=rect.left+rect.width/2, cy=rect.top;
    for(let i=0;i<16;i++){
      const p=document.createElement('i');
      p.className='confetti-piece';
      p.style.left=(cx+(Math.random()*40-20))+'px';
      p.style.top =(cy+(Math.random()*20-10))+'px';
      p.style.setProperty('--tx',(Math.random()*120-60)+'px');
      p.style.setProperty('--ty',(70+Math.random()*80)+'px');
      p.style.setProperty('--rz',(Math.random()*360)+'deg');
      p.style.background=colors[i%colors.length];
      document.body.appendChild(p);
      setTimeout(()=>p.remove(),1200);
    }
    if(navigator.vibrate) navigator.vibrate(10);
  });
  btn.dataset.fx='1';
}

function initPresentationEnhancers(){
  injectExtraStyles();
  const container=document.querySelector('.cards-container');
  if(!container) return;
  const apply=()=>{
    const cards = container.querySelectorAll('.promo-card');
    cards.forEach((card, i)=>{
      if(card.dataset.fx) return;
      addReveal(card);
      addTilt(card,7);
      addShine(card);
      addBadge(card,i);
      card.querySelectorAll('.card-button').forEach(enhanceCTA);
      card.dataset.fx='1';
    });
  };
  // aplicar a lo ya renderizado
  apply();
  // si React re-renderiza, volvemos a aplicar solo a nuevos nodos
  const mo=new MutationObserver(apply);
  mo.observe(container,{childList:true,subtree:true});
}

// === JS — AGREGAR DEBAJO DE TUS IMPORTS (no reemplaza nada) ===
function initOfferEffects() {
  // Fondo con parallax suave (si existe el fondo)
  const bg = document.querySelector('.animated-background');
  if (bg && !bg.dataset.enhanced) {
    const onMove = (e) => {
      const { innerWidth:w, innerHeight:h } = window;
      const x = (e.clientX / w - 0.5) * 10;
      const y = (e.clientY / h - 0.5) * 10;
      bg.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    window.addEventListener('mousemove', onMove);
    bg.dataset.enhanced = '1';
  }

  // Cards: reveal + tilt + shine + ripple/confetti en CTA
  const cards = document.querySelectorAll('.promo-card');
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.25 });

  cards.forEach((card) => {
    if (card.dataset.enhanced) return;
    card.classList.add('reveal');
    io.observe(card);

    // Shine overlay si no existe
    if (!card.querySelector('.card-shine')) {
      const shine = document.createElement('span');
      shine.className = 'card-shine';
      card.appendChild(shine);
    }

    // Tilt
    const onMouseMove = (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const rx = ((y - r.height/2) / (r.height/2)) * -7;
      const ry = ((x - r.width/2)  / (r.width/2))  *  7;
      card.style.setProperty('--rx', `${rx}deg`);
      card.style.setProperty('--ry', `${ry}deg`);
      card.setAttribute('data-tilt', '1');
    };
    const onLeave = () => {
      card.style.setProperty('--rx', `0deg`);
      card.style.setProperty('--ry', `0deg`);
      card.removeAttribute('data-tilt');
    };
    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onLeave);

    // Botón CTA: ripple + confetti
    card.querySelectorAll('.card-button').forEach((btn) => {
      if (btn.dataset.enhanced) return;
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.addEventListener('click', (e) => {
        // ripple
        const rect = btn.getBoundingClientRect();
        const d = Math.max(rect.width, rect.height);
        const circle = document.createElement('span');
        circle.className = 'ripple';
        circle.style.width = circle.style.height = `${d}px`;
        circle.style.left = `${e.clientX - rect.left - d/2}px`;
        circle.style.top  = `${e.clientY - rect.top  - d/2}px`;
        btn.appendChild(circle);
        setTimeout(() => circle.remove(), 600);

        // confetti
        const colors = ['#85C8FF','#7C8CFF','#00E5FF','#00FFA3'];
        const cx = rect.left + rect.width/2, cy = rect.top;
        for (let i = 0; i < 16; i++) {
          const p = document.createElement('i');
          p.className = 'confetti-piece';
          p.style.left = (cx + (Math.random()*40-20)) + 'px';
          p.style.top  = (cy + (Math.random()*20-10)) + 'px';
          p.style.setProperty('--tx', (Math.random()*120-60)+'px');
          p.style.setProperty('--ty', (70 + Math.random()*80)+'px');
          p.style.setProperty('--rz', (Math.random()*360)+'deg');
          p.style.background = colors[i % colors.length];
          document.body.appendChild(p);
          setTimeout(() => p.remove(), 1200);
        }
        // vibración suave si está disponible
        if (navigator.vibrate) navigator.vibrate(10);
      });
      btn.dataset.enhanced = '1';
    });

    card.dataset.enhanced = '1';
  });
}


/* === NUEVO: copy limpio por producto (sin datos sensibles) === */
/*const copyByProducto = (producto = '') => {
  const p = String(producto).toLowerCase();

  if (p.includes('black')) {
    return {
      titulo: 'Viví la experiencia Black',
      cuerpo: 'Acceso a salas VIP, upgrades en hoteles y asistencia 24/7 para viajes sin fricción.',
      cta: 'Solicitar ahora',
    };
  }
  if (p.includes('platinum')) {
    return {
      titulo: 'Potenciá tus compras Platinum',
      cuerpo: 'Beneficios en comercios seleccionados, atención preferencial y cuotas flexibles.',
      cta: 'Conocer beneficios',
    };
  }
  if (p.includes('gold')) {
    return {
      titulo: 'Beneficios Gold a tu medida',
      cuerpo: 'Bonificaciones, cuotas y ventajas en tu día a día.',
      cta: 'Quiero mi tarjeta',
    };
  }
  // Genérico por defecto
  return {
    titulo: `Beneficios ${producto || 'Premium'}`,
    cuerpo: 'Cuotas, bonificaciones y atención prioritaria para aprovechar al máximo tu producto.',
    cta: 'Ver detalles',
  };
};*/

/* === NUEVO: mapeos de ofertas con el MISMO shape === */
/*const mapOffer1 = (data) => ({
  titulo: data?.mensaje_final?.titulo ?? 'Experimentá un nuevo nivel de exclusividad',
  cuerpo: data?.mensaje_final?.cuerpo ?? 'Acceso a salas VIP, upgrades y concierge personal.',
  cta:    data?.mensaje_final?.cta    ?? 'Descubrir beneficios',
});*/

const mapOffer2 = (data) => {
  const producto = data?.estrategia?.producto_sugerido_codigo ?? 'Producto Premium';
  // NO usamos resumen_cliente ni motivo; solo copy curado por producto
  return copyByProducto(producto);
};

const normalizeOferta = (data) => ({
  ofertas_generadas: [mapOffer1(data), mapOffer2(data)],
});
/* === FIN NUEVO === */



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
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    @keyframes floatingOrbs {
        0%, 100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
        25%      { transform: translate(30px, -30px) scale(1.1) rotate(90deg); }
        50%      { transform: translate(-20px, 20px) scale(0.9) rotate(180deg); }
        75%      { transform: translate(40px, 10px) scale(1.05) rotate(270deg); }
    }

    /* Animación de entrada para las tarjetas */
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px) scale(0.98); }
        to   { opacity: 1; transform: translateY(0)      scale(1); }
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
        margin: 0 0 10px 0;
        line-height: 1.25;
    }
    .promo-card--dark .card-title { color: #FFFFFF; text-shadow: 0 0 10px rgba(139, 225, 233, 0.3); }

    /* Descripción de la tarjeta */
    .card-description {
        font-size: 15px;
        line-height: 1.6;
        margin: 0 0 15px 0;
    }
    .promo-card--light .card-description { color: #46526D; }
    .promo-card--dark  .card-description { color: #CAD1D8; }

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
    .promo-card--light .card-button { border-color: #001391; color: #001391; }
    .promo-card--light .card-button:hover { background: #001391; color: #FFFFFF; transform: translateY(-2px); }
    .promo-card--dark .card-button  { border-color: #85C8FF; color: #85C8FF; }
    .promo-card--dark .card-button:hover { background: #85C8FF; color: #001391; transform: translateY(-2px); }

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
        0%, 100% { transform: scale(1); opacity: 1; }
        50%      { transform: scale(1.05); opacity: 0.8; }
    }

    /* Adaptación para dispositivos móviles */
    @media (max-width: 768px) {
        .cards-container { flex-direction: column; padding: 16px; gap: 20px; }
        .card-title { font-size: 20px; }
        .oferta-title { font-size: 24px; }
    }


// Inicializa los efectos cuando haya contenido
useEffect(() => { initPresentationEnhancers(); }, []);
//useEffect(() => { initPresentationEnhancers(); }, [oferta, loading]);

// cuando ya cargó/actualizó contenido
useEffect(() => {
  animateTitleSurprise();
  revealDescriptions();
}, [oferta, loading]);


`;

// Componente para cada tarjeta de oferta (sin Motivo ni Confianza)
const OfertaCard = ({ oferta, index }) => {
  const theme = 'dark'; // mantenemos oscuro como en tu original
  const cardClass = `promo-card promo-card--${theme}`;

  return (
    <div className={cardClass} style={{ animationDelay: `${index * 0.2}s` }}>
      <h2 className="card-title">{oferta.titulo}</h2>
      <p className="card-description">{oferta.cuerpo}</p>
      <button className="card-button">{oferta.cta}</button>
    </div>
  );
};

export default function Oferta() {
  const [oferta, setOferta] = useState(null);
  const [loading, setLoading] = useState(true);
  const dni = sessionStorage.getItem('dni');

  useEffect(() => {
    if (!dni) { setLoading(false); return; }

    fetch(`/api/oferta/${dni}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('Datos recibidos del backend:', data);
        // Creamos DOS ofertas a partir del JSON del backend
        //const primera = {
        //  titulo: data?.mensaje_final?.titulo ?? '—',
        //  cuerpo: data?.mensaje_final?.cuerpo ?? '—',
        //  cta:    data?.mensaje_final?.cta    ?? 'Ver más',
        //};

        //const segunda = {
        // usamos el producto sugerido y el resumen del cliente
        //  titulo: data?.estrategia?.producto_sugerido_codigo ?? 'Producto sugerido',
        //  cuerpo: data?.estrategia?.resumen_cliente ?? '—',
        //  cta:    data?.mensaje_final?.cta ?? 'Conocer beneficios',
        //};
        //const tercera = {
        // usamos el producto sugerido y el resumen del cliente
        //  titulo: data?.estrategia?.producto_sugerido_codigo ?? 'Producto sugerido',
        //  cuerpo: data?.estrategia?.resumen_cliente ?? '—',
        //  cta:    data?.mensaje_final?.cta ?? 'Conocer beneficios',
        //};
        //setOferta({ ofertas_generadas: [primera, segunda] });
        // Tomar solo mensaje_final de cada oferta
        const ofertas_generadas = Array.isArray(data)
          ? data.map(oferta => oferta.mensaje_final)
          : [];
        setOferta({ ofertas_generadas });
        //setOferta(normalizeOferta(data))
      })
      .catch(err => {
        console.error(err);
        setOferta(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <style>{styles}</style>

      {loading && <div className="animated-background"></div>}

      <div className="oferta-container">
        <h1 className="oferta-title">Ofertas personalizadas para DNI: {dni}</h1>

        {loading ? (
          <div className="loading-message">Cargando ofertas personalizadas...</div>
        ) : oferta ? (
          <div className="cards-container">
            {oferta.ofertas_generadas.slice(0, 3).map((of, index) => (
              <OfertaCard key={index} oferta={of} index={index} />
            ))}
          </div>
        ) : (
          <div className="loading-message">Error al cargar las ofertas</div>
        )}
      </div>

      
    </div>

    
  );
}

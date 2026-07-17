import { useState, useEffect, useRef } from "react";
import rubiPic from "./assets/rubipic.jpeg";

/* ─── Intersection observer hook ─────────────────────────────── */
const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

/* ─── Reveal — animación limpia con will-change ───────────────── */
const Reveal = ({ children, delay = 0, style = {}, className = "" }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        willChange: "opacity, transform",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: inView
          ? `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s,
             transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s`
          : "none",
      }}
    >
      {children}
    </div>
  );
};

/* ─── Datos ───────────────────────────────────────────────────── */
const services = [
  { num: "01", title: "Preventas Exclusivas",   desc: "Acceso anticipado a desarrollos residenciales y comerciales con precios preferenciales y alta plusvalía proyectada." },
  { num: "02", title: "Franquicia Inmobiliaria", desc: "Modelo de negocio probado con el respaldo de una red establecida y acompañamiento continuo desde el primer día." },
  { num: "03", title: "Pool de Rentas",          desc: "Inversión en propiedades gestionadas por operadores especializados. Rendimientos pasivos sin carga administrativa." },
  { num: "04", title: "Broker Independiente",    desc: "Representación exclusiva de tus intereses, con acceso objetivo al portafolio más amplio del mercado nacional." },
];

const products = [
  { num: "01", title: "Seguro de Vida",         desc: "Protección económica para tu familia ante cualquier imprevisto. Coberturas flexibles diseñadas para tu etapa de vida." },
  { num: "02", title: "Gastos Médicos Mayores", desc: "La mejor atención médica sin comprometer tu patrimonio. Red hospitalaria de primer nivel, cobertura nacional e internacional." },
  { num: "03", title: "Plan de Retiro",         desc: "Construye el capital necesario para la jubilación que deseas. Rendimientos garantizados y ventajas fiscales." },
  { num: "04", title: "Ahorro e Inversión",     desc: "Ahorro sistemático con protección de vida y rendimientos competitivos para alcanzar tus metas." },
];

const mezcalPoints = [
  { num: "01", title: "Exportación Global",    body: "Demanda creciente en EUA, Europa y Asia. La denominación de origen mexicana tiene reconocimiento mundial." },
  { num: "02", title: "Producción Limitada",   body: "Lotes artesanales elaborados por maestros mezcaleros con procesos tradicionales que garantizan exclusividad." },
  { num: "03", title: "Apreciación Natural",   body: "El mezcal añejado incrementa su valor con el tiempo tanto en calidad como en el mercado de colección." },
  { num: "04", title: "Diversificación Real",  body: "Activo tangible no correlacionado con mercados financieros. Equilibrio genuino para un portafolio robusto." },
];

const IGIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
  </svg>
);

const MenuIcon = ({ open }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <line x1="2" y1={open ? "10" : "5"}  x2="18" y2={open ? "10" : "5"}  stroke="currentColor" strokeWidth="1.5"
      style={{ transform: open ? "rotate(45deg)" : "none", transformOrigin: "10px 10px", transition: "all 0.3s ease" }}/>
    <line x1="2" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="1.5"
      style={{ opacity: open ? 0 : 1, transition: "opacity 0.2s ease" }}/>
    <line x1="2" y1={open ? "10" : "15"} x2="18" y2={open ? "10" : "15"} stroke="currentColor" strokeWidth="1.5"
      style={{ transform: open ? "rotate(-45deg)" : "none", transformOrigin: "10px 10px", transition: "all 0.3s ease" }}/>
  </svg>
);

/* ─── Componente principal ────────────────────────────────────── */
export default function RubiEcheverria() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Cierra menú al hacer scroll
  useEffect(() => {
    if (scrolled && menuOpen) setMenuOpen(false);
  }, [scrolled]);

  const go = (id) => {
    setMenuOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const C = {
    ink:        "#14100D",
    ink2:       "#1C1712",
    rose:       "#B85C72",
    rosePale:   "#F0E4E9",
    roseMid:    "#D9A8B5",
    parchment:  "#EDE5D8",
    linen:      "#E8DDD0",
    vellum:     "#E2D8C8",
    sub:        "#4A4038",
    muted:      "#7A6E64",
    dimWhite:   "#F5EFE8",
    borderWarm: "rgba(180,160,130,0.35)",
    borderRose: "rgba(184,92,114,0.14)",
  };

  const px = { desktop: "4rem", mobile: "1.4rem" };

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: C.parchment, color: C.ink, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
        ::selection { background: #B85C72; color: white; }
        img { max-width: 100%; display: block; }
        .s { font-family: 'Cormorant Garamond', serif; }

        /* ── Animaciones hero ── */
        @keyframes fadeUp  { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
        @keyframes floatA  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes floatB  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes spinCW  { from{transform:translate(-50%,-50%) rotate(0deg)}   to{transform:translate(-50%,-50%) rotate(360deg)} }
        @keyframes spinCCW { from{transform:translate(-50%,-50%) rotate(0deg)}   to{transform:translate(-50%,-50%) rotate(-360deg)} }
        @keyframes waPulse { 0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,0.45)} 50%{box-shadow:0 0 0 12px rgba(37,211,102,0)} }

        .h1 { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
        .h2 { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
        .h3 { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s both; }
        .h4 { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.55s both; }
        .h5 { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.7s both; }
        .hi { animation: fadeIn 1.2s ease 0.3s both; }

        /* ── Orbits ── */
        .orb { position:absolute; border-radius:50%; top:50%; left:50%; will-change:transform; }
        .o1  { width:420px; height:420px; border:1px solid rgba(184,92,114,0.15); animation:spinCW  50s linear infinite; }
        .o2  { width:270px; height:270px; border:1px solid rgba(184,92,114,0.10); animation:spinCCW 34s linear infinite; }
        .o3  { width:140px; height:140px; border:1px dashed rgba(184,92,114,0.17); animation:spinCW  22s linear infinite; }

        /* ── Float pills ── */
        .fa  { animation: floatA 5s ease-in-out infinite; will-change:transform; }
        .fb  { animation: floatB 5s ease-in-out 2.3s infinite; will-change:transform; }

        /* ── WA ── */
        .wa  { animation: waPulse 2.6s ease infinite; }

        /* ── Cards BR ── */
        .cbr {
          background: #E8DDD0;
          border-top: 2px solid transparent;
          border-bottom: 1px solid rgba(180,160,130,0.28);
          transition: border-top-color 0.25s ease, background 0.25s ease;
          cursor: default;
        }
        .cbr:hover { border-top-color: #B85C72; background: #DDD0C0; }

        /* ── Cards Seguros ── */
        .cseg { transition: background 0.25s ease; cursor: default; }
        .cseg:hover { background: rgba(184,92,114,0.06) !important; }

        /* ── Pill ── */
        .pill {
          position: absolute;
          background: rgba(237,229,216,0.97);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(184,92,114,0.2);
          border-radius: 3px;
          box-shadow: 0 16px 48px rgba(20,16,13,0.12);
          padding: 0.85rem 1.1rem;
        }

        /* ── Nav links ── */
        .nbtn {
          background: none; border: none; cursor: pointer;
          font-size: 0.73rem; letter-spacing: 0.14em; text-transform: uppercase;
          font-family: 'DM Sans', sans-serif; font-weight: 400;
          transition: color 0.2s ease; padding: 2px 0;
        }
        .nbtn:hover { color: #B85C72 !important; }

        /* ── Topbar links ── */
        .tl {
          font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(20,16,13,0.4); text-decoration: none;
          transition: color 0.2s; display: flex; align-items: center; gap: 0.35rem;
        }
        .tl:hover { color: #B85C72; }

        /* ── Glow ── */
        .glow { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; }

        /* ── Divisor ── */
        .sdiv { height:1px; background:linear-gradient(to right,transparent,rgba(184,92,114,0.28),rgba(180,155,100,0.18),transparent); }

        /* ══════════════════════════════════
           RESPONSIVE — Mobile First
        ══════════════════════════════════ */

        /* Topbar: oculto en móvil */
        .topbar { display: flex; }
        @media (max-width: 768px) { .topbar { display: none; } }

        /* Nav */
        .nav-inner { display: flex; align-items: center; justify-content: space-between; }
        .nav-links-desktop { display: flex; gap: 2.5rem; }
        .nav-cta-desktop { display: inline-block; }
        .nav-hamburger { display: none; background: none; border: none; cursor: pointer; padding: 4px; }

        @media (max-width: 768px) {
          .nav-links-desktop { display: none; }
          .nav-cta-desktop   { display: none; }
          .nav-hamburger     { display: flex; align-items: center; }
        }

        /* Mobile menu overlay */
        .mobile-menu {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(20,16,13,0.97);
          z-index: 200;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 2.5rem;
          opacity: 0; pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .mobile-menu.open { opacity: 1; pointer-events: all; }
        .mobile-menu button {
          background: none; border: none; cursor: pointer;
          font-size: 1.8rem; letter-spacing: 0.08em;
          font-family: 'Cormorant Garamond', serif; font-weight: 300;
          color: rgba(245,239,232,0.5); transition: color 0.2s;
        }
        .mobile-menu button:hover { color: #B85C72; }
        .mobile-menu-close {
          position: absolute; top: 1.4rem; right: 1.4rem;
          background: none; border: none; cursor: pointer;
          color: rgba(245,239,232,0.4); font-size: 1rem; font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.1em; text-transform: uppercase;
        }
        .mobile-menu-cta {
          margin-top: 1rem;
          font-size: 0.75rem !important;
          font-family: 'DM Sans', sans-serif !important;
          letter-spacing: 0.14em !important;
          text-transform: uppercase !important;
          color: #B85C72 !important;
          border: 1px solid rgba(184,92,114,0.4) !important;
          padding: 0.85rem 2rem; border-radius: 2px;
        }

        /* Hero layout */
        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; }
        .hero-right-panel { display: flex; }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr; }
          .hero-right-panel { display: none; }
        }

        /* Padding de secciones */
        .sec-pad  { padding: 6rem 4rem; }
        .sec-pad-b { padding-bottom: 6rem; padding-left: 4rem; padding-right: 4rem; }
        @media (max-width: 768px) {
          .sec-pad  { padding: 4rem 1.4rem; }
          .sec-pad-b { padding-bottom: 4rem; padding-left: 1.4rem; padding-right: 1.4rem; }
        }

        /* Header de sección */
        .sec-header-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: end; margin-bottom: 4rem; }
        @media (max-width: 768px) {
          .sec-header-grid { grid-template-columns: 1fr; gap: 1.5rem; margin-bottom: 3rem; }
        }

        /* Grid 4 servicios BR */
        .br-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1px; }
        @media (max-width: 900px) { .br-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 480px) { .br-grid { grid-template-columns: 1fr; } }

        /* Bento BR */
        .bento-grid { display: grid; grid-template-columns: 1.55fr 1fr 1fr; gap: 1px; }
        @media (max-width: 900px) { .bento-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 480px) { .bento-grid { grid-template-columns: 1fr; } }

        /* Grid seguros */
        .seg-header-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; margin-bottom: 4rem; }
        .seg-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; }
        @media (max-width: 768px) {
          .seg-header-grid { grid-template-columns: 1fr; gap: 2rem; margin-bottom: 2.5rem; }
          .seg-grid { grid-template-columns: 1fr; }
        }

        /* Mezcal */
        .mezcal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
        .mezcal-stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; }
        @media (max-width: 768px) {
          .mezcal-grid { grid-template-columns: 1fr; gap: 3rem; }
        }

        /* Stats hero */
        .hero-stats { display: flex; gap: 3.5rem; padding-top: 2.5rem; border-top: 1px solid rgba(180,160,130,0.35); }
        @media (max-width: 480px) { .hero-stats { gap: 2rem; } }

        /* Hero padding */
        .hero-left-pad { padding: 5rem 3.5rem 5rem 4rem; }
        @media (max-width: 768px) { .hero-left-pad { padding: 3.5rem 1.4rem 3.5rem; } }

        /* Divisor old money */
        .div-bar { padding: 2rem 4rem; }
        @media (max-width: 768px) { .div-bar { padding: 1.5rem 1.4rem; } }

        /* Footer */
        .footer-inner { display: flex; align-items: center; justify-content: space-between; gap: 2rem; }
        @media (max-width: 768px) {
          .footer-inner { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
        }

        /* Contacto padding */
        .cta-pad { padding: 7rem 4rem; }
        @media (max-width: 768px) { .cta-pad { padding: 5rem 1.4rem; } }

        /* Nav padding responsive */
        .nav-pad { padding-left: 4rem; padding-right: 4rem; }
        @media (max-width: 768px) { .nav-pad { padding-left: 1.4rem; padding-right: 1.4rem; } }
      `}</style>

      {/* ── TOPBAR (desktop only) ──────────────────────── */}
      <div className="topbar" style={{
        position:"fixed", top:0, left:0, right:0, zIndex:101,
        background:C.vellum, borderBottom:`1px solid ${C.borderWarm}`,
        padding:"0.46rem 4rem",
        alignItems:"center", justifyContent:"space-between",
      }}>
        <span style={{fontSize:"0.6rem",letterSpacing:"0.18em",textTransform:"uppercase",color:C.muted}}>
          Aguascalientes, México
        </span>
        <div style={{display:"flex",alignItems:"center",gap:"1.1rem"}}>
          <a href="tel:+527472210906" className="tl">+52 747 221 0906</a>
          <div style={{width:1,height:10,background:"rgba(20,16,13,0.12)"}}/>
          <a href="mailto:rubiecheverria39@gmail.com" className="tl">rubiecheverria39@gmail.com</a>
          <div style={{width:1,height:10,background:"rgba(20,16,13,0.12)"}}/>
          <a href="https://instagram.com/rubi.ech" target="_blank" rel="noreferrer" className="tl">
            <IGIcon/> rubi.ech
          </a>
        </div>
        <a href="https://wa.me/527472210906" className="tl" style={{color:C.rose}}>WhatsApp directo</a>
      </div>

      {/* ── NAV ──────────────────────────────────────────── */}
      <nav style={{
        position:"fixed",
        top: typeof window !== "undefined" && window.innerWidth <= 768 ? 0 : 33,
        left:0, right:0, zIndex:100,
        background: scrolled ? "rgba(237,229,216,0.97)" : "rgba(237,229,216,0.88)",
        backdropFilter:"blur(20px)",
        WebkitBackdropFilter:"blur(20px)",
        borderBottom: scrolled ? `1px solid ${C.borderWarm}` : "1px solid transparent",
        boxShadow: scrolled ? "0 2px 28px rgba(20,16,13,0.07)" : "none",
        transition: "background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease",
      }}>
        <div className="nav-inner nav-pad" style={{ padding:"1rem 0" }}>
          <div className="s" style={{fontSize:"1.35rem",fontWeight:300,letterSpacing:"0.02em",color:C.ink,cursor:"pointer"}} onClick={()=>go("inicio")}>
            Rubí <span style={{color:C.rose,fontStyle:"italic"}}>Echeverría</span>
          </div>

          {/* Desktop links */}
          <div className="nav-links-desktop">
            {[["bienes-raices","Bienes Raíces"],["seguros","Seguros"],["mezcal","Inversión"],["contacto","Contacto"]].map(([id,l])=>(
              <button key={id} onClick={()=>go(id)} className="nbtn" style={{color:C.sub}}>{l}</button>
            ))}
          </div>

          <a href="https://wa.me/527472210906" className="nav-cta-desktop" style={{
            fontSize:"0.7rem",letterSpacing:"0.1em",textTransform:"uppercase",
            color:C.dimWhite,background:C.ink,padding:"0.68rem 1.5rem",
            textDecoration:"none",borderRadius:"2px",fontWeight:400,transition:"background 0.2s",
          }}
          onMouseEnter={e=>e.target.style.background=C.rose}
          onMouseLeave={e=>e.target.style.background=C.ink}>
            Consulta Gratuita
          </a>

          {/* Hamburguesa móvil */}
          <button className="nav-hamburger" onClick={()=>setMenuOpen(v=>!v)} aria-label="Menú" style={{color:C.ink}}>
            <MenuIcon open={menuOpen}/>
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU ──────────────────────────────────── */}
      <div className={`mobile-menu${menuOpen?" open":""}`}>
        <button className="mobile-menu-close" onClick={()=>setMenuOpen(false)}>Cerrar</button>
        {[["inicio","Inicio"],["bienes-raices","Bienes Raíces"],["seguros","Seguros"],["mezcal","Inversión"],["contacto","Contacto"]].map(([id,l])=>(
          <button key={id} onClick={()=>go(id)}>{l}</button>
        ))}
        <a href="https://wa.me/527472210906" className="mobile-menu-cta" style={{
          color:C.rose,textDecoration:"none",fontSize:"0.75rem",
          letterSpacing:"0.14em",textTransform:"uppercase",
          border:`1px solid rgba(184,92,114,0.4)`,padding:"0.85rem 2rem",borderRadius:"2px",
        }}>
          WhatsApp
        </a>
      </div>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section id="inicio" style={{
        minHeight:"100svh", paddingTop:113,
        background:C.parchment, position:"relative", overflow:"hidden",
      }}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(100,75,50,0.04) 1px,transparent 1px)",backgroundSize:"26px 26px"}}/>
        <div className="glow" style={{width:460,height:460,background:"rgba(184,92,114,0.07)",top:"-5%",left:"-8%"}}/>

        <div className="hero-grid" style={{minHeight:"calc(100svh - 113px)"}}>
          {/* LEFT */}
          <div className="hero-left-pad" style={{display:"flex",flexDirection:"column",justifyContent:"center",position:"relative",zIndex:2}}>
            <div className="h1" style={{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1.5rem"}}>
              <div style={{width:24,height:1,background:C.rose,opacity:0.6,flexShrink:0}}/>
              <p style={{fontSize:"0.65rem",letterSpacing:"0.22em",textTransform:"uppercase",color:C.rose}}>
                Broker Independiente — Aguascalientes
              </p>
            </div>

            <h1 className="s h2" style={{
              fontSize:"clamp(2.8rem,5.5vw,5.8rem)",fontWeight:300,lineHeight:1.0,
              color:C.ink,marginBottom:"1.5rem",letterSpacing:"-0.01em",
            }}>
              Tu patrimonio,<br/>
              <span style={{fontStyle:"italic",color:C.rose}}>construido</span><br/>
              con criterio.
            </h1>

            <p className="h3" style={{fontSize:"clamp(0.85rem,1.5vw,0.95rem)",lineHeight:1.85,color:C.sub,maxWidth:380,marginBottom:"2.5rem",fontWeight:300}}>
              Asesoría personalizada en bienes raíces, seguros e inversiones alternativas. Cada decisión, alineada a tus metas.
            </p>

            <div className="h4" style={{display:"flex",gap:"0.75rem",marginBottom:"3.5rem",flexWrap:"wrap"}}>
              <button onClick={()=>go("bienes-raices")} style={{
                fontSize:"0.7rem",letterSpacing:"0.1em",textTransform:"uppercase",
                color:C.dimWhite,background:C.ink,padding:"0.9rem 1.75rem",
                border:"none",cursor:"pointer",borderRadius:"2px",
                fontFamily:"'DM Sans',sans-serif",fontWeight:500,transition:"background 0.2s",
              }}
              onMouseEnter={e=>e.target.style.background=C.rose}
              onMouseLeave={e=>e.target.style.background=C.ink}>
                Ver Servicios
              </button>
              <button onClick={()=>go("contacto")} style={{
                fontSize:"0.7rem",letterSpacing:"0.1em",textTransform:"uppercase",
                color:C.sub,background:"transparent",padding:"0.9rem 1.75rem",
                border:`1px solid ${C.borderWarm}`,cursor:"pointer",borderRadius:"2px",
                fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s",
              }}
              onMouseEnter={e=>{e.target.style.borderColor=C.rose;e.target.style.color=C.rose}}
              onMouseLeave={e=>{e.target.style.borderColor=C.borderWarm;e.target.style.color=C.sub}}>
                Agendar Llamada
              </button>
            </div>

            <div className="hero-stats h5">
              {[["200+","Clientes"],["8+","Años"],["100%","Independiente"]].map(([n,l])=>(
                <div key={l}>
                  <div className="s" style={{fontSize:"clamp(2rem,3vw,3rem)",fontWeight:300,lineHeight:1,color:C.ink}}>{n}</div>
                  <div style={{fontSize:"0.62rem",letterSpacing:"0.12em",textTransform:"uppercase",color:C.muted,marginTop:"0.35rem"}}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — solo desktop */}
          <div className="hero-right-panel hi" style={{
            background:C.vellum,
            alignItems:"center",justifyContent:"center",
            overflow:"hidden",borderLeft:`1px solid ${C.borderWarm}`,
            position:"relative",
          }}>
            <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(100,75,50,0.05) 1px,transparent 1px)",backgroundSize:"22px 22px"}}/>
            <div className="glow" style={{width:300,height:300,background:"rgba(184,92,114,0.1)",top:"20%",right:"-5%"}}/>
            <div className="orb o1"/><div className="orb o2"/><div className="orb o3"/>

            <div style={{position:"relative",zIndex:2}}>
              <div style={{
                width:280,height:380,borderRadius:"3px",
                background:"#f0e4e9",
                border:`2px solid ${C.roseMid}`,
                display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
                overflow:"hidden",
                position:"relative",
                boxShadow:"0 12px 28px rgba(20,16,13,0.15)",
              }}>
                <img 
                  src={rubiPic}
                  alt="Rubí Echeverría - Broker Inmobiliario"
                  style={{
                    width:"100%",
                    height:"100%",
                    objectFit:"cover",
                    objectPosition:"center",
                  }}
                />
              </div>

              <div className="pill fa" style={{bottom:-22,right:-58,width:208}}>
                <div style={{fontSize:"0.55rem",letterSpacing:"0.14em",textTransform:"uppercase",color:C.rose,marginBottom:"0.28rem"}}>Certificada por</div>
                <div className="s" style={{fontSize:"0.95rem",fontWeight:400,color:C.ink,lineHeight:1.35}}>Seguros Monterrey<br/>New York Life</div>
              </div>

              <div className="pill fb" style={{top:20,left:-65,width:150}}>
                <div style={{fontSize:"0.55rem",letterSpacing:"0.12em",textTransform:"uppercase",color:C.muted,marginBottom:"0.22rem"}}>Experiencia</div>
                <div className="s" style={{fontSize:"1.8rem",fontWeight:300,color:C.ink,lineHeight:1}}>8+ <span style={{fontSize:"0.95rem",color:C.rose}}>Años</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIVISOR OLD MONEY ─────────────────────────────── */}
      <div style={{background:C.ink2,borderTop:"1px solid rgba(245,239,232,0.05)",borderBottom:"1px solid rgba(245,239,232,0.05)"}}>
        <div className="div-bar" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:"0.85rem",flex:1}}>
            <div style={{width:28,height:1,background:`linear-gradient(to right,transparent,${C.rose})`,opacity:0.45}}/>
            <div style={{width:4,height:4,borderRadius:"50%",background:C.rose,opacity:0.55}}/>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"1.5rem",flex:"0 0 auto"}}>
            {["Bienes Raíces","◆","Seguros","◆","Inversión"].map((t,i)=>(
              <span key={i} style={{
                fontSize: t==="◆"?"0.32rem":"0.63rem",
                letterSpacing: t==="◆"?0:"0.2em",
                textTransform:"uppercase",
                color: t==="◆"?C.rose:"rgba(245,239,232,0.26)",
                fontFamily:"'DM Sans',sans-serif",fontWeight:300,
              }}>{t}</span>
            ))}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"0.85rem",flex:1,justifyContent:"flex-end"}}>
            <div style={{width:4,height:4,borderRadius:"50%",background:C.rose,opacity:0.55}}/>
            <div style={{width:28,height:1,background:`linear-gradient(to left,transparent,${C.rose})`,opacity:0.45}}/>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          BIENES RAÍCES
      ══════════════════════════════════════════ */}
      <section id="bienes-raices" style={{background:C.linen,position:"relative"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(90,70,45,0.05) 1px,transparent 1px)",backgroundSize:"20px 20px",pointerEvents:"none"}}/>

        <div className="sec-pad-b" style={{paddingTop:"6rem",position:"relative",zIndex:1}}>
          <Reveal>
            <div style={{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"0.85rem"}}>
              <div style={{width:20,height:1,background:C.rose,opacity:0.55,flexShrink:0}}/>
              <p style={{fontSize:"0.65rem",letterSpacing:"0.22em",textTransform:"uppercase",color:C.rose}}>Portafolio Inmobiliario</p>
            </div>
          </Reveal>

          <div className="sec-header-grid">
            <Reveal delay={0.06}>
              <h2 className="s" style={{fontSize:"clamp(2.2rem,4.5vw,4rem)",fontWeight:300,lineHeight:1.04,color:C.ink}}>
                Bienes Raíces<br/><span style={{fontStyle:"italic",color:C.rose}}>a tu medida</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p style={{fontSize:"0.88rem",lineHeight:1.85,color:C.sub,fontWeight:300}}>
                Acceso exclusivo a las mejores oportunidades del mercado inmobiliario. Sin ataduras a ninguna desarrolladora — solo tus intereses como prioridad absoluta.
              </p>
              <div style={{width:32,height:1,background:C.rose,marginTop:"1.5rem",opacity:0.6}}/>
            </Reveal>
          </div>
        </div>

        {/* 4 cards */}
        <div className="br-grid" style={{margin:"0 auto",maxWidth:"100%",background:C.borderWarm,marginLeft:"1.4rem",marginRight:"1.4rem"}}>
          {services.map((s,i)=>(
            <Reveal key={s.num} delay={i*0.07}>
              <div className="cbr" style={{padding:"2.25rem 1.75rem",height:"100%",borderTop:"2px solid transparent"}}>
                <div className="s" style={{fontSize:"3rem",fontWeight:300,color:"rgba(184,92,114,0.18)",lineHeight:1,marginBottom:"1.25rem"}}>{s.num}</div>
                <div className="s" style={{fontSize:"1.25rem",fontWeight:400,color:C.ink,marginBottom:"0.65rem"}}>{s.title}</div>
                <p style={{fontSize:"0.8rem",lineHeight:1.8,color:C.muted,fontWeight:300}}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bento */}
        <div className="bento-grid" style={{background:C.borderWarm,margin:"1px 1.4rem 0"}}>
          <Reveal>
            <div style={{
              background:C.ink2,padding:"2.75rem 2.5rem",minHeight:240,
              display:"flex",flexDirection:"column",justifyContent:"space-between",
              position:"relative",overflow:"hidden",
            }}>
              <div style={{fontSize:"0.58rem",letterSpacing:"0.2em",textTransform:"uppercase",color:C.rose}}>Diferenciador Clave</div>
              <div className="s" style={{position:"absolute",fontSize:"8rem",fontWeight:300,color:"rgba(245,239,232,0.03)",right:0,bottom:"-1rem",lineHeight:1,userSelect:"none"}}>BR</div>
              <div>
                <div className="s" style={{fontSize:"1.85rem",fontWeight:300,color:C.dimWhite,lineHeight:1.2,marginBottom:"0.75rem"}}>
                  Broker<br/>100% <span style={{fontStyle:"italic",color:C.rose}}>Independiente</span>
                </div>
                <p style={{fontSize:"0.78rem",lineHeight:1.8,color:"rgba(245,239,232,0.36)",maxWidth:260,fontWeight:300}}>
                  Trabajo para ti, no para ninguna inmobiliaria. Acceso objetivo al mercado completo.
                </p>
              </div>
            </div>
          </Reveal>
          {[
            {label:"Plusvalía", value:"12–18%",  sub:"Rendimiento anual estimado",     bg:C.rosePale},
            {label:"Cobertura", value:"Nacional", sub:"Desarrollos en todo México",     bg:C.parchment},
            {label:"Desde",     value:"$500k",    sub:"Preventa residencial MXN",       bg:C.parchment},
            {label:"Tipos",     value:"3",        sub:"Residencial, comercial, turismo", bg:C.rosePale},
          ].map((b,i)=>(
            <Reveal key={b.label} delay={i*0.06}>
              <div style={{background:b.bg,padding:"2.25rem 2rem",borderBottom:`1px solid ${C.borderWarm}`}}>
                <div style={{fontSize:"0.58rem",letterSpacing:"0.18em",textTransform:"uppercase",color:C.rose,marginBottom:"0.5rem"}}>{b.label}</div>
                <div className="s" style={{fontSize:"2.2rem",fontWeight:300,color:C.ink,lineHeight:1,marginBottom:"0.28rem"}}>{b.value}</div>
                <div style={{fontSize:"0.7rem",color:C.muted,fontWeight:300}}>{b.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{height:"6rem"}}/>
      </section>

      <div className="sdiv"/>

      {/* ══════════════════════════════════════════
          SEGUROS
      ══════════════════════════════════════════ */}
      <section id="seguros" style={{background:C.ink2,position:"relative",overflow:"hidden"}}>
        <div className="glow" style={{width:420,height:420,background:"rgba(184,92,114,0.05)",top:"5%",right:"-5%"}}/>

        <div className="sec-pad-b" style={{paddingTop:"6rem",position:"relative",zIndex:1}}>
          <Reveal>
            <div style={{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"0.85rem"}}>
              <div style={{width:20,height:1,background:C.rose,opacity:0.55,flexShrink:0}}/>
              <p style={{fontSize:"0.65rem",letterSpacing:"0.22em",textTransform:"uppercase",color:C.rose}}>Protección y Previsión</p>
            </div>
          </Reveal>

          <div className="seg-header-grid">
            <Reveal delay={0.06}>
              <h2 className="s" style={{fontSize:"clamp(2.2rem,4vw,3.8rem)",fontWeight:300,lineHeight:1.06,color:C.dimWhite}}>
                Seguros que<br/><span style={{fontStyle:"italic",color:C.rose}}>protegen</span><br/>lo que importa
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="s" style={{fontSize:"clamp(1.2rem,2vw,1.45rem)",fontWeight:300,lineHeight:1.55,color:"rgba(245,239,232,0.5)",marginBottom:"1.4rem",fontStyle:"italic"}}>
                "Cada familia merece un plan hecho a su medida, no un producto de catálogo."
              </p>
              <p style={{fontSize:"0.83rem",lineHeight:1.85,color:"rgba(245,239,232,0.34)",marginBottom:"1.75rem",fontWeight:300}}>
                La asesoría en seguros va más allá de firmar una póliza. Se trata de entender tu situación y diseñar una estrategia de protección que evolucione contigo.
              </p>
              <div style={{
                display:"inline-flex",alignItems:"center",gap:"1.1rem",
                border:"1px solid rgba(184,92,114,0.28)",padding:"0.9rem 1.3rem",
                borderRadius:"3px",background:"rgba(184,92,114,0.06)",
              }}>
                <div>
                  <div className="s" style={{fontSize:"1rem",fontWeight:600,color:C.dimWhite,lineHeight:1.2}}>Seguros Monterrey</div>
                  <div className="s" style={{fontSize:"0.9rem",fontWeight:300,color:"rgba(245,239,232,0.45)"}}>New York Life</div>
                </div>
                <div style={{width:1,height:32,background:"rgba(184,92,114,0.3)"}}/>
                <div style={{fontSize:"0.58rem",letterSpacing:"0.12em",textTransform:"uppercase",color:C.rose,lineHeight:1.5}}>Asesora<br/>Certificada</div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="seg-grid" style={{background:"rgba(245,239,232,0.04)",margin:"0 1.4rem",position:"relative",zIndex:1}}>
          {products.map((p,i)=>(
            <Reveal key={p.num} delay={i*0.07}>
              <div className="cseg" style={{
                background:`rgba(245,239,232,${i%2===0?"0.025":"0.012"})`,
                padding:"2.75rem 2.25rem",
                display:"grid",gridTemplateColumns:"2.25rem 1fr",gap:"1.5rem",alignItems:"start",
                borderLeft:`3px solid ${i%2===0?C.rose:"transparent"}`,
              }}>
                <div className="s" style={{fontSize:"0.95rem",color:C.rose,paddingTop:"0.2rem"}}>{p.num}</div>
                <div>
                  <div className="s" style={{fontSize:"1.6rem",fontWeight:400,color:C.dimWhite,marginBottom:"0.65rem",lineHeight:1.2}}>{p.title}</div>
                  <p style={{fontSize:"0.8rem",lineHeight:1.8,color:"rgba(245,239,232,0.34)",fontWeight:300}}>{p.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{height:"6rem"}}/>
      </section>

      <div className="sdiv"/>

      {/* ══════════════════════════════════════════
          MEZCAL
      ══════════════════════════════════════════ */}
      <section id="mezcal" style={{background:C.vellum,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(85,65,40,0.055) 1px,transparent 1px)",backgroundSize:"22px 22px",pointerEvents:"none"}}/>
        <div className="glow" style={{width:380,height:380,background:"rgba(184,92,114,0.07)",top:"10%",right:"-5%"}}/>

        <div className="sec-pad">
          <div className="mezcal-grid" style={{position:"relative",zIndex:1}}>
            <div>
              <Reveal>
                <div style={{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1.1rem"}}>
                  <div style={{width:20,height:1,background:C.rose,opacity:0.55,flexShrink:0}}/>
                  <p style={{fontSize:"0.65rem",letterSpacing:"0.22em",textTransform:"uppercase",color:C.rose}}>Inversión Alternativa</p>
                </div>
                <h2 className="s" style={{fontSize:"clamp(2.2rem,4vw,4rem)",fontWeight:300,color:C.ink,lineHeight:1.06,marginBottom:"1.4rem"}}>
                  Mezcal artesanal:<br/>una inversión con<br/><span style={{fontStyle:"italic",color:C.rose}}>historia</span>
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mezcal-stats-grid" style={{background:C.borderWarm,borderRadius:"3px",overflow:"hidden",marginBottom:"1.75rem"}}>
                  {[["52%","Ganancias para el inversionista"],["$6,000 mxn","Inversión mínima de entrada"]].map(([v,l])=>(
                    <div key={l} style={{background:C.ink,padding:"1.6rem 1.4rem"}}>
                      <div className="s" style={{fontSize:"2.3rem",fontWeight:300,color:C.rose,lineHeight:1,marginBottom:"0.32rem"}}>{v}</div>
                      <div style={{fontSize:"0.7rem",color:"rgba(245,239,232,0.36)",lineHeight:1.5,fontWeight:300}}>{l}</div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <p style={{fontSize:"0.86rem",lineHeight:1.85,color:C.sub,marginBottom:"2.25rem",fontWeight:300}}>
                  Más allá de los instrumentos tradicionales, existe un mercado de bienes tangibles con alto potencial. El mezcal artesanal mexicano es hoy una de las inversiones alternativas con mayor crecimiento a nivel mundial.
                </p>
                <button onClick={()=>go("contacto")} style={{
                  fontSize:"0.7rem",letterSpacing:"0.1em",textTransform:"uppercase",
                  color:C.dimWhite,background:C.ink,padding:"0.9rem 1.75rem",
                  border:"none",cursor:"pointer",borderRadius:"2px",
                  fontFamily:"'DM Sans',sans-serif",transition:"background 0.2s",
                }}
                onMouseEnter={e=>e.target.style.background=C.rose}
                onMouseLeave={e=>e.target.style.background=C.ink}>
                  Solicitar Información
                </button>
              </Reveal>
            </div>

            {/* Lista puntos */}
            <div style={{background:C.parchment,borderRadius:"3px",padding:"1.75rem 2rem",border:`1px solid ${C.borderWarm}`,alignSelf:"start"}}>
              {mezcalPoints.map((m,i)=>(
                <Reveal key={m.num} delay={i*0.09}>
                  <div style={{
                    borderTop:i===0?"none":`1px solid ${C.borderWarm}`,
                    padding:i===0?"0 0 1.5rem":"1.5rem 0",
                    display:"grid",gridTemplateColumns:"2.75rem 1fr",gap:"1.25rem",alignItems:"start",
                  }}>
                    <div className="s" style={{fontSize:"1.75rem",fontWeight:300,color:C.rose,lineHeight:1}}>{m.num}</div>
                    <div>
                      <div style={{fontSize:"0.83rem",fontWeight:500,color:C.ink,marginBottom:"0.32rem"}}>{m.title}</div>
                      <div style={{fontSize:"0.78rem",color:C.muted,lineHeight:1.7,fontWeight:300}}>{m.body}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACTO
      ══════════════════════════════════════════ */}
      <section id="contacto" style={{background:C.ink,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(245,239,232,0.022) 1px,transparent 1px)",backgroundSize:"28px 28px",pointerEvents:"none"}}/>
        <div className="glow" style={{width:480,height:480,background:"rgba(184,92,114,0.07)",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}/>

        <div className="cta-pad" style={{textAlign:"center",position:"relative",zIndex:1}}>
          <Reveal>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"0.75rem",marginBottom:"0.9rem"}}>
              <div style={{width:20,height:1,background:C.rose,opacity:0.55}}/>
              <p style={{fontSize:"0.65rem",letterSpacing:"0.22em",textTransform:"uppercase",color:C.rose}}>Primer Paso</p>
              <div style={{width:20,height:1,background:C.rose,opacity:0.55}}/>
            </div>
            <h2 className="s" style={{fontSize:"clamp(2.2rem,5vw,4.8rem)",fontWeight:300,color:C.dimWhite,lineHeight:1.04,marginBottom:"1.1rem"}}>
              Hablemos de tu<br/><span style={{fontStyle:"italic",color:C.rose}}>futuro financiero</span>
            </h2>
            <p style={{fontSize:"0.9rem",lineHeight:1.85,color:"rgba(245,239,232,0.34)",maxWidth:420,margin:"0 auto 2.75rem",fontWeight:300}}>
              Sin compromisos. Una conversación de 30 minutos puede cambiar el rumbo de tu patrimonio.
            </p>
            <div style={{display:"flex",justifyContent:"center",gap:"0.75rem",flexWrap:"wrap"}}>
              {[
                {label:"WhatsApp",href:"https://wa.me/527472210906",    bg:"#25D366",bgH:"#128C7E",color:"white",border:"none"},
                {label:"Llamar",  href:"tel:+527472210906",              bg:"transparent",bgH:C.dimWhite,color:"rgba(245,239,232,0.55)",border:"1px solid rgba(245,239,232,0.14)"},
                {label:"Correo",  href:"mailto:rubiecheverria39@gmail.com",bg:"transparent",bgH:C.rose,color:C.rose,border:`1px solid rgba(184,92,114,0.33)`},
              ].map(b=>(
                <a key={b.label} href={b.href} style={{
                  fontSize:"0.72rem",letterSpacing:"0.1em",textTransform:"uppercase",
                  color:b.color,background:b.bg,padding:"1rem 2rem",
                  textDecoration:"none",borderRadius:"2px",fontWeight:500,
                  border:b.border,transition:"all 0.2s",
                }}
                onMouseEnter={e=>{e.currentTarget.style.background=b.bgH;e.currentTarget.style.color=C.ink}}
                onMouseLeave={e=>{e.currentTarget.style.background=b.bg;e.currentTarget.style.color=b.color}}>
                  {b.label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer style={{background:C.ink2,borderTop:"1px solid rgba(245,239,232,0.04)"}}>
        <div className="footer-inner nav-pad" style={{paddingTop:"2.25rem",paddingBottom:"2.25rem"}}>
          <div className="s" style={{fontSize:"1.2rem",fontWeight:300,color:C.dimWhite,flexShrink:0}}>
            Rubí <span style={{color:C.rose,fontStyle:"italic"}}>Echeverría</span>
          </div>

          <div style={{fontSize:"0.6rem",letterSpacing:"0.07em",color:"rgba(245,239,232,0.18)",lineHeight:1.8}}>
            Broker Independiente — Aguascalientes, México<br/>
            <span style={{color:"rgba(245,239,232,0.1)"}}>rubiecheverria39@gmail.com · +52 747 221 0906</span>
          </div>

          <div style={{fontSize:"0.6rem",letterSpacing:"0.07em",color:"rgba(245,239,232,0.16)",lineHeight:1.8}}>
            Developed by Aurexa
          </div>

          <div style={{display:"flex",gap:"1.75rem",alignItems:"center",flexWrap:"wrap"}}>
            {[["bienes-raices","Bienes Raíces"],["seguros","Seguros"],["mezcal","Inversión"]].map(([id,l])=>(
              <button key={id} onClick={()=>go(id)} style={{
                background:"none",border:"none",cursor:"pointer",
                fontSize:"0.62rem",letterSpacing:"0.12em",textTransform:"uppercase",
                color:"rgba(245,239,232,0.22)",fontFamily:"'DM Sans',sans-serif",transition:"color 0.2s",
              }}
              onMouseEnter={e=>e.target.style.color=C.rose}
              onMouseLeave={e=>e.target.style.color="rgba(245,239,232,0.22)"}>
                {l}
              </button>
            ))}
            <a href="https://instagram.com/rubi.ech" target="_blank" rel="noreferrer"
            style={{color:"rgba(245,239,232,0.22)",textDecoration:"none",transition:"color 0.2s",display:"flex"}}
            onMouseEnter={e=>e.currentTarget.style.color=C.rose}
            onMouseLeave={e=>e.currentTarget.style.color="rgba(245,239,232,0.22)"}>
              <IGIcon/>
            </a>
          </div>
        </div>
      </footer>

      {/* ── WA FLOTANTE ──────────────────────────────────── */}
      <a href="https://wa.me/527472210906" className="wa" style={{
        position:"fixed",bottom:"1.5rem",right:"1.5rem",
        width:50,height:50,background:"#25D366",borderRadius:"50%",
        display:"flex",alignItems:"center",justifyContent:"center",
        zIndex:199,textDecoration:"none",transition:"transform 0.2s ease",
      }}
      onMouseEnter={e=>e.currentTarget.style.transform="scale(1.08)"}
      onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}
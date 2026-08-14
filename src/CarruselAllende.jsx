import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";

/* ─────────────────────────────────────────────────────────────
   CARRUSEL — PROVINCIA DE ALLENDE
   "Vitrina": tarjeta central en escena + tarjetas laterales
   asomadas, placa de leyenda sobre la imagen y riel de
   miniaturas. Drag / swipe / teclado / autoplay pausable.

   Si mueves este archivo a src/ (junto a tu componente principal),
   cambia "../assets/Allende/..." por "./assets/Allende/..."
   ───────────────────────────────────────────────────────────── */

import img01 from "./assets/Allende/01-acceso-principal-atardecer.webp";
import img02 from "./assets/Allende/02-acceso-principal.webp";
import img03 from "./assets/Allende/03-glorieta-interior.webp";
import img04 from "./assets/Allende/04-bulevar-peatonal.webp";
import img05 from "./assets/Allende/05-acceso-privada-bugambilias.webp";
import img06 from "./assets/Allende/06-casa-club.webp";
//import img07 from "./assets/Allende/07-bugambilias-preventa.webp";
import img08 from "./assets/Allende/08-alberca.webp";
import img09 from "./assets/Allende/09-restaurante-bar.webp";
import img10 from "./assets/Allende/10-salon-de-estar.webp";
import img11 from "./assets/Allende/11-kids-club.webp";
import img12 from "./assets/Allende/12-gimnasio.webp";
import img13 from "./assets/Allende/13-tipos-de-lotes.webp";

/* Dimensiones reales del render — evitan CLS */
const IMG_W = 1263;
const IMG_H = 712;

/* El orden no es decorativo: recorre el desarrollo desde el
   acceso hacia adentro — accesos, casa club, amenidades, lotes.
   `alt` lleva las palabras clave completas (desarrollo + ciudad
   + estado); `title` y `note` son el texto visible. */
const SLIDES = [
  { src: img01, tag: "Accesos",    title: "Acceso principal",           note: "El portal de entrada al desarrollo, al atardecer.",
    alt: "Acceso principal al desarrollo Provincia de Allende al atardecer, San Miguel de Allende, Guanajuato" },
  { src: img02, tag: "Accesos",    title: "Acceso principal",           note: "Doble torre de acceso sobre el bulevar de llegada.",
    alt: "Doble torre de acceso del desarrollo residencial Provincia de Allende, San Miguel de Allende" },
  { src: img03, tag: "Accesos",    title: "Glorieta interior",          note: "Punto de distribución hacia las privadas.",
    alt: "Glorieta interior de Provincia de Allende, comunidad planeada en San Miguel de Allende, Guanajuato" },
  { src: img04, tag: "Accesos",    title: "Bulevar peatonal",           note: "Trazo caminable bajo los principios del Nuevo Urbanismo.",
    alt: "Bulevar peatonal de Provincia de Allende, trazo de Nuevo Urbanismo en San Miguel de Allende" },
  { src: img05, tag: "Accesos",    title: "Acceso Privada Bugambilias", note: "Entrada controlada a la primera etapa residencial.",
    alt: "Acceso controlado a la Privada Bugambilias, primera etapa de lotes en Provincia de Allende" },
  { src: img06, tag: "Casa Club",  title: "Casa Club",                  note: "Corazón social de la comunidad.",
    alt: "Casa Club de Provincia de Allende, amenidad principal del desarrollo en San Miguel de Allende" },
 // { src: img07, tag: "Lotes",      title: "Bugambilias",             note: "Terrenos de 126 a 400 m², desde $806,400 MXN.",
 //   alt: "Lotes residenciales en preventa Privada Bugambilias, Provincia de Allende, San Miguel de Allende" },
  { src: img08, tag: "Amenidades", title: "Alberca",                    note: "Área de descanso bajo los arcos de la Casa Club.",
    alt: "Alberca de la Casa Club en Provincia de Allende, San Miguel de Allende, Guanajuato" },
  { src: img09, tag: "Amenidades", title: "Restaurante · Bar",          note: "Servicio de alimentos dentro de la Casa Club.",
    alt: "Restaurante y bar de la Casa Club de Provincia de Allende, San Miguel de Allende" },
  { src: img10, tag: "Amenidades", title: "Salón de estar",             note: "Espacio de lectura y reunión para residentes.",
    alt: "Salón de estar para residentes en la Casa Club de Provincia de Allende, San Miguel de Allende" },
  { src: img11, tag: "Amenidades", title: "Kids Club",                  note: "Área supervisada para los más chicos.",
    alt: "Kids Club, área infantil supervisada en Provincia de Allende, San Miguel de Allende" },
  { src: img12, tag: "Amenidades", title: "Gimnasio",                   note: "Equipado, con vista al jardín interior.",
    alt: "Gimnasio equipado de la Casa Club de Provincia de Allende, San Miguel de Allende, Guanajuato" },
  { src: img13, tag: "Lotes",      title: "Tres tipos de lote",         note: "Standard, Plus y Premium.", align: "right",
    alt: "Plano de los tres tipos de lote (Standard, Plus y Premium) de 126 a 400 m² en Provincia de Allende" },
];

/* Paleta — misma del sitio */
const C = {
  ink: "#14100D",
  ink2: "#1C1712",
  rose: "#B85C72",
  rosePale: "#F0E4E9",
  parchment: "#EDE5D8",
  linen: "#E8DDD0",
  vellum: "#E2D8C8",
  sub: "#4A4038",
  muted: "#7A6E64",
  dimWhite: "#F5EFE8",
  borderWarm: "rgba(180,160,130,0.35)",
};

const Arrow = ({ dir = "next" }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"
    stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: dir === "prev" ? "rotate(180deg)" : "none" }}>
    <line x1="4" y1="12" x2="19" y2="12" />
    <polyline points="13,6 19,12 13,18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"
    stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" />
  </svg>
);

export default function CarruselAllende() {
  const [index, setIndex] = useState(0);
  const [metrics, setMetrics] = useState({ w: 0, slide: 0, gap: 16 });
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState(false);

  const stageRef = useRef(null);
  const railRef = useRef(null);
  const startX = useRef(0);
  const moved = useRef(false);

  const last = SLIDES.length - 1;

  /* ── Datos estructurados de la galería (Google Imágenes) ──
     Los src que entrega Vite ya son rutas resueltas; las
     convertimos a URL absoluta para que schema.org sea válido. */
  const galleryJsonLd = useMemo(() => {
    if (typeof window === "undefined") return null;
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      name: "Provincia de Allende — Galería del desarrollo",
      description:
        "Accesos, Casa Club, amenidades y tipos de lote del desarrollo residencial Provincia de Allende en San Miguel de Allende, Guanajuato.",
      associatedMedia: SLIDES.map((s) => ({
        "@type": "ImageObject",
        contentUrl: new URL(s.src, window.location.origin).href,
        name: `${s.title} — Provincia de Allende`,
        caption: s.alt,
        width: IMG_W,
        height: IMG_H,
        contentLocation: {
          "@type": "Place",
          name: "San Miguel de Allende, Guanajuato, México",
        },
      })),
    });
  }, []);

  /* ── Medidas: ancho de tarjeta según viewport ── */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const ratio = w < 640 ? 0.86 : w < 1024 ? 0.7 : 0.62;
      const gap = w < 640 ? 10 : 18;
      setMetrics({ w, slide: Math.round(w * ratio), gap });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const goTo = useCallback((i, stopAuto = true) => {
    setIndex(Math.max(0, Math.min(last, i)));
    if (stopAuto) setAuto(false);
  }, [last]);

  const next = useCallback((stop = true) => {
    setIndex((i) => (i >= last ? 0 : i + 1));
    if (stop) setAuto(false);
  }, [last]);

  const prev = useCallback(() => {
    setIndex((i) => (i <= 0 ? last : i - 1));
    setAuto(false);
  }, [last]);

  /* ── Autoplay ── */
  useEffect(() => {
    if (!auto || paused || dragging || lightbox) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => next(false), 6000);
    return () => clearInterval(t);
  }, [auto, paused, dragging, lightbox, next]);

  /* ── Teclado ── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && lightbox) return setLightbox(false);
      if (!stageRef.current) return;
      const active = document.activeElement;
      const inside = lightbox || stageRef.current.contains(active) ||
        railRef.current?.contains(active);
      if (!inside) return;
      if (e.key === "ArrowRight") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, lightbox]);

  /* ── Bloquear scroll con lightbox abierto ── */
  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  /* ── Miniatura activa siempre visible ── */
  useEffect(() => {
    const rail = railRef.current;
    const thumb = rail?.children?.[index];
    if (!rail || !thumb) return;
    const left = thumb.offsetLeft - rail.clientWidth / 2 + thumb.clientWidth / 2;
    rail.scrollTo({ left, behavior: "smooth" });
  }, [index]);

  /* ── Drag / swipe ── */
  const onDown = (e) => {
    startX.current = e.clientX;
    moved.current = false;
    setDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 6) moved.current = true;
    setDrag(dx);
  };
  const onUp = () => {
    if (!dragging) return;
    const threshold = Math.min(90, metrics.slide * 0.16);
    if (drag < -threshold) next();
    else if (drag > threshold) prev();
    setDrag(0);
    setDragging(false);
  };

  const step = metrics.slide + metrics.gap;
  const offset = metrics.w / 2 - (index * step + metrics.slide / 2) + drag;
  const current = SLIDES[index];

  return (
    <div
      style={{ position: "relative", userSelect: "none" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <style>{`
        .ca-stage { overflow: hidden; }
        .ca-track { display: flex; align-items: center; }
        .ca-card {
          position: relative; flex: 0 0 auto;
          aspect-ratio: ${IMG_W} / ${IMG_H};
          border-radius: 3px; overflow: hidden;
          background: ${C.vellum};
          border: 1px solid ${C.borderWarm};
        }
        .ca-card img { width: 100%; height: 100%; object-fit: cover; pointer-events: none; }
        .ca-veil {
          position: absolute; inset: 0; background: ${C.parchment};
          transition: opacity .55s cubic-bezier(.16,1,.3,1);
          pointer-events: none;
        }
        /* La placa vive SIEMPRE en el DOM (para que Google lea los
           12 textos), pero solo se ve en la tarjeta activa. */
        .ca-plate {
          position: absolute; bottom: 1rem; max-width: min(78%, 340px);
          background: rgba(237,229,216,0.96);
          backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(184,92,114,0.22);
          border-left: 2px solid ${C.rose};
          border-radius: 2px;
          padding: 0.7rem 1rem 0.75rem;
          box-shadow: 0 14px 40px rgba(20,16,13,0.18);
          opacity: 0; pointer-events: none;
          transition: opacity .45s cubic-bezier(.16,1,.3,1);
        }
        .ca-card.is-active .ca-plate { opacity: 1; }
        .ca-plate.l { left: 1rem; }
        .ca-plate.r { right: 1rem; }
        .ca-btn {
          width: 42px; height: 42px; border-radius: 50%;
          background: transparent; border: 1px solid ${C.borderWarm};
          color: ${C.sub}; cursor: pointer;
          display: inline-flex; align-items: center; justify-content: center;
          transition: color .22s ease, border-color .22s ease, background .22s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .ca-btn:hover { color: ${C.rose}; border-color: ${C.rose}; background: rgba(184,92,114,0.05); }
        .ca-btn:focus-visible { outline: 2px solid ${C.rose}; outline-offset: 3px; }
        .ca-btn:active { transform: scale(0.95); }

        .ca-rail {
          display: flex; gap: 6px; overflow-x: auto; scrollbar-width: none;
          padding-bottom: 2px; scroll-behavior: smooth;
        }
        .ca-rail::-webkit-scrollbar { display: none; }
        .ca-thumb {
          flex: 0 0 auto; width: 68px; aspect-ratio: ${IMG_W} / ${IMG_H};
          padding: 0; border: none; border-top: 2px solid transparent;
          background: none; cursor: pointer; overflow: hidden;
          opacity: .38; filter: saturate(.55);
          transition: opacity .3s ease, filter .3s ease, border-color .3s ease;
        }
        .ca-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .ca-thumb:hover { opacity: .75; filter: saturate(.9); }
        .ca-thumb[aria-current="true"] { opacity: 1; filter: none; border-top-color: ${C.rose}; }
        .ca-thumb:focus-visible { outline: 2px solid ${C.rose}; outline-offset: 2px; }

        .ca-bar { position: relative; height: 1px; background: ${C.borderWarm}; flex: 1; }
        .ca-bar span {
          position: absolute; left: 0; top: -1px; height: 3px; background: ${C.rose};
          transition: width .5s cubic-bezier(.16,1,.3,1);
        }

        .ca-lb {
          position: fixed; inset: 0; z-index: 300;
          background: rgba(20,16,13,0.96);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 1.25rem; padding: 1.4rem;
        }

        @media (max-width: 640px) {
          .ca-plate { bottom: .7rem; padding: .55rem .8rem .6rem; max-width: 84%; }
          .ca-plate.l { left: .7rem; } .ca-plate.r { right: .7rem; }
          .ca-thumb { width: 54px; }
          .ca-btn { width: 40px; height: 40px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ca-track, .ca-veil, .ca-plate, .ca-bar span { transition: none !important; }
        }
      `}</style>

      {/* ── ESCENA ── */}
      <div
        ref={stageRef}
        className="ca-stage"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        style={{ cursor: dragging ? "grabbing" : "grab", touchAction: "pan-y" }}
      >
        <div
          className="ca-track"
          style={{
            gap: metrics.gap,
            transform: `translate3d(${offset}px,0,0)`,
            transition: dragging ? "none" : "transform .65s cubic-bezier(.16,1,.3,1)",
            willChange: "transform",
          }}
        >
          {SLIDES.map((s, i) => {
            const active = i === index;
            return (
              <figure
                key={s.src}
                className={`ca-card${active ? " is-active" : ""}`}
                onClick={() => {
                  if (moved.current) return;
                  if (active) setLightbox(true);
                  else goTo(i);
                }}
                style={{
                  width: metrics.slide || "62%",
                  margin: 0,
                  transform: `scale(${active ? 1 : 0.9})`,
                  transition: dragging ? "none" : "transform .65s cubic-bezier(.16,1,.3,1)",
                  boxShadow: active
                    ? "0 22px 60px rgba(20,16,13,0.18)"
                    : "0 8px 24px rgba(20,16,13,0.08)",
                  cursor: active ? "zoom-in" : "pointer",
                }}
              >
                <img
                  src={s.src}
                  alt={s.alt}
                  width={IMG_W}
                  height={IMG_H}
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  decoding="async"
                  draggable="false"
                />
                <div className="ca-veil" style={{ opacity: active ? 0 : 0.42 }} />

                <figcaption className={`ca-plate ${s.align === "right" ? "r" : "l"}`}>
                  <div style={{
                    fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase",
                    color: C.rose, marginBottom: "0.3rem",
                  }}>
                    {s.tag}
                  </div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(1rem, 2.4vw, 1.3rem)", fontWeight: 400,
                    color: C.ink, lineHeight: 1.15, marginBottom: "0.25rem",
                  }}>
                    {s.title}
                  </div>
                  <div style={{
                    fontSize: "clamp(0.64rem, 1.5vw, 0.7rem)", lineHeight: 1.55,
                    color: C.muted, fontWeight: 300,
                  }}>
                    {s.note}
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      {/* ── CONTADOR + BARRA + FLECHAS ── */}
      <div style={{
        display: "flex", alignItems: "center", gap: "1.25rem",
        marginTop: "1.6rem", flexWrap: "wrap",
      }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem",
          fontWeight: 300, color: C.ink, lineHeight: 1, flexShrink: 0,
        }}>
          {String(index + 1).padStart(2, "0")}
          <span style={{ color: C.rose, margin: "0 0.35rem", fontSize: "1rem" }}>/</span>
          <span style={{ color: C.muted, fontSize: "1rem" }}>{String(SLIDES.length).padStart(2, "0")}</span>
        </div>

        <div className="ca-bar" style={{ minWidth: 80 }}>
          <span style={{ width: `${((index + 1) / SLIDES.length) * 100}%` }} />
        </div>

        <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
          <button className="ca-btn" onClick={prev} aria-label="Imagen anterior"><Arrow dir="prev" /></button>
          <button className="ca-btn" onClick={() => next()} aria-label="Imagen siguiente"><Arrow /></button>
        </div>
      </div>

      {/* ── RIEL DE MINIATURAS ── */}
      <div ref={railRef} className="ca-rail" style={{ marginTop: "1.1rem" }} aria-label="Galería Provincia de Allende">
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            className="ca-thumb"
            type="button"
            aria-current={i === index}
            aria-label={`Ver ${s.title}`}
            onClick={() => goTo(i)}
          >
            <img
              src={s.src}
              alt=""
              width={IMG_W}
              height={IMG_H}
              loading="lazy"
              decoding="async"
              draggable="false"
            />
          </button>
        ))}
      </div>

      <p style={{
        marginTop: "1.1rem", fontSize: "0.6rem", letterSpacing: "0.06em",
        color: C.muted, opacity: 0.75, fontWeight: 300,
      }}>
        Imágenes de carácter ilustrativo. Colores, dimensiones y materiales pueden variar.
      </p>

      {/* ── DATOS ESTRUCTURADOS DE LA GALERÍA ── */}
      {galleryJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: galleryJsonLd }}
        />
      )}

      {/* ── LIGHTBOX ── */}
      {/* El lightbox se monta en <body> con un portal: si el carrusel va
          dentro de un contenedor con transform (como <Reveal>), un
          position:fixed normal quedaría anclado a ese contenedor. */}
      {lightbox && createPortal(
        <div className="ca-lb" onClick={() => setLightbox(false)} role="dialog" aria-modal="true" aria-label={current.title}>
          <img
            src={current.src}
            alt={current.alt}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "min(1100px, 94vw)", maxHeight: "76vh",
              objectFit: "contain", borderRadius: "3px",
              boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
            }}
          />
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase",
              color: C.rose, marginBottom: "0.4rem",
            }}>
              {current.tag}
            </div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem",
              fontWeight: 300, color: C.dimWhite,
            }}>
              {current.title}
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.6rem" }} onClick={(e) => e.stopPropagation()}>
            <button className="ca-btn" onClick={prev} aria-label="Imagen anterior"
              style={{ borderColor: "rgba(245,239,232,0.2)", color: "rgba(245,239,232,0.7)" }}><Arrow dir="prev" /></button>
            <button className="ca-btn" onClick={() => next()} aria-label="Imagen siguiente"
              style={{ borderColor: "rgba(245,239,232,0.2)", color: "rgba(245,239,232,0.7)" }}><Arrow /></button>
          </div>

          <button className="ca-btn" onClick={() => setLightbox(false)} aria-label="Cerrar"
            style={{
              position: "absolute", top: "1.2rem", right: "1.2rem",
              borderColor: "rgba(245,239,232,0.2)", color: "rgba(245,239,232,0.7)",
            }}>
            <CloseIcon />
          </button>
        </div>,
        document.body
      )}
    </div>
  );
}
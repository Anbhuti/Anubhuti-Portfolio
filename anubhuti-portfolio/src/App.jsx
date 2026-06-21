/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import {
  Database,
  BarChart3,
  TrendingUp,
  Cpu,
  Award,
  GraduationCap,
  Mail,
  ExternalLink,
  MapPin,
  Download,
  Terminal,
  Play,
  Coffee,
  ArrowRight,
  Check,
  ChevronRight,
  Sparkles,
  Search,
  BookOpen,
  Phone,
  Settings
} from "lucide-react";

// Custom brand icons (since Lucide v0.400+ removed brand icons)
const Github = (props) => (
  <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Youtube = (props) => (
  <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <polygon points="10 15 15 12 10 9" />
  </svg>
);

/* ── Interactive Particle Background (Neural Net / Connection Field) ── */
function CanvasBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    const particles = [];
    const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 18000));

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.baseColor = Math.random() > 0.5 ? "#00F2FE" : "#7F00FF";
      }

      update(width, height) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // Mouse interaction (repulsion)
        if (mouseRef.current.x !== null) {
          const dx = this.x - mouseRef.current.x;
          const dy = this.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouseRef.current.radius) {
            const force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * force * 2;
            this.y += Math.sin(angle) * force * 2;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.baseColor;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.baseColor;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const animateCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update(canvas.width, canvas.height);
        p.draw();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = (120 - dist) / 120 * 0.15;
            ctx.strokeStyle = `rgba(79, 172, 254, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animateCanvas);
    };

    animateCanvas();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: 1 }} />;
}

/* ── Magnet Effect Component ── */
function Magnet({ children, padding = 120, strength = 4, activeTransition = "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)", inactiveTransition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)" }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({ transform: "translate3d(0,0,0)", transition: inactiveTransition });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const threshold = Math.max(rect.width, rect.height) / 2 + padding;

      if (dist < threshold) {
        setStyle({
          transform: `translate3d(${dx / strength}px, ${dy / strength}px, 0)`,
          transition: activeTransition,
        });
      } else {
        setStyle({
          transform: "translate3d(0,0,0)",
          transition: inactiveTransition,
        });
      }
    };

    const onMouseLeave = () => {
      setStyle({
        transform: "translate3d(0,0,0)",
        transition: inactiveTransition,
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div ref={ref} style={{ ...style, display: "inline-block" }}>
      {children}
    </div>
  );
}

/* ── FadeIn Container ── */
function FadeIn({ children, delay = 0, duration = 0.6, x = 0, y = 20, className = "", style = {} }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Char-By-Char Animated Scroll Text ── */
function AnimatedText({ text, className = "", style = {} }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.25"]
  });

  const words = useMemo(() => text.split(" "), [text]);

  return (
    <span ref={ref} className={className} style={{ display: "inline-block", position: "relative", ...style }}>
      {words.map((word, wordIndex) => {
        const start = wordIndex / words.length;
        const end = (wordIndex + 1) / words.length;
        return (
          <Word key={wordIndex} word={word} start={start} end={end} progress={scrollYProgress} isLast={wordIndex === words.length - 1} />
        );
      })}
    </span>
  );
}

function Word({ word, start, end, progress, isLast }) {
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  return (
    <motion.span style={{ opacity, display: "inline-block", marginRight: isLast ? 0 : "0.25em" }}>
      {word}
    </motion.span>
  );
}

/* ── Floating Card Component ── */
function FloatingCard({ children, delay = 0, style = {} }) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-8, 8, -8] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
      style={{
        background: "rgba(10, 15, 30, 0.65)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "16px",
        padding: "12px 18px",
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        position: "absolute",
        zIndex: 5,
        pointerEvents: "none",
        ...style
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── KPI Counter Component ── */
function KpiCounter({ value, duration = 1.5, suffix = "" }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = parseInt(value.replace(/[^0-9]/g, ""), 10);
          if (isNaN(end)) return;
          const totalTicks = 60;
          const step = end / totalTicks;
          let tick = 0;

          const timer = setInterval(() => {
            tick++;
            start = Math.floor(step * tick);
            if (tick >= totalTicks) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, (duration * 1000) / totalTicks);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [value, duration, hasAnimated]);

  const formattedCount = count.toLocaleString();

  return (
    <span ref={elementRef}>
      {formattedCount}
      {suffix}
    </span>
  );
}



/* ── Interactive Abstract Data Sphere (Hero Graphics) ── */
function DataSphere() {
  return (
    <div style={{ position: "relative", width: "clamp(260px, 32vw, 420px)", height: "clamp(260px, 32vw, 420px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Outer Glow Ring */}
      <div
        className="spin-slow-anim"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          border: "1px dashed rgba(0, 242, 254, 0.4)",
          boxShadow: "0 0 40px rgba(0, 242, 254, 0.05), inset 0 0 40px rgba(0, 242, 254, 0.05)",
        }}
      />

      {/* Middle Counter-rotating Ring */}
      <div
        className="pulse-glow-anim"
        style={{
          position: "absolute",
          width: "82%",
          height: "82%",
          borderRadius: "50%",
          border: "2px solid transparent",
          borderTopColor: "var(--color-blue)",
          borderBottomColor: "var(--color-purple)",
          animation: "spin-slow 15s linear infinite reverse",
        }}
      />

      {/* Inner Tech Core */}
      <div
        style={{
          position: "absolute",
          width: "55%",
          height: "55%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(127,0,255,0.2) 0%, rgba(6,8,19,0.9) 80%)",
          border: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 30px rgba(127, 0, 255, 0.2)",
        }}
      >
        <Database size={36} className="pulse-glow-anim" style={{ color: "var(--color-cyan)", marginBottom: "6px" }} />
        <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>AI Core</span>
        <span style={{ fontSize: "0.55rem", color: "var(--text-muted)", fontFamily: "monospace" }}>STATUS: ACTIVE</span>
      </div>

      {/* Orbits / Data Points */}
      {[...Array(6)].map((_, i) => {
        const angle = (i * 360) / 6;
        const radius = "46%";
        return (
          <motion.div
            key={i}
            className="pulse-glow-anim"
            style={{
              position: "absolute",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: i % 2 === 0 ? "var(--color-cyan)" : "var(--color-purple)",
              left: "50%",
              top: "50%",
              marginLeft: "-4px",
              marginTop: "-4px",
              transform: `rotate(${angle}deg) translate(${radius})`,
            }}
            animate={{
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 2 + i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}

/* ── Project Card Stacking Item ── */
function ProjectCard({ project, index, total, scrollRef }) {
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start start", "end end"] });

  // Calculate stack variables
  const targetScale = 1 - (total - 1 - index) * 0.035;
  const inputStart = index / total;
  const inputEnd = (index + 1) / total;
  const scale = useTransform(scrollYProgress, [inputStart, inputEnd], [1, targetScale]);

  return (
    <div style={{ height: "90vh", display: "flex", alignItems: "flex-start", justifyContent: "center", position: "sticky", top: "80px", zIndex: 10 + index }}>
      <motion.div
        style={{
          scale,
          borderRadius: "24px",
          border: "1px solid var(--border-color)",
          background: "var(--bg-surface)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          padding: "clamp(20px, 3vw, 40px)",
          width: "100%",
          maxWidth: "1100px",
          transformOrigin: "top center",
        }}
        className="project-stack-card"
      >
        {/* Card Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
              <span style={{ fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, color: "var(--color-cyan)", border: "1px solid rgba(0, 242, 254, 0.3)", borderRadius: "99px", padding: "2px 10px" }}>
                {project.type}
              </span>
              <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{project.num}</span>
            </div>
            <h3 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", fontWeight: 800, color: "#fff", lineHeight: 1.1 }}>{project.name}</h3>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: "8px", borderRadius: "9999px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)",
                  color: "#fff", padding: "10px 20px", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", transition: "all 0.3s"
                }}
                className="hover-glow"
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-cyan)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-color)"; }}
              >
                <Github size={16} />
                <span>GitHub Repo</span>
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: "8px", borderRadius: "9999px", background: "var(--grad-primary)",
                  color: "#fff", padding: "10px 24px", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer", transition: "all 0.3s"
                }}
              >
                <span>Live View</span>
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Tech Stack tags */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
          {project.tech.map((t, idx) => (
            <span key={idx} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", padding: "4px 12px", fontSize: "0.75rem", color: "var(--text-secondary)" }}>
              {t}
            </span>
          ))}
        </div>

        {/* Card Body */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px", textAlign: "left" }}>
          {/* Main Info */}
          <div>
            <p style={{ color: "var(--text-secondary)", marginBottom: "20px", fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)", lineHeight: 1.5 }}>
              {project.desc}
            </p>
            <h4 style={{ fontSize: "0.9rem", color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px", fontWeight: 700 }}>Key Project Deliverables</h4>
            <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "10px", listStyle: "none" }}>
              {project.highlights.map((h, idx) => (
                <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--color-cyan)", marginTop: "2px" }}><Check size={14} /></span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Skills Rotator (Rotating text effect) ── */
function SkillsRotator() {
  const skills = [
    "Problem Solving",
    "Critical Thinking",
    "Data Visualization",
    "Statistical Analysis",
    "Insight Generation"
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % skills.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [skills.length]);

  return (
    <div style={{ height: "clamp(48px, 6vw, 72px)", overflow: "hidden", display: "flex", alignItems: "center", margin: "16px 0 28px 0" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -25, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            fontWeight: 800,
            color: "var(--color-cyan)",
            textShadow: "0 0 15px rgba(0, 242, 254, 0.4)",
            fontFamily: "var(--font-heading)"
          }}
        >
          {skills[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ── Introduction Video Showcase ── */
function IntroVideo() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [showReplay, setShowReplay] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayedOnce) {
          const video = videoRef.current;
          if (video) {
            video.muted = false; // Maintain audio
            video.play()
              .then(() => {
                setIsPlaying(true);
                setHasPlayedOnce(true);
              })
              .catch((err) => {
                console.log("Autoplay unmuted blocked, falling back to muted:", err);
                video.muted = true;
                video.play()
                  .then(() => {
                    setIsPlaying(true);
                    setHasPlayedOnce(true);
                  })
                  .catch(e => console.error("Autoplay failed:", e));
              });
          }
        }
      },
      { threshold: 0.25 }
    );

    const container = containerRef.current;
    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) observer.unobserve(container);
    };
  }, [hasPlayedOnce]);

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setShowReplay(true);
  };

  const handleReplay = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.muted = false; // Ensure audio on manual replay
      video.play()
        .then(() => {
          setIsPlaying(true);
          setShowReplay(false);
        })
        .catch(e => console.error("Replay failed:", e));
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "520px",
        margin: "0 auto",
        perspective: "1000px"
      }}
    >
      {/* Outer Glow */}
      <div
        style={{
          position: "absolute",
          inset: "-12px",
          background: "radial-gradient(circle, rgba(79, 172, 254, 0.25) 0%, rgba(127, 0, 255, 0.2) 100%)",
          filter: "blur(30px)",
          borderRadius: "32px",
          zIndex: 0,
          pointerEvents: "none"
        }}
      />

      <motion.div
        whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
        animate={{ y: [-4, 4, -4] }}
        transition={{
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 0.4 },
          rotateX: { duration: 0.4 },
          rotateY: { duration: 0.4 }
        }}
        style={{
          position: "relative",
          zIndex: 1,
          borderRadius: "24px",
          border: "2px solid rgba(79, 172, 254, 0.35)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(127, 0, 255, 0.2)",
          background: "rgba(10, 15, 30, 0.55)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          overflow: "hidden",
          aspectRatio: "16/9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <video
          ref={videoRef}
          src="/intro-video.mp4"
          playsInline
          onEnded={handleVideoEnded}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block"
          }}
        />

        {/* Overlay showing Replay Button */}
        <AnimatePresence>
          {showReplay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(3, 5, 12, 0.8)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                zIndex: 5
              }}
            >
              <button
                onClick={handleReplay}
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "var(--grad-primary)",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 0 35px rgba(0, 242, 254, 0.6)",
                  transition: "transform 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <Play size={24} fill="#fff" style={{ color: "#fff", marginLeft: "3px" }} />
              </button>
              <span style={{ fontSize: "0.85rem", color: "#fff", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Replay Video</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* ── MAIN COMPONENT ── */
export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  // Fullscreen introduction state
  const [introActive, setIntroActive] = useState(true);

  // 3D rotation states for the premium showcase
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });

  const handleVideoMouseMove = (e) => {
    if (introActive) return; // Disable tilt during fullscreen intro
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Rotation range of -15 to 15 degrees for natural tilt
    const rY = ((mouseX / width) - 0.5) * 30;
    const rX = (((mouseY / height) - 0.5) * -30);

    setRotation({ x: rX, y: rY });
    setMousePos({ x: (mouseX / width) * 100, y: (mouseY / height) * 100 });
  };

  const handleVideoMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroActive(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Sticky Card Project Data
  const projectsData = [
    {
      num: "01",
      type: "Machine Learning",
      name: "Retail Food Price Analysis and Prediction",
      tech: ["Python", "SQL", "Streamlit", "Machine Learning"],
      github: "https://github.com/Anbhuti/Retail-Food-Price-Analysis-and-Prediction",
      desc: "Developed an end-to-end machine learning solution to analyze market trends and predict food pricing outcomes.",
      highlights: [
        "Linear Regression",
        "Random Forest",
        "Predictive Analytics",
        "SQL Data Pipelines"
      ]
    },
    {
      num: "02",
      type: "Exploratory Analytics",
      name: "Netflix Content Analysis",
      tech: ["Python", "Pandas", "Matplotlib"],
      github: "https://github.com/Anbhuti/Netflix-python-",
      desc: "Analyzed 8,000+ Netflix records to identify trends, genres, ratings, and content growth patterns.",
      highlights: [
        "Analyzed 8,000+ Netflix records to identify historical release trends.",
        "Identified content genres, ratings, and distribution patterns.",
        "Visualized and presented insights using Python, Pandas, and Matplotlib."
      ]
    },
    {
      num: "03",
      type: "Data Engineering & Viz",
      name: "Online Retail Sales Analysis",
      tech: ["Excel", "SQL", "Tableau", "Python"],
      github: "https://github.com/Anbhuti/Project-on-Online-Retail",
      desc: "Analyzed 7,000+ retail transactions and generated business insights from 3.1M+ revenue data.",
      highlights: [
        "Ingested and analyzed large-scale datasets spanning over 7,000 unique retail transactions.",
        "Cleaned and processed 3.1M+ sales revenue points with zero data leakage.",
        "Generated actionable business insights and visualized KPIs using SQL, Excel, and Tableau."
      ]
    },
    {
      num: "04",
      type: "Business Intelligence",
      name: "Coffee Sales Analysis",
      tech: ["Excel", "SQL", "Power BI"],
      github: "https://github.com/Anbhuti/Coffee-Sales-Analysis",
      desc: "Performed sales trend analysis, KPI reporting, and customer behavior analysis using interactive dashboards.",
      highlights: [
        "Performed sales trend analysis across yearly and quarterly cohorts.",
        "Designed interactive dashboards tracking average ticket size and customer retention.",
        "Conducted KPI reporting and customer behavior analysis to support business decisions."
      ]
    },
    {
      num: "05",
      type: "Software Utility",
      name: "YouTube Video Downloader",
      tech: ["Python", "Streamlit"],
      github: "https://github.com/Anbhuti/Youtube-video-download-project-",
      desc: "Built a user-friendly YouTube video downloading application with URL-based processing and download automation.",
      highlights: [
        "Implemented video stream URL parsing and extraction routines using Python.",
        "Designed an intuitive Streamlit interface for URL-based video fetching.",
        "Incorporated robust error handling for network requests and download automation."
      ]
    }
  ];

  // Track scroll position for header visual highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "projects", "education", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const triggerScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Dynamic Animated Canvas Grid Background */}
      <CanvasBackground />

      {/* Fullscreen Introduction Backdrop */}
      <AnimatePresence>
        {introActive && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(3, 5, 12, 0.98)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              zIndex: 1000,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              pointerEvents: "auto"
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "var(--grad-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "2.5rem",
                color: "#fff",
                boxShadow: "0 0 40px rgba(0, 242, 254, 0.4)"
              }}
            >
              A
            </motion.div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                color: "var(--color-cyan)",
                fontSize: "0.8rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontWeight: 700
              }}
            >
              Initializing AI Core...
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{
        position: "relative",
        zIndex: 2,
        background: "transparent",
        minHeight: "100vh"
      }}>

        {/* ── STICKY NAVIGATION HEADER ── */}
        <header style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(6, 8, 19, 0.7)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border-color)",
          padding: "16px 24px"
        }}>
          <div className="container-max" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }} onClick={() => triggerScrollTo("hero")}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--grad-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.95rem", color: "#fff" }}>A</div>
              <span style={{ fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.02em", fontFamily: "var(--font-heading)" }}>ANUBHUTI PAL</span>
            </div>

            <nav style={{ display: "flex", gap: "clamp(12px, 2.5vw, 24px)", alignItems: "center" }}>
              {["About", "Skills", "Projects", "Education", "Contact"].map((item) => {
                const targetId = item.toLowerCase();
                const isActive = activeSection === targetId;
                return (
                  <button
                    key={item}
                    onClick={() => triggerScrollTo(targetId)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: isActive ? "var(--color-cyan)" : "var(--text-secondary)",
                      fontSize: "0.85rem",
                      fontWeight: isActive ? 600 : 500,
                      cursor: "pointer",
                      fontFamily: "var(--font-heading)",
                      transition: "color 0.2s",
                      position: "relative",
                      padding: "4px 0"
                    }}
                  >
                    {item}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        style={{
                          position: "absolute", bottom: 0, left: 0, right: 0, height: "2px",
                          background: "var(--grad-primary)", borderRadius: "2px"
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </header>

        {/* ── HERO SECTION ── */}
        <section id="hero" className="hero-section">
          <div className="grid-bg" style={{ zIndex: 1 }} />
          <div className="container-max hero-layout" style={{ position: "relative", zIndex: 2 }}>
            <FadeIn delay={0.15}>
              <div className="hero-copy">
                <span className="hero-pill">Aspiring Data Analyst</span>
                <h1 className="hero-title">ANUBHUTI PAL</h1>
                <p className="hero-subtitle">AI & Data Science</p>
                <p className="hero-text">
                  Crafting modern analytics experiences with clean dashboards, structured data workflows, and AI-powered insight generation.
                </p>

                <div className="hero-actions">
                  <button onClick={() => triggerScrollTo("skills")} className="primary-button">
                    Explore Skills
                    <ArrowRight size={18} />
                  </button>
                  <a
                    href="/Anubhuti_Pal_Resume.pdf"
                    download="Anubhuti_Pal_Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="secondary-button"
                  >
                    Download Resume
                  </a>
                </div>

                <div className="hero-quickstats">
                  <div>
                    <span>Business Intelligence</span>
                    <strong>Power BI + Tableau</strong>
                  </div>
                  <div>
                    <span>Data Strategy</span>
                    <strong>EDA, Cleaning, Reporting</strong>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="hero-visual-card glass-panel">
                <div className="hero-visual-top">
                  <div>
                    <span className="visual-chip">Insight Dashboard</span>
                    <h3>Executive analytics snapshot</h3>
                  </div>
                  <span className="visual-badge">Live</span>
                </div>

                <div className="chart-preview">
                  <div className="chart-bar" style={{ width: "82%" }} />
                  <div className="chart-bar accent" style={{ width: "64%" }} />
                  <div className="chart-bar" style={{ width: "91%" }} />
                  <div className="chart-bar accent" style={{ width: "54%" }} />
                </div>

                <div className="visual-stats-grid">
                  <div className="visual-stat-card">
                    <span>Data pipelines</span>
                    <strong>8 connected sources</strong>
                  </div>
                  <div className="visual-stat-card">
                    <span>Monthly reports</span>
                    <strong>5 dashboards</strong>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── STATS BAR (SaaS style KPI Section) ── */}
        <section style={{ position: "relative", zIndex: 10, marginTop: "-40px", padding: "0 24px", marginBottom: "40px" }}>
          <div className="container-max">
            <div className="glass-panel" style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "24px",
              padding: "30px 40px",
              background: "rgba(10, 15, 30, 0.55)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
              textAlign: "center",
              borderRadius: "24px"
            }}>
              <div>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", background: "var(--grad-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  <KpiCounter value="8000" suffix="+" />
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Netflix Catalog Records</div>
              </div>

              <div style={{ borderLeft: "1px solid var(--border-color)", borderRight: "1px solid var(--border-color)" }} className="kpi-divider">
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", background: "var(--grad-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  <KpiCounter value="3100000" suffix="+" />
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Revenue Points Analyzed</div>
              </div>

              <div>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", background: "var(--grad-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  <KpiCounter value="7000" suffix="+" />
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Retail Transactions Ingested</div>
              </div>

              <div style={{ borderLeft: "1px solid var(--border-color)" }} className="kpi-divider-right">
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", background: "var(--grad-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  <KpiCounter value="5" suffix="+" />
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>ML & Data Products</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT ME SECTION ── */}
        <section id="about" style={{ padding: "100px 0", background: "rgba(13, 17, 34, 0.2)", position: "relative" }}>
          <div className="container-max" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "60px", alignItems: "start" }}>

            {/* Left Side: Professional Bio, Education and Experience Summaries */}
            <FadeIn delay={0.15} style={{ textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <div style={{ width: "20px", height: "2px", background: "var(--grad-primary)" }} />
                <span style={{ textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--color-cyan)", fontWeight: 700 }}>About Me</span>
              </div>
              <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800, marginBottom: "20px", lineHeight: 1.15 }}>
                Hello, I&apos;m Anubhuti Pal.
              </h2>

              <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", marginBottom: "28px", lineHeight: 1.65 }}>
                I am an MCA (Data Science & AI) Student with a strong passion for Data Analytics, Business Intelligence, Data Visualization, and Machine Learning. I enjoy transforming raw data into actionable insights and building data-driven solutions that help businesses make informed decisions.
              </p>



              {/* Experience Summary */}
              <div>
                <h4 style={{ fontSize: "0.95rem", color: "#fff", display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  <Award size={16} style={{ color: "var(--color-purple)" }} />
                  <span>Experience Summary</span>
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {/* Deloitte Experience */}
                  <div className="glass-panel" style={{ padding: "20px", borderLeft: "4px solid var(--color-cyan)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", alignItems: "flex-start", gap: "8px", marginBottom: "8px" }}>
                      <div>
                        <h5 style={{ fontSize: "0.95rem", color: "#fff", fontWeight: 700 }}>Data Analytics Virtual Intern</h5>
                        <div style={{ fontSize: "0.8rem", color: "var(--color-cyan)", fontWeight: 600 }}>Deloitte (Forage)</div>
                      </div>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", background: "rgba(255,255,255,0.03)", padding: "2px 8px", borderRadius: "4px" }}>January 2026</span>
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px 0", display: "flex", flexDirection: "column", gap: "6px" }}>
                      {[
                        "Analyzed datasets using Excel and SQL to identify trends and generate actionable insights.",
                        "Created interactive dashboards and reports in Power BI."
                      ].map((bullet, i) => (
                        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                          <span style={{ color: "var(--color-cyan)" }}>•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href="/certificates/Deloitte%20Data%20Analyst%20certificate.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="cert-card"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        border: "1px solid rgba(0, 242, 254, 0.15)",
                        background: "rgba(0, 242, 254, 0.03)",
                        textDecoration: "none",
                        fontSize: "0.75rem",
                        color: "var(--color-cyan)",
                        fontWeight: 600
                      }}
                    >
                      <span>Completion Certificate</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>

                  {/* IBM Experience */}
                  <div className="glass-panel" style={{ padding: "20px", borderLeft: "4px solid var(--color-purple)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", alignItems: "flex-start", gap: "8px", marginBottom: "8px" }}>
                      <div>
                        <h5 style={{ fontSize: "0.95rem", color: "#fff", fontWeight: 700 }}>Generative AI Virtual Intern</h5>
                        <div style={{ fontSize: "0.8rem", color: "var(--color-purple)", fontWeight: 600 }}>IBM Developer Skills Network</div>
                      </div>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", background: "rgba(255,255,255,0.03)", padding: "2px 8px", borderRadius: "4px" }}>Feb – Mar 2026</span>
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px 0", display: "flex", flexDirection: "column", gap: "6px" }}>
                      {[
                        "Explored Generative AI concepts and real-world applications.",
                        "Worked with AI-powered tools and prompt engineering techniques."
                      ].map((bullet, i) => (
                        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                          <span style={{ color: "var(--color-purple)" }}>•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                      <img src="/ibm_badge.png" alt="IBM Badge" style={{ width: "32px", height: "32px", objectFit: "contain" }} />
                      <a
                        href="/certificates/IBMCEP%20PBELGEN221IN%20Certificate%20_%20IBMMooc.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="cert-card"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "6px 12px",
                          borderRadius: "8px",
                          border: "1px solid rgba(127, 0, 255, 0.15)",
                          background: "rgba(127, 0, 255, 0.03)",
                          textDecoration: "none",
                          fontSize: "0.75rem",
                          color: "var(--color-purple)",
                          fontWeight: 600
                        }}
                      >
                        <span>Completion Certificate</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Right Side: Introduction Video (Cinematic Apple/OpenAI presentation) */}
            <FadeIn delay={0.3} style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", alignSelf: "center" }}>
              <IntroVideo />
            </FadeIn>

          </div>
        </section>



        {/* ── TECHNICAL SKILLS SECTION ── */}
        <section id="skills" className="skills-section">
          <div className="container-max">

            <div className="section-heading" style={{ marginBottom: "48px" }}>
              <span className="section-label">Technical Skillsets</span>
              <h2>Data Analytics & Tools</h2>
              <p>Five modern skill categories showing core programming, analytics, visualization, libraries, and tools with a polished dark theme.</p>
            </div>

            <div className="skill-cards">
              <FadeIn delay={0.1}>
                <article className="skill-card">
                  <div className="skill-card-header">
                    <div className="skill-card-icon">
                      <Terminal size={20} />
                    </div>
                    <div>
                      <h3>Programming Languages</h3>
                      <p>Code-first analytics for strong model pipelines.</p>
                    </div>
                  </div>
                  <div className="skill-progress-group">
                    <div className="skill-progress-row">
                      <span>Python</span>
                      <span className="skill-level">Advanced</span>
                    </div>
                    <div className="skill-progress-track"><div className="skill-progress-fill" style={{ width: "92%" }} /></div>
                  </div>
                  <div className="skill-progress-group">
                    <div className="skill-progress-row">
                      <span>SQL</span>
                      <span className="skill-level">Intermediate</span>
                    </div>
                    <div className="skill-progress-track"><div className="skill-progress-fill accent" style={{ width: "74%" }} /></div>
                  </div>
                </article>
              </FadeIn>

              <FadeIn delay={0.2}>
                <article className="skill-card">
                  <div className="skill-card-header">
                    <div className="skill-card-icon">
                      <Database size={20} />
                    </div>
                    <div>
                      <h3>Data Analytics</h3>
                      <p>From raw datasets to actionable business insights.</p>
                    </div>
                  </div>
                  <ul className="skill-card-list">
                    <li>Data Cleaning</li>
                    <li>Data Analysis</li>
                    <li>Exploratory Data Analysis (EDA)</li>
                    <li>Statistical Analysis</li>
                    <li>Feature Engineering</li>
                    <li>Data Preprocessing</li>
                    <li>Business Intelligence</li>
                    <li>Insight Generation</li>
                  </ul>
                </article>
              </FadeIn>

              <FadeIn delay={0.3}>
                <article className="skill-card">
                  <div className="skill-card-header">
                    <div className="skill-card-icon">
                      <BarChart3 size={20} />
                    </div>
                    <div>
                      <h3>Visualization Tools</h3>
                      <p>Professional dashboards and reporting workflows.</p>
                    </div>
                  </div>
                  <ul className="skill-card-list">
                    <li>Power BI</li>
                    <li>Tableau</li>
                    <li>Excel Dashboards</li>
                    <li>Matplotlib</li>
                    <li>KPI Reporting</li>
                  </ul>
                </article>
              </FadeIn>

              <FadeIn delay={0.4}>
                <article className="skill-card">
                  <div className="skill-card-header">
                    <div className="skill-card-icon">
                      <Cpu size={20} />
                    </div>
                    <div>
                      <h3>Libraries</h3>
                      <p>Core Python libraries for data science and modeling.</p>
                    </div>
                  </div>
                  <ul className="skill-card-list">
                    <li>Pandas</li>
                    <li>NumPy</li>
                    <li>Matplotlib</li>
                    <li>Seaborn</li>
                    <li>Scikit-Learn</li>
                    <li>Plotly</li>
                  </ul>
                </article>
              </FadeIn>

              <FadeIn delay={0.5}>
                <article className="skill-card">
                  <div className="skill-card-header">
                    <div className="skill-card-icon">
                      <Settings size={20} />
                    </div>
                    <div>
                      <h3>Tools</h3>
                      <p>Professional workflow tools for analytics delivery.</p>
                    </div>
                  </div>
                  <ul className="skill-card-list">
                    <li>Microsoft Excel</li>
                    <li>Power BI</li>
                    <li>Tableau</li>
                    <li>Streamlit</li>
                    <li>GitHub</li>
                    <li>Jupyter Notebook</li>
                    <li>VS Code</li>
                  </ul>
                </article>
              </FadeIn>
            </div>

          </div>
        </section>

        {/* ── PROJECTS SECTION (STICKY STACK CARDS) ── */}
        <section id="projects" style={{ padding: "100px 0", position: "relative" }}>
          <div className="container-max" style={{ marginBottom: "60px" }}>
            <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <div style={{ width: "20px", height: "2px", background: "var(--grad-primary)" }} />
                <span style={{ textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--color-cyan)", fontWeight: 700 }}>My Work</span>
                <div style={{ width: "20px", height: "2px", background: "var(--grad-primary)" }} />
              </div>
              <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800, marginBottom: "16px" }}>
                Featured Projects
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                A stacked catalog of my data analysis, machine learning forecasts, and custom utility engineering repositories.
              </p>
            </div>
          </div>

          {/* Cards container wrapper (will hold the scroll offsets) */}
          <div className="container-max" style={{ display: "flex", flexDirection: "column", gap: "0px", position: "relative" }}>
            {projectsData.map((project, index) => (
              <ProjectCard
                key={project.num}
                project={project}
                index={index}
                total={projectsData.length}
                scrollRef={{ current: document.getElementById("projects") }}
              />
            ))}
          </div>
        </section>

        {/* ── CERTIFICATIONS & EDUCATION SECTION ── */}
        <section id="education" style={{ padding: "100px 0", background: "rgba(13, 17, 34, 0.2)" }}>
          <div className="container-max" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px" }}>

            {/* Education timeline */}
            <div style={{ textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <div style={{ width: "20px", height: "2px", background: "var(--grad-primary)" }} />
                <span style={{ textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--color-cyan)", fontWeight: 700 }}>Chronology</span>
              </div>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "36px" }}>Education History</h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "32px", borderLeft: "1px solid rgba(255,255,255,0.08)", paddingLeft: "24px", position: "relative" }}>
                {/* Degree 1 */}
                <div style={{ position: "relative" }}>
                  {/* Timeline dot */}
                  <div style={{ position: "absolute", left: "-30px", top: "6px", width: "10px", height: "10px", borderRadius: "50%", background: "var(--color-cyan)", boxShadow: "0 0 10px var(--color-cyan)" }} />
                  <span style={{ color: "var(--color-cyan)", fontSize: "0.8rem", fontWeight: 700 }}>2024 – 2026</span>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#fff", marginTop: "4px" }}>Master of Computer Applications (Data Science & AI)</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", margin: "2px 0 6px" }}>Babu Banarasi Das University, Lucknow</p>
                  <div style={{ display: "inline-block", background: "rgba(255,255,255,0.03)", padding: "2px 10px", borderRadius: "6px", fontSize: "0.8rem", color: "var(--color-cyan)" }}>
                    Percentage Score: <strong>69.3%</strong>
                  </div>
                </div>

                {/* Degree 2 */}
                <div style={{ position: "relative" }}>
                  {/* Timeline dot */}
                  <div style={{ position: "absolute", left: "-30px", top: "6px", width: "10px", height: "10px", borderRadius: "50%", background: "var(--color-purple)", boxShadow: "0 0 10px var(--color-purple)" }} />
                  <span style={{ color: "var(--color-purple)", fontSize: "0.8rem", fontWeight: 700 }}>2021 – 2024</span>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#fff", marginTop: "4px" }}>Bachelor of Computer Applications</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", margin: "2px 0 6px" }}>Ambalika Institute of Higher Education, Lucknow</p>
                  <div style={{ display: "inline-block", background: "rgba(255,255,255,0.03)", padding: "2px 10px", borderRadius: "6px", fontSize: "0.8rem", color: "var(--color-purple)" }}>
                    Percentage Score: <strong>71.7%</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications list */}
            <div style={{ textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <div style={{ width: "20px", height: "2px", background: "var(--grad-primary)" }} />
                <span style={{ textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--color-purple)", fontWeight: 700 }}>Verification</span>
              </div>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "36px" }}>Professional Certifications</h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  { name: "IBM AI Analyst", org: "IBM", link: "/certificates/AI%20certificate.pdf" },
                  { name: "Machine Learning with Python", org: "IBM", link: "/certificates/ML%20%20certificate.pdf" },
                  { name: "Python for Data Science", org: "IBM", link: "/certificates/Python%20certificate.pdf" },
                  { name: "NoSQL & DBaaS", org: "IBM", link: "/certificates/No%20sql%20certificate.pdf" },
                  { name: "Deloitte Data Analytics Job Simulation", org: "Deloitte (Forage)", link: "/certificates/Deloitte%20Data%20Analyst%20certificate.pdf" },
                  { name: "Accenture Software Engineering Job Simulation", org: "Accenture (Forage)", link: "/certificates/Accenture%20certficate.pdf" },
                  { name: "GeeksforGeeks Certification", org: "GeeksforGeeks", link: "/certificates/geek%20for%20geek%20certificate.pdf" }
                ].map((c, idx) => (
                  <a
                    key={idx}
                    href={c.link}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-panel cert-card"
                    style={{
                      padding: "16px 20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      cursor: "pointer",
                      textDecoration: "none"
                    }}
                  >
                    <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(127, 0, 255, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Award size={18} style={{ color: "var(--color-purple)", margin: "0 auto" }} />
                    </div>
                    <div style={{ flexGrow: 1 }}>
                      <h4 style={{ fontSize: "0.95rem", color: "#fff", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                        <span>{c.name}</span>
                        <ExternalLink size={14} style={{ color: "var(--color-purple)", opacity: 0.8 }} />
                      </h4>
                      <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>Issued by {c.org}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ── CONTACT SECTION ── */}
        <section id="contact" style={{ padding: "100px 0", position: "relative" }}>
          <div className="grid-bg" />
          <div className="container-max" style={{ maxWidth: "1000px" }}>

            <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 60px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <div style={{ width: "20px", height: "2px", background: "var(--grad-primary)" }} />
                <span style={{ textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--color-cyan)", fontWeight: 700 }}>Get In Touch</span>
                <div style={{ width: "20px", height: "2px", background: "var(--grad-primary)" }} />
              </div>
              <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800, marginBottom: "16px" }}>
                Let&apos;s Build Together
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                I am actively seeking job opportunities and collaborations in Data Analytics, Business Intelligence, and ML engineering.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "40px", alignItems: "start" }}>

              {/* Contact Information Card */}
              <div className="glass-panel" style={{ padding: "32px", textAlign: "left" }}>
                <h3 style={{ fontSize: "1.25rem", color: "#fff", marginBottom: "24px" }}>Contact Details</h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <a
                      href="mailto:palanubhuti2707@gmail.com"
                      style={{
                        width: "40px", height: "40px", borderRadius: "50%",
                        background: "rgba(0, 242, 254, 0.06)", display: "flex",
                        alignItems: "center", justifyContent: "center", transition: "all 0.3s"
                      }}
                      className="hover-glow"
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0, 242, 254, 0.15)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0, 242, 254, 0.06)"; }}
                    >
                      <Mail size={18} style={{ color: "var(--color-cyan)" }} />
                    </a>
                    <div>
                      <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Email Address</span>
                      <a href="mailto:palanubhuti2707@gmail.com" style={{ fontSize: "0.95rem", color: "#fff", fontWeight: 500 }} className="hover-glow">palanubhuti2707@gmail.com</a>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <a
                      href="https://www.linkedin.com/in/anubhuti-pal-117886232"
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        width: "40px", height: "40px", borderRadius: "50%",
                        background: "rgba(127, 0, 255, 0.06)", display: "flex",
                        alignItems: "center", justifyContent: "center", transition: "all 0.3s"
                      }}
                      className="hover-glow"
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(127, 0, 255, 0.15)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(127, 0, 255, 0.06)"; }}
                    >
                      <Linkedin size={18} style={{ color: "var(--color-purple)" }} />
                    </a>
                    <div>
                      <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>LinkedIn</span>
                      <a href="https://www.linkedin.com/in/anubhuti-pal-117886232" target="_blank" rel="noreferrer" style={{ fontSize: "0.95rem", color: "#fff", fontWeight: 500 }} className="hover-glow">anubhuti-pal-117886232</a>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <a
                      href="https://github.com/Anbhuti"
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        width: "40px", height: "40px", borderRadius: "50%",
                        background: "rgba(0, 242, 254, 0.06)", display: "flex",
                        alignItems: "center", justifyContent: "center", transition: "all 0.3s"
                      }}
                      className="hover-glow"
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0, 242, 254, 0.15)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0, 242, 254, 0.06)"; }}
                    >
                      <Github size={18} style={{ color: "var(--color-cyan)" }} />
                    </a>
                    <div>
                      <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>GitHub</span>
                      <a href="https://github.com/Anbhuti" target="_blank" rel="noreferrer" style={{ fontSize: "0.95rem", color: "#fff", fontWeight: 500 }} className="hover-glow">github.com/Anbhuti</a>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <a
                      href="tel:+919569642618"
                      style={{
                        width: "40px", height: "40px", borderRadius: "50%",
                        background: "rgba(0, 242, 254, 0.06)", display: "flex",
                        alignItems: "center", justifyContent: "center", transition: "all 0.3s"
                      }}
                      className="hover-glow"
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0, 242, 254, 0.15)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0, 242, 254, 0.06)"; }}
                    >
                      <Phone size={18} style={{ color: "var(--color-cyan)" }} />
                    </a>
                    <div>
                      <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Phone</span>
                      <a href="tel:+919569642618" style={{ fontSize: "0.95rem", color: "#fff", fontWeight: 500 }} className="hover-glow">+91 9569642618</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Styled Interactive Contact Form */}
              <div className="glass-panel" style={{ padding: "32px", textAlign: "left" }}>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    if (isSubmitting) return;
                    const form = e.currentTarget;
                    const formData = new FormData(form);
                    const name = (formData.get("name") || "").toString().trim();
                    const email = (formData.get("email") || "").toString().trim();
                    const message = (formData.get("message") || "").toString().trim();
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!name || !email || !message) {
                      setFormStatus({ type: "error", message: "Please complete all fields before sending." });
                      return;
                    }
                    if (!emailRegex.test(email)) {
                      setFormStatus({ type: "error", message: "Please enter a valid email address." });
                      return;
                    }
                    setIsSubmitting(true);
                    setFormStatus({ type: "", message: "" });
                    try {
                      const response = await fetch("https://formsubmit.co/ajax/palanubhuti2707@gmail.com", {
                        method: "POST",
                        headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          name,
                          email,
                          message,
                          _subject: "New message from your website",
                          _captcha: "false",
                        }),
                      });
                      const result = await response.json();
                      if (!response.ok || result.success === false) {
                        throw new Error(result.message || "Unable to send message.");
                      }
                      setFormStatus({ type: "success", message: "Thank you for your message. I will get back to you soon." });
                      form.reset();
                    } catch (error) {
                      setFormStatus({ type: "error", message: "Message could not be sent. Please try again later." });
                    } finally {
                      setIsSubmitting(false);
                    }
                  }} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px", fontWeight: 600 }}>Your Name</label>
                    <input
                      name="name"
                      type="text" required placeholder="John Doe"
                      style={{
                        width: "100%", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", borderRadius: "8px",
                        padding: "10px 14px", color: "#fff", outline: "none", transition: "border-color 0.3s"
                      }}
                      onFocus={(e) => e.target.style.borderColor = "var(--color-cyan)"}
                      onBlur={(e) => e.target.style.borderColor = "var(--border-color)"}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px", fontWeight: 600 }}>Your Email</label>
                    <input
                      name="email"
                      type="email" required placeholder="name@company.com"
                      style={{
                        width: "100%", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", borderRadius: "8px",
                        padding: "10px 14px", color: "#fff", outline: "none", transition: "border-color 0.3s"
                      }}
                      onFocus={(e) => e.target.style.borderColor = "var(--color-cyan)"}
                      onBlur={(e) => e.target.style.borderColor = "var(--border-color)"}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px", fontWeight: 600 }}>Your Message</label>
                    <textarea
                      name="message"
                      required rows="4" placeholder="Hi Anubhuti, I would love to talk about..."
                      style={{
                        width: "100%", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", borderRadius: "8px",
                        padding: "10px 14px", color: "#fff", outline: "none", transition: "border-color 0.3s", resize: "none"
                      }}
                      onFocus={(e) => e.target.style.borderColor = "var(--color-cyan)"}
                      onBlur={(e) => e.target.style.borderColor = "var(--border-color)"}
                    />
                  </div>
                  {formStatus.message && (
                    <div style={{ color: formStatus.type === "success" ? "#7CFFD4" : "#F87171", fontSize: "0.95rem", fontWeight: 600 }}>
                      {formStatus.message}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      background: "var(--grad-primary)", border: "none", color: "#fff",
                      borderRadius: "8px", padding: "12px", fontWeight: 700,
                      cursor: isSubmitting ? "not-allowed" : "pointer", transition: "transform 0.2s", textAlign: "center",
                      opacity: isSubmitting ? 0.75 : 1
                    }}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ borderTop: "1px solid var(--border-color)", padding: "40px 24px", color: "var(--text-muted)", fontSize: "0.85rem", background: "rgba(6, 8, 19, 0.9)" }}>
          <div className="container-max" style={{ display: "flex", flexDirection: "column", gap: "24px", alignItems: "center", textAlign: "center" }}>
            <div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>Anubhuti Pal</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Data Analyst | Data Science & AI</p>
            </div>

            <p style={{ fontStyle: "italic", color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto", fontSize: "0.9rem" }}>
              &ldquo;Turning Data Into Actionable Insights Through Analytics, Visualization, and Machine Learning.&rdquo;
            </p>

            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
              <a href="https://github.com/Anbhuti" target="_blank" rel="noreferrer" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.85rem", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-cyan)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>GitHub Link</a>
              <a href="https://www.linkedin.com/in/anubhuti-pal-117886232" target="_blank" rel="noreferrer" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.85rem", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-cyan)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>LinkedIn Link</a>
              <a href="mailto:palanubhuti2707@gmail.com" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.85rem", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-cyan)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>Email Link</a>
            </div>

            <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.05)", width: "100%", paddingTop: "20px", fontSize: "0.8rem", color: "var(--text-muted)" }}>
              © 2026 Anubhuti Pal. All Rights Reserved.
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}

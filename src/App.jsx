import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Code2,
  Megaphone,
  Palette,
  Search,
  Clapperboard,
  Bot,
  Layers3,
  MessageCircle,
  Sparkles,
  Globe2,
  Zap,
  Target,
  Send,
  ChevronDown,
  MousePointer2,
  TrendingUp,
  Workflow,
  CheckCircle2,
  ShieldCheck,
  Activity,
  Volume2,
  VolumeX,
  Star,
  Users
} from "lucide-react";
import "./App.css";

const WHATSAPP = "917067492239";
const whatsappMessage =
  "Hello Hashtag! I'm interested in your digital services. I'd like to discuss my project.";

// Sound Effects Controller using Native Web Audio API
class SoundFx {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playHover() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(420, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(840, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {}
  }

  playClick() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(580, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(260, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {}
  }
}

const sfx = new SoundFx();

const services = [
  {
    number: "01",
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Build your audience, increase engagement and turn attention into business growth.",
    tags: ["Social Media", "Campaigns", "Strategy"],
    color: "lavender",
  },
  {
    number: "02",
    icon: Code2,
    title: "Web Development",
    description: "High-performing websites and digital experiences designed to convert visitors.",
    tags: ["Business Websites", "E-commerce", "Web Apps"],
    color: "aqua",
  },
  {
    number: "03",
    icon: Palette,
    title: "UI/UX & Design",
    description: "Beautiful, intuitive interfaces that make every interaction feel effortless.",
    tags: ["UI/UX", "Graphics", "Design Systems"],
    color: "peach",
  },
  {
    number: "04",
    icon: Search,
    title: "SEO & Marketing",
    description: "Get discovered by the right audience with search-focused growth strategies.",
    tags: ["SEO", "SEM", "Analytics"],
    color: "lavender",
  },
  {
    number: "05",
    icon: Layers3,
    title: "Branding & Content",
    description: "Create a memorable brand identity with content that tells your story.",
    tags: ["Brand Identity", "Content", "Copywriting"],
    color: "aqua",
  },
  {
    number: "06",
    icon: Clapperboard,
    title: "Video & Motion",
    description: "Bring your ideas to life with engaging videos and motion graphics.",
    tags: ["Video Editing", "Reels", "Motion"],
    color: "peach",
  },
  {
    number: "07",
    icon: Bot,
    title: "AI & Automation",
    description: "Make everyday business operations smarter with practical AI solutions.",
    tags: ["AI Solutions", "Automation", "Chatbots"],
    color: "lavender",
  },
  {
    number: "08",
    icon: Workflow,
    title: "Custom Technology",
    description: "Purpose-built software and technology solutions for your business needs.",
    tags: ["Software", "Integrations", "Technology"],
    color: "aqua",
  },
];

const process = [
  ["01", "Discover", "We understand your business, audience and goals."],
  ["02", "Strategize", "We create a clear roadmap built around your objectives."],
  ["03", "Create", "Our team turns ideas into thoughtful digital experiences."],
  ["04", "Grow", "We measure, improve and help your business move forward."],
];

const projects = [
  {
    number: "01",
    type: "E-COMMERCE EXPERIENCE",
    title: "The Modern Store",
    description: "A concept for a clean, conversion-focused online shopping experience.",
    visual: "store",
    label: "E-commerce",
  },
  {
    number: "02",
    type: "DIGITAL BRAND EXPERIENCE",
    title: "Beyond Ordinary",
    description: "A visual direction for a bold and memorable digital-first brand.",
    visual: "brand",
    label: "Branding",
  },
  {
    number: "03",
    type: "TECHNOLOGY & AI",
    title: "Future In Motion",
    description: "A concept exploring intelligent tools and connected digital workflows.",
    visual: "tech",
    label: "Technology",
  },
];

function BackgroundParticles() {
  const particles = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    left: `${(i * 37 + 11) % 100}%`,
    top: `${(i * 53 + 7) % 100}%`,
    size: `${2 + (i % 4) * 1.5}px`,
    delay: `${(i % 10) * -1.5}s`,
    duration: `${13 + (i % 9) * 2}s`,
  }));

  return (
    <div className="ambient-background" aria-hidden="true">
      <div className="ambient-glow glow-one" />
      <div className="ambient-glow glow-two" />
      <div className="ambient-glow glow-three" />
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="ambient-particle"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
    </div>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ number, children }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <span className="label-line" />
      <span>{children}</span>
    </div>
  );
}

function Navbar({ soundMuted, toggleSound }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    ["About", "#about"],
    ["Services", "#services"],
    ["Our Work", "#work"],
    ["Process", "#process"],
    ["Contact", "#contact"],
  ];

  return (
    <header className="site-header">
      <nav className="navbar container">
        <a 
          href="#home" 
          className="brand-logo" 
          aria-label="Hashtag home"
          onMouseEnter={() => sfx.playHover()}
          onClick={() => sfx.playClick()}
        >
          <span className="brand-symbol">H<span>#</span></span>
          <span className="brand-name">HASHTAG<span>.</span></span>
        </a>

        <div className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          {links.map(([name, href]) => (
            <a 
              key={name} 
              href={href} 
              onMouseEnter={() => sfx.playHover()}
              onClick={() => {
                sfx.playClick();
                setMenuOpen(false);
              }}
            >
              {name}
            </a>
          ))}
          <a
            className="mobile-nav-cta"
            href="#contact"
            onClick={() => {
              sfx.playClick();
              setMenuOpen(false);
            }}
          >
            Let's Talk <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="nav-controls">
          <button 
            className="sound-toggle-btn" 
            onClick={toggleSound}
            aria-label="Toggle Sound Effects"
            title={soundMuted ? "Unmute Sound Effects" : "Mute Sound Effects"}
          >
            {soundMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            <span className="sound-toggle-tooltip">{soundMuted ? "Sound Off" : "Sound On"}</span>
          </button>

          <a 
            className="nav-cta" 
            href="#contact"
            onMouseEnter={() => sfx.playHover()}
            onClick={() => sfx.playClick()}
          >
            Let's Talk <ArrowUpRight size={17} />
          </a>

          <button
            className="menu-toggle"
            onClick={() => {
              sfx.playClick();
              setMenuOpen(!menuOpen);
            }}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="container hero-grid">
        <div className="hero-copy">
          <motion.div
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="status-dot" />
            CREATIVE DIGITAL AGENCY
            <span className="eyebrow-divider">/</span>
            INDIA
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            Your vision.
            <br />
            Our <span className="gradient-text">innovation.</span>
            <br />
            <span className="outline-text">Limitless growth.</span>
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            We combine high-conversion design, modern web engineering, and
            targeted marketing automation to help ambitious businesses scale faster.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <a 
              href="#contact" 
              className="button button-primary"
              onMouseEnter={() => sfx.playHover()}
              onClick={() => sfx.playClick()}
            >
              Start a Project <ArrowUpRight size={18} />
            </a>
            <a 
              href="#work" 
              className="button button-ghost"
              onMouseEnter={() => sfx.playHover()}
              onClick={() => sfx.playClick()}
            >
              Explore Our Work <ArrowRight size={17} />
            </a>
          </motion.div>

          <motion.div
            className="hero-trust"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="trust-avatars">
              <span>H</span><span>#</span><span>+</span>
            </div>
            <div>
              <p>Trusted by forward-thinking founders & creators.</p>
              <small className="trust-subtext">Verified delivery • Dedicated engineering</small>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-art"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
        >
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-orbit orbit-three" />

          <div 
            className="hero-glass-card"
            onMouseEnter={() => sfx.playHover()}
          >
            <div className="hero-card-top">
              <span>HASHTAG / STUDIO</span>
              <Sparkles size={18} />
            </div>
            <div className="hero-emblem">
              <span>H</span><span className="emblem-hash">#</span>
            </div>
            <div className="hero-card-bottom">
              <div>
                <small>DESIGN • AUTOMATE</small>
                <strong>DOMINATE DIGITAL.</strong>
              </div>
              <span className="hero-card-arrow"><ArrowUpRight /></span>
            </div>
          </div>

          <div className="floating-chip chip-top">
            <Zap size={16} /> Velocity Driven
          </div>
          <div className="floating-chip chip-bottom">
            <Target size={16} /> High ROI Strategy
          </div>
        </motion.div>
      </div>

      <div className="hero-bottom container">
        <span>SCROLL TO EXPLORE</span>
        <div className="scroll-line"><span /></div>
        <span>01 — 05</span>
      </div>
    </section>
  );
}

function Marquee() {
  const words = [
    "DATA-DRIVEN MARKETING",
    "CUSTOM WEB ARCHITECTURE",
    "AI SOLUTIONS & AUTOMATION",
    "BRAND ACCELERATION",
    "MOTION & 3D STORYTELLING",
  ];

  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {[...words, ...words].map((word, index) => (
          <span key={index}>
            {word} <i>✳</i>
          </span>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section className="about-section section-padding" id="about">
      <div className="container about-grid">
        <Reveal>
          <SectionLabel number="01">WHO WE ARE</SectionLabel>
          <h2 className="section-heading">
            We don't just
            <br />
            follow the <span className="gradient-text">future.</span>
            <br />
            We build it.
          </h2>
        </Reveal>

        <Reveal delay={0.15} className="about-content">
          <p className="about-lead">
            HASHTAG is a creative digital and technology agency built
            around one simple belief — great ideas deserve great execution.
          </p>
          <p className="muted-text">
            From your first brand impression to your next digital product,
            we bring design, marketing and technology together to create
            experiences that move your business forward.
          </p>
          <div className="live-status-pill">
            <span className="pulse-dot-green" />
            <span>Currently taking on projects for this quarter</span>
          </div>
          <a 
            className="text-link" 
            href="#services"
            onMouseEnter={() => sfx.playHover()}
            onClick={() => sfx.playClick()}
          >
            Discover what we do <ArrowUpRight size={18} />
          </a>
        </Reveal>
      </div>

      <div className="container about-highlight">
        <div className="highlight-card" onMouseEnter={() => sfx.playHover()}>
          <span className="highlight-icon"><Globe2 /></span>
          <div><strong>Think globally</strong><small>Scalable systems without boundaries</small></div>
        </div>
        <div className="highlight-card" onMouseEnter={() => sfx.playHover()}>
          <span className="highlight-icon"><MousePointer2 /></span>
          <div><strong>Design intentionally</strong><small>Conversion-driven aesthetics</small></div>
        </div>
        <div className="highlight-card" onMouseEnter={() => sfx.playHover()}>
          <span className="highlight-icon"><TrendingUp /></span>
          <div><strong>Build for growth</strong><small>Technology geared toward revenue</small></div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="services-section section-padding" id="services">
      <div className="container">
        <Reveal className="section-topline">
          <div>
            <SectionLabel number="02">WHAT WE DO</SectionLabel>
            <h2 className="section-heading">
              Everything your brand needs
              <br />
              to <span className="gradient-text">move forward.</span>
            </h2>
          </div>
          <p className="section-side-copy">
            One creative partner. Multiple capabilities.
            Connected by one goal — your sustainable growth.
          </p>
        </Reveal>

        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.number} delay={(index % 4) * 0.07}>
                <article 
                  className={`service-card ${service.color}`}
                  onMouseEnter={() => sfx.playHover()}
                >
                  <div className="service-card-top">
                    <span>{service.number} / 08</span>
                    <span className="service-icon"><Icon size={23} /></span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-tags">
                    {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <a 
                    href="#contact" 
                    className="service-arrow" 
                    aria-label={`Enquire about ${service.title}`}
                    onClick={() => sfx.playClick()}
                  >
                    <ArrowUpRight size={20} />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
/* ========================================================
   WORK / PORTFOLIO SECTION (CLEAN SINGLE LINE GRAPH)
   ======================================================== */
function Work() {
  return (
    <section className="work-section section-padding" id="work">
      <div className="container">
        <Reveal className="section-topline">
          <div>
            <SectionLabel number="03">SELECTED DIRECTIONS</SectionLabel>
            <h2 className="section-heading">
              Ideas made
              <br />
              <span className="gradient-text">to stand out.</span>
            </h2>
          </div>
          <p className="section-side-copy">
            A glimpse into the digital experiences, measurable scaling, and strategic
            architectures we develop.
          </p>
        </Reveal>

        {/* --- MINIMAL SINGLE-LINE GRAPH (NO BACKGROUND & NO REVIEWS) --- */}
        <Reveal delay={0.1}>
          <div className="work-graph-box-minimal" onMouseEnter={() => sfx.playHover()}>
            <div className="work-graph-header">
              <div className="graph-live-indicator">
                <span className="hud-pulse-ring" />
                <span className="hud-term-code">REALTIME GROWTH TRAJECTORY</span>
              </div>
              <div className="graph-gain-pill futuristic-pill">
                <TrendingUp size={15} />
                <span>+284% GROWTH</span>
              </div>
            </div>

            {/* Minimal SVG Canvas with Single Glowing Line */}
            <div className="work-svg-wrapper-minimal">
              <svg viewBox="0 0 800 130" className="work-svg-chart" preserveAspectRatio="none">
                <defs>
                  <filter id="singleNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  <linearGradient id="singleLineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7887D9" />
                    <stop offset="60%" stopColor="#C9F7F4" />
                    <stop offset="100%" stopColor="#FFBD86" />
                  </linearGradient>
                </defs>

                {/* Single Animated Neon Curve */}
                <motion.path
                  d="M 10 115 Q 160 85, 260 95 T 460 55 T 640 40 T 790 15"
                  fill="none"
                  stroke="url(#singleLineGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="url(#singleNeonGlow)"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease: "easeInOut" }}
                />

                {/* End Pulsing Neon Node */}
                <motion.circle
                  cx="790"
                  cy="15"
                  r="6"
                  fill="#FFBD86"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: [1, 1.4, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.8 }}
                />
              </svg>

              {/* Minimal Timeline */}
              <div className="work-graph-timeline hud-timeline">
                <span>Start</span>
                <span>Strategy</span>
                <span>Execution</span>
                <span className="peak-tag">Peak Performance</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Projects Grid */}
        <div className="projects-grid">
          {projects.map((project, index) => (
            <Reveal key={project.number} delay={index * 0.12}>
              <article 
                className="project-card"
                onMouseEnter={() => sfx.playHover()}
                onClick={() => sfx.playClick()}
              >
                <div className={`project-visual visual-${project.visual}`}>
                  {project.visual === "store" && (
                    <div className="mock-store">
                      <div className="mock-browser"><span /><span /><span /></div>
                      <div className="mock-store-title">FORM<span>.</span></div>
                      <div className="mock-store-sub">LESS, BUT BETTER.</div>
                      <div className="mock-products">
                        <div /><div /><div />
                      </div>
                    </div>
                  )}
                  {project.visual === "brand" && (
                    <div className="mock-brand">
                      <span className="brand-orb" />
                      <strong>BEYOND<br />ORDINARY<span>.</span></strong>
                      <small>MAKE YOUR MARK.</small>
                    </div>
                  )}
                  {project.visual === "tech" && (
                    <div className="mock-tech">
                      <div className="tech-circle"><Bot size={54} /></div>
                      <span>INTELLIGENCE</span>
                      <strong>FUTURE<br />IN MOTION.</strong>
                    </div>
                  )}
                  <span className="project-visual-label">{project.label}</span>
                </div>
                <div className="project-info">
                  <div>
                    <span className="project-type">{project.number} / {project.type}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                  <ArrowUpRight className="project-arrow" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="portfolio-note">
          These are illustrative design directions, not client projects or completed case studies.
        </p>
      </div>
    </section>
  );
}
function Process() {
  return (
    <section className="process-section section-padding" id="process">
      <div className="container">
        <Reveal>
          <SectionLabel number="04">HOW WE WORK</SectionLabel>
          <h2 className="section-heading">
            Simple process.
            <br />
            <span className="gradient-text">Meaningful results.</span>
          </h2>
        </Reveal>

        <div className="process-grid">
          {process.map(([number, title, description], index) => (
            <Reveal key={number} delay={index * 0.1}>
              <div 
                className="process-item"
                onMouseEnter={() => sfx.playHover()}
              >
                <div className="process-number">{number}</div>
                <div className="process-line" />
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <div className="cta-decoration cta-decoration-one" />
        <div className="cta-decoration cta-decoration-two" />
        <Reveal>
          <span className="cta-kicker"><Sparkles size={15} /> HAVE AN IDEA?</span>
          <h2>
            Let's make
            <br />
            something <span>matter.</span>
          </h2>
          <p>Your next big move starts with a single conversation.</p>
          <a 
            href="#contact" 
            className="button button-light"
            onMouseEnter={() => sfx.playHover()}
            onClick={() => sfx.playClick()}
          >
            Let's Build Together <ArrowUpRight size={18} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "Website & E-commerce Development",
    message: "",
  });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sfx.playClick();

    const message = [
      "Hello Hashtag! I would like to discuss a project.",
      "",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Service: ${form.service}`,
      `Project details: ${form.message}`,
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section className="contact-section section-padding" id="contact">
      <div className="container contact-grid">
        <Reveal>
          <SectionLabel number="05">LET'S CONNECT</SectionLabel>
          <h2 className="section-heading">
            Have a project
            <br />
            in <span className="gradient-text">mind?</span>
          </h2>
          <p className="contact-description">
            Tell us a little about your idea. Let's explore how we can
            bring it to life with precision.
          </p>

          <div className="contact-direct">
            <span className="contact-direct-icon"><MessageCircle /></span>
            <div>
              <small>DIRECT INQUIRY</small>
              <a 
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(whatsappMessage)}`} 
                target="_blank" 
                rel="noreferrer"
                onMouseEnter={() => sfx.playHover()}
                onClick={() => sfx.playClick()}
              >
                Chat with us on WhatsApp <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-heading">
              <span>PROJECT ENQUIRY</span>
              <Sparkles size={18} />
            </div>

            <label>
              Your name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </label>

            <label>
              Email address
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </label>

            <label>
              What do you need?
              <div className="select-wrap">
                <select name="service" value={form.service} onChange={handleChange}>
                  {services.map((service) => (
                    <option key={service.number} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} />
              </div>
            </label>

            <label>
              Tell us about your project
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="A little about your idea, goals and timeline..."
                rows="4"
                required
              />
            </label>

            <button 
              className="button button-primary form-submit" 
              type="submit"
              onMouseEnter={() => sfx.playHover()}
            >
              Send Enquiry <Send size={17} />
            </button>
            <small className="form-note">
              This form opens WhatsApp with your enquiry details. It does not store submissions.
            </small>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a 
              href="#home" 
              className="brand-logo"
              onMouseEnter={() => sfx.playHover()}
              onClick={() => sfx.playClick()}
            >
              <span className="brand-symbol">H<span>#</span></span>
              <span className="brand-name">HASHTAG<span>.</span></span>
            </a>
            <p>Your Growth, Our Technology.</p>
            <span className="footer-note">
              Creative thinking. Smart technology. Meaningful growth.
            </span>
          </div>

          <div className="footer-links">
            <div>
              <span>EXPLORE</span>
              <a href="#about" onMouseEnter={() => sfx.playHover()}>About us</a>
              <a href="#services" onMouseEnter={() => sfx.playHover()}>Services</a>
              <a href="#work" onMouseEnter={() => sfx.playHover()}>Our work</a>
              <a href="#process" onMouseEnter={() => sfx.playHover()}>Our process</a>
            </div>
            <div>
              <span>GET IN TOUCH</span>
              <a href="#contact" onMouseEnter={() => sfx.playHover()}>Start a project</a>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" onMouseEnter={() => sfx.playHover()}>WhatsApp</a>
              <a href="mailto:hello@hashtag.in" onMouseEnter={() => sfx.playHover()}>Email us</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} HASHTAG. All rights reserved.</span>
          <span>MADE WITH INTENTION <span className="footer-heart">✳</span></span>
          <a href="#home" onMouseEnter={() => sfx.playHover()}>BACK TO TOP ↑</a>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(whatsappMessage)}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with HASHTAG on WhatsApp"
      onMouseEnter={() => sfx.playHover()}
      onClick={() => sfx.playClick()}
    >
      <MessageCircle size={23} />
      <span>Let's talk</span>
    </a>
  );
}

export default function App() {
  const [soundMuted, setSoundMuted] = useState(false);

  const toggleSound = () => {
    sfx.enabled = !sfx.enabled;
    setSoundMuted(!sfx.enabled);
    if (sfx.enabled) sfx.playClick();
  };

  return (
    <>
      <BackgroundParticles />
      <Navbar soundMuted={soundMuted} toggleSound={toggleSound} />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Work />
        <Process />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
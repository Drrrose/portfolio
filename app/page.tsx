"use client";

import { motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import type { MotionValue, Variants } from "framer-motion";
import { SVGProps, useEffect, useMemo, useRef, useState } from "react";

const BASE_UNIT = 8;
const HALF_UNIT = BASE_UNIT / 2;
const SECTION_OFFSET = BASE_UNIT * 15;

const ICON_SIZE = BASE_UNIT * 3;

const EASING = {
  spring: { type: "spring" as const, stiffness: 120, damping: 20, mass: 1.2 },
  snap: { type: "spring" as const, stiffness: 400, damping: 28 },
  drift: { duration: 2.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  reveal: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

const SECTION_VARIANTS: Variants = {
  hidden: { opacity: 0, y: BASE_UNIT * 3 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...EASING.reveal,
      staggerChildren: 0.08,
    },
  },
};

const CHILD_VARIANTS: Variants = {
  hidden: { opacity: 0, y: BASE_UNIT * 3 },
  visible: {
    opacity: 1,
    y: 0,
    transition: EASING.reveal,
  },
};

function delayVariants(delay: number): Variants {
  return {
    hidden: { opacity: 0, y: BASE_UNIT * 3 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ...EASING.reveal, delay },
    },
  };
}

const LETTER_VARIANTS: Variants = {
  hidden: { opacity: 0, y: BASE_UNIT * 2 },
  visible: {
    opacity: 1,
    y: 0,
    transition: EASING.spring,
  },
};

const NAME_VARIANTS: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.18,
    },
  },
};

const PROJECT_CARD_VARIANTS: Variants = {
  rest: {
    y: 0,
    boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
    transition: EASING.spring,
  },
  hover: {
    y: -HALF_UNIT,
    boxShadow: "0 16px 40px rgba(0, 0, 0, 0.32)",
    transition: EASING.spring,
  },
};

const PROJECT_ACCENT_VARIANTS: Variants = {
  rest: {
    scaleY: 0,
    transition: EASING.reveal,
  },
  hover: {
    scaleY: 1,
    transition: EASING.reveal,
  },
};

const BADGE_VARIANTS: Variants = {
  rest: {
    scale: 1,
    textShadow: "0 0 0 rgba(79, 126, 255, 0)",
    transition: EASING.snap,
  },
  hover: {
    scale: 1.04,
    textShadow: "0 0 12px rgba(79, 126, 255, 0.35)",
    transition: EASING.snap,
  },
};

const CTA_GROUP_VARIANTS: Variants = {
  rest: {},
  hover: {},
};

const CTA_FILL_VARIANTS: Variants = {
  rest: {
    clipPath: "inset(0 100% 0 0)",
    transition: EASING.reveal,
  },
  hover: {
    clipPath: "inset(0 0% 0 0)",
    transition: EASING.reveal,
  },
};

const CONTACT_LINK_VARIANTS: Variants = {
  rest: {
    x: 0,
    transition: EASING.snap,
  },
  hover: {
    x: HALF_UNIT,
    transition: EASING.snap,
  },
};

const GRAPH_CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: EASING.drift,
  },
};

const RAIL_LABELS = [
  { id: "hero", label: "Hero" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
  { id: "systems", label: "Systems" },
  { id: "contact", label: "Contact" },
];

const signalTags = [
  "Laravel APIs",
  "Database design",
  "Cloud integrations",
  "Realtime features",
];

const experiences = [
  {
    company: "DotLaa Solution",
    role: "Backend Developer",
    period: "12/2025 - Present",
    description:
      "Architected Laravel backends for hospitality, Muslim marriage, and ride-hailing products. Delivered Agoda and eZee booking integrations, a WhatsApp chatbot, real-time notifications with Firebase, and scalable role-based systems.",
  },
  {
    company: "Remah Digital",
    role: "Backend Developer",
    period: "06/2024 - 11/2025",
    description:
      "Developed scalable web applications using Laravel. Engineered RESTful APIs, established performance metrics, and collaborated on DB design. Built secure, modular CMS for medical clinics (HIPAA compliant), E-commerce platform with RTL support, and Translation Workflow platform.",
    url: "https://remah.tech/",
  },
  {
    company: "Active4Web",
    role: "Backend Intern",
    period: "01/2024 - 03/2024",
    description:
      "Assisted in backend modules using Laravel/MySQL. Debugged and refactored legacy code. Gained RESTful API experience.",
    url: "https://go.active4web.com/en/",
  },
];

const stackGroups = [
  {
    name: "Backend",
    skills: ["PHP", "Laravel", "Node.js", "Python", "REST APIs"],
    Icon: BackendIcon,
  },
  {
    name: "Database",
    skills: ["MySQL", "MongoDB", "Redis", "Schema Design"],
    Icon: DatabaseIcon,
  },
  {
    name: "Cloud",
    skills: ["AWS S3", "AWS SES", "Docker", "CI/CD"],
    Icon: CloudIcon,
  },
  {
    name: "Realtime",
    skills: ["WebSockets", "Pusher", "Laravel Reverb", "Firebase", "Messaging"],
    Icon: RealtimeIcon,
  },
  {
    name: "Frontend Integration",
    skills: ["Vue.js", "Tailwind CSS", "Alpine.js", "jQuery"],
    Icon: FrontendIcon,
  },
];

const projects = [
  {
    name: "Primotel Booking Platform",
    tech: ["Laravel", "eZee", "Agoda", "WhatsApp Chatbot"],
    badge: "1000+ bookings",
    description:
      "Hotel booking platform with live property availability, eZee and Agoda integrations, and a WhatsApp chatbot that helps guests reserve rooms and automate support flows.",
    url: "https://www.primotel.com/",
  },
  {
    name: "MU7AGABA Muslim Marriage App",
    tech: ["Laravel", "Firebase", "Push Notifications", "Messaging"],
    badge: "10k+ downloads",
    description:
      "Secure Muslim marriage backend powering profile moderation, user matching, direct messaging, and real-time push notifications for the MU7AGABA mobile application.",
    url: "https://play.google.com/store/apps/details?id=com.yamentec.mu7gaba",
  },
  {
    name: "Ride-Hailing Platform",
    tech: ["Laravel", "Firebase", "Geolocation", "Dynamic Pricing"],
    description:
      "Uber-like backend infrastructure for driver and rider flows, live location tracking, dispatch logic, and demand-based pricing. Built for production use but not publicly linked.",
  },
  {
    name: "Medical Clinics CMS",
    tech: ["Laravel", "MySQL", "AWS S3", "Twilio", "AWS SES"],
    description:
      "A secure, multi-lingual, and modular CMS for medical clinics focusing on HIPAA compliance. Features encrypted media storage and secure patient data controls.",
    url: "https://nephrocaremd.org/",
  },
  {
    name: "E-commerce Platform",
    tech: ["Laravel", "MySQL", "Alpine.js", "jQuery"],
    description:
      "Full-stack e-commerce platform with comprehensive product management, order processing, and dynamic promotions. Features full multi-language and RTL support.",
    url: "https://unipartykw.com/",
  },
  {
    name: "SaaS Translation Platform",
    tech: ["Laravel", "PayPal", "Tap", "Real-time"],
    description:
      "Platform to manage translation workflows, including order creation, dynamic pricing, payment processing, and translator assignment.",
    url: "https://wafabridge.com/",
  },
];

const contactLinks = [
  {
    label: "Email",
    value: "mostafaali.php@gmail.com",
    href: "mailto:mostafaali.php@gmail.com",
    Icon: MailIcon,
  },
  {
    label: "WhatsApp",
    value: "+201011388446",
    href: "https://wa.me/201011388446",
    Icon: WhatsAppIcon,
  },
  {
    label: "GitHub",
    value: "https://github.com/drrrose",
    href: "https://github.com/drrrose",
    Icon: GitHubIcon,
  },
  {
    label: "LinkedIn",
    value: "https://www.linkedin.com/in/mostafa-ali-405449282/",
    href: "https://www.linkedin.com/in/mostafa-ali-405449282/",
    Icon: LinkedInIcon,
  },
];



export default function Home() {
  const prefersReduced = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const graphDrift = useTransform(scrollY, [0, BASE_UNIT * 100], [0, BASE_UNIT * 30]);
  const progressScale = useSpring(scrollYProgress, EASING.spring);

  const mouseX = useMotionValue(-999);
  const mouseY = useMotionValue(-999);
  const spotlightBg = useTransform([mouseX, mouseY], ([x, y]) =>
    `radial-gradient(600px at ${x}px ${y}px, rgba(79,126,255,0.1), transparent 80%)`
  );

  useEffect(() => {
    if (prefersReduced) return;
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [prefersReduced, mouseX, mouseY]);

  return (
    <main className="relative overflow-hidden bg-bg text-text-primary">
      {!prefersReduced && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-0"
          style={{ background: spotlightBg }}
        />
      )}
      <LeftRail progressScale={progressScale} />
      <HeroSection graphY={prefersReduced ? 0 : graphDrift} prefersReduced={Boolean(prefersReduced)} />
      <ExperienceSection prefersReduced={Boolean(prefersReduced)} />
      <StackSection prefersReduced={Boolean(prefersReduced)} />
      <ProjectsSection prefersReduced={Boolean(prefersReduced)} />
      <ContactSection prefersReduced={Boolean(prefersReduced)} />
      <Footer />
    </main>
  );
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActive(visible.target.id);
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.18, 0.32, 0.48, 0.64],
      },
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function LeftRail({ progressScale }: { progressScale: MotionValue<number> }) {
  const ids = useMemo(() => RAIL_LABELS.map((section) => section.id), []);
  const active = useActiveSection(ids);

  return (
    <aside
      aria-label="Scroll progress"
      className="fixed left-8 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
    >
      <div className="flex items-center gap-5">
        <div className="relative h-[min(64vh,520px)] w-px overflow-hidden bg-border">
          <motion.div
            className="absolute inset-x-0 top-0 h-full origin-top bg-accent"
            style={{ scaleY: progressScale }}
          />
        </div>
        <nav className="flex flex-col gap-5 font-mono text-[11px] uppercase leading-none text-text-dim">
          {RAIL_LABELS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`transition-colors duration-300 [transition-timing-function:var(--ease-reveal)] ${
                active === section.id ? "text-accent" : "hover:text-text-muted"
              }`}
            >
              {section.label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

function MotionSection({
  id,
  className,
  children,
  prefersReduced,
}: {
  id: string;
  className: string;
  children: React.ReactNode;
  prefersReduced: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: `-${SECTION_OFFSET}px 0px` });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      variants={SECTION_VARIANTS}
      initial={prefersReduced ? "visible" : "hidden"}
      animate={prefersReduced || inView ? "visible" : "hidden"}
    >
      {children}
    </motion.section>
  );
}

function SectionHeader({
  eyebrow,
  headline,
  description,
}: {
  eyebrow: string;
  headline: string;
  description: string;
}) {
  return (
    <motion.div variants={CHILD_VARIANTS} className="max-w-3xl">
      <p className="font-mono text-xs uppercase leading-none text-accent">{eyebrow}</p>
      <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-normal text-text-primary md:text-5xl">
        {headline}
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-7 text-text-muted md:text-lg">
        {description}
      </p>
    </motion.div>
  );
}

function HeroSection({
  graphY,
  prefersReduced,
}: {
  graphY: MotionValue<number> | number;
  prefersReduced: boolean;
}) {
  const name = "Mostafa Ali";

  return (
    <section
      id="hero"
      className="relative mx-auto grid min-h-screen w-full max-w-7xl items-center gap-12 px-6 py-20 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-20"
    >
      <div className="relative z-10 max-w-3xl">
        <motion.p
          className="font-mono text-xs uppercase leading-none text-accent"
          variants={CHILD_VARIANTS}
          initial={prefersReduced ? "visible" : "hidden"}
          animate="visible"
        >
          Backend Developer
        </motion.p>
        <motion.h1
          aria-label={name}
          className="mt-5 flex flex-wrap overflow-hidden bg-[linear-gradient(90deg,var(--text-primary),var(--accent))] bg-clip-text font-display text-6xl font-bold leading-none tracking-normal text-transparent md:text-8xl"
          variants={NAME_VARIANTS}
          initial={prefersReduced ? "visible" : "hidden"}
          animate="visible"
        >
          {name.split("").map((letter, index) => (
            <motion.span
              key={`${letter}-${index}`}
              aria-hidden="true"
              className={letter === " " ? "w-4 md:w-6" : "inline-block"}
              variants={prefersReduced ? undefined : LETTER_VARIANTS}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>
        <motion.div
          className="mt-5 flex flex-wrap items-center gap-3 font-mono text-sm text-text-muted"
          variants={delayVariants(0.1)}
          initial={prefersReduced ? "visible" : "hidden"}
          animate="visible"
        >
          <span>Heliopolis, Cairo</span>
          <span className="text-text-dim">&middot;</span>
          <span className="inline-flex items-center gap-2">
            <span className="status-dot-pulse h-2 w-2 rounded-full bg-[#2CFF97]" />
            Available
          </span>
        </motion.div>
        <motion.p
          className="mt-7 max-w-2xl text-lg leading-8 text-text-muted md:text-xl"
          variants={delayVariants(0.2)}
          initial={prefersReduced ? "visible" : "hidden"}
          animate="visible"
        >
          Detail-oriented Mid-level Backend Developer with two years of professional experience in
          building robust, large-scale web applications using PHP and Laravel. Skilled in database
          design, RESTful APIs, and frontend integration.
        </motion.p>
        <motion.div
          className="mt-7 flex flex-wrap gap-3"
          variants={delayVariants(0.35)}
          initial={prefersReduced ? "visible" : "hidden"}
          animate="visible"
        >
          {signalTags.map((tag) => (
            <SkillBadge key={tag} prefersReduced={prefersReduced}>
              {tag}
            </SkillBadge>
          ))}
        </motion.div>
        <motion.div
          className="mt-10 flex flex-wrap gap-4"
          variants={delayVariants(0.5)}
          initial={prefersReduced ? "visible" : "hidden"}
          animate="visible"
        >
          <CtaButton href="#contact" variant="primary" prefersReduced={prefersReduced}>
            Let&apos;s Talk
          </CtaButton>
          <CtaButton
            href="https://drrrose.github.io/Mostafa-Ali-Cv/"
            variant="ghost"
            prefersReduced={prefersReduced}
          >
            Resume &rarr;
          </CtaButton>
        </motion.div>
      </div>

      <motion.div
        className="relative z-0 h-[420px] opacity-60 md:h-[520px] lg:h-[620px] lg:opacity-100"
        variants={GRAPH_CONTAINER_VARIANTS}
        initial={prefersReduced ? "visible" : "hidden"}
        animate="visible"
        style={{ y: graphY }}
      >
        <HeroCircuitGraph prefersReduced={prefersReduced} />
      </motion.div>
    </section>
  );
}

function HeroCircuitGraph({ prefersReduced }: { prefersReduced: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const W = 620;
    const H = 600;

    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const ACCENT = "#4F7EFF";
    const WARM = "#FF6B35";
    const DIM = "rgba(45,52,85,0.8)";
    const BG = "#080A0F";
    const SURF = "#0E1117";
    const BORDER = "#1C2030";
    const MUTED = "#6B7799";

    const nodes = [
      { id: "ingress", x: 82, y: 90, r: 9, label: "INGRESS", warm: false, gateway: true },
      { id: "auth", x: 212, y: 76, r: 6, label: "AUTH", warm: false, gateway: false },
      { id: "api", x: 330, y: 90, r: 10, label: "API", warm: true, gateway: true },
      { id: "queue", x: 458, y: 78, r: 6, label: "QUEUE", warm: false, gateway: false },
      { id: "booking", x: 140, y: 200, r: 6, label: "BOOKING", warm: false, gateway: false },
      { id: "matching", x: 272, y: 208, r: 6, label: "MATCHING", warm: false, gateway: false },
      { id: "dispatch", x: 382, y: 200, r: 6, label: "DISPATCH", warm: false, gateway: false },
      { id: "notify", x: 512, y: 212, r: 6, label: "NOTIFY", warm: false, gateway: false },
      { id: "media", x: 96, y: 316, r: 6, label: "MEDIA", warm: false, gateway: false },
      { id: "billing", x: 200, y: 332, r: 6, label: "BILLING", warm: false, gateway: false },
      { id: "cms", x: 330, y: 314, r: 6, label: "CMS", warm: false, gateway: false },
      { id: "reporting", x: 458, y: 326, r: 6, label: "REPORT", warm: false, gateway: false },
      { id: "storage", x: 150, y: 444, r: 6, label: "STORAGE", warm: false, gateway: false },
      { id: "cache", x: 322, y: 444, r: 6, label: "CACHE", warm: false, gateway: false },
      { id: "egress", x: 498, y: 444, r: 9, label: "EGRESS", warm: false, gateway: true },
    ];

    const nodeMap: Record<string, typeof nodes[0]> = {};
    nodes.forEach((n) => (nodeMap[n.id] = n));

    const edges = [
      { a: "ingress", b: "auth", active: true },
      { a: "auth", b: "api", active: true },
      { a: "api", b: "queue", active: false },
      { a: "ingress", b: "booking", active: false },
      { a: "auth", b: "matching", active: true },
      { a: "api", b: "dispatch", active: true },
      { a: "queue", b: "notify", active: true },
      { a: "booking", b: "billing", active: true },
      { a: "matching", b: "cms", active: false },
      { a: "dispatch", b: "reporting", active: true },
      { a: "notify", b: "reporting", active: false },
      { a: "media", b: "booking", active: false },
      { a: "media", b: "storage", active: true },
      { a: "billing", b: "cache", active: false },
      { a: "cms", b: "cache", active: true },
      { a: "reporting", b: "egress", active: true },
      { a: "cache", b: "egress", active: false },
    ];

    function cpOf(a: typeof nodes[0], b: typeof nodes[0]) {
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      const dx = b.x - a.x, dy = b.y - a.y;
      const perp = 0.18;
      return { cx: mx - dy * perp, cy: my + dx * perp };
    }

    const activeEdges = edges.filter((e) => e.active);
    const dots = activeEdges.map((e, i) => ({
      edge: e,
      t: (i * 0.13) % 1,
      speed: 0.0025 + (i % 5) * 0.0006,
    }));

    const pulses = nodes.map((n, i) => ({
      node: n,
      t: (i * 0.12) % 1,
      speed: 0.004 + (i % 4) * 0.001,
    }));

    let mouse = { x: -999, y: -999 };

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const sx = W / rect.width;
      const sy = H / rect.height;
      mouse = {
        x: (e.clientX - rect.left) * sx,
        y: (e.clientY - rect.top) * sy,
      };
    }
    function onMouseLeave() {
      mouse = { x: -999, y: -999 };
    }

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    function bezierPoint(
      ax: number, ay: number,
      bx: number, by: number,
      cx: number, cy: number,
      t: number,
    ) {
      const mt = 1 - t;
      return {
        x: mt * mt * ax + 2 * mt * t * cx + t * t * bx,
        y: mt * mt * ay + 2 * mt * t * cy + t * t * by,
      };
    }

    function dist(ax: number, ay: number, bx: number, by: number) {
      return Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
    }

    function getHoveredNode() {
      let closest: typeof nodes[0] | null = null, minD = 40;
      for (const n of nodes) {
        const d = dist(mouse.x, mouse.y, n.x, n.y);
        if (d < minD) {
          minD = d;
          closest = n;
        }
      }
      return closest;
    }

    function hexAlpha(hex: string, a: number) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${a})`;
    }

    function roundRect(
      cx: CanvasRenderingContext2D,
      x: number, y: number, w: number, h: number, r: number,
    ) {
      cx.beginPath();
      cx.moveTo(x + r, y);
      cx.lineTo(x + w - r, y);
      cx.quadraticCurveTo(x + w, y, x + w, y + r);
      cx.lineTo(x + w, y + h - r);
      cx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      cx.lineTo(x + r, y + h);
      cx.quadraticCurveTo(x, y + h, x, y + h - r);
      cx.lineTo(x, y + r);
      cx.quadraticCurveTo(x, y, x + r, y);
      cx.closePath();
    }

    let animId = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);

      const hovered = getHoveredNode();
      const hoveredIds = new Set<string>();
      if (hovered) {
        hoveredIds.add(hovered.id);
        edges.forEach((e) => {
          if (e.a === hovered.id || e.b === hovered.id) {
            hoveredIds.add(e.a);
            hoveredIds.add(e.b);
          }
        });
      }

      const mx = mouse.x, my = mouse.y;
      const hasM = mx > 0;

      // mouse proximity glow lines from nearest 4 nodes
      if (hasM) {
        const sorted = [...nodes]
          .sort((a, b) => dist(mx, my, a.x, a.y) - dist(mx, my, b.x, b.y))
          .slice(0, 4);
        sorted.forEach((n) => {
          const d = dist(mx, my, n.x, n.y);
          if (d > 180) return;
          const alpha = (1 - d / 180) * 0.18;
          ctx.beginPath();
          ctx.moveTo(mx, my);
          ctx.lineTo(n.x, n.y);
          ctx.strokeStyle = n.warm
            ? `rgba(255,107,53,${alpha})`
            : `rgba(79,126,255,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.setLineDash([3, 5]);
          ctx.stroke();
          ctx.setLineDash([]);
        });
      }

      // draw edges
      edges.forEach((e) => {
        const a = nodeMap[e.a];
        const b = nodeMap[e.b];
        const cp = cpOf(a, b);
        const isRelated = hoveredIds.has(e.a) || hoveredIds.has(e.b);
        const isFocused = hovered && (e.a === hovered.id || e.b === hovered.id);

        let alpha: number, width: number, color: string;
        if (!hovered) {
          alpha = e.active ? 0.35 : 0.15;
          width = e.active ? 1.2 : 0.7;
          color = e.active ? ACCENT : DIM;
        } else if (isFocused) {
          alpha = 0.85;
          width = e.active ? 1.8 : 1.1;
          color = e.active ? ACCENT : "#8899CC";
        } else {
          alpha = 0.05;
          width = 0.5;
          color = DIM;
        }

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(cp.cx, cp.cy, b.x, b.y);
        ctx.strokeStyle = hexAlpha(color, alpha);
        ctx.lineWidth = width;
        ctx.stroke();
      });

      // draw flow dots
      if (!prefersReduced) {
        dots.forEach((d) => {
          const a = nodeMap[d.edge.a];
          const b = nodeMap[d.edge.b];
          const cp = cpOf(a, b);
          const pt = bezierPoint(a.x, a.y, b.x, b.y, cp.cx, cp.cy, d.t);
          const isFocused = hovered && (d.edge.a === hovered.id || d.edge.b === hovered.id);
          const alpha = !hovered ? 0.88 : isFocused ? 1 : 0.1;
          const radius = isFocused ? 2.4 : 1.8;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = hexAlpha(ACCENT, alpha);
          ctx.fill();
          d.t = (d.t + d.speed) % 1;
        });
      }

      // draw pulse rings
      if (!prefersReduced) {
        pulses.forEach((p) => {
          const n = p.node;
          const maxR = n.gateway ? 22 : 16;
          const alpha = (1 - p.t) * (n.gateway ? 0.5 : 0.35);
          const ringR = p.t * maxR;
          const isH = hovered && hoveredIds.has(n.id);
          if (!hovered || isH) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, ringR, 0, Math.PI * 2);
            const c = n.warm ? WARM : ACCENT;
            ctx.strokeStyle = hexAlpha(c, alpha * (isH ? 1.8 : 1));
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
          p.t = (p.t + p.speed) % 1;
        });
      }

      // draw nodes
      nodes.forEach((n) => {
        const isH = hovered && hoveredIds.has(n.id);
        const isCentral = hovered && hovered.id === n.id;
        const c = n.warm ? WARM : ACCENT;
        const rMult = isCentral ? 1.25 : isH ? 1.1 : 1;
        const r = n.r * rMult;

        // outer shell
        ctx.beginPath();
        ctx.arc(n.x, n.y, r + 3.5, 0, Math.PI * 2);
        ctx.fillStyle = BG;
        ctx.strokeStyle = hexAlpha(BORDER, !hovered || isH ? 1 : 0.3);
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();

        // ring
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = SURF;
        ctx.strokeStyle = hexAlpha(c, !hovered || isH ? isCentral ? 1 : 0.85 : 0.2);
        ctx.lineWidth = isCentral ? 1.8 : 1.2;
        ctx.fill();
        ctx.stroke();

        // core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 0.38, 0, Math.PI * 2);
        ctx.fillStyle = hexAlpha(c, !hovered || isH ? 1 : 0.15);
        ctx.fill();

        // label
        ctx.font = '500 9px "JetBrains Mono", monospace';
        ctx.textAlign = "center";
        ctx.fillStyle =
          !hovered || isH
            ? isCentral
              ? c
              : hexAlpha(MUTED, 0.9)
            : hexAlpha(MUTED, 0.15);
        ctx.fillText(n.label, n.x, n.y + r + 14);
      });

      // tooltip for hovered node
      if (hovered) {
        const fullLabels: Record<string, string> = {
          ingress: "Ingress gateway",
          auth: "Auth service",
          api: "API gateway",
          queue: "Message queue",
          booking: "Booking engine",
          matching: "Match engine",
          dispatch: "Dispatch layer",
          notify: "Notification hub",
          media: "Media service",
          billing: "Billing service",
          cms: "Content CMS",
          reporting: "Reporting",
          storage: "Object storage",
          cache: "Redis cache",
          egress: "Egress gateway",
        };
        const label = fullLabels[hovered.id] || hovered.label;
        const connections = edges.filter(
          (e) => e.a === hovered.id || e.b === hovered.id,
        ).length;
        const tw = ctx.measureText(label).width + 80;
        const tx = Math.min(Math.max(hovered.x - tw / 2, 8), W - tw - 8);
        const ty = hovered.y - hovered.r - 42;

        ctx.fillStyle = "rgba(14,17,23,0.95)";
        ctx.strokeStyle = hexAlpha(hovered.warm ? WARM : ACCENT, 0.3);
        ctx.lineWidth = 0.8;
        const tooltipY = ty < 8 ? hovered.y + hovered.r + 10 : ty;
        roundRect(ctx, tx, tooltipY, tw, 30, 6);
        ctx.fill();
        ctx.stroke();

        ctx.font = '500 11px "JetBrains Mono", monospace';
        ctx.fillStyle = hovered.warm ? WARM : ACCENT;
        ctx.textAlign = "left";
        ctx.fillText(label, tx + 10, tooltipY + 14);
        ctx.font = '400 10px "JetBrains Mono", monospace';
        ctx.fillStyle = hexAlpha(MUTED, 0.8);
        ctx.fillText(`${connections} connections`, tx + 10, tooltipY + 25);
      }

      // mouse crosshair dot
      if (hasM) {
        ctx.beginPath();
        ctx.arc(mx, my, 2, 0, Math.PI * 2);
        ctx.fillStyle = hexAlpha(ACCENT, 0.5);
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [prefersReduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        cursor: "crosshair",
        borderRadius: "12px",
      }}
    />
  );
}

function CtaButton({
  href,
  variant,
  children,
  prefersReduced,
}: {
  href: string;
  variant: "primary" | "ghost";
  children: React.ReactNode;
  prefersReduced: boolean;
}) {
  const isPrimary = variant === "primary";

  return (
    <motion.a
      href={href}
      target={href.startsWith("#") ? undefined : "_blank"}
      rel={href.startsWith("#") ? undefined : "noopener noreferrer"}
      className={`group relative inline-flex min-h-12 items-center overflow-hidden rounded-card border px-6 font-mono text-sm ${
        isPrimary
          ? "border-accent bg-accent text-text-primary"
          : "border-border bg-transparent text-text-primary"
      }`}
      variants={CTA_GROUP_VARIANTS}
      initial="rest"
      whileHover={prefersReduced ? undefined : "hover"}
      whileFocus={prefersReduced ? undefined : "hover"}
    >
      <motion.span
        aria-hidden="true"
        className={`absolute inset-0 ${isPrimary ? "bg-text-primary/15" : "bg-accent"}`}
        variants={CTA_FILL_VARIANTS}
      />
      <span className="relative z-10">{children}</span>
    </motion.a>
  );
}

function SkillBadge({
  children,
  prefersReduced,
}: {
  children: React.ReactNode;
  prefersReduced: boolean;
}) {
  return (
    <motion.span
      className="inline-flex min-h-8 items-center rounded-card border border-border bg-surface px-3 font-mono text-xs text-text-muted"
      variants={BADGE_VARIANTS}
      initial="rest"
      whileHover={prefersReduced ? undefined : "hover"}
    >
      {children}
    </motion.span>
  );
}

function ExperienceSection({ prefersReduced }: { prefersReduced: boolean }) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-80px 0px" });

  return (
    <MotionSection
      id="experience"
      prefersReduced={prefersReduced}
      className="mx-auto w-full max-w-7xl px-6 py-24 md:px-10 lg:px-20"
    >
      <SectionHeader
        eyebrow="Experience"
        headline="Backend roles with production responsibility."
        description="Recent work across hospitality, healthcare, e-commerce, translation workflows, and mobile-first products."
      />

      <motion.div variants={CHILD_VARIANTS} className="relative mt-16 pl-7 md:pl-10">
        <motion.div
          className="absolute left-1 top-0 h-full w-px origin-top bg-border md:left-2"
          style={prefersReduced ? undefined : { scaleY: timelineInView ? 1 : 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        <div ref={timelineRef} className="space-y-8">
          {experiences.map((experience, i) => (
            <motion.article
              key={experience.company}
              className="relative rounded-card border border-border bg-surface p-6 md:p-8"
              initial={prefersReduced ? false : { opacity: 0, x: -20 }}
              animate={prefersReduced ? {} : timelineInView ? { opacity: 1, x: 0 } : {}}
              transition={{ ...EASING.reveal, delay: i * 0.12 }}
            >
              <motion.span
                className="absolute -left-[34px] top-8 h-3 w-3 rounded-full border border-accent bg-bg md:-left-[39px]"
                initial={prefersReduced ? false : { scale: 0 }}
                animate={prefersReduced ? {} : timelineInView ? { scale: 1 } : {}}
                transition={{ ...EASING.snap, delay: 0.2 + i * 0.12 }}
              />
              <h3 className="font-display text-2xl font-bold tracking-normal text-text-primary md:text-3xl">
                {experience.url ? (
                  <a
                    href={experience.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-text-dim underline-offset-8 transition-colors duration-300 [transition-timing-function:var(--ease-reveal)] hover:text-accent"
                  >
                    {experience.company}
                  </a>
                ) : (
                  experience.company
                )}
              </h3>
              <p className="mt-3 font-mono text-xs uppercase leading-6 text-text-muted">
                {experience.role} &middot; {experience.period}
              </p>
              <p className="mt-5 max-w-4xl text-base leading-7 text-text-muted">
                {experience.description}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.article
          className="relative mt-8 rounded-card border border-border bg-transparent p-6 md:p-8"
          initial={prefersReduced ? false : { opacity: 0, x: -20 }}
          animate={prefersReduced ? {} : timelineInView ? { opacity: 1, x: 0 } : {}}
          transition={{ ...EASING.reveal, delay: experiences.length * 0.12 }}
        >
          <motion.span
            className="absolute -left-[34px] top-8 h-3 w-3 rounded-full border border-text-dim bg-bg md:-left-[39px]"
            initial={prefersReduced ? false : { scale: 0 }}
            animate={prefersReduced ? {} : timelineInView ? { scale: 1 } : {}}
            transition={{ ...EASING.snap, delay: 0.2 + experiences.length * 0.12 }}
          />
          <p className="font-mono text-xs uppercase leading-none text-text-dim">Education</p>
          <h3 className="mt-4 font-display text-2xl font-bold tracking-normal text-text-primary">
            Shorouk Academy
          </h3>
          <p className="mt-3 font-mono text-xs uppercase leading-6 text-text-muted">
            Computer Science &middot; 2021 - 2025
          </p>
          <p className="mt-4 text-base leading-7 text-text-muted">Very Good (Project: Excellent)</p>
        </motion.article>
      </motion.div>
    </MotionSection>
  );
}

function StackSection({ prefersReduced }: { prefersReduced: boolean }) {
  return (
    <MotionSection
      id="stack"
      prefersReduced={prefersReduced}
      className="mx-auto w-full max-w-7xl px-6 py-24 md:px-10 lg:px-20"
    >
      <SectionHeader
        eyebrow="Stack"
        headline="Tools grouped by production responsibility."
        description="Backend-first technologies for APIs, data modeling, cloud integrations, realtime features, and frontend handoff."
      />

      <motion.div
        variants={CHILD_VARIANTS}
        className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
      >
        {stackGroups.map(({ name, skills, Icon }) => (
          <article key={name} className="rounded-card border border-border bg-surface p-5">
            <div className="relative inline-flex">
              {!prefersReduced && (
                <motion.div
                  className="absolute -inset-3 rounded-full bg-accent/5 blur-lg"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.4, 0.15] }}
                  transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
                />
              )}
              <Icon className="relative h-6 w-6 text-accent" />
            </div>
            <h3 className="mt-6 font-display text-xl font-bold leading-tight tracking-normal text-text-primary">
              {name}
            </h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <SkillBadge key={skill} prefersReduced={prefersReduced}>
                  {skill}
                </SkillBadge>
              ))}
            </div>
          </article>
        ))}
      </motion.div>
    </MotionSection>
  );
}

function ProjectCard({ project, prefersReduced }: {
  project: typeof projects[0];
  prefersReduced: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.div
        className="overflow-hidden rounded-card border border-border bg-surface p-6 md:p-8"
        animate={prefersReduced ? false : {
          y: hovered ? -4 : 0,
          boxShadow: hovered
            ? "0 16px 40px rgba(0, 0, 0, 0.32)"
            : "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 h-full w-px origin-top bg-accent"
          style={{
            transform: hovered ? "scaleY(1)" : "scaleY(0)",
            transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-display text-2xl font-bold tracking-normal text-text-primary">
          {project.name}
        </h3>
        {project.badge && (
          <span className="rounded-card border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[11px] text-accent">
            {project.badge}
          </span>
        )}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((tech, i) => (
          <span
            key={tech}
            className="rounded-card border px-2.5 py-1.5 font-mono text-[11px] text-text-muted transition-colors duration-300"
            style={{
              borderColor: hovered ? "rgba(79,126,255,0.25)" : "#1C2030",
              color: hovered ? "#F0F4FF" : "#6B7799",
              transitionDelay: hovered ? `${i * 30}ms` : "0ms",
            }}
          >
            {tech}
          </span>
        ))}
      </div>
      <p className="mt-6 text-base leading-7 text-text-muted">{project.description}</p>
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex font-mono text-sm text-accent transition-colors duration-300 [transition-timing-function:var(--ease-reveal)] hover:text-text-primary"
        >
          View System{" "}
          <motion.span
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            &rarr;
          </motion.span>
        </a>
      ) : (
        <p className="mt-8 font-mono text-sm text-text-dim">Private Build</p>
      )}
      </motion.div>
    </motion.div>
  );
}

function ProjectsSection({ prefersReduced }: { prefersReduced: boolean }) {
  return (
    <MotionSection
      id="systems"
      prefersReduced={prefersReduced}
      className="mx-auto w-full max-w-7xl px-6 py-24 md:px-10 lg:px-20"
    >
      <SectionHeader
        eyebrow="Selected Systems"
        headline="API-first products, integrations, and operational backends."
        description="Production builds spanning booking engines, realtime mobile products, ride-hailing flows, CMS platforms, and payment-backed SaaS workflows."
      />

      <motion.div variants={CHILD_VARIANTS} className="mt-16 grid gap-5 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} prefersReduced={prefersReduced} />
        ))}
      </motion.div>
    </MotionSection>
  );
}

function ContactSection({ prefersReduced }: { prefersReduced: boolean }) {
  return (
    <MotionSection
      id="contact"
      prefersReduced={prefersReduced}
      className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-24 md:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-20"
    >
      <motion.div variants={CHILD_VARIANTS}>
        <p className="font-mono text-xs uppercase leading-none text-accent">Contact</p>
        <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-normal text-text-primary md:text-5xl">
          Let&apos;s build the next backend the right way.
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-8 text-text-muted">
          If you need Laravel architecture, API integrations, or backend support for a product that
          already has real complexity, reach out.
        </p>
      </motion.div>

      <motion.div variants={CHILD_VARIANTS} className="space-y-3">
        {contactLinks.map(({ label, value, href, Icon }) => (
          <motion.a
            key={label}
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            className="flex items-center gap-4 rounded-card border border-border bg-surface p-4 md:p-5"
            variants={CONTACT_LINK_VARIANTS}
            initial="rest"
            whileHover={prefersReduced ? undefined : "hover"}
          >
            <Icon className="h-6 w-6 shrink-0 text-accent" />
            <span className="min-w-0">
              <span className="block font-mono text-xs uppercase leading-none text-text-dim">
                {label}
              </span>
              <span className="mt-2 block break-words text-sm leading-6 text-text-muted md:text-base">
                {value}
              </span>
            </span>
          </motion.a>
        ))}
      </motion.div>
    </MotionSection>
  );
}

function Footer() {
  return (
    <footer className="px-6 py-10 text-center font-mono text-xs text-text-dim">
      Mostafa Ali &middot; Cairo, Egypt &middot; 2025
    </footer>
  );
}

function BackendIcon(props: SVGProps<SVGSVGElement>) {
  const prefersReduced = useReducedMotion();
  return (
    <svg viewBox={`0 0 ${ICON_SIZE} ${ICON_SIZE}`} fill="none" aria-hidden="true" {...props}>
      <path d="M4 6H20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M6 12H18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M3 18H21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      {prefersReduced ? (
        <>
          <circle cx="4" cy="6" r="1.4" fill="currentColor" />
          <circle cx="18" cy="12" r="1.4" fill="currentColor" />
          <circle cx="8" cy="18" r="1.4" fill="currentColor" />
        </>
      ) : (
        <>
          <motion.circle cx="4" cy="6" r="1.4" fill="currentColor"
            animate={{ opacity: [1, 0.15, 1] }}
            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
          />
          <motion.circle cx="18" cy="12" r="1.4" fill="currentColor"
            animate={{ opacity: [1, 0.15, 1] }}
            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, delay: 0.5 }}
          />
          <motion.circle cx="8" cy="18" r="1.4" fill="currentColor"
            animate={{ opacity: [1, 0.15, 1] }}
            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, delay: 1 }}
          />
        </>
      )}
    </svg>
  );
}

function DatabaseIcon(props: SVGProps<SVGSVGElement>) {
  const prefersReduced = useReducedMotion();
  return (
    <svg viewBox={`0 0 ${ICON_SIZE} ${ICON_SIZE}`} fill="none" aria-hidden="true" {...props}>
      <path d="M5 9A7 4 0 0 1 19 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 9V16A7 4 0 0 0 19 16V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {prefersReduced ? (
        <>
          <path d="M7 12A5 3 0 0 1 17 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M9 15A3 2 0 0 1 15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <motion.path
            d="M7 12A5 3 0 0 1 17 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          />
          <motion.path
            d="M9 15A3 2 0 0 1 15 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, delay: 0.6 }}
          />
        </>
      )}
    </svg>
  );
}

function CloudIcon(props: SVGProps<SVGSVGElement>) {
  const prefersReduced = useReducedMotion();
  return (
    <svg viewBox={`0 0 ${ICON_SIZE} ${ICON_SIZE}`} fill="none" aria-hidden="true" {...props}>
      {prefersReduced ? (
        <path
          d="M6.4 17.2C4.5 17.2 3 15.8 3 13.9C3 12.1 4.4 10.7 6.2 10.6C6.9 8.3 9 6.8 11.5 6.8C14 6.8 16.1 8.4 16.8 10.7H17.4C19.4 10.7 21 12.1 21 14C21 15.9 19.5 17.2 17.5 17.2H6.4Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <motion.g
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
        >
          <path
            d="M6.4 17.2C4.5 17.2 3 15.8 3 13.9C3 12.1 4.4 10.7 6.2 10.6C6.9 8.3 9 6.8 11.5 6.8C14 6.8 16.1 8.4 16.8 10.7H17.4C19.4 10.7 21 12.1 21 14C21 15.9 19.5 17.2 17.5 17.2H6.4Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>
      )}
    </svg>
  );
}

function RealtimeIcon(props: SVGProps<SVGSVGElement>) {
  const prefersReduced = useReducedMotion();
  const wave = "M3 12C5 6 7 6 9 12C11 18 13 18 15 12C17 6 19 6 21 12";
  const flat = "M3 12C5 8 7 8 9 12C11 16 13 16 15 12C17 8 19 8 21 12";
  const echo = "M3 12C5 4 7 4 9 12C11 20 13 20 15 12C17 4 19 4 21 12";
  return (
    <svg viewBox={`0 0 ${ICON_SIZE} ${ICON_SIZE}`} fill="none" aria-hidden="true" {...props}>
      {prefersReduced ? (
        <>
          <path d={wave} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="9" cy="12" r="1.4" fill="currentColor" />
          <circle cx="15" cy="12" r="1.4" fill="currentColor" />
        </>
      ) : (
        <>
          {/* Echo / reverb trailing wave */}
          <motion.path
            d={echo}
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            opacity={0.2}
            animate={{ d: [echo, flat, echo], opacity: [0.2, 0.08, 0.2] }}
            transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity, delay: 0.35 }}
          />
          {/* Main wave */}
          <motion.path
            d={wave}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            animate={{ d: [wave, flat, wave] }}
            transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
          />
          {/* Client endpoint */}
          <motion.circle
            cx="9" cy="12" r="1.4"
            fill="currentColor"
            animate={{ r: [1.4, 2.4, 1.4], opacity: [1, 0.25, 1] }}
            transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
          />
          {/* Server endpoint */}
          <motion.circle
            cx="15" cy="12" r="1.4"
            fill="currentColor"
            animate={{ r: [1.4, 2.4, 1.4], opacity: [1, 0.25, 1] }}
            transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity, delay: 0.8 }}
          />
        </>
      )}
    </svg>
  );
}

function FrontendIcon(props: SVGProps<SVGSVGElement>) {
  const prefersReduced = useReducedMotion();
  return (
    <svg viewBox={`0 0 ${ICON_SIZE} ${ICON_SIZE}`} fill="none" aria-hidden="true" {...props}>
      {prefersReduced ? (
        <>
          <rect x="4" y="5" width="13" height="10" stroke="currentColor" strokeWidth="1.5" />
          <rect x="7" y="9" width="13" height="10" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 9L4 5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M17 15L20 19" stroke="currentColor" strokeWidth="1.5" />
        </>
      ) : (
        <>
          <motion.rect
            x="4" y="5" width="13" height="10"
            stroke="currentColor" strokeWidth="1.5"
            animate={{ x: [0, 1, 0] }}
            transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
          />
          <motion.rect
            x="7" y="9" width="13" height="10"
            stroke="currentColor" strokeWidth="1.5"
            animate={{ x: [0, -1, 0] }}
            transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
          />
          <motion.path
            d="M7 9L4 5"
            stroke="currentColor" strokeWidth="1.5"
            animate={{ opacity: [1, 0.25, 1] }}
            transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
          />
          <motion.path
            d="M17 15L20 19"
            stroke="currentColor" strokeWidth="1.5"
            animate={{ opacity: [1, 0.25, 1] }}
            transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, delay: 1.25 }}
          />
        </>
      )}
    </svg>
  );
}

function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4 7.5L12 13L20 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M4.5 6.5H19.5C20.1 6.5 20.5 6.9 20.5 7.5V17C20.5 17.6 20.1 18 19.5 18H4.5C3.9 18 3.5 17.6 3.5 17V7.5C3.5 6.9 3.9 6.5 4.5 6.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.2 18.5L4.5 19.5L5.4 16.8C4.6 15.5 4.2 14 4.3 12.4C4.5 8 8.1 4.6 12.4 4.8C16.5 4.9 19.8 8.3 19.7 12.4C19.6 16.7 16.1 20 11.8 19.8C10.2 19.8 8.6 19.3 7.2 18.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9.1 9.2C9.5 8.8 10 8.8 10.3 9.3L10.9 10.2C11.1 10.5 11 10.9 10.7 11.2L10.4 11.5C11 12.6 11.9 13.5 13.1 14L13.4 13.6C13.7 13.3 14.1 13.2 14.4 13.4L15.3 14C15.8 14.3 15.8 14.8 15.4 15.2C14.8 15.9 13.8 15.9 12.6 15.3C11.1 14.6 9.8 13.3 9 11.8C8.4 10.7 8.4 9.8 9.1 9.2Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M9 19.2C6 20.1 6 17.8 4.8 17.3M15 21V17.8C15 16.9 15.1 16.4 14.6 15.9C17.1 15.6 19.7 14.7 19.7 10.6C19.7 9.5 19.3 8.6 18.6 7.8C18.8 7.1 18.9 5.9 18.3 4.7C18.3 4.7 17.4 4.4 15.1 5.9C14.2 5.7 13.1 5.5 12 5.5C10.9 5.5 9.8 5.7 8.9 5.9C6.6 4.4 5.7 4.7 5.7 4.7C5.1 5.9 5.2 7.1 5.4 7.8C4.7 8.6 4.3 9.5 4.3 10.6C4.3 14.7 6.9 15.6 9.4 15.9C9 16.3 8.8 16.9 8.8 17.5V21"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M6.5 9.5V18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10.5 18.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M10.5 13.2C11 11 12.3 9.6 14.4 9.7C16.5 9.8 17.5 11.2 17.5 13.8V18.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="6.5" cy="6.2" r="1.2" fill="currentColor" />
      <rect x="3.8" y="3.8" width="16.4" height="16.4" rx="2.2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

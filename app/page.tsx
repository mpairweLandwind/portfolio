"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { useTheme } from "next-themes"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {
  ArrowUp, Code, ExternalLink, Github, Linkedin, Mail, Twitter,
  Cloud, Database, Cpu, BarChart, Globe, Smartphone, Moon, Sun,
  Menu, X, MapPin, Phone, GraduationCap, Award, Download,
  CheckCircle, ChevronRight, Briefcase, Loader2,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"

// ─── Data ─────────────────────────────────────────────────────────────────────

const TYPING_ROLES = [
  "DevOps Engineer",
  "AI / ML Engineer",
  "Full Stack Developer",
  "Mobile Developer",
  "Software Engineer",
]

// P2: Single source of truth — categories field drives all tab filtering
type Project = {
  title: string
  description: string
  image: string
  tags: string[]
  categories: string[]
  link?: string
  github?: string
}

const PROJECTS: Project[] = [
  {
    title: "AWS Serverless E-commerce Platform",
    description: "Scalable e-commerce platform built with AWS Lambda, API Gateway, DynamoDB, and S3 for high availability and performance.",
    image: "/images/awsserveless.webp",
    tags: ["AWS", "Serverless", "DynamoDB", "Lambda", "API Gateway"],
    categories: ["cloud"],
  },
  {
    title: "Cloud Healthcare Management System",
    description: "HIPAA-compliant healthcare system deployed on AWS using EC2, RDS, and Cognito for secure authentication.",
    image: "/images/awsheath.webp",
    tags: ["AWS", "EC2", "RDS", "Cognito", "Security"],
    categories: ["cloud"],
  },
  {
    title: "Smart Home Automation System",
    description: "IoT-based home automation using Raspberry Pi, Arduino, and AWS IoT Core for remote monitoring and control.",
    image: "/images/securityauto.webp",
    tags: ["IoT", "AWS IoT", "Raspberry Pi", "Arduino", "MQTT"],
    categories: ["iot"],
  },
  {
    title: "Agricultural Monitoring System",
    description: "IoT solution monitoring soil moisture, temperature, and humidity with real-time alerts and data visualisation.",
    image: "/images/openart-image_MH5vlRff_1744475821625_raw.jpg",
    tags: ["IoT", "Sensors", "Data Visualisation", "AWS"],
    categories: ["iot"],
  },
  {
    title: "Predictive Maintenance ML Model",
    description: "Machine learning model that predicts equipment failures before they occur, reducing downtime and maintenance costs.",
    image: "/images/predictive maintenance.webp",
    tags: ["Machine Learning", "Python", "TensorFlow", "scikit-learn"],
    categories: ["ml"],
  },
  {
    title: "Customer Sentiment Analysis",
    description: "NLP-based sentiment analysis tool processing customer feedback and social media to gauge brand perception.",
    image: "/images/sentimentanalysisz.webp",
    tags: ["NLP", "Machine Learning", "Python", "AWS Comprehend"],
    categories: ["ml"],
  },
  {
    title: "Zaloni Dental Management System",
    description: "C#/VB.NET desktop system streamlining inventory, sales, and patient management for Zaloni Dental.",
    image: "/images/zaloni.png",
    tags: ["C#", "VB.NET", "Desktop", "Inventory Management"],
    categories: ["desktop"],
  },
  {
    title: "Zaloni Dental Hub",
    description: "Flutter mobile app providing seamless access to dental services, online appointments, and resource booking.",
    image: "/images/zaloni_icon.png",
    tags: ["Flutter", "Firebase", "Dart", "Mobile"],
    categories: ["mobile"],
  },
  {
    title: "Delipucash Mobile App",
    description: "React Native fintech app enabling fast, secure digital transactions for individuals and businesses.",
    image: "/images/delipucash.png",
    tags: ["React Native", "Fintech", "TypeScript", "Mobile"],
    categories: ["mobile"],
  },
  {
    title: "Task Management App",
    description: "Kotlin Android app for productivity tracking with real-time Firebase sync and smart reminders.",
    image: "/images/task.jpg",
    tags: ["Kotlin", "Android", "Firebase", "Real-time"],
    categories: ["mobile"],
  },
  {
    title: "Blog Design",
    description: "Designed and built the WordPress blog malingageraldspongeman.com with SEO optimisation and responsive design.",
    image: "/images/blog.png",
    tags: ["WordPress", "Web Design", "SEO", "PHP"],
    categories: ["web"],
    link: "https://malingageraldspongeman.com",
  },
  {
    title: "My Portfolio",
    description: "This portfolio — a Next.js 15 SPA with dark mode, scroll animations, and a validated contact form.",
    image: "/images/carreer.jpg",
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    categories: ["web"],
    link: "https://mpairweportfolio.vercel.app",
    github: "https://github.com/mpairweLandwind",
  },
]

const PROJECT_TABS = [
  { value: "all",     label: "All Projects" },
  { value: "cloud",   label: "Cloud" },
  { value: "iot",     label: "IoT" },
  { value: "ml",      label: "ML / AI" },
  { value: "mobile",  label: "Mobile" },
  { value: "web",     label: "Web" },
  { value: "desktop", label: "Desktop" },
]

// P2: extracted skill data — no hardcoded JSX repetition
const SKILL_BARS = [
  { skill: "CI/CD Pipelines & GitHub Actions",                  pct: 92 },
  { skill: "Cloud & DevOps (AWS / Azure / GCP, Terraform, K8s)", pct: 90 },
  { skill: "Java & Spring Boot / Kotlin",                        pct: 90 },
  { skill: "Python (ML, Data Science, FastAPI)",                 pct: 88 },
  { skill: "JavaScript / TypeScript (React, Next.js)",           pct: 85 },
  { skill: "Machine Learning & Data Science",                    pct: 85 },
  { skill: "Flutter & React Native (Mobile)",                    pct: 82 },
  { skill: "Databases (MySQL, PostgreSQL, MongoDB, Firebase)",   pct: 80 },
  { skill: "IoT Development (Arduino, Raspberry Pi)",            pct: 80 },
  { skill: "Node.js / Express / Prisma",                        pct: 78 },
]

const EXPERIENCES = [
  {
    company: "AIBOS Uganda",
    role: "DevOps Engineer",
    period: "Feb 2024 – Present",
    type: "Full-time",
    borderColor: "border-l-blue-500",
    bullets: [
      "Implemented CI/CD pipelines with GitHub Actions, cutting deployment time by 60%",
      "Managed infrastructure as code (IaC) with Terraform across AWS, Azure, and GCP",
      "Orchestrated containerised workloads using Docker, Kubernetes, and AWS ECS",
      "Set up Prometheus/Grafana monitoring dashboards for real-time system observability",
      "Enforced security and compliance policies across cloud infrastructure environments",
    ],
    tags: ["GitHub Actions", "Terraform", "Docker", "Kubernetes", "AWS", "Prometheus", "Grafana"],
  },
  {
    company: "IONA Tech",
    role: "AI / ML Engineer",
    period: "Feb 2023 – Present",
    type: "Full-time",
    borderColor: "border-l-purple-500",
    bullets: [
      "Designed and trained ML models for classification, regression, and recommendation tasks",
      "Built end-to-end ML pipelines from data ingestion through to model deployment",
      "Performed data preprocessing and feature engineering with Pandas, NumPy, and scikit-learn",
      "Evaluated and optimised models using cross-validation, hyperparameter tuning, and A/B testing",
      "Implemented model monitoring and logging in production environments",
    ],
    tags: ["Python", "scikit-learn", "Pandas", "NumPy", "TensorFlow", "ML Pipelines"],
  },
  {
    company: "Makerere University",
    role: "Student Software Engineer",
    period: "Jan 2022 – Dec 2023",
    type: "Part-time",
    borderColor: "border-l-green-500",
    bullets: [
      "Built TaskApp — a Kotlin task management app with real-time Firebase sync",
      "Developed scalable cross-platform apps using React Native and Flutter",
      "Implemented secure JWT and biometric authentication flows",
      "Delivered a fintech mobile app with digital payments, rewards, and transaction tracking",
      "Integrated third-party payment APIs and designed scalable backend architecture",
    ],
    tags: ["Kotlin", "React Native", "Flutter", "Firebase", "JWT", "Fintech"],
  },
  {
    company: "PAHAPPA LIMITED",
    role: "DevOps Intern → Employee",
    period: "Jun 2022 – Jan 2024",
    type: "Full-time",
    borderColor: "border-l-orange-500",
    bullets: [
      "Built enterprise applications with Spring Boot (MVC, Data JPA, Security, Cloud)",
      "Used Hibernate ORM/JPA with MySQL, PostgreSQL, Oracle, and MongoDB databases",
      "Designed Microservice and Monolithic architectures based on project requirements",
      "Developed RESTful APIs and event-driven systems for high-throughput workflows",
    ],
    tags: ["Spring Boot", "Java", "Hibernate", "MySQL", "PostgreSQL", "Microservices", "REST API"],
  },
  {
    company: "WEB INFO-NET LIMITED",
    role: "Application Developer Intern & Trainer",
    period: "Jun 2018 – Aug 2022",
    type: "Internship",
    borderColor: "border-l-pink-500",
    bullets: [
      "Developed mobile apps using Swift, Java, and Kotlin for iOS and Android platforms",
      "Built an Odoo-based Employment Management System for HR automation",
      "Implemented secure authentication and third-party API integrations",
      "Provided Level 1 technical support, troubleshooting, and end-user training",
    ],
    tags: ["Swift", "Java", "Kotlin", "Odoo", "iOS", "Android"],
  },
  {
    company: "ZALONIDENTALHUB",
    role: "Leading Developer & Maintainer",
    period: "Apr 2022 – Present",
    type: "Contract",
    borderColor: "border-l-teal-500",
    bullets: [
      "Led full SDLC for dental practice management software from conception to delivery",
      "Built C#/VB.NET desktop systems for inventory and patient management",
      "Developed a Flutter mobile app with e-commerce, appointments, and booking features",
      "Ensured seamless desktop-mobile data interoperability",
      "Led a team of developers, defining software architectures and coding standards",
    ],
    tags: ["C#", "VB.NET", "Flutter", "Desktop", "Mobile", "Team Lead"],
  },
]

const EDUCATION = [
  {
    school: "Makerere University",
    degree: "Bachelor of Science in Software Engineering",
    period: "2024 – Expected 2027",
    cgpa: "4.31",
    borderColor: "border-l-primary",
    highlights: [
      "Specialising in AI/ML and Enterprise Application Development",
      "Integrated Supabase, MongoDB, Cloudflare, and Firebase for scalable storage",
      "Implemented RBAC and encryption for secure multi-role systems",
      "Built a full HRMS system with advanced role and permissions management",
      "Worked on IoT and Embedded Systems research projects",
      "Optimised PostgreSQL queries for high-performance data retrieval",
    ],
  },
  {
    school: "Makerere University",
    degree: "Bachelor of Science in Computer Engineering",
    period: "2021 – 2024",
    cgpa: "",
    borderColor: "border-l-blue-500",
    highlights: [
      "Transitioned to the Software Engineering programme",
      "Studied Digital Electronics and hardware design principles",
      "Hardware repair, maintenance, and systems diagnostics",
    ],
  },
  {
    school: "Uganda Technical College – Lira",
    degree: "National Diploma in Information Communication Technology",
    period: "2016 – 2018",
    cgpa: "4.77",
    borderColor: "border-l-green-500",
    highlights: [
      "Database Management and Web Development",
      "Internet technologies and networking fundamentals",
      "RBAC and Encryption implementation",
      "Java programming and object-oriented design",
      "Networking and Server Configuration",
    ],
  },
  {
    school: "Boston High School – Mpala",
    degree: "Uganda Certificate of Education (UCE)",
    period: "2011 – 2015",
    cgpa: "",
    borderColor: "border-l-orange-500",
    highlights: [
      "Graduated in Top 5% of class",
      "Varsity Debate Team Captain",
    ],
  },
]

const REFERENCES = [
  {
    name: "Dr. Kimbugwe Nasser",
    role: "Lecturer & Academic Supervisor",
    institution: "Makerere University, School of Computing & IT",
    initial: "KN",
    gradient: "from-blue-500 to-blue-700",
  },
  {
    name: "Kalema Martin",
    role: "Supervisor",
    institution: "AIBOS Uganda",
    initial: "KM",
    gradient: "from-pink-500 to-rose-700",
  },
  {
    name: "Dr. Mark Magumba",
    role: "Senior Lecturer",
    institution: "Makerere University, School of Computing & IT",
    initial: "MM",
    gradient: "from-purple-500 to-purple-700",
  },
  {
    name: "Fahadi Nguyenguye",
    role: "Technical Lead",
    institution: "PAHAPPA LIMITED",
    initial: "FN",
    gradient: "from-green-500 to-green-700",
  },
]

// ─── Contact form schema ───────────────────────────────────────────────────────

const contactSchema = z.object({
  name:    z.string().min(2, "Name must be at least 2 characters"),
  email:   z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
})
type ContactFormValues = z.infer<typeof contactSchema>

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Portfolio() {
  const [scrolled,       setScrolled]       = useState(false)
  const [activeSection,  setActiveSection]  = useState("home")
  const [showBackToTop,  setShowBackToTop]  = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [typingIndex,    setTypingIndex]    = useState(0)
  const [displayedText,  setDisplayedText]  = useState("")
  const [isDeleting,     setIsDeleting]     = useState(false)
  const [formSubmitting, setFormSubmitting] = useState(false)
  // P1: skill bars animate to value only after section enters viewport
  const [skillsAnimated, setSkillsAnimated] = useState(false)
  const skillsSectionRef = useRef<HTMLElement>(null)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // ── P1: Typing animation (respects prefers-reduced-motion) ─────────────────
  useEffect(() => {
    if (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayedText(TYPING_ROLES[0])
      return
    }
    const currentRole = TYPING_ROLES[typingIndex]
    let timeout: ReturnType<typeof setTimeout>
    if (!isDeleting) {
      if (displayedText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentRole.slice(0, displayedText.length + 1))
        }, 80)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2200)
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 45)
      } else {
        setIsDeleting(false)
        setTypingIndex((prev) => (prev + 1) % TYPING_ROLES.length)
      }
    }
    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, typingIndex])

  // ── Scroll handler ──────────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      setShowBackToTop(window.scrollY > 700)
      const ids = ["home","work","skills","experience","education","about","contact"]
      const current = ids.find((id) => {
        const el = document.getElementById(id)
        if (!el) return false
        const { top, bottom } = el.getBoundingClientRect()
        return top <= 100 && bottom >= 100
      })
      if (current) setActiveSection(current)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // ── P1: Skill bars IntersectionObserver ─────────────────────────────────────
  useEffect(() => {
    const el = skillsSectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setSkillsAnimated(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // ── P1: Section reveal IntersectionObserver ──────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    )
    document.querySelectorAll(".section-reveal").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  const navItems = [
    { id: "home",       label: "Home"       },
    { id: "work",       label: "Work"       },
    { id: "skills",     label: "Skills"     },
    { id: "experience", label: "Experience" },
    { id: "education",  label: "Education"  },
    { id: "about",      label: "About"      },
    { id: "contact",    label: "Contact"    },
  ]

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  })

  // P0: removed console.log — never log form data in production
  const onSubmit = async (_values: ContactFormValues) => {
    setFormSubmitting(true)
    // TODO: wire up to EmailJS / Formspree / Next.js server action
    await new Promise((r) => setTimeout(r, 1400))
    toast.success("Message sent! I'll get back to you soon. 🚀")
    form.reset()
    setFormSubmitting(false)
  }

  return (
    <>
      {/* P3: Skip-to-content for keyboard / screen-reader users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <main id="main-content" className="min-h-screen bg-background text-foreground">

        {/* ── Navigation ──────────────────────────────────────────────────── */}
        {/* P3: aria-label added */}
        <nav
          aria-label="Main navigation"
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled
              ? "bg-background/90 backdrop-blur-md shadow-sm border-b border-border/40 py-3"
              : "bg-transparent py-5"
          }`}
        >
          <div className="container mx-auto px-4 flex justify-between items-center">
            {/* P0: Logo is now an interactive button */}
            <button
              onClick={scrollToTop}
              className="font-bold text-xl text-primary hover:opacity-75 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              aria-label="Go to top"
            >
              ML
            </button>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center space-x-6" role="list">
              {navItems.map(({ id, label }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToSection(id)}
                    aria-current={activeSection === id ? "page" : undefined}
                    className={`relative text-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-1 ${
                      activeSection === id ? "text-primary font-semibold" : "text-muted-foreground"
                    }`}
                  >
                    {label}
                    {/* P1: animated underline indicator */}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-primary rounded-full transition-all duration-300 ${
                        activeSection === id ? "w-full" : "w-0"
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-1">
              {/* Theme toggle */}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {theme === "dark"
                    ? <Sun  className="h-5 w-5" />
                    : <Moon className="h-5 w-5" />}
                </Button>
              )}
              {/* Mobile hamburger */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen((o) => !o)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile dropdown */}
          {mobileMenuOpen && (
            <div
              id="mobile-nav"
              className="md:hidden bg-background/95 backdrop-blur-md border-t border-border"
            >
              <ul className="flex flex-col py-2" role="list">
                {navItems.map(({ id, label }) => (
                  <li key={id}>
                    <button
                      onClick={() => scrollToSection(id)}
                      aria-current={activeSection === id ? "page" : undefined}
                      className={`w-full text-left px-6 py-3 text-sm transition-colors hover:text-primary hover:bg-muted ${
                        activeSection === id
                          ? "text-primary font-semibold bg-muted/50"
                          : "text-muted-foreground"
                      }`}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>

        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <section id="home" className="relative min-h-screen flex items-center pt-20">
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background" />
            <div className="absolute inset-0 bg-[url('/images/header.jpg')] bg-cover bg-center bg-fixed opacity-10" />
          </div>

          <div className="container mx-auto px-4 z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                {/* P1: mobile profile photo — appears above name on small screens */}
                <div className="flex lg:hidden justify-center mb-6">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary/30 shadow-lg">
                    <Image
                      src="/images/lauben.jpg"
                      alt="Mpairwe Lauben — profile photo"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                <p className="text-primary font-medium mb-2 animate-fade-in">👋 Hello, I'm</p>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in tracking-tight">
                  Mpairwe Lauben
                </h1>

                {/* Typing animation */}
                <div
                  className="text-xl md:text-2xl mb-6 animate-fade-in-delay min-h-[2rem]"
                  aria-live="polite"
                  aria-label={`I'm a ${displayedText}`}
                >
                  <span className="text-muted-foreground">I'm a </span>
                  <span className="text-primary font-semibold">
                    {displayedText}
                    <span className="inline-block w-[2px] h-5 bg-primary ml-0.5 animate-pulse" aria-hidden="true" />
                  </span>
                </div>

                <p className="text-muted-foreground mb-8 max-w-lg text-base animate-fade-in-delay leading-relaxed">
                  A driven Software Engineering student at Makerere University with 5+ years of
                  hands-on experience in DevOps, AI/ML, full-stack, and mobile development — based
                  in Kampala, Uganda.
                </p>

                <div className="flex flex-wrap gap-3 animate-fade-in-delay-2">
                  <Button onClick={() => scrollToSection("contact")} size="lg">
                    Get in touch
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => scrollToSection("work")}>
                    View my work
                  </Button>
                  <Button variant="ghost" size="lg" asChild>
                    <Link href="/images/resume.pdf" download>
                      <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                      Resume
                    </Link>
                  </Button>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-6 mt-12 animate-fade-in-delay-2">
                  {[
                    { label: "Years Experience", value: "5+" },
                    { label: "Projects Delivered", value: "20+" },
                    { label: "Technologies",       value: "30+" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-3xl font-bold text-primary" aria-label={stat.value}>{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop profile photo */}
              <div className="hidden lg:flex justify-center" aria-hidden="true">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/30 to-primary/5 blur-2xl" />
                  <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                    <Image
                      src="/images/lauben.jpg"
                      alt="Mpairwe Lauben"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-background border border-border rounded-xl px-3 py-2 shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-medium">Available for work</span>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-xl px-3 py-2 shadow-lg text-xs font-medium">
                    📍 Kampala, Uganda
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Projects ────────────────────────────────────────────────────── */}
        <section id="work" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="section-reveal">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 relative">
                My Work
                <span className="block h-1 w-20 bg-primary mt-4" aria-hidden="true" />
              </h2>
            </div>

            {/* P2: Data-driven tabs — single PROJECTS array, filtered per tab */}
            <Tabs defaultValue="all" className="mb-12">
              <TabsList className="mb-8 flex flex-wrap h-auto gap-1">
                {PROJECT_TABS.map(({ value, label }) => (
                  <TabsTrigger key={value} value={value}>{label}</TabsTrigger>
                ))}
              </TabsList>

              {PROJECT_TABS.map(({ value }) => (
                <TabsContent
                  key={value}
                  value={value}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {(value === "all"
                    ? PROJECTS
                    : PROJECTS.filter((p) => p.categories.includes(value))
                  ).map((project, i) => (
                    <div
                      key={project.title}
                      className={`section-reveal reveal-delay-${Math.min(i + 1, 4)}`}
                    >
                      <ProjectCard {...project} />
                    </div>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* ── Skills ──────────────────────────────────────────────────────── */}
        <section id="skills" className="py-20" ref={skillsSectionRef}>
          <div className="container mx-auto px-4">
            <div className="section-reveal">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 relative">
                My Skills
                <span className="block h-1 w-20 bg-primary mt-4" aria-hidden="true" />
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* P1: animated progress bars — values animate from 0 on viewport entry */}
              <div className="section-reveal reveal-delay-1">
                <h3 className="text-xl font-semibold mb-6">Technical Proficiency</h3>
                <div className="space-y-5">
                  {SKILL_BARS.map(({ skill, pct }) => (
                    <SkillBar
                      key={skill}
                      skill={skill}
                      percentage={skillsAnimated ? pct : 0}
                    />
                  ))}
                </div>
              </div>

              <div className="section-reveal reveal-delay-2">
                <h3 className="text-xl font-semibold mb-6">Domain Expertise</h3>
                <div className="grid grid-cols-2 gap-4">
                  <SkillCard skill="Cloud Computing"   icon={<Cloud      className="h-5 w-5" />} />
                  <SkillCard skill="DevOps & CI/CD"    icon={<Code       className="h-5 w-5" />} />
                  <SkillCard skill="AI / ML"           icon={<BarChart   className="h-5 w-5" />} />
                  <SkillCard skill="IoT Development"   icon={<Cpu        className="h-5 w-5" />} />
                  <SkillCard skill="Web Development"   icon={<Globe      className="h-5 w-5" />} />
                  <SkillCard skill="Mobile (Flutter, RN)" icon={<Smartphone className="h-5 w-5" />} />
                  <SkillCard skill="Database Design"   icon={<Database   className="h-5 w-5" />} />
                  <SkillCard skill="Team Leadership"   icon={<Award      className="h-5 w-5" />} />
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Spoken Languages</h3>
                  <div className="flex gap-3 flex-wrap">
                    {["English (Fluent)", "German (Basic)"].map((lang) => (
                      <Badge key={lang} variant="outline" className="px-4 py-2 text-sm">{lang}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Technology domain cards */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  color: "border-t-blue-500",
                  iconBg: "bg-blue-500/10",
                  icon: <Cloud className="h-6 w-6 text-blue-500" />,
                  title: "Cloud & DevOps",
                  desc: "Expert in designing and maintaining scalable, secure cloud infrastructure and CI/CD pipelines.",
                  tags: ["AWS", "Azure", "GCP", "Terraform", "Kubernetes", "Docker", "GitHub Actions"],
                },
                {
                  color: "border-t-purple-500",
                  iconBg: "bg-purple-500/10",
                  icon: <BarChart className="h-6 w-6 text-purple-500" />,
                  title: "AI / Machine Learning",
                  desc: "Experienced in building end-to-end ML pipelines, training models, and deploying AI solutions.",
                  tags: ["Python", "scikit-learn", "TensorFlow", "PyTorch", "Pandas", "NumPy", "NLP"],
                },
                {
                  color: "border-t-green-500",
                  iconBg: "bg-green-500/10",
                  icon: <Smartphone className="h-6 w-6 text-green-500" />,
                  title: "Mobile & Web",
                  desc: "Full-stack developer with strong mobile expertise across Android, iOS, and cross-platform frameworks.",
                  tags: ["Flutter", "React Native", "Kotlin", "Swift", "React", "Next.js", "Spring Boot"],
                },
              ].map(({ color, iconBg, icon, title, desc, tags }, i) => (
                <Card
                  key={title}
                  className={`section-reveal reveal-delay-${i + 1} p-6 hover:shadow-lg transition-shadow border-t-4 ${color}`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`${iconBg} p-3 rounded-full`}>{icon}</div>
                    <h4 className="text-base font-semibold">{title}</h4>
                  </div>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((t) => <Badge key={t} variant="outline" className="text-xs">{t}</Badge>)}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── Work Experience ──────────────────────────────────────────────── */}
        <section id="experience" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="section-reveal">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 relative">
                Work Experience
                <span className="block h-1 w-20 bg-primary mt-4" aria-hidden="true" />
              </h2>
            </div>

            <div className="relative">
              {/* Vertical timeline spine (desktop) */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-px hidden md:block" aria-hidden="true" />

              <div className="space-y-12">
                {EXPERIENCES.map((exp, index) => (
                  <div
                    key={`${exp.company}-${index}`}
                    className={`section-reveal relative flex flex-col md:flex-row gap-0 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Timeline dot */}
                    <div
                      className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10 top-6"
                      aria-hidden="true"
                    />

                    {/* Date column (desktop) */}
                    <div
                      className={`hidden md:flex w-1/2 items-start pt-5 ${
                        index % 2 === 0 ? "justify-end pr-10 text-right" : "justify-start pl-10"
                      }`}
                    >
                      <div>
                        <p className="text-sm font-semibold text-primary">{exp.period}</p>
                        <Badge variant="secondary" className="mt-1 text-xs">{exp.type}</Badge>
                      </div>
                    </div>

                    {/* Experience card */}
                    <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pl-10" : "md:pr-10"}`}>
                      <Card className={`p-6 hover:shadow-lg transition-all duration-300 border-l-4 ${exp.borderColor}`}>
                        <div className="mb-3">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="text-lg font-bold">{exp.role}</h3>
                              <p className="text-primary font-medium text-sm">{exp.company}</p>
                            </div>
                            <Briefcase className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" aria-hidden="true" />
                          </div>
                          {/* Period shown only on mobile */}
                          <p className="text-xs text-muted-foreground mt-1 md:hidden">
                            {exp.period} · {exp.type}
                          </p>
                        </div>
                        <ul className="space-y-2 mb-4">
                          {exp.bullets.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-2">
                          {exp.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Education ───────────────────────────────────────────────────── */}
        <section id="education" className="py-20">
          <div className="container mx-auto px-4">
            <div className="section-reveal">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 relative">
                Education
                <span className="block h-1 w-20 bg-primary mt-4" aria-hidden="true" />
              </h2>
            </div>

            <div className="space-y-6">
              {EDUCATION.map((edu, index) => (
                <div key={`${edu.school}-${index}`} className="flex gap-5 section-reveal">
                  {/* Icon spine */}
                  <div className="flex flex-col items-center" aria-hidden="true">
                    <div className="bg-primary/10 p-3 rounded-full shrink-0">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    {index < EDUCATION.length - 1 && (
                      <div className="flex-1 w-px bg-border mt-2" />
                    )}
                  </div>

                  <Card className={`flex-1 p-6 mb-4 hover:shadow-lg transition-shadow border-l-4 ${edu.borderColor}`}>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-base font-bold">{edu.degree}</h3>
                        <p className="text-primary font-medium text-sm">{edu.school}</p>
                      </div>
                      <div className="shrink-0 sm:text-right">
                        <p className="text-sm text-muted-foreground">{edu.period}</p>
                        {edu.cgpa && (
                          <Badge variant="outline" className="mt-1 text-xs">CGPA {edu.cgpa}</Badge>
                        )}
                      </div>
                    </div>
                    <ul className="space-y-1">
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" aria-hidden="true" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── About ───────────────────────────────────────────────────────── */}
        <section id="about" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="section-reveal">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 relative">
                About Me
                <span className="block h-1 w-20 bg-primary mt-4" aria-hidden="true" />
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative section-reveal">
                <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 blur-xl" aria-hidden="true" />
                <div className="relative overflow-hidden rounded-xl">
                  <Image
                    src="/images/lauben.jpg"
                    alt="Mpairwe Lauben — software engineer based in Kampala, Uganda"
                    width={600}
                    height={600}
                    className="w-full h-auto object-cover rounded-xl"
                  />
                </div>
              </div>

              <div className="section-reveal reveal-delay-1">
                <p className="text-lg mb-4 leading-relaxed">
                  I am <strong>Mpairwe Lauben</strong>, a passionate software engineer from Kampala,
                  Uganda, specialising in DevOps, AI/ML, full-stack development, and mobile engineering.
                </p>
                <p className="text-base mb-4 text-muted-foreground leading-relaxed">
                  With 5+ years of professional experience across startups, enterprises, and academic
                  institutions, I thrive on building reliable, scalable, and impactful technology solutions.
                  I'm equally comfortable architecting cloud infrastructure, training ML models, or shipping
                  production-ready mobile apps.
                </p>
                <p className="text-base mb-8 text-muted-foreground leading-relaxed">
                  I'm a reliable and collaborative team player with a strong work ethic and a genuine
                  passion for continuous learning, open-source contributions, and mentoring junior developers.
                </p>

                <dl className="grid grid-cols-2 gap-4 mb-8 text-sm">
                  {[
                    { label: "Name",        value: "Mpairwe Lauben" },
                    { label: "DOB",         value: "22 October 1995" },
                    { label: "Email",       value: "mpairwelauben75@gmail.com" },
                    { label: "Phone",       value: "+256 773 336 896" },
                    { label: "Location",    value: "Kampala, Uganda" },
                    { label: "Nationality", value: "Ugandan" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <dt className="font-semibold text-primary text-xs uppercase tracking-wide">{label}</dt>
                      <dd className="text-muted-foreground mt-0.5">{value}</dd>
                    </div>
                  ))}
                </dl>

                <Button asChild>
                  <Link href="/images/resume.pdf" download>
                    <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                    Download Resume
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── References ──────────────────────────────────────────────────── */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="section-reveal">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 relative">
                References
                <span className="block h-1 w-20 bg-primary mt-4" aria-hidden="true" />
              </h2>
              <p className="text-muted-foreground mb-12 text-sm">
                Available upon request — full contact details provided on inquiry.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {REFERENCES.map((ref, i) => (
                <Card
                  key={ref.name}
                  className={`section-reveal reveal-delay-${i + 1} p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center`}
                >
                  <div
                    className={`w-14 h-14 rounded-full bg-gradient-to-br ${ref.gradient} flex items-center justify-center text-white font-bold text-lg mx-auto mb-4 shadow-md`}
                    aria-hidden="true"
                  >
                    {ref.initial}
                  </div>
                  <h3 className="font-semibold text-sm">{ref.name}</h3>
                  <p className="text-xs text-primary mt-1 font-medium">{ref.role}</p>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{ref.institution}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── Clients & Collaborations ────────────────────────────────────── */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="section-reveal">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 relative">
                Clients & Collaborations
                <span className="block h-1 w-20 bg-primary mt-4" aria-hidden="true" />
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center section-reveal">
              {[
                { src: "/images/zaloni.png",     alt: "Zaloni Dental" },
                { src: "/images/mak.png",        alt: "Makerere University" },
                { src: "/images/delipucash.png", alt: "Delipucash" },
                { src: "/images/webinfo.png",    alt: "Web Info-Net" },
                { src: "/images/arola.png",      alt: "Arola" },
                { src: "/images/blog.png",       alt: "Blog" },
              ].map(({ src, alt }) => (
                <div key={alt} className="flex justify-center">
                  <Image
                    src={src}
                    alt={alt}
                    width={120}
                    height={60}
                    className="opacity-60 hover:opacity-100 transition-opacity object-contain max-h-14"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ─────────────────────────────────────────────────────── */}
        <section id="contact" className="py-20">
          <div className="container mx-auto px-4">
            <div className="section-reveal">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 relative">
                Get in Touch
                <span className="block h-1 w-20 bg-primary mt-4" aria-hidden="true" />
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact details */}
              <div className="section-reveal">
                <p className="text-base mb-8 text-muted-foreground leading-relaxed">
                  Have a project, opportunity, or just want to connect? I'm always open to discussing
                  new ideas and collaborations in DevOps, AI/ML, cloud architecture, or full-stack
                  development. Let's build something impactful together.
                </p>
                <address className="not-italic">
                  <ul className="space-y-5">
                    {[
                      {
                        icon: <Mail    className="h-5 w-5 text-primary" aria-hidden="true" />,
                        label: "Email",
                        value: "mpairwelauben75@gmail.com",
                        href:  "mailto:mpairwelauben75@gmail.com",
                      },
                      {
                        icon: <Phone   className="h-5 w-5 text-primary" aria-hidden="true" />,
                        label: "Phone",
                        value: "+256 773 336 896",
                        href:  "tel:+256773336896",
                      },
                      {
                        icon: <MapPin  className="h-5 w-5 text-primary" aria-hidden="true" />,
                        label: "Location",
                        value: "Kampala, Uganda",
                        href:  null,
                      },
                      {
                        icon: <Linkedin className="h-5 w-5 text-primary" aria-hidden="true" />,
                        label: "LinkedIn",
                        value: "mpairwe-lauben-3a1461344",
                        href:  "https://www.linkedin.com/in/mpairwe-lauben-3a1461344",
                      },
                      {
                        icon: <Github  className="h-5 w-5 text-primary" aria-hidden="true" />,
                        label: "GitHub",
                        value: "github.com/mpairweLandwind",
                        href:  "https://github.com/mpairweLandwind",
                      },
                    ].map(({ icon, label, value, href }) => (
                      <li key={label} className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full shrink-0">{icon}</div>
                        <div>
                          <p className="font-medium text-sm">{label}</p>
                          {href ? (
                            <a
                              href={href}
                              target={href.startsWith("http") ? "_blank" : undefined}
                              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                              className="text-muted-foreground hover:text-primary transition-colors text-sm break-all"
                            >
                              {value}
                            </a>
                          ) : (
                            <p className="text-muted-foreground text-sm">{value}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </address>
              </div>

              {/* P0: noValidate prevents browser native validation conflicting with Zod */}
              <div className="bg-muted/30 rounded-xl p-6 border border-border section-reveal reveal-delay-1">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <input
                                {...field}
                                placeholder="Your full name"
                                autoComplete="name"
                                className="w-full px-4 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <input
                                {...field}
                                type="email"
                                placeholder="your@email.com"
                                autoComplete="email"
                                className="w-full px-4 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <input
                              {...field}
                              placeholder="What's this about?"
                              className="w-full px-4 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <textarea
                              {...field}
                              rows={5}
                              placeholder="Tell me about your project or idea…"
                              className="w-full px-4 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none transition-shadow"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* P1: loading spinner for visual feedback */}
                    <Button type="submit" className="w-full" disabled={formSubmitting}>
                      {formSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" aria-hidden="true" />
                          Sending…
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <footer className="py-12 bg-muted/30 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <p className="font-bold text-lg mb-1">
                  <span className="text-primary">ML</span> · Mpairwe Lauben
                </p>
                <p className="text-sm text-muted-foreground">
                  Software Engineer · DevOps · AI/ML · Kampala, Uganda
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  &copy; {new Date().getFullYear()} Mpairwe Lauben. All rights reserved.
                </p>
              </div>

              {/* P0: all external links now have target + rel */}
              <nav aria-label="Social links">
                <ul className="flex space-x-4" role="list">
                  {[
                    { href: "https://twitter.com/mpairwelauben/",                       icon: <Twitter   className="h-5 w-5" />, label: "Twitter / X"  },
                    { href: "https://github.com/mpairweLandwind/",                       icon: <Github    className="h-5 w-5" />, label: "GitHub"       },
                    { href: "https://www.linkedin.com/in/mpairwe-lauben-3a1461344",     icon: <Linkedin  className="h-5 w-5" />, label: "LinkedIn"     },
                    { href: "mailto:mpairwelauben75@gmail.com",                          icon: <Mail      className="h-5 w-5" />, label: "Send email"   },
                  ].map(({ href, icon, label }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        aria-label={label}
                        className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm p-1 inline-block"
                      >
                        {icon}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </footer>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 bg-primary text-primary-foreground p-3 rounded-full shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
            showBackToTop ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none"
          }`}
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </button>
      </main>
    </>
  )
}

// ─── Helper Components ────────────────────────────────────────────────────────

function ProjectCard({ title, description, image, tags, link, github }: Project) {
  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
      <div className="relative overflow-hidden h-48 shrink-0">
        <Image
          src={image || "/images/carreer.jpg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {(link || github) && (
          <div
            className="absolute inset-0 bg-black/70 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-hidden="true"
          >
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                className="bg-primary text-primary-foreground p-2 rounded-full hover:scale-110 transition-transform"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                className="bg-white text-black p-2 rounded-full hover:scale-110 transition-transform"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
          </div>
        )}
      </div>
      <CardContent className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-base font-semibold leading-snug">{title}</h3>
          {/* Accessible external links — visible at all times for keyboard users */}
          <div className="flex gap-1 shrink-0">
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${title} live`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} source code on GitHub`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-1">{description}</p>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function SkillBar({ skill, percentage }: { skill: string; percentage: number }) {
  return (
    <div>
      <div className="flex justify-between mb-1.5 text-sm">
        <span className="font-medium">{skill}</span>
        <span className="text-muted-foreground tabular-nums">{percentage}%</span>
      </div>
      {/* transition-all on Progress indicator provides the 0→value animation */}
      <Progress value={percentage} className="h-2" />
    </div>
  )
}

function SkillCard({ skill, icon }: { skill: string; icon: React.ReactNode }) {
  return (
    <Card className="p-4 flex items-center gap-3 hover:border-primary transition-colors cursor-default">
      <div className="bg-primary/10 p-2.5 rounded-full text-primary shrink-0" aria-hidden="true">{icon}</div>
      <span className="font-medium text-sm">{skill}</span>
    </Card>
  )
}

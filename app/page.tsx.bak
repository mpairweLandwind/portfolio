"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowUp,
  Code,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Twitter,
  Cloud,
  Database,
  Cpu,
  BarChart,
  Globe,
  Smartphone,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      setShowBackToTop(window.scrollY > 700)

      // Determine active section based on scroll position
      const sections = ["home", "work", "skills", "about", "testimonials", "contact"]
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"}`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="font-bold text-xl">
            <span className="text-primary">ML</span>
          </div>
          <ul className="hidden md:flex space-x-8">
            {["home", "work", "skills", "about", "testimonials", "contact"].map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors hover:text-primary ${activeSection === item ? "text-primary font-medium" : ""}`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
          <div className="md:hidden">{/* Mobile menu button would go here */}</div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background"></div>
          <div className="absolute inset-0 bg-[url('/images/header.jpg')] bg-cover bg-center bg-fixed opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
              <span className="text-primary">Mpairwe Lauben</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-muted-foreground animate-fade-in-delay">
              A driven and accomplished Software Engineering student at Makerere University, based in Kampala, Uganda,
              with a proven ability to leverage advanced technical skills and experience to deliver innovative,
              high-quality solutions on time.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-delay-2">
              <Button onClick={() => scrollToSection("contact")} size="lg">
                Get in touch
              </Button>
              <Button variant="outline" size="lg" onClick={() => scrollToSection("work")}>
                View my work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 relative">
            My Work
            <span className="block h-1 w-20 bg-primary mt-4"></span>
          </h2>

          <Tabs defaultValue="all" className="mb-12">
            <TabsList className="mb-8 flex flex-wrap">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="cloud">Cloud Computing</TabsTrigger>
              <TabsTrigger value="iot">IoT</TabsTrigger>
              <TabsTrigger value="ml">Machine Learning</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
              <TabsTrigger value="web">Web</TabsTrigger>
              <TabsTrigger value="desktop">Desktop</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Cloud Computing Projects */}
              <ProjectCard
                title="AWS Serverless E-commerce Platform"
                description="A scalable e-commerce platform built using AWS Lambda, API Gateway, DynamoDB, and S3 for high availability and performance."
                image="/images/awsserveless.webp"
                tags={["AWS", "Serverless", "DynamoDB", "Lambda"]}
              />

              <ProjectCard
                title="Cloud-Based Healthcare Management System"
                description="A secure healthcare management system deployed on AWS with HIPAA compliance, utilizing EC2, RDS, and Cognito for authentication."
                image="/images/awsheath.webp"
                tags={["AWS", "EC2", "RDS", "Security"]}
              />

              {/* IoT Projects */}
              <ProjectCard
                title="Smart Home Automation System"
                description="An IoT-based home automation system using Raspberry Pi, Arduino, and AWS IoT Core for remote monitoring and control of home appliances."
                image="/images/securityauto.webp"
                tags={["IoT", "AWS IoT", "Raspberry Pi", "Arduino"]}
              />

              <ProjectCard
                title="Agricultural Monitoring System"
                description="An IoT solution for monitoring soil moisture, temperature, and humidity in agricultural fields, with data visualization and alerts."
                image="/images/openart-image_MH5vlRff_1744475821625_raw.jpg"
                tags={["IoT", "Sensors", "Data Visualization", "AWS"]}
              />

              {/* Machine Learning Projects */}
              <ProjectCard
                title="Predictive Maintenance Model"
                description="A machine learning model that predicts equipment failures before they occur, reducing downtime and maintenance costs for manufacturing clients."
                image="/images/predictive maintenance.webp"
                tags={["Machine Learning", "Python", "TensorFlow", "Data Analysis"]}
              />

              <ProjectCard
                title="Customer Sentiment Analysis"
                description="NLP-based sentiment analysis tool that processes customer feedback and social media mentions to gauge brand perception and customer satisfaction."
                image="/images/sentimentanalysisz.webp"
                tags={["NLP", "Machine Learning", "Python", "AWS Comprehend"]}
              />

              {/* Original Projects */}
              <ProjectCard
                title="Zaloni Dental Shop Management System"
                description="A management system designed and developed using Spring Boot to streamline inventory, sales, and employee management for Zaloni Dental Shop."
                image="/images/zaloni.png"
                tags={["Visual Basic", "Desktop Application"]}
              />

              <ProjectCard
                title="Zaloni Dental Hub"
                description="A modern Flutter-based application providing seamless access to dental services, appointments, and resources."
                image="/images/zaloni_icon.png"
                tags={["Flutter", "Mobile Application"]}
              />

              <ProjectCard
                title="Delipucash Mobile App"
                description="A React Native-based mobile app enabling fast and secure digital transactions for individuals and businesses."
                image="/images/delipucash.png"
                tags={["React Native", "Mobile Application"]}
              />

              <ProjectCard
                title="Task Management App"
                description="A Kotlin-based task management application designed to enhance productivity through effective task scheduling and tracking."
                image="/images/task.jpg"
                tags={["Kotlin", "Mobile Application"]}
              />

              <ProjectCard
                title="Blog Design"
                description="Designed and developed the WordPress blog malingageraldspongeman.com, providing an engaging platform for content creation and sharing."
                image="/images/blog.png"
                tags={["WordPress", "Web Design"]}
                link="https://malingageraldspongeman.com"
              />

              <ProjectCard
                title="My Portfolio"
                description="Professional portfolio website showcasing my skills, projects, and experience."
                image="/images/carreer.jpg"
                tags={["HTML", "CSS", "JavaScript"]}
                link=""
                github="https://github.com/mpairwelandwind/github-portfolio"
              />
            </TabsContent>

            {/* Cloud Computing Tab */}
            <TabsContent value="cloud" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProjectCard
                title="AWS Serverless E-commerce Platform"
                description="A scalable e-commerce platform built using AWS Lambda, API Gateway, DynamoDB, and S3 for high availability and performance."
                 image="/images/awsserveless.webp"
                tags={["AWS", "Serverless", "DynamoDB", "Lambda"]}
              />

              <ProjectCard
                title="Cloud-Based Healthcare Management System"
                description="A secure healthcare management system deployed on AWS with HIPAA compliance, utilizing EC2, RDS, and Cognito for authentication."
                image="/images/awsheath.webp"
                tags={["AWS", "EC2", "RDS", "Security"]}
              />
            </TabsContent>

            {/* IoT Tab */}
            <TabsContent value="iot" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProjectCard
                title="Smart Home Automation System"
                description="An IoT-based home automation system using Raspberry Pi, Arduino, and AWS IoT Core for remote monitoring and control of home appliances."
                image="/images/securityauto.webp"
                tags={["IoT", "AWS IoT", "Raspberry Pi", "Arduino"]}
              />

              <ProjectCard
                title="Agricultural Monitoring System"
                description="An IoT solution for monitoring soil moisture, temperature, and humidity in agricultural fields, with data visualization and alerts."
                image="/images/arola.png"
                tags={["IoT", "Sensors", "Data Visualization", "AWS"]}
              />
            </TabsContent>

            {/* Machine Learning Tab */}
            <TabsContent value="ml" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProjectCard
                title="Predictive Maintenance Model"
                description="A machine learning model that predicts equipment failures before they occur, reducing downtime and maintenance costs for manufacturing clients."
              image="/images/predictive maintenance.webp"
                tags={["Machine Learning", "Python", "TensorFlow", "Data Analysis"]}
              />

              <ProjectCard
                title="Customer Sentiment Analysis"
                description="NLP-based sentiment analysis tool that processes customer feedback and social media mentions to gauge brand perception and customer satisfaction."
                image="/images/sentimentanalysisz.webp"
                tags={["NLP", "Machine Learning", "Python", "AWS Comprehend"]}
              />
            </TabsContent>

            <TabsContent value="mobile" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProjectCard
                title="Zaloni Dental Hub"
                description="A modern Flutter-based application providing seamless access to dental services, appointments, and resources."
                image="/images/zaloni_icon.png"
                tags={["Flutter", "Mobile Application"]}
              />

              <ProjectCard
                title="Delipucash Mobile App"
                description="A React Native-based mobile app enabling fast and secure digital transactions for individuals and businesses."
                image="/images/delipucash.png"
                tags={["React Native", "Mobile Application"]}
              />

              <ProjectCard
                title="Task Management App"
                description="A Kotlin-based task management application designed to enhance productivity through effective task scheduling and tracking."
                image="/images/task.jpg"
                tags={["Kotlin", "Mobile Application"]}
              />
            </TabsContent>

            <TabsContent value="web" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProjectCard
                title="Blog Design"
                description="Designed and developed the WordPress blog malingageraldspongeman.com, providing an engaging platform for content creation and sharing."
                image="/images/blog.png"
                tags={["WordPress", "Web Design"]}
                link="https://malingageraldspongeman.com"
              />

              <ProjectCard
                title="My Portfolio"
                description="Professional portfolio website showcasing my skills, projects, and experience."
                image="/images/carreer.jpg"
                tags={["HTML", "CSS", "JavaScript"]}
                link="https://lauben.sh"
                github="https://github.com/mpairwelandwind/github-portfolio"
              />
            </TabsContent>

            <TabsContent value="desktop" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProjectCard
                title="Zaloni Dental Shop Management System"
                description="A management system designed and developed using Spring Boot to streamline inventory, sales, and employee management for Zaloni Dental Shop."
                image="/images/zaloni.png"
                tags={["Visual Basic", "Desktop Application"]}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 relative">
            My Skills
            <span className="block h-1 w-20 bg-primary mt-4"></span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-6">Technical Skills</h3>

              <div className="space-y-6">
                {/* Cloud Computing Skills */}
                <SkillBar skill="AWS (EC2, Lambda, S3, DynamoDB)" percentage={92} />
                <SkillBar skill="Cloud Architecture & DevOps" percentage={88} />
                <SkillBar skill="Serverless Computing" percentage={85} />

                {/* IoT Skills */}
                <SkillBar skill="IoT Development (Arduino, Raspberry Pi)" percentage={90} />
                <SkillBar skill="Sensor Integration & Data Processing" percentage={87} />
                <SkillBar skill="AWS IoT Core" percentage={85} />

                {/* Machine Learning Skills */}
                <SkillBar skill="Machine Learning & Data Science" percentage={88} />
                <SkillBar skill="TensorFlow & PyTorch" percentage={85} />
                <SkillBar skill="Natural Language Processing" percentage={82} />

                {/* Original Skills */}
                <SkillBar skill="Java (Spring Boot, Kotlin)" percentage={90} />
                <SkillBar skill="JavaScript (React, TypeScript, NextJS)" percentage={85} />
                <SkillBar skill="Flutter" percentage={80} />
                <SkillBar skill="React Native" percentage={85} />
                <SkillBar skill="Database Management (MySQL, PostgreSQL, MongoDB)" percentage={75} />
                <SkillBar skill="PHP (Laravel)" percentage={70} />
                <SkillBar skill="Node.js (Express, Prisma)" percentage={80} />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Professional Skills</h3>

              <div className="grid grid-cols-2 gap-4">
                <SkillCard skill="Cloud Computing" icon={<Cloud className="h-6 w-6" />} />
                <SkillCard skill="IoT Development" icon={<Cpu className="h-6 w-6" />} />
                <SkillCard skill="Machine Learning" icon={<BarChart className="h-6 w-6" />} />
                <SkillCard skill="Data Analysis" icon={<Database className="h-6 w-6" />} />
                <SkillCard skill="Web Development" icon={<Globe className="h-6 w-6" />} />
                <SkillCard skill="Mobile Development" icon={<Smartphone className="h-6 w-6" />} />
                <SkillCard skill="Problem Solving" icon={<Code className="h-6 w-6" />} />
                <SkillCard skill="Team Collaboration" icon={<Code className="h-6 w-6" />} />
                <SkillCard skill="Project Management" icon={<Code className="h-6 w-6" />} />
                <SkillCard skill="UI/UX Design" icon={<Code className="h-6 w-6" />} />
                <SkillCard skill="Agile Methodology" icon={<Code className="h-6 w-6" />} />
                <SkillCard skill="Technical Writing" icon={<Code className="h-6 w-6" />} />
              </div>
            </div>
          </div>

          {/* Technology Expertise Section */}
          <div className="mt-16">
            <h3 className="text-xl font-semibold mb-8">Technology Expertise</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Cloud Computing */}
              <Card className="p-6 hover:shadow-lg transition-shadow border-t-4 border-t-blue-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-500/10 p-3 rounded-full">
                    <Cloud className="h-6 w-6 text-blue-500" />
                  </div>
                  <h4 className="text-lg font-medium">Cloud Computing</h4>
                </div>
                <p className="text-muted-foreground mb-4">
                  Expert in designing and implementing scalable, secure cloud solutions using AWS services including
                  EC2, Lambda, S3, DynamoDB, and more.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">AWS</Badge>
                  <Badge variant="outline">Serverless</Badge>
                  <Badge variant="outline">Microservices</Badge>
                  <Badge variant="outline">DevOps</Badge>
                  <Badge variant="outline">CI/CD</Badge>
                </div>
              </Card>

              {/* IoT */}
              <Card className="p-6 hover:shadow-lg transition-shadow border-t-4 border-t-green-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-green-500/10 p-3 rounded-full">
                    <Cpu className="h-6 w-6 text-green-500" />
                  </div>
                  <h4 className="text-lg font-medium">Internet of Things</h4>
                </div>
                <p className="text-muted-foreground mb-4">
                  Specialized in developing IoT solutions that connect physical devices to the cloud, enabling real-time
                  monitoring, data collection, and automation.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Arduino</Badge>
                  <Badge variant="outline">Raspberry Pi</Badge>
                  <Badge variant="outline">AWS IoT</Badge>
                  <Badge variant="outline">Sensors</Badge>
                  <Badge variant="outline">MQTT</Badge>
                </div>
              </Card>

              {/* Machine Learning */}
              <Card className="p-6 hover:shadow-lg transition-shadow border-t-4 border-t-purple-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-purple-500/10 p-3 rounded-full">
                    <BarChart className="h-6 w-6 text-purple-500" />
                  </div>
                  <h4 className="text-lg font-medium">Machine Learning</h4>
                </div>
                <p className="text-muted-foreground mb-4">
                  Proficient in developing and deploying machine learning models for predictive analytics, natural
                  language processing, and computer vision applications.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">TensorFlow</Badge>
                  <Badge variant="outline">PyTorch</Badge>
                  <Badge variant="outline">NLP</Badge>
                  <Badge variant="outline">Python</Badge>
                  <Badge variant="outline">Data Science</Badge>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 relative">
            About Me
            <span className="block h-1 w-20 bg-primary mt-4"></span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 blur-xl"></div>
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src="/images/lauben.jpg"
                  alt="Mpairwe Lauben"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover rounded-xl"
                />
              </div>
            </div>

            <div>
              <p className="text-lg mb-6">
                I am Mpairwe Lauben, a passionate Software Engineering student at Makerere University with expertise in
                cloud computing, IoT, and machine learning.
              </p>
              <p className="text-lg mb-6">
                I specialize in creating innovative software solutions, with expertise in Python, Java (Kotlin and
                Spring Boot), Flutter, React Native, and database systems. My journey is driven by the desire to solve
                real-world problems and deliver impactful systems.
              </p>
              <p className="text-lg mb-6">
                My recent focus has been on cloud-native applications using AWS, IoT solutions for smart systems, and
                machine learning models that provide actionable insights from complex data.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <h4 className="font-semibold mb-2">Name:</h4>
                  <p>Mpairwe Lauben</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Email:</h4>
                  <p>mpairwelauben22@gmail.com</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Location:</h4>
                  <p>Kampala, Uganda</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Education:</h4>
                  <p>Makerere University</p>
                </div>
              </div>
              <Button asChild className="btn">
  <Link href="/images/resume.pdf" download>
    Download Resume
  </Link>
</Button>


            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 relative">
            Testimonials
            <span className="block h-1 w-20 bg-primary mt-4"></span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Mpairwe's cloud architecture expertise transformed our infrastructure, resulting in a 40% reduction in operational costs and significantly improved scalability."
              author="Tech Lead, Healthcare Solutions"
              role="AWS Cloud Migration Project"
            />

            <TestimonialCard
              quote="The IoT solution Lauben developed for our agricultural monitoring needs has revolutionized how we manage our farms. Real-time data and predictive insights have increased our yield by 25%."
              author="Operations Director, AgriTech"
              role="IoT Implementation"
            />

            <TestimonialCard
              quote="Mpairwe's machine learning model for customer sentiment analysis has given us unprecedented insights into customer satisfaction, helping us improve our services proactively."
              author="Marketing Director, E-commerce Platform"
              role="ML Implementation"
            />

            <TestimonialCard
              quote="Mpairwe delivered an exceptional mobile application that exceeded our expectations. His technical expertise and attention to detail were impressive."
              author="Client from Zaloni Dental"
              role="Project Manager"
            />

            <TestimonialCard
              quote="Working with Lauben was a pleasure. He understood our requirements perfectly and delivered a solution that transformed our business operations."
              author="Delipucash Team"
              role="CEO"
            />

            <TestimonialCard
              quote="Lauben's work on our blog design was outstanding. He created a user-friendly interface that has significantly increased our engagement metrics."
              author="Gerald Malinga"
              role="Blog Owner"
            />
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 relative">
            Clients & Collaborations
            <span className="block h-1 w-20 bg-primary mt-4"></span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            <div className="flex justify-center">
              <Image
                src="/images/zaloni.png"
                alt="Zaloni"
                width={200}
                height={100}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/mak.png"
                alt="Makerere University"
                width={200}
                height={100}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/delipucash.png"
                alt="Delipucash"
                width={200}
                height={100}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/webinfo.png"
                alt="WebInfo"
                width={200}
                height={100}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/arola.png"
                alt="Arola"
                width={200}
                height={100}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/blog.png"
                alt="Blog"
                width={200}
                height={100}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 relative">
            Get in Touch
            <span className="block h-1 w-20 bg-primary mt-4"></span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-lg mb-6">
                Are you seeking consultancy on cloud computing, IoT development, machine learning, or traditional
                software development? Do you have a project idea, need guidance, or simply wish to connect? Feel free to
                reach out! I specialize in providing tailored solutions and advice to meet your unique needs. Let's
                create impactful solutions together that leverage the latest in cloud computing, IoT, and machine
                learning technologies.
              </p>

              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <a
                      href="mailto:mpairwelauben22@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      mpairwelauben22@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Linkedin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">LinkedIn</h4>
                    <a
                      href="https://www.linkedin.com/in/mpairwe-lauben-4a1461344/"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      linkedin.com/mpairwelauben
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Github className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">GitHub</h4>
                    <a
                      href="https://github.com/mpairweLandwind/"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      github.com/mpairweLandwind
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 rounded-md border border-input bg-background"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 rounded-md border border-input bg-background"
                      placeholder="Your email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 rounded-md border border-input bg-background"
                    placeholder="Subject"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 rounded-md border border-input bg-background resize-none"
                    placeholder="Your message"
                  ></textarea>
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <p className="text-muted-foreground">&copy; {new Date().getFullYear()} - Portfolio by Mpairwe Lauben</p>
            </div>

            <div className="flex space-x-4">
              <Link
                href="https://twitter.com/mpairwelauben/"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://github.com/mpairweLandwind/"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://www.linkedin.com/mpairwelauben/"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="mailto:mpairwelauben22@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg transition-all duration-300 ${showBackToTop ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </main>
  )
}

// Component for project cards
function ProjectCard({
  title,
  description,
  image,
  tags,
  link,
  github,
}: {
  title: string
  description: string
  image: string
  tags: string[]
  link?: string
  github?: string
}) {
  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-lg">
      <div className="relative overflow-hidden">
        <Image
          src={image || "/images/carreer.jpg"}
          alt={title}
          width={800}
          height={600}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {(link || github) && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white p-2 rounded-full"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black p-2 rounded-full"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Component for skill bars
function SkillBar({ skill, percentage }: { skill: string; percentage: number }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="font-medium">{skill}</span>
        <span>{percentage}%</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  )
}

// Component for skill cards
function SkillCard({ skill, icon }: { skill: string; icon: React.ReactNode }) {
  return (
    <Card className="p-4 flex items-center gap-4 hover:border-primary transition-colors">
      <div className="bg-primary/10 p-3 rounded-full text-primary">{icon}</div>
      <div className="font-medium">{skill}</div>
    </Card>
  )
}

// Component for testimonial cards
function TestimonialCard({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="mb-4 text-primary">
        <svg width="45" height="36" className="fill-current opacity-75">
          <path d="M13.415.001C6.07 5.185.887 13.681.887 23.041c0 7.632 4.608 12.096 9.936 12.096 5.04 0 8.784-4.032 8.784-8.784 0-4.752-3.312-8.208-7.632-8.208-.864 0-2.016.144-2.304.288.72-4.896 5.328-10.656 9.936-13.536L13.415.001zm24.768 0c-7.2 5.184-12.384 13.68-12.384 23.04 0 7.632 4.608 12.096 9.936 12.096 4.896 0 8.784-4.032 8.784-8.784 0-4.752-3.456-8.208-7.776-8.208-.864 0-1.872.144-2.16.288.72-4.896 5.184-10.656 9.792-13.536L38.183.001z" />
        </svg>
      </div>
      <p className="mb-6 italic">{quote}</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </Card>
  )
}

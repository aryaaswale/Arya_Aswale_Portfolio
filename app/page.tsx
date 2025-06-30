"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  ChevronRight,
  ArrowDown,
  Sparkles,
  Heart,
  Star,
  Zap,
  Palette,
  Monitor,
  Smartphone,
  Mail,
  Github,
  Linkedin,
  Instagram,
  ExternalLink,
  Play,
  Pause,
} from "lucide-react"

// Custom cursor component - improved version
function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)
    const handleMouseLeaveWindow = () => setIsVisible(false)

    window.addEventListener("mousemove", updateMousePosition)
    window.addEventListener("mouseleave", handleMouseLeaveWindow)

    const hoverElements = document.querySelectorAll('button, a, [data-hover="true"]')
    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mouseleave", handleMouseLeaveWindow)
      hoverElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full pointer-events-none z-50 hidden md:block"
      style={{
        left: mousePosition.x - 8,
        top: mousePosition.y - 8,
      }}
      animate={{
        scale: isHovering ? 1.5 : 1,
        opacity: isVisible ? 0.8 : 0,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  )
}

// Floating shapes component
function FloatingShapes() {
  const shapes = [
    { icon: Sparkles, color: "text-yellow-400", delay: 0 },
    { icon: Heart, color: "text-pink-400", delay: 0.5 },
    { icon: Star, color: "text-blue-400", delay: 1 },
    { icon: Zap, color: "text-purple-400", delay: 1.5 },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute ${shape.color}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
            y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: shape.delay,
            ease: "easeInOut",
          }}
        >
          <shape.icon className="w-6 h-6" />
        </motion.div>
      ))}
    </div>
  )
}

// Carousel component
function Carousel({ items, title, category }: { items: any[]; title: string; category: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [items.length, isAutoPlaying])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
          >
            {title}
          </motion.h2>
          <Badge className="mt-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0">{category}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="rounded-full border-2 border-purple-300 hover:bg-purple-100"
          >
            {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="rounded-full border-2 border-purple-300 hover:bg-purple-100 bg-transparent"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-full border-2 border-purple-300 hover:bg-purple-100 bg-transparent"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl">
        <motion.div
          className="flex"
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {items.map((item, index) => (
            <div key={index} className="w-full flex-shrink-0 px-2">
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative group"
              >
                <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
                  <CardContent className="p-0">
                    <div className="aspect-[16/10] bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center relative overflow-hidden">
                      {/* Placeholder for your images */}
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-200/50 to-purple-200/50" />
                      <div className="text-center z-10">
                        <item.icon className="w-16 h-16 mx-auto mb-4 text-purple-500" />
                        <p className="text-lg font-semibold text-gray-700">
                          Replace with your {category.toLowerCase()} image
                        </p>
                        <p className="text-sm text-gray-500 mt-2">Image dimensions: 1600x1000px recommended</p>
                      </div>

                      {/* Hover overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-8"
                      >
                        <Button className="bg-white text-black hover:bg-gray-100 rounded-full">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Project
                        </Button>
                      </motion.div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {item.tags.map((tag: string, tagIndex: number) => (
                          <Badge key={tagIndex} variant="secondary" className="bg-purple-100 text-purple-700">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center mt-6 gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-gradient-to-r from-pink-500 to-purple-500 scale-125"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function Portfolio() {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  // Sample data - replace with your actual projects
  const websiteDesigns = [
    {
      title: "E-commerce Platform",
      description: "Modern shopping experience with seamless checkout",
      tags: ["UI/UX", "E-commerce", "React"],
      icon: Monitor,
    },
    {
      title: "SaaS Dashboard",
      description: "Analytics dashboard for business intelligence",
      tags: ["Dashboard", "Data Viz", "SaaS"],
      icon: Monitor,
    },
    {
      title: "Portfolio Website",
      description: "Creative portfolio for digital artist",
      tags: ["Portfolio", "Creative", "Animation"],
      icon: Monitor,
    },
  ]

  const socialMediaAds = [
    {
      title: "Instagram Campaign",
      description: "Vibrant social media campaign for fashion brand",
      tags: ["Instagram", "Fashion", "Campaign"],
      icon: Instagram,
    },
    {
      title: "Facebook Ads",
      description: "Conversion-focused ad designs for tech startup",
      tags: ["Facebook", "Tech", "Conversion"],
      icon: Smartphone,
    },
    {
      title: "LinkedIn Carousel",
      description: "Professional carousel ads for B2B services",
      tags: ["LinkedIn", "B2B", "Professional"],
      icon: Linkedin,
    },
  ]

  const miscellaneousAds = [
    {
      title: "Banner Ads",
      description: "Display advertising for various platforms",
      tags: ["Display", "Banner", "Multi-platform"],
      icon: Palette,
    },
    {
      title: "Email Templates",
      description: "Responsive email designs for marketing campaigns",
      tags: ["Email", "Marketing", "Responsive"],
      icon: Mail,
    },
    {
      title: "Print Designs",
      description: "Brochures and flyers for offline marketing",
      tags: ["Print", "Brochure", "Offline"],
      icon: Sparkles,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 overflow-x-hidden">
      <CustomCursor />
      <FloatingShapes />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-4">
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-gradient-to-br from-pink-100/50 via-purple-100/50 to-blue-100/50"
        />

        <div className="text-center z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-black mb-6"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              style={{
                background: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #dda0dd)",
                backgroundSize: "400% 400%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Hey, I'm Alex! 👋
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-700 mb-8 font-medium"
          >
            UI/UX Designer crafting digital experiences that make people smile ✨
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white border-0 rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              data-hover="true"
            >
              <Mail className="w-5 h-5 mr-2" />
              Let's Chat!
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 rounded-full px-8 py-6 text-lg font-semibold bg-transparent"
              data-hover="true"
            >
              <Github className="w-5 h-5 mr-2" />
              View Code
            </Button>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="text-purple-500"
          >
            <ArrowDown className="w-8 h-8 mx-auto" />
            <p className="text-sm mt-2 font-medium">Scroll to explore my work</p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              About Me
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              I'm a passionate UI/UX designer who believes great design should be both beautiful and functional. I love
              creating digital experiences that not only look amazing but also solve real problems for real people. When
              I'm not designing, you'll find me exploring new design trends, sipping coffee, or binge-watching design
              tutorials! ☕
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Palette, title: "Creative Vision", desc: "Turning ideas into stunning visuals" },
              { icon: Zap, title: "Fast Execution", desc: "Quick turnaround without compromising quality" },
              { icon: Heart, title: "User-Centered", desc: "Designing with empathy and user needs in mind" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center"
              >
                <Card className="p-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Sections */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-32">
          {/* Website Designs */}
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Carousel items={websiteDesigns} title="Website Designs" category="Web Development" />
          </motion.div>

          {/* Social Media Ads */}
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Carousel items={socialMediaAds} title="Social Media Ads" category="Digital Marketing" />
          </motion.div>

          {/* Miscellaneous Digital Ads */}
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Carousel items={miscellaneousAds} title="Digital Advertising" category="Creative Design" />
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6">Let's Create Something Amazing! 🚀</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Ready to bring your ideas to life? I'd love to hear about your project and how we can work together!
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                data-hover="true"
              >
                <Mail className="w-5 h-5 mr-2" />
                hello@alexdesigns.com
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 rounded-full px-8 py-6 text-lg font-semibold bg-transparent"
                data-hover="true"
              >
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </Button>
            </div>

            <div className="flex justify-center gap-6">
              {[
                { icon: Github, label: "GitHub" },
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-purple-600 transition-all duration-300"
                  data-hover="true"
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-white text-center">
        <p className="text-gray-400">Made with ❤️ and lots of ☕ by Alex • © 2024 All rights reserved</p>
      </footer>
    </div>
  )
}

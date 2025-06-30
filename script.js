// Custom Cursor
document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.getElementById("custom-cursor")
  const hoverElements = document.querySelectorAll('button, a, [data-hover="true"]')

  // Update cursor position
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"
    cursor.style.opacity = "0.8"
  })

  // Hide cursor when leaving window
  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0"
  })

  // Hover effects
  hoverElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.classList.add("hover")
    })

    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover")
    })
  })
})

// Floating Shapes Animation
function initFloatingShapes() {
  const shapes = document.querySelectorAll(".floating-shape")

  shapes.forEach((shape, index) => {
    // Random initial position
    shape.style.left = Math.random() * window.innerWidth + "px"
    shape.style.top = Math.random() * window.innerHeight + "px"

    // Animate shapes
    setInterval(
      () => {
        const newX = Math.random() * window.innerWidth
        const newY = Math.random() * window.innerHeight

        shape.style.transition = "all 4s ease-in-out"
        shape.style.left = newX + "px"
        shape.style.top = newY + "px"
      },
      4000 + index * 1000,
    )
  })
}

// Carousel Functionality
class Carousel {
  constructor(name) {
    this.name = name
    this.currentSlide = 0
    this.track = document.getElementById(`${name}-track`)
    this.slides = this.track.querySelectorAll(".carousel-slide")
    this.dots = document.querySelectorAll(`#${name}-dots .dot`)
    this.playPauseBtn = document.getElementById(`${name}-play-pause`)
    this.isAutoPlaying = true
    this.autoPlayInterval = null

    this.init()
  }

  init() {
    this.startAutoPlay()
    this.setupPlayPause()
    this.updateDots()
  }

  goToSlide(index) {
    this.currentSlide = index
    const translateX = -index * 100
    this.track.style.transform = `translateX(${translateX}%)`
    this.updateDots()
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length
    this.goToSlide(this.currentSlide)
  }

  previousSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length
    this.goToSlide(this.currentSlide)
  }

  startAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval)
    }

    this.autoPlayInterval = setInterval(() => {
      if (this.isAutoPlaying) {
        this.nextSlide()
      }
    }, 3000)
  }

  toggleAutoPlay() {
    this.isAutoPlaying = !this.isAutoPlaying
    const icon = this.playPauseBtn.querySelector("i")

    if (this.isAutoPlaying) {
      icon.className = "fas fa-pause"
      this.startAutoPlay()
    } else {
      icon.className = "fas fa-play"
      clearInterval(this.autoPlayInterval)
    }
  }

  setupPlayPause() {
    this.playPauseBtn.addEventListener("click", () => {
      this.toggleAutoPlay()
    })
  }

  updateDots() {
    this.dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentSlide)
    })
  }
}

// Initialize Carousels
const carousels = {}

document.addEventListener("DOMContentLoaded", () => {
  // Initialize carousels
  carousels.websites = new Carousel("websites")
  carousels.social = new Carousel("social")
  carousels.digital = new Carousel("digital")

  // Initialize floating shapes
  initFloatingShapes()

  // Initialize scroll animations
  initScrollAnimations()
})

// Global carousel control functions
function nextSlide(carouselName) {
  carousels[carouselName].nextSlide()
}

function previousSlide(carouselName) {
  carousels[carouselName].previousSlide()
}

function goToSlide(carouselName, index) {
  carousels[carouselName].goToSlide(index)
}

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Observe all elements with animation classes
  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el)
  })
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add hover effects to project cards
document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroBackground = document.querySelector(".hero-background")

  if (heroBackground) {
    const speed = scrolled * 0.5
    heroBackground.style.transform = `translateY(${speed}px)`
  }
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.remove("loading")
})

// Responsive carousel touch support
document.addEventListener("DOMContentLoaded", () => {
  const carouselContainers = document.querySelectorAll(".carousel-container")

  carouselContainers.forEach((container) => {
    let startX = 0
    let currentX = 0
    let isDragging = false

    container.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX
      isDragging = true
    })

    container.addEventListener("touchmove", (e) => {
      if (!isDragging) return
      currentX = e.touches[0].clientX
    })

    container.addEventListener("touchend", () => {
      if (!isDragging) return
      isDragging = false

      const diffX = startX - currentX
      const carouselName = container.id.replace("-carousel", "")

      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          nextSlide(carouselName)
        } else {
          previousSlide(carouselName)
        }
      }
    })
  })
})

// Add click handlers for contact buttons
document.addEventListener("DOMContentLoaded", () => {
  // Email button
  const emailBtn = document.querySelector(".contact-buttons .btn:first-child")
  if (emailBtn) {
    emailBtn.addEventListener("click", () => {
      window.location.href = "mailto:hello@alexdesigns.com"
    })
  }

  // LinkedIn button
  const linkedinBtn = document.querySelector(".contact-buttons .btn:last-child")
  if (linkedinBtn) {
    linkedinBtn.addEventListener("click", () => {
      window.open("https://www.linkedin.com/in/aryaaswale99/")
    })
  }

  

    link.addEventListener("click", (e) => {
      e.preventDefault()
      window.open(urls[index], "_blank")
    })
  
})

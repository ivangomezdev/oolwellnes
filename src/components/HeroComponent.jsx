"use client"

import { useState, useEffect, useRef } from "react"
import "./heroComponent.css"
import Navbar from "./NavBar.jsx"
import "./Navbar.css"
import QuienesSomos from "./QuienesSomos"

const HeroComponent = () => {
  const [showLogo, setShowLogo] = useState(false)
  const [showNavbarLinks, setShowNavbarLinks] = useState(false)
  const [scrollDirection, setScrollDirection] = useState("none")
  const [showVideo, setShowVideo] = useState(false)
  const heroRef = useRef(null)
  const nextComponentRef = useRef(null)
  const lastScrollTop = useRef(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true)
    }, 3000)

    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop

      if (currentScrollTop <= 10) {
        setShowLogo(false)
        setShowNavbarLinks(false)
      }

      if (currentScrollTop > lastScrollTop.current) {
        setScrollDirection("down")
      } else {
        setScrollDirection("up")
      }
      lastScrollTop.current = currentScrollTop <= 0 ? 0 : currentScrollTop
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && entry.intersectionRatio <= 0.5 && scrollDirection === "down") {
          setShowLogo(true)
          setTimeout(() => {
            setShowNavbarLinks(true)
          }, 300)
        }
      },
      {
        threshold: [0, 0.5],
        rootMargin: "0px",
      }
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    const handleWheel = (event) => {
      if (event.deltaY > 0) {
        const heroRect = heroRef.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight

        if (
          heroRect.top < 0 &&
          heroRect.bottom > 0 &&
          heroRect.bottom < viewportHeight * 0.7 &&
          heroRect.bottom > viewportHeight * 0.3
        ) {
          if (nextComponentRef.current) {
            event.preventDefault()
            nextComponentRef.current.scrollIntoView({
              behavior: "smooth",
            })
            setShowLogo(true)
            setTimeout(() => {
              setShowNavbarLinks(true)
            }, 300)
          }
        }
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("wheel", handleWheel)
      if (heroRef.current) {
        observer.unobserve(heroRef.current)
      }
    }
  }, [scrollDirection])

  const forceHamburger = typeof window !== 'undefined' && window.innerWidth <= 740;

  return (
    <>
      <Navbar 
        showLogo={showLogo} 
        showLinks={showNavbarLinks} 
        forceHamburger={forceHamburger} 
      />
      <div className={`hero-container ${showVideo ? 'video-active' : ''}`} ref={heroRef}>
        <div className="section red">
          <img
            src="https://i.imgur.com/p7XkJdQ.jpeg"
            alt="Hero Image 1"
          />
          <div className="content"></div>
        </div>
        <div className="section gray">
          <div className="media-container">
            <video
              className={showVideo ? "fade-in" : "fade-out"}
              autoPlay
              playsInline
              preload="metadata"
              muted
              loop
            >
              <source
                src="https://i.imgur.com/npLIk4L.mp4"
                type="video/mp4"
              />
            </video>
            <img
              className={showVideo ? "fade-out" : "fade-in"}
              src="https://i.imgur.com/7aH10SL.jpeg"
              alt="Hero Image Temporary"
            />
          </div>
          <div className="content">
     
          </div>
        </div>
        <div className="section yellow">
          <img
            src="https://i.imgur.com/AsMPb3A.jpeg"
            alt="Hero Image 3"
          />
          <div className="content">

          </div>
        </div>
      </div>
      <div ref={nextComponentRef}>
        <QuienesSomos />
      </div>
    </>
  )
}

export default HeroComponent
"use client"

import { useState, useEffect, useRef } from "react"
import "./heroComponent.css"
import Navbar from "./navbar"
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
            src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1745978390/Rode_Tulum-111_uhlusw.jpg"
            alt="Hero Image 1"
          />
          <div className="content"></div>
        </div>
        <div className="section gray">
          <div className="media-container">
            <video
              className={showVideo ? "fade-in" : "fade-out"}
              autoPlay
              muted
              loop
            >
              <source
                src="https://res.cloudinary.com/dc5zbh38m/video/upload/v1745715439/We_ve_carefully_crafted_and_designed_this_experience_just_for_you.Featuring_the_best_spots_the_best_coaches_and_the_best_location_in_all_of_the_Riviera_Maya.The_countdown_has_begun_see_you_on_August_1_2_3_2025._vnakux.mp4"
                type="video/mp4"
              />
            </video>
            <img
              className={showVideo ? "fade-out" : "fade-in"}
              src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1745978572/VO_OolCorazon-3_1_wcwlup.jpg"
              alt="Hero Image Temporary"
            />
          </div>
          <div className="content">
     
          </div>
        </div>
        <div className="section yellow">
          <img
            src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1745978474/VOEUX_OolTakesOverTulum2-11_1_kqkeov.jpg"
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
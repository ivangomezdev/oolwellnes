"use client"

import { useState, useEffect } from "react"
import "./thePlaceTextAndImg.css"
import Image from "next/image"

const ThePlaceTextAndImg = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(3)
  const [selectedPlace, setSelectedPlace] = useState(null) // State for popup

  const places = [
    {
      id: 1,
      name: "Sol Terrace",
      image: "/images/sol-terrace.jpg",
      description: "Enjoy the vibrant atmosphere of our sunlit terrace, perfect for relaxing with a drink."
    },
    {
      id: 2,
      name: "Terra Room",
      image: "/images/terra-room.jpg",
      description: "A cozy and earthy space designed for intimate gatherings and events."
    },
    {
      id: 3,
      name: "Lua Room",
      image: "/images/lua-room.jpg",
      description: "Experience tranquility in our moon-inspired room with serene decor."
    },
    {
      id: 4,
      name: "Laranja",
      image: "/images/laranja.jpg",
      description: "A bright and zesty space with citrus-themed accents for lively events."
    },
    {
      id: 5,
      name: "Espacio Verde",
      image: "/images/espacio-verde.jpg",
      description: "Our green oasis, ideal for nature lovers and outdoor gatherings."
    },
    {
      id: 6,
      name: "Agua Room",
      image: "/images/agua-room.jpg",
      description: "A refreshing aquatic-themed room with calming water elements."
    },
  ]

  // Determine slides per view based on screen width
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1200) {
        setSlidesPerView(4)
      } else if (window.innerWidth <= 480) {
        setSlidesPerView(1)
      } else if (window.innerWidth <= 767) {
        setSlidesPerView(2)
      } else {
        setSlidesPerView(3)
      }
    }

    updateSlidesPerView()
    window.addEventListener("resize", updateSlidesPerView)
    return () => window.removeEventListener("resize", updateSlidesPerView)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= places.length - slidesPerView ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? places.length - slidesPerView : prevIndex - 1
    )
  }

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Handle image click to open popup
  const openPopup = (place) => {
    setSelectedPlace(place)
  }

  // Close popup
  const closePopup = () => {
    setSelectedPlace(null)
  }

  return (
    <div className="thePlaceText__cont">
      <h3>
        asda dasdasd asd asdas dasdas asdas dasdasd asd asdasdasdas dasd asd asd asd asdasdasd asdasdasda dasdasdad
      </h3>

      <div className="thePlaceText__imgs">
        <div className="carousel-container">
          <button className="arrow-btn prev-btn" onClick={prevSlide}>
            <span className="arrow"><Image alt="arrow" src={"https://res.cloudinary.com/dc5zbh38m/image/upload/v1745779085/mente-removebg-preview_1_gjy7z2.png"} width={100} height={100}/></span>
          </button>

          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)` }}
            >
              {places.map((place) => (
                <div className="carousel-slide" key={place.id} onClick={() => openPopup(place)}>
                  <div className="image-container">
                    <img src={place.image || "/placeholder.svg"} alt={place.name} />
                  </div>
                  <h4 className="place-name">{place.name}</h4>
                </div>
              ))}
            </div>
          </div>

          <button className="arrow-btn next-btn" onClick={nextSlide}>
            <span className="arrow"><Image src={"https://res.cloudinary.com/dc5zbh38m/image/upload/v1745779085/mente-removebg-preview_1_gjy7z2.png"} width={100} height={100}/></span>
          </button>
        </div>

        <div className="carousel-nav">
          {places.slice(0, places.length - slidesPerView + 1).map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Popup */}
      {selectedPlace && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-image-container">
              <img src={selectedPlace.image || "/placeholder.svg"} alt={selectedPlace.name} />
            </div>
            <div className="popup-description">
              <h4>{selectedPlace.name}</h4>
              <p>{selectedPlace.description}</p>
              <button className="popup-close-btn" onClick={closePopup}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ThePlaceTextAndImg
"use client"

import { useState } from "react"
import "./coach-selector.css"
import Image from "next/image"

const coachesData = [
  { id: 1, name: "Kristina Girod", image: "https://res.cloudinary.com/dc5zbh38m/image/upload/f_auto/v1747501028/Kristina_1_r48nut.png", bgImage: "https://res.cloudinary.com/dc5zbh38m/image/upload/f_auto/v1747501029/BackVerde_1_vanwwo.png" },
  { id: 2, name: "Pepe Abreu", image: "https://res.cloudinary.com/dc5zbh38m/image/upload/f_auto/v1747501028/Pepe_cy2jxy.png", bgImage: "https://res.cloudinary.com/dc5zbh38m/image/upload/f_auto/v1747501029/Backazul_j0piw0.png" },
  { id: 3, name: "Próximamente", image: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747527928/Majo_1_inlire.png", bgImage: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747527927/BackAmarillo_1_idaehc.png" },
]

export default function CoachSelector() {
  const [selectedCoach, setSelectedCoach] = useState(coachesData[0])
  const [isAnimating, setIsAnimating] = useState(false)

  const handleCoachSelect = (coach) => {
    if (selectedCoach.id !== coach.id) {
      setIsAnimating(true)
      setTimeout(() => {
        setSelectedCoach(coach)
        setIsAnimating(false)
      }, 500)
    }
  }

  return (
    <div
      className={`coach-selector ${isAnimating ? "coach-selector--animate" : ""}`}
      style={{
        backgroundImage: `url(${selectedCoach.bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease",
      }}
    >
      <div className="header-coaches">
        <h2 className="coach-selector__title">Talento</h2>
      </div>

      <div className="coach-selector__inner">
        <div className="coach-selector__content">
          <div
            className={`coach-selector__image-container ${
              isAnimating ? "coach-selector__image-container--fade-out" : "coach-selector__image-container--fade-in"
            }`}
          >
            <Image
              src={selectedCoach.image || "/placeholder.svg"}
              alt={`Foto de ${selectedCoach.name}`}
              className="coach-selector__image"
              width={500}
              height={500}
            />
          </div>

          <div
            className={`coach-selector__name-container ${
              isAnimating ? "coach-selector__name-container--fade-out" : "coach-selector__name-container--fade-in"
            }`}
          >
            <p className="coach-selector__name">{selectedCoach.name}</p>
          </div>
        </div>

<div className="coach-selector__buttons">
  {coachesData.map((coach) => (
    <button
      key={coach.id}
      className={`coach-selector__button ${
        selectedCoach.id === coach.id ? "coach-selector__button--active" : ""
      }`}
      onClick={() => handleCoachSelect(coach)}
    >
      <img
      
        style={{ width: "56px", height:"100px", backgroundImage: `url(${coach.bgImage})`,backgroundSize:"cover" }}
        src={coach.image}
        alt={`Icono de ${coach.name}`}
      />
    </button>
  ))}
</div>
      </div>
    </div>
  )
}
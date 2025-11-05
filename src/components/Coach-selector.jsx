"use client"

import { useState } from "react"
import "./coach-selector.css"
import Image from "next/image"

const coachesData = [
  { id: 1, name: "", image: "https://i.imgur.com/Hej8u0k.jpeg",bgImage:"https://i.imgur.com/vmmuSa8.png" },
  { id: 2, name: " ", image: "https://i.imgur.com/kxtsihO.jpeg",bgImage:"https://i.imgur.com/xHExNK4.png" },
  { id: 3, name: " ", image: "https://i.imgur.com/klqXfIq.jpeg",bgImage:"https://i.imgur.com/ffCU5ir.png" },
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
transition: "background-image 0.5s ease",
backgroundPosition:"center"
      }}
    >
      <div className="header-coaches">
        <h2 className="coach-selector__title">Talento</h2>
      </div>

      <div className="coach-selector__inner">
        <div className="coach-selector__content">
     

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
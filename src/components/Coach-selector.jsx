"use client"

import { useState, useEffect } from "react"
import "./coach-selector.css"

const coachesData = [
  { id: 1, name: "Pepe Abreu", image: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1746830353/The_soul_vibrates_higher_when_we_truly_connect.This_August_1__2___3__come_and_live_a_transformative_experience_with_PEPE_ABREU.Are_you_ready_to_feel_it__Connect_to_what_truly_matters-removebg-preview_zwfihn.png", bgImage: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745808467/bg_psumum.png" },
  { id: 2, name: "Kristina Girod", image: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1746830354/The_wait_is_over___We_re_thrilled_to_introduce_the_amazing_coach_Kristina_Girod__our_first_headliner.__And_to_make_it_even_better__the_presale_is_coming_soon__Get_ready_to_be_part_of_something_special_hhhrke.png", bgImage: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745774380/oool_bhe8w5.png" },
  { id: 3, name: "Juan Pérez", image: "/placeholder.svg?height=200&width=200", bgImage: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745808467/bg_psumum.png" },
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
        <h2 className="coach-selector__title">Coaches</h2>
      </div>

      <div className="coach-selector__inner">
        <div className="coach-selector__content">
          <div
            className={`coach-selector__image-container ${
              isAnimating ? "coach-selector__image-container--fade-out" : "coach-selector__image-container--fade-in"
            }`}
          >
            <img
              src={selectedCoach.image || "/placeholder.svg"}
              alt={`Foto de ${selectedCoach.name}`}
              className="coach-selector__image"
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
                style={{ width: "50px" }} // Aumentamos el tamaño de la imagen
                src={"https://res.cloudinary.com/dc5zbh38m/image/upload/v1745775146/alma-removebg-preview_kzfpoe.png"}
                alt="Icon"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
"use client"

import { useState, useEffect } from "react"
import "./coach-selector.css"

const coachesData = [
  { id: 1, name: "Pepe Abreu", image: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745716875/The_soul_vibrates_higher_when_we_truly_connect.This_August_1_2_3_come_and_live_a_transformative_experience_with_PEPE_ABREU.Are_you_ready_to_feel_it_Connect_to_what_truly_matters_hxindy.jpg" },
  { id: 2, name: "Kristina Girod", image: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745716876/The_wait_is_over_We_re_thrilled_to_introduce_the_amazing_coach_Kristina_Girod_our_first_headliner._And_to_make_it_even_better_the_presale_is_coming_soon_Get_ready_to_be_part_of_something_special._cjqisi.jpg" },
  { id: 3, name: "Juan Pérez", image: "/placeholder.svg?height=200&width=200" },
  { id: 4, name: "Ana Martínez", image: "/placeholder.svg?height=200&width=200" },
  { id: 5, name: "Roberto Sánchez", image: "/placeholder.svg?height=200&width=200" },
  { id: 6, name: "Laura Fernández", image: "/placeholder.svg?height=200&width=200" },
]

export default function CoachSelector() {
  const [selectedCoach, setSelectedCoach] = useState(coachesData[0])
  const [isAnimating, setIsAnimating] = useState(false)

  const handleCoachSelect = (coach) => {
    setIsAnimating(true)
    setTimeout(() => {
      setSelectedCoach(coach)
    }, 300)
  }

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isAnimating])

  return (
   <div className="coach-selector">
  <div className="header-coaches">
    <h2 className="coach-selector__title">Coaches</h2>
  </div>

  <div className="coach-selector__inner">
    <div className="coach-selector__content">
      <div className={`coach-selector__image-container ${isAnimating ? "coach-selector__image-container--fade-out" : ""}`}>
        <img
          src={selectedCoach.image || "/placeholder.svg"}
          alt={`Foto de ${selectedCoach.name}`}
          className="coach-selector__image"
        />
      </div>

      <div className={`coach-selector__name-container ${isAnimating ? "coach-selector__name-container--fade-out" : ""}`}>
        <p className="coach-selector__name">{selectedCoach.name}</p>
      </div>
    </div>

    <div className="coach-selector__buttons">
      {coachesData.map((coach) => (
        <button
          key={coach.id}
          className={`coach-selector__button ${selectedCoach.id === coach.id ? "coach-selector__button--active" : ""}`}
          onClick={() => handleCoachSelect(coach)}
        >
          coach{coach.id}
        </button>
      ))}
    </div>
  </div>
</div>

  )
}

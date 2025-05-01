"use client"

import { useEffect, useRef, useState } from "react"
import "./almaCuerpoMente.css"
import Image from "next/image"

export default function AlmaCuerpoMente() {
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.3,
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.disconnect()
      }
    }
  }, [])

  return (
    <div className={`alma-cuerpo-mente ${isVisible ? "alma-cuerpo-mente--visible" : ""}`} ref={containerRef}>
      <div className="alma-cuerpo-mente__content">
        <div className="alma-cuerpo-mente__words">
          {["Soul", "Body", "Mind"].map((text, index) => (
            <div
              key={text}
              className="alma-cuerpo-mente__word"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <Image
                alt={text.toLowerCase()}
                src={`https://res.cloudinary.com/dc5zbh38m/image/upload/v174598197${index === 0 ? '6/Logo_Icono_SOUL_2_pxukpq.png' : index === 1 ? '7/Logo_Icono_Cuerpo_2_vahswu.png' : '7/Logo_Icono_Mente_1_cu5qom.png'}`}
                width={120}
                height={120}
              />
              <span className="alma-cuerpo-mente__text">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
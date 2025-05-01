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
        threshold: 0.5,
      },
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
    <div className="alma-cuerpo-mente" ref={containerRef}>
      <div className="alma-cuerpo-mente__content">
        <div className="alma-cuerpo-mente__words">
          <div className={`alma-cuerpo-mente__word ${isVisible ? "alma-cuerpo-mente__word--visible" : ""}`}>
            <Image alt="soul"  src={"https://res.cloudinary.com/dc5zbh38m/image/upload/v1745981976/Logo_Icono_SOUL_2_pxukpq.png"} width={120} height={120}/>
            <span className="alma-cuerpo-mente__text">Soul</span>
          </div>
          <div className={`alma-cuerpo-mente__word ${isVisible ? "alma-cuerpo-mente__word--visible" : ""}`}>
          <Image alt="body"  src={"https://res.cloudinary.com/dc5zbh38m/image/upload/v1745981977/Logo_Icono_Cuerpo_2_vahswu.png"} width={120} height={120}/>
            <span className="alma-cuerpo-mente__text">Body</span>
          </div>
          <div className={`alma-cuerpo-mente__word ${isVisible ? "alma-cuerpo-mente__word--visible" : ""}`}>
          <Image alt="mind" src={"https://res.cloudinary.com/dc5zbh38m/image/upload/v1745981977/Logo_Icono_Mente_1_cu5qom.png"} width={120} height={120}/>
            <span className="alma-cuerpo-mente__text">Mind</span>
          </div>
        </div>
      
      </div>
    </div>
  )
}
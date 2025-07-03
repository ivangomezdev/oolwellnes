"use client"

import "./MovementBar.css"
import Image from "next/image"

export default function MovementBar() {
  // Array de iconos con sus componentes y colores
  const icons = [
    { Icon: "https://res.cloudinary.com/dufp4z4gq/image/upload/v1751564510/Logo_Icono_SOUL_wcynom.png", color: "#eab308" },
    { Icon: "https://res.cloudinary.com/dufp4z4gq/image/upload/v1751564510/Logo_Icono_Mente_lvk3sa.png", color: "#1e293b" },
    { Icon: "https://res.cloudinary.com/dufp4z4gq/image/upload/v1751564509/Logo_Icono_Cuerpo_skxtfs.png", color: "#f59e0b" },
    { Icon: "https://res.cloudinary.com/dufp4z4gq/image/upload/v1751564510/Logo_Icono_SOUL_wcynom.png", color: "#ef4444" },
    { Icon: "https://res.cloudinary.com/dufp4z4gq/image/upload/v1751564510/Logo_Icono_Mente_lvk3sa.png", color: "#e11d48" },
    { Icon: "https://res.cloudinary.com/dufp4z4gq/image/upload/v1751564509/Logo_Icono_Cuerpo_skxtfs.png", color: "#10b981" },
    { Icon: "https://res.cloudinary.com/dufp4z4gq/image/upload/v1751564510/Logo_Icono_Mente_lvk3sa.png", color: "#a855f7" },
    { Icon: "https://res.cloudinary.com/dufp4z4gq/image/upload/v1751564510/Logo_Icono_SOUL_wcynom.png", color: "#06b6d4" },
  ]


  const repeatedIcons = [...icons, ...icons, ...icons, ...icons]

  return (
    <div className="movement-bar">
      <div className="movement-bar__container">
        <div className="movement-bar__track">
          {/* Primera copia del conjunto completo */}
          <div className="movement-bar__icons">
            {repeatedIcons.map((icon, index) => (
              <div className="movement-bar__icon" key={`icon-set1-${index}`}>
               <Image alt="movement" src={icon.Icon} width={32} height={32} style={{ color: icon.color,filter:"drop-shadow(1px 1px 4px rgb(238, 254, 222))"}} />
              </div>
            ))}
          </div>

          {/* Segunda copia del conjunto completo para crear el efecto infinito */}
          <div className="movement-bar__icons">
            {repeatedIcons.map((icon, index) => (
              <div className="movement-bar__icon" key={`icon-set2-${index}`}>
                <Image alt="icons" src={icon.Icon} width={32} height={32} style={{ color: icon.color }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
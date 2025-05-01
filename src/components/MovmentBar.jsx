"use client"

import "./MovementBar.css"
import Image from "next/image"

export default function MovementBar() {
  // Array de iconos con sus componentes y colores
  const icons = [
    { Icon: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745775146/cuerpo-removebg-preview_ukbvid.png", color: "#eab308" },
    { Icon: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745797587/move-removebg-preview_f9psa9.png", color: "#1e293b" },
    { Icon: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745779085/mente-removebg-preview_1_gjy7z2.png", color: "#f59e0b" },
    { Icon: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745775146/alma-removebg-preview_kzfpoe.png", color: "#ef4444" },
    { Icon: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745797579/mindfullnes-removebg-preview_iop81z.png", color: "#e11d48" },
    { Icon: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745797568/meditacion-removebg-preview_cntkbz.png", color: "#10b981" },
    { Icon: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745775146/alma-removebg-preview_kzfpoe.png", color: "#a855f7" },
    { Icon: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745797568/meditacion-removebg-preview_cntkbz.png", color: "#06b6d4" },
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
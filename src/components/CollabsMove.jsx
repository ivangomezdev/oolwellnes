"use client"

import "./CollabsMove.css"
import Image from "next/image"

export default function CollabsMove() {
  // Array de imágenes
  const icons = [
    { Icon: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747520119/mark_vw5b8h.png" },
    { Icon: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1746069835/Colaboradores_Mesa_de_trabajo_1_copia_3_mi4pfy.png" },
    { Icon: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747519830/maxresdefault_uoblio.png" },
    { Icon: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747519579/rode-up_uxey41.png" },
    { Icon: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747520392/Azul-e1724207354672_seovov.png" },

   
  ]

  const repeatedIcons = [...icons, ...icons, ...icons, ...icons]

  return (
    <div className="movement-barCollab">
      <div className="movement-bar__container">
        <div className="movement-bar__tracks">
          {/* Primera copia del conjunto completo */}
          <div className="movement-bar__icons">
            {repeatedIcons.map((icon, index) => (
              <div className="movement-bar__icon" key={`icon-set1-${index}`}>
                <Image
                  alt="movement"
                  src={icon.Icon}
                  width={192}
                  height={102}
                />
              </div>
            ))}
          </div>

          {/* Segunda copia del conjunto completo para crear el efecto infinito */}
          <div className="movement-bar__icons">
            {repeatedIcons.map((icon, index) => (
              <div className="movement-bar__icon" key={`icon-set2-${index}`}>
                <Image
                  alt="icons"
                  src={icon.Icon}
                  width={202}
                  height={172}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

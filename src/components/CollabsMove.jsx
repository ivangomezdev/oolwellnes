"use client"

import "./CollabsMove.css"
import Image from "next/image"

export default function CollabsMove() {
  // Array de imágenes
  const icons = [
    { Icon: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1746069829/Colaboradores_Mesa_de_trabajo_1_copia_4_phaie7.png" },
    { Icon: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1746069835/Colaboradores_Mesa_de_trabajo_1_copia_3_mi4pfy.png" },
    { Icon: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1746069835/Colaboradores_Mesa_de_trabajo_1_copia_2_czghhg.png" },
    { Icon: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1746070031/Colaboradores_Mesa_de_trabajo_1_lbjasp.png" },
    { Icon: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1746070031/Colaboradores_Mesa_de_trabajo_1_copia_oxajkw.png" },
    { Icon: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1746070031/Colaboradores_Mesa_de_trabajo_1_copia_7_qq8tyq.png" },
    { Icon: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1746070031/Colaboradores_Mesa_de_trabajo_1_copia_6_ktk8hs.png" },
    { Icon: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1746070035/Colaboradores_Mesa_de_trabajo_1_copia_5_h9rm2a.png" },
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
                  width={152}
                  height={152}
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
                  width={152}
                  height={152}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

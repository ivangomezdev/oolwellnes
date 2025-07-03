"use client"

import "./CollabsMove.css"
import Image from "next/image"

export default function CollabsMove() {
  const icons = [
    {
      Icon: "https://res.cloudinary.com/dtovwv8hi/image/upload/v1749062935/Colaboradores_Mesa_de_trabajo_1_copia_3_mi4pfy_bvmllt.png",
    },
    {
      Icon:
        "https://res.cloudinary.com/dtovwv8hi/image/upload/v1749062849/Azul-e1724207354672_seovov_u5jqxg.png",
    },
    {
      Icon: "https://res.cloudinary.com/dtovwv8hi/image/upload/v1749062849/maxresdefault_z5xaen_o3dyp9.png",
    },
 
    {
      Icon: "https://res.cloudinary.com/dtovwv8hi/image/upload/v1749062849/mark_vw5b8h_gboqc0.png",
    },
  ]

  const repeatedIcons = [...icons, ...icons, ...icons, ...icons]

  return (
    <div className="movement-barCollab">
      <div className="movement-bar__container">
        <div className="movement-bar__tracks">
          <div className="movement-bar__icons">
            {repeatedIcons.map((icon, index) => (
              <div
                className={`movement-bar__icon ${
                  icon.Icon.includes("Colaboradores_Mesa_de_trabajo_1_copia_3") ? "taller-icon" : ""
                }`}
                key={`icon-set1-${index}`}
              >
                <Image alt="movement" src={icon.Icon} width={192} height={102} />
              </div>
            ))}
          </div>

          <div className="movement-bar__icons">
            {repeatedIcons.map((icon, index) => (
              <div
                className={`movement-bar__icon ${
                  icon.Icon.includes("Colaboradores_Mesa_de_trabajo_1_copia_3") ? "taller-icon" : ""
                }`}
                key={`icon-set2-${index}`}
              >
                <Image alt="icons" src={icon.Icon} width={202} height={172} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

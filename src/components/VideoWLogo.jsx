"use client"

import { useEffect, useState } from "react"
import "./videoWLogo.css"


export default function VideoWLogo() {
  const [titleMoved, setTitleMoved] = useState(false)
  const [textVisible, setTextVisible] = useState(false)

  useEffect(() => {
    // Trigger title animation after component mounts
    setTimeout(() => {
      setTitleMoved(true)

      // Show text after title animation completes
      setTimeout(() => {
        setTextVisible(true)
      }, 1000) // Wait for title transition to complete
    }, 500)
  }, [])

  return (
    <div className="video-w-logo">
     
      <div className="video-w-logo__container">
        <div className="video-w-logo__video-section">
         <div className={`video-w-logo__overlay ${titleMoved ? "video-w-logo__overlay--hidden" : ""}`}>
  <img
    src="https://res.cloudinary.com/dtovwv8hi/image/upload/v1749062931/oollogo-removebg-preview_ehhgld_nqtdrv.png"
    alt="OOL Logo"
    className="video-w-logo__logo"
  />
</div>

          <div className="video-w-logo__video-placeholder"></div>
        </div>
      
      </div>
    </div>
  )
}

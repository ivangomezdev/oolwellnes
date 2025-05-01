

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
          <div className={`video-w-logo__title ${titleMoved ? "video-w-logo__title--hidden" : ""}`}>THIS IS OOL</div>
          <div className="video-w-logo__video-placeholder"></div>
        </div>
        <div className="video-w-logo__text-section">
          <video src="https://res.cloudinary.com/dc5zbh38m/video/upload/v1745893649/loop_vjxdwx.mp4"  autoPlay loop muted style={{width:"400px"}} />
          <div className={`video-w-logo__title-yellow ${titleMoved ? "video-w-logo__title-yellow--visible" : ""}`}>
          </div>
        </div>
      </div>
    </div>
  )
}

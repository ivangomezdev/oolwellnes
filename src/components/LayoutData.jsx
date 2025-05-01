import React from 'react'

import "./LayoutData.css"
import Image from 'next/image'
const LayoutData = () => {
  const images = [
    {src:"https://res.cloudinary.com/dc5zbh38m/image/upload/v1745797568/meditacion-removebg-preview_cntkbz.png",data:"img1"},
    {src:"https://res.cloudinary.com/dc5zbh38m/image/upload/v1745797579/mindfullnes-removebg-preview_iop81z.png",data:"dadsdsd"}
,  {src:"https://res.cloudinary.com/dc5zbh38m/image/upload/v1745797587/move-removebg-preview_f9psa9.png",data:"dadsdsd"}]
   
      return (
        <div className="layout">
          <h1 className="layout__title">¿Para que es esto?</h1>
    
          <div className="layout__content">
            <div className="layout__text-column">
              <div className="layout__text-area">
                <p>texto texto,texto texto texto texto,texto texto,texto texto,texto texto,texto texto.</p>
              </div>
            </div>
    
            <div className="layout__image-column">
              {images.map((i,index) => (
                <div key={index} className="layout__image-contain<er">
                  <div className="layout__image"><Image width={90 } height={70} src={i.src}/></div>
                </div>
              ))}
            </div>
    
            <div className="layout__right-column">
              <div className="layout__text-area">
                <p>texto texto texto texto,texto texto texto texto,texto texto,texto texto,texto texto,texto texto.</p>
              </div>
    
              <div className="layout__button-container">
                <button className="layout__button">boton</button>
              </div>
            </div>
          </div>
        </div>
      )
    }

export default LayoutData

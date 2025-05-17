import React from 'react'
import "./footer.css"
const Footer = () => {
  return (
    <div className='footer__cont'>
      <img src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1745979884/LogoOolWeb_ri9tvt.png" alt="" />
      <div className="card">
    <span className="card__title">Política de privacidad</span>
    <p className="card__content">Por favor asegúrate de leerlos solo te llevara 1 minuto.
    </p>
    <div className="card__form">
    <a style={{textDecoration:"none",color:"#9B956A"}} href="/politicas">Ver política de privacidad</a>
    </div>
</div>
    </div>
  )
}

export default Footer

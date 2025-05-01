import React from 'react'
import "./footer.css"
const Footer = () => {
  return (
    <div className='footer__cont'>
      <img src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1745979884/LogoOolWeb_ri9tvt.png" alt="" />
      <div className="card">
    <span className="card__title">Subscribe</span>
    <p className="card__content">Get fresh web design resources delivered straight to your inbox every week.
    </p>
    <div className="card__form">
        <input placeholder="Your Email" type="text"/>
        <button className="sign-up"> Sign up</button>
    </div>
</div>
    </div>
  )
}

export default Footer

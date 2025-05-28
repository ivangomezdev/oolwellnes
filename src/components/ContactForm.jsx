"use client"

import { useState, useRef } from "react"
import "./contactForm.css"
import Image from "next/image"
import { useLanguage } from "../context/LanguageContext.jsx"

const t = {
  es: {
    contact: "¡Contáctanos!",
    fullName: "Nombre completo",
    email: "Correo electrónico",
    phone: "Teléfono",
    phoneOptional: "Opcional",
    message: "¿Cómo podemos ayudarte?",
    send: "Enviar",
    privacy: "Al hacer clic en el botón aceptas la ",
    privacyPolicy: "política de privacidad",
    thanks: "¡Gracias por contactarnos!",
    happy: "¡Siempre estamos felices de ayudarte!",
  },
  en: {
    contact: "Contact us!",
    fullName: "Full name",
    email: "Email",
    phone: "Phone number",
    phoneOptional: "Optional",
    message: "How we can help?",
    send: "Send",
    privacy: "By clicking the button you agree to the ",
    privacyPolicy: "privacy policy",
    thanks: "Thanks for contacting us!",
    happy: "We are always happy to help!",
  },
};

const ContactForm = () => {
  const formRef = useRef()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { language } = useLanguage();

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la integración con emailjs
    console.log("Form data submitted:", formData)
    setIsSubmitted(true)
  }

  return (
    <div className="contactForm">
      <div className="contactForm__container">
        {!isSubmitted ? (
          <div className="contactForm__content">
            <h2 className="contactForm__title">{t[language].contact}</h2>
            <form ref={formRef} className="contactForm__form" onSubmit={handleSubmit}>
              <div className="contactForm__field">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="contactForm__input"
                  placeholder={t[language].fullName}
                  required
                />
              </div>

              <div className="contactForm__field">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="contactForm__input"
                  placeholder={t[language].email}
                  required
                />
              </div>

              <div className="contactForm__field">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="contactForm__input"
                  placeholder={t[language].phone}
                />
                <span className="contactForm__optional">{t[language].phoneOptional}</span>
              </div>

              <div className="contactForm__field">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="contactForm__textarea"
                  placeholder={t[language].message}
                  required
                ></textarea>
              </div>

              <button type="submit" className="contactForm__button">
                {t[language].send}
              </button>

              <p className="contactForm__privacy">
                {t[language].privacy}
                <a href="#" className="contactForm__link">
                  {t[language].privacyPolicy}
                </a>
                .
              </p>
            </form>
          </div>
        ) : (
          <div className="contactForm__success">
            <div className="contactForm__successBubble">
              <h3 className="contactForm__successTitle">{t[language].thanks}</h3>
              <p className="contactForm__successText">{t[language].happy}</p>
            </div>
          </div>
        )}
        <Image alt="logo" src={"https://res.cloudinary.com/dc5zbh38m/image/upload/v1747102896/LIFESTYLE-EC-AGO2021-003_-_VIP_qv2gqr.jpg"} width={700} height={860} />
      </div>
    </div>
  )
}

export default ContactForm
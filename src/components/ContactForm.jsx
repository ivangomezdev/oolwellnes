"use client"

import { useState, useRef } from "react"
import "./contactForm.css"
import Image from "next/image"

const ContactForm = () => {
  const formRef = useRef()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Here you would integrate with emailjs
    // Example:
    // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formRef.current, 'YOUR_PUBLIC_KEY')
    //   .then((result) => {
    //     console.log('Email sent successfully:', result.text);
    //     setIsSubmitted(true);
    //   }, (error) => {
    //     console.error('Failed to send email:', error.text);
    //   });

    // For demo purposes:
    console.log("Form data submitted:", formData)
    setIsSubmitted(true)
  }

  return (
    <div className="contactForm">
      <div className="contactForm__container">
        {!isSubmitted ? (
          <div className="contactForm__content">
            <h2 className="contactForm__title">Contactanos!</h2>
            <form ref={formRef} className="contactForm__form" onSubmit={handleSubmit}>
              <div className="contactForm__field">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="contactForm__input"
                  placeholder="Full name"
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
                  placeholder="Email"
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
                  placeholder="Phone number"
                />
                <span className="contactForm__optional">Optional</span>
              </div>

              <div className="contactForm__field">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="contactForm__textarea"
                  placeholder="How we can help?"
                  required
                ></textarea>
              </div>

              <button type="submit" className="contactForm__button">
                Send
              </button>

              <p className="contactForm__privacy">
                By clicking the button you agree to the{" "}
                <a href="#" className="contactForm__link">
                  privacy policy
                </a>
                .
              </p>
            </form>
          </div>
        ) : (
          <div className="contactForm__success">
            <div className="contactForm__successBubble">
              <h3 className="contactForm__successTitle">Thanks for contacting us!</h3>
              <p className="contactForm__successText">We are always happy to help!</p>
            </div>
          </div>
        )}
        <Image alt="logo" src={"https://res.cloudinary.com/dc5zbh38m/image/upload/v1745715216/IMG_3347_qsaieo.jpg"} width={700} height={860} />
      </div>
    </div>
  )
}

export default ContactForm

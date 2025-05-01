import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import "./contact.css"
import React from 'react'
import "@/components/Navbar.css"
import Image from 'next/image'
const page = () => {
  return (
    <div>
      <div className="navbar-container">
        <div className="nav-links left">
          <a href="#" className="nav-link home">
            Home
          </a>
          <a href="#" className="nav-link about">
            About
          </a>
        </div>
        <div className="navbar-logo"><Image src={"https://res.cloudinary.com/dc5zbh38m/image/upload/v1745778743/logo-removebg-preview_rckx9y.png"} alt='logo' width={120} height={80}/></div>
        <div className="nav-links right">
          <a href="#" className="nav-link services">
            Services
          </a>
          <a href="#" className="nav-link contact">
            Contact
          </a>
        </div>
      </div>
      <div className='contact__content'>
      <ContactForm/>
      <Footer/>
      </div>
    </div>
  )
}

export default page

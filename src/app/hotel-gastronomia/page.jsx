"use client"

import { useState } from "react"
import Image from "next/image"
import "./gastronomia.css"
import Link from "next/link";
import "../../components/Navbar.css";
export default function Home() {
  const [activeTab, setActiveTab] = useState<"restaurantes" | "bares">("bares")

  const [showLogo, setShowLogo] = useState(true);
  const [showNavbarLinks, setShowNavbarLinks] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuActive(!isMobileMenuActive);
  };

  return (
    <main className="page">
      <nav className={`navbar ${showLogo ? "logo-visible" : ""}`}>
              <div className="navbar-container">
                {/* Hamburger */}
                <div
                  className={`hamburger ${isMobileMenuActive ? "active" : ""}`}
                  onClick={toggleMobileMenu}
                >
                  <span className="bar"></span>
                  <span className="bar"></span>
                  <span className="bar"></span>
                </div>
      
                {/* Left nav links */}
                <div
                  className={`nav-links left ${showNavbarLinks ? "links-visible" : ""}`}
                >
                  <Link href="/" className="nav-link home">
                    Home
                  </Link>
                  <div
                    className="nav-link services dropdown"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    ÓOL Retreats
                    {servicesOpen && (
                      <div className="dropdown-menu">
                        <Link href="/oolExperience" className="dropdown-item">
                          Rivera Maya 2025
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
      
                {/* Logo */}
                <div className="navbarLogo2">
                  <Image
                    alt="logo"
                    src={
                      "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745891523/retreats-removebg-preview_plvlhh.png"
                    }
                    width={90}
                    height={90}
                  />
                </div>
      
                {/* Right nav links */}
                <div
                  className={`nav-links right ${showNavbarLinks ? "links-visible" : ""}`}
                >
                  <div
                    className="nav-link about dropdown"
                    onMouseEnter={() => setPopupOpen(true)}
                    onMouseLeave={() => setPopupOpen(false)}
                  >
                    Pop Up Experience
                    {popupOpen && (
                      <div className="dropdown-menu">
                        <Link href="/takes-over-tulum" className="dropdown-item">
                          Takes Over Tulum
                        </Link>
                        <Link
                          href="/takes-over-geely-cancun"
                          className="dropdown-item"
                        >
                          Takes Over Geely Cancun
                        </Link>
                        <Link href="/proximas" className="dropdown-item">
                          Proximas
                        </Link>
                      </div>
                    )}
                  </div>
      
                  <Link href="/contact" className="nav-link contact">
                    Contact
                  </Link>
                </div>
              </div>
      
              {/* Mobile menu */}
              <div className={`mobile-menu ${isMobileMenuActive ? "active" : ""}`}>
                <Link href="/" className="nav-link" onClick={toggleMobileMenu}>
                  Home
                </Link>
                <div className="dropdown-mobile">
                  Pop Up Experience
                  <div className="dropdown-menu-mobile" style={{ display: "none" }}>
                    <Link
                      href="/takes-over-tulum"
                      className="dropdown-item"
                      onClick={toggleMobileMenu}
                    >
                      Takes Over Tulum
                    </Link>
                    <Link
                      href="/takes-over-geely-cancun"
                      className="dropdown-item"
                      onClick={toggleMobileMenu}
                    >
                      Takes Over Geely Cancun
                    </Link>
                    <Link
                      href="/proximas"
                      className="dropdown-item"
                      onClick={toggleMobileMenu}
                    >
                      Proximas
                    </Link>
                  </div>
                </div>
                <div className="dropdown-mobile">
                  Retreats
                  <div className="dropdown-menu-mobile" style={{ display: "none" }}>
                    <Link
                      href="/oolExperience"
                      className="dropdown-item"
                      onClick={toggleMobileMenu}
                    >
                      Rivera Maya 2025
                    </Link>
                  </div>
                </div>
                <Link href="/contact" className="nav-link" onClick={toggleMobileMenu}>
                  Contact
                </Link>
              </div>
            </nav>
      <nav className="nav">
        <div className="nav__container">
          <button
            className={`nav__link ${activeTab === "restaurantes" ? "nav__link--active" : ""}`}
            onClick={() => setActiveTab("restaurantes")}
          >
            RESTAURANTES
          </button>
          <button
            className={`nav__link ${activeTab === "bares" ? "nav__link--active" : ""}`}
            onClick={() => setActiveTab("bares")}
          >
            BARES
          </button>
        </div>
      </nav>

      {activeTab === "bares" && <BaresContent />}
      {activeTab === "restaurantes" && <RestaurantesContent />}
    </main>
  )
}

function BaresContent() {
  return (
    <div className="bares">
      <section className="bares__header">

        <h1 className="bares__title">BARES</h1>
        <p className="bares__description">
          Para completar esta ópera culinaria, Hotel Xcaret Arte también cuenta con una mixología contemporánea y
          siempre magnífica.
        </p>
    
      </section>

      <section className="bares__item">
        <div className="bares__info">
          <h2 className="bares__item-title">CHANGARRITO</h2>
          <p className="bares__item-description">
            La preparación y presentación de cada uno de los cócteles está diseñada para sumar color y diversión a esta
            experiencia espirituosa frente al mar.
          </p>
        </div>
        <div className="bares__image-container">
          <Image
            src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1747444549/changarrito_hcypsp.webp"
            alt="Cocktail Changarrito"
            width={600}
            height={400}
            className="bares__image"
          />
        
        </div>
      </section>

      <section className="bares__item bares__item--reverse">
        <div className="bares__info">
          <h2 className="bares__item-title">CAFETECA</h2>
          <p className="bares__item-description">
            Nuestros baristas te guiarán para que disfrutes el análisis olfativo y gustativo detrás de una buena taza de
            café. Catas y conocimiento para atesorar toda la vida.
          </p>
        </div>
        <div className="bares__image-container">
          <Image src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1747444549/cafeteca_nxl1nd.webp" alt="Cafeteca coffee" width={600} height={400} className="bares__image" />
        </div>
      </section>

      <section className="bares__item">
        <div className="bares__info">
          <h2 className="bares__item-title">CAFECITO</h2>
          <p className="bares__item-description">
            Una barra de café de altura y un deli para endulzar tu paso por esta tu nueva casa.
          </p>
        </div>
        <div className="bares__image-container">
          <Image src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1747444549/cafecito_bowu49.webp" alt="Cafecito coffee" width={600} height={400} className="bares__image" />
        
        </div>
      </section>
    </div>
  )
}

function RestaurantesContent() {
  const restaurants = [

  
    {
      name: "ENCANTA",
      description:
        "Inspirado en la cocina del Caribe y del Golfo de México. Sabores frescos y vibrantes que te transportarán a las costas más hermosas.",
      image: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747443822/img-encanta-1_b2odmv.webp",
      chef: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747443821/paco-mendez_tu0atq.webp",
    },
    {
      name: "CHINO POBLANO",
      description:
        "Divertido y sofisticado abrazo culinario de estas dos culturas por el Chef Jonatan Gómez Luna, líder de una nueva generación de chefs que ha conquistado las grandes mesas del mundo.",
      image: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747443821/img-chino_poblano-1_l2bj7k.webp",
      chef: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747443821/jonatan-gomez_f2ddkb.webp",
    },
    {
      name: "V.I.P.Y.",
      description:
        "Gastronomía vegetal inspirada en sabores de México. Una celebración de ingredientes frescos y sostenibles.",
      image: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747443821/img-VI_AI_PY-1_bukjd6.webp",
      chef: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747443821/alejandro-ruiz_dawd4n.webp",
    },
   
    {
      name: "MERCADO SAN JUAN",
      description:
        "Homenaje a los sabores tradicionales mexicanos. Un recorrido por los mercados más emblemáticos del país.",
      image: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747443821/img-mercado_san_juan-1_penjkt.webp",
    },
    {
      name: "CAYUCO",
      description:
        "Sabores del Caribe mexicano en un ambiente relajado. Disfruta de los tesoros culinarios de la costa.",
      image: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747443820/img-cayuco-1_ykjbqk.webp",
    },
    {
      name: "TAH-XIDO",
      description:
        "Restaurante japonés contemporáneo del Chef Luis Arzapalo exponiendo lo mejor del arte gastronómico oriental",
      image: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747443820/img-tahxido-1_hupre7.webp",
      chef: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747443820/luis-arzapalo-chef_pgcyc8.webp",
    },
  ]

  return (
    <div className="restaurantes">
        <section className="bares__header">

        <h1 className="bares__title">RESTAURANTES</h1>
        <p className="bares__description">
          Experiencias gastronómicas a cargo del mejor Colectivo Gastronómico del país conformado por verdaderos artistas del sabor.
        </p>
    
      </section>
      {restaurants.map((restaurant, index) =>
        restaurant.isHeader ? (
          <section key={index} className="restaurantes__header">
            <h1 className="restaurantes__title">{restaurant.name}</h1>
            <p className="restaurantes__description">{restaurant.description}</p>
          </section>
        ) : (
          <section key={index} className={`bares__item ${index % 2 !== 0 ? "bares__item--reverse" : ""}`}>
            <div className="restaurantes__info">
              <h2 className="bares__item-title">{restaurant.name}</h2>
              <p className="bares__item-description">{restaurant.description}</p>
         
            </div>
            <div className="restaurantes__media">
              <div className="restaurantes__image-container">
                <Image
                  src={restaurant.image || "/placeholder.svg"}
                  alt={`Restaurante ${restaurant.name}`}
                  width={600}
                  height={400}
                  className="restaurantes__image"
                />
                {index === 0 && <button className="restaurantes__vista360">Vista 360</button>}
              </div>
              {restaurant.chef && (
                <div className="restaurantes__chef-container">
                  <Image
                    src={restaurant.chef || "/placeholder.svg"}
                    alt={`Chef de ${restaurant.name}`}
                    width={150}
                    height={200}
                    className="restaurantes__chef"
                  />
                </div>
              )}
            </div>
           
          </section>
        ),
        
      )}
           <section className="xcaret__cta-section">
          <h2 className="xcaret__cta-title">VER MÁS</h2>
          <div className="xcaret__buttons">
           <Link href={"/hotel-gastronomia"}> <button className="xcaret__button">Gastronomía</button></Link>
            <button className="xcaret__button">Spa & Wellness</button>
          </div>
        </section>
    </div>
  )
}

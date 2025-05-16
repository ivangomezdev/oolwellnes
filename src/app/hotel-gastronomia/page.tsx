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
            src="/images/changarrito.jpg"
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
          <Image src="/images/cafeteca.jpg" alt="Cafeteca coffee" width={600} height={400} className="bares__image" />
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
          <Image src="/images/cafecito.jpg" alt="Cafecito coffee" width={600} height={400} className="bares__image" />
        
        </div>
      </section>
    </div>
  )
}

function RestaurantesContent() {
  const restaurants = [
    {
      name: "COMER ES VIVIR",
      description:
        "El restaurante gastronómico donde cada experiencia culinaria es un acto de amor que nutre el cuerpo y el alma.",
      image: "/images/comer-es-vivir.jpg",
      isHeader: true,
    },
    {
      name: "XAAK",
      description:
        "La fusión de la cocina yucateca y libanesa, donde la tradición se encuentra con la innovación. Sabores que cuentan historias de dos culturas milenarias.",
      image: "/images/xaak.jpg",
      chef: "/images/chef-xaak.jpg",
    },
    {
      name: "ENCANTA",
      description:
        "Inspirado en la cocina del Caribe y del Golfo de México. Sabores frescos y vibrantes que te transportarán a las costas más hermosas.",
      image: "/images/encanta.jpg",
      chef: "/images/chef-encanta.jpg",
    },
    {
      name: "HA",
      description:
        "Cocina de autor donde cada plato es una obra de arte. Experiencia gastronómica de alto nivel con ingredientes locales y técnicas innovadoras.",
      image: "/images/ha.jpg",
      chef: "/images/chef-ha.jpg",
    },
    {
      name: "V.I.P.Y.",
      description:
        "Gastronomía vegetal inspirada en sabores de México. Una celebración de ingredientes frescos y sostenibles.",
      image: "/images/vipy.jpg",
      chef: "/images/chef-vipy.jpg",
    },
    {
      name: "CID KOH",
      description:
        "Fusión de sabores asiáticos con un toque mexicano. Descubre nuevas dimensiones culinarias en cada bocado.",
      image: "/images/cid-koh.jpg",
      chef: "/images/chef-cid-koh.jpg",
    },
    {
      name: "MERCADO SAN JUAN",
      description:
        "Homenaje a los sabores tradicionales mexicanos. Un recorrido por los mercados más emblemáticos del país.",
      image: "/images/mercado-san-juan.jpg",
    },
    {
      name: "CAYUCO",
      description:
        "Sabores del Caribe mexicano en un ambiente relajado. Disfruta de los tesoros culinarios de la costa.",
      image: "/images/cayuco.jpg",
    },
    {
      name: "TABSHO",
      description:
        "Una experiencia gastronómica inspirada en las técnicas ancestrales de cocción a la leña. Sabores auténticos y ahumados.",
      image: "/images/tabsho.jpg",
      chef: "/images/chef-tabsho.jpg",
    },
  ]

  return (
    <div className="restaurantes">
      {restaurants.map((restaurant, index) =>
        restaurant.isHeader ? (
          <section key={index} className="restaurantes__header">
            <h1 className="restaurantes__title">{restaurant.name}</h1>
            <p className="restaurantes__description">{restaurant.description}</p>
          </section>
        ) : (
          <section key={index} className={`restaurantes__item ${index % 2 !== 0 ? "restaurantes__item--reverse" : ""}`}>
            <div className="restaurantes__info">
              <h2 className="restaurantes__item-title">{restaurant.name}</h2>
              <p className="restaurantes__item-description">{restaurant.description}</p>
         
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

"use client"

import { useState } from "react"
import Image from "next/image"
import "./gastronomia.css"
import Link from "next/link"
import "../../components/Navbar.css"
import { useLanguage } from "../../context/LanguageContext.jsx"

const t = {
  es: {
    home: "Inicio",
    retreats: "ÓOL Retreats",
    popUp: "Pop Up Experience",
    contact: "Contacto",
    rivera: "Rivera Maya 2025",
    takesOverTulum: "Takes Over Tulum",
    takesOverGeely: "Takes Over Geely Cancun",
    upcoming: "Próximas",
    retreatsMobile: "Retreats",
    bares: "BARES",
    baresDesc: "Para completar esta ópera culinaria, Hotel Xcaret Arte también cuenta con una mixología contemporánea y siempre magnífica.",
    changarrito: "CHANGARRITO",
    changarritoDesc: "La preparación y presentación de cada uno de los cócteles está diseñada para sumar color y diversión a esta experiencia espirituosa frente al mar.",
    cafeteca: "CAFETECA",
    cafetecaDesc: "Nuestros baristas te guiarán para que disfrutes el análisis olfativo y gustativo detrás de una buena taza de café. Catas y conocimiento para atesorar toda la vida.",
    cafecito: "CAFECITO",
    cafecitoDesc: "Una barra de café de altura y un deli para endulzar tu paso por esta tu nueva casa.",
    restaurantes: "RESTAURANTES",
    restaurantesDesc: "Experiencias gastronómicas a cargo del mejor Colectivo Gastronómico del país conformado por verdaderos artistas del sabor.",
    vista360: "Vista 360",
  },
  en: {
    home: "Home",
    retreats: "ÓOL Retreats",
    popUp: "Pop Up Experience",
    contact: "Contact",
    rivera: "Rivera Maya 2025",
    takesOverTulum: "Takes Over Tulum",
    takesOverGeely: "Takes Over Geely Cancun",
    upcoming: "Upcoming",
    retreatsMobile: "Retreats",
    bares: "BARS",
    baresDesc: "To complete this culinary opera, Hotel Xcaret Arte also features contemporary and always magnificent mixology.",
    changarrito: "CHANGARRITO",
    changarritoDesc: "The preparation and presentation of each cocktail is designed to add color and fun to this spirited seaside experience.",
    cafeteca: "CAFETECA",
    cafetecaDesc: "Our baristas will guide you to enjoy the olfactory and gustatory analysis behind a good cup of coffee. Tastings and knowledge to treasure for a lifetime.",
    cafecito: "CAFECITO",
    cafecitoDesc: "A high-end coffee bar and deli to sweeten your stay in your new home.",
    restaurantes: "RESTAURANTS",
    restaurantesDesc: "Gastronomic experiences by the best Culinary Collective in the country, made up of true artists of flavor.",
    vista360: "360 View",
  },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("bares")
  const [showLogo, setShowLogo] = useState(true)
  const [showNavbarLinks, setShowNavbarLinks] = useState(true)
  const [popupOpen, setPopupOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false)

  const { language, toggleLanguage } = useLanguage();

  const toggleMobileMenu = () => {
    setIsMobileMenuActive(!isMobileMenuActive)
  }

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
              {t[language].home}
            </Link>
            <div
              className="nav-link services dropdown"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              {t[language].retreats}
              {servicesOpen && (
                <div className="dropdown-menu">
                  <Link href="/oolExperience" className="dropdown-item">
                    {t[language].rivera}
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
              {t[language].popUp}
              {popupOpen && (
                <div className="dropdown-menu">
                  <Link href="/takes-over-tulum" className="dropdown-item">
                    {t[language].takesOverTulum}
                  </Link>
                  <Link
                    href="/takes-over-geely-cancun"
                    className="dropdown-item"
                  >
                    {t[language].takesOverGeely}
                  </Link>
                  <Link href="/proximas" className="dropdown-item">
                    {t[language].upcoming}
                  </Link>
                </div>
              )}
            </div>

            <Link href="/contact" className="nav-link contact">
              {t[language].contact}
            </Link>
            {/* Botón de bandera para cambiar idioma */}
            <button
              className="lang-btn"
              onClick={toggleLanguage}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                marginLeft: "1rem",
                fontSize: "1.5rem",
                padding: 0,
              }}
              aria-label="Cambiar idioma"
            >
              {language === "es" ? (
                <img
                  src="https://flagcdn.com/es.svg"
                  alt="Español"
                  style={{ width: "2rem", height: "auto" }}
                />
              ) : (
                <img
                  src="https://flagcdn.com/gb.svg"
                  alt="English"
                  style={{ width: "2rem", height: "auto" }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu ${isMobileMenuActive ? "active" : ""}`}>
          <Link href="/" className="nav-link" onClick={toggleMobileMenu}>
            {t[language].home}
          </Link>
          <div className="dropdown-mobile">
            {t[language].popUp}
            <div className="dropdown-menu-mobile" style={{ display: "none" }}>
              <Link
                href="/takes-over-tulum"
                className="dropdown-item"
                onClick={toggleMobileMenu}
              >
                {t[language].takesOverTulum}
              </Link>
              <Link
                href="/takes-over-geely-cancun"
                className="dropdown-item"
                onClick={toggleMobileMenu}
              >
                {t[language].takesOverGeely}
              </Link>
              <Link
                href="/proximas"
                className="dropdown-item"
                onClick={toggleMobileMenu}
              >
                {t[language].upcoming}
              </Link>
            </div>
          </div>
          <div className="dropdown-mobile">
            <Link href="/oolExperience" className="nav-link" onClick={toggleMobileMenu}>
              {t[language].retreatsMobile}
            </Link>
            <div className="dropdown-menu-mobile" style={{ display: "none" }}>
              <Link
                href="/oolExperience"
                className="dropdown-item"
                onClick={toggleMobileMenu}
              >
                {t[language].rivera}
              </Link>
            </div>
          </div>
          <Link href="/contact" className="nav-link" onClick={toggleMobileMenu}>
            {t[language].contact}
          </Link>
          {/* Botón de bandera para cambiar idioma en menú móvil */}
          <button
            className="lang-btn"
            onClick={() => {
              toggleLanguage();
              setIsMobileMenuActive(false);
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              marginLeft: "1rem",
              fontSize: "1.5rem",
              padding: 0,
              marginTop: "1rem"
            }}
            aria-label="Cambiar idioma"
          >
            {language === "es" ? (
              <img
                src="https://flagcdn.com/es.svg"
                alt="Español"
                style={{ width: "2rem", height: "auto" }}
              />
            ) : (
              <img
                src="https://flagcdn.com/gb.svg"
                alt="English"
                style={{ width: "2rem", height: "auto" }}
              />
            )}
          </button>
        </div>
      </nav>
      <nav className="nav">
        <div className="nav__container">
          <button
            className={`nav__link ${activeTab === "restaurantes" ? "nav__link--active" : ""}`}
            onClick={() => setActiveTab("restaurantes")}
          >
            {t[language].restaurantes}
          </button>
          <button
            className={`nav__link ${activeTab === "bares" ? "nav__link--active" : ""}`}
            onClick={() => setActiveTab("bares")}
          >
            {t[language].bares}
          </button>
        </div>
      </nav>

      {activeTab === "bares" && <BaresContent language={language} />}
      {activeTab === "restaurantes" && <RestaurantesContent language={language} />}
    </main>
  )
}

function BaresContent({ language }) {
  return (
    <div className="bares">
      <section className="bares__header">
        <h1 className="bares__title">{t[language].bares}</h1>
        <p className="bares__description">
          {t[language].baresDesc}
        </p>
      </section>

      <section className="bares__item">
        <div className="bares__info">
          <h2 className="bares__item-title">{t[language].changarrito}</h2>
          <p className="bares__item-description">
            {t[language].changarritoDesc}
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
          <h2 className="bares__item-title">{t[language].cafeteca}</h2>
          <p className="bares__item-description">
            {t[language].cafetecaDesc}
          </p>
        </div>
        <div className="bares__image-container">
          <Image
            src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1747444549/cafeteca_nxl1nd.webp"
            alt="Cafeteca coffee"
            width={600}
            height={400}
            className="bares__image"
          />
        </div>
      </section>

      <section className="bares__item">
        <div className="bares__info">
          <h2 className="bares__item-title">{t[language].cafecito}</h2>
          <p className="bares__item-description">
            {t[language].cafecitoDesc}
          </p>
        </div>
        <div className="bares__image-container">
          <Image
            src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1747444549/cafecito_bowu49.webp"
            alt="Cafecito coffee"
            width={600}
            height={400}
            className="bares__image"
          />
        </div>
      </section>
    </div>
  )
}

function RestaurantesContent({ language }) {
  const restaurants = [
    {
      name: "ENCANTA",
      description: {
        es: "Inspirado en la cocina del Caribe y del Golfo de México. Sabores frescos y vibrantes que te transportarán a las costas más hermosas.",
        en: "Inspired by the cuisine of the Caribbean and the Gulf of Mexico. Fresh and vibrant flavors that will transport you to the most beautiful coasts.",
      },
      image: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747443822/img-encanta-1_b2odmv.webp",
      chef: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747443821/paco-mendez_tu0atq.webp",
    },
    {
      name: "CHINO POBLANO",
      description: {
        es: "Divertido y sofisticado abrazo culinario de estas dos culturas por el Chef Jonatan Gómez Luna, líder de una nueva generación de chefs que ha conquistado las grandes mesas del mundo.",
        en: "A fun and sophisticated culinary embrace of these two cultures by Chef Jonatan Gómez Luna, leader of a new generation of chefs who has conquered the world's great tables.",
      },
      image: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747443821/img-chino_poblano-1_l2bj7k.webp",
      chef: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747443821/jonatan-gomez_f2ddkb.webp",
    },
    {
      name: "V.I.P.Y.",
      description: {
        es: "Gastronomía vegetal inspirada en sabores de México. Una celebración de ingredientes frescos y sostenibles.",
        en: "Plant-based cuisine inspired by Mexican flavors. A celebration of fresh and sustainable ingredients.",
      },
      image: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747443821/img-VI_AI_PY-1_bukjd6.webp",
      chef: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747443821/alejandro-ruiz_dawd4n.webp",
    },
    {
      name: "MERCADO SAN JUAN",
      description: {
        es: "Homenaje a los sabores tradicionales mexicanos. Un recorrido por los mercados más emblemáticos del país.",
        en: "A tribute to traditional Mexican flavors. A journey through the country's most iconic markets.",
      },
      image: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747443821/img-mercado_san_juan-1_penjkt.webp",
    },
    {
      name: "CAYUCO",
      description: {
        es: "Sabores del Caribe mexicano en un ambiente relajado. Disfruta de los tesoros culinarios de la costa.",
        en: "Flavors of the Mexican Caribbean in a relaxed atmosphere. Enjoy the culinary treasures of the coast.",
      },
      image: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747443820/img-cayuco-1_ykjbqk.webp",
    },
    {
      name: "TAH-XIDO",
      description: {
        es: "Restaurante japonés contemporáneo del Chef Luis Arzapalo exponiendo lo mejor del arte gastronómico oriental",
        en: "Contemporary Japanese restaurant by Chef Luis Arzapalo showcasing the best of oriental culinary art.",
      },
      image: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747443820/img-tahxido-1_hupre7.webp",
      chef: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747443820/luis-arzapalo-chef_pgcyc8.webp",
    },
  ]

  return (
    <div className="restaurantes">
      <section className="bares__header">
        <h1 className="bares__title">{t[language].restaurantes}</h1>
        <p className="bares__description">
          {t[language].restaurantesDesc}
        </p>
      </section>
      {restaurants.map((restaurant, index) => (
        <section
          key={index}
          className={`bares__item ${index % 2 !== 0 ? "bares__item--reverse" : ""}`}
        >
          <div className="restaurantes__info">
            <h2 className="bares__item-title">{restaurant.name}</h2>
            <p className="bares__item-description">{restaurant.description[language]}</p>
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
              {index === 0 && <button className="restaurantes__vista360">{t[language].vista360}</button>}
            </div>
            {restaurant.chef && (
              <div className="restaurantes__chef-container">
                <Image
                  src={restaurant.chef}
                  alt={`Chef de ${restaurant.name}`}
                  width={150}
                  height={200}
                  className="restaurantes__chef"
                />
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
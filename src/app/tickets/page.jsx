"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import styles from "./styles/tickets.module.css";
import Image from "next/image";
import Link from "next/link";
import "../../components/Navbar.css";
import "./tickets.css";
import { useLanguage } from "../../context/LanguageContext.jsx";

// Validate Stripe public key
if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
  throw new Error(
    "Stripe public key is not configured. Check your .env.local file"
  );
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const ticketOptions = [
  {
    id: "kin-regular",
    name: { es: "KIN - Paquete Regular", en: "KIN - Regular Package" },
    price: 41000,
    priceId: "price_1RVQJBDEXHZiGUEk5wfLSxmB",
    features: {
      es: [
        "- 3 días / 2 noches en Hotel Xcaret Arte",
        "- Check-in temprano (desde 9AM) y check-out tardío (6PM)",
        "- Experiencia gourmet todo incluido – Menús diseñados por chefs con estrellas Michelin",
        "- All-Fun Inclusive – Acceso ilimitado a todos los parques y tours de Grupo Xcaret",
        "- Transporte redondo aeropuerto (CUN – hotel – CUN)",
        "- Social de bienvenida con DJ",
        "- Fiesta de cierre al atardecer",
        "- 6 sesiones de ciclismo de alta energía con coaches top como Kristina Girod, Pepe Abreu y Majo Ake",
        "- 2 sesiones de entrenamiento funcional",
        "- 1 sesión de terapia somática",
        "- 1 experiencia guiada de breathwork",
        "- Actividades de estilo de vida: kayak, paddle board, cerámica, ice bath, bordado",
        "- Conferencia de bienestar",
        "- Kit de bienvenida exclusivo",
      ],
      en: [
        "- 3 days / 2 nights at Hotel Xcaret Arte",
        "- Early Check-in (from 9AM) & Late Check-out (6PM)",
        "- All-Inclusive gourmet experience – Menus designed by Michelin-star chefs",
        "- All-Fun Inclusive – Unlimited access to all Grupo Xcaret parks and tours",
        "- Round-trip airport transportation (CUN – hotel – CUN)",
        "- Welcome Social Gathering with DJ",
        "- Closing Sunset Party",
        "- 6 high-energy cycling sessions with top coaches like Kristina Girod, Pepe Abreu, and Majo Ake",
        "- 2 functional training sessions",
        "- 1 somatic therapy session",
        "- 1 guided breathwork experience",
        "- Lifestyle activities: kayak, paddle board, ceramics, ice bath, embroidery",
        "- Wellness keynote",
        "- Exclusive Welcome Kit",
      ],
    },
    image:
      "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745774380/oool_bhe8w5.png",
  },
  {
    id: "ha-vip",
    name: { es: "HA - Paquete VIP", en: "HA - VIP Package" },
    price: 65000,
    priceId: "price_1RVQNBDEXHZiGUEk0hlcy2As",
    features: {
      es: [
        "3 días / 2 noches en Hotel Xcaret Arte (Suite Frente al Mar)",
        "Check-in temprano (desde 9AM) y check-out tardío (6PM)",
        "Experiencia gourmet todo incluido – Menús diseñados por chefs con estrellas Michelin",
        "All-Fun Inclusive – Acceso ilimitado a todos los parques y tours de Grupo Xcaret",
        "Transporte redondo aeropuerto (CUN – hotel – CUN)",
        "Social de bienvenida con DJ",
        "Fiesta de cierre al atardecer",
        "6 sesiones de ciclismo de alta energía con coaches top como Kristina Girod, Pepe Abreu y Majo Ake",
        "2 sesiones de entrenamiento funcional",
        "1 sesión de terapia somática",
        "1 experiencia guiada de breathwork",
        "Actividades de estilo de vida: kayak, paddle board, cerámica, ice bath, bordado",
        "Conferencia de bienestar",
        "Kit de bienvenida exclusivo",
      ],
      en: [
        "3 days / 2 nights at Hotel Xcaret Arte (Ocean Front Suite)",
        "Early Check-in (from 9AM) & Late Check-out (6PM)",
        "All-Inclusive gourmet experience – Menus designed by Michelin-star chefs",
        "All-Fun Inclusive – Unlimited access to all Grupo Xcaret parks and tours",
        "Round-trip airport transportation (CUN – hotel – CUN)",
        "Welcome Social Gathering with DJ",
        "Closing Sunset Party",
        "6 high-energy cycling sessions with top coaches like Kristina Girod, Pepe Abreu, and Majo Ake",
        "2 functional training sessions",
        "1 somatic therapy session",
        "1 guided breathwork experience",
        "Lifestyle activities: kayak, paddle board, ceramics, ice bath, embroidery",
        "Wellness keynote",
        "Exclusive Welcome Kit",
      ],
    },
    image:
      "https://res.cloudinary.com/dc5zbh38m/image/upload/v1746984297/tr_qxdvkx.png",
  },
];

const t = {
  es: {
    home: "Inicio",
    retreats: "ÓOL Retreats",
    popUp: "Pop Up Experience",
    contact: "Contacto",
    moreInfo: "Más info",
    getTickets: "Comprar boletos",
    getYourTickets: "¡Obtén tus boletos!",
    preSale: "Evento",
    rivera: '"Rivera Maya 2025"',
    close: "Cerrar",
    cancel: "Cancelar",
    pay: (price) => `Pagar $${price},00 MXN`,
    processing: "Procesando...",
    completePurchase: "Completa tu Compra",
    fullName: "Nombre Completo",
    enterFullName: "Ingresa tu nombre completo",
    email: "Correo Electrónico",
    enterEmail: "Ingresa tu correo electrónico",
    phone: "Número de Teléfono",
    enterPhone: "Ingresa tu número de teléfono",
    dob: "Fecha de Nacimiento",
    selectDob: "Selecciona tu fecha de nacimiento",
    nationality: "Nacionalidad",
    enterNationality: "Ingresa tu nacionalidad",
    takesOverTulum: "Takes Over Tulum",
    takesOverGeely: "Takes Over Geely Cancun",
    upcoming: "Próximas",
    retreatsMobile: "Retreats",
  },
  en: {
    home: "Home",
    retreats: "ÓOL Retreats",
    popUp: "Pop Up Experience",
    contact: "Contact",
    moreInfo: "More info",
    getTickets: "Get Tickets",
    getYourTickets: "Get your tickets!",
    preSale: "Sale",
    rivera: '"Rivera Maya 2025"',
    close: "Close",
    cancel: "Cancel",
    pay: (price) => `Pay $${price},00 MXN`,
    processing: "Processing...",
    completePurchase: "Complete your Purchase",
    fullName: "Full Name",
    enterFullName: "Enter your full name",
    email: "Email",
    enterEmail: "Enter your email",
    phone: "Phone Number",
    enterPhone: "Enter your phone number",
    dob: "Date of Birth",
    selectDob: "Select your date of birth",
    nationality: "Nationality",
    enterNationality: "Enter your nationality",
    takesOverTulum: "Takes Over Tulum",
    takesOverGeely: "Takes Over Geely Cancun",
    upcoming: "Upcoming",
    retreatsMobile: "Retreats",
  },
};

// Checkout Popup Component
const CheckoutPopup = ({ ticket, onClose, language }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [nationality, setNationality] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: ticket.priceId,
          email,
          name,
          phone,
          dob,
          nationality,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error creating payment session");
      }

      const { sessionId } = data;

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw new Error(error.message);
      }
    } catch (err) {
      setError(err.message || "Error initiating payment");
      setLoading(false);
    }
  };

  return (
    <div className={styles.popup__overlay}>
      <div className={styles.popup__content}>
        <img
          src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1745799167/2025-removebg-preview_vjljx9.png"
          alt="Logo"
          style={{ top: "10px", width: "90px", position: "absolute" }}
        />
        <h2 className={styles.popup__title}>{t[language].completePurchase}</h2>
        <form onSubmit={handleSubmit} className={styles.popup__form}>
          <div className={styles.input__group}>
            <label htmlFor="name" className={styles.input__label}>
              {t[language].fullName}
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t[language].enterFullName}
              className={styles.popup__input}
              required
            />
          </div>
          <div className={styles.input__group}>
            <label htmlFor="email" className={styles.input__label}>
              {t[language].email}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t[language].enterEmail}
              className={styles.popup__input}
              required
            />
          </div>
          <div className={styles.input__group}>
            <label htmlFor="phone" className={styles.input__label}>
              {t[language].phone}
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t[language].enterPhone}
              className={styles.popup__input}
              required
            />
          </div>
          <div className={styles.input__group}>
            <label htmlFor="dob" className={styles.input__label}>
              {t[language].dob}
            </label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              placeholder={t[language].selectDob}
              className={`${styles.popup__input} ${styles.date__input}`}
              required
            />
          </div>
          <div className={styles.input__group}>
            <label htmlFor="nationality" className={styles.input__label}>
              {t[language].nationality}
            </label>
            <input
              type="text"
              id="nationality"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              placeholder={t[language].enterNationality}
              className={styles.popup__input}
              required
            />
          </div>
          {error && <p className={styles.popup__error}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className={styles.popup__button}
          >
            {loading ? t[language].processing : t[language].pay(ticket.price)}
          </button>
          <button
            type="button"
            onClick={onClose}
            className={styles.popup__close}
          >
            {t[language].cancel}
          </button>
        </form>
      </div>
    </div>
  );
};

// Features Popup Component
const FeaturesPopup = ({ ticket, onClose, language }) => {
  return (
    <div className={styles.popup__overlay}>
      <div className={styles.popup__content}>
        <img
          src="https://res.cloudinary.com/dtovwv8hi/image/upload/v1749065983/2025-removebg-preview_vjljx9_wvk7oj.png"
          alt=""
          style={{ top: "10px", width: "90px", position: "absolute" }}
        />
        <h2 className={styles.popup__title}>{ticket.name[language]}</h2>
        <ul className={styles.popup__features}>
          {ticket.features[language].map((feature, idx) => (
            <li key={idx} className={styles.popup__feature}>
              {feature}
            </li>
          ))}
        </ul>
        <button onClick={onClose} className={styles.popup__close}>
          {t[language].close}
        </button>
      </div>
    </div>
  );
};

export default function TicketsPage() {
  const [popupTicket, setPopupTicket] = useState(null);
  const [checkoutTicket, setCheckoutTicket] = useState(null);
  const [showLogo, setShowLogo] = useState(true);
  const [showNavbarLinks, setShowNavbarLinks] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

  const { language, toggleLanguage } = useLanguage();

  const toggleMobileMenu = () => setIsMobileMenuActive(!isMobileMenuActive);
  const openFeaturesPopup = (ticket) => setPopupTicket(ticket);
  const closeFeaturesPopup = () => setPopupTicket(null);
  const openCheckoutPopup = (ticket) => setCheckoutTicket(ticket);
  const closeCheckoutPopup = () => setCheckoutTicket(null);

  return (
    <>
      {/* Navbar */}
      <nav
        className={`navbar ${showLogo ? "logo-visible" : ""}`}
        style={{ position: "relative" }}
      >
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
                    {t[language].rivera.replace(/"/g, "")}
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Logo */}
          <div className="navbarLogo2">
            <Image
              alt="logo"
              src="https://res.cloudinary.com/dtovwv8hi/image/upload/v1749062928/retreats-removebg-preview_plvlhh_xq82zk.png"
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
            <Link
              href="/oolExperience"
              style={{ textDecoration: "none", color: "#333333" }}
              onClick={toggleMobileMenu}
            >
              {t[language].retreatsMobile}
            </Link>
            <div className="dropdown-menu-mobile" style={{ display: "none" }}>
              <Link
                href="/oolExperience"
                className="dropdown-item"
                onClick={toggleMobileMenu}
              >
                {t[language].rivera.replace(/"/g, "")}
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
              marginTop: "1rem",
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

      <div>
        <div className="tickets__Content">
          <div className="tickets__videoAndForm">
            <div className={styles.tickets__videoAndTitle}>
              <video
                src="https://res.cloudinary.com/dtovwv8hi/video/upload/v1749062926/AQNmPU9uPvlvTyIqQo7o7uGC9ftGR3FRBb0G87kZZnOmsNmigoxV49VM88vb8lAK_xKYKMJ-r0X4wPev8AQ1kijs0LeG7uz38LILdvo_ovhxis_ytlyiu.mp4"
                autoPlay
                muted
                playsInline
                loop
              ></video>
            </div>
            <div className={styles.tickets__titleAndTickets}>
              <div className={styles.tickets__gridAndTitle}>
                <div className={styles.tickets__grid}>
                  <h1 className={styles.tickets__title}>
                    {t[language].preSale} <br /> {t[language].rivera}
                  </h1>
                  {ticketOptions.map((ticket) => (
                    <div key={ticket.id} className={styles.ticket}>
                      {/* SOLO para KIN REGULAR */}
                      {(ticket.id === "kin-regular" ||
                        ticket.id === "ha-vip") && (
                        <p
                          style={{
                            color: "#9F9668",
                            fontWeight: "bold",
                            fontFamily: "Cal Sans",
                            marginBottom: "-10px",
                            marginTop: "-20px",
                            fontSize: "1.1rem",
                          }}
                        >
                          Hasta 3 Meses sín intereses
                        </p>
                      )}
                      <h2 className={styles.ticket__name}>
                        {ticket.name[language]}
                      </h2>

                      <p className={styles.ticket__price}>
                        ${ticket.price} MXN
                      </p>

                      <ul className={styles.ticket__features}>
                        {ticket.features[language]
                          .slice(0, 2)
                          .map((feature, idx) => (
                            <li key={idx} className={styles.ticket__feature}>
                              {feature}
                            </li>
                          ))}
                      </ul>
                      <button
                        onClick={() => openFeaturesPopup(ticket)}
                        className={styles.ticket__seeMore}
                      >
                        {t[language].moreInfo}
                      </button>
                      <button
                        onClick={() => openCheckoutPopup(ticket)}
                        className={styles.ticket__button}
                      >
                        {t[language].getTickets}
                      </button>
                    </div>
                  ))}
                </div>
                <h1 className={styles.tickets__titleVertical}>
                  {t[language].getYourTickets}
                </h1>
              </div>
              {popupTicket && (
                <FeaturesPopup
                  ticket={popupTicket}
                  onClose={closeFeaturesPopup}
                  language={language}
                />
              )}
              {checkoutTicket && (
                <CheckoutPopup
                  ticket={checkoutTicket}
                  onClose={closeCheckoutPopup}
                  language={language}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

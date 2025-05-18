// app/tickets/page.jsx
"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import styles from "./styles/tickets.module.css";
import Image from "next/image";
import Link from "next/link";
import "../../components/Navbar.css";
import "./tickets.css";

// Validate Stripe public key
console.log(
  "NEXT_PUBLIC_STRIPE_PUBLIC_KEY:",
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
);
if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
  console.error("Error: NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
  throw new Error(
    "Stripe public key is not configured. Check your .env.local file"
  );
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const ticketOptions = [
  {
    id: "kin-regular",
    name: "KIN - Regular Package",
    price: 35000,
    priceId: "price_1RPteVDEXHZiGUEkpmNO2MZM",
    features: [
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
    image:
      "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745774380/oool_bhe8w5.png",
  },
  {
    id: "ha-vip",
    name: "HA - VIP Package",
    price: 51000,
    priceId: "price_1RPtf8DEXHZiGUEkJVtMhJ54",
    features: [
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
    image:
      "https://res.cloudinary.com/dc5zbh38m/image/upload/v1746984297/tr_qxdvkx.png",
  }
  
];

// Checkout Popup Component
const CheckoutPopup = ({ ticket, onClose }) => {
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
        <h2 className={styles.popup__title}>Completa tu Compra</h2>
        <form onSubmit={handleSubmit} className={styles.popup__form}>
          <div className={styles.input__group}>
            <label htmlFor="name" className={styles.input__label}>
              Nombre Completo
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingresa tu nombre completo"
              className={styles.popup__input}
              required
            />
          </div>
          <div className={styles.input__group}>
            <label htmlFor="email" className={styles.input__label}>
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo electrónico"
              className={styles.popup__input}
              required
            />
          </div>
          <div className={styles.input__group}>
            <label htmlFor="phone" className={styles.input__label}>
              Número de Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ingresa tu número de teléfono"
              className={styles.popup__input}
              required
            />
          </div>
          <div className={styles.input__group}>
            <label htmlFor="dob" className={styles.input__label}>
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              placeholder="Selecciona tu fecha de nacimiento"
              className={`${styles.popup__input} ${styles.date__input}`}
              required
            />
          </div>
          <div className={styles.input__group}>
            <label htmlFor="nationality" className={styles.input__label}>
              Nacionalidad
            </label>
            <input
              type="text"
              id="nationality"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              placeholder="Ingresa tu nacionalidad"
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
            {loading ? "Procesando..." : `Pagar $${ticket.price},00 MXN`}
          </button>
          <button
            type="button"
            onClick={onClose}
            className={styles.popup__close}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

// Features Popup Component
const FeaturesPopup = ({ ticket, onClose }) => {
  return (
    <div className={styles.popup__overlay}>
      <div className={styles.popup__content}>
        <img
          src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1745799167/2025-removebg-preview_vjljx9.png"
          alt=""
          style={{ top: "10px", width: "90px", position: "absolute" }}
        />
        <h2 className={styles.popup__title}>{ticket.name}</h2>
        <ul className={styles.popup__features}>
          {ticket.features.map((feature, idx) => (
            <li key={idx} className={styles.popup__feature}>
              {feature}
            </li>
          ))}
        </ul>
        <button onClick={onClose} className={styles.popup__close}>
          Close
        </button>
      </div>
    </div>
  );
};

export default function TicketsPage() {
  const [popupTicket, setPopupTicket] = useState(null); // For features popup
  const [checkoutTicket, setCheckoutTicket] = useState(null); // For checkout popup
  const [showLogo, setShowLogo] = useState(true);
  const [showNavbarLinks, setShowNavbarLinks] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuActive(!isMobileMenuActive);
  };

  const openFeaturesPopup = (ticket) => {
    setPopupTicket(ticket);
  };

  const closeFeaturesPopup = () => {
    setPopupTicket(null);
  };

  const openCheckoutPopup = (ticket) => {
    setCheckoutTicket(ticket);
  };

  const closeCheckoutPopup = () => {
    setCheckoutTicket(null);
  };

  return (
    <>
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
              <Link
                href="/oolExperience"
                style={{textDecoration:"none",color:"#333333"}}
                onClick={toggleMobileMenu}
              >
                Retreats
              </Link>
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

      <div>
        <div className="tickets__Content">
          <div className="tickets__videoAndForm">
            <div className={styles.tickets__videoAndTitle}>
              <video
                src="https://res.cloudinary.com/dc5zbh38m/video/upload/v1746950529/AQNmPU9uPvlvTyIqQo7o7uGC9ftGR3FRBb0G87kZZnOmsNmigoxV49VM88vb8lAK_xKYKMJ-r0X4wPev8AQ1kijs0LeG7uz38LILdvo_ovhxis.mp4"
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
                    Preventa <br /> "Rivera Maya 2025"
                  </h1>
                  {ticketOptions.map((ticket) => (
                    <div key={ticket.id} className={styles.ticket}>
                      <h2 className={styles.ticket__name}>{ticket.name}</h2>
                      <p className={styles.ticket__price}>${ticket.price} MXN</p>
                      <ul className={styles.ticket__features}>
                        {ticket.features.slice(0, 2).map((feature, idx) => (
                          <li key={idx} className={styles.ticket__feature}>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => openFeaturesPopup(ticket)}
                        className={styles.ticket__seeMore}
                      >
                        More info
                      </button>
                      <button
                        onClick={() => openCheckoutPopup(ticket)}
                        className={styles.ticket__button}
                      >
                        Get Tickets
                      </button>
                    </div>
                  ))}
                </div>
                <h1 className={styles.tickets__titleVertical}>
                  Get your tickets!
                </h1>
              </div>
              {popupTicket && (
                <FeaturesPopup
                  ticket={popupTicket}
                  onClose={closeFeaturesPopup}
                />
              )}
              {checkoutTicket && (
                <CheckoutPopup
                  ticket={checkoutTicket}
                  onClose={closeCheckoutPopup}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
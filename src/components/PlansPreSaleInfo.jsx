import React from "react";
import "./PlansPreSaleInfo.css";
import Link from "next/link";
const PlansPreSaleInfo = () => {
  return (
    <div className="plansPre__content">
      <video
        src="https://res.cloudinary.com/dc5zbh38m/video/upload/v1747379677/AQNOeKr5Fpg0nmpTCm9buI-ZXSHOXpQnm6gPyEaqcxAwhP25VLeodkUttM67OM6Qt7ytejlYqmP54e4L0oqK89zQe_tA1j-mQZgtkbY_wcrkpk.mp4"
        playsInline
        muted
        autoPlay
        loop
      ></video>

      <div className="plansPre__imgsCont">
        <div
          className="plansPre__imgsCont"
          style={{ position: "relative", display: "inline-block" }}
        >
          <div
            className="plansPre__occult"
            style={{ position: "absolute", top: "-9px" }}
          >
            <img
              className="plansPre__imgsContimg"
              src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1747104265/HABITACIONARTISTAS-SuiteRiver_002_jugrsp.jpg"
              alt=""
            />
            <div />
          </div>
          <div className="plansPre__bgBlack2">
            <img
              className="plansPre__bgBlack2Logo"
              src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1747381099/Sin_t%C3%ADtulo-removebg-preview_vxjtsj.png"
              alt="icon"
            />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="plansPre__plan">
          <h3>Kin - Regular Package</h3>
          <ul>
            <li>3 Días y 2 noches en hotel Xcaret</li>
            <li>Menú por chefs con estrella Michellin</li>
            <li>
              Acceso ilimitado a todos los parques y tours de Grupo Xcaret
            </li>
            <li>Transporte al aeropuerto (CUN - Hotel - CUN)</li>
            <li>Welcome Social Gathering con DJ</li>
            <li>
              6 high-energy cycling sessions con top coaches como{" "}
              <span style={{ color: "#F4E1D1" }}>
                Kristina Girod, Pepe Abreu y Majo Ake{" "}
              </span>{" "}
            </li>
            <li>Closing Sunset Party</li>
            <li>Y mucho más...</li>
            <div className="PlanPre__btns">
              <Link href={"/hotel-gastronomia"}>
                {" "}
                <button>Restaurantes</button>
              </Link>
              <Link href={"/hotel-wellness"}>
                {" "}
                <button>Wellness/Spa</button>
              </Link>

              <Link href={"/tickets"}>
                {" "}
                <button>Preventa</button>
              </Link>
            </div>
          </ul>
        </div>
        <div className="plansPre__plan">
          <h3>Ha - VIP Package</h3>
          <ul>
            <li>3 Días y 2 noches en hotel Xcaret</li>
            <li>Menú por chefs con estrella Michellin</li>
            <li>
              Acceso ilimitado a todos los parques y tours de Grupo Xcaret
            </li>
            <li>Transporte al aeropuerto (CUN - Hotel - CUN)</li>
            <li>Welcome Social Gathering con DJ</li>
            <li>
              6 sessions con top coaches como{" "}
              <span style={{ color: "#F4E1D1" }}>
                {" "}
                Kristina Girod, Pepe Abreu y Majo Ake
              </span>
            </li>
            <li>Closing Sunset Party</li>
            <li>
              {" "}
              <span style={{ color: "#F4E1D1" }}> Exclusive restaurants</span>
            </li>
            <li>
              {" "}
              <span style={{ color: "#F4E1D1" }}> Ocean Front Suite</span>
            </li>
            <li>
              Early booking access para{" "}
              <span style={{ color: "#F4E1D1" }}>
                {" "}
                reservar antes que nadie
              </span>{" "}
              clases, restaurantes y experiencias adicionales.
            </li>
            <div className="PlanPre__btns">
              <Link href={"/hotel-gastronomia"}>
                {" "}
                <button>Restaurantes</button>
              </Link>
              <Link href={"/hotel-wellness"}>
                {" "}
                <button>Wellness/Spa</button>
              </Link>

              <Link href={"/tickets"}>
                {" "}
                <button>Preventa</button>
              </Link>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlansPreSaleInfo;

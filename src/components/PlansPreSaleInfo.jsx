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
          <div style={{ position: "absolute", top: "-9px" }}>
            <img
              style={{
                left: "-160px",
                bottom: "-20px",
                border: " solid 13px #9F9668;", // Mantén tu estilo de borde aquí, ej. '2px solid #fff'
              }}
              className="plansPre__imgsContimg"
              src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1747104265/HABITACIONARTISTAS-SuiteRiver_002_jugrsp.jpg"
              alt=""
            />
            <div
            className="plansPre__bgBlack"
              style={{
                position: "absolute",
                top: "32px",
                left: "-147px",
                width: "270px",
                borderRadius: "50%",
                height: "270px",
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Capa negra semitransparente
                zIndex: 1,
              }}
            />
          </div>
          <img
           className="plansPre__bgBlack2"
            style={{
              position: "absolute",
              top: "141px",
              width: "130px",
              left: "-13px",
              transform: "translate(-50%, -50%)",
              zIndex: 2,
            }}
            src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1747381099/Sin_t%C3%ADtulo-removebg-preview_vxjtsj.png"
            alt="icon"
          />
        </div>
        
      </div>
          <div className="plansPre__buttons" style={{position:"relative"}}>
       <Link href={"/tickets"}> <button style={{position:"absolute",fontFamily:"CalSans",backgroundColor:"#9F9668",color:"#F4E1D1",borderRadius:"5px",top:"350px",right:"0px",border:"solid 7px #9F9668"}}>Compra tickets</button></Link><button style={{position:"absolute",border:"solid 7px #9F9668",top:"420px",right:"0px",width:"130px",padding:"5px",backgroundColor:"#9F9668",color:"#F4E1D1",fontFamily:"CalSans",borderRadius:"5px",}}>Explorar Packages</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="plansPre__plan">
          <h3>Kin - Regular Package</h3>
          <ul>
            <li>3 Días y 2 noches en hotel Xcaret</li>
            <li>
         
           
                Menú por chefs con estrella Michellin
           
            </li>
            <li>
               Acceso ilimitado  a
              todos los parques y tours de Grupo Xcaret
            </li>
            <li>Transporte al aeropuerto (CUN - Hotel - CUN)</li>
            <li>
              Welcome Social Gathering con{" "}
           DJ
            </li>
            <li>
              6 high-energy cycling sessions con top coaches como{" "}
              <span style={{ color: "#F4E1D1" }}>
                Kristina Girod, Pepe Abreu y Majo Ake{" "}
              </span>{" "}
            </li>
            <li>Closing Sunset Party</li>
            <li>Y mucho más...</li>
          </ul>
        </div>
        <div className="plansPre__plan">
          <h3>Ha - VIP Package - Ocean Front Stay</h3>
          <ul>
            <li>3 Días y 2 noches en hotel Xcaret</li>
           <li>
         
          
                Menú por chefs con estrella Michellin
            
            </li>
            <li>
              Acceso ilimitado a todos los parques y tours de Grupo Xcaret
            </li>
            <li>Transporte al aeropuerto (CUN - Hotel - CUN)</li>
            <li>Welcome Social Gathering con DJ</li>
            <li>
              6 sessions con top coaches como <span style={{color:"#F4E1D1"}}> Kristina
              Girod, Pepe Abreu y Majo Ake</span>
            </li>
            <li>Closing Sunset Party</li>
            <li> <span style={{color:"#F4E1D1"}}> Exclusive restaurants</span></li>
            <li> <span style={{color:"#F4E1D1"}}> Ocean Front Suite</span></li>
            <li>
               Early booking access para <span style={{color:"#F4E1D1"}}> reservar antes que nadie</span> clases,
              restaurantes y experiencias adicionales.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlansPreSaleInfo;

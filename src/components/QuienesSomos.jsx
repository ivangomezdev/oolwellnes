import React from 'react';
import "./quienesSomos.css";
import { useLanguage } from '../context/LanguageContext.jsx';

const t = {
  es: {
    who: "Nosotros",
    desc: (
      <>
        <span style={{ color: "#9B956A" }}> óol </span>
        proviene de la lengua maya, se traduce como
        <span style={{ color: "#9B956A" }}> "corazón", "alma", ”esencia".</span>
        <br />
        Es el centro de las emociones y la conciencia. Es una palabra sagrada que representa el estado interior del ser,
        <span style={{ color: "#9B956A" }}> la conexión entre mente, cuerpo y espíritu.</span>
      </>
    ),
    somos: (
      <>
        Somos una empresa dedicada a la creación de experiencias expansivas enfocadas al bienestar integral del ser humano. Diseñamos encuentros conscientes donde cuerpo, mente y espíritu se alinean en espacios que
        <span style={{ color: "#9B956A" }}> inspiran, nutren y transforman. </span>
      </>
    ),
  },
  en: {
    who: "About Us",
    desc: (
      <>
        <span style={{ color: "#9B956A" }}> óol </span>
        comes from the Mayan language, meaning
        <span style={{ color: "#9B956A" }}> "heart", "soul", "essence".</span>
        <br />
        It is the center of emotions and consciousness. It is a sacred word representing the inner state of being,
        <span style={{ color: "#9B956A" }}> the connection between mind, body, and spirit.</span>
      </>
    ),
    somos: (
      <>
        We are a company dedicated to creating expansive experiences focused on the integral well-being of the human being. We design conscious gatherings where body, mind, and spirit align in spaces that
        <span style={{ color: "#9B956A" }}> inspire, nurture, and transform. </span>
      </>
    ),
  },
};

const QuienesSomos = () => {
  const { language } = useLanguage();

  return (
    <div className='quienesSomos__cont' style={{ position: "relative" }}>
      <h1 className='quienesSomos__who'>{t[language].who}</h1>
      <h1>{t[language].desc}</h1>
      <hr />
      <h1>{t[language].somos}</h1>
    </div>
  );
};

export default QuienesSomos;
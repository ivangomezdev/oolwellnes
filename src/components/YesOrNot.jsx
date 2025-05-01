import React from 'react'
import "./yesOrNot.css"
const YesOrNot = () => {
  return (
    <div className="yesOrNot">
    <div className="yesOrNot__column">
      <h2 className="yesOrNot__title yesOrNot__title--included">
        ¿Qué Si?
        <span className="yesOrNot__underline"></span>
      </h2>
      <ul className="yesOrNot__list">
        <li className="yesOrNot__item">4 comidas de comidas en comidas en comidas comidas en comidas</li>
        <li className="yesOrNot__item">comidas las comidas (comidas + comidas comidas!)</li>
        <li className="yesOrNot__item">
          comidas a comidas las comidas (comidas, comidas, comidas comidas)
        </li>
        <li className="yesOrNot__item">comidas de comidas</li>
        <li className="yesOrNot__item">comidas de comidas comidas por el comidas</li>
      </ul>
    </div>

    <div className="yesOrNot__column">
      <h2 className="yesOrNot__title yesOrNot__title--not-included">
        ¿Qué no?
        <span className="yesOrNot__circle"></span>
      </h2>
      <ul className="yesOrNot__list">
        <li className="yesOrNot__item">Alimentos Alimentos</li>
        <li className="yesOrNot__item">
          Alimentos y Alimentos Alimentos Alimentos de Alimentos Alimentos de Alimentos Alimentos
        </li>
        <li className="yesOrNot__item">AlimentosAlimentos a la AlimentosAlimentos</li>
        <li className="yesOrNot__item">AlimentosAlimentos AlimentosAlimentos</li>
        <li className="yesOrNot__item">AlimentosAlimentos AlimentosAlimentos en la AlimentosAlimentos</li>
        <li className="yesOrNot__item">AlimentosAlimentos AlimentosAlimentos para el AlimentosAlimentos del AlimentosAlimentos</li>
      </ul>
    </div>
  </div>
  )
}

export default YesOrNot

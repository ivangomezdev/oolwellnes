import React from 'react';
import "./whyOol.css";

const WhyOol = () => {
  // Generate 60 question marks
  const questionMarks = Array.from({ length: 60 }).map((_, index) => (
    <div 
      key={index} 
      className="question-mark" 
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        fontSize: `${Math.random() * 2 + 0.8}rem`,
        transform: `rotate(${Math.random() * 60 - 30}deg)`,
        animationDelay: `${Math.random() * 20}s`
      }}
    >
      ?
    </div>
  ));

  return (
    <div className="whyool-container">
      <div className="content">
        <h1>¿Por qué Ool?</h1>
        <p>asdasd asd asd adsadas dasd asd asd asdas dasdasd asdas adsd as asdas asd d asdasdas asd asdas dsa</p>
      </div>
      {questionMarks}
    </div>
  );
};

export default WhyOol;
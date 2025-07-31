import React from 'react';
import "./thePlace.css";

const ThePlace = () => {
  return (
    <div className="thePlace__content">
      <img
        className="thePlace__video"
   
        src="https://res.cloudinary.com/dufp4z4gq/image/upload/v1753928470/xcaret-arte-full_uw41ks.webp"
      ></img>
      <div className="thePlace__overlay"></div>
      <h1 className="thePlace__text">Un venue inigualable</h1>
      <h1 className='thePlace__text2'>Hotel Xcaret Arte</h1>
    </div>
  );
};

export default ThePlace;
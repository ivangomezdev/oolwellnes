import React from 'react';
import "./thePlace.css";

const ThePlace = () => {
  return (
    <div className="thePlace__content">
      <video
        className="thePlace__video"
        autoPlay
        loop
        muted
        playsInline
        src="https://res.cloudinary.com/dtovwv8hi/video/upload/v1749062941/WhatsApp_Video_2025-05-09_at_18.53.11_vtkdmq_g1iboy.mp4"
      ></video>
      <div className="thePlace__overlay"></div>
      <h1 className="thePlace__text">Un venue inigualable</h1>
      <h1 className='thePlace__text2'>Hotel Xcaret Arte</h1>
    </div>
  );
};

export default ThePlace;
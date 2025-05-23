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
        src="https://res.cloudinary.com/dc5zbh38m/video/upload/v1746835040/WhatsApp_Video_2025-05-09_at_18.53.11_vtkdmq.mp4"
      ></video>
      <div className="thePlace__overlay"></div>
      <h1 className="thePlace__text">Un venue inigualable</h1>
      <h1 className='thePlace__text2'>Hotel Xcaret Arte</h1>
    </div>
  );
};

export default ThePlace;
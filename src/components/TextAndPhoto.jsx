import React from 'react'
import "./textAndPhoto.css"
import Image from 'next/image'
const TextAndPhoto = () => {
  return (
    <div className='textAndPhoto__cont'>
      <div className='textAndPhoto__textCont'>
      <q>Texto texto texto texto texto texto textoss texto texto texto textoss</q>
      </div>
 <div className='textAndPhoto__imgAndBtn'>
<div className='textAndPhoto__img'>Imagen</div>
<div><Image alt='imagen' src={"https://res.cloudinary.com/dc5zbh38m/image/upload/v1745775146/alma-removebg-preview_kzfpoe.png"} width={100} height={100}/></div>

 </div>
    </div>
  )
}

export default TextAndPhoto

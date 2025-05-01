"use client"
import React, { useEffect, useRef, useState } from 'react';
import './BigCollabs.css';

const BigCollabs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const iconsRef = useRef([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentElement = iconsRef.current[0]?.parentElement.parentElement;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      // Animate h2 first
      const h2Element = iconsRef.current[0]?.parentElement.parentElement.querySelector('h2');
      if (h2Element) {
        h2Element.classList.add('visible');
      }

      // Animate icons one by one
      iconsRef.current.forEach((icon, index) => {
        setTimeout(() => {
          if (icon) icon.classList.add('visible');
        }, 500 + index * 200); // 500ms delay for h2, then 200ms per icon
      });
    }
  }, [isVisible]);

  const nextSlide = () => {
    if (window.innerWidth <= 800) {
      const maxVisibleIcons = 3;
      const totalIcons = 10;
      const totalSlides = Math.ceil(totalIcons / maxVisibleIcons);
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }
  };

  const prevSlide = () => {
    if (window.innerWidth <= 800) {
      const maxVisibleIcons = 3;
      const totalIcons = 10;
      const totalSlides = Math.ceil(totalIcons / maxVisibleIcons);
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    }
  };

  useEffect(() => {
    if (window.innerWidth <= 800 && carouselRef.current) {
      const iconWidth = 150 + 20; // icon width + gap
      carouselRef.current.style.transform = `translateX(-${currentSlide * (iconWidth * 3)}px)`;
    }
  }, [currentSlide]);

  return (
    <div className="bigCollabs__content">
      <h2>Partnerships</h2>
     
    </div>
  );
};

export default BigCollabs;
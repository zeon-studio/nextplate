"use client";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./custom-carousel.scss";

export default function MyCarousel() {
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      infiniteLoop
      useKeyboardArrows
      autoPlay
      emulateTouch
      stopOnHover
      swipeable
      transitionTime={2000}
      interval={8000}
    >
      <div className="custom-carousel-slide">
        <img
          src="/images/scenic_future_roads.png"
          alt="Slide 1"
          className="carousel-image"
        />
        <div className="carousel-overlay"></div>

        <div className="carousel-content">
          <h1 className="carousel-title text-shadow-28px-28px-black mb-4 text-white">
            Empowering businesses worldwide as a catalyst for Growth &
            Innovation
          </h1>
          <h4 className="carousel-subtitle text-shadow-28px-28px-black mb-4 text-white">
            Making our customer’s journey to scale, globalize and drive
            sustainable growth Easy, Effective and Delightful
          </h4>
        </div>
      </div>
      <div className="custom-carousel-slide">
        <img
          src="/images/multiculture-banner.png"
          alt="Slide 2"
          className="carousel-image"
        />
        <div className="carousel-overlay"></div>

        <div className="carousel-content">
          <h1 className="carousel-title text-shadow-28px-28px-black mb-4 text-white">
            Empowering a Culture of Ownership, Integrity & Collaboration
          </h1>
          <h4 className="carousel-subtitle text-shadow-28px-28px-black mb-4 text-white">
            Making our employee’s journey fun and rewarding by ideating,
            learning, trusting, and growing together with our customers
          </h4>
        </div>
      </div>
    </Carousel>
  );
}

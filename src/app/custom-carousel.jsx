"use client";
import React from "react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
    >
      <div style={{ position: "relative", height: "calc(100vh - 82px)" }}>
        <img
          src="/images/scenic_future_roads.png"
          alt="Slide 1"
          style={{ height: "100%", width: "100%" }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            width: "60%",
          }}
        >
          <h1 className="text-shadow-28px-28px-black mb-4 text-white">
            Empowering businesses worldwide as a catalyst for Growth &
            Innovation
          </h1>
          <h4 className="text-shadow-28px-28px-black mb-8 text-white">
            Making our customer’s journey to scale, globalize and drive
            sustainable growth Easy, Effective and Delightful
          </h4>
        </div>
      </div>
      <div style={{ position: "relative", height: "calc(100vh - 82px)" }}>
        <img
          src="/images/multiculture-banner.png"
          alt="Slide 2"
          style={{ width: "100%" }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            width: "60%",
          }}
        >
          <h1 className="text-shadow-28px-28px-black mb-4 text-white">
            Empowering a Culture of Ownership, Integrity & Collaboration
          </h1>
          <h4 className="text-shadow-28px-28px-black mb-8 text-white">
            Making our employee’s journey fun and rewarding by ideating,
            learning, trusting, and growing together with our customers
          </h4>
        </div>
      </div>
    </Carousel>
  );
}

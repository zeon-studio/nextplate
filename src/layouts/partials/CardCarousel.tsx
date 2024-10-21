"use client";

import { useState } from "react";
import Image from "next/image";
import { Transition } from "@headlessui/react";
import { CardCarouselType } from "@/types";
import { useInView } from "react-intersection-observer";

export type CardCarouselProps = {
  cards: CardCarouselType[];
};

const CardCarousel = ({ cards }: CardCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const selectCard = (index: number) => {
    setCurrentIndex(index);
  };
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0, // Adjust as needed
  });

  return (
    <div className="relative" ref={ref}>
      <div className="w-full flex justify-center py-8">
        <div className="bg-white rounded-full border border-light-grey shadow-lg">
          {cards.map((card, index) => (
            <button
              key={index}
              onClick={() => selectCard(index)}
              className={`py-2 rounded-full md:px-8 px-5 uppercase font-extralight ${
                currentIndex === index
                  ? "bg-primary text-white"
                  : "bg-white text-dark-grey hover:bg-white hover:border-light-grey hover:shadow-xl"
              }`}
            >
              {card.title}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full h-96">
        {cards.map((card, index) => (
          <Transition
            key={index}
            show={index === currentIndex}
            enter="transition-opacity duration-1000"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-1000"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute inset-0 w-full h-full">
              <div className="w-full h-full relative">
                <Image
                  src={card.image}
                  alt={`Card ${index + 1}`}
                  fill
                  className="rounded-lg w-full h-auto"
                  sizes="(min-width: 1400px) 1252px, calc(93.15vw - 33px)"
                  style={{ filter: "brightness(0.8)", objectFit: "cover" }}
                />
                <div
                  className={`absolute inset-0 flex items-center justify-center px-10 ${
                    inView ? "animate-delay-[500ms]" : ""
                  }`}
                >
                  <div className="bg-gray-600 bg-opacity-65 p-4 rounded-md">
                    <h2 className="text-white font-bold pb-3 text-h3 lg:text-h2">
                      {card.subtitle}
                    </h2>
                    <p className="text-white text-xl">{card.text}</p>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;

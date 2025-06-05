import { Carousel, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import slide1 from "../assets/hero/slide1.jpg";
import slide2 from "../assets/hero/slide2.jpg";
import slide3 from "../assets/hero/slide2.jpg";
import slide4 from "../assets/hero/slide 4.png";
import WelcomPage from "./WelcomPage";

const carouselData = [
  {
    bg: slide1,
    date: "10–16 March",
    buttonLabel: "SHOP NOW",
  },
  {
    bg: slide2,
    date: "SUMMER DROP",
    buttonLabel: "SHOP NOW",
  },
  {
    bg: slide3,
    date: "10–16 March",
    buttonLabel: "SHOP NOW",
  },
  {
    bg: slide4,
    date: "SUMMER DROP",
    buttonLabel: "SHOP NOW",
  },
];

export default function Hero() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal when on homepage
  useEffect(() => {
    if (location.pathname === "/") {
      const shownData = localStorage.getItem("welcomeModalShown");

      if (shownData) {
        const parsed = JSON.parse(shownData);
        const now = new Date().getTime();
        const oneDay = 24 * 60 * 60 * 1000;

        if (now - parsed.timestamp < oneDay) {
          return;
        } else {
          localStorage.removeItem("welcomeModalShown");
        }
      }

      const timer = setTimeout(() => {
        setIsModalOpen(true);
        localStorage.setItem(
          "welcomeModalShown",
          JSON.stringify({ timestamp: new Date().getTime() })
        );
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <>
      <Carousel autoplay dots>
        {carouselData.map((slide, index) => (
          <div key={index}>
            <div className="relative w-full h-[100vh] overflow-hidden">
              <img
                src={slide.bg}
                alt={`Slide ${index + 1}`}
                className="w-full h-full"
              />
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                <button
                  type="button"
                  style={{ color: "white" }}
                  className="w-[220px] rounded-3xl cursor-pointer h-[60px] bg-[#c97a9f] hover:bg-[#a44c6c] focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-2.5 me-2 mb-2"
                >
                  {slide.buttonLabel}
                </button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Custom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-60">
          <div className="relative w-full max-w-3xl h-[80vh] bg-transparent">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-50 cursor-pointer text-white text-3xl bg-black/60 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black"
            >
              &times;
            </button>

            {/* Modal Content */}
            <div className="w-full h-full relative z-40">
              <WelcomPage />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

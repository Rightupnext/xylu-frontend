import { Carousel } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WelcomPage from "./WelcomPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchHeroes } from "../store/slice/heroSlice";

export default function Hero() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [screenSize, setScreenSize] = useState("large");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { heroImages } = useSelector((state) => state.hero);

  // Detect screen size and update state
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize("small"); // mobile
      } else if (width < 1024) {
        setScreenSize("medium"); // tablet
      } else {
        setScreenSize("large"); // desktop
      }
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  // Fetch hero images
  useEffect(() => {
    dispatch(fetchHeroes());
  }, [dispatch]);

  // Show welcome modal once per 24 hours
  useEffect(() => {
    if (location.pathname === "/") {
      const shownData = localStorage.getItem("welcomeModalShown");
      const now = new Date().getTime();
      const oneDay = 24 * 60 * 60 * 1000;

      if (shownData) {
        const parsed = JSON.parse(shownData);
        if (now - parsed.timestamp < oneDay) return;
        else localStorage.removeItem("welcomeModalShown");
      }

      const timer = setTimeout(() => {
        setIsModalOpen(true);
        localStorage.setItem(
          "welcomeModalShown",
          JSON.stringify({ timestamp: now })
        );
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  // Auto close modal after 20 sec
  useEffect(() => {
    if (isModalOpen) {
      const closeTimer = setTimeout(() => {
        setIsModalOpen(false);
      }, 20000);
      return () => clearTimeout(closeTimer);
    }
  }, [isModalOpen]);

  // Filter slides based on screen size
  const filteredSlides = heroImages.filter((img) => img.size === screenSize);
const backendUrl = import.meta.env.VITE_BACKEND_URL
  return (
    <>
      <Carousel autoplay dots>
        {filteredSlides.map((slide, index) => (
          <div key={index} className="mt-[21px]">
            <div className="relative w-full h-[82vh] overflow-hidden mt-[130px] sm:mt-[124px]">
              <img
                src={`${backendUrl}/uploads/hero/${slide.filename}`}
                alt={`Slide ${index + 1}`}
                className="w-full h-full"
              />
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 py-[20px] sm:py-[0px]">
                <button
                  type="button"
                  onClick={() => navigate(`${slide.url}`)}
                  className="w-[220px] h-[60px] border-2 border-black rounded-3xl cursor-pointer bg-white/10 backdrop-blur-sm  text-white hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/30 font-medium text-sm px-5 py-2.5 mb-2"
                >
                  Shop Now
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
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-50 cursor-pointer text-white text-3xl bg-black/60 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black"
            >
              &times;
            </button>
            <div className="w-full h-full relative z-40">
              <WelcomPage />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

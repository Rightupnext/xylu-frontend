import React from "react";
import { motion } from "framer-motion";
import scroll1 from "../assets/scroll/scroll1.png";
import scroll2 from "../assets/scroll/scroll2.png";
import scroll3 from "../assets/scroll/scroll3.png";

const labels1 = Array(10).fill("Instant Delivery");
const labels2 = Array(10).fill("Returns & Refunds");

const Marquee = ({ direction = "left", children, bgColor }) => (
  <div
    className="overflow-hidden whitespace-nowrap font-bold text-white"
    style={{ backgroundColor: bgColor }}
  >
    <motion.div
      animate={{
        x: direction === "left" ? ["100%", "-100%"] : ["-100%", "100%"],
      }}
      transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      className="inline-block"
    >
      {children}
    </motion.div>
  </div>
);

const Feature = ({ image, title, subtitle, delay }) => (
  <motion.div
    className="flex flex-col items-center text-center p-6 flex-1"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: false }}
  >
    <img src={image} alt={title} className="w-20 h-20 mb-4 object-contain" />
    <h3 className="font-semibold text-lg">{title}</h3>
    <p className="text-sm text-gray-600">{subtitle}</p>
  </motion.div>
);

const FeaturesSection = () => (
  <div className="flex flex-col md:flex-row justify-center items-stretch px-4 py-12 gap-8">
    <Feature
      image={scroll1}
      title="Finest Fabric"
      subtitle="Crafted With Care And Quality"
      delay={0.1}
    />
    <Feature
      image={scroll2}
      title="Comfort Guaranteed"
      subtitle="We Provide Unbeatable Comfort"
      delay={0.3}
    />
    <Feature
      image={scroll3}
      title="On Time Delivery"
      subtitle="Delivered Right On Schedule!"
      delay={0.5}
    />
  </div>
);

const Scroll = () => (
  <div>
    <Marquee bgColor="#B03A66">
      {labels1.map((label, idx) => (
        <span key={idx} className="inline-block mx-8 h-[50px] leading-[50px]">
          {label}
        </span>
      ))}
    </Marquee>

    <Marquee direction="right" bgColor="#214E8A">
      {labels2.map((label, idx) => (
        <span key={idx} className="inline-block mx-8 h-[50px] leading-[50px]">
          {label}
        </span>
      ))}
    </Marquee>

    <FeaturesSection />
  </div>
);

export default Scroll;

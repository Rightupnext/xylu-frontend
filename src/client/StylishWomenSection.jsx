import React from "react";
import { motion } from "framer-motion";
import img1 from "../assets/stylledwomen/1.png";
import img2 from "../assets/stylledwomen/2.png";
const banners = [
  {
    id: 1,
    title: "Collection For Fushion Wear",
    subtitle: "Up To  40% Off",
    button: "Shop Now",
    url: "https://img.freepik.com/free-photo/happy-modern-asian-woman-going-shopping-malls-holding-bags-with-clothes-smiling-wearing-sungl_1258-153612.jpg?uid=R155413258&ga=GA1.1.471318040.1721215360&semt=ais_items_boosted&w=740",
  },
  {
    id: 2,
    title: "Collection For Ethnic Wear",
    subtitle: "Up To  40% Off",
    button: "Shop Now",
    url: "https://img.freepik.com/free-photo/shopping-concept-close-up-portrait-young-beautiful-attractive-redhair-girl-smiling-looking-camera_1258-132679.jpg?uid=R155413258&ga=GA1.1.471318040.1721215360&semt=ais_items_boosted&w=740",
  },
  {
    id: 3,
    title: "Baby & Kids Fashion",
    subtitle: "SALE!\n07 to 14 February",
    button: "Shop Now",
    url: img1,
  },
];

const BannerSection = () => {
  return (
    <div className="space-y-6 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {banners.slice(0, 2).map((banner, index) => (
          <motion.div
            key={banner.id}
            className="rounded-xl overflow-hidden shadow-md relative h-64"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.3 }}
            style={{
              backgroundImage: `url(${banner.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-blac bg-opacity-40 flex flex-col justify-center p-6 text-white">
              <h2 className="text-xl font-bold">{banner.title}</h2>
              <p className="text-md mt-1 text-yellow-300">{banner.subtitle}</p>
              <button className="mt-4 px-4 py-2 bg-black text-black rounded-full w-fit">
                {banner.button}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="rounded-xl overflow-hidden shadow-md relative h-72 md:h-96"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <img
          src={banners[2].url}
          alt="Baby Fashion"
          className="absolute inset-0 w-full h-full object-cove"
        />
      </motion.div>
    </div>
  );
};

export default BannerSection;

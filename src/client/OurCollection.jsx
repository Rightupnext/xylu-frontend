import { Card } from "antd";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import img1 from "../assets/ourcollection/1.png";
import img2 from "../assets/ourcollection/2.jpg";
import img3 from "../assets/ourcollection/3.png";
import img4 from "../assets/ourcollection/4.png";
import img5 from "../assets/ourcollection/5.png";
import img6 from "../assets/ourcollection/6.jpg";
const collectionData = [
  {
    title: "Ethnic Wear",
    image: img1,
  },
  {
    title: "Western Wear",
    image: img2,
  },
  {
    title: "Fushion Wear",
    image: img3,
  },
  {
    title: "Occassion Wear",
    image: img4,
  },
  {
    title: "Maternity Wear",
    image: img5,
  },
  {
    title: "Maxi Wear",
    image: img6,
  },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

export default function OurCollection() {
  return (
    <div className="px-4 md:px-10 lg:px-20 py-10 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-2">
        <h2 className="text-2xl font-bold">Our Collection</h2>
        <Link to="/products" className="text-sm font-medium hover:underline">
          ALL PRODUCTS
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {collectionData.map((item, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={cardVariants}
          >
            <Card
              hoverable
              cover={
                <img
                  alt={item.title}
                  src={item.image}
                  className="rounded-t-lg object-cover h-60 w-full"
                />
              }
              className="rounded-lg shadow-md text-center"
              style={{ padding: "16px" }}
            >
              <p className="font-semibold text-lg">{item.title}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

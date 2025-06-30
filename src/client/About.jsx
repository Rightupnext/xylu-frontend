import React from "react";
import { Row, Col, Button, Progress } from "antd";
import { motion } from "framer-motion";
import about1 from "../assets/about/about1.jpg";
import about2 from "../assets/about/about2.jpg";
import about3 from "../assets/about/about3.jpg";
import profile from "../assets/about/profile.png";
import { useNavigate } from "react-router-dom";
const team = [
  { name: "Liam Styles", image: profile },
  { name: "Maya Trendz", image: profile },
  { name: "Alex Couture", image: profile },
  { name: "Sara Vogue", image: profile },
];

const BoutiqueSection = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-[#f9f9fb] px-6 md:px-20 py-14 mt-[120px]">
        {/* Main Content */}
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} md={12}>
            <motion.div
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
                Discover the elegance of <br />
                premium{" "}
                <strong className="text-[#c97a9f]">Dress Boutique</strong>{" "}
                fashion
              </h1>
              <p className="text-[#c97a9f] mt-2 text-lg">
                Graceful styles, crafted for every woman
              </p>
              <p className="mt-4 text-gray-600 text-sm leading-relaxed max-w-lg">
                Step into a world of sophisticated fashion — from flowing gowns
                and designer kurtis to tailored dresses and timeless classics.
                Perfectly curated to elevate your look for every occasion.
              </p>

              <Button
                className="mt-6 bg-[#c97a9f] text-white"
                shape="round"
                size="large"
                onClick={() => navigate("/collections/casual-wear")}
              >
                Shop Now
              </Button>
            </motion.div>
          </Col>

          {/* Boutique Image */}
          <Col xs={24} md={12}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <img
                src={about1}
                alt="Boutique Model"
                className="w-full rounded-xl shadow-lg"
              />
            </motion.div>
          </Col>
        </Row>

        {/* Boutique Offer Box */}
        <Row className="mt-10" gutter={[32, 32]}>
          <Col xs={24} md={12}>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-[#c97a9f]">
                What's in store:
              </h3>
              <ul className="mt-4 text-gray-700 space-y-2">
                <li>👚 Stylish Tops & Elegant Blouses</li>
                <li>👗 Designer Dresses & Tailored Trousers</li>
                <li>👜 Handcrafted Bags & Chic Accessories</li>
                <li>👠 Trendy Footwear & Sandals</li>
                <li>🧥 Premium Ethnic & Western Wear</li>
              </ul>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-[#c97a9f]">
                Why shop with us?
              </h3>
              <ul className="mt-4 text-gray-700 space-y-2">
                <li>✅ Curated fashion handpicked by stylists</li>
                <li>🚚 Free delivery & hassle-free returns</li>
                <li>🎁 Exclusive deals, festive offers & rewards</li>
                <li>🌟 Unique limited-edition collections</li>
                <li>📞 Personal styling support available</li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
      <div className="boutique-wrapper mb-[30px]">
        {/* Hero Section */}
        <div className="bg-white py-20 px-6 md:px-20 text-center">
          <Row gutter={[24, 24]} align="middle" justify="center">
            <Col xs={24} md={12}>
              <motion.div
                initial={{ x: -80, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-3xl font-bold text-[#c97a9f]">
                  Discover Boutique Elegance
                </h1>
                <p className="mt-4 text-gray-700">
                  Explore premium women’s fashion curated with elegance,
                  passion, and modern style.
                </p>
                <Button
                  className="mt-4 bg-pink-500 text-white hover:bg-black"
                  size="large"
                  shape="round"
                  onClick={() => navigate("/collections/casual-wear")}
                >
                  Shop New Arrivals
                </Button>
              </motion.div>
            </Col>
            <Col xs={24} md={12}>
              <motion.img
                src={about3}
                alt="Fashion"
                className="w-full rounded-xl shadow-lg"
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
            </Col>
          </Row>
        </div>

        {/* Team Section */}
        <div className="bg-pink-100 py-14 text-center">
          <h2 className="text-2xl  text-gray-700  font-extrabold mb-6">
            Meet Our Stylists
          </h2>
          <Row gutter={[24, 24]} justify="center">
            {team.map((member, index) => (
              <Col xs={12} md={6} key={index}>
                <motion.div
                  className="bg-white p-4 rounded-xl shadow text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={member.image}
                    className="w-28 h-28 rounded-full mx-auto mb-3"
                    alt={member.name}
                  />
                  <p className="text-lg font-semibold text-black">
                    {member.name}
                  </p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Services / Progress */}
        <div className="py-20 px-6 md:px-20 bg-white">
          <Row gutter={[32, 32]} align="middle" justify="center">
            <Col xs={24} md={12}>
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Why Fashion Enthusiasts Love Us
              </h2>
              <p className="mb-4 text-gray-600">
                Our customers trust us for quality and elegance.
              </p>
              <div className="mb-2">Stylish Variety</div>
              <Progress percent={90} strokeColor="#c97a9f" />
              <div className="mt-4 mb-2">Premium Quality</div>
              <Progress percent={85} strokeColor="#c97a9f" />
              <div className="mt-4 mb-2">Affordable Luxury</div>
              <Progress percent={80} strokeColor="#c97a9f" />
            </Col>
            <Col xs={24} md={12}>
              <motion.img
                src={about2}
                alt="Quality Clothing"
                className="w-full object-contain rounded-xl"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
            </Col>
          </Row>
        </div>

        {/* Why Choose Us Section */}
        <div className="py-20 px-6 md:px-20 bg-pink-50 text-center">
          <h2 className="text-2xl font-bold text-[#c97a9f] mb-10">
            Why Choose Our Boutique?
          </h2>
          <Row gutter={[24, 24]} justify="center">
            <Col xs={24} md={6}>
              <div className="p-4 bg-white rounded-xl shadow">
                <h3 className="font-semibold text-gray-700">
                  Exclusive Styles
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Limited-edition collections with unique designs.
                </p>
              </div>
            </Col>
            <Col xs={24} md={6}>
              <div className="p-4 bg-white rounded-xl shadow">
                <h3 className="font-semibold text-gray-700">Expert Stylists</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Personalised guidance from our fashion experts.
                </p>
              </div>
            </Col>
            <Col xs={24} md={6}>
              <div className="p-4 bg-white rounded-xl shadow">
                <h3 className="font-semibold text-gray-700">
                  Seamless Experience
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Easy returns, fast shipping, and friendly support.
                </p>
              </div>
            </Col>
          </Row>
        </div>

        {/* Experience Section */}
        <div className="bg-[#c97a9f] py-20 px-6 md:px-20 text-white text-center">
          <h2 className="text-2xl font-bold mb-8">
            10+ Years of Boutique Excellence
          </h2>
          <Row gutter={[24, 24]} justify="center">
            <Col xs={12} md={6}>
              <h3 className="text-3xl font-bold">500+</h3>
              <p className="text-sm mt-2">Styles Designed</p>
            </Col>
            <Col xs={12} md={6}>
              <h3 className="text-3xl font-bold">200+</h3>
              <p className="text-sm mt-2">Happy Clients</p>
            </Col>
            <Col xs={12} md={6}>
              <h3 className="text-3xl font-bold">50+</h3>
              <p className="text-sm mt-2">Awards</p>
            </Col>
            <Col xs={12} md={6}>
              <h3 className="text-3xl font-bold">100%</h3>
              <p className="text-sm mt-2">Satisfaction</p>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default BoutiqueSection;

import { useEffect, useState } from "react";
import {
  MenuOutlined,
  ShoppingOutlined,
  SearchOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { FaRegUserCircle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { FaInstagramSquare } from "react-icons/fa";
import { motion, AnimatePresence, useCycle } from "framer-motion";
import { Link } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { GiAmpleDress } from "react-icons/gi";
import { Avatar, Badge, Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/slice/categorySlice";

const collectionItems = [
  "Occasion Wear",
  "Fusion Wear",
  "By Length",
  "Ethnic Wear",
  "Casual Wear",
  "Formal Wear",
  "Party Wear",
  "Work Wear",
  "Street Style",
  "Loungewear",
  "Western Wear",
  "Festive Wear",
];

export default function Navbar() {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.category);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const distinctCount = cartItems.length;
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <nav className="w-full shadow-md bg-white fixed top-0 z-50">
      {/* Top bar */}
      <div className="bg-[#c9789f]  text-sm px-4 py-2 flex flex-col md:flex-row items-center justify-between">
        {/* Social Icons */}
        <div className="flex space-x-4 text-3xl mb-1 md:mb-0 text-white">
          <FaFacebook className="cursor-pointer hover:opacity-80" />
          <FaInstagramSquare className="cursor-pointer hover:opacity-80" />
          <IoLogoYoutube className="cursor-pointer hover:opacity-80" />
        </div>

        {/* Offer Text */}
        <h1 className="text-center font-medium text-white">
          Buy Any 3 Oversized T-Shirts At @1099/-
        </h1>
      </div>

      {/* Main nav */}
      <div className="flex items-center justify-between px-6 py-[30px]">
        {/* Logo */}
        <div className="text-xl font-bold text-black">XYLU</div>

        {/* Desktop Links */}
        <div className="hidden md:flex text-black space-x-6 items-center text-sm font-medium">
          <Link to="/">HOME</Link>
          <Link to="/about">ABOUT</Link>

          <div
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <button className="focus:outline-none cursor-pointer">
              COLLECTION
            </button>

            <AnimatePresence>
              {isHovering && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 top-full transform -translate-x-1/2 w-[900px] bg-gray-50 shadow-lg p-4 mt-[34px] z-50"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categories?.data?.map((item, index) => (
                      <Link
                        key={index}
                        to={`/collections/${item.category_name
                          .toLowerCase()
                          .replace(/\s/g, "-")}`}
                      >
                        <div className="hover:bg-gray-100 p-2 rounded cursor-pointer">
                          <span className="flex px-4">
                            <GiAmpleDress className="text-xl text-[#a5496c]" />
                            {item.category_name}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/faq">FAQ</Link>
          <Link to="/contact">CONTACT</Link>
        </div>

        {/* Right Icons */}
        <div className="flex space-x-4 items-center text-lg text-black">
          <SearchOutlined className="cursor-pointer" />

          <Link to="/cart">
            <Badge count={distinctCount} showZero>
              <ShoppingOutlined className="text-2xl" />
            </Badge>
          </Link>

          {/* Animated Avatar */}
          <div className="relative w-10 h-10">
            <motion.div
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{
                scale: [1, 2],
                opacity: [0.8, 0],
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="absolute top-0 left-0 w-10 h-10 rounded-full border-2 border-pink-500 z-0"
            />
            <div className="relative z-10 w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
              <Popover
                content="My Order"
                placement="bottom"
                style={{ backgroundColor: "black" }}
              >
                <div className="relative w-10 h-10">
                  {/* Pink Wave Animation */}
                  <motion.div
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: [1, 2], opacity: [0.8, 0] }}
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                    className="absolute top-0 left-0 w-10 h-10 rounded-full border-2 border-pink-500 z-0"
                  />

                  {/* Avatar Icon */}
                  <div className="relative z-10 w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center cursor-pointer">
                    <Link to="/order">
                      <FaRegUserCircle className="text-pink-500 text-xl" />
                    </Link>
                  </div>
                </div>
              </Popover>
            </div>
          </div>

          <TiThMenu
            className="md:hidden cursor-pointer text-3xl"
            onClick={() => setIsMobileMenuOpen(true)}
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-[80%] sm:w-[60%] bg-white shadow-lg z-50 px-6 py-4"
          >
            <div className="flex justify-between items-center mb-6 text-black">
              <span className="text-xl font-bold">MENU</span>
              <CloseOutlined
                className="text-xl cursor-pointer text-black"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            </div>

            <div className="flex flex-col text-black space-y-4 text-base font-medium">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                HOME
              </Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
                ABOUT
              </Link>

              <div>
                <span className="block mb-2">COLLECTION</span>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {collectionItems.map((item, index) => (
                    <Link
                      key={index}
                      to={`/${item.toLowerCase().replace(/\s/g, "-")}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>

              <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)}>
                FAQ
              </Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                CONTACT
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

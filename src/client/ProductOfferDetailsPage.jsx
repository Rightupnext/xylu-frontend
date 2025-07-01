import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Typography,
  Rate,
  Button,
  Divider,
  Tag,
  Progress,
  Input,
  Form,
  Skeleton,
  InputNumber,
  Card,
  Image,
} from "antd";
import { motion } from "framer-motion";
import NewArrivals from "./NewArrivals";
import { FaTruckArrowRight } from "react-icons/fa6";
import { GiReturnArrow } from "react-icons/gi";
import { ImGift } from "react-icons/im";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartThunk } from "../store/slice/CartSlice";
import { getProductById } from "../store/slice/productSlice";
import GiftBox from "./GiftBox";
import Offerimg from "../assets/gift/offer.png";
import soldout from "../assets/gift/soldout.png";
import Review from "./Review";
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const ProductOfferDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { selectedProduct } = useSelector((state) => state.product);
  const { reviews } = useSelector((state) => state.review);
  const originalPrice = selectedProduct?.price ?? 0;
  const [visible, setVisible] = useState(false);
  const discountPercentage =
    selectedProduct?.Bulk_discount === 1
      ? parseFloat(selectedProduct?.discount) || 0
      : 0;
  useEffect(() => {
    // Automatically open preview after mount
    setVisible(true);
  }, []);
  const discountAmount = (originalPrice * discountPercentage) / 100;
  const discountedPrice = Math.round(originalPrice - discountAmount);

  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  useEffect(() => {
    setLoading(true);
    dispatch(getProductById(id)).finally(() => setLoading(false));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct?.variants?.length) {
      // Select the first available color
      const firstColor = selectedProduct.variants[0].color;
      setSelectedColor(firstColor);

      // Find the first variant with the first color and select its first size
      const sizeList = selectedProduct.variants.find(
        (v) => v.color === firstColor
      )?.size;

      if (sizeList?.length > 0) {
        setSelectedSize(sizeList[0]);
      }
    }
  }, [selectedProduct]);

  const handleQuantityChange = (delta) => {
    const newQty = Math.max(1, quantity + delta);
    setQuantity(newQty);
  };

  const handleQuantitySet = (value) => {
    const newQty = Math.max(1, value || 1);
    setQuantity(newQty);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select both size and color.");
      return;
    }

    dispatch(
      addToCartThunk({
        product: selectedProduct,
        selectedColor,
        selectedSize,
        quantity,
        originalPrice,
        discountedPrice,
      })
    );
    // console.log("discountedPrice", discountedPrice);
  };

  const getAvailableColors = () => {
    const colorSet = new Set();
    selectedProduct?.variants.forEach((v) => colorSet.add(v.color));
    return Array.from(colorSet);
  };

  const getAvailableSizes = () => {
    return selectedProduct?.variants
      .filter((v) => v.color === selectedColor)
      .flatMap((v) => v.size);
  };
const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const expiryParts = selectedProduct?.offerExpiry?.split(",");
  const rawOfferEndDate = expiryParts?.[1] || null;
  const offerEndDate = rawOfferEndDate ? new Date(rawOfferEndDate) : null;
  const isValidDate = offerEndDate instanceof Date && !isNaN(offerEndDate.getTime());

  const calculateTimeLeft = (endDate) => {
    if (!endDate || isNaN(endDate.getTime())) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const now = new Date();
    const difference = endDate - now;
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  const formatTime = (value) => String(value).padStart(2, "0");

  // Countdown timer setup
  useEffect(() => {
    if (!isValidDate) return;

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(offerEndDate);
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isValidDate, offerEndDate]);

  // Modal display delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const isCountdownOver =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;


  if (loading || !selectedProduct) {
    return (
      <div className="max-w-screen-xl mx-auto p-6 mt-[170px]">
        <Row gutter={[32, 32]}>
          <Col xs={24} md={12}>
            <Skeleton.Image active style={{ width: 400, height: 400 }} />
          </Col>
          <Col xs={24} md={12}>
            <Skeleton active paragraph={{ rows: 6 }} />
          </Col>
        </Row>
      </div>
    );
  }
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return (
    <>
      <div className="max-w-screen-xl mx-auto p-6 mt-[170px] relative">
        <Row gutter={[32, 32]} align="top">
          <Col xs={24} md={12}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={`${backendUrl}/uploads/${selectedProduct?.image}`}
                alt={selectedProduct?.product_name}
                className="w-full rounded shadow"
              />
            </motion.div>

            {selectedProduct?.discount > 0 && (
              <motion.div
                className="absolute top-4 left-4 bg-[#FF4C4C] text-white px-4 py-2 rounded-full font-extrabold"
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", bounce: 0.6 }}
              >
                {selectedProduct?.discount} % OFF
              </motion.div>
            )}
          </Col>

          <Col xs={24} md={12}>
            {!isCountdownOver && (
              <div className="hidden md:block absolute z-[40] w-[200px] md:w-[300px] right-0 ">
                <Image src={Offerimg} preview={false} />
                <span className="text-red-700 absolute font-extrabold text-2xl right-[121px] bottom-[24px]">
                  {selectedProduct?.discount}
                </span>
              </div>
            )}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Tag color="#000000">{selectedProduct?.trend}</Tag>
              <Title level={4}>{selectedProduct?.product_name}</Title>
              <Rate disabled defaultValue={5} />
              <Text type="secondary" className="ml-2">
                50 Reviews
              </Text>
              <div className="mt-3 mb-4">
                {selectedProduct?.discount > 0 && (
                  <Text
                    delete
                    style={{
                      color: "#B03A66",
                      fontSize: 21,
                      marginRight: 8,
                    }}
                  >
                    ₹{originalPrice}
                  </Text>
                )}
                <Text
                  strong
                  style={{ color: "#B03A66", fontSize: 30, fontWeight: "bold" }}
                >
                  ₹{discountedPrice}
                </Text>
              </div>

              <Text strong>Available Color:</Text>
              <div className="my-2">
                <div style={{ display: "flex", alignItems: "center" }}>
                  {getAvailableColors().map((color) => (
                    <Button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        backgroundColor: color,
                        borderRadius: "50%",
                        width: 50,
                        height: 50,
                        marginRight: 10,
                        border:
                          selectedColor === color
                            ? "4px solid pink"
                            : "2px solid #ccc",
                        padding: 0,
                      }}
                    >
                      {selectedColor === color && (
                        <span
                          style={{
                            color: "pink",
                            fontWeight: "bold",
                            fontSize: 24,
                          }}
                        >
                          ✓
                        </span>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
              {selectedColor && (
                <>
                  <Text strong>Available Size:</Text>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {getAvailableSizes().map((size) => (
                      <Button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`!w-12 !h-12 !p-0 !rounded-md font-semibold text-sm ${
                          selectedSize === size
                            ? "!bg-black !text-white !border-black"
                            : "!bg-white !text-black !border-gray-300"
                        }`}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </>
              )}
              <div className="mt-2 flex items-center gap-2">
                <Button
                  size="small"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  −
                </Button>

                <InputNumber
                  min={1}
                  value={quantity}
                  onChange={handleQuantitySet}
                  style={{ width: 70, textAlign: "center" }}
                />

                <Button size="small" onClick={() => handleQuantityChange(1)}>
                  +
                </Button>
              </div>
              <div className="space-y-2">
                <Title level={4} style={{ color: "#1f2937" }}>
                  Offer Ends In:
                </Title>

                <Row gutter={[16, 16]} justify="start">
                  <Col xs={12} sm={6}>
                    <Card
                      bordered={false}
                      style={{
                        textAlign: "center",
                        backgroundColor: "#f3f4f6",
                      }}
                    >
                      <Title level={3} style={{ margin: 0, color: "#1f2937" }}>
                        {formatTime(timeLeft.days)}
                      </Title>
                      <Text type="secondary">Days</Text>
                    </Card>
                  </Col>

                  <Col xs={12} sm={6}>
                    <Card
                      bordered={false}
                      style={{
                        textAlign: "center",
                        backgroundColor: "#f3f4f6",
                      }}
                    >
                      <Title level={3} style={{ margin: 0, color: "#1f2937" }}>
                        {formatTime(timeLeft.hours)}
                      </Title>
                      <Text type="secondary">Hours</Text>
                    </Card>
                  </Col>

                  <Col xs={12} sm={6}>
                    <Card
                      bordered={false}
                      style={{
                        textAlign: "center",
                        backgroundColor: "#f3f4f6",
                      }}
                    >
                      <Title level={3} style={{ margin: 0, color: "#1f2937" }}>
                        {formatTime(timeLeft.minutes)}
                      </Title>
                      <Text type="secondary">Minutes</Text>
                    </Card>
                  </Col>

                  <Col xs={12} sm={6}>
                    <Card
                      bordered={false}
                      style={{
                        textAlign: "center",
                        backgroundColor: "#f3f4f6",
                      }}
                    >
                      <Title level={3} style={{ margin: 0, color: "#1f2937" }}>
                        {formatTime(timeLeft.seconds)}
                      </Title>
                      <Text type="secondary">Seconds</Text>
                    </Card>
                  </Col>
                </Row>
              </div>
              <Divider />
              <Paragraph>{selectedProduct?.description}</Paragraph>
              <Divider />

              <Button
                type="primary"
                block
                size="large"
                onClick={handleAddToCart}
                disabled={
                  loading ||
                  (timeLeft.days === 0 &&
                    timeLeft.hours === 0 &&
                    timeLeft.minutes === 0 &&
                    timeLeft.seconds === 0)
                }
                style={{
                  backgroundColor:
                    timeLeft.days === 0 &&
                    timeLeft.hours === 0 &&
                    timeLeft.minutes === 0 &&
                    timeLeft.seconds === 0
                      ? "#ccc" // Gray when expired
                      : "#4a1f2e", // Default color
                  border: "none",
                }}
              >
                {timeLeft.days === 0 &&
                timeLeft.hours === 0 &&
                timeLeft.minutes === 0 &&
                timeLeft.seconds === 0
                  ? "Offer Expired"
                  : "ADD TO BAG"}
              </Button>

              <div className="mt-4 mb-3">
                <Tag
                  color="green"
                  icon={<FaTruckArrowRight className="text-xl" />}
                >
                  Free Shipping
                </Tag>
                <Paragraph type="secondary">
                  On all U.S. orders over ₹100. <a href="#">Learn more</a>
                </Paragraph>
                <Divider className="my-4" />
                <Tag color="blue" icon={<GiReturnArrow className="text-xl" />}>
                  Easy Returns
                </Tag>
                <Paragraph type="secondary">
                  Extended returns through January 31.{" "}
                  <a href="#">Returns details</a>
                </Paragraph>
                <Divider className="my-4" />
                <Tag color="purple" icon={<ImGift className="text-2xl" />}>
                  Send As A Gift
                </Tag>
                <Paragraph type="secondary">
                  Add a free personalized note during checkout.
                </Paragraph>
              </div>

              <Title level={5}>Sustainability</Title>
              <div className="flex gap-2 flex-wrap">
                <Tag icon={<span>♻️</span>} color="success">
                  Renewed Materials
                </Tag>
                <Tag icon={<span>🧪</span>} color="cyan">
                  Cleaner Chemistry
                </Tag>
              </div>
            </motion.div>
          </Col>
        </Row>
      </div>
      <Review reviews={reviews} id={id} />
      <NewArrivals />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="relative w-full max-w-3xl h-[80vh] bg-transparent flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-50 cursor-pointer bg-red-500 text-white text-4xl rounded-full w-10 h-10 flex items-center justify-center hover:bg-black"
            >
              &times;
            </button>

            {/* Centered Modal Content */}
            <div className="w-full h-full flex items-center justify-center">
              <GiftBox timeLeft={timeLeft} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductOfferDetailsPage;

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
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { selectedProduct } = useSelector((state) => state.product);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [showForm, setShowForm] = useState(false);
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

  const toggleForm = () => setShowForm((prev) => !prev);
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
      })
    );
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

  const reviews = [
    {
      name: "ElizabethR Bklyn",
      verified: true,
      rating: 5,
      date: "14 days ago",
      title: "Warm and very attractive on",
      body: "Got this to keep my husband warm on those chilly late fall days...",
      profile: {
        height: "5’10”",
        weight: "170 – 180 lbs",
        type: "Fit",
        size: "L",
      },
    },
    {
      name: "Anonymous",
      verified: true,
      rating: 5,
      date: "14 days ago",
      title: "Super comfy",
      body: "Great quality, warm and super comfy...",
      profile: {
        height: "6’1”",
        weight: "180 – 190 lbs",
        type: "Fit",
        size: "L",
      },
    },
  ];

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

  return (
    <>
      <div className="max-w-screen-xl mx-auto p-6 mt-[170px]">
        <Row gutter={[32, 32]} align="top">
          <Col xs={24} md={12}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={`http://localhost:5005/uploads/${selectedProduct?.image}`}
                alt={selectedProduct?.product_name}
                className="w-full rounded shadow"
              />
            </motion.div>
          </Col>

          <Col xs={24} md={12}>
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
                <Text strong style={{ color: "#B03A66", fontSize: 20 }}>
                  ₹{selectedProduct?.price}
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
              <Divider />
              <Paragraph>{selectedProduct?.description}</Paragraph>
              <Divider />

              <Button
                type="primary"
                block
                size="large"
                onClick={handleAddToCart}
                disabled={loading}
                style={{ backgroundColor: "#4a1f2e", border: "none" }}
              >
                ADD TO BAG
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
      <div className="max-w-7xl mx-auto p-6">
        <Title level={4}>5.0 Overall Rating</Title>
        <Rate allowHalf disabled defaultValue={5} />
        <Row gutter={16} className="mt-4 mb-6">
          <Col span={12}>
            {[5, 4, 3, 2, 1].map((star) => (
              <Row key={star} align="middle" className="mb-1">
                <Col span={4}>{star} star</Col>
                <Col span={20}>
                  <Progress
                    percent={star === 5 ? 100 : 0}
                    showInfo={false}
                    strokeColor="gray"
                  />
                </Col>
              </Row>
            ))}
          </Col>
          <Col span={12}>
            <Text strong>Runs slightly large</Text>
            <div className="flex gap-2 items-center mt-1">
              <Text>Runs small</Text>
              <Progress
                percent={70}
                showInfo={false}
                size="small"
                strokeColor="#999"
              />
              <Text>Runs large</Text>
            </div>
          </Col>
        </Row>

        <Divider />

        {reviews.map((review, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="mb-6"
          >
            <Text strong>{review.name}</Text>{" "}
            {review.verified && <Text type="secondary">✔ Verified</Text>}
            <div className="flex items-center">
              <Rate disabled defaultValue={review.rating} />
              <Text type="secondary" className="ml-2">
                {review.date}
              </Text>
            </div>
            <Paragraph strong>{review.title}</Paragraph>
            <Paragraph>{review.body}</Paragraph>
            <Text type="secondary">
              Height: {review.profile.height} | Weight: {review.profile.weight}{" "}
              | Body Type: {review.profile.type} | Size Purchased:{" "}
              {review.profile.size}
            </Text>
          </motion.div>
        ))}

        <Divider />

        <div className="text-center mb-4">
          <Button type="primary" onClick={toggleForm}>
            {showForm ? "Close Review Form" : "Write a Review"}
          </Button>
        </div>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-100 p-4 rounded"
          >
            <Form layout="vertical">
              <Form.Item label="Name">
                <Input placeholder="Enter your name" />
              </Form.Item>
              <Form.Item label="Rating">
                <Rate />
              </Form.Item>
              <Form.Item label="Title">
                <Input placeholder="Review title" />
              </Form.Item>
              <Form.Item label="Review">
                <TextArea rows={4} placeholder="Write your review..." />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit Review
                </Button>
              </Form.Item>
            </Form>
          </motion.div>
        )}
      </div>
      <NewArrivals />
    </>
  );
};

export default ProductDetail;

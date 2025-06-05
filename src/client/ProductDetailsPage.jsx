import React, { useState } from "react";
import {
  Row,
  Col,
  Typography,
  Rate,
  Radio,
  Button,
  Divider,
  Tag,
  Progress,
  Input,
  Form,
} from "antd";
import { motion } from "framer-motion";
import NewArrivals from "./NewArrivals";
import { FaTruckArrowRight } from "react-icons/fa6";
import { GiReturnArrow } from "react-icons/gi";
import { ImGift } from "react-icons/im";
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const colors = [
  { name: "Black", hex: "#000000" },
  { name: "Brown", hex: "#5a3e36" },
  { name: "Navy", hex: "#1c1c7e" },
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const ProductDetail = () => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0].name);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };
  const reviews = [
    {
      name: "ElizabethR Bklyn",
      verified: true,
      rating: 5,
      date: "14 days ago",
      title: "Warm and very attractive on",
      body: "Got this to keep my husband warm on those chilly late fall days. He loves it as it not only is pretty warm but he looks good in it and he knows it.",
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
      body: "Great quality, warm and super comfy. Got the XL cuz I have a large back and it fits perfect. It does run a bit oversized which is good.",
      profile: {
        height: "6’1”",
        weight: "180 – 190 lbs",
        type: "Fit",
        size: "L",
      },
    },
  ];
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm((prev) => !prev);

  return (
    <>
      <div className="max-w-screen-xl mx-auto p-6 mt-[170px]">
        <Row gutter={[32, 32]} align="top">
          {/* LEFT - Product Image */}
          <Col xs={24} md={12}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="https://img.freepik.com/premium-photo/womens-summer-png-fashion-sticker-transparent-background_53876-979603.jpg?uid=R155413258&ga=GA1.1.471318040.1721215360&semt=ais_items_boosted&w=740"
                alt="Maxi Dress"
                className="w-full rounded shadow"
              />
            </motion.div>
          </Col>

          {/* RIGHT - Product Details */}
          <Col xs={24} md={12}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Title + Price */}
              <Title level={4}>Maxi Long Pattern Navy Blue</Title>
              <Rate disabled defaultValue={5} />
              <Text type="secondary" className="ml-2">
                50 Reviews
              </Text>

              <div className="mt-3 mb-4">
                <Text delete>$238</Text>{" "}
                <Text strong style={{ color: "#B03A66", fontSize: 20 }}>
                  $167
                </Text>
              </div>

              {/* Color Selection */}
              <Text strong>Color: </Text>
              <div className="my-2">
                <Radio.Group value={selectedColor} onChange={handleColorChange}>
                  {colors.map((color) => (
                    <Radio.Button
                      key={color.name}
                      value={color.name}
                      style={{
                        backgroundColor: color.hex,
                        borderRadius: "50%",
                        width: 30,
                        height: 30,
                        marginRight: 10,
                        border: "2px solid #ccc",
                      }}
                    />
                  ))}
                </Radio.Group>
              </div>

              {/* Size Selection */}
              <div className="mt-4 mb-2">
                <Text strong>Size:</Text>
                <div className="flex flex-wrap gap-2 mt-2">
                  {sizes.map((item) => (
                    <Button
                      key={item}
                      onClick={() => handleSizeChange(item)}
                      className={`!w-12 !h-12 !p-0 !rounded-md font-semibold text-sm ${
                        selectedSize === item
                          ? "!bg-black !text-white !border-black"
                          : "!bg-white !text-black !border-gray-300"
                      }`}
                      type={selectedSize === item ? "default" : "text"}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="mt-4 mb-2">
                <Button
                  type="primary"
                  block
                  size="large"
                  style={{ backgroundColor: "#4a1f2e", border: "none" }}
                >
                  ADD TO BAG
                </Button>
              </div>

              {/* Info Tags */}
              <div className="mt-4 mb-3">
                <Tag
                  color="green"
                  icon={<FaTruckArrowRight className="text-xl" />}
                >
                  Free Shipping
                </Tag>

                <Paragraph className="mt-1 mb-0" type="secondary">
                  On all U.S. orders over $100. <a href="#">Learn more</a>
                </Paragraph>

                <Divider className="my-4" />

                <Tag color="blue" icon={<GiReturnArrow className="text-xl" />}>
                  Easy Returns
                </Tag>
                <Paragraph className="mt-1 mb-0" type="secondary">
                  Extended returns through January 31.{" "}
                  <a href="#">Returns details</a>
                </Paragraph>

                <Divider className="my-4" />

                <Tag color="purple" icon={<ImGift className="text-2xl" />}>
                  Send As A Gift
                </Tag>
                <Paragraph className="mt-1" type="secondary">
                  Add a free personalized note during checkout.
                </Paragraph>
              </div>

              {/* Description */}
              <Divider />
              <Title level={5}>Part shirt, part jacket, all style.</Title>
              <Paragraph>
                Meet your new chilly weather staple. The Melrose Oversized
                Shacket has all the elements of a classic shirt — collar, snap
                buttons, and a shirttail hem — along with front chest flap
                pockets and an on-seam pocket. The fabric is soft, structured
                woven with TENCEL™ and certified recycled nylon blend. Thick
                cord, comfy, and oh-so easy to layer.
              </Paragraph>

              <Divider />

              {/* Sustainability */}
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
        <Rate allowHalf disabled defaultValue={5} color="black" />

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

        {/* Reviews */}
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
              Height: {review.profile.height} &nbsp;|&nbsp; Weight:{" "}
              {review.profile.weight} &nbsp;|&nbsp; Body Type:{" "}
              {review.profile.type} &nbsp;|&nbsp; Size Purchased:{" "}
              {review.profile.size}
            </Text>
          </motion.div>
        ))}

        <Divider />

        {/* Write Review Button */}
        <div className="text-center mb-4">
          <Button type="primary" onClick={toggleForm}>
            {showForm ? "Close Review Form" : "Write a Review"}
          </Button>
        </div>

        {/* Review Form */}
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

import React from "react";
import { motion } from "framer-motion";
import {
  Row,
  Col,
  Typography,
  Button,
  Divider,
  Image,
  Input,
  Popconfirm,
  Form,
} from "antd";
import { FaTrash } from "react-icons/fa";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { removeFromCartThunk, updateQuantity } from "../store/slice/CartSlice";
import { useDispatch, useSelector } from "react-redux";

const { Title, Text } = Typography;

export default function AddToCartAntd() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const handleQuantityChange = (index, delta) => {
    dispatch(updateQuantity({ index, delta }));
  };

  const handleRemove = (index) => {
    dispatch(removeFromCartThunk(index));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 2;
  const tax = 4;
  const total = subtotal + shipping + tax;

  return (
    <div className="container mx-auto mt-[150px]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 py-6 mt-20"
      >
        <Row gutter={[24, 24]} justify="center">
          {/* Cart Items */}
          <Col xs={24} lg={16}>
            <Title level={4}>Your Cart</Title>

            {cart.length === 0 ? (
              <Text type="secondary">Your cart is empty.</Text>
            ) : (
              cart.map((item, index) => (
                <div
                  key={`${item.id}-${item.selectedColor}-${item.selectedSize}-${index}`}
                >
                  <Row gutter={[16, 16]} align="middle" wrap>
                    <Col xs={6} sm={4}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={80}
                        height={80}
                        preview={false}
                        className="rounded"
                      />
                    </Col>
                    <Col xs={14} sm={16}>
                      <Text strong>{item.title}</Text>
                      <br />
                      <div className="flex gap-3">
                        <h1 className="text-black"> Size :</h1>
                        <Button className="w-8 !h-8 !p-0 !rounded-md font-semibold text-sm !bg-black !text-white !border-black">
                          {item.selectedSize}
                        </Button>
                      </div>
                      <br />
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-500">Color:</span>

                        <div
                          className="w-5 h-5 rounded-full border border-gray-300"
                          style={{
                            backgroundColor: item.selectedColor.toLowerCase(),
                          }}
                          title={item.selectedColor}
                        ></div>

                        <span className="capitalize text-sm text-gray-700">
                          {item.selectedColor}
                        </span>
                      </div>

                      <br />
                      <div className="text-black font-semibold mt-1">
                        ₹{item.price.toFixed(2)}
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <Button
                          size="small"
                          onClick={() => handleQuantityChange(index, -1)}
                        >
                          −
                        </Button>
                        <Text>{item.quantity}</Text>
                        <Button
                          size="small"
                          onClick={() => handleQuantityChange(index, 1)}
                        >
                          +
                        </Button>
                      </div>
                    </Col>
                    <Col xs={4} className="text-center">
                      <Popconfirm
                        title="Remove this item?"
                        onConfirm={() => handleRemove(index)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <FaTrash className="cursor-pointer text-red-500" />
                      </Popconfirm>
                    </Col>
                  </Row>
                  <Divider />
                </div>
              ))
            )}
          </Col>

          {/* Checkout Summary */}
          <Col xs={24} lg={8}>
            <div className="bg-[#eff1f2] p-6 rounded shadow-sm">
              <Title level={5}>Enter Details</Title>
              <Form layout="vertical">
                <Form.Item name="fullname">
                  <Input placeholder="Full Name" prefix={<UserOutlined />} />
                </Form.Item>
                <Form.Item name="email">
                  <Input placeholder="Email" prefix={<MailOutlined />} />
                </Form.Item>
                <Form.Item name="phone">
                  <Input placeholder="Phone No." prefix={<PhoneOutlined />} />
                </Form.Item>
                <Form.Item name="address">
                  <Input.TextArea rows={3} placeholder="Address" />
                </Form.Item>
              </Form>

              <Divider />

              <div className="space-y-2 text-sm text-black">
                <div className="flex justify-between text-black">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold">₹{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="font-semibold">₹{tax.toFixed(2)}</span>
                </div>
                <Divider />
                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                type="primary"
                block
                size="large"
                className="mt-4 bg-black hover:bg-gray-800"
                style={{ backgroundColor: "black" }}
              >
                Checkout
              </Button>
            </div>
          </Col>
        </Row>
      </motion.div>
    </div>
  );
}

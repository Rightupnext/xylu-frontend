import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { token } from "../auth/index";
const { Title, Text } = Typography;

export default function AddToCartAntd() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const userid = token.getUser();
  const [customerInfo, setCustomerInfo] = useState({
    id: userid.id,
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const handleInputChange = (field, value) => {
    const updated = { ...customerInfo, [field]: value };
    setCustomerInfo(updated);
    localStorage.setItem("customerInfo", JSON.stringify(updated));
  };
  const handleQuantityChange = (index, delta) => {
    dispatch(updateQuantity({ index, delta }));
  };

  const handleRemove = (index) => {
    dispatch(removeFromCartThunk(index));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );
  const shipping = 2;
  const tax = 4;
  const total = subtotal + shipping + tax;
  useEffect(() => {
    const savedCustomer = localStorage.getItem("customerInfo");
    if (savedCustomer) {
      setCustomerInfo(JSON.parse(savedCustomer));
    }
  }, []); // 👈 empty dependency array so it runs on mount only

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => console.log("Razorpay script loaded");
    document.body.appendChild(script);
  }, []);

  const handleCheckout = async () => {
    try {
      const customer = JSON.parse(localStorage.getItem("customerInfo"));
      const cartItems = JSON.parse(localStorage.getItem("cartItems"));

      if (!customer || !cartItems || cartItems.length === 0) {
        return alert("Missing cart or customer info");
      }

      const res = await axios.post("http://localhost:5005/order/create-order", {
        customer,
        cartItems,
        subtotal,
        shipping,
        tax,
        total,
      });

      const { id, amount, currency } = res.data;

      const options = {
        key: "rzp_test_nhhCl0y64g4Yt5",
        amount,
        currency,
        order_id: id,
        name: "My Shop",
        handler: async (response) => {
          await axios.post("http://localhost:5005/order/confirm-order", {
            paymentDetails: response,
          });

          alert("Payment successful!");
          localStorage.removeItem("cartItems");
          localStorage.removeItem("customerInfo");
          window.location.reload();
        },
        prefill: {
          name: customer.name,
          email: customer.email,
          contact: customer.phone,
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    }
  };

  return (
    <div className="container mx-auto px-4 mt-[150px]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-6"
      >
        <Row gutter={[24, 24]} justify="center" wrap>
          {/* Cart Items */}
          <Col xs={24} lg={16}>
            <Title level={4}>Your Cart</Title>

            {cart.length === 0 ? (
              <Text type="secondary">Your cart is empty.</Text>
            ) : (
              cart.map((item, index) => (
                <div
                  key={`${item.id}-${item.selectedColor}-${item.selectedSize}-${index}`}
                  className="mb-4"
                >
                  <Row gutter={[16, 16]} align="middle" wrap>
                    <Col xs={24} sm={6} className="text-center">
                      <Image
                        src={`http://localhost:5005/uploads/${item.image}`}
                        alt={item.product_name}
                        width="100%"
                        style={{ maxWidth: 120, height: "auto" }}
                        preview={false}
                        className="rounded mx-auto"
                      />
                    </Col>

                    <Col xs={24} sm={16}>
                      <Text strong>{item.product_name}</Text>
                      <br />
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-gray-500">Available Size:</span>
                        <Button
                          className="!w-8 !h-8 !p-0 !rounded-md font-semibold text-sm !bg-black !text-white !border-black"
                          disabled
                        >
                          {item.selectedSize}
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-gray-500">Available Color:</span>
                        <div
                          className="!w-8 !h-8 !p-0 !rounded-md font-semibold text-sm"
                          style={{
                            backgroundColor: item.selectedColor?.toLowerCase(),
                          }}
                          title={item.selectedColor}
                        ></div>
                        <span className="capitalize text-sm text-gray-700">
                          {item.selectedColor}
                        </span>
                      </div>
                      <div className="mt-2 text-black font-semibold">
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

                    <Col xs={24} sm={2} className="text-center">
                      <Popconfirm
                        title="Remove this item?"
                        onConfirm={() => handleRemove(index)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <FaTrash className="cursor-pointer text-red-500 mt-2" />
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
                <Form.Item label="Full Name">
                  <Input
                    placeholder="Full Name"
                    prefix={<UserOutlined />}
                    value={customerInfo.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </Form.Item>

                <Form.Item label="Email">
                  <Input
                    placeholder="Email"
                    prefix={<MailOutlined />}
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </Form.Item>

                <Form.Item label="Phone No.">
                  <Input
                    placeholder="Phone No."
                    prefix={<PhoneOutlined />}
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </Form.Item>

                <Form.Item label="Address">
                  <Input.TextArea
                    rows={3}
                    placeholder="Address"
                    value={customerInfo.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                  />
                </Form.Item>
              </Form>

              <Divider />

              <div className="space-y-2 text-sm text-black">
                <div className="flex justify-between">
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
                className="mt-4"
                style={{ backgroundColor: "black" }}
                onClick={handleCheckout}
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

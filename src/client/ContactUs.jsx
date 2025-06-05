import React from "react";
import { Card, Typography,Form, Input, Button, Row, Col } from "antd";
import { motion } from "framer-motion";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import contact from "../assets/contact/contact.jpg";
const { Title, Text } = Typography;

const contactInfo = [
  {
    icon: <EnvironmentOutlined style={{ fontSize: 24, color: "#B03A66" }} />,
    title: "Galleria Conference Hall",
    description: "address",
  },
  {
    icon: <PhoneOutlined style={{ fontSize: 24, color: "#B03A66" }} />,
    title: "Ticket Info",
    description: (
      <>
        <p>Phone No.: (+977) 524-191-2022</p>
        <p>Email: eventiz@mail.com</p>
      </>
    ),
  },
  {
    icon: <MailOutlined style={{ fontSize: 24, color: "#B03A66" }} />,
    title: "Event Schedule",
    description: (
      <>
        <p>Sept 12 - 14 Sept 2023</p>
        <p>Starts 09:00am to 06:00pm</p>
      </>
    ),
  },
];

const ContactPage = () => {
    const onFinish = (values) => {
    console.log("Form submitted: ", values);
  };
  return (
    <>
    <div className="p-6 bg-white sm:mt-[110px] mt-[146px]">
      {/* Banner */}
      <motion.div
        className="overflow-hidden rounded-lg shadow-md mb-8"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={contact}
          alt="Super Sale Banner"
          className="w-full h-auto object-cover"
        />
      </motion.div>

      {/* Headings */}
      <motion.div
        className="text-center mb-8"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Title level={4}>Get in touch</Title>
        <Title level={3}>
          How can we <span style={{ color: "#B03A66" }}>Help?</span>
        </Title>
      </motion.div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactInfo.map((info, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Card bordered hoverable className="text-center">
              <div className="mb-4">{info.icon}</div>
              <Title level={5}>{info.title}</Title>
              <Text className="block">{info.description}</Text>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
    <div className="p-6 bg-white max-w-6xl mx-auto">
      <Row gutter={[32, 32]} justify="center" align="top">
        {/* Form Section */}
        <Col xs={24} md={12}>
          <motion.div
            className="border p-6 rounded-lg shadow-sm"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Title level={4} style={{ color: "#B03A66" }}>Send us a message</Title>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item name="name" rules={[{ required: true }]} label="Name">
                <Input placeholder="Enter your name" />
              </Form.Item>
              <Form.Item name="phone" rules={[{ required: true }]} label="Phone">
                <Input placeholder="Enter your phone number" />
              </Form.Item>
              <Form.Item name="email" rules={[{ required: true, type: "email" }]} label="Email">
                <Input placeholder="Enter your email" />
              </Form.Item>
              <Form.Item name="message" label="Comments">
                <Input.TextArea rows={4} placeholder="Your message..." />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ backgroundColor: "#ec407a", borderColor: "#ec407a" }}>
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </motion.div>
        </Col>

        {/* Map Section */}
        <Col xs={24} md={12}>
          <motion.div
            className="w-full h-full rounded-md overflow-hidden shadow-sm"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=Vadodara,+Gujarat,+India&output=embed"
              width="100%"
              height="400px"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            ></iframe>
          </motion.div>
        </Col>
      </Row>
    </div>
    </>
  );
};

export default ContactPage;

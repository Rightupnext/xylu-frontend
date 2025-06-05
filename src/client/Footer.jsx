import React from "react";
import { Row, Col, Input, Typography } from "antd";
import {
  FacebookFilled,
  InstagramOutlined,
  YoutubeFilled,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa6";
const { Title, Text } = Typography;

const Footer = () => {
  return (
    <div className="bg-[#fdcbde] p-6 md:p-12 rounded-t-[50px] shadow-2xl">
      {/* Newsletter */}
      <div className="text-center mb-10">
        <Title level={4} className="text-[#b03a66] !mb-1">
          Be the first to hear about all things.
        </Title>
        <Text className="text-black">
          Stay connected for exclusive offers and latest updates on Xylu
        </Text>
        <div className="max-w-lg mx-auto mt-4 relative">
          <input
            placeholder="Email"
            className="rounded-full w-full pr-12 py-[15px] bg-gray-50 text-black px-4 ring-[#a5496c] ring-2 placeholder-black"
          />

          <FaArrowRight className="absolute right-5 top-[18px] text-lg text-[#b03a66]" />
        </div>
      </div>

      {/* Footer links section */}
      <Row gutter={[32, 32]} justify="center">
        {/* Social Media */}
        <Col xs={24} md={6}>
          <h1 className="text-2xl text-black">Join Our Xylu Family</h1>
          <br />
          {/* <Text className="text-[#b03a66]">Social Media</Text> */}
          <div className="flex gap-4 mt-3 text-xl">
            <FaInstagramSquare className="text-rose-500 w-[40px] h-[40px] cursor-pointer" />
            <FaFacebook className="text-blue-500 w-[40px] h-[40px] cursor-pointer" />
            <BsYoutube className="text-red-500 w-[40px] h-[40px] cursor-pointer" />
          </div>
        </Col>

        {/* COMPANY */}
        <Col xs={12} sm={6} md={4}>
          <Title level={5} className="text-[#b03a66]">
            COMPANY
          </Title>
          <ul className="space-y-1 text-black ">
            <li>About</li>
            <li>Collection</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </Col>

        {/* SHOP */}
        <Col xs={12} sm={6} md={5}>
          <Title level={5} className="text-[#b03a66]">
            SHOP
          </Title>
          <ul className="space-y-1 text-black">
            <li>Ethnic Wear</li>
            <li>Occasion Wear</li>
            <li>Western Wear</li>
            <li>Fusion Wear</li>
            <li>Maternity Wear</li>
            <li>By Length</li>
            <li>By Length</li>
          </ul>
        </Col>

        {/* POLICIES */}
        <Col xs={12} sm={6} md={4}>
          <Title level={5} className="text-[#b03a66]">
            POLICIES
          </Title>
          <ul className="space-y-1 text-black">
            <li>Returns & Refunds</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Shipping Policy</li>
          </ul>
        </Col>

        {/* CONTACT US */}
        <Col xs={12} sm={6} md={5}>
          <Title level={5} className="text-[#b03a66]">
            CONTACT US
          </Title>
          <ul className="space-y-1 text-black">
            <li>xylu@gmail.com</li>
            <li>+91 87898 98678</li>
            <li>Xyz Address</li>
          </ul>
        </Col>
      </Row>

      {/* Divider and Copyright */}
      <div className="my-6 border-t border-black w-full"></div>
      <p className="text-center text-xs text-[#b03a66] font-semibold">
        COPYRIGHT © {new Date().getFullYear()} XYLU CLOTHING INC. ALL RIGHTS
        RESERVED.
      </p>

      <a href="https://www.rightupnextinnovations.com/" target="_blank">
        <p className="text-center text-xs text-black hover:underline">
          Developed By RightUpNext Innovtaions Pvt Ltd
          <br /> Coimbatore,Tamilnadu
        </p>
      </a>
    </div>
  );
};

export default Footer;

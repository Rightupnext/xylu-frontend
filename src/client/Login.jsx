import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const [activeTab, setActiveTab] = useState("signup");

  const motionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center items-center p-6">
        {/* Tabs */}
        <div className="w-full max-w-md mb-6">
          <div className="flex gap-1 text-sm font-semibold tracking-wide mb-2">
            {["signup", "signin"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                style={{
                  cursor: "pointer",
                  padding: "4px 12px",
                  borderRadius: "0.25rem",
                  backgroundColor: activeTab === tab ? "#a44c6c" : "#fff",
                  color: activeTab === tab ? "#fff" : "#6b7280",
                  border: "1px solid #ccc",
                }}
              >
                {tab === "signup" ? "SIGN-UP" : "SIGN-IN"}
              </button>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-black">Get Started Now</h2>
          <p className="text-gray-500 mb-6">
            {activeTab === "signup"
              ? "Enter your credentials to create your account"
              : "Login to your account"}
          </p>
        </div>

        {/* Form Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={motionVariants}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
          >
            <Form layout="vertical">
              {activeTab === "signup" && (
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: "Please enter your name" }]}
                >
                  <Input placeholder="Name" />
                </Form.Item>
              )}

              <Form.Item
                label="Email address"
                name="email"
                rules={[{ required: true, type: "email", message: "Valid email required" }]}
              >
                <Input placeholder="xyz@xyz.com" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please enter your password" }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              {activeTab === "signup" && (
                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    { required: true, message: "Please confirm your password" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("Passwords do not match!"));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm Password" />
                </Form.Item>
              )}

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    fontWeight: "bold",
                    padding: "10px 0",
                  }}
                >
                  {activeTab === "signin" ? "Sign In" : "Sign Up"}
                </Button>
              </Form.Item>
            </Form>

            {/* Switch Tab Prompt */}
            <div className="text-center text-sm mt-4 text-[#a44c6c]">
              {activeTab === "signin" ? (
                <>
                  Don't have an account?{" "}
                  <span
                    className="text-blue-600 cursor-pointer"
                    onClick={() => setActiveTab("signup")}
                  >
                    Sign Up
                  </span>
                </>
              ) : (
                <>
                  Have an account?{" "}
                  <span
                    className="text-blue-600 cursor-pointer"
                    onClick={() => setActiveTab("signin")}
                  >
                    Sign In
                  </span>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right side (for design) */}
      <div className="hidden lg:flex w-1/2 bg-[#9C4464] relative"></div>
    </div>
  );
};

export default Login;

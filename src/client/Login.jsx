import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../store/slice/authSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("signup");
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const motionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

 const onFinish = async (values) => {
  let response;

  if (activeTab === "signup") {
    response = await dispatch(registerUser(values));

    // Optional: check if registration succeeded
    const success = response?.payload?.success || response?.meta?.requestStatus === "fulfilled";
    
    if (success) {
      // Switch to sign-in tab
      setActiveTab("signin");


      form.resetFields();
      return; // exit early
    }

  } else {
    // Sign-in logic
    response = await dispatch(loginUser(values));

    const userRole = response?.payload?.user?.role || response?.user?.role;

    if (userRole === "admin") {
      navigate("/admin");
    } else {
      window.history.back();
    }

    form.resetFields();
  }
};


  return (
    <div className="flex min-h-screen w-full mt-[100px]">
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-md mb-6">
          <div className="flex gap-1 text-sm font-semibold tracking-wide mb-2">
            {["signup", "signin"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab);
                  form.resetFields();
                }}
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
            <Form
              layout="vertical"
              form={form}
              onFinish={onFinish}
              autoComplete="off"
            >
              {activeTab === "signup" && (
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please enter your name" },
                  ]}
                >
                  <Input placeholder="Name" />
                </Form.Item>
              )}

              <Form.Item
                label="Email address"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Valid email required",
                  },
                ]}
              >
                <Input placeholder="xyz@xyz.com" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                  { min: 6, message: "Minimum 6 characters" },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              {activeTab === "signup" && (
                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Passwords do not match!")
                        );
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

            <div className="text-center text-sm mt-4 text-[#a44c6c]">
              {activeTab === "signin" ? (
                <>
                  Don&apos;t have an account?{" "}
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

      <div className="hidden lg:flex w-1/2 bg-[#9C4464] relative"></div>
    </div>
  );
};

export default Login;

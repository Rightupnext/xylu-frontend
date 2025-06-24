import React, { useEffect, useState } from "react";
import {
  Input,
  Select,
  Row,
  Col,
  Button,
  Card,
  Tag,
  Typography,
  Tooltip,
  Modal,
  Divider,
  Steps,
  Form,
  message,
  Image,
  Popover,
  Space,
} from "antd";
import {
  SearchOutlined,
  PrinterOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import {
  getUserIdByOrder,
  clientUpdateOrderIssue,
} from "../store/slice/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { token } from "../auth/index";
const { Title, Text } = Typography;
const { Option } = Select;
const { Step } = Steps;

const OrderHistory = () => {
  const dispatch = useDispatch();
  const Orders = useSelector((state) => state.order);
  // console.log("order", Orders);
  const user = token.getUser();
  useEffect(() => {
    dispatch(getUserIdByOrder(user.id));
  }, [dispatch]);
  const [searchFilters, setSearchFilters] = useState({
    orderId: "",
    email: "",
    status: "all",
    dateRange: "all",
  });

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showReturnForm, setShowReturnForm] = useState(false);
  const renderStatusTag = (status) => {
    const colorMap = {
      pending: "blue",
      packed: "purple",
      shipped: "yellow",
      delivered: "green",
      "order-cancelled": "red",
    };
    return (
      <Tag color={colorMap[status.toLowerCase()] || "default"}>{status}</Tag>
    );
  };

  const getStatusStep = (status) => {
    const statusSteps = ["pending", "packed", "shipped", "delivered"];
    const index = statusSteps.indexOf(status.toLowerCase());
    return index !== -1 ? index : 0;
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleReturnSubmit = (values) => {
    const { issue_type, issue_description } = values;
    dispatch(
      clientUpdateOrderIssue({
        id: selectedOrder.id,
        issue_type,
        issue_description,
      })
    );
    console.log("Return reason submitted:", values);
    setShowReturnForm(false);
  };

  const getLineColor = (status) => {
    const colorMap = {
      pending: "#1890ff",
      packed: "#722ed1",
      shipped: "#9254de",
      delivered: "#52c41a",
    };
    return colorMap[status.toLowerCase()] || "#d9d9d9";
  };

  const renderOtpBoxes = (otp) => {
    if (!otp || typeof otp !== "string") return null;

    const digits = otp.slice(0, 4).split("");

    return (
      <Space>
        {digits.map((digit, index) => (
          <Tag
            key={index}
            color="grey"
            style={{ width: 24, textAlign: "center", padding: "2px 0" }}
          >
            {digit}
          </Tag>
        ))}
      </Space>
    );
  };

  return (
    <div style={{ padding: 24, marginTop: 123 }} className="bg-gray-100">
      <Title level={3}>Order History</Title>

      {/* FILTERS */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Search Order ID"
              prefix={<SearchOutlined />}
              value={searchFilters.orderId}
              onChange={(e) =>
                setSearchFilters({ ...searchFilters, orderId: e.target.value })
              }
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Search Email"
              prefix={<SearchOutlined />}
              value={searchFilters.email}
              onChange={(e) =>
                setSearchFilters({ ...searchFilters, email: e.target.value })
              }
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              value={searchFilters.status}
              onChange={(value) =>
                setSearchFilters({ ...searchFilters, status: value })
              }
              style={{ width: "100%" }}
            >
              <Option value="all">All Status</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Processing">Processing</Option>
              <Option value="Delivered">Delivered</Option>
              <Option value="Canceled">Canceled</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              value={searchFilters.dateRange}
              onChange={(value) =>
                setSearchFilters({ ...searchFilters, dateRange: value })
              }
              style={{ width: "100%" }}
            >
              <Option value="all">All Time</Option>
              <Option value="today">Today</Option>
              <Option value="week">This Week</Option>
              <Option value="month">This Month</Option>
              <Option value="year">This Year</Option>
            </Select>
          </Col>
        </Row>
      </Card>

      {/* ORDER CARDS */}
      <Row gutter={[16, 16]}>
        {Array.isArray(Orders?.orders) &&
          [...Orders.orders]
            .reverse()
            .filter((pay) => pay.razor_payment === "done")
            .map((order) => {
              return (
                <Col xs={24} md={12} key={order.id}>
                  <Card
                    title={<Text strong>{`OrderId # ${order.id}`}</Text>}
                    extra={
                      <Space>
                        {renderStatusTag(order.order_status)}
                        {renderOtpBoxes(order.otp)}
                      </Space>
                    }
                    actions={[
                      <Tooltip title="Print" key="print">
                        <PrinterOutlined style={{ color: "#faad14" }} />
                      </Tooltip>,
                      <Tooltip title="Export" key="export">
                        <ExportOutlined style={{ color: "#faad14" }} />
                      </Tooltip>,
                    ]}
                  >
                    <Text strong style={{ fontSize: 17 }}>
                      Delivery Address
                    </Text>

                    <p>
                      <Text strong>Order Date:</Text>
                      {new Date(order?.created_at).toLocaleString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>

                    <p>
                      <Text strong>Name:</Text> {order.customer_name}
                    </p>
                    <p>
                      <Text strong>Email:</Text> {order.customer_email}
                    </p>
                    <p>
                      <Text strong>Payment:</Text> Online
                    </p>
                    <Button
                      type="primary"
                      style={{ backgroundColor: "black" }}
                      onClick={() => handleViewDetails(order)}
                    >
                      View Details
                    </Button>
                  </Card>
                </Col>
              );
            })}
      </Row>

      {/* MODAL */}
      <Modal
        title={`Order Details #${selectedOrder?.id}`}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setShowReturnForm(false);
        }}
        footer={null}
        width={800}
      >
        {selectedOrder && (
          <>
            {selectedOrder.order_status === "order-cancelled" ? (
              <Steps
                current={0}
                status="error"
                size="small"
                style={{ marginBottom: 24 }}
              >
                <Step title="Order Cancelled" />
              </Steps>
            ) : (
              <div>
                <div className="py-[10px] font-bold">
                  <Text>Payment Id : {selectedOrder?.razorpay_payment_id}</Text>
                </div>
                <Steps
                  current={getStatusStep(selectedOrder.order_status)}
                  size="small"
                  className="custom-step-line"
                  style={{
                    marginBottom: 24,
                    "--line-color": getLineColor(selectedOrder.order_status),
                  }}
                >
                  <Step title="Pending" />
                  <Step title="Packed" />
                  <Step title="Shipped" />
                  <Step title="Delivered" />
                </Steps>
              </div>
            )}

            <div>
              {selectedOrder?.cart_items.map((product, index) => (
                <Card key={index} style={{ marginBottom: 12 }}>
                  <Row gutter={[16, 8]} align="middle">
                    {/* LEFT COLUMN - IMAGE */}
                    <Col xs={24} sm={8}>
                      <Image
                        src={`http://localhost:5005/uploads/${product?.image}`}
                        alt={product?.product_name}
                        width="100%"
                        style={{
                          // objectFit: "cover",
                          borderRadius: "8px",
                          border: "1px solid #eee",
                          // height: "200px",
                        }}
                        preview={false}
                      />
                    </Col>

                    {/* RIGHT COLUMN - DETAILS */}
                    <Col xs={24} sm={16} justify="end">
                      <div className="float-end">
                        <Text strong style={{ fontSize: 16 }}>
                          {product?.product_name}
                        </Text>
                        <p>Product Code: {product?.product_code}</p>

                        {/* Size */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginTop: 8,
                          }}
                        >
                          <Text style={{ margin: 0 }}>Size:</Text>
                          <Button
                            className={`!w-12 !h-12 !p-0 !rounded-md font-semibold text-sm ${
                              product.selectedSize
                                ? "!bg-black !text-white !border-black"
                                : "!bg-white !text-black !border-gray-300"
                            }`}
                          >
                            {product.selectedSize}
                          </Button>
                        </div>

                        {/* Color */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginTop: 8,
                          }}
                        >
                          <Text style={{ margin: 0 }}>Color:</Text>
                          <Popover
                            content={product.selectedColor || "N/A"}
                            title="Color"
                            placement="topRight"
                          >
                            <Button
                              style={{
                                backgroundColor:
                                  product.selectedColor || "#ccc",
                                borderRadius: "50%",
                                width: 40,
                                height: 40,
                                border: product.selectedColor
                                  ? "3px solid pink"
                                  : "2px solid #ccc",
                                padding: 0,
                              }}
                            >
                              {product.selectedColor && (
                                <span
                                  style={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    fontSize: 16,
                                  }}
                                >
                                  ✓
                                </span>
                              )}
                            </Button>
                          </Popover>
                        </div>

                        {/* Quantity */}
                        <p style={{ marginTop: 8 }}>Qty : {product.quantity}</p>
                        <p style={{ marginTop: 8 }}>
                          Price : ₹ {product.price}
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Card>
              ))}
            </div>

            <Divider />

            <Row justify="end">
              <Col span={12}>
                <div className="float-end text-right">
                  <p>
                    Subtotal: ₹{" "}
                    {parseFloat(selectedOrder?.subtotal || 0).toFixed(2)}
                  </p>
                  <p>
                    Shipping: ₹{" "}
                    {parseFloat(selectedOrder?.shipping || 0).toFixed(2)}
                  </p>
                  <p>Tax: ₹ {parseFloat(selectedOrder?.tax || 0).toFixed(2)}</p>
                  <Title level={5}>
                    Total: ₹ {parseFloat(selectedOrder?.total || 0).toFixed(2)}
                  </Title>
                </div>
              </Col>
            </Row>

            {!showReturnForm ? (
              <Button
                type="primary"
                danger
                style={{ marginTop: 16 }}
                onClick={() => setShowReturnForm(true)}
              >
                Request Return
              </Button>
            ) : (
              <Form
                layout="vertical"
                initialValues={selectedOrder}
                onFinish={handleReturnSubmit}
                style={{ marginTop: 24 }}
              >
                <Form.Item
                  name="issue_type"
                  label="Return Reason"
                  rules={[
                    { required: true, message: "Please select a reason" },
                  ]}
                >
                  <Select placeholder="Select reason">
                    <Option value="damaged">Damaged Product</Option>
                    <Option value="wrong-item-received">
                      Wrong Item Received
                    </Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="issue_description" label="Issue Description">
                  <Input.TextArea
                    rows={4}
                    placeholder="Describe the issue..."
                  />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ backgroundColor: "black" }}
                >
                  Submit Return Request
                </Button>
              </Form>
            )}
          </>
        )}
      </Modal>
    </div>
  );
};

export default OrderHistory;

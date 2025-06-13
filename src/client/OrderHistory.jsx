import React, { useState } from "react";
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
} from "antd";
import {
  SearchOutlined,
  PrinterOutlined,
  ExportOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;
const { Step } = Steps;

const OrderHistory = () => {
  const [searchFilters, setSearchFilters] = useState({
    orderId: "",
    email: "",
    status: "all",
    dateRange: "all",
  });

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showReturnForm, setShowReturnForm] = useState(false);

  const orders = [
    {
      id: "ORD-001",
      date: new Date(2024, 0, 15),
      customerName: "John Doe",
      email: "john@example.com",
      paymentStatus: "Paid",
      orderStatus: "delivered",
      products: [
        {
          name: "Product 1",
          code: "PRD-100",
          size: "M",
          color: "Black",
          qty: 2,
          price: 29.99,
        },
        {
          name: "Product 2",
          code: "PRD-101",
          size: "M",
          color: "Black",
          qty: 1,
          price: 49.99,
        },
      ],
      shipping: 5.99,
      tax: 10.99,
    },
    {
      id: "ORD-002",
      date: new Date(2024, 1, 10),
      customerName: "Alice Smith",
      email: "alice@example.com",
      paymentStatus: "Unpaid",
      orderStatus: "pending",
      products: [
        {
          name: "Product A",
          code: "PRD-102",
          size: "L",
          color: "White",
          qty: 1,
          price: 59.99,
        },
      ],
      shipping: 4.99,
      tax: 5.0,
    },
    {
      id: "ORD-003",
      date: new Date(2024, 2, 5),
      customerName: "Bob Johnson",
      email: "bob@example.com",
      paymentStatus: "Paid",
      orderStatus: "shipped",
      products: [
        {
          name: "Product B",
          code: "PRD-103",
          size: "S",
          color: "Blue",
          qty: 3,
          price: 19.99,
        },
      ],
      shipping: 6.99,
      tax: 3.5,
    },
    {
      id: "ORD-004",
      date: new Date(2024, 3, 22),
      customerName: "Diana Prince",
      email: "diana@example.com",
      paymentStatus: "Paid",
      orderStatus: "order-cancelled",
      products: [
        {
          name: "Product C",
          code: "PRD-104",
          size: "XL",
          color: "Red",
          qty: 1,
          price: 89.99,
        },
      ],
      shipping: 0.0,
      tax: 8.0,
    },
  ];

  const renderStatusTag = (status) => {
    const colorMap = {
      pending: "blue",
      packed: "purple",
      shipped: "magenta",
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
    console.log("Return reason submitted:", values);
    message.success("Return request submitted");
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
        {orders.map((order) => (
          <Col xs={24} md={12} key={order.id}>
            <Card
              title={<Text strong>{order.id}</Text>}
              extra={renderStatusTag(order.orderStatus)}
              actions={[
                <Tooltip title="Print" key="print">
                  <PrinterOutlined style={{ color: "#faad14" }} />
                </Tooltip>,
                <Tooltip title="Export" key="export">
                  <ExportOutlined style={{ color: "#faad14" }} />
                </Tooltip>,
              ]}
            >
              <p>
                {order.date.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <p>
                <Text strong>Customer:</Text> {order.customerName}
              </p>
              <p>
                <Text strong>Email:</Text> {order.email}
              </p>
              <p>
                <Text strong>Payment:</Text> {order.paymentStatus}
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
        ))}
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
            {selectedOrder.orderStatus === "order-cancelled" ? (
              <Steps
                current={0}
                status="error"
                size="small"
                style={{ marginBottom: 24 }}
              >
                <Step title="Order Cancelled" />
              </Steps>
            ) : (
              <Steps
                current={getStatusStep(selectedOrder.orderStatus)}
                size="small"
                className="custom-step-line"
                style={{
                  marginBottom: 24,
                  "--line-color": getLineColor(selectedOrder.orderStatus),
                }}
              >
                <Step title="Pending" />
                <Step title="Packed" />
                <Step title="Shipped" />
                <Step title="Delivered" />
              </Steps>
            )}

            <div>
              {selectedOrder.products.map((product, index) => (
                <Card key={index} style={{ marginBottom: 12 }}>
                  <Row justify="space-between">
                    <Col>
                      <Text strong>{product.name}</Text>
                      <p>Code: {product.code}</p>
                      <p>Size: {product.size}</p>
                      <p>Color: {product.color}</p>
                      <p>Qty: {product.qty}</p>
                    </Col>
                    <Col style={{ textAlign: "right" }}>
                      <Text>${product.price.toFixed(2)}</Text>
                      <p style={{ color: "#aaa" }}>
                        Total: ${(product.price * product.qty).toFixed(2)}
                      </p>
                    </Col>
                  </Row>
                </Card>
              ))}
            </div>

            <Divider />

            <Row justify="end">
              <Col span={12}>
                <p>
                  Subtotal: $
                  {selectedOrder.products
                    .reduce((sum, p) => sum + p.price * p.qty, 0)
                    .toFixed(2)}
                </p>
                <p>Shipping: ${selectedOrder.shipping.toFixed(2)}</p>
                <p>Tax: ${selectedOrder.tax.toFixed(2)}</p>
                <Title level={5}>
                  Total: $
                  {(
                    selectedOrder.products.reduce(
                      (sum, p) => sum + p.price * p.qty,
                      0
                    ) +
                    selectedOrder.shipping +
                    selectedOrder.tax
                  ).toFixed(2)}
                </Title>
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
                onFinish={handleReturnSubmit}
                style={{ marginTop: 24 }}
              >
                <Form.Item
                  name="reason"
                  label="Return Reason"
                  rules={[
                    { required: true, message: "Please select a reason" },
                  ]}
                >
                  <Select placeholder="Select reason">
                    <Option value="damaged">Damaged Product</Option>
                    <Option value="wrong">Wrong Item Received</Option>
                    <Option value="not_satisfied">Not Satisfied</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="description" label="Issue Description">
                  <Input.TextArea
                    rows={4}
                    placeholder="Describe the issue..."
                  />
                </Form.Item>
                <Button type="primary" htmlType="submit">
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

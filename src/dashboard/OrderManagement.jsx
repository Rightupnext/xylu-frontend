import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Tag,
  Space,
  Typography,
  Button,
  Modal,
  Form,
  Input as AntInput,
  Select,
  Image,
  Divider,
  Popconfirm,
  Popover,
} from "antd";
import { EditOutlined, DeleteOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, adminUpdateOrder } from "../store/slice/orderSlice";
import { token } from "../auth";
const { Search } = Input;
const { Text, Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const OrderManagement = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const dispatch = useDispatch();
  const Orders = useSelector((state) => state.order);
  const Data = Array.isArray(Orders?.orders?.data)
    ? Orders.orders.data
        .filter((pay) => pay.razor_payment === "done")
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sort by most recent
    : [];

  // console.log("order", Orders)
  const [searchData, setSearchData] = useState("");
  const filterdata = Data.filter((order) => {
    const search = searchData.toLowerCase();
    return (
      order.id.toString().includes(search) ||
      order.razorpay_payment_id.toLowerCase().includes(search) ||
      order.customer_name.toLowerCase().includes(search) ||
      order.customer_email.toLowerCase().includes(search) ||
      order.customer_phone.includes(search)||
      order.order_status.includes(search)
    );
  });
  // console.log("filterdata", filterdata);
  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    form.setFieldsValue({ otp: newOtp.join("") }); // update form value
  };
  const user = token.getUser();
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const showModal = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };
  const colorMap = {
    pending: "blue",
    packed: "purple",
    shipped: "yellow",
    delivered: "green",
    "order-cancelled": "red",
  };
  const columns = [
    {
      title: "ORDER ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "PAYMENT ID",
      dataIndex: "razorpay_payment_id",
      key: "razorpay_payment_id",
      render: (id) => id || <Text type="secondary">Not Paid</Text>,
    },
    {
      title: "CUSTOMER",
      key: "customer",
      render: (_, record) => (
        <div>
          <Text strong>{record.customer_name}</Text>
          <br />
          <Text type="secondary">{record.customer_phone}</Text>
        </div>
      ),
    },
    {
      title: "AMOUNT",
      dataIndex: "total",
      key: "total",
      render: (amount) => <Text strong>₹{amount}</Text>,
    },
    {
      title: "STATUS",
      dataIndex: "order_status",
      key: "order_status",
      render: (status) => {
        const color = colorMap[status] || "default";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "DELIVERY PERSON",
      key: "deliveryman",
      render: (_, record) => (
        <div>
          <Text strong>{record.deliveryman_name || "Not Assigned"}</Text>
          <br />
          <Text type="secondary">{record.deliveryman_phone || "N/A"}</Text>
        </div>
      ),
    },
    {
      title: "ACTIONS",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            type="link"
            onClick={() => showModal(record)}
          />

          <Popconfirm
            title="Are you sure you want to delete this order?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} type="link" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const [form] = Form.useForm();
  const handleFormFinish = (values) => {
    const otp = `${values.otp1 || ""}${values.otp2 || ""}${values.otp3 || ""}${
      values.otp4 || ""
    }`;
    const {
      deliveryman_name,
      deliveryman_phone,
      order_status,
      admin_issue_returnReply,
    } = values;

    dispatch(
      adminUpdateOrder({
        id: selectedOrder.id,
        deliveryman_name,
        deliveryman_phone,
        otp,
        order_status,
        admin_issue_returnReply,
      })
    );

    // console.log("Form Submitted:", values);

    // ✅ Clear OTP fields after submission
    form.setFieldsValue({
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
    });

    setIsModalVisible(false);
  };
const backendUrl = import.meta.env.VITE_BACKEND_URL
  return (
    <div style={{ padding: 24, position: "relative", paddingBottom: 100 }}>
      <Title level={3}>Order Management</Title>

      <div style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search orders..."
          style={{ width: 300 }}
          onChange={(e) => setSearchData(e.target.value)}
        />
      </div>

      <Table
        columns={columns}
        dataSource={filterdata}
        pagination={{ pageSize: 50 }}
        bordered
        rowKey="id"
      />

      {/* === EDIT ORDER MODAL === */}
      {selectedOrder && (
        <Modal
          title="Edit Order"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={() => form.submit()}>
              Save Changes
            </Button>,
          ]}
          width={1300}
        >
          <Form
            layout="vertical"
            initialValues={selectedOrder}
            onFinish={handleFormFinish}
            form={form}
          >
            <div style={{ display: "flex", gap: 24 }}>
              <Form.Item label="Order ID" name="id" style={{ flex: 1 }}>
                <AntInput readOnly style={{ color: "black" }} />
              </Form.Item>
              <Form.Item
                label="Payment ID"
                name="razorpay_payment_id"
                style={{ flex: 1 }}
              >
                <AntInput readOnly style={{ color: "black" }} />
              </Form.Item>
            </div>

            <div style={{ display: "flex", gap: 24 }}>
              <Form.Item
                label="Customer Name"
                name={"customer_name"}
                style={{ flex: 1 }}
              >
                <AntInput readOnly style={{ color: "black" }} />
              </Form.Item>
              <Form.Item
                label="Order Status"
                name="order_status"
                style={{ flex: 1 }}
              >
                <Select defaultValue="pending">
                  {Object.entries(colorMap).map(([status, color]) => (
                    <Option key={status} value={status}>
                      <Tag color={color}>{status.toUpperCase()}</Tag>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div style={{ display: "flex", gap: 24 }}>
              <Form.Item
                label="Delivery Person Name"
                name={"deliveryman_name"}
                style={{ flex: 1 }}
              >
                <AntInput />
              </Form.Item>
              <Form.Item
                label="Delivery Person Phone"
                name={"deliveryman_phone"}
                style={{ flex: 1 }}
              >
                <AntInput style={{ marginBottom: 8 }} />
              </Form.Item>
              <Form.Item label="OTP">
                <div style={{ display: "flex", gap: 8 }}>
                  <Form.Item name="otp1" noStyle>
                    <Input
                      maxLength={1}
                      style={{ width: 50, textAlign: "center" }}
                    />
                  </Form.Item>
                  <Form.Item name="otp2" noStyle>
                    <Input
                      maxLength={1}
                      style={{ width: 50, textAlign: "center" }}
                    />
                  </Form.Item>
                  <Form.Item name="otp3" noStyle>
                    <Input
                      maxLength={1}
                      style={{ width: 50, textAlign: "center" }}
                    />
                  </Form.Item>
                  <Form.Item name="otp4" noStyle>
                    <Input
                      maxLength={1}
                      style={{ width: 50, textAlign: "center" }}
                    />
                  </Form.Item>
                </div>
              </Form.Item>
            </div>

            <Divider />
            <Title level={5}>Products</Title>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
              {selectedOrder?.cart_items?.map((product, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    gap: 16,
                    width: "48%", // Two items per row (roughly)
                    marginBottom: 24,
                    border: "1px solid #f0f0f0",
                    padding: 12,
                    borderRadius: 8,
                  }}
                >
                  <Image
                    src={`${backendUrl}/uploads/${product.image}`}
                    width={80}
                    height={80}
                  />
                  <div>
                    <Text strong>{product.product_name}</Text>
                    <div>Code: {product.product_code}</div>

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
                            backgroundColor: product.selectedColor || "#ccc",
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

                    <div>Quantity: {product.quantity}</div>
                    <div>Price: ₹{product.price}</div>
                  </div>
                </div>
              ))}
            </div>

            <Divider />
            <Title level={5}>Return Product Reason</Title>
            <Form.Item label="Title" name="issue_type">
              <AntInput
                placeholder="Return title..."
                readOnly
                style={{ color: "black" }}
              />
            </Form.Item>
            <Form.Item label="Description" name="issue_description">
              <TextArea
                // rows={4}
                placeholder="Describe the return reason..."
                readOnly
                style={{ color: "black" }}
              />
            </Form.Item>
            <Form.Item label="Reply" name="admin_issue_returnReply">
              <TextArea rows={3} placeholder="Admin reply..." />
            </Form.Item>

            <Divider />
            <Title level={5}>Financial Details</Title>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text>Subtotal:</Text>
              <Text>₹ {selectedOrder.subtotal}</Text>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text>Tax:</Text>
              <Text>₹ {selectedOrder.tax}</Text>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text>Shipping:</Text>
              <Text>₹ {selectedOrder.shipping}</Text>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
              }}
            >
              <Text strong>Total:</Text>
              <Text strong>₹ {selectedOrder.total}</Text>
            </div>
          </Form>
        </Modal>
      )}

      {/* === FIXED TOTAL FOOTER === */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          background: "#fff",
          borderTop: "1px solid #eee",
          padding: "10px 24px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Text strong>Total Orders Amount: $299.99</Text>
      </div>
    </div>
  );
};

export default OrderManagement;

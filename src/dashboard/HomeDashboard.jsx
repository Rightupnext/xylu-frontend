import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Progress,
  Button,
  Statistic,
  Divider,
  DatePicker,
  Empty,
  message,
} from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { useSelector, useDispatch } from "react-redux";
import { getOrderAnyltics } from "../store/slice/orderSlice";
import dayjs from "dayjs";
import { token } from "../auth";
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const HomeDashboard = () => {
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const user = token.getUser();
  // console.log("user", user);
  const {
    orderAnyltics: {
      pending = {},
      packed = {},
      shipped = {},
      delivered = {},
      "order-cancelled": orderCancelled = {},
      totalOrders = 0,
      totalRevenue = 0,
      paymentHistory = [],
    } = {},
    error,
  } = useSelector((state) => state.order);

  useEffect(() => {
    try {
      if (dateRange.length === 2) {
        const [start, end] = dateRange;

        if (!start || !end || end.isBefore(start)) {
          message.warning("Invalid date range selected");
          return;
        }

        dispatch(
          getOrderAnyltics({
            startDate: start.format("YYYY-MM-DD"),
            endDate: end.format("YYYY-MM-DD"),
          })
        );
      } else {
        dispatch(getOrderAnyltics());
      }
    } catch (err) {
      console.error("Error dispatching analytics:", err);
      setErrorMsg("Failed to load analytics");
    }
  }, [dispatch, dateRange]);

  const chartData = paymentHistory?.length
    ? paymentHistory
        .map((entry) => ({
          date: new Date(entry.date).toLocaleDateString("en-IN"),
          amount: entry.totalAmount,
        }))
        .slice()
        .reverse()
    : [];

  const lineData = paymentHistory?.length
    ? paymentHistory
        .map((entry) => ({
          date: new Date(entry.date).toLocaleDateString("en-IN"),
          profit: entry.totalAmount,
        }))
        .slice()
        .reverse()
    : [];

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Row justify="space-between" align="middle">
              <Col>
                <Title level={4}>🎉 Congratulations {user?.username}!</Title>
                <Text>
                  You have done{" "}
                  <b>
                    {Math.round((delivered.count / totalOrders) * 100 || 0)}%
                  </b>{" "}
                  more Delivered. Check your new badge.
                </Text>
              </Col>
              <Col>
                <RangePicker
                  onChange={setDateRange}
                  allowEmpty={[false, false]}
                />
                <Button onClick={() => setDateRange([])} type="primary">
                  Reset
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>

        {error || errorMsg ? (
          <Col span={24}>
            <Card>
              <Empty
                description={errorMsg || "No data found for selected range"}
              />
            </Card>
          </Col>
        ) : (
          <>
            {[
              /* Stats cards */ {
                title: `Total Revenue (${totalOrders} Orders)`,
                value: totalRevenue,
                color: "#3f8600",
                suffix: <ArrowUpOutlined />,
              },
              {
                title: `Delivered (${delivered.count || 0})`,
                value: delivered.totalAmount || 0,
                color: "#3f8600",
                suffix: <ArrowUpOutlined />,
              },
              {
                title: `Shipped (${shipped.count || 0})`,
                value: shipped.totalAmount || 0,
                color: "#cf1322",
                suffix: <ArrowDownOutlined />,
              },
              {
                title: `Packed (${packed.count || 0})`,
                value: packed.totalAmount || 0,
                color: "#3f8600",
                suffix: <ArrowUpOutlined />,
              },
              {
                title: `Pending (${pending.count || 0})`,
                value: pending.totalAmount || 0,
                color: "#d48806",
                suffix: <ArrowUpOutlined />,
              },
              {
                title: `Cancelled (${orderCancelled.count || 0})`,
                value: orderCancelled.totalAmount || 0,
                color: "#cf1322",
                suffix: <ArrowDownOutlined />,
              },
            ].map((item, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <Card>
                  <Statistic
                    title={item.title}
                    value={(item.value ?? 0).toFixed(2)}
                    prefix="₹"
                    valueStyle={{ color: item.color }}
                    suffix={item.suffix}
                  />
                </Card>
              </Col>
            ))}

            <Col xs={24} lg={16}>
              <Card title="Revenue by Date">
                {chartData.length ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="amount" fill="#c97a9f" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <Empty description="No chart data" />
                )}
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card title="Order Statistics">
                <Statistic value={totalOrders} title="Total Orders" />
                <Progress
                  type="circle"
                  percent={Math.round(
                    (delivered.count / totalOrders) * 100 || 0
                  )}
                  format={(percent) => `${percent}% Delivered`}
                  style={{ margin: "16px auto", display: "block" }}
                />
                <Divider />
                <ul style={{ paddingLeft: 16 }}>
                  <li>🕐 Pending: {pending.count}</li>
                  <li>📦 Packed: {packed.count}</li>
                  <li>🚚 Shipped: {shipped.count}</li>
                  <li>✅ Delivered: {delivered.count}</li>
                  <li>❌ Cancelled: {orderCancelled.count}</li>
                </ul>
              </Card>
            </Col>

            <Col xs={24}>
              <Card title="Total Profit (By Date)">
                <Statistic
                  value={(totalRevenue ?? 0).toFixed(2)}
                  prefix="₹"
                  valueStyle={{ color: "#3f8600" }}
                />
                <Text>+35.1% compared to last week</Text>
                {lineData.length ? (
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={lineData}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="linear"
                        dataKey="profit"
                        stroke="#8884d8"
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <Empty description="No line chart data" />
                )}
              </Card>
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default HomeDashboard;

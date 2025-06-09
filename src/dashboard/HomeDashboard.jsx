import React from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Progress,
  Button,
  Statistic,
  Avatar,
  Divider,
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

const { Title, Text } = Typography;

const barData = [
  { month: "Jan", 2024: 12, 2023: 5 },
  { month: "Feb", 2024: 5, 2023: 2 },
  { month: "Mar", 2024: 15, 2023: 8 },
  { month: "Apr", 2024: 25, 2023: 12 },
  { month: "May", 2024: 18, 2023: 9 },
  { month: "Jun", 2024: 10, 2023: 5 },
];

const lineData = [
  { month: "Jan", profit: 20 },
  { month: "Feb", profit: 40 },
  { month: "Mar", profit: 30 },
  { month: "Apr", profit: 70 },
  { month: "May", profit: 45 },
  { month: "Jun", profit: 60 },
];

const transactions = [
  { name: "Paypal", type: "Send money", amount: "+$82.6", color: "#FFB6C1" },
  { name: "Wallet", type: "Mac'D", amount: "+$270.69", color: "#87CEFA" },
  { name: "Transfer", type: "Refund", amount: "+$637.91", color: "#98FB98" },
  {
    name: "Credit Card",
    type: "Ordered Food",
    amount: "-$838.71",
    color: "#FFD700",
  },
  { name: "Wallet", type: "Starbucks", amount: "+$203.33", color: "#40E0D0" },
  {
    name: "Mastercard",
    type: "Ordered Food",
    amount: "-$129.20",
    color: "#FF69B4",
  },
];

const HomeDashboard = () => {
  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[16, 6]}>
        {/* Greeting */}
        <Col span={24}>
          <Card>
            <Title level={4}>🎉 Congratulations John!</Title>
            <Text>
              You have done <b>72%</b> more sales today. Check your new badge.
            </Text>
            <div style={{ marginTop: 10 }}>
              <Button type="primary" style={{backgroundColor:"#c97a9f"}}>View Badges</Button>
            </div>
          </Card>
        </Col>

        {/* Stats Cards */}
        <Col xs={12} md={6}>
          <Card>
            <Statistic
              title="Profit"
              value={12628}
              prefix="$"
              valueStyle={{ color: "#3f8600" }}
              suffix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Statistic
              title="Sales"
              value={4679}
              prefix="$"
              valueStyle={{ color: "#3f8600" }}
              suffix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Statistic
              title="Payments"
              value={2468}
              prefix="$"
              valueStyle={{ color: "#cf1322" }}
              suffix={<ArrowDownOutlined />}
            />
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Statistic
              title="Transactions"
              value={14857}
              prefix="$"
              valueStyle={{ color: "#3f8600" }}
              suffix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>

        {/* Charts */}
        <Col xs={24} lg={16}>
          <Card title="Total Revenue">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="2024" fill="#c97a9f" />
                <Bar dataKey="2023" fill="#000000" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Company Growth">
            <div style={{ textAlign: "center" }}>
              <Progress type="dashboard" percent={78} />
              <Text>62% Company Growth</Text>
              <div style={{ marginTop: 16 }}>
                <Text>
                  2023: <b>$32.5k</b>
                </Text>
                <br />
                <Text>
                  2022: <b>$41.2k</b>
                </Text>
              </div>
            </div>
          </Card>
        </Col>

        {/* Order Statistics */}
        <Col xs={24} md={12}>
          <Card title="Order Statistics">
            <Statistic value={8258} title="Total Orders" />
            <Progress
              type="circle"
              percent={38}
              format={(percent) => `${percent}% Weekly`}
            />
            <Divider />
            <ul style={{ paddingLeft: 16 }}>
              <li>📱 Electronic: 82.5k</li>
              <li>👕 Fashion: 23.8k</li>
              <li>🎨 Decor: 849</li>
              <li>⚽ Sports: 99</li>
            </ul>
          </Card>
        </Col>

        {/* Profit Line Chart */}
        <Col xs={24} md={12}>
          <Card title="Total Profit">
            <Statistic
              value={147900}
              prefix="$"
              valueStyle={{ color: "#3f8600" }}
            />
            <Text>+35.1% compared to last week</Text>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={lineData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Transactions */}
        <Col span={24}>
          <Card
            title="Recent Transactions"
            extra={<Button type="primary">Upgrade to Pro</Button>}
          >
            {transactions.map((item, index) => (
              <Row
                key={index}
                justify="space-between"
                align="middle"
                style={{ marginBottom: 12 }}
              >
                <Col>
                  <Avatar style={{ backgroundColor: item.color }}>
                    {item.name[0]}
                  </Avatar>
                  <Text style={{ marginLeft: 12 }}>
                    {item.name} - {item.type}
                  </Text>
                </Col>
                <Col>
                  <Text strong>{item.amount}</Text>
                </Col>
              </Row>
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomeDashboard;

import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Typography,
  Rate,
  Progress,
  Divider,
  Avatar,
  Image,
  Button,
  Tag,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addReview, fetchReviewsByProduct } from "../store/slice/reviewSlice";
import { motion } from "framer-motion";
import { token } from "../auth";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const Review = ({ id, reviews }) => {
  const dispatch = useDispatch();

  const user = token.getUser();

  const [form] = Form.useForm();
  const [rating, setRating] = useState(4);
  const [openModal, setOpenModal] = useState(false);
  const [ratingsCount, setRatingsCount] = useState([0, 0, 0, 0, 0]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    dispatch(fetchReviewsByProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (reviews?.data?.length) {
      const counts = [0, 0, 0, 0, 0];
      reviews.data.forEach((r) => {
        if (r.rating >= 1 && r.rating <= 5) counts[r.rating - 1]++;
      });
      setRatingsCount(counts);
    }
  }, [reviews]);

  const totalReviews = reviews?.data?.length || 0;
  const averageRating =
    totalReviews > 0
      ? (
          reviews.data.reduce((acc, r) => acc + r.rating, 0) / totalReviews
        ).toFixed(1)
      : "0.0";

  const handleReviewSubmit = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        user_id: user?.id,
        username: user?.username,
        rating,
        title: values.title,
        review: values.review,
        productId: id,
      };

      await dispatch(addReview(payload));
      form.resetFields();
      setRating(4);
      setOpenModal(false);
      dispatch(fetchReviewsByProduct(id));
    } catch (err) {
      message.error("Please fill required fields.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <Title level={3}>Reviews</Title>

      {/* Ratings Summary */}
      <Row gutter={[32, 16]} align="middle">
        <Col xs={24} sm={8}>
          <Title level={1}>{averageRating}</Title>
          <Rate disabled allowHalf value={parseFloat(averageRating)} />
          <Text type="secondary" className="block mt-1">
            {totalReviews} ratings
          </Text>
        </Col>
        <Col xs={24} sm={16}>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = ratingsCount[star - 1];
            const percent = totalReviews ? (count / totalReviews) * 100 : 0;
            return (
              <Row key={star} align="middle" className="mb-1">
                <Col span={2}>
                  <Text>{star}.0</Text>
                </Col>
                <Col span={20}>
                  <Progress
                    percent={Math.round(percent)}
                    showInfo={false}
                    strokeColor="#c97a9f"
                  />
                </Col>
                <Col span={2}>
                  <Text type="secondary">{count}</Text>
                </Col>
              </Row>
            );
          })}
        </Col>
      </Row>

      {/* Static Tags Section */}
      {/* <Row gutter={[16, 16]} className="my-4">
        <Col>
          <Tag color="green">4.0 Cleanliness</Tag>
        </Col>
        <Col>
          <Tag color="green">4.0 Safety & Security</Tag>
        </Col>
        <Col>
          <Tag color="green">4.0 Staff</Tag>
        </Col>
        <Col>
          <Tag color="blue">3.5 Amenities</Tag>
        </Col>
        <Col>
          <Tag color="red">3.0 Location</Tag>
        </Col>
      </Row> */}

      <Divider />

      {/* Review List */}
      {(showAll ? reviews?.data : reviews?.data?.slice(0, 5))?.map(
        (review, idx) => (
          <motion.div
            key={review.review_id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="mb-6"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={2}>
                <Avatar size="large">{review.username[0]}</Avatar>
              </Col>
              <Col xs={24} sm={22}>
                <Row justify="space-between">
                  <Col>
                    <Text strong>{review.username}</Text>{" "}
                    <Text type="secondary" className="ml-2">
                      {new Date(review.created_at).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Text>
                  </Col>
                  <Col>
                    <Text strong>{review.rating.toFixed(1)}</Text>{" "}
                    <Rate disabled defaultValue={review.rating} />
                  </Col>
                </Row>
                <Title level={5} className="mt-2">
                  {review.title}
                </Title>
                <Paragraph>{review.review}</Paragraph>

                {review.images?.length > 0 && (
                  <Row gutter={[8, 8]}>
                    {review.images.map((img, i) => (
                      <Col key={i}>
                        <Image
                          src={img}
                          width={80}
                          height={80}
                          style={{ objectFit: "cover" }}
                        />
                      </Col>
                    ))}
                  </Row>
                )}
              </Col>
            </Row>
          </motion.div>
        )
      )}

      {/* Read More / Less */}
      {reviews?.data?.length > 5 && (
        <div className="text-center mb-4">
          <Button type="link" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show less" : "Read all reviews"}
          </Button>
        </div>
      )}

      <Divider />

      {/* Write Review Button */}
      <div className="text-center mb-4">
        <Button
          type="primary"
          onClick={() => setOpenModal(true)}
          style={{ backgroundColor: "#c97a9f" }}
        >
          Write a Review
        </Button>
      </div>

      {/* Modal Form */}
      <Modal
        title="Write a Review"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={handleReviewSubmit}
        okText="Submit"
      >
        <Form layout="vertical" form={form}>
          <Form.Item label="Name">
            <Input value={user?.username} readOnly />
          </Form.Item>

          <Form.Item label="Rating">
            <Rate value={rating} onChange={setRating} />
          </Form.Item>

          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input placeholder="Review title" />
          </Form.Item>

          <Form.Item
            name="review"
            label="Review"
            rules={[{ required: true, message: "Please enter your review" }]}
          >
            <TextArea rows={4} placeholder="Write your review..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Review;

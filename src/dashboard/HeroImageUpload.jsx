import React, { useEffect } from "react";
import { Upload, Button, Card, Row, Col, message, Popconfirm } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadHeroImage,
  fetchHeroes,
  deleteHeroImage,
} from "../store/slice/heroSlice";

const HeroImageUpload = () => {
  const dispatch = useDispatch();

  const { heroImages, loading } = useSelector((state) => state.hero);
  useEffect(() => {
    dispatch(fetchHeroes());
  }, [dispatch]);

  // ✅ Validate before upload
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    const isLt5M = file.size / 1024 / 1024 < 5;

    if (!isImage) {
      message.error("Only image files are allowed!");
    }
    if (!isLt5M) {
      message.error("Image must be smaller than 5MB!");
    }

    return isImage && isLt5M;
  };

  // ✅ Upload Handler via Redux
  const handleUpload = async ({ file }) => {
    const formData = new FormData();
    formData.append("heroImage", file);

    await dispatch(uploadHeroImage(formData));
    dispatch(fetchHeroes());
  };

  // ✅ Delete Handler via Redux
  const handleDelete = async (filename) => {
    await dispatch(deleteHeroImage(filename));
    dispatch(fetchHeroes());
  };

  return (
    <div>
      <Upload
        customRequest={handleUpload}
        showUploadList={false}
        beforeUpload={beforeUpload}
        maxCount={1}
      >
        <Button
          icon={<UploadOutlined />}
          type="primary"
          loading={loading}
          disabled={loading}
          style={{ backgroundColor: "black", padding: 26, margin: 12 }}
        >
          Upload Hero Image
        </Button>
      </Upload>

      <Row gutter={[16, 16]} style={{ marginTop: 24, padding: 15 }}>
        {heroImages?.map((img) => (
          <Col key={img.filename} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                <img
                  alt="Hero"
                  src={`http://localhost:5005/uploads/hero/${img.filename}`}
                  style={{ height: 200, objectFit: "cover" }}
                />
              }
              actions={[
                <Popconfirm
                  title="Delete this image?"
                  onConfirm={() => handleDelete(img.filename)}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteOutlined style={{ color: "red" }} />
                </Popconfirm>,
              ]}
            >
              <Card.Meta title={img.filename} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HeroImageUpload;

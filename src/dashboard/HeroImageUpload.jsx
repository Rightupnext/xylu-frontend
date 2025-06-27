import React, { useEffect, useState } from "react";
import {
  Upload,
  Button,
  Card,
  Row,
  Col,
  message,
  Popconfirm,
  Modal,
  Input,
  Checkbox,
  Radio,
} from "antd";
import {
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadHeroImage,
  fetchHeroes,
  deleteHeroImage,
  updateHeroImage, // add this action in your slice!
} from "../store/slice/heroSlice";

const HeroImageUpload = () => {
  const dispatch = useDispatch();
  const { heroImages, loading } = useSelector((state) => state.hero);

  // Modal open state
  const [modalOpen, setModalOpen] = useState(false);

  // Controlled form states
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [size, setSize] = useState("small");
  const [preview, setPreview] = useState(null);

  // Edit mode states
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchHeroes());
  }, [dispatch]);

  // Validate file before upload
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

  // Handle file selection inside modal
  const handleFileChange = ({ file }) => {
    if (!beforeUpload(file)) {
      return;
    }
    setFile(file);

    // Create image preview URL
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  // Open modal for create mode
  const openCreateModal = () => {
    setIsEdit(false);
    setEditId(null);
    setUrl("");
    setSize("small");
    setFile(null);
    setPreview(null);
    setModalOpen(true);
  };

  // Open modal for edit mode
  const openEditModal = (hero) => {
    setIsEdit(true);
    setEditId(hero.id);
    setUrl(hero.url || "");
    setSize(hero.size || "small");
    setFile(null); // no new file yet
    setPreview(`http://localhost:5005/uploads/hero/${hero.filename}`);
    setModalOpen(true);
  };

  // Submit handler inside modal
  const handleSubmit = async () => {
    if (!url.trim()) {
      message.error("URL cannot be empty");
      return;
    }

    const formData = new FormData();

    if (file) {
      formData.append("heroImage", file);
    }
    formData.append("url", url);
    formData.append("size", size);

    if (isEdit) {
      // update action with id
      await dispatch(updateHeroImage({ id: editId, formData }));
    } else {
      if (!file) {
        message.error("Please select an image to upload!");
        return;
      }
      // upload new
      await dispatch(uploadHeroImage(formData));
    }

    dispatch(fetchHeroes());
    setModalOpen(false);

    // Reset modal state
    setFile(null);
    setUrl("");
    setPreview(null);
    setIsEdit(false);
    setEditId(null);
  };

  // Delete handler remains same
  const handleDelete = async (filename) => {
    await dispatch(deleteHeroImage(filename));
    dispatch(fetchHeroes());
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={openCreateModal}
        style={{ backgroundColor: "black", padding: 26, margin: 12 }}
      >
        Upload Hero Image
      </Button>

      <Modal
        title={isEdit ? "Edit Hero Image" : "Upload Hero Image"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleSubmit}
        okText={isEdit ? "Update" : "Upload"}
        confirmLoading={loading}
      >
        <Radio.Group
          value={size}
          onChange={(e) => setSize(e.target.value)}
          style={{ marginBottom: 16 }}
        >
          <Radio value="small">Small (w640×h500)</Radio>
          <Radio value="medium">Medium (w800×h700)</Radio>
          <Radio value="large">Large (w1200×h800)</Radio>
        </Radio.Group>

        <Input
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ marginBottom: 16 }}
        />

        <Upload
          accept="image/*"
          showUploadList={false}
          beforeUpload={() => false} // Prevent automatic upload
          onChange={handleFileChange}
        >
          <Button icon={<UploadOutlined />}>Select Image</Button>
        </Upload>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{
              marginTop: 16,
              width: "100%",
              maxHeight: 200,
              objectFit: "cover",
            }}
          />
        )}
      </Modal>

      <Row gutter={[16, 16]} style={{ marginTop: 24, padding: 15 }}>
        {heroImages?.map((img) => (
          <Col key={img.filename} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                <div style={{ position: "relative" }}>
                  {/* Size Badge with color logic */}
                  <div
                    style={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      backgroundColor:
                        img.size === "small"
                          ? "#7d5ad8" // red-600
                          : img.size === "medium"
                          ? "#000000" // black
                          : img.size === "large"
                          ? "#fe4621"
                          : "#fe4621",
                      color: "#fff",
                      padding: "2px 8px",
                      borderRadius: "8px",
                      fontSize: "18px",
                      zIndex: 2,
                      textTransform: "capitalize",
                    }}
                  >
                    {img.size || "N/A"}
                  </div>

                  <img
                    alt="Hero"
                    src={`http://localhost:5005/uploads/hero/${img.filename}`}
                    style={{ height: 200, objectFit: "cover", width: "100%" }}
                  />
                </div>
              }
              actions={[
                <EditOutlined
                  key="edit"
                  style={{ color: "blue" }}
                  onClick={() => openEditModal(img)}
                />,
                <Popconfirm
                  key="delete"
                  title="Delete this image?"
                  onConfirm={() => handleDelete(img.filename)}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteOutlined style={{ color: "red" }} />
                </Popconfirm>,
              ]}
            >
              <Card.Meta title={img.filename} description={img.url} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HeroImageUpload;

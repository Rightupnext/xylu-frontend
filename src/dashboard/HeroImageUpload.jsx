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
} from "antd";
import { UploadOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
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
    setFile(null);
    setPreview(null);
    setModalOpen(true);
  };

  // Open modal for edit mode
  const openEditModal = (hero) => {
    setIsEdit(true);
    setEditId(hero.id);
    setUrl(hero.url || "");
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
            style={{ marginTop: 16, width: "100%", maxHeight: 200, objectFit: "cover" }}
          />
        )}
      </Modal>

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

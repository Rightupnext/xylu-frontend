import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Row,
  Col,
  Tag,
  Popconfirm,
  Checkbox,
  DatePicker,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../store/slice/productSlice";
import dayjs from "dayjs";
import { fetchCategories } from "../store/slice/categorySlice";
const { Option } = Select;
const { RangePicker } = DatePicker;
const colorOptions = [
  "Black",
  "White",
  "Grey",
  "Silver",
  "Red",
  "Maroon",
  "Pink",
  "HotPink",
  "Coral",
  "Orange",
  "Gold",
  "Yellow",
  "Lime",
  "Green",
  "Olive",
  "SeaGreen",
  "Teal",
  "Turquoise",
  "Cyan",
  "SkyBlue",
  "Blue",
  "RoyalBlue",
  "Navy",
  "Indigo",
  "Purple",
  "Violet",
  "Magenta",
  "Brown",
  "Chocolate",
  "Tan",
  "Khaki",
];

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

const InventoryManager = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { products, loading } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImageName, setExistingImageName] = useState(null);
  const [colorSearchText, setColorSearchText] = useState("");
  const [openDropdown, setOpenDropdown] = useState({});
  const [searchText, setSearchText] = useState("");
  const filteredProducts = products?.data?.filter((product) => {
    const normalizedSearch = searchText.toLowerCase().replace(/\s+/g, "");

    const normalize = (str) => str?.toLowerCase().replace(/\s+/g, "") || "";

    const matchesProduct =
      normalize(product.product_name).includes(normalizedSearch) ||
      normalize(product.product_code).includes(normalizedSearch) ||
      normalize(product.category).includes(normalizedSearch) ||
      normalize(product.trend).includes(normalizedSearch);

    return matchesProduct;
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const openModal = (record = null) => {
    if (record) {
      const offerRange = record.offerExpiry
        ? record.offerExpiry.split(",").map((d) => dayjs(d.trim()))
        : [];

      form.setFieldsValue({
        ...record,
        offerExpiry:
          Array.isArray(offerRange) && offerRange.every((d) => d.isValid())
            ? offerRange
            : undefined,
      });
      setEditId(record.id);

      if (record.image) {
        const filename = record.image.split("/").pop();
        setExistingImageName(filename);
        const imageUrl = `http://localhost:5005/uploads/products/${filename}`;
        setImagePreview(imageUrl);
        setSelectedFile(null);
      } else {
        setImagePreview(null);
        setExistingImageName(null);
      }
    } else {
      form.resetFields();
      setEditId(null);
      setSelectedFile(null);
      setImagePreview(null);
      setExistingImageName(null);
    }

    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const onFinish = (values) => {
    const formData = new FormData();

    formData.append("product_name", values.product_name);
    formData.append("product_code", values.product_code || "");
    formData.append("category", values.category || "");
    formData.append("description", values.description || "");
    formData.append("price", values.price);
    formData.append("discount", values.discount || 0);
    formData.append("Bulk_discount", values.Bulk_discount ? 1 : 0);
    formData.append("trend", values.trend || "regular");

    // ✅ Format offerExpiry
    const offerExpiry =
      Array.isArray(values.offerExpiry) && values.offerExpiry.length === 2
        ? values.offerExpiry.map((d) => dayjs(d).toISOString()).join(",")
        : "";

    formData.append("offerExpiry", offerExpiry);

    if (selectedFile) {
      formData.append("image", selectedFile);
      if (existingImageName && editId) {
        formData.append("existingImage", existingImageName);
      }
    }

    const variants = values.variants || [];
    formData.append("variants", JSON.stringify(variants));

    if (editId) {
      dispatch(updateProduct({ id: editId, data: formData }));
    } else {
      dispatch(addProduct(formData));
    }

    setIsModalOpen(false);
    setSelectedFile("");
    setImagePreview("");
    setExistingImageName("");
  };

  const columns = [
    { title: "Product Name", dataIndex: "product_name" },
    { title: "Category", dataIndex: "category" },
    { title: "Product Code", dataIndex: "product_code" },
    { title: "Price", dataIndex: "price" },
    { title: "Discount", dataIndex: "discount" },
    { title: "Trend", dataIndex: "trend" },
    {
      title: "Variants",
      dataIndex: "variants",
      render: (variants) => (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {/* Header Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "8px",
              fontSize: 14,
              fontWeight: 600,
              padding: "8px",
              backgroundColor: "#f0f0f0",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
            }}
          >
            <span>Color</span>
            <span>Size</span>
            <span>Qty</span>
          </div>

          {/* Data Rows */}
          {variants?.map((v, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "8px",
                fontSize: 14,
                border: "1px solid #d9d9d9",
                padding: "8px",
                borderRadius: "4px",
                backgroundColor: "#fafafa",
              }}
            >
              <span style={{ color: v.color?.toLowerCase(), fontWeight: 500 }}>
                {v.color?.charAt(0).toUpperCase() +
                  v.color?.slice(1).toLowerCase()}
              </span>
              <span>{Array.isArray(v.size) ? v.size.join(", ") : v.size}</span>
              <span>{v.quantity}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button onClick={() => openModal(record)} type="link">
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="link">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex w-full justify-between p-4">
        <Button
          type="primary"
          onClick={() => openModal()}
          style={{
            marginBottom: 16,
            marginTop: 12,
            marginLeft: 12,
            backgroundColor: "black",
            color: "white",
            padding: "20px",
          }}
        >
          Add Product
        </Button>
        <Input
          placeholder="Search by product name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300, marginLeft: 12, marginBottom: 16 }}
        />
      </div>
      <Table
        dataSource={filteredProducts}
        rowKey="id"
        columns={columns}
        loading={loading}
        bordered
      />

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        title={editId ? "Edit Product" : "Add Product"}
        onOk={() => form.submit()}
        width={900}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="product_name"
                label="Product Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="product_code" label="Product Code">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="category" label="Category">
                <Select placeholder="Select a product code">
                  {categories?.data?.map((item) => (
                    <Select.Option key={item.id} value={item.category_name}>
                      {item.category_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Image Upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      // Limit: 5MB = 5 * 1024 * 1024 bytes
                      if (file.size > 5 * 1024 * 1024) {
                        Modal.error({
                          title: "File too large",
                          content: "Please select an image smaller than 5MB.",
                        });
                        e.target.value = ""; // Clear input
                        return;
                      }

                      setSelectedFile(file);
                      setImagePreview(URL.createObjectURL(file));
                    } else {
                      setSelectedFile(null);
                      setImagePreview(null);
                    }
                  }}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: 100,
                      marginTop: 10,
                      border: "1px solid #ddd",
                      objectFit: "cover",
                    }}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="description" label="Description">
                <Input.TextArea rows={8} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true }]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="discount" label="Discount">
                <InputNumber min={0} max={100} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name="trend" label="Trend" style={{ width: 240 }}>
                  <Select>
                    <Select.Option value="new">New</Select.Option>
                    <Select.Option value="bestseller">Bestseller</Select.Option>
                    <Select.Option value="regular">Regular</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={10}>
                <Form.Item name="offerExpiry" label="Offer Expiry Date Range">
                  <RangePicker showTime style={{ width: "100%" }} />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  name="Bulk_discount"
                  valuePropName="checked"
                  label="Bulk Discount"
                  style={{ marginTop: 1, width: 240, marginLeft: 44 }} // align vertically
                >
                  <Checkbox style={{ transform: "scale(2.5)" }} />
                </Form.Item>
              </Col>
            </Row>
          </Row>

          <Form.List name="variants">
            {(fields, { add, remove }) => (
              <div>
                {fields.map(({ key, name }) => {
                  const filteredColors = colorOptions.filter((color) =>
                    color.toLowerCase().includes(colorSearchText.toLowerCase())
                  );

                  return (
                    <Space
                      key={key}
                      style={{
                        display: "flex",
                        marginBottom: 8,
                        flexWrap: "wrap",
                        width: "100%",
                      }}
                      align="baseline"
                    >
                      <Form.Item
                        name={[name, "color"]}
                        rules={[{ required: true, message: "Select a color" }]}
                      >
                        <Select
                          placeholder="Select color"
                          style={{ width: 160 }}
                          showSearch
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option?.children
                              ?.toLowerCase()
                              .includes(input.toLowerCase())
                          }
                        >
                          {colorOptions.map((color) => (
                            <Select.Option key={color} value={color}>
                              <Tag
                                color={color}
                                style={{ textTransform: "capitalize" }}
                              >
                                {color}
                              </Tag>
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>

                      <Form.Item
                        name={[name, "size"]}
                        rules={[{ required: true, message: "Select size(s)" }]}
                      >
                        <Select
                          mode="multiple"
                          placeholder="Size"
                          style={{ width: 200 }}
                        >
                          {sizeOptions.map((size) => (
                            <Select.Option key={size} value={size}>
                              {size}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>

                      <Form.Item
                        name={[name, "quantity"]}
                        rules={[{ required: true, message: "Enter quantity" }]}
                      >
                        <InputNumber placeholder="Qty" />
                      </Form.Item>

                      <Button onClick={() => remove(name)} danger type="text">
                        Remove
                      </Button>
                    </Space>
                  );
                })}

                <Form.Item>
                  <Button onClick={() => add()} type="dashed" block>
                    + Add Variant
                  </Button>
                </Form.Item>
              </div>
            )}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
};

export default InventoryManager;

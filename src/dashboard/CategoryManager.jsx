import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Popconfirm, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../store/slice/categorySlice"; // Adjust the path as needed

const CategoryManager = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.category);

  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const showModal = (record = null) => {
    setEditingCategory(record);
    if (record) {
      form.setFieldsValue({ category_name: record.category_name });
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingCategory) {
          dispatch(updateCategory({ id: editingCategory.id, data: values }));
        } else {
          dispatch(addCategory(values));
          dispatch(fetchCategories());
        }
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  const handleDelete = (id) => {
    dispatch(deleteCategory(id)).then(() => {
      dispatch(fetchCategories());
    });
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => showModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Category Manager</h2>
      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Add Category
      </Button>

      <Table
        columns={columns}
        dataSource={categories}
        rowKey="id"
        loading={loading}
        bordered
      />

      <Modal
        title={editingCategory ? "Edit Category" : "Add Category"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        okText={editingCategory ? "Update" : "Create"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="category_name"
            label="Category Name"
            rules={[{ required: true, message: "Please input category name!" }]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryManager;

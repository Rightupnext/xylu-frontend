import React, { useEffect, useState } from "react";
import { Drawer, Button, Checkbox, Divider } from "antd";
import { motion } from "framer-motion";
import { GiHanger } from "react-icons/gi";
import { MenuOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/slice/categorySlice";
import { fetchProducts } from "../store/slice/productSlice";
// Normalize string utility
const normalize = (str) =>
  typeof str === "string" ? str.toLowerCase().replace(/-/g, " ").trim() : "";
// Static filters
const filters = {
  color: [
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
  ],
  size: ["XS", "S", "M", "L", "XL", "XXL"],
};
const backendUrl = import.meta.env.VITE_BACKEND_URL
const ProductCard = ({ product }) => (
  <motion.div
    className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all"
    whileHover={{ scale: 1.02 }}
  >
    <Link to={product.Bulk_discount === 1 ? `/offers/${product.category}/${product.id}` : `${product.id}`} className="cursor-pointer">
      <div className="relative">
        <img
          src={`${backendUrl}/uploads/${product.image}`}
          alt={product.title}
          className="w-full h-73 object-contain"
        />
        <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
          {product.trend}
        </div>
      </div>
      <div className="p-4">
        <h4 className="text-sm text-gray-700 font-semibold mb-1 hover:text-blue-700 cursor-pointer">
          {product.product_name}
        </h4>
        <p className="text-xs text-gray-500">{product.category}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-black font-semibold">Rs. {product.price}</span>
          <span className="line-through text-gray-400 text-sm">
            Rs. {product.originalPrice}
          </span>
          <span className="bg-pink-200 text-[#b03a66] px-2 py-0.5 text-xs rounded">
            {product.discount}% OFF
          </span>
        </div>
      </div>
    </Link>
  </motion.div>
);

const Sidebar = ({ selectedFilters, setSelectedFilters, clearFilters }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (type, value) => {
    setSelectedFilters((prev) => {
      const current = new Set(prev[type]);
      current.has(value) ? current.delete(value) : current.add(value);
      return { ...prev, [type]: Array.from(current) };
    });
  };

  return (
    <div className="p-4 w-[250px]">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">Filters</h3>
        <Button size="small" type="link" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      <h4 className="font-semibold mt-4 mb-2 text-black">Category</h4>
      <div className="flex flex-col space-y-2">
        {categories?.data?.map((item) => (
          <Checkbox
            key={item.id || item.category_name}
            checked={selectedFilters.category.some(
              (cat) => normalize(cat) === normalize(item.category_name)
            )}
            onChange={() => handleChange("category", item.category_name)}
            style={{ transform: "scale(1.3)", transformOrigin: "left center" }}
          >
            {item.category_name}
          </Checkbox>
        ))}
      </div>

      <Divider />

      <h4 className="font-semibold mt-4 mb-2 text-black">Color</h4>
      <div className="flex flex-wrap gap-2">
        {filters.color.map((item) => {
          const isSelected = selectedFilters.color.includes(item);
          return (
            <button
              key={item}
              onClick={() => handleChange("color", item)}
              style={{
                backgroundColor: item.toLowerCase(),
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                border: isSelected ? "3px solid black" : "2px solid #ccc",
                cursor: "pointer",
              }}
              title={item}
            />
          );
        })}
      </div>

      <Divider />

      <h4 className="font-semibold mt-4 mb-2 text-black">Size</h4>
      <div className="flex flex-wrap gap-2">
        {filters.size.map((item) => {
          const isSelected = selectedFilters.size.includes(item);
          return (
            <Button
              key={item}
              onClick={() => handleChange("size", item)}
              className={`!w-12 !h-12 !p-0 !rounded-md font-semibold text-sm ${
                isSelected
                  ? "!bg-black !text-white !border-black"
                  : "!bg-white !text-black !border-gray-300"
              }`}
              type={isSelected ? "default" : "text"}
            >
              {item}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

const ShopPage = () => {
  const dispatch = useDispatch();
  const { collections } = useParams();
  const { products } = useSelector((state) => state.product);
  const [open, setOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: collections ? [collections] : [],
    color: [],
    size: [],
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setSelectedFilters({
      category: collections ? [collections] : [],
      color: [],
      size: [],
    });
  }, [collections]);

  const clearFilters = () =>
    setSelectedFilters({
      category: collections ? [collections] : [],
      color: [],
      size: [],
    });

  const filteredProducts =
    products?.data?.filter((product) => {
      const categoryMatch =
        selectedFilters.category.length === 0 ||
        selectedFilters.category.some(
          (filterCat) => normalize(filterCat) === normalize(product.category)
        );

      const colorMatch =
        selectedFilters.color.length === 0 ||
        product.variants.some((variant) =>
          selectedFilters.color.includes(variant.color)
        );

      const sizeMatch =
        selectedFilters.size.length === 0 ||
        product.variants.some((variant) =>
          variant.size.some((s) => selectedFilters.size.includes(s))
        );

      return categoryMatch && colorMatch && sizeMatch;
    }) || [];

  return (
    <div className="flex flex-col md:flex-row sm:mt-[130px] mt-[160px]">
      <div className="block md:hidden p-4">
        <Button icon={<MenuOutlined />} onClick={() => setOpen(true)}>
          Filters
        </Button>
      </div>

      <Drawer
        title="Filters"
        placement="left"
        closable
        onClose={() => setOpen(false)}
        open={open}
        className="md:hidden"
      >
        <Sidebar
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          clearFilters={clearFilters}
        />
      </Drawer>

      <div
        className="hidden md:block w-[250px] border-r"
        style={{
          position: "sticky",
          top: "100px",
          alignSelf: "flex-start",
          height: "max-content",
        }}
      >
        <Sidebar
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          clearFilters={clearFilters}
        />
      </div>

      <div className="flex-1 p-4">
        {filteredProducts.length === 0 ? (
          <div className="flex items-center justify-center p-4 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl w-full text-center px-4 py-8 rounded-2xl shadow-xl"
            >
              <GiHanger className="mx-auto text-6xl md:text-7xl text-rose-200 mb-4" />
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-2">
                Dress Collection Not Found
              </h1>
              <p className="text-gray-600 mb-6 text-lg">
                We apologize, but the collection you're looking for is currently
                unavailable.
              </p>
              <button
                className="px-8 py-3 bg-[#c97a9f] text-white rounded-full font-medium hover:bg-[#a44c6c] hover:scale-105 transition-all"
                onClick={() => window.history.back()}
              >
                Return to Collections
              </button>
              <div className="mt-12 text-sm text-gray-500">
                Need assistance? Contact our support team
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;

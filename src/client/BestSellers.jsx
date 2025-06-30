import React, { useEffect } from "react";
import { Carousel, Card, Tag, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { fetchProducts } from "../store/slice/productSlice";
import { useSelector, useDispatch } from "react-redux";

export default function BestSellers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  return (
    <div className="px-4 md:px-10 lg:px-20 py-10 bg-white">
      {/* Heading */}
      <div className="flex items-center gap-4 mb-6">
        <hr className="flex-grow border-gray-400 border-t-2" />
        <h2 className="text-2xl font-bold text-black whitespace-nowrap">
          Best Sellers
        </h2>
        <hr className="flex-grow border-gray-400 border-t-2" />
      </div>

      {/* Carousel */}
      <Carousel
        autoplay
        dots={false}
        infinite
        slidesToShow={3}
        slidesToScroll={1}
        responsive={[
          { breakpoint: 1024, settings: { slidesToShow: 2 } },
          { breakpoint: 640, settings: { slidesToShow: 1 } },
        ]}
      >
        {products?.data
          ?.filter((item) => item.trend === "bestseller")
          .map((item, idx) => (
            <div key={idx} className="px-2">
              <Card
              onClick={() =>
                        navigate(`/collections/newarrivals/${item.id}`)
                      }
                hoverable
                className="relative rounded-lg overflow-hidden shadow-md"
                cover={
                  <div className="relative">
                    <img
                      src={`${backendUrl}/uploads/${item.image}`}
                      alt={item.product_name}
                      className="h-[400px] w-full object-contain"
                    />
                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <Tag color="black" className="uppercase text-xs">
                        {item.trend}
                      </Tag>
                    </div>
                    {/* View button overlay */}
                    <div
                     onClick={() => navigate(`/collections/bestselling/${item.id}`)}
                      className="absolute bottom-0 w-full bg-gray-200 bg-opacity-50 text-white text-center py-2"
                    >
                      <Button type="link" className="text-white text-sm ">
                        View
                      </Button>
                    </div>
                  </div>
                }
                style={{ padding: "16px" }}
              >
                <Link
                  to={`/collection/${item.id}`}
                  className="text-blue-700 hover:underline text-sm font-medium"
                >
                  {item.product_name}
                </Link>
                <p className="text-gray-500 text-md font-bold">
                  {item.category}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <div>
                    <p className="text-black font-semibold">Rs. {item.price}</p>
                    {/* <p className="line-through text-sm text-gray-400 ">
                      Rs. {item.originalPrice}
                    </p> */}
                  </div>
                  <Tag color="#a5496c" className="text-xs font-semibold px-2">
                    Discount : {item.discount} %
                  </Tag>
                </div>
              </Card>
            </div>
          ))}
      </Carousel>
    </div>
  );
}

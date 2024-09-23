import React, { useEffect, useState } from "react";
import CategoryItem from "../../components/Category/CategoryItem";
import ProductList from "../../components/Product/ProductList";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import PageTitle from "../../components/PageTitle/PageTitle";
import "./Menu.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductItem from "../../components/Product/ProductItem";
import { URL_API } from "../../constants/constants";

const Menu = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState(
    new URLSearchParams(location.search).get("search") || ""
  );
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState("");
  const [authors, setAuthors] = useState([]);
  const [authorId, setAuthorId] = useState(null);
  const [publishers, setPublishers] = useState([]);
  const [publishId, setPublishId] = useState(null);

  const [currentCategoryName, setCurrentCategoryName] =
    useState("Tất cả sản phẩm");

  // Lấy sản phẩm theo tìm kiếm
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = searchTerm.trim()
          ? `${URL_API}/products/search/${searchTerm.trim()}`
          : `${URL_API}/products`;
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm sản phẩm", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm]);






  // Lấy danh mục, tác giả và nhà xuất bản
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${URL_API}/category`);
        setCategories(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục", error);
      }
    };

    const fetchAuthors = async () => {
      try {
        const response = await axios.get(`${URL_API}/authors`);
        setAuthors(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy tác giả", error);
      }
    };

    const fetchPublishers = async () => {
      try {
        const response = await axios.get(`${URL_API}/publishes`);
        setPublishers(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy nhà xuất bản", error);
      }
    };

    fetchCategories();
    fetchAuthors();
    fetchPublishers();
  }, []);



 // Lấy sản phẩm theo tìm kiếm, danh mục, tác giả, nhà xuất bản, sắp xếp và số lượng
 useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = `${URL_API}/products`;

      // Các bộ lọc khác (tìm kiếm, danh mục, tác giả, nhà xuất bản)
      if (categoryId) {
        url = `${URL_API}/products/categoryId/${categoryId}`;
      } else if (authorId) {
        url = `${URL_API}/products/authorId/${authorId}`;
      } else if (publishId) {
        url = `${URL_API}/products/publishId/${publishId}`;
      } else if (searchTerm.trim()) {
        url = `${URL_API}/products/search/${searchTerm.trim()}`;
      }

      // Thêm bộ lọc sắp xếp và số lượng
      if (sortOption === "Giá tăng dần") {
        url += `/sort/asc`;
      } else if (sortOption === "Giá giảm dần") {
        url += `/sort/desc`;
      } else if (sortOption === "Mới nhất") {
        url += `/newpro`;
      }

      if (itemsPerPage) {
        url += `/limit/${itemsPerPage}`;
      }

      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [searchTerm, categoryId, authorId, publishId, sortOption, itemsPerPage]);



const categoryClick = (categoryId, categoryName) => {
  setCategoryId(categoryId);
  setAuthorId(null); // Reset tác giả
  setPublishId(null); // Reset nhà xuất bản
  setCurrentCategoryName(categoryName);
  setSortOption(""); // Reset sắp xếp
  setItemsPerPage(""); // Reset hiển thị số lượng
  // Reset lại danh sách sản phẩm khi thay đổi danh mục
  setProducts([]);
};


//click tác giả
const authorClick = (authorId, authorName) => {
  setAuthorId(authorId);
  setCategoryId(null); // Reset danh mục
  setPublishId(null); // Reset nhà xuất bản
  setCurrentCategoryName(authorName);
  setSortOption(""); // Reset sắp xếp
  setItemsPerPage(""); // Reset hiển thị số lượng
};

//click nhà xuất bản
const publishClick = (publishId, publishName) => {
  setPublishId(publishId);
  setCategoryId(null); // Reset danh mục
  setAuthorId(null); // Reset tác giả
  setCurrentCategoryName(publishName);
  setSortOption(""); // Reset sắp xếp
  setItemsPerPage(""); // Reset hiển thị số lượng
};

  

  return (
    <div className="mt-8">
      <div className="container mx-auto">
        <nav>
          <a href="#" className="text-gray-500">
            Trang chủ
          </a>
          <span className="text-gray-500"> / </span>
          <a href="#" className="text-mainDark font-semibold leading-normal">
            Sản phẩm
          </a>
        </nav>
        <div className="py-8 max-lg:py-4">
          <div className="flex justify-between gap-5 mt-12 max-lg:mt-4">
            <div className="max-w-[275px] w-full max-lg:hidden">
              <div className="w-full border rounded-[30px] py-14 px-12">
                <div className="flex flex-col gap-9">
                  <CategoryItem
                    title="Danh mục"
                    items={categories}
                    onCategoryClick={categoryClick}
                  />
                  <CategoryItem
                    title="Tác giả"
                    items={authors}
                    onAuthorClick={authorClick}
                  />
                  <CategoryItem
                    title="Nhà xuất bản"
                    items={publishers}
                    onPublishClick={publishClick}
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="flex items-center justify-between mb-6">
                <PageTitle title={currentCategoryName || "Tất cả sản phẩm"} />

                <div className="flex items-center gap-4">
                  <select
                    className="select select-bordered w-full max-w-xs custom-select"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option disabled value="">
                      Sắp xếp theo:
                    </option>
                    <option value="Mới nhất">Mới nhất</option>
                    <option value="Giá tăng dần">Giá tăng dần</option>
                    <option value="Giá giảm dần">Giá giảm dần</option>
                  </select>
                  <select
                    className="select select-bordered w-full max-w-xs"
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(e.target.value)}
                  >
                    <option disabled value="">
                      Hiển thị:
                    </option>
                    <option value="12">12</option>
                    <option value="24">24</option>
                    <option value="36">36</option>
                  </select>
                </div>
              </div>
              {/* {loading ? (
                <div className="text-center">Đang tải sản phẩm...</div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-4 gap-4">
                  {products.map((item) => (
                    <ProductItem key={item._id} item={item} />
                  ))}
                </div>
              ) : (

                <div className="text-center text-gray-500">
                  Không có sản phẩm nào trong danh mục này.
                </div>

                <ProductList customItem={true} type="" />
              //   <div className="text-center text-gray-500">
              //   Không có sản phẩm nào trong danh mục này.
              // </div>

              )} */}
              {loading ? (
                <div className="text-center">Đang tải sản phẩm...</div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-4 gap-4">
                  {products.map((item) => (
                    <ProductItem key={item._id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  Không có sản phẩm nào trong danh mục này.
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center gap-5 mt-6">
            <span className="w-10 h-10 rounded-full flex items-center justify-center border text-grayText text-[20px] font-semibold hover:bg-mainDark hover:text-white cursor-pointer">
              <FaLongArrowAltLeft />
            </span>
            <span className="w-10 h-10 rounded-full flex items-center justify-center bg-mainDark text-white text-[20px] font-semibold">
              1
            </span>
            <span className="w-10 h-10 rounded-full flex items-center justify-center border text-grayText text-[20px] font-semibold hover:bg-mainDark hover:text-white cursor-pointer">
              2
            </span>
            <span className="w-10 h-10 rounded-full flex items-center justify-center border text-grayText text-[20px] font-semibold hover:bg-mainDark hover:text-white cursor-pointer">
              3
            </span>
            <span className="w-10 h-10 rounded-full flex items-center justify-center border text-grayText text-[20px] font-semibold hover:bg-mainDark hover:text-white cursor-pointer">
              <FaLongArrowAltRight />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;

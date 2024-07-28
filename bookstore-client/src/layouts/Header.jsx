import React, { useState, useEffect } from "react";
import { FaBars, FaSearch, FaShoppingBag, FaUser } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsBag } from "react-icons/bs";
import { CiHeart, CiUser } from "react-icons/ci";
import { BiPhoneCall } from "react-icons/bi";
import axios from "axios";
import "../index.css";
import { useSelector } from "react-redux";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((count, item) => count + Number(item.quantity), 0);
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/products/search/${searchTerm.trim()}`
      );
      setSearchResults(response.data);
      navigate(`/menu?search=${searchTerm}`);
    } catch (error) {
      console.error("Lỗi tìm kiếm sản phẩm", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const menuList = [
    { id: 1, name: "Trang chủ", link: "/" },
    { id: 2, name: "Sản phẩm", link: "/menu" },
    { id: 3, name: "Về chúng tôi", link: "/about-us" },
    { id: 4, name: "Bài viết", link: "/blog" },
    { id: 5, name: "Liên hệ", link: "/contact-us" },
  ];

  return (
    <>
      <header className="border-b max-md:hidden max-lg:hidden">
        <div className="container">
          <div className="flex justify-between p-4">
            <div className="flex items-center gap-2">
              <BiPhoneCall className="w-6 h-6" />
              <p>0123 456 789</p>
            </div>
            <div className="flex items-center gap-8">
              <CiHeart className="w-7 h-7 hover:text-mainDark cursor-pointer" />
              <Link to="/sign-in">
                <CiUser className="w-7 h-7 hover:text-mainDark cursor-pointer" />
              </Link>
              <Link to="/cart">
                <div className="relative">
                  <BsBag className="w-6 h-6 hover:text-mainDark cursor-pointer" />
                  <div className="absolute -top-3 -right-3 w-5 h-5 rounded-full bg-mainDark flex items-center justify-center text-white p-2">
                    {cartCount}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div
        className={`shadow-custom ${
          isSticky ? "fixed top-0 left-0 w-full shadow-custom z-50 bg-white" : "shadow-custom"
        }`}>
        <div className="container">
          <div className="navbar py-3 justify-between flex max-md:flex-col max-md:py-5 max-lg:flex-col max-lg:py-5">
            <div>
              <a href="/">
                <img
                  src="./images/logo.png"
                  className="cursor-pointer w-52 max-md:mb-5 max-lg:mb-5"
                  alt="logo"
                />
              </a>
            </div>
            <div className="navbar-center max-lg:hidden lg:flex">
              <ul className="flex items-center px-1 gap-20 header-menu max-xl:gap-7">
                {menuList.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={item.link}
                      className={({ isActive }) =>
                        isActive
                          ? "text-mainDark font-semibold"
                          : "hover:text-mainDark hover:font-semibold"
                      }>
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full flex items-center justify-between gap-3 2xl:hidden max-2xl:hidden max-md:inline-flex max-sm:inline-flex max-lg:inline-flex">
              <div className="">
                <FaBars className="w-8 h-8" />
              </div>
              <label className="input input-bordered flex items-center gap-2">
                <FaSearch />
                <input
                  type="text"
                  className="grow max-md:w-[245px] max-md:h-10 max-lg:w-[485px] max-sm:w-[200px]"
                  placeholder="Tìm kiếm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </label>
              <div className="flex items-center gap-2">
                <FaShoppingBag className="w-8 h-8" />
                <FaUser className="w-8 h-8" />
              </div>
            </div>
            <label className="input input-bordered flex items-center gap-2 max-md:hidden max-lg:hidden">
              <FaSearch className="text-gray-400" />
              <input
                type="text"
                className="grow max-md:w-[245px] h-full max-md:h-10"
                placeholder="Tìm kiếm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

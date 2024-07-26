import React, { Fragment } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Main from "./layouts/Main";
import About from "./pages/About/About";
import Menu from "./pages/Menu/Menu";
import Contact from "./pages/Contact/Contact";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import Profile from "./pages/Profile/Profile";
import MyOrders from "./pages/MyOrders/MyOrders";
import Favorite from "./pages/Favorite/Favorite";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Blog from "./pages/Blog/Blog";
import BlogDetail from "./pages/BlogDetail/BlogDetail";
import DashBoard from "./pages/DashBoard/Admin/DashBoard";

import AddProduct from "./pages/DashBoard/Admin/AddProduct/AddProduct";
import EditProduct from "./pages/DashBoard/Admin/EditProduct/EditProduct";
import ManageProduct from "./pages/DashBoard/Admin/ManageProduct/ManageProduct";
import ManageCategory from "./pages/DashBoard/Admin/ManageCategory/ManageCategory";
import AddCategory from "./pages/DashBoard/Admin/AddCategory/AddCategory";
import EditCategory from "./pages/DashBoard/Admin/EditCategory/EditCategory";
import ManageUser from "./pages/DashBoard/Admin/ManageUser/ManageUser";
import ManageBlog from "./pages/DashBoard/Admin/ManageBlog/ManageBlog";
import AddBlog from "./pages/DashBoard/Admin/AddBlog/AddBlog";
function App() {
  return (
    <Fragment>
      <Routes>
        <Route element={<Main></Main>}>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/menu" element={<Menu></Menu>}></Route>
          <Route path="/about-us" element={<About></About>}></Route>
          <Route path="/contact-us" element={<Contact></Contact>}></Route>
          <Route path="/blog" element={<Blog></Blog>}></Route>
          <Route path="/blog-detail" element={<BlogDetail></BlogDetail>}></Route>
          <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
          <Route path="/checkout" element={<Checkout></Checkout>}></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route path="/my-orders" element={<MyOrders></MyOrders>}></Route>
          <Route path="/favorites" element={<Favorite></Favorite>}></Route>
          <Route path="/product-detail/:id" element={<ProductDetail></ProductDetail>}></Route>
        </Route>
        {/* admin */}
        <Route path="/dashboard" element={<DashBoard></DashBoard>}></Route>
        <Route path="/dashboard/manage-product" element={<ManageProduct></ManageProduct>}></Route>
        <Route
          path="/dashboard/manage-category"
          element={<ManageCategory></ManageCategory>}></Route>
        <Route path="/dashboard/manage-user" element={<ManageUser></ManageUser>}></Route>
        <Route path="/dashboard/manage-blog" element={<ManageBlog></ManageBlog>}></Route>
        <Route path="/dashboard/add-product" element={<AddProduct></AddProduct>}></Route>
        <Route path="/dashboard/add-category" element={<AddCategory></AddCategory>}></Route>
        <Route path="/dashboard/add-blog" element={<AddBlog></AddBlog>}></Route>
        <Route path="/dashboard/edit-product" element={<EditProduct></EditProduct>}></Route>
        <Route path="/dashboard/edit-category" element={<EditCategory></EditCategory>}></Route>
      </Routes>
    </Fragment>
  );
}

export default App;

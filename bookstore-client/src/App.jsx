import { Fragment } from "react";
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
import ManageAuthor from "./pages/DashBoard/Admin/ManageAuthor/ManageAuthor";
import AddAuthor from "./pages/DashBoard/Admin/AddAuthor/AddAuthor";
import ManagePublishes from "./pages/DashBoard/Admin/ManagePublishes/ManagePublishes";
import AddPublishes from "./pages/DashBoard/Admin/AddPublishes/AddPublishes";
import EditBlog from "./pages/DashBoard/Admin/EditBlog/EditBlog";
import ManageOrder from "./pages/DashBoard/Admin/ManageOrder/ManageOrder";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
function App() {
  return (
    <Fragment>
      <Routes>
        <Route element={<Main />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/blog" element={<Blog />}></Route>
          <Route path="/blog-detail/:id" element={<BlogDetail />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/favorites" element={<Favorite />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
        </Route>
        {/* admin */}
        <Route path="/dashboard" element={<DashBoard />}></Route>
        <Route path="/dashboard/manage-product" element={<ManageProduct />} />
        <Route path="/dashboard/manage-category" element={<ManageCategory />} />
        <Route path="/dashboard/manage-user" element={<ManageUser />} />
        <Route path="/dashboard/manage-blog" element={<ManageBlog />} />
        <Route path="/dashboard/manage-author" element={<ManageAuthor />} />
        <Route path="/dashboard/manage-order" element={<ManageOrder />} />
        <Route path="/dashboard/manage-publishes" element={<ManagePublishes />} />
        <Route path="/dashboard/add-author" element={<AddAuthor />} />
        <Route path="/dashboard/add-publishes" element={<AddPublishes />} />
        <Route path="/dashboard/add-product" element={<AddProduct />} />
        <Route path="/dashboard/add-category" element={<AddCategory />} />
        <Route path="/dashboard/add-blog" element={<AddBlog />} />
        <Route path="/dashboard/edit-product/:id" element={<EditProduct />} />
        <Route path="/dashboard/edit-category/:id" element={<EditCategory />} />
        <Route path="/dashboard/edit-blog/:id" element={<EditBlog />} />
      </Routes>
    </Fragment>
  );
}

export default App;

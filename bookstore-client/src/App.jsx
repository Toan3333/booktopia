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

import AddProduct from "./pages/Admin/AddProduct/AddProduct";
import EditProduct from "./pages/Admin/EditProduct/EditProduct";
import ManageProduct from "./pages/Admin/ManageProduct/ManageProduct";
import ManageCategory from "./pages/Admin/ManageCategory/ManageCategory";
import AddCategory from "./pages/Admin/AddCategory/AddCategory";
import EditCategory from "./pages/Admin/EditCategory/EditCategory";
import ManageUser from "./pages/Admin/ManageUser/ManageUser";
import ManageBlog from "./pages/Admin/ManageBlog/ManageBlog";
import AddBlog from "./pages/Admin/AddBlog/AddBlog";
import ManageAuthor from "./pages/Admin/ManageAuthor/ManageAuthor";
import AddAuthor from "./pages/Admin/AddAuthor/AddAuthor";
import ManagePublishes from "./pages/Admin/ManagePublishes/ManagePublishes";
import AddPublishes from "./pages/Admin/AddPublishes/AddPublishes";
import EditBlog from "./pages/Admin/EditBlog/EditBlog";
import ManageOrder from "./pages/Admin/ManageOrder/ManageOrder";
import DashBoard from "./pages/Admin/Dashboard/DashBoard";
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

        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          }></Route>
        <Route path="/admin/manage-product" element={<ManageProduct />} />
        <Route path="/admin/manage-category" element={<ManageCategory />} />
        <Route path="/admin/manage-user" element={<ManageUser />} />
        <Route path="/admin/manage-blog" element={<ManageBlog />} />
        <Route path="/admin/manage-author" element={<ManageAuthor />} />
        <Route path="/admin/manage-order" element={<ManageOrder />} />
        <Route path="/admin/manage-publishes" element={<ManagePublishes />} />
        <Route path="/admin/add-author" element={<AddAuthor />} />
        <Route path="/admin/add-publishes" element={<AddPublishes />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/add-category" element={<AddCategory />} />
        <Route path="/admin/add-blog" element={<AddBlog />} />
        <Route path="/admin/edit-product/:id" element={<EditProduct />} />
        <Route path="/admin/edit-category/:id" element={<EditCategory />} />
        <Route path="/admin/edit-blog/:id" element={<EditBlog />} />
      </Routes>
    </Fragment>
  );
}

export default App;

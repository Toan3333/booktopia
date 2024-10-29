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
import MyOrderDetail from "./pages/MyOrderDetail/MyOrderDetail";
import PurchaseHistory from "./pages/Admin/PurchaseHistory/PurchaseHistory";
import DetailOrder from "./pages/Admin/DetailOrder/DetailOrder";
import ManageVoucher from "./pages/Admin/ManageVoucher/ManageVoucher";
import AddVoucher from "./pages/Admin/AddVoucher/AddVoucher";
import EditVoucher from "./pages/Admin/EditVoucher/EditVoucher";

function App() {
  return (
    <Fragment>
      <Routes>
      {/*user*/}
      <Route element={<Main />}>
        <Route path="/" element={<PrivateRoute allowedRoles={[0]}><HomePage /></PrivateRoute>} />
        <Route path="/menu" element={<PrivateRoute allowedRoles={[0]}><Menu /></PrivateRoute>} />
        <Route path="/about-us" element={<PrivateRoute allowedRoles={[0]}><About /></PrivateRoute>} />
        <Route path="/contact-us" element={<PrivateRoute allowedRoles={[0]}><Contact /></PrivateRoute>} />
        <Route path="/blog" element={<PrivateRoute allowedRoles={[0]}><Blog /></PrivateRoute>}></Route>
        <Route path="/blog-detail/:id" element={<PrivateRoute allowedRoles={[0]}><BlogDetail /></PrivateRoute>} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<PrivateRoute allowedRoles={[0]}><SignUpPage /></PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute allowedRoles={[0]}><Cart /></PrivateRoute>} />
        <Route path="/checkout" element={<PrivateRoute allowedRoles={[0]}><Checkout /></PrivateRoute>} />
        <Route path="/checkout/:id" element={<PrivateRoute allowedRoles={[0]}><Checkout /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute allowedRoles={[0]}><Profile /></PrivateRoute>}/>
        <Route path="/my-orders" element={<PrivateRoute allowedRoles={[0]}><MyOrders /></PrivateRoute>} />
        <Route path="/order-detail/:id" element={<PrivateRoute allowedRoles={[0]}><MyOrderDetail /></PrivateRoute>} />
        <Route path="/favorites" element={<PrivateRoute allowedRoles={[0]}><Favorite /></PrivateRoute>} />
        <Route path="/product-detail/:id" element={<PrivateRoute allowedRoles={[0]}><ProductDetail /></PrivateRoute>} />
      </Route>
      {/* admin */}

      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute allowedRoles={[1]}>
            <DashBoard />
          </PrivateRoute>
        }></Route>
      <Route path="/admin/manage-product" element={<PrivateRoute allowedRoles={[1]}><ManageProduct /></PrivateRoute>} />
      <Route path="/admin/manage-category" element={<PrivateRoute allowedRoles={[1]}><ManageCategory /></PrivateRoute>} />
      <Route path="/admin/manage-user" element={<PrivateRoute allowedRoles={[1]}><ManageUser /></PrivateRoute>} />
      <Route path="/admin/manage-blog" element={<PrivateRoute allowedRoles={[1]}><ManageBlog /></PrivateRoute>} />
      <Route path="/admin/manage-author" element={<PrivateRoute allowedRoles={[1]}><ManageAuthor /></PrivateRoute>} />
      <Route path="/admin/manage-order" element={<PrivateRoute allowedRoles={[1]}><ManageOrder /></PrivateRoute>} />
      <Route path="/admin/manage-voucher" element={<PrivateRoute allowedRoles={[1]}><ManageVoucher /></PrivateRoute>} />
      <Route path="/admin/purchase-history/:id" element={<PrivateRoute allowedRoles={[1]}><PurchaseHistory /></PrivateRoute>} />
      <Route path="/admin/detail-order/:id" element={<PrivateRoute allowedRoles={[1]}><DetailOrder /></PrivateRoute>} />
      {/* <Route path="/admin/manage-items" element={<EditOrder />} /> */}
      <Route path="/admin/manage-publishes" element={<PrivateRoute allowedRoles={[1]}><ManagePublishes /></PrivateRoute>} />
      <Route path="/admin/add-author" element={<PrivateRoute allowedRoles={[1]} ><AddAuthor /></PrivateRoute>} />
      <Route path="/admin/add-publishes" element={<PrivateRoute allowedRoles={[1]}><AddPublishes /></PrivateRoute>} />
      <Route path="/admin/add-product" element={<PrivateRoute allowedRoles={[1]}><AddProduct /></PrivateRoute>} />
      <Route path="/admin/add-category" element={<PrivateRoute allowedRoles={[1]}><AddCategory /></PrivateRoute>} />
      <Route path="/admin/add-blog" element={<PrivateRoute allowedRoles={[1]}><AddBlog /></PrivateRoute>} />
      <Route path="/admin/add-voucher" element={<PrivateRoute allowedRoles={[1]}><AddVoucher /></PrivateRoute>} />
      <Route path="/admin/edit-voucher" element={<PrivateRoute allowedRoles={[1]}><EditVoucher /></PrivateRoute>} />
      <Route path="/admin/edit-voucher" element={<PrivateRoute allowedRoles={[1]}><EditVoucher /></PrivateRoute>} />
      <Route path="/admin/edit-product/:id" element={<PrivateRoute allowedRoles={[1]}><EditProduct /></PrivateRoute>} />
      <Route path="/admin/edit-category/:id" element={<PrivateRoute allowedRoles={[1]}><EditCategory /></PrivateRoute>} />
      <Route path="/admin/edit-blog/:id" element={<PrivateRoute allowedRoles={[1]}><EditBlog /></PrivateRoute>} />
    </Routes>
    </Fragment>
  );
}

export default App;

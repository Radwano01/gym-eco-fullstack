import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Contact from "./pages/contact/Contact";
import Products from "./pages/products/Products";
import Profile from "./pages/profile/Profile";
import Login from "./pages/registration/login/Login";
import Register from "./pages/registration/register/Register";
import ForgotPassword from "./pages/registration/forgotpassword/ForgotPassword";
import ResetPassword from "./pages/registration/resetpassword/ResetPassword";
import ProductDetails from "./pages/productdetails/ProductDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuccessRegister from "./pages/registration/successregister/SuccessRegister";
import AdminPage from "./pages/admin/AdminPage";
import Cart from "./pages/cart/Cart";
import AddressDetails from "./pages/payment/AddressDetails";
import Payment from "./pages/payment/Payment";
import FirstPaymentWay from "./pages/payment/paymentways/FirstPaymentWay";
import SecondPaymentWay from "./pages/payment/paymentways/SecondPaymentWay";
import Orders from "./pages/orders/Orders";
import OrderDetails from "./pages/orders/orderdetails/OrderDetails";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/registration/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route
          path="/verify/:email/:verification"
          element={<SuccessRegister />}
        />
        <Route
          path="/reset-password/:email/:verification"
          element={<ResetPassword />}
        />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/address-details" element={<AddressDetails />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/first-payment-way" element={<FirstPaymentWay />} />
        <Route path="/second-payment-way" element={<SecondPaymentWay />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order-detail/:id" element={<OrderDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/registration/login" element={<Login />} />
      </Routes>
      <hr />
      <Footer />
    </div>
  );
}

export default App;

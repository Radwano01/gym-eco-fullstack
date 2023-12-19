import React, { useEffect, useState } from "react";
import "./firstpaymentway.scss";
import Navbar from "../../../components/navbar/Navbar";
import { ImArrowRight, ImArrowDown } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { CALCULATE_SUBTOTAL } from "../../../redux/cartSlice";
import { useTranslation } from "react-i18next";
import FileBase64 from "react-file-base64";
import spinner from "../../../assets/spinner.jpg"

const FirstPaymentWay = () => {
  const [t,] = useTranslation();
  const [loading, setLoading] = useState(false)

  const items = useSelector((state) => state.cart.cartItems);
  const price = useSelector((state) => state.cart.cartTotalAmount);
  const userID = window.localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_USER_ID)
  const address = window.localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_SHIPPING_ADDRESS);
  const email = window.localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_EMAIL);
  const name = window.localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_NAME);
  const [bill, setBill] = useState(null);
  const date = new Date();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
  });
  const handleSubmit = async (e) => {
    const itemsWithoutImages = items?.map(({ image, ...rest }) => rest);
    console.log(itemsWithoutImages)

    e.preventDefault();
    try {
      setLoading(true)
      const response = await axios.post(`${process.env.REACT_APP_API}/api/orders/order`, {
        userID: userID,
        name: name,
        email: email,
        price: price,
        bill: bill,
        items: itemsWithoutImages,
        status: "Checking",
        address: address,
        date: date,
        code: itemsWithoutImages[0].code,
      });
      setLoading(false)
      if(response && response.data && response.length > 0){
        window.localStorage.removeItem(process.env.REACT_APP_LOCALSTORAGE_EMAIL);
        window.localStorage.removeItem(process.env.REACT_APP_LOCALSTORAGE_CARTITEMS);
      }
      navigate("/orders");
    } catch (err) {
      toast.error("someting went wrong");
    }
  };
  return (
    <div className="first-payment-way">
      <br />
      <br />
      <Navbar type={"slider-navbar"} />
      <br />
      <br />
      <br />

      <div className="first-payment-way-container">
        <div className="title">
          <h1>IBAN</h1>
          <br />
          <h3>/payment/first-payment-way/IBAN</h3>
        </div>
        <div className="cards">
          <div className="card left">
            <h2>
              {t("CheckOutIBAN-Total-Amount")}: {price}TRY
            </h2>
            <a href="/cart">
              <h3>{t("CheckOutIBAN-Total-Direction")}</h3>
            </a>
          </div>
          <div className="iconRight">
            <ImArrowRight size={100} />
          </div>
          <div className="iconDown">
            <ImArrowDown size={100} />
          </div>
          <div className="card center">
            <h2>
              {t("CheckOutIBAN-IBAN-Number")}: <span>5500 0000 0000 0000</span>
            </h2>

            <h2>
              {t("CheckOutIBAN-IBAN-Name")}: <span>john joe</span>
            </h2>
          </div>
          <div className="iconRight">
            <ImArrowRight size={100} />
          </div>
          <div className="iconDown">
            <ImArrowDown size={100} />
          </div>

          <div className="card right">
            <h2>{t("CheckOutIBAN-Bill")}</h2>
            <form onSubmit={handleSubmit}>
              <FileBase64
                multiple={false}
                type="file"
                onDone={({ base64 }) => setBill([base64])}
                required
              />
              <div className="button">
                <button type="submit">{t("CheckOutIBAN-Button")}</button>
                {loading && <img src={spinner} alt="spinner" width={25} height={25}/>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstPaymentWay;

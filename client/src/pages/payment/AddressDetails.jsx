import React, { useState } from "react";
import "./addressdetails.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SAVE_SHIPPING_ADDRESS } from "../../redux/checkoutSlice";
import Navbar from "../../components/navbar/Navbar";
import { useTranslation } from "react-i18next";

const initialAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  phone: "",
};

const AddressDetails = () => {
  const [t] = useTranslation();

  const [shippingAddress, SetShippingAddress] = useState({
    ...initialAddressState,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShipping = (e) => {
    const { name, value } = e.target;
    SetShippingAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    navigate("/payment");
  };

  return (
    <section>
      <br />
      <br />
      <Navbar type={"slider-navbar"} />
      <br />
      <div className={`container ${"checkout"}`}>
        <h2>{t("AddressDetails-Title")}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <div className={"checkout-card"}>
              <h3>{t("AddressDetails-Text")}</h3>
              <label>{t("AddressDetails-Name")}</label>
              <input
                type="text"
                placeholder="Recipient Name"
                required
                name="name"
                value={shippingAddress.name}
                onChange={(e) => handleShipping(e)}
              />
              <br />
              <label>{t("AddressDetails-Line-One")}</label>
              <input
                type="text"
                placeholder="Address line 1"
                required
                name="line1"
                value={shippingAddress.line1}
                onChange={(e) => handleShipping(e)}
              />
              <label>{t("AddressDetails-Line-Two")}</label>
              <input
                type="text"
                placeholder="Address line 2"
                name="line2"
                value={shippingAddress.line2}
                onChange={(e) => handleShipping(e)}
              />
              <label>{t("AddressDetails-City")}</label>
              <input
                type="text"
                placeholder="City"
                required
                name="city"
                value={shippingAddress.city}
                onChange={(e) => handleShipping(e)}
              />
              <label>{t("AddressDetails-State")}</label>
              <input
                type="text"
                placeholder="State"
                required
                name="state"
                value={shippingAddress.state}
                onChange={(e) => handleShipping(e)}
              />
              <label>{t("AddressDetails-PostalCode")}</label>
              <input
                type="text"
                placeholder="Postal code"
                required
                name="postal_code"
                value={shippingAddress.postal_code}
                onChange={(e) => handleShipping(e)}
              />
              <label>{t("AddressDetails-Phone")}</label>
              <input
                type="text"
                placeholder="Phone"
                required
                name="phone"
                value={shippingAddress.phone}
                onChange={(e) => handleShipping(e)}
              />
              <button type="submit">{t("AddressDetails-Button")}</button>
            </div>
          </div>
        </form>
      </div>
      <br />
    </section>
  );
};

export default AddressDetails;

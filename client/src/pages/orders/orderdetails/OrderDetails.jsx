import axios from "axios";
import "./orderdetails.scss";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import { useTranslation } from "react-i18next";
import Loading from "../../../assets/spinner.jpg";

const OrderDetails = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [items, setItems] = useState([]);
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSingleOrder = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/orders/get-single-order/${id}`
        );
        const data = response.data;
        if (data) {
          setOrderDetails(data);
          setItems(data.o_items);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    getSingleOrder();
  });
  useEffect(() => {
    const getSingleOrderImages = async () => {
      const name = items?.map(({ name }) => name);
      const code = orderDetails.code;
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/orders/get-single-order-images`,
          {
            name,
            code,
          }
        );
        const data = response.data.images[0];
        setImages(data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    getSingleOrderImages();
  });

  const [t] = useTranslation();

  return (
    <div className="order-detail">
      <br />
      <br />
      <Navbar type={"slider-navbar"} />
      <br />
      <div className="order-detail-container">
        <>
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>{t("OrderDetails-Product")}</th>
                <th>{t("OrderDetails-Price")}</th>
                <th>{t("OrderDetails-Quantity")}</th>
                <th>{t("OrderDetails-Total")}</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <img
                  src={Loading}
                  alt="loading"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              )}
              {orderDetails &&
                items?.map((item, index) => (
                  <tr key={item.p_id}>
                    <td>
                      <b>{index + 1}</b>
                    </td>
                    <td>
                      <p>
                        <b>
                          {orderDetails.o_name} At {orderDetails.o_date}
                        </b>
                      </p>
                      <div className="img">
                        {images && (
                          <img
                            src={images.imageone}
                            alt={index}
                            style={{ width: "100px" }}
                          />
                        )}
                        <ul>
                          <li>
                            {t("OrderDetails-Arm-Length")}: {item.arm}
                          </li>
                          <li>
                            {t("OrderDetails-Body-Size")}: {item.size}
                          </li>
                          <li>
                            {t("OrderDetails-Color")}: {item.color}
                          </li>
                        </ul>
                      </div>
                    </td>
                    <td>{item.price}</td>
                    <td>{item.cartTotalQuantity}</td>
                    <td>{(item.price * item.cartTotalQuantity).toFixed(2)}</td>
                    <td style={{ color: "orangered" }}>
                      {orderDetails.o_status}...
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      </div>
    </div>
  );
};

export default OrderDetails;

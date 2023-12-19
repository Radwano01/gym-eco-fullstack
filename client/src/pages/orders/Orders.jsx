import React, { useEffect, useState } from "react";
import "./orders.scss";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loading from "../../assets/spinner.jpg";

const Orders = () => {
  const [Orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userID = window.localStorage.getItem(
    process.env.REACT_APP_LOCALSTORAGE_USER_ID
  );
  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/orders/get-orders`
        );
        const data = response.data[0];
        const filteredData = data?.filter(
          (data) => data.o_userid === JSON.parse(userID)
        );
        if (filteredData.length > 0) {
          setOrders(filteredData);
          setLoading(false);
        }
      } catch {
        toast.error("something went wrong");
      }
    };
    getOrders()
  });
  const handleClick = (id) => {
    navigate(`/order-detail/${id}`);
  };

  const [t] = useTranslation();

  return (
    <div className="orders">
      <br />
      <br />
      <Navbar type={"slider-navbar"} />
      <br />
      <br />
      <br />
      <div className="title">
        <h1>My Orders</h1>
      </div>
      <div className="orders-container">
        <>
          <div className="table">
            {Orders?.length === 0 ? (
              <>
                <p>No order found</p>
                {loading && <img src={Loading} alt="loading" />}
              </>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>{t("Order-Title")}</th>
                    <th>{t("Order-Date")}</th>
                    <th>{t("Order-Name")}</th>
                    <th>{t("Order-Status")}</th>
                  </tr>
                </thead>
                <tbody>
                  {Orders?.map((orders, index) => {
                    const { p_id, o_date, o_name, o_price, o_status } = orders;
                    return (
                      <tr key={p_id} onClick={() => handleClick(p_id)}>
                        <td>{index + 1}</td>
                        <td>
                          {o_name} at {o_date}
                        </td>
                        <td>Order Code:{p_id}</td>
                        <td>
                          {"$"}
                          {o_price}
                        </td>
                        <td>
                          <p
                            className={
                              o_status !== "Delivered" ? "pending" : "delivered"
                            }
                          >
                            {o_status}...
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </div>
  );
};

export default Orders;

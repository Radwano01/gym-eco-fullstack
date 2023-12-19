import axios from "axios";
import "./orderdetails.scss";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChangeStatus from "../../../../components/admin/changestatus/ChangeStatus";
import Loading from "../../../../assets/spinner.jpg";

const OrderDetails = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [items, setItems] = useState([]);
  const [code, setCode] = useState(null);
  console.log(code)
  const [images, setImages] = useState(null);
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSingleOrder = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/orders/get-single-order/${id}`
        );
        const data = response.data;
        console.log(data)
        if (data) {
          setItems(data.o_items)
          setOrderDetails(data);
          setCode(data.o_items[0].code);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };
    getSingleOrder();
  },[]);
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
        const bill = response.data.bill[0].bill[0];
        setImages(data);
        setBill(bill);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    getSingleOrderImages();
  },[]);

  return (
    <div className="order-detail">
      <br />
      <div className="order-detail-container">
        {orderDetails === null ? (
          <div>loading...</div>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
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
                {items.map((item, index) => (
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
                        )}<br/>
                        {bill && (
                          <img
                            src={bill}
                            alt={index}
                            style={{ width: "100px" }}
                          />
                        )}
                        <ul>
                          <li>Arm Length: {item.arm}</li>
                          <li>Body Size: {item.size}</li>
                          <li>Color: {item.color}</li>
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
        )}
      </div>
      <ChangeStatus code={code} />
    </div>
  );
};

export default OrderDetails;

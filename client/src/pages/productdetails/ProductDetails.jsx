import React, { useEffect, useState } from "react";
import "./productdetails.scss";
import Navbar from "../../components/navbar/Navbar";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ADD_TO_CARD, CALCULATE_SUBTOTAL } from "../../redux/cartSlice";
import { useTranslation } from "react-i18next";
import Section from "../../components/section/Section";
import Loading from "../../assets/spinner.jpg";

const ProductDetails = () => {
  const { id } = useParams();

  const [t] = useTranslation();

  const dispatch = useDispatch();
  const [products, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedArmsSize, setSelectedArmsSize] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false)

  const negative = (e) => {
    if (quantity === 1) {
      e.preventDefault();
      setQuantity(1);
    } else {
      e.preventDefault();
      setQuantity((prev) => prev - 1);
    }
  };

  const positive = (e) => {
    e.preventDefault();
    setQuantity((prev) => prev + 1);
  };

  const addCart = (product) => {
    if (selectedColor === "") {
      setErrorMessage(1)
    } else if (selectedArmsSize === "") {
      setErrorMessage(2)
    } else if (selectedSize === "") {
      setErrorMessage(3)
    } else {
      dispatch(
        ADD_TO_CARD({
          p_id: product.p_id,
          name: product.p_name,
          price: product.p_price,
          category: product.p_category,
          image: image,
          arm: selectedArmsSize,
          size: selectedSize,
          color: selectedColor,
          cartTotalQuantity: quantity,
          code: product.p_code,
        })
      );
      toast.success("product added to cart")
    }
  };

  useEffect(()=>{
    const getProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/products/get-single-product/${id}`
        );
        const data = response.data;
        if (response) {
          setProduct(data);
          setLoading(false)
        }
      } catch (err) {
        toast.error("Something went wrong");
      }
    };
    getProducts()
  })
  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    if (selectedColor === "white") {
      setImage(products[0].imageone);
    } else if (selectedColor === "black") {
      setImage(products[0].imagetwo);
    }
  },[dispatch, selectedColor, products]);

  return (
    <div className="productdetails">
      <br />
      <br />
      <Navbar type={"slider-navbar"} />
      <div className="productdetails-container">
        {loading && <img src={Loading} alt="loading" />}
        {products?.map((product) => (
          <>
            <div className="left">
              <div className="img">
                {selectedColor === "" && <img src={product.imageone} alt="" />}
                {selectedColor === "white" && (
                  <img src={product.imageone} alt="" />
                )}
                {selectedColor === "black" && (
                  <img src={product.imagetwo} alt="" />
                )}
              </div>
            </div>
            <div className="right">
              <div key={product.p_id}>
                <div className="title">
                  <h1>{product.p_name}</h1>
                  <h4>{product.p_category}</h4>
                </div>
                <hr />
                <div className="price">
                  <h2>TRY{product.p_price.toFixed(2)}</h2>
                </div>
                <hr />
                <div className="options">
                  {product.p_arms && (
                    <div className="option">
                      <h3>{t("SingleProduct-Arm-Size")}:</h3>
                      <select
                        onChange={(e) => setSelectedArmsSize(e.target.value)}
                        value={selectedArmsSize}
                      >
                        <option value="" disabled selected>
                          {t("SingleProduct-Arm-Size")}
                        </option>
                        {product.p_arms
                          .slice(1, -1)
                          .split(",")
                          .map((arm) => (
                            <option key={arm.id} value={JSON.parse(arm)}>
                              {JSON.parse(arm)}
                            </option>
                          ))}
                      </select>
                      {errorMessage === 2 && (<div className="error-message"><h4>{t("SingleProduct-Arm-Error-Message")}</h4></div>)}
                    </div>
                  )}

                  {product.p_sizes && (
                    <div className="option">
                      <h3>{t("SingleProduct-Body-Size")}:</h3>
                      <select
                        onChange={(e) => setSelectedSize(e.target.value)}
                        value={selectedSize}
                      >
                        <option value="" disabled selected>
                          sizes
                        </option>
                        {product.p_sizes
                          .slice(1, -1)
                          .split(",")
                          .map((sizes) => (
                            <option key={sizes.id} value={JSON.parse(sizes)}>
                              {JSON.parse(sizes)}
                            </option>
                          ))}
                      </select>
                      {errorMessage === 3 && (<div className="error-message"><h4>{t("SingleProduct-Sizes-Error-Message")}</h4></div>)}
                    </div>
                  )}

                  {product.p_colors && (
                    <div className="option">
                      <h3>{t("SingleProduct-Color")}:</h3>
                      <select
                        onChange={(e) => setSelectedColor(e.target.value)}
                        value={selectedColor}
                      >
                        <option value="" disabled selected>
                          colors
                        </option>
                        {product.p_colors
                          .slice(1, -1)
                          .split(",")
                          .map((color) => (
                            <option key={color.id} value={JSON.parse(color)}>
                              {JSON.parse(color)}
                            </option>
                          ))}
                      </select>
                      {errorMessage === 1 && (<div className="error-message"><h4 className="error-message">{t("SingleProduct-Color-Error-Message")}</h4></div>)}
                    </div>
                  )}

                  <div className="option-quantity">
                    <div className="left">
                      <h3>{t("SingleProduct-Quantity")}:</h3>
                    </div>
                    <div className="right-quantity">
                      <button onClick={negative}>-</button>
                      <h2>{quantity}</h2>
                      <button onClick={positive}>+</button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="submit-button"
                  onClick={() => addCart(product)}
                >
                  {t("SingleProduct-Button")}
                </button>
              </div>
              <br />
            </div>
          </>
        ))}
      </div>
      <hr />
      <div className="product-section">
        <Section type={"first-section"} />
      </div>
    </div>
  );
};

export default ProductDetails;

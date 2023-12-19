import React, { useEffect, useState } from "react";
import "./products.scss";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loading from "../../assets/spinner.jpg";

const Products = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/products/get-products`
        );
        const data = response.data;
        console.log(data)
        if (data) {
          setProducts(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="products">
      <br />
      <br />
      <Navbar type={"slider-navbar"} />
      <br />
      <br />
      <br />
      <div className="products-container">
        <div className="type">
          <div className="title">
            <h1>{t("Products-Title")}</h1>
          </div>
          <div className="text">{t("Products-Text")}</div>
        </div>
        {loading && <img src={Loading} alt="loading" />}
        <div className="cards">
          {products?.map((product) => (
            <div className="card" key={product.p_id}>
              <div className="img">
                <img src={product.imageone} alt="" />
              </div>
              <div className="title">
                <h2>{product.p_name}</h2>
              </div>
              <div className="price">
                <h3>TRY{product?.p_price?.toFixed(2)}</h3>
              </div>
              <br />
              <div className="button">
                <button>
                  <Link to={`/productdetails/${product.p_id}`}>
                    {t("Products-Button")}
                  </Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;

import React, { useEffect, useState } from "react";
import "./allproducts.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import Notiflix from "notiflix";
import { toast } from "react-toastify";
import Loading from "../../../assets/spinner.jpg";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/products/get-products`
      );
      const allProducts = response.data;

      if (allProducts) {
        setProducts(allProducts);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  },[]);

  const deleteProduct = async (id, code) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API}/api/products/delete-product/${id}`,
        { code }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  

  const confirmDelete = (id,code) => {
    Notiflix.Confirm.show(
      "Delete Product",
      "Your are about to delete this product",
      "delete",
      "cancel",
      function okCb() {
        deleteProduct(id,code)
      },
      function cancelCb() {
        toast.error("if you say so...");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "oragered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      }
    );
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [ProductPerPage] = useState(6);

  const indexOfLastProduct = currentPage * ProductPerPage;
  const indexOfFirstProduct = indexOfLastProduct - ProductPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const prev = () => {
    setCurrentPage((prev) => (prev - 1 ? prev - 1 : (prev = 1)));
  };

  const next = () => {
    setCurrentPage((prev) => prev + 1);
  };
  return (
    <>
      <div className="table">
        <h2>All Products</h2>

        <div className="search">
          <p>
            <b>{products.length}</b> products found
          </p>
        </div>
        {currentProducts.length === 0 ? (
          <>
            <p>No product found.</p>
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
          </>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts?.map((product, index) => {
                const { p_id, p_name, p_price, imageone, p_category, p_code } = product;
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageone}
                        alt={p_name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{p_name}</td>
                    <td>{p_category}</td>
                    <td>{`TRY${p_price}`}</td>
                    <td className="icons">
                      <Link to={`/admin/edit-product/${p_id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        onClick={() =>
                          confirmDelete(p_id,p_code)
                        }
                        size={18}
                        color="red"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <div className="pagination">
          <button onClick={prev}>prev</button>
          {currentPage}
          <button onClick={next}>next</button>
        </div>
      </div>
    </>
  );
};

export default AllProducts;

import React, { useEffect, useState } from "react";
import "./editproduct.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FileBase64 from "react-file-base64";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageone, setImageOne] = useState([]);
  const [imagetwo, setImageTwo] = useState([]);
  const [category, setCategory] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedArms, setSelectedArms] = useState([]);

  const [validImageOne, setValidImageOne] = useState([])
  const [validImageTwo, setValidImageTwo] = useState([])

  const handleSizeChange = (e) => {
    const size = e.target.value;
    setSelectedSizes((prevSelectedSizes) => {
      if (prevSelectedSizes.includes(size)) {
        return prevSelectedSizes.filter((item) => item !== size);
      } else {
        return [...prevSelectedSizes, size];
      }
    });
  };

  const handleColorChange = (e) => {
    const color = e.target.value;
    setSelectedColors((prevSelectedColors) => {
      if (prevSelectedColors.includes(color)) {
        return prevSelectedColors.filter((item) => item !== color);
      } else {
        return [...prevSelectedColors, color];
      }
    });
  };

  const handleArmChange = (e) => {
    const arm = e.target.value;
    setSelectedArms((prevSelectedArms) => {
      if (prevSelectedArms.includes(arm)) {
        return prevSelectedArms.filter((item) => item !== arm);
      } else {
        return [...prevSelectedArms, arm];
      }
    });
  };

  const { id } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API}/api/products/edit-product/${id}`,
        {
          name,
          price,
          imageone,
          imagetwo,
          category,
          sizes: selectedSizes,
          colors: selectedColors,
          arms: selectedArms,
        }
      );
      toast.success("Product Added successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/products/get-single-product/${id}`
      );
      const data = response.data[0];
      setName(data.p_name);
      setPrice(data.p_price);
      setValidImageOne(data.imageone);
      setValidImageTwo(data.imagetwo);
      setCategory(data.p_category);
    } catch (err) {
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getProducts();
  });

  return (
    <div className="editproduct">
      <div className="title">
        <h1>Edit Product:</h1>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <label htmlFor="name">Product Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-input">
            <label htmlFor="price">Product Price*</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-input">
            <label htmlFor="images">Image One*</label>
            <div className="image-input">
              <FileBase64
                multiple={false}
                type="file"
                onDone={({ base64 }) => setImageOne([base64])}
                required
              />
              {imageone.length > 0 ? (
                <img src={imageone} alt="" style={{ width: 75, height: 80 }} />
              ) : (
                <img src={validImageOne} alt="" style={{ width: 75, height: 80 }} />
              )}
            </div>
            <label htmlFor="images">Image Two</label>
            <div className="image-input">
              <FileBase64
                multiple={false}
                type="file"
                onDone={({ base64 }) => setImageTwo([base64])}
              />
              {imagetwo.length > 0 ? (
                <img src={imagetwo} alt="" style={{ width: 75, height: 80 }} />
              ) : (
                <img src={validImageTwo} alt="" style={{ width: 75, height: 80 }} />
              )}
            </div>
          </div>
          <div className="form-input">
            <label htmlFor="category">Select Category*</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled selected>
                Category
              </option>
              <option value="T-Shirt">T-Shirt</option>
              <option value="Shorts">Shorts</option>
            </select>
          </div>
          <div className="form-check">
            <label>Select Sizes*</label>
            <div>
              <input
                type="checkbox"
                value="small"
                checked={selectedSizes.includes("small")}
                onChange={handleSizeChange}
              />
              <label>Small</label>
            </div>
            <div>
              <input
                type="checkbox"
                value="medium"
                checked={selectedSizes.includes("medium")}
                onChange={handleSizeChange}
              />
              <label>Medium</label>
            </div>
            <div>
              <input
                type="checkbox"
                value="large"
                checked={selectedSizes.includes("large")}
                onChange={handleSizeChange}
              />
              <label>Large</label>
            </div>
          </div>

          <div className="form-check">
            <label>Select Colors*</label>
            <div>
              <input
                type="checkbox"
                value="white"
                checked={selectedColors.includes("white")}
                onChange={handleColorChange}
              />
              <label>white</label>
            </div>
            <div>
              <input
                type="checkbox"
                value="black"
                checked={selectedColors.includes("black")}
                onChange={handleColorChange}
              />
              <label>black</label>
            </div>
          </div>

          <div className="form-check">
            <label>Select Arms*</label>
            <div>
              <input
                type="checkbox"
                value="long arm"
                checked={selectedArms.includes("long arm")}
                onChange={handleArmChange}
              />
              <label>Long Arm</label>
            </div>
            <div>
              <input
                type="checkbox"
                value="short arm"
                checked={selectedArms.includes("short arm")}
                onChange={handleArmChange}
              />
              <label>Short Arm</label>
            </div>
          </div>

          <div className="button">
            <button type="submit">Edit Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;

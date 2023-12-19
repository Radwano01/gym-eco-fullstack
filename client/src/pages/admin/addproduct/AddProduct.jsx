import React, { useEffect, useState } from 'react';
import './addproduct.scss';
import axios from 'axios';
import { toast } from 'react-toastify';
import FileBase64 from "react-file-base64"
import spinner from "../../../assets/spinner.jpg"

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [imageone, setImageOne] = useState([])
  const [imagetwo, setImageTwo] = useState([])
  const [category, setCategory] = useState('');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedArms, setSelectedArms] = useState([]);
  const [code, setCode] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    
    const randomNumber = Math.floor(Math.random() * 10000)+1
    const array = Array.from(String(randomNumber),Number)
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    const shuffledCode = parseInt(array.join(""), 10)
    setCode(shuffledCode)
  },[])

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await axios.post(`${process.env.REACT_APP_API}/api/products/add-products`,{
        name,
        price,
        imageone,
        imagetwo,
        category,
        sizes:selectedSizes,
        colors:selectedColors,
        arms:selectedArms,
        code:code
      });
      if(response){
        setLoading(false)
        toast.success('Product Added successfully')
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="">
      <div className="title">
        <h1>Add Product:</h1>
      </div><br />
      <div className="addproduct">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="form-input">
              <label htmlFor="name">Product Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                placeholder="Name"
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
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="form-input">
              <label htmlFor="images">Image One*</label>
              <div className="image-input">
                <FileBase64
                  multiple={false}
                  type='file'
                  onDone={({base64})=>setImageOne([base64])}
                  required
                />
                {imageone.length > 0 ? <img src={imageone} alt='' style={{width:75, height:80}}/> : <span>No image uploaded</span>}
              </div>
              <label htmlFor="images">Image Two</label>
                <div className="image-input">
                <FileBase64
                  multiple={false}
                  type="file"
                  onDone={({base64})=>setImageTwo([base64])}
                />
                {imagetwo.length > 0 ? <img src={imagetwo} alt='' style={{width:75, height:80}}/> : <span>No image uploaded</span>}
             </div>
            </div>
            <div className="form-input">
              <label htmlFor="category">Select Category*</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="" disabled selected>Category</option>
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
                  checked={selectedSizes.includes('small')}
                  onChange={handleSizeChange}
                />
                <label>Small</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="medium"
                  checked={selectedSizes.includes('medium')}
                  onChange={handleSizeChange}
                />
                <label>Medium</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="large"
                  checked={selectedSizes.includes('large')}
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
                  checked={selectedColors.includes('white')}
                  onChange={handleColorChange}
                />
                <label>white</label>
                <input
                  type="checkbox"
                  value="red"
                  checked={selectedColors.includes('red')}
                  onChange={handleColorChange}
                />
                <label>red</label>
              </div>
              <div className="">
              <input
                type="checkbox"
                value="black"
                checked={selectedColors.includes('black')}
                onChange={handleColorChange}
                />
                <label>black</label>
                <input
                  type="checkbox"
                  value="blue"
                  checked={selectedColors.includes('blue')}
                  onChange={handleColorChange}
                />
                <label>blue</label>
              </div>
            </div>

            <div className="form-check">
              <label>Select Arms*</label>
              <div>
                <input
                  type="checkbox"
                  value="long arm"
                  checked={selectedArms.includes('long arm')}
                  onChange={handleArmChange}
                />
                <label>Long Arm</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="short arm"
                  checked={selectedArms.includes('short arm')}
                  onChange={handleArmChange}
                />
                <label>Short Arm</label>
              </div>
            </div>

            <div className="button">
              <button type="submit">Add Product</button>
              {loading && <img src={spinner} alt='spinner' width={50} height={50}/>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

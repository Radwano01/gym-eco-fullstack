import React, { useEffect, useState } from 'react'
import "./popularfeatures.scss"
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios'
import { useTranslation } from 'react-i18next'


const PopularFeatures = () => {

    const [products, setProducts] = useState([])

    const getProducts = async()=>{
        const response = await axios.get(`${process.env.REACT_APP_API}/api/products/get-products`)
        const data = response.data
        const filterID = [62]
        const popularData = data?.filter((item)=> filterID.includes(item.p_id))
        setProducts(popularData)
    }

    useEffect(()=>{
        getProducts()
    }, [])

    const [t,] = useTranslation()

  return (
    <div className='popularfeatures'>
            <div className="popularfeatures-container">
                <div className="popular-text">
                    <div className="type">
                        <h3>{t("Popular-Type")}</h3>
                    </div>
                    <div className="title">
                        <h1>{t("Popular-Title")}</h1>  
                    </div>
                    <div className="text">
                        <h3>{t("Popular-Text")}</h3>
                    </div>
                </div>
                <div className="cards">
                    {products?.map((product)=>(
                        <div className="card">
                            <div className="img">
                                <img src={product.imageone} alt="" />
                            </div>
                            <div className="title">
                                <h2>{product.p_name}</h2>
                            </div>
                            <div className="price">
                                <h3>TRY{product.p_price.toFixed(2)} <span>TRY139,99</span></h3>
                            </div><br />
                            <div className="button">
                            <Link to={`/productdetails/${product.p_id}`}>{t("Popular-Product-Button")}</Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="view-products">
                    <div className="button">
                        <button><NavLink to="/products">{t( "Popular-Button")}</NavLink></button>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default PopularFeatures
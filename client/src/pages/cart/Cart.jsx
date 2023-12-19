import React, { useEffect } from 'react'
import "./cart.scss"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate} from 'react-router-dom'
import {FaTrashAlt } from "react-icons/fa"
import { ADD_TO_CARD, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, CLEAR_CART, DECREASE_CART, DELETE_CART } from '../../redux/cartSlice'
import Navbar from '../../components/navbar/Navbar'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
    
  const Cart = () => {

    const [t, ] = useTranslation()

    const cartItems = useSelector((state)=> state.cart.cartItems)
    const cartTotalAmount = useSelector((state)=> state.cart.cartTotalAmount)
    const cartTotalQuantity = useSelector((state)=> state.cart.cartTotalQuantity)
    const email = window.localStorage.getItem(
      process.env.REACT_APP_LOCALSTORAGE_EMAIL
    );
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const increaseCart =(p_id)=>{
      dispatch(ADD_TO_CARD(p_id))
    }

    const decreaseCart =(cart)=>{
      dispatch(DECREASE_CART(cart))
    }

    const deleteCart = (item)=>{
      dispatch(DELETE_CART(item))
    }

    const clearCart = ()=>{
      dispatch(CLEAR_CART())
    }

    const navigatePayment = () =>{
      if(!email){
        toast.error("You have to login before shopping!!!")
      }else{
        navigate("/address-details")
      }
    }

    useEffect(()=>{
      dispatch(CALCULATE_SUBTOTAL())
      dispatch(CALCULATE_TOTAL_QUANTITY())
    },[dispatch, cartItems])




    return (
      <section>
        <br /><br /><Navbar type={"slider-navbar"}/><br/>
        <div className={`container ${"table"}`}>
          <h2>{t("Cart-Title")}</h2>
          {cartItems.length === 0 ?(
            <div className='no-product'>
              <p>{t("Cart-Not-Found")}</p>
              <br />
              <div>
                <Link to="/#product">&larr; {t("Cart-Continue")}</Link>
              </div>
            </div>
          ) : (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>s/n</th>
                      <th>{t("Cart-Product")}</th>
                      <th>{t("Cart-Price")}</th>
                      <th>{t("Cart-Quantity")}</th>
                      <th>{t("Cart-Total")}</th>
                      <th>{t("Cart-Actions")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems?.map((item, index)=>{
                      const {p_id, p_name, price, image, cartTotalQuantity, arm, size, color} = item
                      return(
                        <tr key={p_id}>
                          <td>{index + 1}</td>
                          <td>
                            <p>
                              {p_name}
                            </p>
                            <div className="img">
                              <img src={image} alt={p_name} style={{width:"100px"}}/>
                              <ul>
                                <li>{t("Cart-Arm-Size")}: {arm}</li>
                                <li>{t("Cart-Body-Size")}: {size}</li>
                                <li>{t("Cart-Color")}: {color}</li>
                              </ul>
                            </div>
                          </td>
                          <td>{price}</td>
                          <td>
                            <div className="count">
                              <button className='--btn' onClick={()=> decreaseCart(item)}>-</button>
                              <p>
                                <b>{cartTotalQuantity}</b>
                              </p>
                              <button className="--btn" onClick={()=> increaseCart(item)}>+</button>
                            </div>
                          </td>
                          <td>{(price * cartTotalQuantity).toFixed(2)}</td>
                          <td className='icons'>
                            <FaTrashAlt size={19} color="red" onClick={()=> deleteCart(item)}/>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                <div className="summary">
                    <button className='clear-button' onClick={()=> clearCart()}>{t("Cart-Clear")}</button>
                    <div className="checkout-cart">
                      <div className="">
                        <Link to="/#product">&larr; {t("Cart-Clear")}</Link>
                      </div>
                      <br />
                      <div className="cart-card">
                        <p>{`cart item(s): ${cartTotalQuantity}`}</p>
                        <div className="text">
                          <h3>{t("Cart-Subtotal")}:</h3>
                          <h3>{`TRY ${cartTotalAmount?.toFixed(2)}`}</h3>
                        </div>
                        <p>{t("Cart-Calculated-Checkout")}</p>
                        <button className='--btn' onClick={()=> navigatePayment()}>{t("Cart-Button")}</button>
                      </div>
                    </div>
                </div>
              </>
          )}
        </div>
        <br />
      </section>
    )
  }
    
export default Cart
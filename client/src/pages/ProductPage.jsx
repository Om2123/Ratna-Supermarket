import React from "react";
import Carousel from "../components/Carousel";
import CategoriesHead from "../components/TopCategoriesHead";
import TopCategoriesList from "../components/TopCategoriesList";
import BuyCard from "../components/BuyCards";
import { useParams } from "react-router-dom";
import productsData from "../data/product.json";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCart } from '../actions/CartControl';
import { getProduct } from "../service/api";

function ProductPage() {
  const { id } = useParams();
  const [products, setProducts] = useState({});
  const { addToCart, removeFromCart, cartItems } = useCart();

  const [count, setCount] = useState(0);

  useEffect(() => {
    async function getimgURL() {
      try {
        const BASE_URL = 'https://speargear-backend.onrender.com'; // Replace with your backend server URL

        const response = await fetch(`${BASE_URL}/products/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      }
      catch (error) {
        console.error(error);
      }

    }
    getimgURL()


    const cartItem = cartItems.find(item => item.id === id);
    if (cartItem) {
      setCount(cartItem.count);
    }


  }, [cartItems, id]);

  return (
    <>
      <div className="mt-[120px] flex">
        <div className="container mx-auto">
          <div className="mt-[10vh] flex flex-row gap-[7.5vw] justify-center items-center">
            <img
              src={products.imageUrl}
              className="w-[50vw] max-w-lg rounded-2xl shadow-2xl"
            ></img>
            <div className="flex flex-col gap-4">
              <span className="font-black text-[2vw]">{products.name}</span>
              application
              {/* : 
"Chevrolet Tavera"
category
: 
"Automotive Parts"
compatibility
: 
"Chevrolet Tavera (All Models)"
createdAt
: 
"2024-11-22T15:59:58.855Z"
description
: 
"Pad Kit – Front brake pads for Chevrolet Tavera"
imageUrl
: 
"https://sparegear.in/assets/F002H24101-8F8-0mHvz_im.jpg"
name
: 
"Front Brake Pad Kit"
partNumber
: 
"F 002 H60 040-8F8"
price
: 
860
shortKey
: 
"PD040"
stock
: 
100 */}
              <div className="flex flex-col gap-1">
                <span className="text-[2.5vh]">Our Price:</span>
                <span className="text-[2.5vh]">
                  ₹{products.price} <span className="text-[2vh] font-[100] line-through">₹{products.price}</span>
                </span>
              </div>
              {(count === 0 && (
                <div className=' mr-2' onClick={() => {
                  setCount(count + 1);
                  addToCart({ id, productName: products.name, discountPrice: products.price, count: count + 1, imageUrl: products.imageUrl });
                }}>
                  <button style={{
                    backgroundColor: '#F3F9FB',
                    borderColor: '#54B22C',
                    color: '#249B3E',
                    width: '60px',
                    borderRadius: '5px',
                    border: '1px solid',
                  }}>ADD</button>
                </div>
              ))}
              {count > 0 && (
                <div className='mr-2 flex gap-2'>
                  <span
                    style={{
                      cursor: 'pointer',
                      marginTop: '1px',
                      userSelect: 'none'
                    }} onClick={() => {
                      if (count >= 1 && count < 10)
                        setCount(count + 1);
                      addToCart({ id, productName: products.name, discountPrice: products.price, count: count + 1, imageUrl: products.imageUrl });
                    }}>+</span>
                  <div><input type="text" className='w-6 border-2 indent-1' value={count} /></div>
                  <span
                    style={{
                      cursor: 'pointer',
                      marginTop: '1px',
                      userSelect: 'none'
                    }}
                    onClick={() => {
                      if (count >= 1) {
                        setCount(count - 1);
                        removeFromCart({ id });
                      }
                    }}> - </span>
                </div>
              )}
              {/* <span>
                <button className="px-[1.6vw] py-[1.4vh] text-[2.5vh] font-bold text-white flex flex-row gap-3 justify-center align-middle bg-green-500 shadow-lg shadow-green-300 rounded-lg">
                  <img className="w-[1.8vw]" src="/CartWhite.svg"></img>Add to
                  Cart
                </button>
              </span> */}
              <span className="font-bold">Description</span>
              <span>
                {products.description}
              </span>
              <span className="font-bold">
                Origin: <span className="font-normal">India</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="md:mt-24 sm:mt-36 ">
          <span className="font-black text-[2vw] mx-[7vw]">
            Explore More Products:{" "}
          </span>
        </div>
        <CategoriesHead title="Shop From" greenTitle="Top Categories" />
        <TopCategoriesList />

      </div>
    </>
  );
}

export default ProductPage;

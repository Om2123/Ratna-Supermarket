import React, { useEffect, useState } from "react";
import BuyCard from "./BuyCard";
import './BuyPage.css';
import { getProducts } from "../service/api";
 
function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text"></div>
    </div>
  );
}

function BuyCards({ bogo }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        console.log(data);
        
        setProducts(data.slice(0, 5)); // Limit to 5 products
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="mt-5 px-10">
      <div className="container mx-auto mt-5 flex justify-center md:justify-start items-center">
        <div className="grid-box">
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : products.map((item, index) => (
                <BuyCard
                  id={item._id}
                  key={index}
                  bogo={item.bogo}
                  productName={item.name}
                  mrp={item.price}
                  description={item.description}
                  discountPrice={item.price - 1}
                  imageUrl={item.imageUrl}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

export default BuyCards;

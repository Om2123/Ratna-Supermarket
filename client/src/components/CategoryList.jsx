import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BuyCard from "./BuyCard";

const BASE_URL = "https://example.com/api"; // Replace with your actual base URL

// New method to fetch products by category
async function getProductsCategory(category) {
  try {
    const response = await fetch(`${BASE_URL}/products/category/${category}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}

function CategoryList() {
  const { categoryName } = useParams();
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    // Fetch products for the specific category
    const fetchCategoryData = async () => {
      const data = await getProductsCategory(categoryName);
      setProductsData(data);
    };

    fetchCategoryData();
  }, [categoryName]); // Re-run when categoryName changes

  return (
    <div className="mt-[120px] flex">
      <div className="m-auto mt-16 md:mt-6 w-4/5 pl-5 overflow-y-visible">
        <h2 className="font-bold capitalize text-2xl">{categoryName}</h2>
        <div className="p-5 grid md:grid-cols-4 justify-center md:justify-normal grid-cols-1 gap-4">
          {productsData.map((product) => (
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
          {productsData.length === 0 && <h2>No products found</h2>}
        </div>
      </div>
    </div>
  );
}

export default CategoryList;

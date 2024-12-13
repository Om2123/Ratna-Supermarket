const BASE_URL = 'https://speargear-backend.onrender.com'; // Replace with your backend server URL

//const BASE_URL = 'http://localhost:3001'; // Replace with your backend server URL

async function getProduct(productId) {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched product data:", data);
    return data;
    // Ensure `body` exists before returning it
    if (data && data.body) {
      return data.body;
    } else {
      throw new Error("Unexpected response structure: 'body' is undefined.");
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    return null; // Return null or handle appropriately
  }
}

async function createPaymentLink({amount,pName}) {
    try {
        const response = await fetch(`${BASE_URL}/payment/create-payment-link`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: amount, // Amount in paise (INR)
                currency: 'INR',
                receipt: 'order_12345', // Unique receipt ID 
                name: pName
            })
        });

        const data = await response.json();
        console.log(data.order);
        const orderId = data.order.id;
        const order = data.order; 

        // Initiate Razorpay checkout
        const options = {
            key_id: "rzp_test_hoIl7ooh9Mju0W", // Replace with your test Key ID
            amount: order.amount, // Amount in paise
            currency: order.currency,
            name: 'Spare Gear',
            description: 'Product Purchase',
            image: 'https://www.example.com/logo.png', // Your company logo
            order_id: orderId, // Your Razorpay order ID
            handler: function (response) {
                // Handle payment success
                console.log('Payment ID:', response.razorpay_payment_id);
                // Update order status or perform other actions
            },
            prefill: {
                email: 'user@example.com', // Pre-fill user email
                contact: '9876543210', // Pre-fill user phone number
            },
            notes: {
                // Additional information for your reference
                // e.g., 'customer_id': '12345'
            },
            theme: {
                // Customize checkout appearance
                // e.g., color: '#007bff',
            },
        };
        const rzp = new Razorpay(options);
        rzp.open();
    
    } catch (error) {
        console.error(error);
    }
}
async function getProducts() {
  const response = await fetch(`${BASE_URL}/products`);
  const data = await response.json();
  console.log(data);
  return data;
}

async function addProduct(productData) {
  const response = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  const data = await response.json();
  return data;
}

async function updateProduct(productId, productData) {
  const response = await fetch(`${BASE_URL}/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  const data = await response.json();
  return data;
}

async function removeProduct(productId) {
  const response = await fetch(`${BASE_URL}/products?id=${productId}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
}

async function searchProducts(query) {
  const response = await fetch(`${BASE_URL}/products/search?query=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data;
}
async function addOrder(orderData) {
  const response = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
  });
  const data = await response.json();
  return data;
}

async function addAddress(addressData) {
  const response = await fetch(`${BASE_URL}/addresses`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(addressData),
  });
  const data = await response.json();
  return data;
}

// Exporting the new function along with the existing ones
export { 
  getProduct, 
  createPaymentLink, 
  getProducts, 
  addProduct, 
  updateProduct, 
  removeProduct,
  addOrder,       
  addAddress,
  searchProducts    // New function to search for products
};
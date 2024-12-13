import axios from 'axios';

const BASE_URL = 'https://speargear-backend.onrender.com'; // Replace with your backend server URL
// const BASE_URL = 'http://localhost:3001'; // Replace with your backend server URL

// Function to get user info
export const getUserInfo = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user-auth/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Include token in headers
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

// Function to log in user
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/user-auth/login`, {
      email: email,
      password: password,
    });
    const token = response.data.token;
    console.log(token);
    // Save token in localStorage
    localStorage.setItem('userToken', token);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// Function to sign up user
export const signupUser = async (email, password, name, city, mobileNumber) => {
  try {
    const response = await axios.post(`${BASE_URL}/user-auth/signup`, {
      email,
      password,
      city,
      name,
      mobileNumber,
    });
    
    const token = response.data.token; // Assume token is returned on signup
    console.log('Signup successful:', response.data);
    
    // Save token in localStorage
    localStorage.setItem('userToken', token);
    
    return response.data; // or whatever you need to do
  } catch (error) {
    console.error('Signup error:', error);
    throw error; // Handle signup error as needed
  }
};

// Function to list all users
export const listUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user-auth/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Function to edit user
export const editUser = async (userId, updates) => {
  try {
    const response = await axios.put(`${BASE_URL}/user-auth/user`, {
      id: userId,
      update: updates,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error editing user:', error);
    throw error;
  }
};

// Function to remove user
export const removeUser = async (userId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/user-auth/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
      data: { id: userId }, // Send user ID in the request body
    });
    return response.data;
  } catch (error) {
    console.error('Error removing user:', error);
    throw error;
  }
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem('userToken');
  // Additional logout logic if needed
};
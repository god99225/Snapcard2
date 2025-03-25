// src/apiService.js
import axios from 'axios';

const API_BASE_URL = 'https://demo3.wms.net.in/api';

// Function to authenticate the user with the Swagger API
export const authenticateUser = async () => {
  try {
    const response = await axios.post(
    'https://cors-anywhere.herokuapp.com/https://demo3.wms.net.in/api/Authentication/Authenticate',
    {
        UserName: 'admin',
        Password: ''
    }
);

    return response.data; // Return the response data if authentication is successful
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw new Error('Authentication failed: ' + (error.response ? error.response.data : error.message));
  }
};

// Function to log in the user
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/odata/Accounts`, {
      email,
      password,
    });
    return response.data; // Return the response data if login is successful
  } catch (error) {
    console.error('Error logging in:', error);
    throw new Error('Login failed: ' + (error.response ? error.response.data : error.message));
  }
};

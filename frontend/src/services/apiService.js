import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Function to handle form submission
export const submitForm = async (data) => {
  try {
    const response = await apiClient.post('/contact/submit', data);
    return response;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Function to check session status
export const checkSessionStatus = async () => {
  try {
    const response = await apiClient.get('/admin/check-session');
    return response.data;
  } catch (error) {
    console.error('Error checking session status:', error);
    throw error;
  }
};

// Interceptor to handle responses and errors globally
apiClient.interceptors.response.use(
  response => {
    // Check for success flag in the response data
    if (response.data && response.data.success === false) {
      console.error('Error from backend:', response.data.message);
      throw new Error(response.data.message);
    }
    return response;
  },
  error => {
    console.log(error);
    if (error.response.status === 401) {
      // Unauthorized
      console.error('Unauthorized access:', error.response.data);
      // You might want to trigger a logout or refresh token here
    } else if (error.response.status === 500) {
      // Internal server error
      console.error('Server error:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export default apiClient;

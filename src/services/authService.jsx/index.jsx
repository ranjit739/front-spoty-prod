import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../../endpoint/apiendpoint";
import axiosInstance from "../../utils";
// export const login = async (data) => {
//   console.log("data", data)
//   try {
//     const res = await axiosInstance.post(API_ENDPOINTS.LOGIN, data);
    
//     return res.data
  
//   } catch (error) {
//     console.log(error);
//   }
// };


// Login Service
export const login = async (data) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, data);
   
    return response.data;
  } catch (error) {
    console.error("Backend Error:", error.response?.data);
  
    throw error.response?.data.error || "An unexpected error occurred"; 
  }
};

// Signup Service
export const signupUser = async (userData) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.SIGNUP, userData);
  
    return response.data;
  } catch (error) { 
    throw error.response?.data.message || error.response?.data.message||error.response?.data.error;
  }
};

 

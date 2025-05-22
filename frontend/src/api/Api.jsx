import axios from "axios";

const API_BASE_URL = "/api";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, {
      email,
      password,
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const errorMsg =
      error.response?.data?.message || "Login failed. Please try again.";

    return {
      success: false,
      message: errorMsg,
    };
  }
};

export const signupUser = async ({ name, email, phone, password }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/signup`, {
      name,
      email,
      phone,
      password,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const errorMsg =
      error.response?.data?.message || "Signup failed. Please try again.";

    return {
      success: false,
      message: errorMsg,
    };
  }
};

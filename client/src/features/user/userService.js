import httpClient from "../../plugins/interceptor";
import { toast } from "react-toastify";
import authService from "../auth/authService";

// Get all users
const getUsers = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await httpClient.get("users", config);
    return response.data;
  } catch (err) {
    let errorMessage = "Something went wrong";
    if (err.response.status === 401) {
      errorMessage = "Unauthorized access, please login again.";
      authService.logout();
    }
    toast.error(errorMessage);
  }
};

// Get single user
const getUser = async (userId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await httpClient.get(userId, config);

    return response.data;
  } catch (err) {
    let errorMessage = "Something went wrong";
    if (err.response.status === 401) {
      errorMessage = "Unauthorized access, please login again.";
      authService.logout();
    }
    toast.error(errorMessage);
  }
};

const userService = {
  getUser,
  getUsers,
};

export default userService;

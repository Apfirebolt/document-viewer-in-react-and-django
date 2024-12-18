import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import documentReducer from "./features/document/documentSlice";
import userReducer from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    document: documentReducer,
    user: userReducer,
  },
});

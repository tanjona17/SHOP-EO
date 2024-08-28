import { User } from "@/app/types/users_type";
import { login_failed, login_start, login_success } from "./user_redux";
import axios from "axios";

export const login = async (dispatch: any, user: User) => {
  dispatch(login_start());
  try {
    const res = await axios.post("http://localhost:1234/api/auth/login", user);
    dispatch(login_success(res.data));
    console.log(res.data);
    localStorage.setItem("token", res.data.access_token);
  } catch (error) {
    dispatch(login_failed());
  }
};

export const TOKEN = localStorage.getItem("token");

import axios from "axios";
import { authActions } from "./Authentication";
import { backendLink } from "../../helper/BackendLink";
import { decodeError } from "../../helper/HelperFunctions";

interface loginDataType {
  phoneNumber: string;
  password: string;
}

export const loginAPI = (loginData: loginDataType) => {
  return async (dispatch: any) => {
    const sendRequest = async () => {
      return await axios.post(`${backendLink}/auth/login`, loginData);
    };

    try {
      const response = await sendRequest();
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user._id);
      return response;
    } catch (err: any) {
      // Validation Check.
      dispatch(authActions.logout());
      let error = decodeError(err);
      throw error;
    }
  };
};

interface registerationDataType {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export const registerAPI = (registerationData: registerationDataType) => {
  return async (dispatch: any) => {
    const sendRequest = async () => {
      return await axios.post(`${backendLink}/auth/register`, registerationData);
    };

    try {
      const response = await sendRequest();
      return response;
    } catch (err: any) {
      if (err.response.status === 422) {
        let error = decodeError(err);
        throw error;
      }

      // Authentication Check.
      if (err.response.status !== 200 && err.response.status !== 201) {
        let error = decodeError(err);
        throw error;
      }
    }
  };
};

export const logout = () => {
  return async (dispatch: any) => {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };
};

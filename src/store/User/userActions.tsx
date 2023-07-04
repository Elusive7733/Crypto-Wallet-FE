import axios from "axios";
import { userActions } from "./User";
import { backendLink } from "../../helper/BackendLink";
import { decodeError } from "../../helper/HelperFunctions";

export const getUserAPI = (token: string) => {
  return async (dispatch: any) => {
    const sendRequest = async () => {
      return await axios.get(`${backendLink}/user/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    };

    try {
      const response = await sendRequest();
      dispatch(userActions.initializeUser(response.data.user));
    } catch (err: any) {
      let error = decodeError(err);
      throw error;
    }
  };
};

export const getAllUsersAPI = (token: string, role: string) => {
  return async (dispatch: any) => {
    const sendRequest = async () => {
      return await axios.get(`${backendLink}/user/getAllUsers`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    };

    try {
      const response = await sendRequest();
      return response.data.users;
    } catch (err: any) {
      let error = decodeError(err);
      throw error;
    }
  };
};

export const getTransactionsAPI = (token: string) => {
  return async (dispatch: any) => {
    const sendRequest = async () => {
      return await axios.get(`${backendLink}/transaction/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    };

    try {
      const response = await sendRequest();
      dispatch(userActions.setTransactions(response.data.transactions));
    } catch (err: any) {
      let error = decodeError(err);
      throw error;
    }
  };
};

import axios from "axios";
import { backendLink } from "../../helper/BackendLink";
import { decodeError } from "../../helper/HelperFunctions";

export const createRoleAPI = (token: string, role: string) => {
  return async (dispatch: any) => {
    const sendRequest = async () => {
      return await axios.post(
        `${backendLink}/role/`,
        {
          role,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    };
    try {
      const response = await sendRequest();
      console.log(response);
    } catch (err: any) {
      let error = decodeError(err);
      throw error;
    }
  };
};

export const updateRoleAPI = (token: string, userId: string, role: string) => {
  return async (dispatch: any) => {
    const sendRequest = async () => {
      return await axios.put(
        `${backendLink}/role/${userId}`,
        {
          role,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    };
    try {
      const response = await sendRequest();
      console.log(response);
    } catch (err: any) {
      let error = decodeError(err);
      throw error;
    }
  };
};

export const deleteRoleAPI = (token: string, role: string) => {
  return async (dispatch: any) => {
    const sendRequest = async () => {
      return await axios.delete(`${backendLink}/role/${role}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    };
    try {
      const response = await sendRequest();
      console.log(response);
    } catch (err: any) {
      let error = decodeError(err);
      throw error;
    }
  };
};

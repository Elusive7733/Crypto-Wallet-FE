import axios from "axios";
import { backendLink } from "../../helper/BackendLink";
import { decodeError } from "../../helper/HelperFunctions";
import { walletActions } from "../Wallet/Wallet";
import { coinActions } from "./Coin";

export const createCoinAPI = (token: string, coinName: string, coinAcroynm: string) => {
  return async (dispatch: any) => {
    const sendRequest = async () => {
      return await axios.post(
        `${backendLink}/coin/`,
        {
          name: coinName,
          acronym: coinAcroynm,
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

export const updateCoinAPI = (token: string, coinName: string, coinAcroynm: string) => {
  return async (dispatch: any) => {
    const sendRequest = async () => {
      return await axios.put(
        `${backendLink}/coin/`,
        {
          name: coinName,
          acronym: coinAcroynm,
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
      dispatch(walletActions.setCoins(response.data.coins));
    } catch (err: any) {
      let error = decodeError(err);
      throw error;
    }
  };
};

export const deleteCoinAPI = (token: string, coin: string) => {
  return async (dispatch: any) => {
    const sendRequest = async () => {
      return await axios.delete(`${backendLink}/coin/${coin}`, {
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

export const getCoinsAPI = (token: string) => {
  return async (dispatch: any) => {
    const sendRequest = async () => {
      return await axios.get(`${backendLink}/coin`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    };
    try {
      const response = await sendRequest();
      let filteredCoins = response.data.coins.filter((coin: any) => coin.acronym !== "PKR");
      return filteredCoins;
    } catch (err: any) {
      let error = decodeError(err);
      throw error;
    }
  };
};

export const updateCoinHistory = () => {
  return async (dispatch: any) => {
    const sendRequest = async () => {
      return await axios.get("https://coinranking1.p.rapidapi.com/coins", {
        headers: {
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
          "X-RapidAPI-Key": "50c5c9cb68mshd05377fc34887f4p18a042jsn99040560abb1",
        },
      });
    };

    try {
      const response = await sendRequest();
      let coins = response.data.data.coins;
      console.log(coins);
      dispatch(coinActions.setCoinHistory(coins));
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  };
};

export const getCoinPriceHistory = (uuid: string, timePeriod: string) => {
  return async (dispatch: any) => {
    const sendRequest = async (uuid: string, timePeriod: string) => {
      return await axios.get(`https://coinranking1.p.rapidapi.com/coin/${uuid}/history`, {
        params: { referenceCurrencyUuid: "yhjMzLPhuIDl", timePeriod },
        headers: {
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
          "X-RapidAPI-Key": "50c5c9cb68mshd05377fc34887f4p18a042jsn99040560abb1",
        },
      });
    };

    try {
      const response = await sendRequest(uuid, timePeriod);
      return response.data.data;
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  };
};

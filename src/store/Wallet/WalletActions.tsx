import axios from "axios";
import { walletActions } from "./Wallet";
import { backendLink } from "../../helper/BackendLink";
import { decodeError } from "../../helper/HelperFunctions";

export const getWalletAPI = (token: string) => {
  return async (dispatch: any) => {
    const sendRequest = async () => {
      return await axios.get(`${backendLink}/wallet/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    };

    try {
      const response = await sendRequest();
      dispatch(walletActions.initializeWallet(response.data.wallet));
    } catch (err: any) {
      let error = decodeError(err);
      throw error;
    }
  };
};

export const getPrice = async (acronym: string) => {
  const sendRequest = async (acronym: string) => {
    return await axios.get(`https://api.coinbase.com/v2/prices/${acronym}-PKR/buy`);
  };

  try {
    const response = await sendRequest(acronym);
    return response.data.data.amount;
  } catch (err: any) {
    console.log(err);
  }
};

export const updateBalance = (coins: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(walletActions.setBalance(0));
      dispatch(walletActions.setCoinPrices([]));
      coins.forEach(async (coin: any, coinIndex: any) => {
        let quantity = Number(coin.quantity);
        let price;
        if (coin.coin.acronym !== "PKR") {
          price = await getPrice(coin.coin.acronym);
          price = price * quantity;
        } else {
          price = quantity;
        }
        price = Number(price.toFixed(2));
        dispatch(walletActions.appendBalance(price));
        dispatch(
          walletActions.appendCoinPrices({
            id: coin.coin.acronym,
            label: coin.coin.name,
            value: price,
          })
        );
      });
    } catch (err: any) {
      console.log(err);
    }
  };
};

export const buyCoinAPI = (token: string, buyCurrency: string, buyAmount: string) => {
  return async (dispatch: any) => {
    const sendRequest = async (quantity: string) => {
      return await axios.put(
        `${backendLink}/wallet/buy`,
        {
          acronym: buyCurrency,
          quantity,
          price: buyAmount,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    };

    try {
      let price = await getPrice(buyCurrency);
      let quantity = parseFloat(buyAmount) / price;
      quantity = parseFloat(quantity.toFixed(6));

      let response = await sendRequest(quantity.toString());

      dispatch(walletActions.setCoins(response.data.wallet.coins));

      console.log(response);
    } catch (err: any) {
      let error = decodeError(err);
      throw error;
    }
  };
};

export const sellCoinAPI = (token: string, sellCurrency: string, sellAmount: string) => {
  return async (dispatch: any) => {
    const sendRequest = async (quantity: string) => {
      return await axios.put(
        `${backendLink}/wallet/sell`,
        {
          acronym: sellCurrency,
          quantity,
          price: sellAmount,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    };

    try {
      let price = await getPrice(sellCurrency);
      let quantity = Number(sellAmount) / price;
      quantity = Number(quantity.toFixed(6));

      let response = await sendRequest(quantity.toString());

      dispatch(walletActions.setCoins(response.data.wallet.coins));

      console.log(response);
    } catch (err: any) {
      let error = decodeError(err);
      throw error;
    }
  };
};

export const sendCoinAPI = (
  token: string,
  currency: string,
  amount: string,
  terminal: string
) => {
  return async (dispatch: any) => {
    const sendRequest = async (quantity: string) => {
      return await axios.put(
        `${backendLink}/wallet/send`,
        {
          acronym: currency,
          quantity,
          type: "send",
          terminal,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    };

    try {
      let quantity;
      if (currency === "PKR") {
        quantity = Number(amount);
      } else {
        let price = await getPrice(currency);
        quantity = Number(amount) / price;
        quantity = Number(quantity.toFixed(6));
      }
      let response = await sendRequest(quantity.toString());
      dispatch(walletActions.setCoins(response.data.wallet.coins));
      console.log(response);
    } catch (err: any) {
      let error = decodeError(err);
      throw error;
    }
  };
};

export const resetWallet = () => {
  return async (dispatch: any) => {
    dispatch(walletActions.resetWallet());
  };
};

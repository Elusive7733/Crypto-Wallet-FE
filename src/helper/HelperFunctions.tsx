export function hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
  return key in obj;
}

export const decodeError = (err: any) => {
  let errorMessage = JSON.stringify(err.response.data);
  errorMessage = errorMessage.split("Error: ")[1];
  errorMessage = errorMessage.split("<br>")[0];
  let error = new Error(errorMessage);
  // error.statusCode? = err.response.status;
  // error.message = errorMessage;
  return error;
};

export const addStrings = (arg0: string, arg1: string) => {
  let total = parseFloat(arg0) + parseFloat(arg1);
  return total.toString();
};

export const subtractStrings = (arg0: string, arg1: string) => {
  let total = parseFloat(arg0) - parseFloat(arg1);
  return total.toString();
};

export const getCoinColors = (walletCoins: any, coinHistory: any) => {
  let colors: any = [];

  walletCoins.forEach((item: any, index: any) => {
    if (item.id === "PKR") {
      colors.push("#013f1b");
    } else if (item.id === "USDT") {
      colors.push("#279978");
    } else {
      let coin = coinHistory.find((coin: any) => coin.symbol === item.id);
      if (coin) {
        colors.push(coin.color);
      } else {
        if (item.id === "BTC") {
          colors.push("#f7931b");
        } else if (item.id === "ETH") {
          colors.push("#3C3C3D");
        } else if (item.id === "ETH2") {
          colors.push("#8e1cde");
        } else if (item.id === "DOGE") {
          colors.push("#b1972e");
        } else if (item.id === "ADA") {
          colors.push("#0034ad");
        } else if (item.id === "SOL") {
          colors.push("#36c8c2");
        } else if (item.id === "USDT") {
          colors.push("#279978");
        } else if (item.id === "LTC") {
          colors.push("#345d9d");
        } else if (item.id === "ATOM") {
          colors.push("#5064fb");
        } else {
          colors.push("#000000");
        }
      }
    }
  });

  return colors;
};

// Ionic Imports
import {
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

// React Imports
import React, { useEffect } from "react";

// Component Imports
import Header from "../../components/Header/Header";
import Button from "../../components/UI/Button/Button";

// Redux Imports
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getCoinsAPI } from "../../store/Coin/CoinActions";
import { buyCoinAPI, sellCoinAPI } from "../../store/Wallet/WalletActions";

// Styles / Icons Imports
import styles from "./Trades.module.css";

const Trades = () => {
  const [buyCurrency, setBuyCurrency] = React.useState<string>();
  const [buyAmount, setBuyAmount] = React.useState<string>();
  const [sellCurrency, setSellCurrency] = React.useState<string>();
  const [sellAmount, setSellAmount] = React.useState<string>();
  const [allCoins, setAllCoins] = React.useState<any>();
  const [balance, setBalance] = React.useState<number>();

  const coinPrices = useAppSelector((state) => state.wallet.prices);

  const dispatch = useAppDispatch();

  let buyOptions;
  let sellOptions;
  let pkr: any;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      return;
    }

    try {
      let response = dispatch(getCoinsAPI(token));
      response.then((res: any) => {
        setAllCoins(res);
      });
      setBalance(pkr?.value);
    } catch (err: any) {
      console.log(err.statusCode);
      console.log(err.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (coinPrices) {
    pkr = coinPrices.find((coin: any) => coin.id === "PKR");
    sellOptions = coinPrices.map((coin: any) => {
      if (coin.id !== "PKR") {
        return (
          <IonSelectOption key={coin.id} value={coin.id}>
            {coin.label}: {coin.value}
          </IonSelectOption>
        );
      }
      return null;
    });
  }

  if (allCoins) {
    buyOptions = allCoins.map((coin: any) => {
      return (
        <IonSelectOption key={coin._id} value={coin.acronym}>
          {coin.name}
        </IonSelectOption>
      );
    });
  }

  const buyFormSubmitHandler = async (e: any) => {
    e.preventDefault();
    try {
      if (!token) {
        return;
      }

      if (buyCurrency) {
        if (buyAmount) {
          dispatch(buyCoinAPI(token, buyCurrency, buyAmount));
          setBalance((prevState: any) => {
            if (prevState - parseFloat(buyAmount) >= 0) {
              return prevState - parseFloat(buyAmount);
            } else {
              return prevState;
            }
          });
        }
      }
    } catch (err: any) {
      console.log(err.statusCode);
      console.log(err.message);
    }
  };

  const sellFormSubmitHandler = (e: any) => {
    e.preventDefault();
    try {
      if (!token) {
        return;
      }

      if (sellCurrency) {
        if (sellAmount) {
          dispatch(sellCoinAPI(token, sellCurrency, sellAmount));
          setBalance((prevState: any) => {
            return prevState + parseFloat(sellAmount);
          });
        }
      }
      // pkr =
    } catch (err: any) {
      console.log(err.statusCode);
      console.log(err.message);
    }
  };

  return (
    <IonPage id="main">
      <IonContent>
        <Header title="Trades" />
        <div className={styles["container"]}>
          <div className={styles["header"]}>
            <h3>
              <em>Buy</em> Crypto
            </h3>
            <p>At the most reasonable price</p>
          </div>

          <div className={styles["balance"]}>
            <p>
              Current Balancec: RS <em>{balance}</em>
            </p>
          </div>

          <form onSubmit={buyFormSubmitHandler}>
            <div className={styles["item"]}>
              <IonItem>
                <IonLabel>Currency</IonLabel>
                <IonSelect
                  value={buyCurrency}
                  placeholder="Select Currency"
                  onIonChange={(e) => setBuyCurrency(e.detail.value)}>
                  {buyOptions}
                </IonSelect>
              </IonItem>
            </div>

            <div className={styles["item"]}>
              <IonItem>
                <IonLabel position="floating">Buy Amount (PKR)</IonLabel>
                <IonInput
                  type="number"
                  value={buyAmount}
                  onIonChange={(e) => setBuyAmount(e.detail.value!)}></IonInput>
              </IonItem>
            </div>

            <div className={styles["footer"]}>
              <Button className="primary" btnClass="small">
                Buy
              </Button>
            </div>
          </form>
          <hr />

          <div className={styles["header"]}>
            <h3>
              <em>Sell</em> Crypto
            </h3>
            <p>At the most profitable price</p>
          </div>

          <form onSubmit={sellFormSubmitHandler}>
            <div className={styles["item"]}>
              <IonItem>
                <IonLabel>Currency</IonLabel>
                <IonSelect
                  value={sellCurrency}
                  placeholder="Select Currency"
                  onIonChange={(e) => setSellCurrency(e.detail.value)}>
                  {sellOptions}
                </IonSelect>
              </IonItem>
            </div>

            <div className={styles["item"]}>
              <IonItem>
                <IonLabel position="floating">Sell Amount (PKR)</IonLabel>
                <IonInput
                  type="number"
                  value={sellAmount}
                  onIonChange={(e) => setSellAmount(e.detail.value!)}></IonInput>
              </IonItem>
            </div>

            <div className={styles["footer"]}>
              <Button className="primary" btnClass="small">
                Sell
              </Button>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Trades;

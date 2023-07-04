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
import React from "react";

// Redux Imports
import { useAppDispatch, useAppSelector } from "../../store/hooks";

// Component Imports
import Header from "../../components/Header/Header";
import Button from "../../components/UI/Button/Button";

// Styles Imports
import styles from "./Transfer.module.css";
import { sendCoinAPI } from "../../store/Wallet/WalletActions";

const Transfer = () => {
  const [walletAddress, setWalletAddress] = React.useState<string>();
  const [quantity, setQuantity] = React.useState<string>();
  const [currency, setCurrency] = React.useState<string>();

  const dispatch = useAppDispatch();
  const coinPrices = useAppSelector((state) => state.wallet.prices);
  const phoneNumber = useAppSelector((state) => state.user.phoneNumber);

  const token = localStorage.getItem("token");
  let options;

  if (coinPrices) {
    options = coinPrices.map((coin: any) => {
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

  const formSubmitHandler = (e: any) => {
    e.preventDefault();
    try {
      if (!token) {
        return;
      }

      if (walletAddress && quantity && currency) {
        if (walletAddress === phoneNumber) {
          console.log("can't send request to yourself");
        } else {
          dispatch(sendCoinAPI(token, currency, quantity, walletAddress));
        }
      }
    } catch (err: any) {
      console.log(err.statusCode);
      console.log(err.message);
    }
  };

  return (
    <IonPage id="main">
      <IonContent>
        <Header title="Transfer" />
        <div className={styles["container"]}>
          <div className={styles["header"]}>
            <h3>
              <em>Transfer</em> Crypto
            </h3>
            <p>Send Coin Quantity from your wallet</p>
          </div>

          <form onSubmit={formSubmitHandler}>
            <div className={styles["item"]}>
              <IonItem>
                <IonLabel position="floating">Wallet Address</IonLabel>
                <IonInput
                  type="text"
                  value={walletAddress}
                  onIonChange={(e) => setWalletAddress(e.detail.value!)}></IonInput>
              </IonItem>
            </div>

            <div className={styles["item"]}>
              <IonItem>
                <IonLabel>Currency</IonLabel>
                <IonSelect
                  value={currency}
                  placeholder="Select Currency"
                  onIonChange={(e) => setCurrency(e.detail.value)}>
                  {options}
                </IonSelect>
              </IonItem>
            </div>

            <div className={styles["item"]}>
              <IonItem>
                <IonLabel position="floating">Send Amount (PKR)</IonLabel>
                <IonInput
                  type="number"
                  value={quantity}
                  onIonChange={(e) => setQuantity(e.detail.value!)}></IonInput>
              </IonItem>
            </div>

            <div className={styles["footer"]}>
              <Button className="primary" btnClass="small">
                Send
              </Button>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Transfer;

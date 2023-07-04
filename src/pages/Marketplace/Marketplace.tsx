// Ionic Imports
import { IonContent, IonPage } from "@ionic/react";

// React Imports
import React, { useEffect, useState } from "react";

// Component Imports
import Coins from "../../components/Coins/Coins";
import Header from "../../components/Header/Header";

// Styles / Icons Imports
import styles from "./Marketplace.module.css";
import { useAppDispatch } from "../../store/hooks";
import { getCoinsAPI } from "../../store/Coin/CoinActions";

const Marketplace = () => {
  const [coins, setCoins] = useState([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      let response = dispatch(getCoinsAPI(token));
      response.then((res: any) => {
        setCoins(res);
      });
    } catch (err: any) {
      console.log(err.statusCode);
      console.log(err.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IonPage id="main">
      <IonContent>
        <Header title="Marketplace" />
        <div className={styles["container"]}>
          <div className={styles["top-box"]}>
            <h3>
              Welcome to the <em>Marketplace</em>
            </h3>
            <p>Check out our latest crypto prices</p>
          </div>
          <div className={styles["coin-list"]}>
            <Coins allCoins={coins} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Marketplace;

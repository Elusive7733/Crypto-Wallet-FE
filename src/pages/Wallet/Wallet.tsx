// Ionic Imports
import {
  IonContent,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

// React Imports
import React, { useEffect } from "react";

// Component Imports
import Coins from "../../components/Coins/Coins";
import Header from "../../components/Header/Header";
import PieChart from "../../components/PieChart/Pie";
import Line from "../../components/LineChart/LineChart";

// Styles Imports
import styles from "./Wallet.module.css";

// Redux Imports
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { updateBalance } from "../../store/Wallet/WalletActions";

// Data Imports
import balanceHistoryWeek from "../../data/balanceHistoryWeek.json";
import balanceHistoryMonth from "../../data/balanceHistoryMonth.json";

const Wallet = () => {
  let walletAddress = useAppSelector((state) => state.wallet.address);
  let walletBalance = useAppSelector((state) => state.wallet.balance);
  let myCoins = useAppSelector((state) => state.wallet.coins);
  let coinPrices = useAppSelector((state) => state.wallet.prices);
  const [chartData, setChartData] = React.useState<any>();
  const [balanceHistoryPeriod, setBalanceHistoryPeriod] = React.useState<string>("24h");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateBalance(myCoins));
  }, [dispatch, myCoins]);

  useEffect(() => {
    let lineChartData = [];
    let labels = [];
    let data = [];

    let selectedData: any = [];

    if (balanceHistoryPeriod === "7d") {
      selectedData = balanceHistoryWeek;
    } else if (balanceHistoryPeriod === "30d") {
      selectedData = balanceHistoryMonth;
    }

    let _tempPrice = 0;
    let _tempTime;

    for (let i = 0; i < selectedData.length; i++) {
      _tempPrice = Number(selectedData[i].price);
      _tempTime = selectedData[i].timestamp;

      data.push(_tempPrice);
      labels.push(_tempTime);
    }

    lineChartData.push({
      labels,
      datasets: [
        {
          label: "Balance",
          data,
          backgroundColor: "#fcd536",
          borderColor: "#fcd536",
        },
      ],
    });

    setChartData(lineChartData);
  }, [balanceHistoryPeriod]);

  return (
    <IonPage id="main">
      <IonContent>
        <Header title="Wallet" />
        <div className={styles["container"]}>
          <div className={styles["top-box"]}>
            <h3>
              Your <em>Wallet</em>
            </h3>
            <p>Your Wallet Address: {walletAddress}</p>
          </div>

          <div className={styles["middle-box"]}>
            <p>
              Balance (RS): <span>{walletBalance?.toFixed(2)}</span>
            </p>
          </div>

          <div className={styles["timePeriod-select"]}>
            <IonItem>
              <IonLabel>Balance</IonLabel>
              <IonSelect
                value={balanceHistoryPeriod}
                placeholder="Select Period"
                onIonChange={(e: any) => setBalanceHistoryPeriod(e.detail.value)}>
                <IonSelectOption value="24h">{"Current"}</IonSelectOption>
                <IonSelectOption value="7d">{"1 Week Old"}</IonSelectOption>
                <IonSelectOption value="30d">{"1 Month Old"}</IonSelectOption>
              </IonSelect>
            </IonItem>
          </div>

          {balanceHistoryPeriod === "24h" ? (
            <div className={styles["pie-chart"]}>
              <PieChart data={coinPrices} />
            </div>
          ) : (
            <div className={styles["chart"]}>
              {chartData && chartData.length > 0 ? <Line data={chartData} /> : <p>No Data</p>}
            </div>
          )}

          <div className={styles["coin-list"]}>
            <Coins allCoins={myCoins} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Wallet;

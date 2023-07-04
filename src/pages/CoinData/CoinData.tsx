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
import { useLocation } from "react-router-dom";

// Redux Imports
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getCoinPriceHistory } from "../../store/Coin/CoinActions";

// Component Imports
import Header from "../../components/Header/Header";

// Styles Imports
import styles from "./CoinData.module.css";
import Line from "../../components/LineChart/LineChart";

const CoinData = () => {
  const [timePeriod, setTimePeriod] = React.useState<string>("24h");
  const [coinPrice, setCoinPrice] = React.useState<string>("");
  const [coinPriceChange, setCoinPriceChange] = React.useState<string>("");
  const [coinPriceHistory, setCoinPriceHistory] = React.useState<any>();
  const [chartData, setChartData] = React.useState<any>();

  const dispatch = useAppDispatch();
  const location = useLocation();

  let exchangeRate = useAppSelector((state) => state.coin.exchangeRate);
  const { state } = location;
  let coinInfo: any;
  const locationState: any = state;
  let coinChangeClass: string = "";

  if (locationState) {
    coinInfo = locationState.coinInfo;
  }

  if (Number(coinPriceChange) > 0) {
    coinChangeClass = "positive";
  } else {
    coinChangeClass = "negative";
  }

  useEffect(() => {
    setCoinPrice((Number(coinInfo.price) * Number(exchangeRate)).toFixed(2));
    setCoinPriceChange(coinInfo.change);
  }, [coinInfo.change, coinInfo.price, exchangeRate]);

  useEffect(() => {
    try {
      let response = dispatch(getCoinPriceHistory(coinInfo.uuid, timePeriod));
      response.then((res: any) => {
        setCoinPriceHistory(res.history);
        setCoinPriceChange(res.change);
      });
    } catch (err: any) {
      console.log(err);
    }
  }, [coinInfo.uuid, dispatch, timePeriod]);

  useEffect(() => {
    let lineChartData = [];
    let labels = [];
    let data = [];

    if (coinPriceHistory) {
      // console.log("coinPriceHistory", coinPriceHistory);
      let _tempPrice = 0;
      let _tempTime;

      for (let i = 0; i < coinPriceHistory.length; i++) {
        _tempPrice = Number(coinPriceHistory[i].price) * Number(exchangeRate);
        _tempTime = new Date(coinPriceHistory[i].timestamp * 1000).toLocaleDateString();

        data.push(_tempPrice);
        labels.push(_tempTime);
      }

      labels.reverse();
      data.reverse();

      lineChartData.push({
        labels,
        datasets: [
          {
            label: coinInfo.name,
            data,
            backgroundColor: coinInfo.color,
            borderColor: coinInfo.color,
          },
        ],
      });
    }

    console.log(lineChartData);

    setChartData(lineChartData);
  }, [coinInfo.color, coinInfo.name, coinPriceHistory, exchangeRate]);

  return (
    <IonPage id="main">
      <IonContent>
        <Header title={coinInfo.name} />
        <div className={styles["container"]}>
          <div className={styles["coin-info"]}>
            <img src={coinInfo.iconUrl} alt={coinInfo.name} />

            <div className={styles["coin-name"]} style={{ color: coinInfo.color }}>
              <h3>{coinInfo.name}</h3>
              <p>{coinInfo.symbol}</p>
            </div>

            <div className={styles["coin-price"]}>
              <h3>{coinPrice}</h3>
              <p className={styles[coinChangeClass]}>{coinPriceChange}</p>
            </div>
          </div>

          <div className={styles["timePeriod-select"]}>
            <IonItem>
              <IonLabel>Time Period</IonLabel>
              <IonSelect
                value={timePeriod}
                placeholder="Select Period"
                onIonChange={(e: any) => setTimePeriod(e.detail.value)}>
                <IonSelectOption value="24h">{"24 Hours"}</IonSelectOption>
                <IonSelectOption value="7d">{"1 Week"}</IonSelectOption>
                <IonSelectOption value="30d">{"1 Month"}</IonSelectOption>
                <IonSelectOption value="1y">{"1 Year"}</IonSelectOption>
              </IonSelect>
            </IonItem>
          </div>

          <div className={styles["chart"]}>
            {chartData && chartData.length > 0 ? <Line data={chartData} /> : <p>No Data</p>}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CoinData;

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Coin.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { coinActions } from "../../../store/Coin/Coin";

interface coinProps {
  name: string | boolean;
  acronym: string;
  quantity?: number;
  coinInfo?: any;
}

const Coin = (props: coinProps) => {
  const [price, setPrice] = useState(0);
  const [displayQuantity, setDisplayQuantity] = useState<any>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let coinImg;

  if (props.coinInfo) {
    coinImg = <img src={props.coinInfo.iconUrl} alt={props.coinInfo.name} />;
  } else {
    coinImg = <img src={`images/${props.acronym}.png`} alt="IMG" />;
  }

  const coinClickHandler = () => {
    if (props.acronym !== "PKR" && props.coinInfo) {
      navigate(`/coin/${props.acronym}`, {
        state: { coinInfo: props.coinInfo },
      });
    }
  };

  useEffect(() => {
    let quantity = 1;

    if (props.quantity) {
      quantity = props.quantity;
    }

    if (props.name && props.acronym !== "PKR") {
      const url = `https://api.coinbase.com/v2/prices/${props.acronym}-PKR/buy`;
      axios.get(url).then((res) => {
        let price = res.data.data.amount;

        if (props.acronym === "USDT") {
          dispatch(coinActions.setExchangeRate(price));
        }

        price = price * quantity;
        price = Number(price.toFixed(2));
        setPrice(price);
        setDisplayQuantity(Number(quantity).toFixed(6));
      });
    } else if (props.name && props.acronym === "PKR") {
      setPrice(quantity);
      setDisplayQuantity(Number(quantity));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles["wrapper"]} onClick={coinClickHandler}>
      <div className={`${styles["item"]} ${styles["coin"]}`}>
        <div className={styles["coin-picture"]}>{coinImg}</div>

        <p className={styles["coin-name"]}>{props.name}</p>
      </div>

      <div className={`${styles["item"]} ${styles["quantity"]}`}>
        <p>{props.quantity && displayQuantity}</p>
      </div>

      <div className={`${styles["item"]} ${styles["price"]}`}>
        <p>{price}</p>
      </div>
    </div>
  );
};

export default Coin;

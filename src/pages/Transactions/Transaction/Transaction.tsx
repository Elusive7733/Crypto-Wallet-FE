// Ionic Imports

// React Imports
import React, { useEffect } from "react";

// Redux Imports

// Component Imports

// Styles / Icons Imports
import styles from "./Transaction.module.css";
import { MdCallReceived, MdOutlineCallMade } from "react-icons/md";

const Transaction = (props: any) => {
  const [displayTerminal, setDisplayTerminal] = React.useState<string>();
  const [transactionType, setTransactionType] = React.useState<any>();

  let coinImage;

  useEffect(() => {
    if (props.terminal === "Market") {
      setDisplayTerminal("Market");
      if (props.type === "send") {
        setTransactionType(
          <div className={`${styles["type-icon"]} ${styles["send"]}`}>
            <MdOutlineCallMade />
          </div>
        );
      } else {
        setTransactionType(
          <div className={`${styles["type-icon"]} ${styles["receive"]}`}>
            <MdCallReceived />
          </div>
        );
      }
    } else {
      if (props.terminal === props.phoneNumber) {
        setDisplayTerminal(props.owner.phoneNumber);
        setTransactionType(
          <div className={`${styles["type-icon"]} ${styles["receive"]}`}>
            <MdCallReceived />
          </div>
        );
      } else {
        setDisplayTerminal(props.terminal);
        setTransactionType(
          <div className={`${styles["type-icon"]} ${styles["send"]}`}>
            <MdOutlineCallMade />
          </div>
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (props.coin.acronym) {
    coinImage = <img src={`images/${props.coin.acronym}.png`} alt="IMG" />;
  } else {
    coinImage = <img src={props.coin.iconUrl} alt="IMG" />;
  }

  return (
    <div className={styles["transaction-wrapper"]}>
      <div className={`${styles["item"]} ${styles["type"]}`}>{transactionType}</div>

      <div className={`${styles["item"]} ${styles["coin"]}`}>
        <div className={styles["coin-picture"]}>{coinImage}</div>
        <p className={styles["coin-name"]}>{props.coin.name}</p>
      </div>

      <div className={`${styles["item"]} ${styles["quantity"]}`}>
        <p>{props.quantity}</p>
      </div>

      <div className={`${styles["item"]} ${styles["terminal"]}`}>
        <p style={{ fontSize: "10px", color: "#838383" }}>{displayTerminal}</p>
      </div>
    </div>
  );
};

export default Transaction;

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
import { useDispatch } from "react-redux";

// Redux Imports

// Component Imports
import Header from "../../components/Header/Header";
import { useAppSelector } from "../../store/hooks";
import { getTransactionsAPI } from "../../store/User/UserActions";
import Transaction from "./Transaction/Transaction";

// Styles / Icons Imports
import styles from "./Transactions.module.css";

const Transactions = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const transactions = useAppSelector((state) => state.user.transactions);
  const phoneNumber = useAppSelector((state) => state.user.phoneNumber);
  const coinHistory = useAppSelector((state) => state.coin.coinHistory);
  const [selectedUser, setSelectedUser] = React.useState<string>("All");

  let allTransactions;
  let _tempCoin;
  let userSelectionOptions;
  let allTerminals: any = [];

  if (transactions) {
    for (let i = 0; i < transactions.length; i++) {
      if (!allTerminals.includes(transactions[i].terminal)) {
        if (transactions[i].owner.phoneNumber === phoneNumber) {
          allTerminals.push(transactions[i].terminal);
        } else {
          allTerminals.push(transactions[i].owner.phoneNumber);
        }
      }
    }
  }

  if (transactions) {
    userSelectionOptions = allTerminals.map((terminal: any) => {
      return (
        <IonSelectOption value={terminal} key={terminal}>
          {terminal}
        </IonSelectOption>
      );
    });

    userSelectionOptions.unshift(
      <IonSelectOption value="All" key="All">
        All
      </IonSelectOption>
    );
  }

  if (transactions) {
    allTransactions = transactions.map((transaction: any) => {
      _tempCoin = coinHistory.find((coin: any) => coin.symbol === transaction.coin.acronym);

      if (selectedUser === "All") {
        if (_tempCoin) {
          return (
            <Transaction
              key={transaction._id}
              owner={transaction.owner}
              coin={_tempCoin}
              quantity={transaction.quantity}
              type={transaction.type}
              terminal={transaction.terminal}
              phoneNumber={phoneNumber}
            />
          );
        } else {
          return (
            <Transaction
              key={transaction._id}
              owner={transaction.owner}
              coin={transaction.coin}
              quantity={transaction.quantity}
              type={transaction.type}
              terminal={transaction.terminal}
              phoneNumber={phoneNumber}
            />
          );
        }
      } else {
        if (
          transaction.terminal === selectedUser ||
          transaction.owner.phoneNumber === selectedUser
        ) {
          if (_tempCoin) {
            return (
              <Transaction
                key={transaction._id}
                owner={transaction.owner}
                coin={_tempCoin}
                quantity={transaction.quantity}
                type={transaction.type}
                terminal={transaction.terminal}
                phoneNumber={phoneNumber}
              />
            );
          } else {
            return (
              <Transaction
                key={transaction._id}
                owner={transaction.owner}
                coin={transaction.coin}
                quantity={transaction.quantity}
                type={transaction.type}
                terminal={transaction.terminal}
                phoneNumber={phoneNumber}
              />
            );
          }
        }
      }
    });
  }

  useEffect(() => {
    if (!token) {
      return;
    }
    dispatch(getTransactionsAPI(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IonPage id="main">
      <IonContent>
        <Header title="Transactions" />
        <div className={styles["container"]}>
          <div className={styles["top-box"]}>
            <h3>
              Your <em>Transactions</em>
            </h3>
            <p>See yout transaction history</p>
          </div>

          <div className={styles["select-user"]}>
            <IonItem>
              <IonLabel>Select User</IonLabel>
              <IonSelect
                value={selectedUser}
                defaultValue="All"
                placeholder="All"
                onIonChange={(e: any) => setSelectedUser(e.detail.value)}>
                {userSelectionOptions}
              </IonSelect>
            </IonItem>
          </div>

          <div className={styles["transactions-list"]}>
            <div className={styles["grid-header"]}>
              <div className={styles["type"]}>
                <p className={styles["transaction-heading"]}>Type</p>
              </div>

              <div className={styles["coin"]}>
                <p className={styles["transaction-heading"]}>Coin</p>
              </div>

              <div className={styles["quantity"]}>
                <p className={styles["transaction-heading"]}>QTY</p>
              </div>

              <div className={styles["terminal"]}>
                <p className={styles["transaction-heading"]}>To / From</p>
              </div>
            </div>

            {allTransactions}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Transactions;

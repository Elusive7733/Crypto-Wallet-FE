// Ionic Imports
import { IonButtons, IonMenuButton, IonMenuToggle } from "@ionic/react";

// React Imports
import React from "react";

// Styles / Icons Imports
import styles from "./Header.module.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

interface Props {
  title: string;
}

const hamburgerOptions = [
  "Marketplace",
  "Trades",
  "Transactions",
  "Transfer",
  "Wallet",
  "Settings",
  "Admin",
];

const Header: React.FC<Props> = (props) => {
  let backButton;
  if (hamburgerOptions.includes(props.title)) {
    backButton = (
      <IonButtons>
        <IonMenuToggle hidden={false} autoHide={false}>
          <IonMenuButton hidden={false} autoHide={false} />
        </IonMenuToggle>
      </IonButtons>
    );
  } else {
    backButton = (
      <div className={styles["backButton"]}>
        <Link to="/">
          <IoMdArrowRoundBack />
        </Link>
      </div>
    );
  }

  return (
    <div className={styles["container"]}>
      {backButton}
      <p>{props.title}</p>
    </div>
  );
};

export default Header;

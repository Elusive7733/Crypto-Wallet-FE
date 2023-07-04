import React, { Fragment, useEffect, useState } from "react";
import { IonMenu, IonContent } from "@ionic/react";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import styles from "./Menu.module.css";
import Anchor from "../Anchor/Anchor";

//Icons
import { SiBitcoincash } from "react-icons/si";
import { IoIosWallet } from "react-icons/io";
import { AiOutlineTransaction, AiTwotoneSetting } from "react-icons/ai";
import { MdAdminPanelSettings } from "react-icons/md";
import { GiTrade, GiBuyCard } from "react-icons/gi";
import { BiTransfer } from "react-icons/bi";
import Button from "../Button/Button";
import { logout } from "../../../store/Authentication/AuthenticationActions";
import { useNavigate } from "react-router-dom";

import { resetWallet } from "../../../store/Wallet/WalletActions";

const Menu: React.FC = () => {
  const [disabled, setDisabled] = useState(false);
  const [displayAdmin, setDisplayAdmin] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let name = useAppSelector((state) => state.user.name);
  let walletBalance = useAppSelector((state) => state.wallet.balance);
  let role = useAppSelector((state) => state.user.role);

  useEffect(() => {
    if (role === "admin") {
      setDisplayAdmin(true);
    }
  }, [role]);

  const logoutHandler = () => {
    setDisabled(true);
    setTimeout(() => setDisabled(false), 100);
    dispatch(logout());
    dispatch(resetWallet());
    navigate("/");
  };

  return (
    <Fragment>
      <IonMenu side="start" menuId="first" contentId="main" disabled={disabled}>
        <IonContent>
          <div className={styles["header"]}>
            <div className={styles["pic"]}>
              <img src="images/Atom.png" alt="" />
            </div>
            <div className={styles["info"]}>
              <h3>{name}</h3>
              <div>
                <Fragment>
                  {" "}
                  <p>PKR: {walletBalance?.toFixed(2)}</p> <SiBitcoincash />
                </Fragment>
              </div>
            </div>
          </div>

          <div className={styles["content"]}>
            <div
              onClick={() => {
                setDisabled(true);
                setTimeout(() => setDisabled(false), 100);
              }}
              className={styles["item"]}>
              <Anchor path="/">My Wallet</Anchor>
              <IoIosWallet />
            </div>
            <div
              onClick={() => {
                setDisabled(true);
                setTimeout(() => setDisabled(false), 100);
              }}
              className={styles["item"]}>
              <Anchor path="/transactions">My Transactions</Anchor>
              <AiOutlineTransaction />
            </div>
            <div
              onClick={() => {
                setDisabled(true);
                setTimeout(() => setDisabled(false), 100);
              }}
              className={styles["item"]}>
              <Anchor
                onClick={() => {
                  setDisabled(true);
                  setTimeout(() => setDisabled(false), 100);
                }}
                path="/marketplace">
                Marketplace
              </Anchor>
              <GiTrade />
            </div>
            <div
              onClick={() => {
                setDisabled(true);
                setTimeout(() => setDisabled(false), 100);
              }}
              className={styles["item"]}>
              <Anchor path="/trades">Buy and Sell Crypto</Anchor>
              <GiBuyCard />
            </div>
            <div
              onClick={() => {
                setDisabled(true);
                setTimeout(() => setDisabled(false), 100);
              }}
              className={styles["item"]}>
              <Anchor path="/transfer">Transfer Crypto</Anchor>
              <BiTransfer />
            </div>

            <div
              onClick={() => {
                setDisabled(true);
                setTimeout(() => setDisabled(false), 100);
              }}
              className={styles["item"]}>
              <Anchor path="/usersetting">Settings</Anchor>
              <AiTwotoneSetting />
            </div>
          </div>

          {displayAdmin && (
            <div
              onClick={() => {
                setDisabled(true);
                setTimeout(() => setDisabled(false), 100);
              }}
              className={styles["item"]}>
              <Anchor path="/admin">Admin</Anchor>
              <MdAdminPanelSettings />
            </div>
          )}

          <div className={styles["footer"]}>
            <div className={styles["footerContainer"]}>
              <Button className="delete" onClick={logoutHandler}>
                <p>Logout</p>
              </Button>
            </div>
          </div>
        </IonContent>
      </IonMenu>
    </Fragment>
  );
};

export default Menu;

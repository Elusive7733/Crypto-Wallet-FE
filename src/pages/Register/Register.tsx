// Ionic Imports
import { IonContent, IonInput, IonItem, IonLabel, IonPage, useIonAlert } from "@ionic/react";

// React Imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Component Imports
import Header from "../../components/Header/Header";
import Button from "../../components/UI/Button/Button";

// Styles / Icons Imports
import styles from "./Register.module.css";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigate = useNavigate();
  const [present] = useIonAlert();

  const setPresent = (errorHeader: any, errorBody: any, buttons: any) => {
    present({
      cssClass: "my-css",
      header: errorHeader,
      message: errorBody,
      buttons: [...buttons],
      // onDidDismiss: (e) => console.log("did dismiss"),
    });
  };

  const formSubmitHandler = async (e: any) => {
    e.preventDefault();

    if (password === "" || confirmPassword === "") {
      setPresent("Error", "Password can not be empty", ["OK"]);
      return;
    }

    if (password !== confirmPassword) {
      setPresent("Error", "Passwords do not match", ["OK"]);
      return;
    }

    let tempPhoneNumber = phoneNumber;
    //Removing Spaces and Whitespaces from Number
    tempPhoneNumber = tempPhoneNumber.trim();
    tempPhoneNumber = tempPhoneNumber.replace(/\s/g, "");

    //Removing + from the phone number
    if (tempPhoneNumber.charAt(0) === "+") {
      tempPhoneNumber = tempPhoneNumber.substring(1, tempPhoneNumber.length);
    }

    //Phone Number Validation and Adding Country Code
    if (tempPhoneNumber.length < 11 || tempPhoneNumber.length > 12) {
      setPresent("Error", "Invalid Phone Number", ["OK"]);
      return;
    }
    //Number length can only be 11 only if it starts with 0
    else if (tempPhoneNumber.length === 11 && tempPhoneNumber.charAt(0) !== "0") {
      setPresent("Error", "Invalid Phone Number", ["OK"]);
      return;
    } else {
      if (tempPhoneNumber[0] === "0") {
        //Removing 0 from the number
        tempPhoneNumber = tempPhoneNumber.substring(1, tempPhoneNumber.length);
        tempPhoneNumber = "+92" + tempPhoneNumber;
      } else {
        tempPhoneNumber = "+" + tempPhoneNumber;
      }

      navigate("/otp", {
        state: { phoneNumber: tempPhoneNumber, name, email, password, confirmPassword },
      });
    }
  };

  return (
    <IonPage id="main">
      <IonContent>
        <Header title="Register" />
        <div className={styles["container"]}>
          <div className={styles["image"]}>
            <img src={`images/Wallet3.png`} alt="IMG" />
          </div>
          <h3>Create Account</h3>
          <p>
            <em>Register</em> now to start using Pak Wallet
          </p>

          <form onSubmit={formSubmitHandler}>
            <div className={styles["item"]}>
              <IonItem>
                <IonLabel position="floating">Full Name</IonLabel>
                <IonInput
                  type="text"
                  value={name}
                  onIonChange={(e) => setName(e.detail.value!)}></IonInput>
              </IonItem>
            </div>

            <div className={styles["item"]}>
              <IonItem>
                <IonLabel position="floating">Phone Number</IonLabel>
                <IonInput
                  type="number"
                  value={phoneNumber}
                  onIonChange={(e) => setPhoneNumber(e.detail.value!)}></IonInput>
              </IonItem>
            </div>

            <div className={styles["item"]}>
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  type="email"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}></IonInput>
              </IonItem>
            </div>

            <div className={styles["item"]}>
              <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}></IonInput>
              </IonItem>
            </div>

            <div className={styles["item"]}>
              <IonItem>
                <IonLabel position="floating">Confirm Password</IonLabel>
                <IonInput
                  type="password"
                  value={confirmPassword}
                  onIonChange={(e) => setConfirmPassword(e.detail.value!)}></IonInput>
              </IonItem>
            </div>

            <div className={styles["footer"]}>
              <Button className="primary" btnClass="small">
                Register
              </Button>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;

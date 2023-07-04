// React Imports
import React, { Fragment, useEffect, useState } from "react";

// Ionic Imports
import { useNavigate, useLocation } from "react-router-dom";
import { useIonAlert } from "@ionic/react";

// Component Imports
import Header from "../../components/Header/Header";
import styles from "./OTP.module.css";
import Button from "../../components/UI/Button/Button";

// Redux Imports
import { registerAPI } from "../../store/Authentication/AuthenticationActions";
import { useAppDispatch } from "../../store/hooks";

// Firebase Imports
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const OTP = () => {
  const [firstDigit, setFirstDigit] = useState("");
  const [secondDigit, setSecondDigit] = useState("");
  const [thirdDigit, setThirdDigit] = useState("");
  const [fourthDigit, setFourthDigit] = useState("");
  const [fifthDigit, setFifthDigit] = useState("");
  const [sixthDigit, setSixthDigit] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [present] = useIonAlert();
  const dispatch = useAppDispatch();

  //Conformation Object Passed back by Firebase after OTP is sent Sucessfully
  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  //This is messing up (not sure how to make this global throughout the component)
  let recaptchaVerifier: any;

  const { state } = location;
  const locationState: any = state;
  let phoneNumber: any, name: any, email: any, password: any, confirmPassword: any;

  if (locationState) {
    phoneNumber = locationState.phoneNumber;
    name = locationState.name;
    email = locationState.email;
    password = locationState.password;
    confirmPassword = locationState.confirmPassword;
  }

  // Firebase Requires This function to be called in order to verify if the user is human
  const configureCaptcha = () => {
    const auth = getAuth();

    //Please Make recaptchaVerifier global here
    recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onRegister();
          console.log("reCAPTCHA solved, allow signInWithPhoneNumber.");
        },
        defaultCountry: "PK",
      },
      auth
    );
  };

  const onRegister = () => {
    // e.preventDefault();
    configureCaptcha();

    // Testing Console Logs (remove if wish)
    // console.log("onRegister");
    // console.log("Phone Number: ", phoneNumber);

    const appVerifier = recaptchaVerifier;
    const auth = getAuth();
    if (phoneNumber) {
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((_confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          setConfirmationResult(_confirmationResult);
        })
        .catch((error) => {
          // Error
          console.log(error);
        });
    }
  };

  const setPresent = (errorHeader: any, errorBody: any, buttons: any) => {
    present({
      cssClass: "my-css",
      header: errorHeader,
      message: errorBody,
      buttons: [...buttons],
      // onDidDismiss: (e) => console.log("did dismiss"),
    });
  };

  useEffect(() => {
    onRegister();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyOTP = (e: any) => {
    e.preventDefault();

    //OTP Validation
    if (
      firstDigit === "" ||
      secondDigit === "" ||
      thirdDigit === "" ||
      fourthDigit === "" ||
      fifthDigit === "" ||
      sixthDigit === ""
    ) {
      setPresent("Error", "Please Enter All Digits", ["OK"]);
      return;
    }

    //OTP Formating
    let OTP = firstDigit + secondDigit + thirdDigit + fourthDigit + fifthDigit + sixthDigit;

    confirmationResult
      .confirm(OTP)
      .then((result: any) => {
        phoneNumber = phoneNumber.substring(3);
        phoneNumber = "0" + phoneNumber;
        dispatch(
          registerAPI({
            name,
            phoneNumber,
            email,
            password,
            confirmPassword,
            role: "admin",
          })
        );

        console.log("User Registered Sucessfully");
        navigate("/login");
      })
      .catch((error: any) => {
        // User couldn't sign in (bad verification code?)
        console.log("Couldn't sign in", error);
      });
  };

  const onChangeHandler = (e: any) => {
    if (e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  return (
    <Fragment>
      <Header title="Register" />
      <div id="sign-in-button"></div>
      <div className={styles["container"]}>
        <div className={styles["image"]}>
          <img src={`images/OTP.png`} alt="IMG" />
        </div>

        <h3>OTP</h3>
        <p>
          One time password sent at this number <em>{phoneNumber}</em>
        </p>

        <div className={styles["userInput"]}>
          <input
            className={styles["OTPInput"]}
            type="number"
            id="1"
            value={firstDigit}
            onChange={onChangeHandler}
            onInput={(e) => {
              let digit = (e.target as HTMLInputElement).value[0];
              setFirstDigit(digit);
            }}
          />
          <input
            className={styles["OTPInput"]}
            type="number"
            id="2"
            onChange={onChangeHandler}
            value={secondDigit}
            onInput={(e) => {
              let digit = (e.target as HTMLInputElement).value[0];
              setSecondDigit(digit);
            }}
          />
          <input
            className={styles["OTPInput"]}
            type="number"
            id="3"
            onChange={onChangeHandler}
            value={thirdDigit}
            onInput={(e) => {
              let digit = (e.target as HTMLInputElement).value[0];
              setThirdDigit(digit);
            }}
          />
          <input
            className={styles["OTPInput"]}
            type="number"
            id="4"
            onChange={onChangeHandler}
            value={fourthDigit}
            onInput={(e) => {
              let digit = (e.target as HTMLInputElement).value[0];
              setFourthDigit(digit);
            }}
          />
          <input
            className={styles["OTPInput"]}
            type="number"
            id="5"
            onChange={onChangeHandler}
            value={fifthDigit}
            onInput={(e) => {
              let digit = (e.target as HTMLInputElement).value[0];
              setFifthDigit(digit);
            }}
          />
          <input
            className={styles["OTPInput"]}
            type="number"
            id="6"
            onChange={onChangeHandler}
            value={sixthDigit}
            onInput={(e) => {
              let digit = (e.target as HTMLInputElement).value[0];
              setSixthDigit(digit);
            }}
          />
        </div>
        <div className={styles["submit"]}>
          <Button className="primary" btnClass="small" onClick={verifyOTP}>
            Verify
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default OTP;

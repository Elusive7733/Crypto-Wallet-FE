// React Imports
import React, { useEffect } from "react";

// Ionic Imports
import { IonContent, IonInput, IonItem, IonLabel, IonPage } from "@ionic/react";

// Component Imports
import Header from "../../components/Header/Header";
import Button from "../../components/UI/Button/Button";

// Styles Imports
import styles from "./UserSetting.module.css";
import { useAppSelector } from "../../store/hooks";

const UserSetting = () => {
  const [newName, setNewName] = React.useState<string>();
  const [newEmail, setNewEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [confirmPassword, setConfirmPassword] = React.useState<string>();
  const [profilePicture, setProfilePicture] = React.useState<File>();

  let name = useAppSelector((state) => state.user.name);
  let phoneNumber = useAppSelector((state) => state.user.phoneNumber);
  let email = useAppSelector((state) => state.user.email);

  useEffect(() => {
    if (name) {
      setNewName(name);
    }
    if (email) {
      setNewEmail(email);
    }
  }, [email, name, phoneNumber]);

  const formSubmitHandler = (e: any) => {
    e.preventDefault();
    console.log(profilePicture);

    if (profilePicture) {
      if (profilePicture.type !== "image/jpeg" && profilePicture.type !== "image/png") {
        console.log("Invalid file type");
        return;
      }
    }

    console.log(newName, newEmail, password, confirmPassword, profilePicture);
  };

  return (
    <IonPage id="main">
      <IonContent>
        <Header title="Settings" />
        <div className={styles["container"]}>
          <div className={styles["header"]}>
            <h3>
              Account <em>Settings</em>
            </h3>
            <p>Change account information</p>
          </div>

          <form onSubmit={formSubmitHandler}>
            <div className={styles["item"]}>
              <IonItem>
                <IonLabel position="floating">Full Name</IonLabel>
                <IonInput
                  type="text"
                  value={newName}
                  onIonChange={(e) => setNewName(e.detail.value!)}></IonInput>
              </IonItem>
            </div>

            <div className={styles["item"]}>
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  type="email"
                  value={newEmail}
                  onIonChange={(e) => setNewEmail(e.detail.value!)}></IonInput>
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

            <div className={styles["item"]}>
              <input
                className={styles["file-input"]}
                type="file"
                onChange={(e: any) => {
                  setProfilePicture(e.target.files[0]);
                }}></input>
            </div>

            <div className={styles["footer"]}>
              <Button className="primary" btnClass="small">
                Change information
              </Button>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UserSetting;

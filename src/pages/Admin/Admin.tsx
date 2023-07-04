// Ionic Imports
import {
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

// React Imports
import React, { useEffect } from "react";

// Component Imports
import Header from "../../components/Header/Header";
import Button from "../../components/UI/Button/Button";

// Redux Imports
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllUsersAPI } from "../../store/User/UserActions";
import { createRoleAPI, deleteRoleAPI, updateRoleAPI } from "../../store/Role/RoleActions";
import { createCoinAPI } from "../../store/Coin/CoinActions";

// Styles / Icons Imports
import styles from "./Admin.module.css";

// Helper Imports
import { hasKey } from "../../helper/HelperFunctions";

const Admin = () => {
  const [role, setRole] = React.useState<string>();
  const [roleAction, setRoleAction] = React.useState<string>();
  const [coinName, setCoinName] = React.useState<string>();
  const [coinAcroynm, setCoinAcroynm] = React.useState<string>();
  const [users, setUsers] = React.useState<any>();
  const [userId, setUserId] = React.useState<string>();

  const dispatch = useAppDispatch();
  const currentRole = useAppSelector((state) => state.user.role);

  let userOptions;

  if (users) {
    userOptions = Object.keys(users).map((key, index) => {
      if (hasKey(users, key)) {
        return (
          <IonSelectOption key={index} value={users[key]._id}>
            {users[key].name}
          </IonSelectOption>
        );
      } else {
        return null;
      }
    });
  }

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      if (currentRole !== "admin") {
        return;
      }

      const response = dispatch(getAllUsersAPI(token, currentRole));
      response.then((res) => {
        setUsers(res);
      });
    } catch (err: any) {
      console.log(err.statusCode);
      console.log(err.message);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const roleFormSubmitHandler = (e: any) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      if (role) {
        if (roleAction === "create") {
          dispatch(createRoleAPI(token, role));
        } else if (roleAction === "delete") {
          dispatch(deleteRoleAPI(token, role));
        } else {
          if (userId) {
            if (roleAction === "update") {
              dispatch(updateRoleAPI(token, userId, role));
            }
          }
        }
      }
    } catch (err: any) {
      console.log(err.statusCode);
      console.log(err.message);
    }
  };

  const coinFormSubmitHander = (e: any) => {
    e.preventDefault();
    // console.log(coinName, coinAcroynm);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      if (coinName && coinAcroynm) {
        dispatch(createCoinAPI(token, coinName, coinAcroynm));
      }
    } catch (err: any) {
      console.log(err.statusCode);
      console.log(err.message);
    }
  };

  return (
    <IonPage id="main">
      <IonContent>
        <Header title="Admin" />

        <div className={styles["container"]}>
          <div className={styles["header"]}>
            <h3>
              Manage <em>Roles</em>
            </h3>
          </div>

          <IonSegment onIonChange={(e) => setRoleAction(e.detail.value)}>
            <IonSegmentButton value="create">
              <IonLabel>Create</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="delete">
              <IonLabel>Delete</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="update">
              <IonLabel>Update</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          <form onSubmit={roleFormSubmitHandler}>
            {roleAction === "update" && (
              <IonItem>
                <IonLabel>User</IonLabel>
                <IonSelect
                  value={userId}
                  placeholder="Select User"
                  onIonChange={(e) => setUserId(e.detail.value)}>
                  {userOptions}
                </IonSelect>
              </IonItem>
            )}
            <div className={styles["item"]}>
              <IonItem>
                <IonLabel position="floating">Role Name</IonLabel>
                <IonInput
                  type="text"
                  value={role}
                  onIonChange={(e) => setRole(e.detail.value!)}></IonInput>
              </IonItem>
            </div>

            <div className={styles["footer"]}>
              <Button className="primary" btnClass="small">
                {roleAction || "Select"}
              </Button>
            </div>
          </form>
          <hr />

          <div className={styles["header"]}>
            <h3>
              Create <em>Coin</em>
            </h3>
          </div>

          <form onSubmit={coinFormSubmitHander}>
            <div className={styles["item"]}>
              <IonItem>
                <IonLabel position="floating">Coin Name</IonLabel>
                <IonInput
                  type="text"
                  value={coinName}
                  onIonChange={(e) => setCoinName(e.detail.value!)}></IonInput>
              </IonItem>
            </div>

            <div className={styles["item"]}>
              <IonItem>
                <IonLabel position="floating">Coin Acronym</IonLabel>
                <IonInput
                  type="text"
                  value={coinAcroynm}
                  onIonChange={(e) => setCoinAcroynm(e.detail.value!)}></IonInput>
              </IonItem>
            </div>

            <div className={styles["footer"]}>
              <Button className="primary" btnClass="small">
                Create Coin
              </Button>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default Admin;

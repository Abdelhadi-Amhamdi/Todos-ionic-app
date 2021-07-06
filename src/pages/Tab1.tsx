import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonImg,
  IonPage,
} from "@ionic/react";
import "./Tab1.css";
import { calendarOutline } from "ionicons/icons";
const Tab1: React.FC = () => {
  let date;
  const d = new Date();

  if (d.getHours() < 12) {
    date = "good morning";
  } else if (d.getHours() > 12 && d.getHours() < 19) {
    date = "good afternoon";
  } else {
    date = "good night";
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonImg
          src="./img/249dbcf499b9e3d1cb39b26e4bef1c1d.png"
          className="tab1img"
        ></IonImg>
        <h1>{date}</h1>
        <h4>{d.toDateString()}</h4>

        <IonCard className="my-card">
          <IonCardHeader>
            <IonIcon className="card-icon" icon={calendarOutline}></IonIcon>
          </IonCardHeader>
          <IonCardContent className="content">
            <IonCardTitle className="title">Organise Your Time</IonCardTitle>
            Start orginising your time and get better results.
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

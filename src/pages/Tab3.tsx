import React , {useRef ,useState} from 'react';
import { IonButton, 
          IonCard, 
          IonCardContent, 
          IonCol, 
          IonContent, 
          IonGrid, 
          IonHeader, 
          IonIcon, 
          IonInput, 
          IonItem, 
          IonLabel, 
          IonPage, 
          IonRow, 
          IonTitle, 
          IonToolbar ,
        } from '@ionic/react';
import './Tab3.css';
import {notificationsOutline , closeOutline} from 'ionicons/icons'
const Tab3: React.FC = () => {


  let stopAlarem = false ;

  // hooks

  const alarmInput = useRef<HTMLIonInputElement>(null)
  const audioSong = useRef<HTMLAudioElement>(null)
  const [ringing , setSong] = useState(false)
  const [Alarems , setAlarems] = useState(['1'])

  
  
  const addnewAlarem = () => {
    const t = [];
    t.push('1')
    setAlarems(Alarems.concat(t));
  }
  const deleteAlarem = (e: React.FormEvent) => {
      const Alaremcard = e.currentTarget.parentElement?.parentElement?.parentElement?.parentElement
      Alaremcard?.remove();
  }

  const StartAlarm = () => {

    var time = alarmInput.current!.value;

    if(time === '') {
      alert('stop')
    }else{

      stopAlarem = false
      
      
      const interval = setInterval(()=> {
        
        // check function
          var time = alarmInput.current!.value;
          var timenow = new Date();
          var houre = timenow.getHours();
          var minutes = timenow.getMinutes();
          var currentTime = houre + ':' + minutes;
          if(time === currentTime){
            setSong(true);
            audioSong.current?.play();
            clearInterval(interval)
          }else if(stopAlarem === true){
            clearInterval(interval)
          }
          else{
            console.log('runing')
          }
      } , 1000);
      
    }
   
  }


  const StopAlarem = () => {
    stopAlarem = true
  }

  const StopSong = () => {
    audioSong.current?.pause();
    setSong(false)
  }
  return (
    <IonPage>
      {/* header */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>Alarm</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* audio && ringing */}
      <audio ref={audioSong} src="/img/a_6.mp3"></audio>
      <IonContent fullscreen>
        <IonGrid>
          {
            ringing &&
            <IonRow className="Ringing">
              <IonCol>
                <IonCard className="card">
                  <IonCardContent>
                    <IonIcon id="iconR" icon={notificationsOutline}></IonIcon>
                    <h1>
                    Its : {alarmInput.current?.value} Now
                    </h1>
                    <IonButton id="stb" onClick={StopSong}>
                      <IonIcon icon={closeOutline}></IonIcon>
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          }

          {/* add new */}
          <IonRow>
            <IonCol>
              <IonButton expand="block" onClick={addnewAlarem}>Add New Alarm</IonButton>
            </IonCol>
          </IonRow>

          {/* alarems */}
          {
            Alarems.map((i , index) => {
              return(
                  <IonRow key={index}>
                    <IonCol>
                      <IonCard id="alarcard">
                        <IonCardContent>
                            <IonItem>
                              <IonLabel position="fixed">Set Time</IonLabel>
                              <IonInput type="time" ref={alarmInput}></IonInput>
                            </IonItem>
                            <div className="buttons">
                              <IonButton className="btn" onClick={StartAlarm} color="medium">Start</IonButton>
                              <IonButton className="btn" color="medium" onClick={StopAlarem}>Stop</IonButton>
                              <IonButton className="btn" color="medium" onClick={deleteAlarem}>Delete</IonButton>
                            </div>
                        </IonCardContent>
                      </IonCard>
                    </IonCol>
                  </IonRow>
              )
            })
          }
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;

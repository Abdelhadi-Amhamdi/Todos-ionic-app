import React , { useEffect, useRef ,useState} from 'react';
import { 
  IonAlert,
  IonButton, 
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

import './Tab2.css';
import {  trashBin , create} from 'ionicons/icons';
const Tab2: React.FC = () => {

  

  // hooks
  const todoInput = useRef<HTMLIonInputElement>(null)
  const editInput = useRef<HTMLIonInputElement>(null)
  const [todos , setTodos] = useState<Array<String>>([]);
  const [edit , setEdit] = useState(false);
  const [item , setnewItem] = useState(String);
  const [showAlert , setShowAlert] = useState(false)
  
  useEffect(() => {
    getTodosStorage();
  }, [])

  
  
  
  // functions


// add new todo item and save it in the storgae
const AddTodo = (e: React.FormEvent) => {
    e.preventDefault()
    const inputText = todoInput.current?.value;
    if(!inputText){
      setShowAlert(true)
    }else{
      const t: Array<String> = [];
      t.unshift(inputText.toString())
      setTodos(t.concat(todos))

      // add it to the storage
      let items;
        if(localStorage.getItem('items') === null){
          items = []
        }else{
          items = JSON.parse(localStorage.getItem('items')!)
        }
        items.unshift(inputText)
        localStorage.setItem('items' , JSON.stringify(items))
    }
}

// get the todos items from the local storage
function getTodosStorage() {
  if(localStorage.getItem('items') === null){
    const items : Array<String> = []
    console.log(items)
  }else {
    const items = JSON.parse(localStorage.getItem('items')!)
    setTodos(items)
  }
  
}

// delete todo item
function delteItem(e : React.FormEvent){
  const content = e.currentTarget.parentElement?.children[0].textContent;
  const todotext = content!;
  const index = todos.indexOf(todotext)
  todos.splice(index ,1)
  const t: Array<String> = [];
  setTodos(t.concat(todos))

  // delete todo item from local storage too
  const items = JSON.parse(localStorage.getItem('items')!);
  items.splice(index , 1)
  localStorage.setItem('items' , JSON.stringify(items))
}


// show section edit 
const editItem = (e : React.FormEvent) => {
  setEdit(true)
  const item = e.currentTarget.parentElement?.children[0].textContent;
  setnewItem(item!.toString());
} 

// edit the selected todo

const GetEditContent = () => {
  const newText = editInput.current?.value;
  const items = JSON.parse(localStorage.getItem('items')!)
  const index = todos.indexOf(item);
  todos[index] = newText!.toString();
  items[index] = newText!.toString();
  localStorage.setItem('items' , JSON.stringify(items));
  setEdit(false)
}


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>To Do</IonTitle>
        </IonToolbar>
      </IonHeader>
      {
        edit &&
        <form className="form-group" id="editSection">
          <IonItem>
            <IonLabel position="floating">Input Edit</IonLabel>
            <IonInput className="form-control" ref={editInput}></IonInput>
          </IonItem>
          <IonButton onClick={GetEditContent}>Edit</IonButton>
          <IonButton onClick={() => {setEdit(false)}}>close</IonButton>
        </form>
      }
      <IonContent padding-start="">
        <IonAlert 
        isOpen={showAlert}
        cssClass='alert-wrapper'
        header={'INPUT ALERT'}
        onDidDismiss={() => setShowAlert(false)}
        message={'Add somthng in add todo input first'}
        buttons={[{
          text: 'OK',
          cssClass: 'primary',
          }]}
        />

        
        <IonGrid>
          <IonRow>
            <IonCol>
              <form onSubmit={AddTodo}>
                <IonItem>
                  <IonLabel position="floating">Add todos Input</IonLabel>
                  <IonInput ref={todoInput} value=""></IonInput>
                </IonItem>
                <IonButton color="primary" expand="block" onClick={AddTodo}>
                Add</IonButton>
              </form>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
            </IonCol>
          </IonRow>
          <IonRow>
            {
                todos.map((todo , i)=> {
                  return(
                    <IonCol size="12" key={i} >
                        <IonCard className="cards">
                          <IonCardContent className="content-card">
                            {todo}
                      </IonCardContent>
                      <IonButton color="danger" type="button" onClick={delteItem}>
                        <IonIcon slot="icon-only" icon={trashBin}></IonIcon>
                        </IonButton>
                      <IonButton color="primary" type="button" onClick={editItem}>
                        <IonIcon slot="icon-only" icon={create}></IonIcon>
                        </IonButton>
                    </IonCard>
                </IonCol>
                  )
                })
            }
          </IonRow>
        </IonGrid>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;

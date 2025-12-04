import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonTextarea, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useRepos } from '../context/RepoContext';
import './Tab1.css';

const Tab2: React.FC = () => {
  const { addRepo } = useRepos();
  const history = useHistory();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('');
  const [owner, setOwner] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!name.trim()) return;
    addRepo({ name: name.trim(), description: description.trim(), language: language.trim(), owner: owner.trim() || 'unknown' });
    history.push('/tab1');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crear Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <form onSubmit={handleSubmit}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked">Nombre</IonLabel>
              <IonInput value={name} onIonChange={e => setName(String(e.detail.value || ''))} required />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Descripción</IonLabel>
              <IonTextarea value={description} onIonChange={e => setDescription(String(e.detail.value || ''))} />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Lenguaje</IonLabel>
              <IonInput value={language} onIonChange={e => setLanguage(String(e.detail.value || ''))} />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Owner</IonLabel>
              <IonInput value={owner} onIonChange={e => setOwner(String(e.detail.value || ''))} />
            </IonItem>
            <IonItem>
              <IonButton expand="block" type="submit">Crear</IonButton>
            </IonItem>
          </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
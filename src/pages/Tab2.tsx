import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonLoading } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useRepos } from '../context/RepoContext';

const Tab2: React.FC = () => {
  const { addRepo, loading } = useRepos();
  const history = useHistory();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!name.trim()) return;
    
    try {
      await addRepo({ 
        name: name.trim(), 
        description: description.trim() 
      });
      setName('');
      setDescription('');
      history.push('/tab1');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crear Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonLoading isOpen={loading} message={"Creando repositorio..."} />
        <form onSubmit={handleSubmit}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked">Nombre del Repositorio</IonLabel>
              <IonInput 
                value={name} 
                onIonChange={e => setName(String(e.detail.value || ''))} 
                placeholder="ej: mi-nuevo-proyecto"
                required 
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Descripción</IonLabel>
              <IonTextarea 
                value={description} 
                onIonChange={e => setDescription(String(e.detail.value || ''))} 
                placeholder="Opcional"
              />
            </IonItem>
            <div style={{ padding: 16 }}>
              <IonButton expand="block" type="submit" disabled={loading}>
                Crear en GitHub
              </IonButton>
            </div>
          </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
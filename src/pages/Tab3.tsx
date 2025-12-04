import React from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
  IonAvatar, IonItem, IonLabel
} from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  const user = {
    username: "chmstryxyz",
    name: "Matias Garcia",
    bio: "Estudiante de Ingeniería de Software en UISEK.",
    public_repos: 15,
    followers: 4,
    avatar_url: "https://ionicframework.com/docs/img/demos/avatar.svg"
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
            <IonAvatar style={{ width: '100px', height: '100px' }}>
              <img alt="avatar" src={user.avatar_url} />
            </IonAvatar>
          </div>
          <IonCardHeader style={{ textAlign: 'center' }}>
            <IonCardTitle>{user.name}</IonCardTitle>
            <IonCardSubtitle>@{user.username}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent style={{ textAlign: 'center' }}>
            {user.bio}
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Estadísticas</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem lines="none">
              <IonLabel>Repositorios Públicos</IonLabel>
              <IonLabel slot="end">{user.public_repos}</IonLabel>
            </IonItem>
            <IonItem lines="none">
              <IonLabel>Seguidores</IonLabel>
              <IonLabel slot="end">{user.followers}</IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
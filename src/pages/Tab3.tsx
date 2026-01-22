import React from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonList, IonItem, IonLabel, IonIcon, IonText, IonAvatar } from '@ionic/react'
import { logOutOutline, personCircleOutline } from 'ionicons/icons'
import { useRepos } from '../context/RepoContext'

const Tab3: React.FC = () => {
  const { user } = useRepos()

  const handleLogout = () => {
    localStorage.removeItem('github_token');
    window.location.href = '/login';
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mi Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <IonIcon icon={personCircleOutline} style={{ fontSize: '80px' }} color="primary" />
          <h2>{user?.name || user?.login || 'Usuario'}</h2>
          <IonText color="medium">
            <p>{user?.bio || 'Sin biografía'}</p>
          </IonText>
        </div>

        <IonList inset={true} style={{ marginTop: '30px' }}>
          <IonItem>
            <IonLabel>
              <h2>Nombre de usuario</h2>
              <p>{user?.login}</p>
            </IonLabel>
          </IonItem>
        </IonList>

        <IonButton 
          expand="block" 
          color="danger" 
          onClick={handleLogout} 
          className="ion-margin-top"
          fill="outline"
        >
          <IonIcon icon={logOutOutline} slot="start" />
          Cerrar Sesión / Cambiar Token
        </IonButton>
      </IonContent>
    </IonPage>
  )
}

export default Tab3
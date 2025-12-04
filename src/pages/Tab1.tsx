import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList } from '@ionic/react';
import RepoItem from '../components/RepoItem';
import './Tab1.css';
import { useRepos } from '../context/RepoContext';

const Tab1: React.FC = () => {
  const { repos } = useRepos();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {repos.map(repo => (
            <RepoItem key={repo.id} repo={repo} />
          ))}
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;
import React from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonSpinner, IonText, IonButton } from '@ionic/react'
import RepoItem from '../components/RepoItem'
import './Tab1.css'
import { useRepos } from '../context/RepoContext'

const Tab1: React.FC = () => {
  const { repos, loading, error, user, refresh } = useRepos()
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

        {loading && <div style={{ display: 'flex', justifyContent: 'center', padding: 16 }}><IonSpinner name="crescent" /></div>}

        {error && <div style={{ padding: 12 }}><IonText color="danger">{error}</IonText><div style={{ marginTop: 8 }}><IonButton onClick={() => void refresh()}>Reintentar</IonButton></div></div>}

        {user && <div style={{ padding: 12 }}><IonText><strong>{user.name ?? user.login}</strong></IonText></div>}

        <IonList>
          {repos.map(repo => (
            <RepoItem key={repo.id} repo={repo} />
          ))}
        </IonList>

      </IonContent>
    </IonPage>
  )
}

export default Tab1
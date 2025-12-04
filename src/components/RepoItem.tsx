import React from 'react';
import { IonItem, IonLabel, IonNote, IonIcon } from '@ionic/react';
import { logoGithub } from 'ionicons/icons';
interface RepoItemProps {
  repo: {
    id: number;
    name: string;
    description: string;
    language: string;
    owner: string;
  };
}

export const RepoItem: React.FC<RepoItemProps> = ({ repo }) => {
  return (
    <IonItem button detail>
      <IonIcon slot="start" icon={logoGithub} />
      <IonLabel>
        <h2>{repo.name}</h2>
        <p>{repo.description}</p>
        <p style={{ fontSize: '0.8rem', color: 'gray' }}>Lenguaje: {repo.language}</p>
      </IonLabel>
      <IonNote slot="end">{repo.owner}</IonNote>
    </IonItem>
  );
};

export default RepoItem;
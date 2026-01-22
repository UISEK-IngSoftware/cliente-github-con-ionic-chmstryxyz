import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonItem, IonLabel, IonCard, IonCardContent, IonImg, IonText, IonIcon, IonLoading } from '@ionic/react';
import { keyOutline, alertCircleOutline } from 'ionicons/icons';
import { getUser } from '../services/github';

const Login: React.FC = () => {
  const [token, setToken] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!token.trim()) return;
    setLoading(true);
    setError(null);
    localStorage.setItem('github_token', token.trim());
    try {
      await getUser();
      window.location.href = '/app/tab1';
    } catch (e) {
      localStorage.removeItem('github_token');
      setError('Token inválido. Verifica tus permisos en GitHub.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" style={{ '--background': '#ffffff' }}>
        <IonLoading isOpen={loading} message="Autenticando..." />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <IonCard style={{ width: '100%', maxWidth: '400px', borderRadius: '20px', boxShadow: 'none', border: '1px solid #eee' }}>
            <IonCardContent className="ion-text-center">
              <IonImg src="https://cdn-icons-png.flaticon.com/512/25/25231.png" style={{ width: '70px', margin: '0 auto 15px' }} />
              <IonText color="dark">
                <h2 style={{ fontWeight: 'bold' }}>Login</h2>
                <p style={{ color: '#666', marginBottom: '25px' }}>GitHub API Client</p>
              </IonText>

              {error && (
                <div style={{ background: '#ffebeb', padding: '10px', borderRadius: '8px', marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                  <IonIcon icon={alertCircleOutline} color="danger" style={{ marginRight: '8px' }} />
                  <IonText color="danger" style={{ fontSize: '14px' }}>{error}</IonText>
                </div>
              )}

              <IonItem lines="none" style={{ background: '#f5f5f5', borderRadius: '10px', marginBottom: '20px' }}>
                <IonLabel position="stacked" style={{ paddingBottom: '10px' }}>Personal Access Token</IonLabel>
                <IonInput type="password" value={token} onIonInput={e => setToken(String(e.detail.value!))} placeholder="ghp_..." />
                <IonIcon icon={keyOutline} slot="end" color="medium" />
              </IonItem>

              <IonButton expand="block" shape="round" onClick={handleLogin} style={{ height: '48px' }}>
                Entrar
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
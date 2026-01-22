import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { albumsOutline, addCircleOutline, personOutline } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Login from './pages/Login';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';

import { RepoProvider } from './context/RepoContext';

setupIonicReact();

const App: React.FC = () => {
  const token = localStorage.getItem('github_token');

  return (
    <IonApp>
      <RepoProvider>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/login" component={Login} />
            <Route path="/app" render={() => (
              <IonTabs>
                <IonRouterOutlet>
                  <Route exact path="/app/tab1" component={Tab1} />
                  <Route exact path="/app/tab2" component={Tab2} />
                  <Route exact path="/app/tab3" component={Tab3} />
                  <Route exact path="/app">
                    <Redirect to="/app/tab1" />
                  </Route>
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                  <IonTabButton tab="tab1" href="/app/tab1">
                    <IonIcon icon={albumsOutline} />
                    <IonLabel>Repositorios</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="tab2" href="/app/tab2">
                    <IonIcon icon={addCircleOutline} />
                    <IonLabel>Crear</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="tab3" href="/app/tab3">
                    <IonIcon icon={personOutline} />
                    <IonLabel>Perfil</IonLabel>
                  </IonTabButton>
                </IonTabBar>
              </IonTabs>
            )} />
            <Route exact path="/">
              <Redirect to={token ? "/app/tab1" : "/login"} />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </RepoProvider>
    </IonApp>
  );
};

export default App;
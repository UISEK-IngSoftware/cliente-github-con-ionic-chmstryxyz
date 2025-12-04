import React, { createContext, useContext, useState } from 'react';

interface Repository {
  id: number;
  name: string;
  description: string;
  language: string;
  owner: string;
}

type RepoContextType = {
  repos: Repository[];
  addRepo: (repo: Omit<Repository, 'id'>) => void;
};

const RepoContext = createContext<RepoContextType | undefined>(undefined);

export const RepoProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [repos, setRepos] = useState<Repository[]>([
    { id: 1, name: 'lab-android', description: 'Laboratorio de Android', language: 'Kotlin', owner: 'chmstryxyz' },
    { id: 2, name: 'proyecto-final', description: 'Gestor de tareas', language: 'TypeScript', owner: 'chmstryxyz' },
    { id: 3, name: 'ionic-client', description: 'Cliente Github Ionic', language: 'TypeScript', owner: 'UISEK' }
  ]);

  const addRepo = (repoData: Omit<Repository, 'id'>) => {
    setRepos(prev => [...prev, { id: Date.now(), ...repoData }]);
  };

  return <RepoContext.Provider value={{ repos, addRepo }}>{children}</RepoContext.Provider>;
};

export const useRepos = (): RepoContextType => {
  const ctx = useContext(RepoContext);
  if (!ctx) throw new Error('useRepos must be used within RepoProvider');
  return ctx;
};

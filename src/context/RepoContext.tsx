import React, { createContext, useContext, useEffect, useState } from 'react'
import { getUser, getUserRepos, GitHubRepo, GitHubUser } from '../services/github'

type Repository = {
  id: number
  name: string
  description: string
  language: string
  owner: string
}

type RepoContextType = {
  repos: Repository[]
  addRepo: (repo: Omit<Repository, 'id'>) => void
  loading: boolean
  error: string | null
  user: GitHubUser | null
  refresh: () => Promise<void>
}

const RepoContext = createContext<RepoContextType | undefined>(undefined)

export const RepoProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<GitHubUser | null>(null)

  const fetchAll = async () => {
    setLoading(true)
    setError(null)
    try {
      const [u, r] = await Promise.all([getUser(), getUserRepos()])
      setUser(u)
      const mapped = r.map(repo => ({ id: repo.id, name: repo.name, description: repo.description ?? '', language: repo.language ?? '', owner: repo.owner.login }))
      setRepos(mapped)
    } catch (e: any) {
      setError(e?.message ?? 'Error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchAll()
  }, [])

  const addRepo = (repoData: Omit<Repository, 'id'>) => {
    setRepos(prev => [...prev, { id: Date.now(), ...repoData }])
  }

  return <RepoContext.Provider value={{ repos, addRepo, loading, error, user, refresh: fetchAll }}>{children}</RepoContext.Provider>
}

export const useRepos = (): RepoContextType => {
  const ctx = useContext(RepoContext)
  if (!ctx) throw new Error('useRepos must be used within RepoProvider')
  return ctx
}

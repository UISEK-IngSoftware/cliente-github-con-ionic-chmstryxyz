import React, { createContext, useContext, useEffect, useState } from 'react'
import { getUser, getUserRepos, createRepo, GitHubRepo, GitHubUser } from '../services/github'

type Repository = {
  id: number
  name: string
  description: string
  language: string
  owner: string
}

type RepoContextType = {
  repos: Repository[]
  addRepo: (repoData: { name: string; description: string }) => Promise<void>
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
    const token = localStorage.getItem('github_token')
    if (!token) return

    setLoading(true)
    setError(null)
    try {
      const u = await getUser()
      const r = await getUserRepos()
      setUser(u)
      const mapped = r.map((repo: GitHubRepo) => ({ 
        id: repo.id, 
        name: repo.name, 
        description: repo.description ?? '', 
        language: repo.language ?? '', 
        owner: repo.owner.login 
      }))
      setRepos(mapped)
    } catch (e: any) {
      setError('No se pudieron cargar los datos de GitHub')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAll()
  }, [])

  const addRepo = async (repoData: { name: string; description: string }) => {
    setLoading(true)
    try {
      await createRepo(repoData)
      await fetchAll()
    } catch (e: any) {
      setError('Error al crear el repositorio')
      throw e
    } finally {
      setLoading(false)
    }
  }

  return (
    <RepoContext.Provider value={{ repos, addRepo, loading, error, user, refresh: fetchAll }}>
      {children}
    </RepoContext.Provider>
  )
}

export const useRepos = (): RepoContextType => {
  const ctx = useContext(RepoContext)
  if (!ctx) throw new Error('useRepos must be used within RepoProvider')
  return ctx
}
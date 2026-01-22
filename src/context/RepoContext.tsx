import React, { createContext, useContext, useEffect, useState } from 'react'
import { getUser, getUserRepos, createRepo, updateRepo, deleteRepo, GitHubRepo, GitHubUser } from '../services/github'

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
  editRepo: (owner: string, oldName: string, data: { name: string; description: string }) => Promise<void>
  removeRepo: (owner: string, repoName: string) => Promise<void>
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
    try {
      const u = await getUser()
      const r = await getUserRepos()
      setUser(u)
      setRepos(r.map((repo: GitHubRepo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description ?? '',
        language: repo.language ?? '',
        owner: repo.owner.login
      })))
    } catch (e: any) {
      setError('Error de sincronización')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [])

  const addRepo = async (repoData: { name: string; description: string }) => {
    setLoading(true)
    try {
      await createRepo(repoData)
      await fetchAll()
    } catch (e) { throw e } finally { setLoading(false) }
  }

  const editRepo = async (owner: string, oldName: string, data: { name: string; description: string }) => {
    const previousRepos = [...repos]
    setRepos(repos.map(r => (r.name === oldName && r.owner === owner) ? { ...r, ...data } : r))
    try {
      await updateRepo(owner, oldName, data)
    } catch (e) {
      setRepos(previousRepos)
      throw e
    }
  }

  const removeRepo = async (owner: string, repoName: string) => {
    const previousRepos = [...repos]
    setRepos(repos.filter(r => !(r.name === repoName && r.owner === owner)))
    try {
      await deleteRepo(owner, repoName)
    } catch (e) {
      setRepos(previousRepos)
      throw e
    }
  }

  return (
    <RepoContext.Provider value={{ repos, addRepo, editRepo, removeRepo, loading, error, user, refresh: fetchAll }}>
      {children}
    </RepoContext.Provider>
  )
}

export const useRepos = (): RepoContextType => {
  const ctx = useContext(RepoContext)
  if (!ctx) throw new Error('useRepos must be used within RepoProvider')
  return ctx
}
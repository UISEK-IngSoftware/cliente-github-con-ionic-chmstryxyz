import axios from 'axios'

const token = import.meta.env.VITE_GITHUB_TOKEN as string | undefined
const username = import.meta.env.VITE_GITHUB_USERNAME as string | undefined

const client = axios.create({
  baseURL: 'https://api.github.com',
  headers: token ? { Authorization: `token ${token}` } : undefined
})

export type GitHubRepo = {
  id: number
  name: string
  description: string | null
  language: string | null
  owner: { login: string }
}

export type GitHubUser = {
  login: string
  id: number
  avatar_url?: string
  name?: string
  bio?: string
}

export async function getUser(): Promise<GitHubUser> {
  if (token) {
    const res = await client.get('/user')
    return res.data
  }
  if (username) {
    const res = await client.get(`/users/${username}`)
    return res.data
  }
  return { login: 'unknown', id: 0 }
}

export async function getUserRepos(): Promise<GitHubRepo[]> {
  if (token) {
    const res = await client.get('/user/repos')
    return res.data
  }
  if (username) {
    const res = await client.get(`/users/${username}/repos`)
    return res.data
  }
  return []
}

export async function createRepo(repoData: { name: string, description: string }): Promise<GitHubRepo> {
  const res = await client.post('/user/repos', {
    name: repoData.name,
    description: repoData.description,
    private: false
  })
  return res.data
}
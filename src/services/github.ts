import axios from 'axios'

const getHeaders = () => {
  const token = localStorage.getItem('github_token')
  return token ? { 
    Authorization: `token ${token}`,
    Accept: 'application/vnd.github.v3+json'
  } : {}
}

const client = axios.create({
  baseURL: 'https://api.github.com'
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
  const res = await client.get('/user', { headers: getHeaders() })
  return res.data
}

export async function getUserRepos(): Promise<GitHubRepo[]> {
  const res = await client.get('/user/repos', { headers: getHeaders() })
  return res.data
}

export async function createRepo(repoData: { name: string, description: string }): Promise<GitHubRepo> {
  const res = await client.post('/user/repos', {
    name: repoData.name,
    description: repoData.description,
    private: false
  }, { headers: getHeaders() })
  return res.data
}

export async function updateRepo(owner: string, repo: string, data: { name: string, description: string }): Promise<void> {
  await client.patch(`/repos/${owner}/${repo}`, data, { headers: getHeaders() })
}

export async function deleteRepo(owner: string, repo: string): Promise<void> {
  await client.delete(`/repos/${owner}/${repo}`, { headers: getHeaders() })
}
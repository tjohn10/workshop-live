const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'

export async function api(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type':'application/json' }
  if(token) headers['Authorization'] = 'Bearer ' + token
  const res = await fetch(API_BASE + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  })
  const data = await res.json().catch(()=>null)
  if(!res.ok) throw data || { error: 'Network error' }
  return data
}
export default api

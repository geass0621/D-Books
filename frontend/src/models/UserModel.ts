export type User = {
  id: string | null,
  email: string | null,
  role: 'admin' | 'user' | null,
  status: 'online' | 'offline',
  loading?: boolean,
}
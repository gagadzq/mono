import request from "@/plugins/request"

export const login = async (data:  { username: string; password: string }) => {
  return await request.post('/user/login', data)
}

export const getAccountInfo = async () => {
  return await request.get('/user/getAccountInfo')
}
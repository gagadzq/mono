import request from "@/plugins/request"

export const uploadFiles = async (data: any) => {
  return await request.post('/uploadFiles', data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}
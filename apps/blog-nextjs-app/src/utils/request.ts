import useSWR from 'swr'
import { getUrlParams } from '@/utils/utils'
const HOST = process.env.HOST || ''

const BASE_URL = '/api/app'

export function getRequestURL(path = "") {
  return `${HOST}${BASE_URL}${path}`
}

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export const fetchRequest = {
  request: async (path: string, config?: RequestInit) => {
    const requestUrl = getRequestURL(path)
    try {
      const data = await fetcher(requestUrl, config)
      if (data.code === 200) {
        return data
      }
      throw Error(data.msg || 'Server Error')
    } catch (err) {
      console.error(err)
    }
  },

  get: async <T>(
    path: string,
    data?: {
      [key: string]: string | number | undefined
    }
  ) => {
    const params = data ? getUrlParams(data) : ''
    return fetchRequest.request(`${path}?${params}`, {
      method: 'GET'
    })
  },

  post: async <T>(
    path: string,
    data?: T,
    config?: RequestInit
  ) => {
    return fetchRequest.request(path, {
      method: 'POST',
      body: JSON.stringify(data),
      ...config
    })
  }
}
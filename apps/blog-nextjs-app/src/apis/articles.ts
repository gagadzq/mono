import { fetchRequest } from '@/utils/request'

// 获取文章列表
export const getArticleList = async (params: {
  keyword?: string,
  status?: number,
  pageIndex?: number,
  pageSize?: number
}) => {
  params.status = 1
  return await fetchRequest.get('/articles/getList', params)
}

// 获取文章详情
export const getArticleDetail = async (params: {
  id: number,
}) => {
  return await fetchRequest.get('/articles/getArticleDetail', params)
}

// 获取分类列表
export const getCategoryList = async (params: {
  pageIndex?: number,
  pageSize?: number
}) => {
  return await fetchRequest.get('/category/getList', params)
}

// 获取分类详情
export const getCategoryDetail = async (params: {
  categoryId: number,
}) => {
  return await fetchRequest.get('/category/getCategoryDetail', params)
}

// 获取标签列表
export const getTagList = async (params: {
  pageIndex?: number,
  pageSize?: number
}) => {
  return await fetchRequest.get('/tags/getList', params)
}
import request from "@/plugins/request"

// 获取文章列表
export const getNoteList = async (params: {
  keyword?: string,
  status?: number | string,
  pageIndex?: number,
  pageSize?: number
}) => {
  return await request.get('/articles/getList', { params })
}

// 获取文章详情
export const getArticleDetail = async (params: {
  id: number,
}) => {
  return await request.get('/articles/getArticleDetail', { params })
}

// 新建文章
export const createBlog = async (data: {
  title: string;
  content: string
}) => {
  return await request.post('/articles/create', data)
}

// 新建文章
export const updateArticle = async (data: {
  id: number;
  title: string;
  content: string;
}) => {
  return await request.post('/articles/updateById', data)
}

// 发布文章
export const publishArticles = async (data: {
  id: number;
}) => {
  return await request.post('/articles/publishById', data)
}

// 下架文章
export const takeDownArticle = async (data: {
  id: number;
}) => {
  return await request.post('/articles/takeDownById', data)
}

// 删除文章
export const deleteArticle = async (data: {
  id: number;
}) => {
  return await request.post('/articles/deleteById', data)
}

// 新建分类
export const createCategory = async (data: {
  categoryName: string;
  description?: string
}) => {
  return await request.post('/category/create', data)
}

// 修改分类
export const updateCategory = async (data: {
  id: number;
  categoryName: string;
  description?: string
}) => {
  return await request.post('/category/updateById', data)
}

// 删除分类
export const deleteCategory = async (data: {
  id: number;
}) => {
  return await request.post('/category/deleteById', data)
}

// 获取分类列表
export const getCategoryList = async (params: {
  keyword?: string;
  pageIndex?: number,
  pageSize?: number
}) => {
  return await request.get('/category/getList', { params })
}

// 给文章设置分类
export const setCategoryToArticle = async (data: {
  id: number,
  categoryId: number
}) => {
  return await request.post('/articles/setCategoryToArticle', data)
}

// 给文章设置标签
export const setTagsToArticle = async (data: {
  articledId: number,
  tagIds?: number[]
}) => {
  return await request.post('/articles/setTagsToArticle', data)
}

// 获取标签列表
export const getTagList = async (params: {
  tagName?: string;
  aliasName?: string;
  pageIndex?: number,
  pageSize?: number
}) => {
  return await request.get('/tags/getList', { params })
}

// 新建标签
export const createTag = async (data: {
  tagName: string;
  aliasName?: string;
  description?: string
}) => {
  return await request.post('/tags/create', data)
}

// 修改标签
export const updateTag = async (data: {
  tagId: number;
  aliasName?: string;
  description?: string
}) => {
  return await request.post('/tags/updateById', data)
}

// 删除标签
export const deleteTag = async (data: {
  tagId: number;
}) => {
  return await request.post('/tags/deleteById', data)
}
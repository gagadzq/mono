<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { EditPen } from '@element-plus/icons-vue'
import { getCategoryList, deleteCategory } from '../../apis/blogs';
import { formatDate } from '@/utils/utils'
import ManageCategoryDialog from './ManageCategoryDialog.vue'

const searchFormRef = ref<FormInstance>()
const searchForm = reactive({
  keyword: '',
})

const tableData = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const loading = ref(false)

const handleGetList = async () => {
  loading.value = true
  getCategoryList({
    keyword: searchForm.keyword,
    pageIndex: currentPage.value - 1,
    pageSize: pageSize.value
  }).then(res => {
    if (res.code === 200) {
      const { data } = res
      const { rows, count } = data
      total.value = count
      tableData.value = rows
    } 
  }).finally(() => {
    loading.value = false
  })
}
handleGetList()

const handleSizeChange = (val: number) => {
  pageSize.value = val
  handleGetList()
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val
  handleGetList()
}

const categoryDialogRef = ref()
const handleOpenCategory = (detail:Category) => {
  const { handleOpen } = categoryDialogRef.value
  handleOpen(detail)
}

const onSearch = async (formEl?: FormInstance) => {
  await handleGetList()
  
}
const onClear = async (formEl?: FormInstance) => {
  if (!formEl) return
  formEl.resetFields()
}

const $router = useRouter()

// 修改
const handleEditNote = (detail:Category) => {
  handleOpenCategory(detail)
}

// 删除
const handleDelete = (detail:Category) => {
  ElMessageBox.confirm(
    '是否确定删除指定分类？',
    'Warning',
    {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    deleteCategory({
      id: detail.categoryId
    }).then(res => {
      if (res.code === 200) {
        handleGetList()
        ElMessage({
          message: '删除成功',
          type: 'success'
        })
      }
    })
  })
}
</script>

<template>
  <div class="list-header">
    <el-button type="primary" plain :icon="EditPen" @click="() => handleOpenCategory">新建分类</el-button>

    <el-form :inline="true" ref="searchFormRef" :model="searchForm" class="list-search">
      <el-form-item label="关键字" prop="title">
        <el-input v-model.trim="searchForm.keyword" placeholder="请输入名称 / 描述" clearable />
      </el-form-item>
      <el-form-item style="marginRight: 0">
        <el-button type="primary" @click="onSearch(searchFormRef)">搜索</el-button>
        <el-button type="default" @click="onClear(searchFormRef)">清空</el-button>
      </el-form-item>
    </el-form>
  </div>

  <el-table :data="tableData" border v-loading="loading" style="width: 1000px">
    <el-table-column type="index" width="50" fixed="left" />
    <el-table-column prop="categoryName" label="分类名称" width="240" fixed="left" />
    <el-table-column prop="description" label="分类描述" minWidth="180" fixed="left" />
    <el-table-column label="创建时间" width="180">
      <template #default="scope">
        {{ formatDate(new Date(scope.row.createdTime)) }}
      </template>
    </el-table-column>
    <el-table-column label="操作" width="140" fixed="right">
      <template #default="scope">
        <el-row>
          <el-button type="primary" size="small" @click="handleEditNote(scope.row)">修改</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </el-row>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    class="pagination"
    :page-sizes="[10, 20, 50]"
    layout="total, sizes, prev, pager, next, jumper"
    :disabled="loading"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />

  <ManageCategoryDialog
    ref="categoryDialogRef"
    @successSubmit="() => {
      handleGetList()
    }"
  />
</template>

<style scoped>
.pagination {
  margin-top: 20px;
}
.list-header {
  display: flex;
  justify-content: space-between;
  max-width: 1000px;
}
.list-search {
  margin-left: 20px;
  float: right;
}
</style>
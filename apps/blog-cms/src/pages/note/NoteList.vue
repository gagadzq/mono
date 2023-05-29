<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { Edit, EditPen } from '@element-plus/icons-vue'
import {
  getNoteList,
  publishArticles,
  takeDownArticle,
  deleteArticle
} from '../../apis/blogs';
import { formatDate } from '@/utils/utils'
import SetCategoryDialog from "./SetCategoryDialog.vue";
import SetTagsDialog from "./SetTagsDialog.vue";

const $router = useRouter()

const searchFormRef = ref<FormInstance>()
const searchForm = reactive({
  keyword: '',
  status: ''
})
const tableData = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const loading = ref(false)

const handleGetList = async () => {
  loading.value = true
  getNoteList({
    keyword: searchForm.keyword,
    status: searchForm.status,
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
const onSearch = async (formEl?: FormInstance) => {
  await handleGetList()
  
}
const onClear = async (formEl?: FormInstance) => {
  if (!formEl) return
  formEl.resetFields()
}

// 新增
const handleAddNote = () => {
  $router.push({
    name: 'addNote'
  })
}

// 修改
const handleEditNote = (detail: NoteDetail) => {
  $router.push({
    name: 'editNote',
    query: {
      id: detail.id
    }
  })
}

// 发布
const handlePublish = (detail: NoteDetail) => {
  ElMessageBox.confirm(
    '是否确定发布这篇文章？',
    'Warning',
    {
      confirmButtonText: '发布',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    publishArticles({
      id: detail.id
    }).then(res => {
      if (res.code === 200) {
        handleGetList()
        ElMessage({
          message: '发布成功',
          type: "success",
        })
      }
    })
  })
}

// 下架
const handleTakeDown = (detail: NoteDetail) => {
  ElMessageBox.confirm(
    '是否确定下架这篇文章？',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    takeDownArticle({
      id: detail.id
    }).then(res => {
      if (res.code === 200) {
        handleGetList()
        ElMessage({
          message: '下架成功',
          type: "success",
        })
      }
    })
  })
}

// 删除
const handleDelete = (detail: NoteDetail) => {
  ElMessageBox.confirm(
    '是否确定删除这篇文章？',
    'Warning',
    {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    deleteArticle({
      id: detail.id
    }).then(res => {
      if (res.code === 200) {
        handleGetList()
        ElMessage({
          message: '删除成功',
          type: "success",
        })
      }
    })
  })
}

const categoryDialogRef = ref()
const handleOpenCategory = (detail: NoteDetail) => {
  const { handleOpen } = categoryDialogRef.value
  handleOpen(detail)
}

const tagsDialogRef = ref()
const handleOpenTag = (detail: NoteDetail) => {
  const { handleOpen } = tagsDialogRef.value
  handleOpen(detail)
}
</script>

<template>
  <div class="list-header">
    <el-button type="primary" plain :icon="EditPen" @click="handleAddNote">新建文章</el-button>

    <el-form :inline="true" ref="searchFormRef" :model="searchForm" class="list-search">
      <el-form-item label="关键字" prop="title">
        <el-input v-model.trim="searchForm.keyword" placeholder="请输入标题 / 内容" clearable />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="searchForm.status" placeholder="请选择" clearable>
          <el-option label="已发布" :value="1" />
          <el-option label="未发布" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item style="marginRight: 0">
        <el-button type="primary" @click="onSearch(searchFormRef)">搜索</el-button>
        <el-button type="default" @click="onClear(searchFormRef)">清空</el-button>
      </el-form-item>
    </el-form>
  </div>

  <el-table :data="tableData" border v-loading="loading" style="width: 100%">
    <el-table-column type="index" width="50" fixed="left" />
    <el-table-column prop="title" label="标题" minWidth="130" fixed="left" />
    <el-table-column label="分类">
      <template #default="scope">
        <span>{{ scope.row.Category?.categoryName }}</span>
        <el-icon @click="handleOpenCategory(scope.row)" size="16" class="link-icon"><Edit /></el-icon>
      </template>
    </el-table-column>
    <el-table-column label="标签">
      <template #default="scope">
        <template v-if="scope.row.Tags.length">
          <el-tag v-for="tag in scope.row.Tags" :key="tag.tagId" style="margin: 0 5px 5px 0">{{ tag.aliasName || tag.tagName }}</el-tag>
        </template>
        <el-icon @click="handleOpenTag(scope.row)" size="16" class="link-icon"><Edit /></el-icon>
      </template>
    </el-table-column>
    <el-table-column label="状态" width="100">
      <template #default="scope">
        <span v-if="scope.row.status === 1" class="success-text">已发布</span>
        <span v-else>未发布</span>
      </template>
    </el-table-column>
    <el-table-column label="发布时间" min-width="120">
      <template #default="scope">
        {{ scope.row.publishTime ? formatDate(new Date(scope.row.publishTime)) : '--' }}
      </template>
    </el-table-column>
    <el-table-column label="修改时间" min-width="120">
      <template #default="scope">
        {{ formatDate(new Date(scope.row.updatedTime)) }}
      </template>
    </el-table-column>
    <el-table-column label="创建时间" min-width="120">
      <template #default="scope">
        {{ formatDate(new Date(scope.row.createdTime)) }}
      </template>
    </el-table-column>
    <el-table-column label="操作" width="195" fixed="right">
      <template #default="scope">
        <el-row>
          <!-- <el-button type="primary" size="small">预览</el-button> -->
          <el-button type="primary" size="small" @click="handleEditNote(scope.row)">修改</el-button>
          <el-button type="success" v-if="scope.row.status === 2" size="small" @click="handlePublish(scope.row)">发布</el-button>
          <el-button type="info" v-else size="small" @click="handleTakeDown(scope.row)">下架</el-button>
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

  <SetCategoryDialog
    ref="categoryDialogRef"
    @successSubmit="() => {
      handleGetList()
    }"
  />

  <SetTagsDialog
    ref="tagsDialogRef"
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
}
.list-search {
  margin-left: 20px;
  float: right;
}
.link-icon {
  cursor: pointer;
  color: #2184f7;
  vertical-align: middle;
  margin-left: 5px;
}
</style>
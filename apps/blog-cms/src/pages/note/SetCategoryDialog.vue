<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { ElMessage } from "element-plus";
  import { getCategoryList, setCategoryToArticle } from '@/apis/blogs';

  
  const emit = defineEmits<{
    (e: "successSubmit"): void;
  }>();

  const selectCategoryId = ref('')
  const articleId = ref()
  const categoryList = ref<{
    categoryId: number;
    categoryName: string;
  }[]>([])

  const loading = ref(false)
  const getList = async () => {
    loading.value = true
    try {
      const res = await getCategoryList({})
      if (res.code === 200) {
        const { data } = res
        categoryList.value = data.rows
      }
    } finally {
      loading.value = false
    }
  }
  
  const visible = ref(false)
  
  const handleOpen = (detail: NoteDetail) => {
    visible.value = true
    articleId.value = detail.id
    selectCategoryId.value = detail.categoryId
    getList()
  }  
  
  const handleClose = () => {
    visible.value = false
  }
  
  const saving = ref(false)
  const handleSubmit = async () => {
    if (!selectCategoryId.value) {
      ElMessage({
        message: '请选择分类',
        type: "warning",
      });
      return
    }
    try {
      saving.value = true
      await setCategoryToArticle({
        id: articleId.value,
        categoryId: +selectCategoryId.value
      })
      ElMessage({
        message: '设置成功',
        type: "success",
      });
      handleClose()
      emit('successSubmit')
    } catch(err) {
      ElMessage({
        showClose: true,
        message: `${err}`,
        type: "error",
      });
    } finally {
      saving.value = false
    }
  }

  defineExpose({handleOpen})
</script>

<template>
  <el-dialog
    v-model="visible"
    title="设置分类"
    width="30%"
    :before-close="handleClose"
  >
    <el-select v-model="selectCategoryId" v-loading="loading" placeholder="请选择分类" style="width: 100%">
      <el-option
        v-for="item in categoryList"
        :key="item.categoryId"
        :label="item.categoryName"
        :value="item.categoryId"
      />
    </el-select>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">
          保存
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
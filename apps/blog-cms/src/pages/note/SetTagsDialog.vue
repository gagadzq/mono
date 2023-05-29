<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { ElMessage } from "element-plus";
  import { getTagList, setTagsToArticle } from '@/apis/blogs';

  
  const emit = defineEmits<{
    (e: "successSubmit"): void;
  }>();

  const selectTagIds = ref<number[]>([])
  const articleId = ref()
  const tagList = ref<{
    tagId: number;
    tagName: string;
    aliasName: string;
  }[]>([])

  const loading = ref(false)
  const getList = async () => {
    loading.value = true
    try {
      const res = await getTagList({})
      if (res.code === 200) {
        const { data } = res
        tagList.value = data.rows
      }
    } finally {
      loading.value = false
    }
  }
  
  const visible = ref(false)
  
  const handleOpen = (detail: NoteDetail) => {
    visible.value = true
    articleId.value = detail.id
    selectTagIds.value = detail.Tags.map(tag => tag.tagId)
    getList()
  }  
  
  const handleClose = () => {
    visible.value = false
  }
  
  const saving = ref(false)
  const handleSubmit = async () => {
    if (!selectTagIds.value.length) {
      ElMessage({
        message: '请选择标签',
        type: "warning",
      });
      return
    }
    try {
      saving.value = true
      await setTagsToArticle({
        articledId: articleId.value,
        tagIds: selectTagIds.value
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
    title="设置标签"
    width="30%"
    :before-close="handleClose"
  >
    <el-select v-model="selectTagIds" v-loading="loading" placeholder="请选择分类" style="width: 100%" multiple>
      <el-option
        v-for="item in tagList"
        :key="item.tagId"
        :label="item.aliasName || item.tagName"
        :value="item.tagId"
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
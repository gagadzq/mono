<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { uploadFiles } from '@/apis/upload'
import { createBlog, updateArticle } from '@/apis/blogs'
import { ElMessage, ElMessageBox } from "element-plus";
import {
  getArticleDetail
} from '../../apis/blogs';

const title = ref('')
const text = ref('')
const editId = ref()
const loading = ref(false)
const saving = ref(false)

const $router = useRouter()
const { currentRoute } = $router
if (currentRoute.value.query.id) {
  editId.value = currentRoute.value.query.id
  loading.value = true
  getArticleDetail({
    id: editId.value
  }).then(res => {
    if (res.code === 200) {
      const { data } = res
      title.value = data.title
      text.value = data.content
    }
  }).finally(() => {
    loading.value = false
  })
}

const submit = () => {
  handleSave(text.value)
}

const handleSave = async (text: string) => {
  await ElMessageBox.confirm(
    '是否确定保存当前内容？',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
  if (!title.value) {
    ElMessage({
      message: '标题不能为空噢！',
      type: "error",
    });
    return
  }
  try {
    saving.value = true
    if (!editId.value) {
      await createBlog({
        title: title.value,
        content: text
      })
      ElMessage({
        message: '新建成功',
        type: "success",
      });
    } else {
      await updateArticle({
        id: editId.value,
        title: title.value,
        content: text
      })
      ElMessage({
        message: '修改成功',
        type: "success",
      });
    }
    $router.back()
  } catch(e: any) {
    ElMessage({
      message: e,
      type: "error",
    })
  } finally {
    saving.value = false
  }
}

// 上传图片
const handleUploadImage = async (event: EventListener, insertImage: (arg0: any) => void, files: any[]) => {
  const file = files[0]
  const { name } = file
  const formData = new FormData()
  formData.append(name, file)
  const { data } = await uploadFiles(formData)
  const imgUrl = data[0]
  console.log(imgUrl);
  
  insertImage(imgUrl)
}

const handleCancel = () => {
  ElMessageBox.confirm(
    '是否确定取消编辑，退出页面？',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    $router.back()
  })
}
</script>

<template>
  <div class="add-line">
    <el-input
      class="add-title"
      v-model="title"
      v-loading="loading"
      maxlength="20"
      size="large"
      placeholder="请输入标题"
      show-word-limit
      type="text"
    />
    <div>
      <el-button type="primary" size="large" class="add-btn" @click="submit" v-loading="saving">保存</el-button>
      <el-button type="default" size="large" class="add-btn" @click="handleCancel" :disabled="saving">取消</el-button>
    </div>
  </div>
  <v-md-editor
    v-model="text"
    v-loading="loading || saving"
    height="800px"
    :disabled-menus="[]"
    @upload-image="handleUploadImage"
    @save="handleSave"
  ></v-md-editor>
</template>

<style lang="less" scoped>
.add-line {
  display: flex;
  .add-title {
    margin-bottom: 20px;
    background: #fff;
    flex: 1;
  }
  .add-btn {
    &:first-child {
      margin-left: 20px;
    }
    margin-left: 10px;
  }
}
</style>
<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules, DialogBeforeCloseFn } from 'element-plus'
import { createTag, updateTag } from '@/apis/blogs';

const emit = defineEmits<{
  (e: "successSubmit"): void;
}>();

const visible = ref(false)
const tagId = ref()
const formRef = ref<FormInstance>()
const form = reactive({
  tagName: '',
  aliasName: '',
  description: ''
})
const formRules = reactive<FormRules>({
  tagName: [
    { required: true, message: '标签名称不能为空', trigger: 'blur' },
  ]
})

const handleOpen = (detail:Tag) => {
  visible.value = true
  if (detail) {
    tagId.value = detail.tagId
    form.tagName = detail.tagName
    form.aliasName = detail.aliasName
    form.description = detail.description
  }
}

const handleClose = (formEl?: FormInstance) => {
  if (!formEl) return
  formEl.resetFields()
  visible.value = false
  form.tagName = ''
  form.aliasName = ''
  form.description = ''
}

const saving = ref(false)
const handleSubmit = async (formEl?: FormInstance) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        saving.value = true
        if (!tagId.value) {
          await handleCreate()
        } else {
          await handleEdit()
        }
        handleClose(formEl)
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
  })
}

const handleCreate = async () => {
  await createTag({
    tagName: form.tagName,
    aliasName: form.aliasName,
    description: form.description
  })
  ElMessage({
    message: '新建成功',
    type: "success",
  });
}

const handleEdit = async () => {
  await updateTag({
    tagId: +tagId.value,
    aliasName: form.aliasName,
    description: form.description
  })
  ElMessage({
    message: '修改成功',
    type: "success",
  });
}

defineExpose({handleOpen})
</script>

<template>
  <el-dialog
    v-model="visible"
    :title="tagId ? '修改分类' : '新建分类'"
    width="550px"
    :before-close="() => { handleClose() }"
  >
    <el-form ref="formRef" :model="form" :rules="formRules" label-width="80px" class="list-search">
      <el-form-item label="标签名称" prop="tagName">
        <el-input v-model.trim="form.tagName" :disabled="!!tagId" placeholder="请输入" maxLength="20" clearable />
      </el-form-item>
      <el-form-item label="标签别名" prop="aliasName">
        <el-input v-model.trim="form.aliasName" placeholder="请输入" maxLength="20" clearable />
      </el-form-item>
      <el-form-item label="标签描述" prop="description">
        <el-input v-model.trim="form.description" type="textarea" placeholder="请输入" maxLength="100" clearable />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose(formRef)">取消</el-button>
        <el-button type="primary" @click="handleSubmit(formRef)">
          保存
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
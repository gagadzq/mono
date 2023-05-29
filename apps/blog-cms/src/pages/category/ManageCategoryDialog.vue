<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from 'element-plus'
import { createCategory, updateCategory } from '@/apis/blogs';

const emit = defineEmits<{
  (e: "successSubmit"): void;
}>();

const visible = ref(false)
const categoryId = ref()
const formRef = ref<FormInstance>()
const form = reactive({
  categoryName: '',
  description: ''
})
const formRules = reactive<FormRules>({
  categoryName: [
    { required: true, message: '分类名称不能为空', trigger: 'blur' },
  ]
})

const handleOpen = (detail: Category) => {
  visible.value = true
  if (detail) {
    categoryId.value = detail.categoryId
    form.categoryName = detail.categoryName
    form.description = detail.description
  }
}

const handleClose = (formEl?: FormInstance) => {
  if (!formEl) return
  formEl.resetFields()
  visible.value = false
  form.categoryName = ''
  form.description = ''
}

const saving = ref(false)
const handleSubmit = async (formEl?: FormInstance) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        saving.value = true
        if (!categoryId.value) {
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
  await createCategory({
    categoryName: form.categoryName,
    description: form.description
  })
  ElMessage({
    message: '新建成功',
    type: "success",
  });
}

const handleEdit = async () => {
  await updateCategory({
    id: categoryId.value,
    categoryName: form.categoryName,
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
    :title="categoryId ? '修改分类' : '新建分类'"
    width="550px"
    :before-close="() => handleClose(formRef)"
  >
    <el-form ref="formRef" :model="form" :rules="formRules" label-width="80px" class="list-search">
      <el-form-item label="分类名称" prop="categoryName">
        <el-input v-model.trim="form.categoryName" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="分类描述" prop="description">
        <el-input v-model.trim="form.description" type="textarea" placeholder="请输入" clearable />
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
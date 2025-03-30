<template>
  <div class="app-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>厂商管理</span>
          <el-button type="primary" @click="handleAddManufacturer">添加厂商</el-button>
        </div>
      </template>
      <div class="card-content">
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="name" label="厂商名称" width="180" />
          <el-table-column prop="country" label="国家/地区" width="120" />
          <el-table-column prop="contact" label="联系人" width="120" />
          <el-table-column prop="phone" label="联系电话" width="150" />
          <el-table-column prop="email" label="电子邮箱" width="180" />
          <el-table-column prop="address" label="地址" />
          <el-table-column label="操作" width="180">
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 50]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </el-card>

    <!-- 添加/编辑厂商对话框 -->
    <el-dialog
      :title="dialogType === 'add' ? '添加厂商' : '编辑厂商'"
      v-model="dialogVisible"
      width="500px"
    >
      <el-form :model="manufacturerForm" label-width="100px" :rules="rules" ref="formRef">
        <el-form-item label="厂商名称" prop="name">
          <el-input v-model="manufacturerForm.name" placeholder="请输入厂商名称" />
        </el-form-item>
        <el-form-item label="国家/地区" prop="country">
          <el-input v-model="manufacturerForm.country" placeholder="请输入国家/地区" />
        </el-form-item>
        <el-form-item label="联系人" prop="contact">
          <el-input v-model="manufacturerForm.contact" placeholder="请输入联系人姓名" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="manufacturerForm.phone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="manufacturerForm.email" placeholder="请输入电子邮箱" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="manufacturerForm.address" placeholder="请输入地址" type="textarea" :rows="2" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import type { FormInstance, FormRules } from "element-plus"

interface Manufacturer {
  id: number
  name: string
  country: string
  contact: string
  phone: string
  email: string
  address: string
}

const tableData = ref<Manufacturer[]>([
  {
    id: 1,
    name: "SICK",
    country: "德国",
    contact: "Hans Schmidt",
    phone: "+49 123456789",
    email: "contact@sick.com",
    address: "Erwin-Sick-Str. 1, 79183 Waldkirch, Germany"
  },
  {
    id: 2,
    name: "Velodyne",
    country: "美国",
    contact: "John Smith",
    phone: "+1 408-465-2800",
    email: "info@velodyne.com",
    address: "5521 Hellyer Ave, San Jose, CA 95138, USA"
  },
  {
    id: 3,
    name: "Basler",
    country: "德国",
    contact: "Maria Müller",
    phone: "+49 4102 463 500",
    email: "sales@baslerweb.com",
    address: "An der Strusbek 60-62, 22926 Ahrensburg, Germany"
  }
])

const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(3)
const dialogVisible = ref(false)
const dialogType = ref<'add' | 'edit'>('add')
const formRef = ref<FormInstance>()

const manufacturerForm = reactive<Omit<Manufacturer, 'id'>>({ 
  name: '',
  country: '',
  contact: '',
  phone: '',
  email: '',
  address: ''
})

const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入厂商名称', trigger: 'blur' }],
  country: [{ required: true, message: '请输入国家/地区', trigger: 'blur' }],
  contact: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
  email: [{ required: true, message: '请输入电子邮箱', trigger: 'blur' }, { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }]
})

const resetForm = () => {
  manufacturerForm.name = ''
  manufacturerForm.country = ''
  manufacturerForm.contact = ''
  manufacturerForm.phone = ''
  manufacturerForm.email = ''
  manufacturerForm.address = ''
}

const handleAddManufacturer = () => {
  dialogType.value = 'add'
  resetForm()
  dialogVisible.value = true
}

const handleEdit = (row: Manufacturer) => {
  dialogType.value = 'edit'
  Object.keys(manufacturerForm).forEach(key => {
    manufacturerForm[key as keyof typeof manufacturerForm] = row[key as keyof Manufacturer]
  })
  dialogVisible.value = true
}

const handleDelete = (row: Manufacturer) => {
  ElMessageBox.confirm(`确定要删除厂商 ${row.name} 吗?`, "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      ElMessage.success(`删除成功: ${row.name}`)
    })
    .catch(() => {
      ElMessage.info("已取消删除")
    })
}

const submitForm = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      if (dialogType.value === 'add') {
        ElMessage.success('添加厂商成功')
      } else {
        ElMessage.success('编辑厂商成功')
      }
      dialogVisible.value = false
    }
  })
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
  // 这里可以添加获取数据的逻辑
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  // 这里可以添加获取数据的逻辑
}

onMounted(() => {})
  // 这里可以添加获取数据的逻
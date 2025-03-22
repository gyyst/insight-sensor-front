<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { usePagination } from "@/hooks/usePagination"
import { ElMessage, ElMessageBox, FormInstance, FormRules } from "element-plus"
import { CirclePlus, Delete, Download, Refresh, RefreshRight, Search } from "@element-plus/icons-vue"
import "echarts"
import { UserInfo } from "@/api/userCenter/types/userCenter"
import { AddUserInfoAPI, deleteUserInfoAPI, listUserInfoAPI, updateUserInfoAPI } from "@/api/userCenter"

defineOptions({
  // 命名当前组件
  name: "userCenter"
})

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

//#region 增
const dialogVisible = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
const formData = reactive({
  account: "",
  password: "",
  unionId: "",
  mpOpenId: "",
  email: "",
  phone: "",
  name: "",
  avatar: "",
  profile: "",
  roles: []
})
const roleOptions = [
  {
    value: "user",
    label: "user"
  },
  {
    value: "admin",
    label: "admin"
  }
]

const formRules: FormRules = reactive({
  account: [{ required: true, trigger: "blur", message: "请输入账号" }],
  password: [{ required: true, trigger: "blur", message: "请输入密码" }],
  name: [{ required: true, trigger: "blur", message: "请输入名称" }],
  email: [{ required: true, trigger: "blur", message: "请输入邮箱" }]
})
const handleCreate = () => {
  formRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      if (currentUpdateId.value === undefined) {
        AddUserInfoAPI(formData)
          .then(() => {
            ElMessage.success("新增成功")
            getUserInfo()
          })
          .finally(() => {
            dialogVisible.value = false
          })
      } else {
        // chartData?: string
        // chartType?: string
        // genChart?: string
        // genResult?: string
        // goal?: string
        // id?: number
        // name?: string

        updateUserInfoAPI({
          avatar: formData.avatar,
          profile: formData.profile,
          roles: formData.roles,
          id: currentUpdateId.value,
          name: formData.name
        })
          .then(() => {
            ElMessage.success("修改成功")
            getUserInfo()
          })
          .finally(() => {
            dialogVisible.value = false
          })
      }
    } else {
      console.error("表单校验不通过", fields)
    }
  })
}

const handleCancel = () => {
  formRef.value?.resetFields()
  dialogVisible.value = false
}

const resetForm = () => {
  currentUpdateId.value = undefined
  formData.name = ""
  formData.account = ""
  formData.password = ""
  formData.email = ""
  formData.phone = ""
  formData.avatar = ""
  formData.profile = ""
  formData.roles = []
}
//#endregion

//#region 删
const handleDelete = (row: UserInfo) => {
  ElMessageBox.confirm(`正在删除用户：${row.name}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteUserInfoAPI({ id: row.id.toString() }).then(() => {
      ElMessage.success("删除成功")
      getUserInfo()
    })
  })
}
//#endregion

//#region 改
const currentUpdateId = ref<undefined | string>(undefined)
const handleUpdate = (row: UserInfo) => {
  currentUpdateId.value = row.id
  formData.name = row.name
  formData.avatar = row.avatar
  formData.profile = row.profile
  formData.roles = row.roles
  formData.email = row.email
  dialogVisible.value = true
}
//#endregion

//#region 查
const tableData = ref<UserInfo[]>([])
const searchFormRef = ref<FormInstance | null>(null)
const searchData = reactive({
  searchKey: ""
})

const getUserInfo = () => {
  loading.value = true
  listUserInfoAPI({
    current: paginationData.currentPage,
    pageSize: paginationData.pageSize,
    account: searchData.searchKey || undefined,
    email: searchData.searchKey || undefined,
    phone: searchData.searchKey || undefined,
    name: searchData.searchKey || undefined,
    profile: searchData.searchKey || undefined
  })
    .then((res) => {
      paginationData.total = res.data.totalRow
      tableData.value = res.data.records
      for (let i = 0; i < res.data.records.length; i++) {
        res.data.records[i].roles = JSON.parse(res.data.records[i].roles)
      }
      console.log(tableData.value[0].id)
    })
    .catch(() => {
      tableData.value = []
    })
    .finally(() => {
      loading.value = false
    })
}

const handleSearch = () => {
  paginationData.currentPage === 1 ? getUserInfo() : (paginationData.currentPage = 1)
}
const resetSearch = () => {
  searchFormRef.value?.resetFields()
  searchData.searchKey = ""
  handleSearch()
}
//#endregion
/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getUserInfo, { immediate: true })
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" class="search-wrapper" shadow="never">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item label="查询key" prop="name">
          <el-input v-model="searchData.searchKey" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button :icon="Search" type="primary" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-button :icon="CirclePlus" type="primary" @click="dialogVisible = true">新增用户</el-button>
          <el-button :icon="Delete" type="danger">批量删除</el-button>
        </div>
        <div>
          <el-tooltip content="下载">
            <el-button :icon="Download" circle type="primary" />
          </el-tooltip>
          <el-tooltip content="刷新当前页">
            <el-button :icon="RefreshRight" circle type="primary" @click="getUserInfo" />
          </el-tooltip>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData">
          <el-table-column align="center" type="selection" width="50" />
          <el-table-column align="center" label="账号" prop="account" />
          <el-table-column align="center" label="名称" prop="name" />
          <el-table-column align="center" label="头像" prop="avatar">
            <template v-slot="scope">
              <el-avatar :src="scope.row.avatar" />
            </template>
          </el-table-column>
          <el-table-column align="center" label="邮箱" prop="email" />
          <el-table-column align="center" label="手机号" prop="phone" />
          <el-table-column align="center" label="用户简介" prop="profile" />
          <el-table-column align="center" label="角色" prop="roles">
            <template v-slot="scope">
              <el-tag v-for="item in scope.row.roles" :key="item" class="mx-1" effect="plain" round>{{ item }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态" prop="stateString" />
          <el-table-column align="center" fixed="right" label="操作" width="150">
            <template #default="scope">
              <el-button bg size="small" text type="primary" @click="handleUpdate(scope.row)">修改</el-button>
              <el-button bg size="small" text type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager-wrapper">
        <el-pagination
          :currentPage="paginationData.currentPage"
          :layout="paginationData.layout"
          :page-size="paginationData.pageSize"
          :page-sizes="paginationData.pageSizes"
          :total="parseInt(paginationData.total)"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <!-- 新增/修改 -->
    <el-dialog
      v-model="dialogVisible"
      :title="currentUpdateId === undefined ? '新增用户' : '修改用户'"
      width="30%"
      @close="resetForm"
    >
      <el-form ref="formRef" :model="formData" :rules="formRules" label-position="left" label-width="100px">
        <el-form-item v-if="currentUpdateId === undefined" label="账号" prop="account">
          <el-input v-model="formData.account" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" placeholder="请输入" />
        </el-form-item>
        <el-form-item v-if="currentUpdateId === undefined" label="密码" prop="password">
          <el-input v-model="formData.password" placeholder="请输入" show-password />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-input v-model="formData.avatar" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="用户简介" prop="profile">
          <el-input v-model="formData.profile" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="角色" prop="roles">
          <el-select v-model="formData.roles" multiple placeholder="Select" style="width: 240px">
            <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleCreate">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;

  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>

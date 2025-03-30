<template>
  <div class="app-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>激光传感器管理</span>
        </div>
      </template>
      <div class="card-content">
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="name" label="传感器名称" width="180" />
          <el-table-column prop="model" label="型号" width="180" />
          <el-table-column prop="manufacturer" label="厂商" />
          <el-table-column prop="range" label="测量范围" />
          <el-table-column prop="accuracy" label="精度" />
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <el-tag :type="scope.row.status === '在线' ? 'success' : 'danger'">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
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
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import ElMessage from "element-plus"
import ElMessageBox from "element-plus"

interface LaserSensor {
  id: number
  name: string
  model: string
  manufacturer: string
  range: string
  accuracy: string
  status: string
}

const tableData = ref<LaserSensor[]>([
  {
    id: 1,
    name: "LMS511",
    model: "LMS511-20100",
    manufacturer: "SICK",
    range: "0.5-80m",
    accuracy: "±12mm",
    status: "在线"
  },
  {
    id: 2,
    name: "LiDAR-Lite v3",
    model: "LL-v3",
    manufacturer: "Garmin",
    range: "0-40m",
    accuracy: "±2.5cm",
    status: "在线"
  },
  {
    id: 3,
    name: "VLP-16",
    model: "VLP-16",
    manufacturer: "Velodyne",
    range: "0-100m",
    accuracy: "±3cm",
    status: "离线"
  }
])

const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(3)

const handleEdit = (row: LaserSensor) => {
  ElMessage.info(`编辑传感器: ${row.name}`)
}

const handleDelete = (row: LaserSensor) => {
  ElMessageBox.confirm(`确定要删除传感器 ${row.name} 吗?`, "警告", {
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

const handleSizeChange = (val: number) => {
  pageSize.value = val
  // 这里可以添加获取数据的逻辑
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  // 这里可以添加获取数据的逻辑
}

onMounted(() => {
  // 这里可以添加获取数据的逻辑
})
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
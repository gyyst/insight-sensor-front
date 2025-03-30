<template>
  <div class="app-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>视觉传感器管理</span>
        </div>
      </template>
      <div class="card-content">
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="name" label="传感器名称" width="180" />
          <el-table-column prop="model" label="型号" width="180" />
          <el-table-column prop="manufacturer" label="厂商" />
          <el-table-column prop="resolution" label="分辨率" />
          <el-table-column prop="fps" label="帧率" />
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
import { ElMessage, ElMessageBox } from "element-plus"

interface VisionSensor {
  id: number
  name: string
  model: string
  manufacturer: string
  resolution: string
  fps: string
  status: string
}

const tableData = ref<VisionSensor[]>([
  {
    id: 1,
    name: "acA1920-40gc",
    model: "acA1920-40gc",
    manufacturer: "Basler",
    resolution: "1920x1080",
    fps: "40",
    status: "在线"
  },
  {
    id: 2,
    name: "UI-3240CP",
    model: "UI-3240CP Rev.2",
    manufacturer: "IDS",
    resolution: "1280x1024",
    fps: "60",
    status: "在线"
  },
  {
    id: 3,
    name: "Blackfly S",
    model: "BFS-U3-16S2C",
    manufacturer: "FLIR",
    resolution: "1440x1080",
    fps: "75",
    status: "离线"
  }
])

const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(3)

const handleEdit = (row: VisionSensor) => {
  ElMessage.info(`编辑传感器: ${row.name}`)
}

const handleDelete = (row: VisionSensor) => {
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
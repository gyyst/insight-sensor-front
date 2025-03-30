<template>
  <div class="app-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>视觉传感器管理</span>
          <el-button v-if="checkPermission(['manufacturer', 'admin'])" type="primary"
            @click="handleAddVision">添加传感器</el-button>
        </div>
      </template>
      <div class="card-content">
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
          <el-table-column prop="id" label="ID" />
          <el-table-column prop="model" label="型号" />
          <el-table-column label="分辨率">
            <template #default="scope">
              <template v-if="scope.row.resolutionWidth !== undefined && scope.row.resolutionHeight !== undefined">
                {{ scope.row.resolutionWidth }}x{{ scope.row.resolutionHeight }}
              </template>
              <template v-else>
                -
              </template>
            </template>
          </el-table-column>
          <el-table-column label="帧率">
            <template #default="scope">
              <template v-if="scope.row.frameRate !== undefined">
                {{ scope.row.frameRate }}fps
              </template>
              <template v-else>
                -
              </template>
            </template>
          </el-table-column>
          <el-table-column label="视场角">
            <template #default="scope">
              <template v-if="scope.row.fovHorizontal !== undefined && scope.row.fovVertical !== undefined">
                {{ scope.row.fovHorizontal }}°x{{ scope.row.fovVertical }}°
              </template>
              <template v-else-if="scope.row.fovHorizontal !== undefined">
                {{ scope.row.fovHorizontal }}°
              </template>
              <template v-else-if="scope.row.fovVertical !== undefined">
                {{ scope.row.fovVertical }}°
              </template>
              <template v-else>
                -
              </template>
            </template>
          </el-table-column>
          <el-table-column label="深度精度">
            <template #default="scope">
              <template v-if="scope.row.depthAccuracy !== undefined">
                ±{{ scope.row.depthAccuracy }}mm
              </template>
              <template v-else>
                -
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="algorithmSupport" label="支持算法" />
          <el-table-column label="工作温度范围">
            <template #default="scope">
              <template v-if="scope.row.temperatureMin !== undefined && scope.row.temperatureMax !== undefined">
                {{ scope.row.temperatureMin }} - {{ scope.row.temperatureMax }}℃
              </template>
              <template v-else-if="scope.row.temperatureMin !== undefined">
                {{ scope.row.temperatureMin }}℃
              </template>
              <template v-else-if="scope.row.temperatureMax !== undefined">
                {{ scope.row.temperatureMax }}℃
              </template>
              <template v-else>
                -
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="ipRating" label="防护等级" />
          <el-table-column prop="interfaces" label="接口类型" />
          <el-table-column prop="price" label="参考价格">
            <template #default="scope">
              <template v-if="scope.row.price !== null && scope.row.price !== undefined">
                {{ scope.row.price }}元
              </template>
              <template v-else>
                -
              </template>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="140">
            <template #default="scope">
              <el-button v-if="checkPermission(['manufacturer', 'admin'])" size="small"
                @click="handleEdit(scope.row)">编辑</el-button>
              <el-button v-if="checkPermission(['manufacturer', 'admin'])" size="small" type="danger"
                @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 50]"
            layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
        </div>

        <!-- 添加/编辑对话框 -->
        <el-dialog v-model="dialogVisible" :title="dialogTitle" width="50%">
          <el-form :model="formData" label-width="120px">
            <el-form-item label="品牌ID" required>
              <el-input v-model.number="formData.brandId" type="number" />
            </el-form-item>
            <el-form-item label="型号" required>
              <el-input v-model="formData.model" />
            </el-form-item>
            <el-form-item label="水平分辨率">
              <el-input v-model.number="formData.resolutionWidth" type="number" placeholder="水平分辨率（像素）" />
            </el-form-item>
            <el-form-item label="垂直分辨率">
              <el-input v-model.number="formData.resolutionHeight" type="number" placeholder="垂直分辨率（像素）" />
            </el-form-item>
            <el-form-item label="帧率">
              <el-input v-model.number="formData.frameRate" type="number" placeholder="单位：fps" />
            </el-form-item>
            <el-form-item label="视场角">
              <el-row :gutter="10">
                <el-col :span="11">
                  <el-input v-model.number="formData.fovHorizontal" type="number" placeholder="水平视场角（°）" />
                </el-col>
                <el-col :span="2" class="text-center">-</el-col>
                <el-col :span="11">
                  <el-input v-model.number="formData.fovVertical" type="number" placeholder="垂直视场角（°）" />
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="深度精度">
              <el-input v-model.number="formData.depthAccuracy" type="number" placeholder="如±0.1mm存储为0.1" />
            </el-form-item>
            <el-form-item label="支持的算法库">
              <el-input v-model="formData.algorithmSupport" placeholder="如OpenCV,YOLO" />
            </el-form-item>
            <el-form-item label="工作温度范围">
              <el-row :gutter="10">
                <el-col :span="11">
                  <el-input v-model.number="formData.temperatureMin" type="number" placeholder="最低温度(℃)" />
                </el-col>
                <el-col :span="2" class="text-center">-</el-col>
                <el-col :span="11">
                  <el-input v-model.number="formData.temperatureMax" type="number" placeholder="最高温度(℃)" />
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="防护等级">
              <el-input v-model="formData.ipRating" placeholder="如IP67" />
            </el-form-item>
            <el-form-item label="接口类型">
              <el-input v-model="formData.interfaces" placeholder="如USB3.0,GigE" />
            </el-form-item>
            <el-form-item label="数据格式">
              <el-input v-model="formData.dataFormat" placeholder="RGB/深度图" />
            </el-form-item>
            <el-form-item label="适用场景">
              <el-input v-model="formData.applicationScenarios" placeholder="如分拣、SLAM" />
            </el-form-item>
            <el-form-item label="参考价格">
              <el-input v-model.number="formData.price" type="number" placeholder="单位：元" />
            </el-form-item>
            <el-form-item label="供应商信息">
              <el-input v-model="formData.supplier" />
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
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { pageVisionApi, removeVisionApi, getInfoVisionApi, saveVisionApi, updateVisionApi } from "@/api/sensor"
import type { PageVisionRes, GetInfoVisionRes } from "@/api/sensor/types/VisionSensor"
import { checkPermission } from "@/utils/permission" // 引入权限检查函数

interface VisionSensorForm {
  id?: number
  brandId: number
  model: string
  resolutionWidth?: number
  resolutionHeight?: number
  frameRate?: number
  fovHorizontal?: number
  fovVertical?: number
  depthAccuracy?: number
  algorithmSupport?: string
  temperatureMin?: number
  temperatureMax?: number
  ipRating?: string
  interfaces?: string
  dataFormat?: string
  applicationScenarios?: string
  price?: number
  supplier?: string
}

const tableData = ref<PageVisionRes["data"]["records"]>([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 对话框相关
const dialogVisible = ref(false)
const dialogTitle = ref("添加视觉传感器")
const formData = reactive<VisionSensorForm>({
  brandId: 0,
  model: "",
  resolutionWidth: undefined,
  resolutionHeight: undefined,
  frameRate: undefined,
  fovHorizontal: undefined,
  fovVertical: undefined,
  depthAccuracy: undefined,
  algorithmSupport: "",
  temperatureMin: undefined,
  temperatureMax: undefined,
  ipRating: "",
  interfaces: "",
  dataFormat: "",
  applicationScenarios: "",
  price: undefined,
  supplier: ""
})

// 获取视觉传感器列表
const fetchVisionList = () => {
  loading.value = true
  pageVisionApi({
    current: currentPage.value,
    pageSize: pageSize.value
  })
    .then(res => {
      if (res.code === 0) {
        tableData.value = res.data.records
        total.value = res.data.totalRow
      } else {
        ElMessage.error(res.message || "获取数据失败")
      }
    })
    .catch(error => {
      console.error("获取视觉传感器列表失败:", error)
      ElMessage.error("获取数据失败，请稍后重试")
    })
    .finally(() => {
      loading.value = false
    })
}

// 添加视觉传感器
const handleAddVision = () => {
  dialogTitle.value = "添加视觉传感器"
  // 重置表单
  Object.assign(formData, {
    id: undefined,
    brandId: 0,
    model: "",
    resolutionWidth: undefined,
    resolutionHeight: undefined,
    frameRate: undefined,
    fovHorizontal: undefined,
    fovVertical: undefined,
    depthAccuracy: undefined,
    algorithmSupport: "",
    temperatureMin: undefined,
    temperatureMax: undefined,
    ipRating: "",
    interfaces: "",
    dataFormat: "",
    applicationScenarios: "",
    price: undefined,
    supplier: ""
  })
  dialogVisible.value = true
}

// 编辑视觉传感器
const handleEdit = (row: PageVisionRes["data"]["records"][0]) => {
  dialogTitle.value = "编辑视觉传感器"
  getInfoVisionApi(row.id)
    .then(res => {
      if (res.code === 0) {
        // 填充表单数据
        Object.assign(formData, {
          id: res.data.id,
          brandId: res.data.brandId,
          model: res.data.model,
          resolutionWidth: res.data.resolutionWidth,
          resolutionHeight: res.data.resolutionHeight,
          frameRate: res.data.frameRate,
          fovHorizontal: res.data.fovHorizontal,
          fovVertical: res.data.fovVertical,
          depthAccuracy: res.data.depthAccuracy,
          algorithmSupport: res.data.algorithmSupport,
          temperatureMin: res.data.temperatureMin,
          temperatureMax: res.data.temperatureMax,
          ipRating: res.data.ipRating,
          interfaces: res.data.interfaces,
          dataFormat: res.data.dataFormat,
          applicationScenarios: res.data.applicationScenarios,
          price: res.data.price,
          supplier: res.data.supplier
        })
        dialogVisible.value = true
      } else {
        ElMessage.error(res.message || "获取传感器详情失败")
      }
    })
    .catch(error => {
      console.error("获取传感器详情失败:", error)
      ElMessage.error("获取传感器详情失败，请稍后重试")
    })
}

// 删除视觉传感器
const handleDelete = (row: PageVisionRes["data"]["records"][0]) => {
  ElMessageBox.confirm(`确定要删除传感器 ${row.model} 吗?`, "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      removeVisionApi(row.id)
        .then(res => {
          if (res.code === 0 && res.data) {
            ElMessage.success("删除成功")
            // 重新获取列表数据
            fetchVisionList()
          } else {
            ElMessage.error(res.message || "删除失败")
          }
        })
        .catch(error => {
          console.error("删除传感器失败:", error)
          ElMessage.error("删除失败，请稍后重试")
        })
    })
    .catch(() => {
      ElMessage.info("已取消删除")
    })
}

// 提交表单
const submitForm = () => {
  if (formData.id) {
    // 更新
    updateVisionApi({
      id: formData.id,
      brandId: formData.brandId,
      model: formData.model,
      resolutionWidth: formData.resolutionWidth,
      resolutionHeight: formData.resolutionHeight,
      frameRate: formData.frameRate,
      fovHorizontal: formData.fovHorizontal,
      fovVertical: formData.fovVertical,
      depthAccuracy: formData.depthAccuracy,
      algorithmSupport: formData.algorithmSupport,
      temperatureMin: formData.temperatureMin,
      temperatureMax: formData.temperatureMax,
      ipRating: formData.ipRating,
      interfaces: formData.interfaces,
      dataFormat: formData.dataFormat,
      applicationScenarios: formData.applicationScenarios,
      price: formData.price,
      supplier: formData.supplier
    })
      .then(res => {
        if (res.code === 0 && res.data) {
          ElMessage.success("更新成功")
          dialogVisible.value = false
          fetchVisionList()
        } else {
          ElMessage.error(res.message || "更新失败")
        }
      })
      .catch(error => {
        console.error("更新传感器失败:", error)
        ElMessage.error("更新失败，请稍后重试")
      })
  } else {
    // 新增
    saveVisionApi({
      brandId: formData.brandId,
      model: formData.model,
      resolutionWidth: formData.resolutionWidth,
      resolutionHeight: formData.resolutionHeight,
      frameRate: formData.frameRate,
      fovHorizontal: formData.fovHorizontal,
      fovVertical: formData.fovVertical,
      depthAccuracy: formData.depthAccuracy,
      algorithmSupport: formData.algorithmSupport,
      temperatureMin: formData.temperatureMin,
      temperatureMax: formData.temperatureMax,
      ipRating: formData.ipRating,
      interfaces: formData.interfaces,
      dataFormat: formData.dataFormat,
      applicationScenarios: formData.applicationScenarios,
      price: formData.price,
      supplier: formData.supplier
    })
      .then(res => {
        if (res.code === 0 && res.data) {
          ElMessage.success("添加成功")
          dialogVisible.value = false
          fetchVisionList()
        } else {
          ElMessage.error(res.message || "添加失败")
        }
      })
      .catch(error => {
        console.error("添加传感器失败:", error)
        ElMessage.error("添加失败，请稍后重试")
      })
  }
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
  fetchVisionList()
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  fetchVisionList()
}

onMounted(() => {
  fetchVisionList()
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
<template>
  <div class="app-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>激光传感器管理</span>
          <el-button v-if="checkPermission(['manufacturer', 'admin'])" type="primary"
            @click="handleAddLaser">添加传感器</el-button>
        </div>
      </template>
      <div class="card-content">
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
          <el-table-column prop="id" label="ID" />
          <el-table-column prop="model" label="型号" />
          <el-table-column label="测量范围">
            <template v-slot="scope">
              <template v-if="scope.row.measurementMin !== undefined && scope.row.measurementMax !== undefined">
                {{ scope.row.measurementMin }}-{{ scope.row.measurementMax }}m
              </template>
              <template v-else-if="scope.row.measurementMin !== undefined">
                {{ scope.row.measurementMin }}m
              </template>
              <template v-else-if="scope.row.measurementMax !== undefined">
                {{ scope.row.measurementMax }}m
              </template>
              <template v-else>
                -
              </template>
            </template>
          </el-table-column>
          <el-table-column label="工作温度范围">
            <template v-slot="scope">
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
          <el-table-column label="精度" prop="accuracy">
            <template v-slot="scope">
              <template v-if="scope.row.accuracy !== undefined">
                ±{{ scope.row.accuracy }}%
              </template>
              <template v-else>
                -
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="scanFrequency" label="扫描频率">
            <template v-slot="scope">
              <template v-if="scope.row.scanFrequency !== undefined">
                {{ scope.row.scanFrequency }}Hz
              </template>
              <template v-else>
                -
              </template>
            </template>
          </el-table-column>
          <el-table-column label="波长范围">
            <template v-slot="scope">
              <template v-if="scope.row.wavelengthMin !== undefined && scope.row.wavelengthMax !== undefined">
                {{ scope.row.wavelengthMin }}-{{ scope.row.wavelengthMax }}nm
              </template>
              <template v-else-if="scope.row.wavelengthMin !== undefined">
                {{ scope.row.wavelengthMin }}nm
              </template>
              <template v-else-if="scope.row.wavelengthMax !== undefined">
                {{ scope.row.wavelengthMax }}nm
              </template>
              <template v-else>
                -
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="ipRating" label="防护等级" />
          <el-table-column prop="interfaces" label="通信接口" />
          <el-table-column prop="dataFormat" label="数据输出格式" />
          <el-table-column prop="price" label="参考价格">
            <template v-slot="scope">
              <template v-if="scope.row.price !== null">
                {{ scope.row.price }}元
              </template>
              <template v-else>
                -
              </template>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="140">
            <template v-slot="scope">
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
            <el-form-item label="测量范围">
              <el-row :gutter="10">
                <el-col :span="11">
                  <el-input v-model.number="formData.measurementMin" type="number" placeholder="最小值(m)" />
                </el-col>
                <el-col :span="2" class="text-center">-</el-col>
                <el-col :span="11">
                  <el-input v-model.number="formData.measurementMax" type="number" placeholder="最大值(m)" />
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="测距精度">
              <el-input v-model.number="formData.accuracy" type="number" placeholder="如±0.02%存储为0.02" />
            </el-form-item>
            <el-form-item label="扫描频率">
              <el-input v-model.number="formData.scanFrequency" type="number" placeholder="单位：Hz" />
            </el-form-item>
            <el-form-item label="波长范围">
              <el-row :gutter="10">
                <el-col :span="11">
                  <el-input v-model.number="formData.wavelengthMin" type="number" placeholder="最小值(nm)" />
                </el-col>
                <el-col :span="2" class="text-center">-</el-col>
                <el-col :span="11">
                  <el-input v-model.number="formData.wavelengthMax" type="number" placeholder="最大值(nm)" />
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="分辨率">
              <el-input v-model.number="formData.resolution" type="number" placeholder="如0.1μm存储为0.0001" />
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
            <el-form-item label="通信接口">
              <el-input v-model="formData.interfaces" placeholder="如EtherCAT,RS-485" />
            </el-form-item>
            <el-form-item label="数据输出格式">
              <el-input v-model="formData.dataFormat" placeholder="点云/深度图" />
            </el-form-item>
            <el-form-item label="适用场景">
              <el-input v-model="formData.applicationScenarios" placeholder="如AGV导航、焊接检测" />
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
import { pageLaserApi, removeLaserApi, getInfoLaserApi, saveLaserApi, updateLaserApi } from "@/api/sensor"
import type { PageLaserRes, GetInfoLaserRes } from "@/api/sensor/types/LaserSensor"
import { checkPermission } from "@/utils/permission" // 引入权限检查函数

interface LaserSensorForm {
  id?: number
  brandId: number
  model: string
  measurementMin?: number
  measurementMax?: number
  accuracy?: number
  scanFrequency?: number
  wavelengthMin?: number
  wavelengthMax?: number
  resolution?: number
  temperatureMin?: number
  temperatureMax?: number
  ipRating?: string
  interfaces?: string
  dataFormat?: string
  applicationScenarios?: string
  price?: number
  supplier?: string
}

const tableData = ref<PageLaserRes["data"]["records"]>([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 对话框相关
const dialogVisible = ref(false)
const dialogTitle = ref("添加激光传感器")
const formData = reactive<LaserSensorForm>({
  brandId: 0,
  model: "",
  measurementMin: undefined,
  measurementMax: undefined,
  accuracy: undefined,
  scanFrequency: undefined,
  wavelengthMin: undefined,
  wavelengthMax: undefined,
  resolution: undefined,
  temperatureMin: undefined,
  temperatureMax: undefined,
  ipRating: "",
  interfaces: "",
  dataFormat: "",
  applicationScenarios: "",
  price: undefined,
  supplier: ""
})

// 获取激光传感器列表
const fetchLaserList = () => {
  loading.value = true
  pageLaserApi({
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
      console.error("获取激光传感器列表失败:", error)
      ElMessage.error("获取数据失败，请稍后重试")
    })
    .finally(() => {
      loading.value = false
    })
}

// 添加激光传感器
const handleAddLaser = () => {
  dialogTitle.value = "添加激光传感器"
  // 重置表单
  Object.assign(formData, {
    id: undefined,
    brandId: 0,
    model: "",
    measurementMin: undefined,
    measurementMax: undefined,
    accuracy: undefined,
    scanFrequency: undefined,
    wavelengthMin: undefined,
    wavelengthMax: undefined,
    resolution: undefined,
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

// 编辑激光传感器
const handleEdit = (row: PageLaserRes["data"]["records"][0]) => {
  dialogTitle.value = "编辑激光传感器"
  getInfoLaserApi(row.id)
    .then(res => {
      if (res.code === 0) {
        // 填充表单数据
        Object.assign(formData, {
          id: res.data.id,
          brandId: res.data.brandId,
          model: res.data.model,
          measurementMin: res.data.measurementMin,
          measurementMax: res.data.measurementMax,
          accuracy: res.data.accuracy,
          scanFrequency: res.data.scanFrequency,
          wavelengthMin: res.data.wavelengthMin,
          wavelengthMax: res.data.wavelengthMax,
          resolution: res.data.resolution,
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

// 删除激光传感器
const handleDelete = (row: PageLaserRes["data"]["records"][0]) => {
  ElMessageBox.confirm(`确定要删除传感器 ${row.model} 吗?`, "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      removeLaserApi(row.id)
        .then(res => {
          if (res.code === 0 && res.data) {
            ElMessage.success("删除成功")
            // 重新获取列表数据
            fetchLaserList()
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
    updateLaserApi({
      id: formData.id,
      brandId: formData.brandId,
      model: formData.model,
      measurementMin: formData.measurementMin,
      measurementMax: formData.measurementMax,
      accuracy: formData.accuracy,
      scanFrequency: formData.scanFrequency,
      wavelengthMin: formData.wavelengthMin,
      wavelengthMax: formData.wavelengthMax,
      resolution: formData.resolution,
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
          fetchLaserList()
        } else {
          ElMessage.error(res.message || "更新失败")
        }
      })
      .catch(error => {
        console.error("提交表单失败:", error)
        ElMessage.error("操作失败，请稍后重试")
      })
  } else {
    // 新增
    saveLaserApi({
      brandId: formData.brandId,
      model: formData.model,
      measurementMin: formData.measurementMin,
      measurementMax: formData.measurementMax,
      accuracy: formData.accuracy,
      scanFrequency: formData.scanFrequency,
      wavelengthMin: formData.wavelengthMin,
      wavelengthMax: formData.wavelengthMax,
      resolution: formData.resolution,
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
          fetchLaserList()
        } else {
          ElMessage.error(res.message || "添加失败")
        }
      })
      .catch(error => {
        console.error("提交表单失败:", error)
        ElMessage.error("操作失败，请稍后重试")
      })
  }
}


const handleSizeChange = (val: number) => {
  pageSize.value = val
  fetchLaserList()
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  fetchLaserList()
}

onMounted(() => {
  fetchLaserList()
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

.text-center {
  text-align: center;
  line-height: 32px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.el-form-item {
  margin-bottom: 20px;
}
</style>
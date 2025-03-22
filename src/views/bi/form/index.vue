<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { usePagination } from "@/hooks/usePagination"
import { ElMessage, ElMessageBox, FormInstance, FormRules } from "element-plus"
import { CirclePlus, Delete, Download, Refresh, RefreshRight, Search } from "@element-plus/icons-vue"
import { createChartAPI, deleteChartAPI, getChartDataAPI, updateChartAPI } from "@/api/BI"
import { useUserStore } from "@/store/modules/user"
import { Chart } from "@/api/BI/types/chart"
import "echarts"

defineOptions({
  // 命名当前组件
  name: "BIDataForm"
})

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

//#region 增
const dialogVisible = ref<boolean>(false)
const chartDataVisible = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
const formData = reactive({
  name: "",
  goal: "",
  chartData: "",
  chartType: "",
  genChart: "",
  genResult: ""
})
const formRules: FormRules = reactive({
  name: [{ required: true, trigger: "blur", message: "请输入名称" }],
  goal: [{ required: true, trigger: "blur", message: "请输入目标" }],
  chartData: [{ required: true, trigger: "blur", message: "请输入图表数据" }],
  chartType: [{ required: true, trigger: "blur", message: "请输入图表类型" }]
})
const handleCreate = () => {
  formRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      if (currentUpdateId.value === undefined) {
        createChartAPI(formData)
          .then(() => {
            ElMessage.success("新增成功")
            getChartData()
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

        updateChartAPI({
          chartData: formData.chartData,
          chartType: formData.chartType,
          genChart: formData.genChart,
          genResult: formData.genResult,
          goal: formData.goal,
          id: currentUpdateId.value,
          name: formData.name
        })
          .then(() => {
            ElMessage.success("修改成功")
            getChartData()
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
  formData.goal = ""
  formData.chartData = ""
  formData.chartType = ""
  formData.genChart = ""
  formData.genResult = ""
}
//#endregion

//#region 删
const handleDelete = (row: Chart) => {
  ElMessageBox.confirm(`正在删除图表：${row.name}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteChartAPI({ id: row.id.toString() }).then(() => {
      ElMessage.success("删除成功")
      getChartData()
    })
  })
}
//#endregion

//#region 改
const currentUpdateId = ref<undefined | string>(undefined)
// const handleUpdate = (row: Chart) => {
//   currentUpdateId.value = row.id.toString()
//   formData.name = row.name
//   formData.chartType = row.chartType
//   // formData.chartData = row.chartData
//   formData.genChart = row.genChart
//   formData.genResult = row.genResult
//   formData.goal = row.goal
//   dialogVisible.value = true
// }
//#endregion

//#region 查
const tableData = ref<Chart[]>([])
const searchFormRef = ref<FormInstance | null>(null)
const searchData = reactive({
  name: "",
  goal: ""
})

const userStore = useUserStore()
const getChartData = () => {
  loading.value = true
  getChartDataAPI({
    current: paginationData.currentPage,
    pageSize: paginationData.pageSize,
    name: searchData.name || undefined,
    goal: searchData.goal || undefined,
    userId: userStore.userInfo.id
  })
    .then((res) => {
      paginationData.total = res.data.totalRow
      tableData.value = res.data.records
      console.log(tableData.value[0].chartData)
      // tableData.value.chartData.map((item) => {
      //
      // })
    })
    .catch(() => {
      tableData.value = []
    })
    .finally(() => {
      loading.value = false
    })
}

const handleSearch = () => {
  paginationData.currentPage === 1 ? getChartData() : (paginationData.currentPage = 1)
}
const resetSearch = () => {
  searchFormRef.value?.resetFields()
  searchData.name = ""
  searchData.goal = ""
  handleSearch()
}
const columns = ref([])
const formChartData = ref([])
const showChartData = (column: Array<string>, chartData: Array<Map<string, string>>) => {
  chartDataVisible.value = true
  columns.value = column.map((value) => ({
    key: value,
    dataKey: value,
    title: value,
    width: 700 / column.length
  }))
  formChartData.value = chartData
  console.log(columns)
  console.log(formChartData)
  // chartData.map((value, index, array) => {})
  // console.log(chartData[0])
  // chartData.at(0)?.forEach((value, key, _) => {
  //   console.log(value, key)
  //   const element = {
  //     key: `${key}`,
  //     dataKey: `${key}`,
  //     title: `${key}`,
  //     width: 150
  //   }
  //   columns.value.push(element)
  // })
  // formChartData.value = tableData.value.chartData
  // console.log(columns.value)
  // console.log(formChartData.value)
  // console.log(columns)
  // console.log(data)
}

// const generateColumns = (length = 10, prefix = "column-", props?: any) =>
//   Array.from({ length }).map((_, columnIndex) => ({
//     ...props,
//     key: `${prefix}${columnIndex}`,
//     dataKey: `${prefix}${columnIndex}`,
//     title: `Column ${columnIndex}`,
//     width: 150
//   }))
//
// const generateData = (columns: ReturnType<typeof generateColumns>, length = 200, prefix = "row-") =>
//   Array.from({ length }).map((_, rowIndex) => {
//     return columns.reduce(
//       (rowData, column, columnIndex) => {
//         rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`
//         return rowData
//       },
//       {
//         id: `${prefix}${rowIndex}`,
//         parentId: null
//       }
//     )
//   })
// const columns = generateColumns(10)
// const data = generateData(columns, 1000)

//#endregion
/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getChartData, { immediate: true })
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" class="search-wrapper" shadow="never">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item label="名称" prop="name">
          <el-input v-model="searchData.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="分析目标" prop="phone">
          <el-input v-model="searchData.goal" placeholder="请输入" />
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
          <el-button :icon="CirclePlus" type="primary" @click="dialogVisible = true">新增图表</el-button>
          <el-button :icon="Delete" type="danger">批量删除</el-button>
        </div>
        <div>
          <el-tooltip content="下载">
            <el-button :icon="Download" circle type="primary" />
          </el-tooltip>
          <el-tooltip content="刷新当前页">
            <el-button :icon="RefreshRight" circle type="primary" @click="getChartData" />
          </el-tooltip>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData">
          <el-table-column align="center" type="selection" width="50" />
          <el-table-column align="center" label="名称" prop="name" />
          <el-table-column align="center" label="目标" prop="goal" />
          <el-table-column align="center" label="图表数据">
            <template v-slot="scope">
              <el-button text @click="showChartData(scope.row.columns, scope.row.chartData)">
                点击查看图表数据
              </el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" label="图表类型" prop="chartType" />
          <el-table-column align="center" label="分析结果" prop="genResult">
            <template v-slot="scope">
              <div v-if="scope.row.status === 'succeed'">
                {{ scope.row.genResult }}
              </div>
              <div v-else-if="scope.row.status === 'failed'">
                <el-alert :closable="false" :title="scope.row.execMessage" type="error" />
              </div>
              <div v-else>
                <el-alert :closable="false" title="图表生成中" type="info" />
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="生成图表" width="500">
            <template v-slot="scope">
              <div v-if="scope.row.status === 'succeed'" style="height: 50vh">
                <v-chart :option="JSON.parse(scope.row.genChart)" autoresize />
              </div>
              <div v-else-if="scope.row.status === 'failed'">
                <el-alert :closable="false" :title="scope.row.execMessage" type="error" />
              </div>
              <div v-else>
                <el-alert :closable="false" title="图表生成中" type="info" />
              </div>
            </template>
          </el-table-column>

          <!--          <el-table-column prop="status" label="状态" align="center">-->
          <!--            <template #default="scope">-->
          <!--              <el-tag v-if="scope.row.status" type="success" effect="plain">启用</el-tag>-->
          <!--              <el-tag v-else type="danger" effect="plain">禁用</el-tag>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
          <!--          <el-table-column prop="createTime" label="创建时间" align="center" />-->
          <!--          <el-table-column prop="updateTime" label="更新时间" align="center" />-->
          <el-table-column align="center" fixed="right" label="操作" width="150">
            <template #default="scope">
              <!--              <el-button bg size="small" text type="primary" @click="handleUpdate(scope.row)">修改</el-button>-->
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
    <!--    图表数据-->
    <el-dialog v-model="chartDataVisible" center title="图表数据">
      <!--      <el-table :data="formChartData" style="width: 100%">-->
      <!--        <el-table-column v-for="key in columns" :label="key" :prop="key" />-->
      <!--      </el-table>-->

      <el-table-v2 :columns="columns" :data="formChartData" :height="400" :width="700" fixed />
    </el-dialog>

    <!-- 新增/修改 -->
    <el-dialog
      v-model="dialogVisible"
      :title="currentUpdateId === undefined ? '新增图表' : '修改图表'"
      width="30%"
      @close="resetForm"
    >
      <el-form ref="formRef" :model="formData" :rules="formRules" label-position="left" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="分析目标" prop="goal">
          <el-input v-model="formData.goal" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="图表数据" prop="chartData">
          <el-input v-model="formData.chartData" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="图表类型" prop="chartType">
          <el-input v-model="formData.chartType" placeholder="请输入" />
        </el-form-item>
        <el-form-item v-if="currentUpdateId !== undefined" label="生成图表" prop="genChart">
          <el-input v-model="formData.genChart" placeholder="请输入" />
        </el-form-item>
        <el-form-item v-if="currentUpdateId !== undefined" label="分析结果" prop="genResult">
          <el-input v-model="formData.genResult" placeholder="请输入" />
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

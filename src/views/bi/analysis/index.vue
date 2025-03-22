<script setup lang="ts">
import { computed, ref } from "vue"
import { ElMessage, UploadProps } from "element-plus"
import { genChartByAiAPI } from "@/api/BI"
import "echarts"

// provide(THEME_KEY, "dark")
defineOptions({
  // 命名当前组件
  name: "BIAnalysis"
})
const formData = ref({ name: "das", goal: "请帮我分析网站用户增长情况", chartType: "折线图" })

const options = [
  {
    value: "柱状图",
    label: "柱状图"
  },
  {
    value: "折线图",
    label: "折线图"
  },
  {
    value: "饼图",
    label: "饼图"
  },
  {
    value: "雷达图",
    label: "雷达图"
  },
  {
    value: "堆叠图",
    label: "堆叠图"
  }
]
const handleExceed: UploadProps["onExceed"] = (files) => {
  formData.value.chartData = files
}

const loading = ref(false)
const chartInfo = ref({})
const onSubmit = () => {
  loading.value = true
  genChartByAiAPI(formData.value)
    .then((res) => {
      ElMessage.success("智能分析成功")
      chartInfo.value = res.data
      chartInfo.value.genChart = JSON.parse(chartInfo.value.genChart)
    })
    .finally(() => {
      loading.value = false
    })
}

const fileList = ref([])
formData.value.file = computed(() => {
  return fileList.value[0]?.raw
})
</script>

<template>
  <div class="app-container">
    <div class="flex">
      <div class="w-2/5">
        <div style="margin: 10px" />
        <el-card class="box-card" header="智能分析">
          <el-form :label-position="'top'" label-width="100px" :model="formData" style="max-width: 460px">
            <el-form-item label="名称">
              <el-input v-model="formData.name" placeholder="请输入该分析名称" />
            </el-form-item>
            <el-form-item label="分析目标">
              <el-input v-model="formData.goal" placeholder="请输入分析目标" />
            </el-form-item>
            <el-form-item label="图表类型">
              <el-select v-model="formData.chartType" class="m-2" placeholder="请选择图表类型" size="large">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="图表数据">
              <el-upload
                v-model:file-list="fileList"
                limit="1"
                :auto-upload="false"
                :on-exceed="handleExceed"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                class="upload-demo"
                drag
                multiple
              >
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">拖拽上传 <em>点击上传</em></div>
                <template #tip>
                  <div class="el-upload__tip">大小小于10MB的xlsx文件,仅限上传一份</div>
                </template>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button :loading="loading" :disabled="loading" type="primary" @click="onSubmit">提交</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
      <div class="w-3/5 mr-4" style="margin: 10px">
        <el-card class="box-card" header="分析图表">
          <div>
            <div v-if="chartInfo.genChart" style="height: 50vh">
              <v-chart :option="chartInfo.genChart" autoresize />
            </div>
          </div>
        </el-card>
        <el-divider />
        <el-card class="box-card" header="分析结论">
          <div>{{ chartInfo.genResult }}</div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chart-container {
  width: 60%;
  height: 400px;
}
</style>

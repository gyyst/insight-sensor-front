<template>
  <div class="app-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>传感器推荐系统</span>
        </div>
      </template>
      <div class="card-content">
        <el-form :model="form" label-width="120px" class="recommendation-form">
          <el-form-item label="应用场景">
            <el-select v-model="form.scenario" placeholder="请选择应用场景" style="width: 100%">
              <el-option label="工业自动化" value="industrial" />
              <el-option label="机器人导航" value="robotics" />
              <el-option label="安防监控" value="security" />
              <el-option label="智能交通" value="traffic" />
              <el-option label="医疗设备" value="medical" />
            </el-select>
          </el-form-item>
          <el-form-item label="传感器类型">
            <el-radio-group v-model="form.sensorType">
              <el-radio label="laser">激光传感器</el-radio>
              <el-radio label="vision">视觉传感器</el-radio>
              <el-radio label="both">两者都需要</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="预算范围">
            <el-slider
              v-model="form.budget"
              :step="1000"
              :min="1000"
              :max="50000"
              :marks="budgetMarks"
              show-stops
            />
          </el-form-item>
          <el-form-item label="精度要求">
            <el-rate v-model="form.accuracy" :texts="accuracyTexts" show-text />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleRecommend">获取推荐</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>

        <el-divider v-if="recommendations.length > 0" content-position="center">推荐结果</el-divider>

        <div v-if="recommendations.length > 0" class="recommendation-results">
          <el-card v-for="(item, index) in recommendations" :key="index" class="recommendation-card">
            <template #header>
              <div class="recommendation-card-header">
                <span>{{ item.name }}</span>
                <el-tag :type="item.type === 'laser' ? 'success' : 'warning'">
                  {{ item.type === 'laser' ? '激光传感器' : '视觉传感器' }}
                </el-tag>
              </div>
            </template>
            <div class="recommendation-card-content">
              <p><strong>厂商:</strong> {{ item.manufacturer }}</p>
              <p><strong>型号:</strong> {{ item.model }}</p>
              <p><strong>价格:</strong> ¥{{ item.price.toLocaleString() }}</p>
              <p><strong>特点:</strong> {{ item.features }}</p>
              <p><strong>适用场景:</strong> {{ item.suitableScenarios }}</p>
              <div class="recommendation-card-footer">
                <el-button type="primary" size="small">查看详情</el-button>
                <el-button type="success" size="small">联系厂商</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue"
import ElMessage from "element-plus"

interface RecommendationForm {
  scenario: string
  sensorType: string
  budget: number
  accuracy: number
}

interface Recommendation {
  name: string
  type: string
  manufacturer: string
  model: string
  price: number
  features: string
  suitableScenarios: string
}

const form = reactive<RecommendationForm>({
  scenario: "",
  sensorType: "both",
  budget: 10000,
  accuracy: 3
})

const recommendations = ref<Recommendation[]>([])

const budgetMarks = {
  1000: "¥1,000",
  10000: "¥10,000",
  20000: "¥20,000",
  30000: "¥30,000",
  40000: "¥40,000",
  50000: "¥50,000"
}

const accuracyTexts = ["不重要", "一般", "标准", "较高", "极高"]

const handleRecommend = () => {
  if (!form.scenario) {
    ElMessage.warning("请选择应用场景")
    return
  }

  // 模拟推荐结果
  const mockRecommendations: Recommendation[] = []

  if (form.sensorType === "laser" || form.sensorType === "both") {
    mockRecommendations.push({
      name: "SICK LMS511",
      type: "laser",
      manufacturer: "SICK",
      model: "LMS511-20100",
      price: 18500,
      features: "高精度、长距离、全天候工作能力",
      suitableScenarios: "工业自动化、机器人导航、智能交通"
    })

    mockRecommendations.push({
      name: "Velodyne VLP-16",
      type: "laser",
      manufacturer: "Velodyne",
      model: "VLP-16",
      price: 32000,
      features: "360度扫描、高精度点云、多回波处理",
      suitableScenarios: "机器人导航、智能交通、测绘"
    })
  }

  if (form.sensorType === "vision" || form.sensorType === "both") {
    mockRecommendations.push({
      name: "Basler acA1920-40gc",
      type: "vision",
      manufacturer: "Basler",
      model: "acA1920-40gc",
      price: 8500,
      features: "高分辨率、高帧率、优秀的色彩还原",
      suitableScenarios: "工业检测、安防监控、医疗设备"
    })

    mockRecommendations.push({
      name: "FLIR Blackfly S",
      type: "vision",
      manufacturer: "FLIR",
      model: "BFS-U3-16S2C",
      price: 12000,
      features: "高灵敏度、低噪点、支持多种接口",
      suitableScenarios: "安防监控、医疗设备、科学研究"
    })
  }

  // 根据预算过滤
  const filteredRecommendations = mockRecommendations.filter(item => item.price <= form.budget)

  if (filteredRecommendations.length === 0) {
    ElMessage.info("没有找到符合您预算的传感器，请调整预算范围")
    return
  }

  recommendations.value = filteredRecommendations
  ElMessage.success("已为您推荐最适合的传感器")
}

const resetForm = () => {
  form.scenario = ""
  form.sensorType = "both"
  form.budget = 10000
  form.accuracy = 3
  recommendations.value = []
}
</script>

<style lang="scss" scoped>
.recommendation-form {
  max-width: 600px;
  margin: 0 auto;
}

.recommendation-results {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.recommendation-card {
  margin-bottom: 0;
}

.recommendation-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.recommendation-card-content {
  p {
    margin: 8px 0;
  }
}

.recommendation-card-footer {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
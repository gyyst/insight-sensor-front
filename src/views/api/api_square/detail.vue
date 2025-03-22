<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { getApiInfo, invokeOnlineApi } from "@/api/api"
import VueJsonPretty from "vue-json-pretty"
import "vue-json-pretty/lib/styles.css"

defineOptions({
  // 命名当前组件
  name: "api_detail"
})
const route = useRoute()
const apiInfo = ref([])
const invokeRes = ref("")
const apiId = ref("")
const invokeLoading = ref(false)

onMounted(() => {
  apiId.value = route.params.apiId.toString()
  getApiInfo(apiId.value).then((res) => {
    apiInfo.value = res.data
  })
})
const onlineInvoke = () => {
  invokeLoading.value = true
  invokeOnlineApi({
    /* */
    apiId: apiInfo.value.id,
    /* */
    requestParams: apiInfo.value.requestParams,
    /* */
    requestBody: apiInfo.value.requestBody,
    /* */
    requestHeader: apiInfo.value.requestHeader
  })
    .then((res) => {
      console.log(res.data)
      invokeRes.value = res.data.responseBody
      console.log(invokeRes.value)
    })
    .finally(() => (invokeLoading.value = false))

  // console.log(toJSONString(apiInfo.value))
}
</script>

<template>
  <el-card>
    <el-descriptions :column="2" border direction="horizontal" size="large" title="api详情">
      <el-descriptions-item label="apiId">{{ apiInfo?.id }}</el-descriptions-item>
      <el-descriptions-item label="名称">{{ apiInfo?.name }}</el-descriptions-item>
      <el-descriptions-item label="描述">{{ apiInfo?.description }}</el-descriptions-item>
      <el-descriptions-item label="协议头">{{ apiInfo?.protocolHeader }}</el-descriptions-item>
      <el-descriptions-item label="请求方法">{{ apiInfo?.method }}</el-descriptions-item>
      <el-descriptions-item label="每千次调用价格">{{ apiInfo?.price }}</el-descriptions-item>

      <!--      <el-descriptions-item :span="2" label="Place">Suzhou</el-descriptions-item>-->
      <!--      <el-descriptions-item label="Remarks">-->
      <!--        <el-tag size="small">School</el-tag>-->
      <!--      </el-descriptions-item>-->
      <!--      <el-descriptions-item label="Address"-->
      <!--        >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province-->
      <!--      </el-descriptions-item>-->
    </el-descriptions>
    <el-descriptions :column="1" border direction="horizontal" size="large" title="详细参数">
      <el-descriptions-item v-if="apiInfo.requestParams !== null" label="requestParams">
        <el-table :data="apiInfo?.requestParams" lazy row-key="name">
          <el-table-column label="参数名" prop="name" width="180" />
          <el-table-column label="描述" prop="description" width="180" />
          <el-table-column label="数据类型" prop="dataType" width="180" />
          <el-table-column label="是否必须" prop="isNeed" width="180" />
          <el-table-column label="在线调用值" width="180">
            <template #default="scope">
              <el-input v-show="scope.row.children === null" v-model="scope.row.value" placeholder="Please input" />
            </template>
          </el-table-column>
        </el-table>
      </el-descriptions-item>
      <el-descriptions-item v-if="apiInfo.requestBody !== null" label="requestBody">
        <el-table :data="apiInfo?.requestBody" :show-header="false" lazy row-key="name">
          <el-table-column label="参数名" prop="name" width="180" />
          <el-table-column label="描述" prop="description" width="180" />
          <el-table-column label="数据类型" prop="dataType" width="180" />
          <el-table-column label="是否必须" prop="isNeed" width="180" />
          <el-table-column label="在线调用值" width="180">
            <template #default="scope">
              <el-input v-show="scope.row.children === null" v-model="scope.row.value" placeholder="Please input" />
            </template>
          </el-table-column>
        </el-table>
      </el-descriptions-item>
      <el-descriptions-item v-if="apiInfo.requestHeader !== null" label="requestHeader">
        <el-table :data="apiInfo?.requestHeader" :show-header="false" lazy row-key="name">
          <el-table-column label="参数名" prop="name" width="180" />
          <el-table-column label="描述" prop="description" width="180" />
          <el-table-column label="数据类型" prop="dataType" width="180" />
          <el-table-column label="是否必须" prop="isNeed" width="180" />
          <el-table-column label="在线调用值" width="180">
            <template #default="scope">
              <el-input v-show="scope.row.children === null" v-model="scope.row.value" placeholder="Please input" />
            </template>
          </el-table-column>
        </el-table>
      </el-descriptions-item>
      <el-descriptions-item v-if="apiInfo.responseBody !== null" label="responseBody">
        <el-table :data="apiInfo?.responseBody" :show-header="false" lazy row-key="name">
          <el-table-column label="参数名" prop="name" width="180" />
          <el-table-column label="描述" prop="description" width="180" />
          <el-table-column label="数据类型" prop="dataType" width="180" />
          <el-table-column label="是否必须" prop="isNeed" width="180" />
        </el-table>
      </el-descriptions-item>
      <el-descriptions-item v-if="apiInfo.responseHeader !== null" label="responseHeader">
        <el-table :data="apiInfo?.responseHeader" :show-header="false" lazy row-key="name">
          <el-table-column label="参数名" prop="name" width="180" />
          <el-table-column label="描述" prop="description" width="180" />
          <el-table-column label="数据类型" prop="dataType" width="180" />
          <el-table-column label="是否必须" prop="isNeed" width="180" />
        </el-table>
      </el-descriptions-item>
      <el-descriptions-item label="在线调用">
        <el-button plain size="large" type="primary" @click="onlineInvoke">在线调用</el-button>
      </el-descriptions-item>
    </el-descriptions>
    <br />
    <el-card v-if="invokeRes" v-loading="invokeLoading" header="调用结果">
      <vue-json-pretty :data="invokeRes" />
    </el-card>
  </el-card>
</template>

<style lang="scss" scoped>
.el-descriptions {
  margin-top: 20px;
}
</style>

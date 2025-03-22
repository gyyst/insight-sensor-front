<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { addApi, invokeOnlineApi } from "@/api/api"
import "vue-json-pretty/lib/styles.css"
import { types } from "sass"
import JsonEditorVue from "json-editor-vue3"
import { ElMessage } from "element-plus"
import List = types.List

defineOptions({
  // 命名当前组件
  name: "api_upload"
})
const options = ref({
  search: false,
  history: false
})
const modeList = ref(["text", "view", "tree", "code", "form"]) // 可选模式
export interface DataInfo {
  /* */
  name: string

  /* */
  description: string

  /*可用值:INTEGER,LONG,STRING,OBJECT */
  dataType: string

  /* */
  isNeed: boolean

  children: List<DataInfo>
}

const route = useRoute()
const example = ref([
  {
    name: "echoBody",
    description: "放在requestBody中",
    dataType: "OBJECT",
    isNeed: true,
    children: [
      {
        name: "echo",
        description: "echo",
        dataType: "STRING",
        isNeed: true,
        children: null
      },
      {
        name: "echo2",
        description: "echo",
        dataType: "STRING",
        isNeed: true,
        children: null
      },
      {
        name: "echo3",
        description: "echo",
        dataType: "STRING",
        isNeed: true,
        children: null
      },
      {
        name: "echo4",
        description: "echo",
        dataType: "OBJECT",
        isNeed: true,
        children: [
          {
            name: "echo5",
            description: "echo",
            dataType: "INTEGER",
            isNeed: true,
            children: null
          }
        ]
      }
    ]
  },
  {
    name: "echo",
    description: "echo",
    dataType: "STRING",
    isNeed: true,
    children: null
  },
  {
    name: "echo3",
    description: "echo",
    dataType: "STRING",
    isNeed: true,
    children: null
  }
])
const apiInfo = ref({
  protocolHeader: "HTTP",
  method: "POST",
  price: 0,
  path: "/",
  requestParams: [
    {
      name: "",
      description: "",
      dataType: "STRING",
      isNeed: true,
      children: null
    }
  ],
  requestBody: [
    {
      name: "",
      description: "",
      dataType: "STRING",
      isNeed: true,
      children: null
    }
  ],
  requestHeader: [
    {
      name: "",
      description: "",
      dataType: "STRING",
      isNeed: true,
      children: null
    }
  ],
  responseBody: [
    {
      name: "",
      description: "",
      dataType: "STRING",
      isNeed: true,
      children: null
    }
  ],
  responseHeader: [
    {
      name: "",
      description: "",
      dataType: "STRING",
      isNeed: true,
      children: null
    }
  ]
})
const invokeRes = ref("")
const apiId = ref("")
const invokeLoading = ref(false)
const buttonLoading = ref(false)
onMounted(() => {
  // apiId.value = route.params.apiId.toString()
  // getApiInfo(apiId.value).then((res) => {
  //   apiInfo.value = res.data
  // })
})
const handleData = () => {
  console.log(apiInfo.value)
  buttonLoading.value = true
  addApi({
    name: apiInfo.value.name,
    description: apiInfo.value.description,
    protocolHeader: apiInfo.value.protocolHeader,
    host: apiInfo.value.host,
    price: apiInfo.value.price,
    port: apiInfo.value.port,
    path: apiInfo.value.path,
    method: apiInfo.value.method,
    requestParams: apiInfo.value.requestParams,
    requestBody: apiInfo.value.requestBody,
    requestHeader: apiInfo.value.requestHeader,
    responseBody: apiInfo.value.responseBody,
    responseHeader: apiInfo.value.responseHeader
  })
    .then((res) => {
      ElMessage.success("新增成功")
    })
    .finally(() => {
      buttonLoading.value = false
    })
}
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
const protocolHeader = [
  {
    value: "HTTP",
    label: "HTTP"
  },
  {
    value: "HTTPS",
    label: "HTTPS"
  }
]
const method = [
  {
    value: "GET",
    label: "GET"
  },
  {
    value: "POST",
    label: "POST"
  },
  {
    value: "PUT",
    label: "PUT"
  },
  {
    value: "DELETE",
    label: "DELETE"
  }
]
</script>

<template>
  <el-card>
    <el-descriptions :column="2" border direction="horizontal" size="large" title="api详情">
      <el-descriptions-item label="名称">
        <el-input v-model="apiInfo.name" autosize placeholder="请输入" />
      </el-descriptions-item>
      <el-descriptions-item label="描述">
        <el-input v-model="apiInfo.description" placeholder="请输入" />
      </el-descriptions-item>
      <el-descriptions-item label="协议头">
        <el-select v-model="apiInfo.protocolHeader" placeholder="Select">
          <el-option v-for="item in protocolHeader" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item label="域名">
        <el-input v-model="apiInfo.host" placeholder="请输入" />
      </el-descriptions-item>
      <el-descriptions-item label="端口">
        <el-input v-model="apiInfo.port" placeholder="请输入" />
      </el-descriptions-item>
      <el-descriptions-item label="路径">
        <el-input v-model="apiInfo.path" placeholder="请输入" />
      </el-descriptions-item>
      <el-descriptions-item label="请求方法">
        <el-select v-model="apiInfo.method" placeholder="Select">
          <el-option v-for="item in method" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item label="每千次调用价格">
        <el-input-number v-model="apiInfo.price" />
        <el-button :loading="buttonLoading" plain style="float: right; right: 100px" type="primary" @click="handleData"
          >提交
        </el-button>
      </el-descriptions-item>

      <!--      <el-descriptions-item :span="2" label="Place">Suzhou</el-descriptions-item>-->
      <!--      <el-descriptions-item label="Remarks">-->
      <!--        <el-tag size="small">School</el-tag>-->
      <!--      </el-descriptions-item>-->
      <!--      <el-descriptions-item label="Address"-->
      <!--        >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province-->
      <!--      </el-descriptions-item>-->
    </el-descriptions>
    <el-descriptions :column="1" border direction="horizontal" size="large" title="详细参数">
      <el-descriptions-item label="参考示例">
        <json-editor-vue v-model="example" :modeList="modeList" class="editor" currentMode="text" options="options" />
      </el-descriptions-item>
      <el-descriptions-item v-if="apiInfo.requestParams !== null" label="requestParams">
        <json-editor-vue
          v-model="apiInfo.requestParams"
          :modeList="modeList"
          :options="options"
          class="editor"
          currentMode="code"
        />
      </el-descriptions-item>
      <el-descriptions-item v-if="apiInfo.requestBody !== null" label="requestBody">
        <!--        <el-form ref="formRef" :model="dynamicValidateForm">-->
        <!--          <el-form-item-->
        <!--            v-for="(domain, index) in dynamicValidateForm.domains"-->
        <!--            :key="domain.name"-->
        <!--            :label="'Domain' + index"-->
        <!--            :prop="'domains.' + index + '.value'"-->
        <!--          >-->
        <!--            <el-form label-position="right" label-width="100px" style="max-width: 460px">-->
        <!--              <el-form-item label="name">-->
        <!--                <el-input v-model="domain.name" />-->
        <!--              </el-form-item>-->
        <!--              <el-form-item label="description">-->
        <!--                <el-input v-model="domain.description" />-->
        <!--              </el-form-item>-->
        <!--              <el-form-item label="dataType">-->
        <!--                <el-input v-model="domain.dataType" />-->
        <!--              </el-form-item>-->
        <!--              <el-form-item label="isNeed">-->
        <!--                <el-input v-model="domain.isNeed" />-->
        <!--              </el-form-item>-->
        <!--              <el-form-item label="children">-->
        <!--                <el-button v-if="!domain.children" @click="addNode(domain.children)">New domain</el-button>-->
        <!--                <el-form v-model="domain.children" label-position="right" label-width="100px" style="max-width: 460px">-->
        <!--                  <el-form-item v-for="child in domain.children" :key="child.name">-->
        <!--                    <el-button @click="addNode(child.children)">New domain</el-button>-->
        <!--                  </el-form-item>-->
        <!--                </el-form>-->
        <!--              </el-form-item>-->
        <!--            </el-form>-->

        <!--            <el-button class="mt-2" @click.prevent="removeDomain(domain)">Delete</el-button>-->
        <!--          </el-form-item>-->
        <!--          <el-form-item>-->
        <!--            <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>-->
        <!--            <el-button @click="addDomain(dynamicValidateForm)">New domain</el-button>-->
        <!--            <el-button @click="resetForm(formRef)">Reset</el-button>-->
        <!--          </el-form-item>-->
        <!--        </el-form>-->
        <json-editor-vue
          v-model="apiInfo.requestBody"
          :modeList="modeList"
          :options="options"
          class="editor"
          currentMode="code"
        />
      </el-descriptions-item>
      <el-descriptions-item v-if="apiInfo.requestHeader !== null" label="requestHeader">
        <json-editor-vue
          v-model="apiInfo.requestHeader"
          :modeList="modeList"
          :options="options"
          class="editor"
          currentMode="code"
        />
      </el-descriptions-item>
      <el-descriptions-item v-if="apiInfo.responseBody !== null" label="responseBody">
        <json-editor-vue
          v-model="apiInfo.responseBody"
          :modeList="modeList"
          :options="options"
          class="editor"
          currentMode="code"
        />
      </el-descriptions-item>
      <el-descriptions-item v-if="apiInfo.responseHeader !== null" label="responseHeader">
        <json-editor-vue
          v-model="apiInfo.responseHeader"
          :modeList="modeList"
          :options="options"
          class="editor"
          currentMode="code"
        />
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<style lang="scss" scoped>
.el-descriptions {
  margin-top: 20px;
}
</style>

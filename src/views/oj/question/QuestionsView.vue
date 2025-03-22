<template>
  <div id="questionsView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="title" label="名称" style="min-width: 240px">
        <a-input v-model="searchParams.title" placeholder="请输入名称" />
      </a-form-item>
      <a-form-item field="tags" label="标签" style="min-width: 240px">
        <a-input-tag v-model="searchParams.tag" placeholder="请输入标签" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">提交</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total
      }"
      @page-change="onPageChange"
    >
      <template #tag="{ record }">
        <a-space wrap>
          <a-tag v-for="(tag, index) of record.tag" :key="index" color="green">{{ tag }}</a-tag>
        </a-space>
      </template>
      <template #acceptedRate="{ record }">
        {{
          `${record.submitNum ? (record.acceptedNum / record.submitNum) * 100 : "0"}% (${record.acceptedNum}/${
            record.submitNum
          })`
        }}
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="toQuestionPage(record.id)"> 做题</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watchEffect } from "vue"
import { useRouter } from "vue-router"
import moment from "moment"
import { listPreviewQuestionByPage } from "@/api/oj"

const tableRef = ref()

const dataList = ref([])
const total = ref(0)
// const searchParams = ref<QuestionQueryRequest>({
//   title: "",
//   tags: [],
//   pageSize: 8,
//   current: 1
// })
const searchParams = ref({
  title: "",
  tag: [],
  pageSize: 10,
  current: 1
})
const loadData = async () => {
  await listPreviewQuestionByPage(searchParams.value).then((res) => {
    dataList.value = res.data.records
    // dataList.value.forEach((item) => {
    //   item.judgeConfig = toJSONString(item.judgeConfig)
    //   item.judgeCase = toJSONString(item.judgeCase)
    // })
    total.value = res.data.totalRow
  })
}

/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData()
})

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData()
})

// {id: "1", title: "A+ D", content: "新的题目内容", tags: "["二叉树"]", answer: "新的答案", submitNum: 0,…}

const columns = [
  {
    title: "题号",
    dataIndex: "id"
  },
  {
    title: "题目名称",
    dataIndex: "title"
  },
  {
    title: "标签",
    slotName: "tag"
  },
  {
    title: "通过率",
    slotName: "acceptedRate"
  },
  {
    title: "创建时间",
    slotName: "createTime"
  },
  {
    slotName: "optional"
  }
]

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page
  }
}

const router = useRouter()

/**
 * 跳转到做题页面
 * @param question
 */
const toQuestionPage = (question) => {
  router.push({
    path: `/oj/view/question`,
    query: {
      id: question
    }
  })
}

/**
 * 确认搜索，重新加载数据
 */
const doSubmit = () => {
  // 这里需要重置搜索页号
  searchParams.value = {
    ...searchParams.value,
    current: 1
  }
}
</script>

<style scoped>
#questionsView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>

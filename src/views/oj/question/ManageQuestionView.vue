<template>
  <div id="manageQuestionView">
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
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)"> 修改</a-button>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watchEffect } from "vue"
import { useRouter } from "vue-router"
import { deleteQuestion, listQuestionByPage } from "@/api/oj"
import message from "@arco-design/web-vue/es/message"
import { toJSONString } from "xe-utils"

const tableRef = ref()

const dataList = ref([])
const total = ref(0)
const searchParams = ref({
  pageSize: 10,
  current: 1
})

const loadData = async () => {
  listQuestionByPage(searchParams.value).then((res) => {
    dataList.value = res.data.records
    dataList.value.forEach((item) => {
      item.judgeConfig = toJSONString(item.judgeConfig)
      item.judgeCase = toJSONString(item.judgeCase)
    })
    total.value = res.data.totalRow
  })
  // if (res.code === 0) {

  // } else {
  //   message.error("加载失败，" + res.message)
  // }
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
    title: "id",
    dataIndex: "id"
  },
  {
    title: "标题",
    dataIndex: "title"
  },
  {
    title: "内容",
    dataIndex: "content"
  },
  {
    title: "标签",
    dataIndex: "tag"
  },
  {
    title: "答案",
    dataIndex: "answer"
  },
  {
    title: "提交数",
    dataIndex: "submitNum"
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum"
  },
  {
    title: "判题配置",
    dataIndex: "judgeConfig"
  },
  {
    title: "判题用例",
    dataIndex: "judgeCase"
  },
  {
    title: "用户id",
    dataIndex: "uploader"
  },
  // {
  //   title: "创建时间",
  //   dataIndex: "createTime"
  // },
  {
    title: "操作",
    slotName: "optional"
  }
]

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page
  }
}

const doDelete = async (question) => {
  await deleteQuestion({ id: question.id }).then(() => {
    message.success("删除成功")
    loadData()
  })
}

const router = useRouter()

const doUpdate = (question) => {
  router.push({
    path: "/oj/update/question",
    query: {
      id: question.id
    }
  })
}
</script>

<style scoped>
#manageQuestionView {
}
</style>

<template>
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question" @tab-click="loadSubmitList">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question.title">
              <a-descriptions :column="{ xs: 1, md: 2, lg: 3 }" title="判题条件">
                <a-descriptions-item label="时间限制">
                  {{ question.judgeConfig[0].timeLimit ?? 0 }}ms
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question.judgeConfig[0].memoryLimit ?? 0 }}KB
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question.judgeConfig[0].stackLimit ?? 0 }}KB
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="question.content || ''" style="calc(100vh - 200px)" />
              <template #extra>
                <a-space wrap>
                  <a-tag v-for="(tag, index) of question.tag" :key="index" color="green">{{ tag }}</a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" disabled title="评论"> 评论区</a-tab-pane>
          <a-tab-pane key="answer" title="答案"> 暂时无法查看答案</a-tab-pane>
          <a-tab-pane key="submit" title="提交记录">
            <a-table :columns="columns" :data="submitList" :pagination="false" :virtual-list-props="{ height: 400 }" />
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline">
          <a-form-item field="language" label="编程语言" style="min-width: 240px">
            <a-select v-model="form.language" :style="{ width: '320px' }" placeholder="选择编程语言">
              <a-option v-for="item of languageOption" :label="item.label" :value="item" />
            </a-select>
          </a-form-item>
        </a-form>
        <CodeEditor :handle-change="changeCode" :language="form.language.label" :value="form.judgeCode as string" />
        <a-divider size="0" />
        <a-button style="min-width: 200px" type="primary" @click="doSubmit"> 提交代码</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue"
import message from "@arco-design/web-vue/es/message"
import { doQuestionSubmit, getQuestionById, listQuestionSubmit } from "@/api/oj"
import CodeEditor from "@/layout/basic/components/CodeEditor.vue"
import { useRoute } from "vue-router"
import MdViewer from "@/layout/basic/components/MdViewer.vue"

// interface Props {
//   id: number
// }
//
// const props = withDefaults(defineProps<Props>(), {
//   id: () => 0
// })

const question = ref({
  title: "",
  tag: [],
  answer: "",
  content: "",
  difficulty: "easy",
  judgeConfig: [
    {
      memoryLimit: 1000,
      stackLimit: 1000,
      timeLimit: 1000
    }
  ],
  judgeCase: [
    {
      input: "",
      output: ""
    }
  ]
})

const languageOption = ref([
  {
    value: "JAVA",
    label: "java"
  }
])

const submitList = ref([])

const columns = [
  {
    title: "语言",
    dataIndex: "language",
    filterable: {
      filters: [
        {
          text: "JAVA",
          value: "JAVA"
        }
      ],
      filter: (value, record) => (record.language = value),
      multiple: true
    }
  },
  {
    title: "判题信息",
    dataIndex: "judgeInfo.message"
  },
  {
    title: "使用内存（KB）",
    dataIndex: "judgeInfo.memory"
  },
  {
    title: "运行时间（ms）",
    dataIndex: "judgeInfo.time"
  },
  {
    title: "提交状态",
    dataIndex: "status"
  },
  {
    title: "提交时间",
    dataIndex: "createTime"
  }
]
const loadSubmitList = async (key: string) => {
  console.log(key)
  if (key === "submit") {
    await listQuestionSubmit({
      questionId: question.value.id
    }).then((res) => {
      submitList.value = res.data
    })
  }
}

const route = useRoute()
const loadData = async () => {
  console.log(route.query.id)
  await getQuestionById(route.query.id as any).then((res) => {
    question.value = res.data
  })
}
const form = ref({
  language: {
    value: "JAVA",
    label: "Java"
  },
  judgeCode: ""
})

/**
 * 提交代码
 */
const doSubmit = async () => {
  if (!question.value?.id) {
    return
  }

  await doQuestionSubmit({
    language: form.value.language.value,
    judgeCode: form.value.judgeCode,
    questionId: question.value.id
  }).then(() => {
    message.success("提交成功")
  })
}

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData()
})

const changeCode = (value: string) => {
  form.value.judgeCode = value
}
</script>

<style>
#viewQuestionView {
  max-width: 1400px;
  margin: 0 auto;
}

#viewQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>

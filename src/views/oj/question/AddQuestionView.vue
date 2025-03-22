<script lang="ts" setup>
import { onMounted, ref } from "vue"
import MdEditor from "@/layout/basic/components/MdEditor.vue"
import { addQuestionAPI, getQuestionById, updateQuestion } from "@/api/oj"
import message from "@arco-design/web-vue/es/message"
import { useRoute } from "vue-router"

const difficultyOptions = [
  {
    value: "EASY",
    label: "简单"
  },
  {
    value: "MEDIUM",
    label: "中等"
  },
  {
    value: "HARD",
    label: "困难"
  }
]
const form = ref({
  title: "",
  tag: [],
  answer: "",
  content: "",
  difficulty: difficultyOptions[0].value,
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

/**
 * 新增判题用例
 */
const handleAddCase = () => {
  form.value.judgeCase.push({
    input: "",
    output: ""
  })
}
const handleAddConfig = () => {
  form.value.judgeConfig.push({
    timeLimit: 0,
    memoryLimit: 0,
    stackLimit: 0
  })
}

/**
 * 删除判题用例
 */
const handleDeleteCase = (index: number) => {
  form.value.judgeCase.splice(index, 1)
}
/**
 * 删除判题配置
 */
const handleDeleteConfig = (index: number) => {
  form.value.judgeConfig.splice(index, 1)
}
const doSubmit = async () => {
  console.log(form.value)
  if (!updatePage.value) {
    //@ts-ignore
    await addQuestionAPI({
      answer: form.value.answer,
      content: form.value.content,
      difficulty: form.value.difficulty,
      judgeCase: form.value.judgeCase,
      judgeConfig: form.value.judgeConfig,
      tag: form.value.tag,
      title: form.value.title
    }).then(() => {
      message.success("添加成功")
      //@ts-ignore
      form.value = {
        answer: "",
        content: "",
        difficulty: "",
        judgeConfig: [
          {
            memoryLimit: null,
            stackLimit: null,
            timeLimit: null
          }
        ],
        judgeCase: [
          {
            input: "",
            output: ""
          }
        ],
        tag: null,
        title: ""
      }
    })
  } else {
    //@ts-ignore
    await updateQuestion({
      id: route.query.id,
      answer: form.value.answer,
      content: form.value.content,
      difficulty: form.value.difficulty,
      judgeCase: form.value.judgeCase,
      judgeConfig: form.value.judgeConfig,
      tag: form.value.tag,
      title: form.value.title
    }).then(() => {
      message.success("更新成功")
    })
  }
}
const onContentChange = (value: string) => {
  form.value.content = value
}

const onAnswerChange = (value: string) => {
  form.value.answer = value
}

//update region

const route = useRoute()
// 如果页面地址包含 update，视为更新页面
const updatePage = ref(route.path.includes("update"))

/**
 * 根据题目 id 获取老的数据
 */
const loadData = async () => {
  const id = route.query.id
  if (!id) {
    form.value = {
      title: "",
      tag: [],
      answer: "",
      content: "",
      difficulty: difficultyOptions[0].value,
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
    }
    return null
  }
  await getQuestionById(id).then((res) => {
    form.value = res.data
    if (!form.value.judgeCase) {
      form.value.judgeCase = [
        {
          input: "",
          output: ""
        }
      ]
    }
    if (!form.value.judgeConfig) {
      form.value.judgeConfig = [
        {
          memoryLimit: 1000,
          stackLimit: 1000,
          timeLimit: 1000
        }
      ]
    }
    if (!form.value.tag) {
      form.value.tag = []
    }
  })
}

onMounted(() => {
  loadData()
})
</script>
<template>
  <div id="AddQuestionView">
    <h2 v-if="!updatePage" style="text-align: center">创建题目</h2>
    <h2 v-else style="text-align: center">更新题目</h2>
    <a-form :model="form" label-align="right" layout="horizontal">
      <a-form-item field="title" label="标题">
        <a-input v-model="form.title" placeholder="请输入标题" />
      </a-form-item>
      <a-form-item field="tag" label="标签">
        <a-input-tag v-model="form.tag" allow-clear placeholder="输入标签" />
      </a-form-item>
      <a-form-item field="difficulty" label="难度">
        <a-select v-model="form.difficulty" :style="{ width: '320px' }">
          <a-option
            v-for="item in difficultyOptions"
            :key="item.value"
            v-model="form.difficulty"
            :label="item.label"
            :value="item.value"
          />
        </a-select>
      </a-form-item>
      <a-form-item field="content" label="内容">
        <MdEditor :handle-change="onContentChange" :value="form.content" />
      </a-form-item>
      <a-form-item field="answer" label="答案">
        <MdEditor :handle-change="onAnswerChange" :value="form.answer" />
      </a-form-item>
      <a-form-item :content-flex="false" :merge-props="false" label="判题配置">
        <a-space direction="vertical" style="min-width: 640px">
          <a-form-item v-for="(judgeConfigItem, index) of form.judgeConfig" :key="index" no-style>
            <a-space direction="vertical" style="min-width: 640px">
              <a-form-item
                :key="index"
                :field="`form.judgeConfig[${index}].timeLimit`"
                :label="`时间限制(ms)-${index}`"
              >
                <a-input-number v-if="!updatePage" v-model="judgeConfigItem.timeLimit" :min="1" default-value="1000" />
                <a-input v-else v-model="judgeConfigItem.timeLimit" />
              </a-form-item>
              <a-form-item
                :key="index"
                :field="`form.judgeConfig[${index}].memoryLimit`"
                :label="`内存限制(KB)-${index}`"
              >
                <a-input-number
                  v-if="!updatePage"
                  v-model="judgeConfigItem.memoryLimit"
                  :min="1"
                  default-value="1000"
                />
                <a-input v-else v-model="judgeConfigItem.memoryLimit" />
              </a-form-item>
              <a-form-item
                :key="index"
                :field="`form.judgeConfig[${index}].stackLimit`"
                :label="`堆栈限制(KB)-${index}`"
              >
                <a-input-number v-if="!updatePage" v-model="judgeConfigItem.stackLimit" :min="1" default-value="1000" />
                <a-input v-else v-model="judgeConfigItem.stackLimit" />
              </a-form-item>
              <a-button status="danger" @click="handleDeleteConfig(index)"> 删除</a-button>
            </a-space>
            <div style="margin-top: 32px">
              <a-button status="success" type="outline" @click="handleAddConfig">新增判题配置</a-button>
            </div>
          </a-form-item>
          <!--          <a-form-item field="judgeConfig.timeLimit" label="时间限制(ms)">-->
          <!--            <a-input-number v-model="form.judgeConfig.timeLimit" :min="1" default-value="1000" />-->
          <!--          </a-form-item>-->
          <!--          <a-form-item field="judgeConfig.memoryLimit" label="内存限制(KB)">-->
          <!--            <a-input-number v-model="form.judgeConfig.memoryLimit" :min="1" default-value="1000" />-->
          <!--          </a-form-item>-->
          <!--          <a-form-item field="judgeConfig.stackLimit" label="堆栈限制(KB)">-->
          <!--            <a-input-number v-model="form.judgeConfig.stackLimit" :min="1" default-value="1000" />-->
          <!--          </a-form-item>-->
        </a-space>
      </a-form-item>
      <a-form-item :content-flex="false" :merge-props="false" label="测试用例配置">
        <a-form-item v-for="(judgeCaseItem, index) of form.judgeCase" :key="index" no-style>
          <a-space direction="vertical" style="min-width: 640px">
            <a-form-item :key="index" :field="`form.judgeCase[${index}].input`" :label="`输入用例-${index}`">
              <a-input v-model="judgeCaseItem.input" placeholder="请输入测试输入用例" />
            </a-form-item>
            <a-form-item :key="index" :field="`form.judgeCase[${index}].output`" :label="`输出用例-${index}`">
              <a-input v-model="judgeCaseItem.output" placeholder="请输入测试输出用例" />
            </a-form-item>
            <a-button status="danger" @click="handleDeleteCase(index)"> 删除</a-button>
          </a-space>
        </a-form-item>
        <div style="margin-top: 32px">
          <a-button status="success" type="outline" @click="handleAddCase">新增测试用例</a-button>
        </div>
      </a-form-item>
      <a-form-item>
        <a-button style="min-width: 200px" type="primary" @click="doSubmit">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="scss" scoped>
#AddQuestionView {
  flex: auto;
}
</style>

<template>
  <div id="code-editor" ref="codeEditorRef" style="min-height: 400px" />
  <!--  {{ value }}-->
  <!--  <a-button @click="fillValue">填充值</a-button>-->
</template>

<script lang="ts" setup>
import * as monaco from "monaco-editor"
import { defineProps, onMounted, ref, toRaw, watch, withDefaults } from "vue"

const codeEditorRef = ref()
const codeEditor = ref()
// const value = ref("hello world")
// const fillValue = () => {
//   if (!codeEditor.value) {
//     return
//   }
//   // 改变值
//   toRaw(codeEditor.value).setValue("新的值")
// }

interface Props {
  value: string
  language: string
  handleChange: (v: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  language: () => "java",
  handleChange: () => {}
})
watch(
  () => props.language,
  () => {
    if (codeEditor.value) {
      monaco.editor.setModelLanguage(toRaw(codeEditor.value).getModel(), props.language)
    }
  }
)

onMounted(() => {
  if (!codeEditorRef.value) {
    return
  }
  // Hover on each property to see its docs!
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: "java",
    automaticLayout: true,
    colorDecorators: true,
    minimap: {
      enabled: true
    },
    readOnly: false,
    theme: "vs-dark"
    // lineNumbers: "off",
    // roundedSelection: false,
    // scrollBeyondLastLine: false,
  })

  // 编辑 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue())
    // console.log("目前内容为：", toRaw(codeEditor.value).getValue())
  })
})
</script>

<style scoped></style>

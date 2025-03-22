<script lang="ts" setup>
import CodeEditor from "@/layout/basic/components/CodeEditor.vue"
import { ref } from "vue"

const value = ref("")
const onChange = (v: string) => {
  // console.log(v)
  // value.value = value.value + v + "a"
}
</script>

<template>
  <!--  <MonacoEditor />-->
  <CodeEditor :handle-change="onChange" :value="value" />
</template>

<style lang="scss" scoped></style>

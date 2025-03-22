<script lang="ts" setup>
import { onMounted, ref } from "vue"
import MdEditor from "@/layout/basic/components/MdEditor.vue"

onMounted(() => {})
const mdValue = ref()

const onMdChange = (v: string) => {
  mdValue.value = v
}
</script>

<template>
  <div class="home">
    <MdEditor :handle-change="onMdChange" :value="mdValue" />
  </div>
</template>

<style lang="scss" scoped>
.home {
}
</style>

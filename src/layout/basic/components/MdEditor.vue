<!--<script lang="ts" setup>-->
<!--import gfm from "@bytemd/plugin-gfm"-->
<!--import highlight from "@bytemd/plugin-highlight"-->
<!--import { defineProps, ref, withDefaults } from "vue"-->
<!--import { Editor } from "@bytemd/vue-next"-->

<!--/**-->
<!-- * 定义组件类型-->
<!-- */-->
<!--interface Props {-->
<!--  value: string-->
<!--  handleChange: (v: string) => void-->
<!--}-->

<!--const props = withDefaults(defineProps<Props>(), {-->
<!--  value: () => "",-->
<!--  handleChange: () => {}-->
<!--})-->
<!--const plugins = [-->
<!--  gfm(),-->
<!--  highlight()-->
<!--  // Add more plugins here-->
<!--]-->
<!--const value = ref("")-->

<!--const handleChange = (v: string) => {-->
<!--  value.value = v-->
<!--}-->
<!--</script>-->

<!--<template>-->
<!--  <Editor :plugins="plugins" :value="value" @change="handleChange" />-->
<!--</template>-->

<!--<style lang="scss" scoped>-->
<!--.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {-->
<!--  display: none;-->
<!--}-->
<!--</style>-->
<template>
  <Editor :mode="mode" :plugins="plugins" :value="value" @change="handleChange" />
</template>

<script lang="ts" setup>
import gfm from "@bytemd/plugin-gfm"
import highlight from "@bytemd/plugin-highlight"
import { Editor } from "@bytemd/vue-next"
import { defineProps, ref, withDefaults } from "vue"

/**
 * 定义组件属性类型
 */
interface Props {
  value: ref<string>
  mode?: string
  handleChange: (v: string) => void
}

const plugins = [
  gfm(),
  highlight()
  // Add more plugins here
]

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => ref(""),
  mode: () => "split",
  handleChange: (v: string) => {
    console.log(this.value())
    console.log(v)
  }
})
</script>

<style>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}
</style>

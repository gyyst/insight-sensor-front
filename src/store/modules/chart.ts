import { defineStore } from "pinia"
import { ref } from "vue"

export const chartStore = defineStore(
  "chart",
  () => {
    const chartData = ref()
    return { chartData }
  },
  { persist: true }
)

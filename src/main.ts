// core
import { createApp } from "vue";
import App from "@/App.vue";
import store from "@/store";
import router from "@/router";
import "@/router/permission";
// load
import { loadSvg } from "@/icons";
import { loadPlugins } from "@/plugins";
import { loadDirectives } from "@/directives";
// css
import "uno.css";
import "normalize.css";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "vxe-table/lib/style.css";
import "vxe-table-plugin-element/dist/style.css";
import "@/styles/index.scss";
import "bytemd/dist/index.css";
//引入echarts
import VueECharts from "vue-echarts";
// import JsonEditorVue from "json-editor-vue3"
import "jsoneditor";
import "@arco-design/web-vue/dist/arco.css";
import ArcoVue from "@arco-design/web-vue";
// declare module "json-editor-vue3"
const app = createApp(App)

/** 加载插件 */
loadPlugins(app)
/** 加载全局 SVG */
loadSvg(app)
/** 加载自定义指令 */
loadDirectives(app)

app.use(store).use(router).use(ArcoVue)
// .use(JsonEditorVue)
app.component("v-chart", VueECharts)
router.isReady().then(() => {
  app.mount("#app")
})

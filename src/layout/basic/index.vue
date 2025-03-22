<script lang="ts" setup>
import GlobalHeader from "@/layout/basic/components/GlobalHeader.vue"
</script>

<template>
  <div id="basicLayout">
    <a-layout style="height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view :key="$route.path" />
      </a-layout-content>
      <a-layout-footer class="footer">By gyyst</a-layout-footer>
    </a-layout>
  </div>
</template>

<style lang="scss" scoped>
#basicLayout {
}

#basicLayout .header {
  box-shadow: #eee 1px 1px 5px;
  margin-bottom: 16px;
}

#basicLayout .content {
  background: #fff;
  margin-bottom: 16px;
  padding: 20px;
}

#basicLayout .footer {
  padding: 8px;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>

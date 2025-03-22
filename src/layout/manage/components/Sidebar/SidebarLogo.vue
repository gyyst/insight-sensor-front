<script lang="ts" setup>
const props = defineProps({
  collapse: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div :class="{ collapse: props.collapse }" class="sidebar-logo-container">
    <transition name="sidebar-logo-fade">
      <router-link v-if="props.collapse" key="collapse" to="/">
        <img class="sidebar-logo" src="../../../../assets/layout/logo.png" />
      </router-link>
      <router-link v-else key="expand" to="/">
        <img class="sidebar-logo-text" src="../../../../assets/layout/logo-text-1.png" />
      </router-link>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: var(--v3-header-height);
  line-height: var(--v3-header-height);
  background-color: var(--v3-sidebarlogo-bg-color);
  text-align: center;
  overflow: hidden;

  .sidebar-logo {
    display: none;
  }

  .sidebar-logo-text {
    height: 100%;
    vertical-align: middle;
  }
}

.collapse {
  .sidebar-logo {
    width: 32px;
    height: 32px;
    vertical-align: middle;
    display: inline-block;
  }

  .sidebar-logo-text {
    display: none;
  }
}
</style>

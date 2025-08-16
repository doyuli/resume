<script setup lang="ts">
import USwitch from './USwitch.vue'
</script>

<template>
  <header>
    <div class="title">
      简历名称
    </div>
    <div class="content">
      <USwitch />
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--u-text);
  height: var(--header-height);
  box-sizing: border-box;
  padding: 0 2em;
  background-color: var(--u-bg);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.33);
  position: relative;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  transition: background-color 0.5s;
  color: var(--u-text-1);
}
</style>

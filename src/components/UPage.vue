<script setup lang="ts"></script>

<template>
  <div class="u-page">
    <div class="page-content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.u-page {
  width: 794px;
  height: 1122px;
  background-color: #ffffff;
  overflow: hidden;

  .page-content {
    padding: 20px 0;
    position: relative;
    height: 100%;
  }
}
</style>

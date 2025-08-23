<script setup lang="ts">
import { useResumeExport } from '@/composables'
import { useResumeStore } from '@/stores'
import UIconLink from './UIconLink.vue'
import USwitch from './USwitch.vue'

const { isLoading, handleExport } = useResumeExport()

const resumeStore = useResumeStore()
</script>

<template>
  <header>
    <div class="resume">
      <input v-model="resumeStore.name" placeholder="请输入" type="text">
    </div>
    <div class="operations">
      <UIconLink icon="github" link="https://github.com/doyuli/resume" />
      <div class="divider" />
      <USwitch />
      <div class="divider" />
      <button :class="{ loading: isLoading }" @click="handleExport('pdf')">
        {{ isLoading ? '导出中' : '导出' }}
      </button>
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
  padding: 0 4em;
  background-color: var(--u-bg);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.33);
  position: relative;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  transition: background-color 0.5s;
  color: var(--u-text-1);

  .operations {
    display: flex;
    align-items: center;
    gap: 1em;
  }

  .divider {
    width: 1px;
    height: 24px;
    background-color: var(--u-divider);
  }
}

input {
  padding: 4px 10px;
  width: 100%;
  min-width: 0;
  max-width: 400px;
  color: var(--u-text-1);
  font-size: 14px;
  background-color: transparent;
  border: 1px solid transparent;
  box-sizing: border-box;
  border-radius: 2px;
  outline: none;
  transition: all 0.3s;

  &:hover {
    border-color: var(--u-theme);
  }
  &:focus {
    border-color: var(--u-theme);
  }
}

button {
  padding: 4px 12px;
  color: #ffffff;
  font-size: 12px;
  background-color: var(--u-theme);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}
</style>

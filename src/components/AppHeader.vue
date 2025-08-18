<script setup lang="ts">
import { useTemplateStore } from '@/stores'
import defaultCss from '@/styles/default.css?raw'
import { downloadFile } from '@/utils'

import USwitch from './USwitch.vue'

const templateStore = useTemplateStore()

async function exportPdf() {
  const htmlContent = `
  <style>
  ${defaultCss.replaceAll('var(--u-theme)', '#a8b1ff')}
  </style>
  <div class="u-view">
  ${templateStore.getTemplateHtml()}
  </div>
  `

  const resp = await fetch('/api/export', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      htmlContent,
    }),
  })

  downloadFile(await resp.blob())
}
</script>

<template>
  <header>
    <div class="title">
      简历名称
    </div>
    <div class="content">
      <div style="cursor: pointer;" @click="exportPdf">
        导出
      </div>
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

  .content {
    display: flex;
    gap: 2em;
  }
}
</style>

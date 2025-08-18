<script setup lang="ts">
import type { PageSplitReturn } from '../utils/page-splitter'
import { nextTick, shallowRef, useTemplateRef, watchEffect } from 'vue'
import { markdownParser } from '@/markdown'
import { useTemplateStore } from '@/stores/template'
import { calculatePageSplits } from '../utils/page-splitter'

const templateStore = useTemplateStore()

const templateHtml = shallowRef('')

const templateRef = useTemplateRef('template')

watchEffect(() => {
  templateHtml.value = markdownParser.render(templateStore.code)
  templateStore.setTemplateHtml(templateHtml.value)
  updatePageSplits()
})

const templatePageSplits = shallowRef<PageSplitReturn[]>([])
function updatePageSplits() {
  nextTick(() => {
    templatePageSplits.value = calculatePageSplits(templateRef.value!, { pageMaxHeight: 1122 - 40 })
  })
}
</script>

<template>
  <div class="preview">
    <div class="preview-content">
      <div ref="template" class="u-view" style="position: absolute; opacity: 0;" v-html="templateHtml" />

      <div v-for="({ accTop, height }) in templatePageSplits" :key="accTop" class="page-wrap" style="margin-bottom: 20px;">
        <div class="page-content" :style="{ height: `${height}px` }">
          <div class="u-view" :style="{ position: 'absolute', top: `-${accTop}px` }" v-html="templateHtml" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.preview {
  height: calc(100vh - var(--header-height));
  overflow-y: auto;
  background-color: #606060;

  .preview-content {
    position: relative;
    width: 794px;
    margin: 50px auto;
  }
}

.page-wrap {
  padding: 20px 0;
  width: 794px;
  height: 1122px;
  background-color: #ffffff;
  overflow: hidden;

  .page-content {
    position: relative;
    overflow: hidden;
  }
}
</style>

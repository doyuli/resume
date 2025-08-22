<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTemplateRef, watchEffect } from 'vue'
import { useResumeRender } from '@/composables'
import { StylePropertyEnum, useResumeStore } from '@/stores'
import { initialThemes, setCurrentTheme } from '@/utils/theme'

import UOperations from './UOperations.vue'

const templateRef = useTemplateRef('template')

const { templateHtml, pageSplits } = useResumeRender(templateRef)

const resumeStore = useResumeStore()
const { color, lineHeight, fontFamily, theme } = storeToRefs(resumeStore)

initialThemes()

watchEffect(() => {
  setCurrentTheme(theme.value)
})
</script>

<template>
  <div class="preview">
    <div
      class="preview-content"
      :style="{
        [StylePropertyEnum.THEME_COLOR]: color,
        [StylePropertyEnum.LINE_HEIGHT]: lineHeight,
        [StylePropertyEnum.FONT_FAMILY]: fontFamily,
      }"
    >
      <UOperations />
      <div id="print-signal" ref="template" class="u-view" style="position: absolute; opacity: 0;" v-html="templateHtml" />

      <div v-for="({ accTop, height }, i) in pageSplits" :key="accTop" class="page-wrap" style="margin-bottom: 20px;">
        <div class="page-content" :style="{ height: `${height}px`, marginTop: i === 0 ? 0 : 'var(--page-margin-vertical)' }">
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
    margin: 12px auto 50px;
  }
}

.page-wrap {
  width: 794px;
  height: 1122px;
  background-color: #ffffff;
  overflow: hidden;

  .page-content {
    margin-top: var(--page-margin-vertical);
    margin-bottom: var(--page-margin-vertical);
    position: relative;
    overflow: hidden;
  }
}

/** dark theme */
.dark .page-wrap {
  background-color: #e6e6e6 !important;
}
.dark .u-view {
  background-color: #e6e6e6 !important;
}
</style>

<script setup lang="ts">
import type { PageSplitReturn } from '@/utils/page-splitter'
import { useDebounceFn } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import {
  nextTick,
  onMounted,
  onUnmounted,
  shallowRef,
  useTemplateRef,
  watchEffect,
} from 'vue'
import { markdownParser } from '@/markdown'
import {
  StylePropertyEnum,
  useResumeStore,
  useTemplateStore,
} from '@/stores'
import { calculatePageSplits } from '@/utils/page-splitter'
import { initialThemes, setCurrentTheme } from '@/utils/theme'

import UOperations from './UOperations.vue'

const templateStore = useTemplateStore()

const templateHtml = shallowRef('')

const templateRef = useTemplateRef('template')

const templatePageSplits = shallowRef<PageSplitReturn[]>([])

function updatePageSplits() {
  nextTick(() => {
    templatePageSplits.value = calculatePageSplits(templateRef.value!, { pageMaxHeight: 1122 - 40 })
  })
}

const debouncedUpdatePageSplits = useDebounceFn(() => {
  updatePageSplits()
}, 200)

const resizeObserver = new ResizeObserver(() => {
  debouncedUpdatePageSplits()
})

watchEffect(() => {
  templateHtml.value = markdownParser.render(templateStore.code)
  templateStore.setTemplateHtml(templateHtml.value)
  debouncedUpdatePageSplits()
})

onMounted(() => {
  if (templateRef.value) {
    resizeObserver.observe(templateRef.value)
  }
})

onUnmounted(() => {
  resizeObserver.disconnect()
})

/** setting */
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
      <div ref="template" class="u-view" style="position: absolute; opacity: 0;" v-html="templateHtml" />

      <div v-for="({ accTop, height }, i) in templatePageSplits" :key="accTop" class="page-wrap" style="margin-bottom: 20px;">
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

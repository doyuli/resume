<script setup lang="ts">
import { shallowRef, useTemplateRef, watchEffect } from 'vue'
import { markdownParser } from '@/markdown'
import { useTemplateStore } from '@/stores/template'
import UPage from './UPage.vue'

const templateStore = useTemplateStore()

const templateHtml = shallowRef('')

const templateRef = useTemplateRef('template')

watchEffect(() => {
  templateHtml.value = markdownParser.render(templateStore.code)
  updateOffsetTop()
})

const pageHeight = 1122
const templateOffsetTop = shallowRef<number[]>([])
function updateOffsetTop() {
  const templateOffsetHeight = templateRef.value?.offsetHeight
  if (templateOffsetHeight) {
    const pageNum = Math.ceil(templateOffsetHeight / pageHeight)
    const result = Array.from({ length: pageNum }, (_, i) => {
      return i * pageHeight
    })
    templateOffsetTop.value = result
  }
}
</script>

<template>
  <div class="preview">
    <div class="preview-content">
      <div ref="template" class="u-view" style="position: absolute;opacity: 0;" v-html="templateHtml" />
      <UPage v-for="top in templateOffsetTop" :key="top" style="margin-bottom: 20px;">
        <div class="u-view" :style="{ position: 'absolute', top: `-${top}px` }" v-html="templateHtml" />
      </UPage>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.preview {
  position: relative;
  height: calc(100vh - var(--header-height));
  overflow-y: auto;
  background-color: #606060;

  .preview-content {
    position: relative;
    width: 794px;
    margin: 50px auto;
  }
}
</style>

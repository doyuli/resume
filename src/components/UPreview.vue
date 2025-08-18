<script setup lang="ts">
import { shallowRef, useTemplateRef, watchEffect } from 'vue'
import { markdownParser } from '@/markdown'
import { useTemplateStore } from '@/stores/template'

const templateStore = useTemplateStore()

const templateHtml = shallowRef('')

const templateRef = useTemplateRef('template')

watchEffect(() => {
  templateHtml.value = markdownParser.render(templateStore.code)
  templateStore.setTemplateHtml(templateHtml.value)
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
      <div ref="template" class="u-view" style="position: absolute; opacity: 0;" v-html="templateHtml" />

      <div v-for="top in templateOffsetTop" :key="top" class="page-wrap" style="margin-bottom: 20px;">
        <div class="page-content">
          <div class="u-view" :style="{ position: 'absolute', top: `-${top}px` }" v-html="templateHtml" />
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
  padding: 10mm 0;
  width: 794px;
  height: 1122px;
  background-color: #ffffff;
  overflow: hidden;

  .page-content {
    position: relative;
    height: 100%;
    overflow: hidden;
  }
}
</style>

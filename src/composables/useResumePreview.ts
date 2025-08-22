import type { ShallowRef } from 'vue'
import type { PageSplitReturn } from '@/utils/page-splitter'
import { useDebounceFn } from '@vueuse/core'
import { nextTick, onMounted, onUnmounted, shallowRef, watch } from 'vue'
import { markdownParser } from '@/markdown'
import { useTemplateStore } from '@/stores'
import { calculatePageSplits } from '@/utils/page-splitter'

interface ResumePreviewOptions {
  previewDelay?: number
  splitsDelay?: number
}

export function useResumePreview(
  containerRef: Readonly<ShallowRef<HTMLDivElement | null>>,
  options?: ResumePreviewOptions,
) {
  const { previewDelay = 300, splitsDelay = 300 } = options || {}

  const templateStore = useTemplateStore()

  const templateHtml = shallowRef('')
  const pageSplits = shallowRef<PageSplitReturn[]>([])

  const debouncedRenderMarkdown = useDebounceFn(() => {
    templateHtml.value = markdownParser.render(templateStore.code)
    templateStore.setTemplateHtml(templateHtml.value)
  }, previewDelay)

  watch(
    () => templateStore.code,
    () => debouncedRenderMarkdown(),
    {
      immediate: true,
    },
  )

  function updatePageSplits() {
    nextTick(() => {
      if (containerRef.value) {
        pageSplits.value = calculatePageSplits(containerRef.value, { pageMaxHeight: 1122 - 40 })
      }
    })
  }

  const debouncedUpdatePageSplits = useDebounceFn(() => {
    updatePageSplits()
  }, splitsDelay)

  const resizeObserver = new ResizeObserver(() => {
    debouncedUpdatePageSplits()
  })

  onMounted(() => {
    if (containerRef.value) {
      resizeObserver.observe(containerRef.value)
    }
  })

  onUnmounted(() => {
    resizeObserver.disconnect()
  })

  return {
    templateHtml,
    pageSplits,
    updatePageSplits,
  }
}

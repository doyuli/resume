import { shallowRef } from 'vue'
import { useResumeStore, useTemplateStore } from '@/stores'
import { downloadFile } from '@/utils'
import { exportElementAsFile } from '@/utils/client-export'

interface ResumeExportOptions {
  checkHealth?: boolean
}

export function useResumeExport(options: ResumeExportOptions = {}) {
  const { checkHealth = true } = options

  const resumeStore = useResumeStore()
  const { getExportHtml, getCode } = useTemplateStore()

  const isLoading = shallowRef(false)
  // 后端导出服务是否可用，决定 PDF 导出的可行性
  const isServiceHealth = shallowRef(true)

  function checkServiceHealth() {
    fetch('/api/health').then(resp => isServiceHealth.value = resp.ok)
  }

  const handleActions = {
    pdf: () => exportPdf(),
    image: () => exportImage(),
    md: () => exportMarkdown(),
  }

  async function handleExport(format: 'image' | 'pdf' | 'md') {
    if (isLoading.value)
      return

    try {
      isLoading.value = true

      await handleActions[format]()
    }
    finally {
      isLoading.value = false
    }
  }

  async function exportPdf() {
    const resp = await fetch('/api/export', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        htmlContent: getExportHtml(),
      }),
    })

    if (!resp.ok) {
      // eslint-disable-next-line no-alert
      alert('暂不支持客户端导出 pdf，敬请期待！')
      throw new Error(resp.statusText)
    }

    downloadFile(await resp.blob(), `${resumeStore.name}.pdf`)
  }

  async function exportImage() {
    await exportElementAsFile('#print-signal', {
      format: 'image',
      filename: resumeStore.name,
    })
  }

  async function exportMarkdown() {
    const markdown = getCode()
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' })
    downloadFile(blob, `${resumeStore.name}.md`)
  }

  if (checkHealth) {
    checkServiceHealth()
  }

  return {
    isLoading,
    isServiceHealth,
    handleExport,
    checkServiceHealth,
  }
}

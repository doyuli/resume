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
  const { getExportHtml } = useTemplateStore()

  const isLoading = shallowRef(false)
  // 后端导出服务是否可用，决定 PDF 导出的可行性
  const isServiceHealth = shallowRef(true)

  function checkServiceHealth() {
    fetch('/api/health').then(resp => isServiceHealth.value = resp.ok)
  }

  async function handleExport(format: 'image' | 'pdf') {
    if (isLoading.value)
      return

    try {
      isLoading.value = true

      if (format === 'pdf') {
        await handleExportPdf()
      }
      else {
        await handleExportImage()
      }
    }
    finally {
      isLoading.value = false
    }
  }

  async function handleExportPdf() {
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
      throw new Error(resp.statusText)
    }

    downloadFile(await resp.blob(), resumeStore.name)
  }

  async function handleExportImage() {
    await exportElementAsFile('#print-signal', {
      format: 'image',
      filename: resumeStore.name,
    })
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

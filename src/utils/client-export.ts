import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'
import { downloadFile } from '@/utils'

interface ExportOptions {
  filename?: string
  format?: 'image' | 'pdf'
}

export async function exportElementAsFile(
  selector: string | HTMLElement,
  options: ExportOptions = {},
) {
  const container = typeof selector === 'string' ? document.querySelector<HTMLElement>(selector) : selector
  if (!container)
    return

  const { format = 'pdf' } = options
  const filename = options.filename ?? `resume.${format === 'pdf' ? 'pdf' : 'png'}`

  // 处理 maskImage 的元素（html2canvas 不支持 maskImage）
  const maskEls = Array.from(container.querySelectorAll('i')).filter((el) => {
    const style = getComputedStyle(el)
    return (style.maskImage && style.maskImage !== 'none')
      || (style.webkitMaskImage && style.webkitMaskImage !== 'none')
  })

  container.style.opacity = '1'
  maskEls.forEach((el) => {
    el.style.backgroundColor = 'transparent'
  })

  const canvas = await html2canvas(container, { scale: 2 })
  const imgData = canvas.toDataURL('image/png')

  maskEls.forEach((el) => {
    el.style.backgroundColor = 'currentColor'
  })
  container.style.opacity = '0'

  if (format === 'pdf') {
    generatePdfFromImage(imgData, filename)
  }
  else {
    downloadFile(imgData, filename)
  }
}

function generatePdfFromImage(imgData: string, filename: string): void {
  const pdf = new JsPDF('p', 'mm', 'a4')
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()

  const imgProps = pdf.getImageProperties(imgData)
  const imgHeight = (imgProps.height * pageWidth) / imgProps.width

  let position = 0
  let remainingHeight = imgHeight

  while (remainingHeight > 0) {
    pdf.addImage(imgData, 'PNG', 0, position, pageWidth, imgHeight)
    remainingHeight -= pageHeight
    if (remainingHeight > 0) {
      pdf.addPage()
      position = -(imgHeight - remainingHeight)
    }
  }

  pdf.save(filename)
}

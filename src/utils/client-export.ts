import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'
import { downloadFile } from '@/utils'
import { calculatePageSplits } from './page-splitter'

interface ExportOptions {
  filename?: string
  format?: 'image' | 'pdf'
}

const CANVS_SCALE = 2

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

  const canvas = await html2canvas(container, { scale: CANVS_SCALE })

  maskEls.forEach((el) => {
    el.style.backgroundColor = 'currentColor'
  })
  container.style.opacity = '0'

  if (format === 'pdf') {
    generatePdfFromCanvas(canvas, filename, container)
  }
  else {
    const imgData = canvas.toDataURL('image/png')
    downloadFile(imgData, filename)
  }
}

function generatePdfFromCanvas(
  canvas: HTMLCanvasElement,
  filename: string,
  container: HTMLElement,
) {
  const pageSplits = calculatePageSplits(container)

  const pdf = new JsPDF('p', 'pt', 'a4')
  const pdfWidth = pdf.internal.pageSize.getWidth()

  pageSplits.forEach((page, index) => {
    const { accTop, height } = page

    const scaleAccTop = accTop * CANVS_SCALE
    const scaleHeight = height * CANVS_SCALE

    const cropped = cropCanvas(canvas, scaleAccTop, scaleAccTop + scaleHeight)
    const imgData = cropped.toDataURL('image/png')
    const pdfHeight = (cropped.height * pdfWidth) / cropped.width

    if (index > 0) {
      pdf.addPage()
    }

    pdf.addImage(
      imgData,
      'PNG',
      0,
      0,
      pdfWidth,
      pdfHeight,
    )
  })

  pdf.save(filename)
}

function cropCanvas(source: HTMLCanvasElement, start: number, end: number) {
  const height = end - start
  const width = source.width

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')!
  ctx.drawImage(
    source,
    0,
    start,
    width,
    height,
    0,
    0,
    width,
    height,
  )

  return canvas
}

import fs from 'node:fs'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import puppeteer from 'puppeteer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const router = express.Router()

// 确保snapshots目录存在
const snapshotsDir = `${__dirname}/../snapshots`
if (!fs.existsSync(snapshotsDir)) {
  fs.mkdirSync(snapshotsDir, { recursive: true })
}

// 简历PDF导出接口
router.post('/export', async (req, res) => {
  try {
    const { htmlContent, fileName = 'resume.pdf' } = req.body

    if (!htmlContent) {
      return res.status(400).json({ error: '缺少htmlContent参数' })
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    const page = await browser.newPage()

    // 配置PDF生成选项
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' })

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm',
      },
      displayHeaderFooter: false,
    })

    await browser.close()

    // 返回PDF文件
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`)
    res.send(pdfBuffer)
  }
  catch (error) {
    console.error('PDF导出错误:', error)
    res.status(500).json({
      error: '生成PDF失败',
      details: error.message,
    })
  }
})

// 文件下载接口
router.get('/download/:filename', (req, res) => {
  const { filename } = req.params
  const filePath = `${snapshotsDir}/${filename}`

  if (fs.existsSync(filePath)) {
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('文件下载错误:', err)
        res.status(500).send('下载文件时出错')
      }
    })
  }
  else {
    res.status(404).send('文件不存在')
  }
})

export default router

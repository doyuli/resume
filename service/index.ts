import process from 'node:process'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import pico from 'picocolors'
import puppeteer from 'puppeteer-core'

const app = express()

app.use(cors())
app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/health', (_, res) => {
  res.status(200).send('OK')
})

app.post('/api/export', async (req, res) => {
  try {
    const { htmlContent, fileName = 'resume.pdf' } = req.body

    if (!htmlContent) {
      return res.status(400).json({ error: '缺少htmlContent参数' })
    }

    const browser = await puppeteer.launch({
      headless: true,
      timeout: 30000,
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    const page = await browser.newPage()

    // 配置PDF生成选项
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' })

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
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

const PORT = process.env.SERVICE_PORT || 3001

app.listen(PORT, () => {
  console.log(pico.green(`➜  Server running on port ${PORT}`))
})

import process from 'node:process'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import exportPdf from './export'

const app = express()

app.use(cors())
app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/export-pdf', exportPdf)
app.get('/api/health', (_, res) => {
  res.status(200).send('OK')
})

const PORT = process.env.SERVICE_PORT || 30001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

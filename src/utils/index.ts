export function downloadFile(load: Blob | string, fileName = 'resume.pdf') {
  const url = typeof load === 'string' ? load : window.URL.createObjectURL(load)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()

  setTimeout(() => {
    window.URL.revokeObjectURL(url)
    document.body.removeChild(link)
  }, 0)
}

export function loadLink(url: string, options?: Record<string, any>) {
  return new Promise<HTMLLinkElement>((resolve, reject) => {
    const {
      id,
      rel = 'stylesheet',
      parent = document.head,
    } = options || {}

    if (id && document.getElementById(id)) {
      const existingLink = document.getElementById(id) as HTMLLinkElement
      return resolve(existingLink)
    }

    const link = document.createElement('link')
    link.rel = rel
    link.href = url

    if (id)
      link.id = id

    link.onload = () => {
      resolve(link)
    }

    link.onerror = (error) => {
      reject(error)
    }

    parent.appendChild(link)
  })
}

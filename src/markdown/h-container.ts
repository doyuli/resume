import type MarkdownIt from 'markdown-it'

export const H_BLOCK_CLASS_NAME = 'h-block'

export function HContainer(md: MarkdownIt) {
  md.core.ruler.after('block', 'h-container', (state) => {
    const tokens = state.tokens
    const headingStack: number[] = []

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]

      if (token.type === 'heading_open') {
        const level = Number(token.tag.slice(1)) // h1 -> 1, h2 -> 2

        // 先关闭比当前 level 大或相等的容器
        while (headingStack.length > 0 && level <= headingStack[headingStack.length - 1]) {
          const close = new state.Token('container_close', 'div', -1)
          tokens.splice(i, 0, close)
          headingStack.pop()
          i++ // 调整索引，避免错位
        }

        // 打开新容器
        const open = new state.Token('container_open', 'div', 1)
        open.attrSet('class', `h${level}-block ${H_BLOCK_CLASS_NAME}`)
        tokens.splice(i, 0, open)
        headingStack.push(level)
        i++ // 跳过新插入的 open
      }
    }

    // 文档结束时，关闭所有剩余的容器
    while (headingStack.length > 0) {
      const close = new state.Token('container_close', 'div', -1)
      tokens.push(close)
      headingStack.pop()
    }
  })

  md.renderer.rules.container_open = (tokens, idx) => {
    const token = tokens[idx]
    const cls = token.attrGet('class')
    return `<div class="${cls}">\n`
  }

  md.renderer.rules.container_close = () => {
    return '</div>\n'
  }
}

import type MarkdownIt from 'markdown-it'

export const H_BLOCK_CLASS_NAME = 'h-block'

export function HBlockContainer(md: MarkdownIt) {
  md.core.ruler.after('block', 'h-block', (state) => {
    const tokens = state.tokens
    let openIndex: number | null = null

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]

      if (token.type === 'heading_open') {
        const level = Number(token.tag.slice(1))

        if (openIndex !== null) {
          const close = new state.Token('container_close', 'div', -1)
          tokens.splice(i, 0, close)
          i++
          openIndex = null
        }

        if (level === 1) {
          const open = new state.Token('container_open', 'div', 1)
          open.attrSet('class', `h${level}-block ${H_BLOCK_CLASS_NAME}`)
          tokens.splice(i, 0, open)
          i++
          openIndex = i
        }
      }
    }

    if (openIndex !== null) {
      const close = new state.Token('container_close', 'div', -1)
      tokens.push(close)
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

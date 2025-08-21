import type MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'

export function HContainer(md: MarkdownIt) {
  // 预处理
  md.core.ruler.after('block', 'h-container', (state) => {
    const tokens = state.tokens
    const headingStack: number[] = []

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]

      if (token.type === 'heading_open') {
        const level = Number(token.tag.slice(1)) // h1 -> 1, h2 -> 2

        // 先关闭不再需要的容器
        while (headingStack.length > 0 && level <= headingStack[headingStack.length - 1]) {
          state.tokens.splice(i, 0, new state.Token('container_close', 'div', -1))
          headingStack.pop()
          i++
        }

        // 打开新容器
        const open = new state.Token('container_open', 'div', 1)
        open.attrSet('class', `h${level}-block`)
        state.tokens.splice(i, 0, open)
        headingStack.push(level)
        i++
      }
    }

    // 文件结束时，补齐关闭
    while (headingStack.length > 0) {
      state.tokens.push(new state.Token('container_close', 'div', -1))
      headingStack.pop()
    }
  })

  // 为每个标题级别注册对应的容器处理器
  for (let level = 1; level <= 6; level++) {
    md.use(container, `h${level}-block`, {
      render: (tokens: any[], idx: number) => {
        const token = tokens[idx]
        if (token.nesting === 1) {
          return `<div class="h${level}-block block">\n`
        }
        else {
          return '</div>\n'
        }
      },
    })
  }
}

import type MarkdownIt from 'markdown-it'

export const H_BLOCK_CLASS_NAME = 'h-block'

/**
 * MarkdownIt 插件：为标题及其内容包裹分级容器
 *
 * 功能说明：
 * - 解析 Markdown 时，根据标题层级 (h1, h2, h3, ...) 自动插入 <div> 容器
 * - 容器的 class 命名规则为：`h{level}-block h-block`
 *   例如：
 *     # 一级标题   => <div class="h1-block h-block"> ... </div>
 *     ## 二级标题  => <div class="h2-block h-block"> ... </div>
 *     ### 三级标题 => <div class="h3-block h-block"> ... </div>
 * - 容器会嵌套，形成层级结构：
 *
 *   # h1
 *   <div class="h1-block h-block">
 *     ## h2
 *     <div class="h2-block h-block">
 *       ### h3
 *       <div class="h3-block h-block">
 *       </div>
 *     </div>
 *   </div>
 *
 * 使用场景：
 * - 给标题及其下属内容增加统一样式（如背景、边框、间距等）
 * - 构建结构化的 HTML 方便做目录、折叠面板、样式定制
 */
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

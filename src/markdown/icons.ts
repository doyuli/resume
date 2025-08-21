import type MarkdownIt from 'markdown-it'

export function Icons(md: MarkdownIt) {
  const regex = /^:icon-([a-z0-9-]+):([a-z0-9-]+)/

  md.inline.ruler.before('text', 'icons', (state, silent) => {
    const pos = state.pos
    const match = state.src.slice(pos).match(regex)
    if (!match)
      return false
    if (silent)
      return false

    const [, collection, icon] = match

    const token = state.push('iconify', '', 0)
    token.meta = { collection, icon }
    state.pos += match[0].length
    return true
  })

  md.renderer.rules.iconify = (tokens, idx) => {
    const { collection, icon } = tokens[idx].meta
    return `<i class="iconify-icon" style="--icon: url('https://api.iconify.design/${collection}/${icon}.svg')"></i>`
  }
}

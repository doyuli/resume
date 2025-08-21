import markdownit from 'markdown-it'
import container from 'markdown-it-container'
import { full as emoji } from 'markdown-it-emoji'
import { HBlockContainer } from './h-block'
import { Icons } from './icons'

const markdownParser = markdownit()

markdownParser
  .use(emoji)
  .use(container, 'left', {
    render(tokens: any, idx: any) {
      if (tokens[idx].nesting === 1) {
        return '<div class="lr-container"><div class="left">'
      }
      else {
        return '</div>'
      }
    },
  })
  .use(container, 'right', {
    render(tokens: any, idx: any) {
      if (tokens[idx].nesting === 1) {
        return '<div class="right">'
      }
      else {
        return '</div></div>'
      }
    },
  })
  .use(container, 'center', {
    render(tokens: any, idx: any) {
      if (tokens[idx].nesting === 1) {
        return '<div class="center">'
      }
      else {
        return '</div>'
      }
    },
  })
  .use(HBlockContainer)
  .use(Icons)

export {
  markdownParser,
}

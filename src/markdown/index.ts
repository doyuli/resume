import markdownit from 'markdown-it'
import mdContainer from 'markdown-it-container'
import { full as emoji } from 'markdown-it-emoji'

const markdownParser = markdownit()

markdownParser
  .use(emoji)
  .use(mdContainer, 'left', {
    render(tokens: any, idx: any) {
      if (tokens[idx].nesting === 1) {
        return '<div class="lr-container"><div class="left">'
      }
      else {
        return '</div>'
      }
    },
  })
  .use(mdContainer, 'right', {
    render(tokens: any, idx: any) {
      if (tokens[idx].nesting === 1) {
        return '<div class="right">'
      }
      else {
        return '</div></div>'
      }
    },
  })
  .use(mdContainer, 'center', {
    render(tokens: any, idx: any) {
      if (tokens[idx].nesting === 1) {
        return '<div class="center">'
      }
      else {
        return '</div>'
      }
    },
  })

export {
  markdownParser,
}

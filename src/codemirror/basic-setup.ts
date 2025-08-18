import type { Extension } from '@codemirror/state'
import type { KeyBinding } from '@codemirror/view'
import { autocompletion, closeBrackets, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete'
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import { bracketMatching, defaultHighlightStyle, foldGutter, foldKeymap, indentOnInput, indentUnit, syntaxHighlighting } from '@codemirror/language'
import { lintKeymap } from '@codemirror/lint'
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search'
import { EditorState } from '@codemirror/state'
import { crosshairCursor, drawSelection, dropCursor, highlightActiveLine, highlightActiveLineGutter, highlightSpecialChars, keymap, lineNumbers, rectangularSelection } from '@codemirror/view'

export interface MinimalSetupOptions {
  highlightSpecialChars?: boolean
  history?: boolean
  drawSelection?: boolean
  syntaxHighlighting?: boolean

  defaultKeymap?: boolean
  historyKeymap?: boolean
}

/**
A minimal set of extensions to create a functional editor. Only
includes [the default keymap](https://codemirror.net/6/docs/ref/#commands.defaultKeymap), [undo
history](https://codemirror.net/6/docs/ref/#commands.history), [special character
highlighting](https://codemirror.net/6/docs/ref/#view.highlightSpecialChars), [custom selection
drawing](https://codemirror.net/6/docs/ref/#view.drawSelection), and [default highlight
style](https://codemirror.net/6/docs/ref/#language.defaultHighlightStyle).
 */
export function minimalSetup(options: MinimalSetupOptions = {}): Extension[] {
  let keymaps: KeyBinding[] = []
  if (options.defaultKeymap !== false) {
    keymaps = keymaps.concat(defaultKeymap)
  }
  if (options.historyKeymap !== false) {
    keymaps = keymaps.concat(historyKeymap)
  }
  const extensions: Extension[] = []
  if (options.highlightSpecialChars !== false)
    extensions.push(highlightSpecialChars())
  if (options.history !== false)
    extensions.push(history())
  if (options.drawSelection !== false)
    extensions.push(drawSelection())
  if (options.syntaxHighlighting !== false)
    extensions.push(syntaxHighlighting(defaultHighlightStyle, { fallback: true }))
  return extensions.concat([keymap.of(keymaps.flat())]).filter(Boolean)
}

export interface BasicSetupOptions extends MinimalSetupOptions {
  lineNumbers?: boolean
  highlightActiveLineGutter?: boolean
  foldGutter?: boolean
  dropCursor?: boolean
  allowMultipleSelections?: boolean
  indentOnInput?: boolean
  bracketMatching?: boolean
  closeBrackets?: boolean
  autocompletion?: boolean
  rectangularSelection?: boolean
  crosshairCursor?: boolean
  highlightActiveLine?: boolean
  highlightSelectionMatches?: boolean

  closeBracketsKeymap?: boolean
  searchKeymap?: boolean
  foldKeymap?: boolean
  completionKeymap?: boolean
  lintKeymap?: boolean
  /**
   * Facet for overriding the unit by which indentation happens. Should be a string consisting either entirely of spaces or entirely of tabs. When not set, this defaults to 2 spaces
   * https://codemirror.net/docs/ref/#language.indentUnit
   * @default 2
   */
  tabSize?: number
}

// (The superfluous function calls around the list of extensions work
// around current limitations in tree-shaking software.)

/// This is an extension value that just pulls together a number of
/// extensions that you might want in a basic editor. It is meant as a
/// convenient helper to quickly set up CodeMirror without installing
/// and importing a lot of separate packages.
///
/// Specifically, it includes...
///
///  - [the default command bindings](#commands.defaultKeymap)
///  - [line numbers](#view.lineNumbers)
///  - [special character highlighting](#view.highlightSpecialChars)
///  - [the undo history](#commands.history)
///  - [a fold gutter](#language.foldGutter)
///  - [custom selection drawing](#view.drawSelection)
///  - [drop cursor](#view.dropCursor)
///  - [multiple selections](#state.EditorState^allowMultipleSelections)
///  - [reindentation on input](#language.indentOnInput)
///  - [the default highlight style](#language.defaultHighlightStyle) (as fallback)
///  - [bracket matching](#language.bracketMatching)
///  - [bracket closing](#autocomplete.closeBrackets)
///  - [autocompletion](#autocomplete.autocompletion)
///  - [rectangular selection](#view.rectangularSelection) and [crosshair cursor](#view.crosshairCursor)
///  - [active line highlighting](#view.highlightActiveLine)
///  - [active line gutter highlighting](#view.highlightActiveLineGutter)
///  - [selection match highlighting](#search.highlightSelectionMatches)
///  - [search](#search.searchKeymap)
///  - [linting](#lint.lintKeymap)
///
/// (You'll probably want to add some language package to your setup
/// too.)
///
/// This extension does not allow customization. The idea is that,
/// once you decide you want to configure your editor more precisely,
/// you take this package's source (which is just a bunch of imports
/// and an array literal), copy it into your own code, and adjust it
/// as desired.
export function basicSetup(options: BasicSetupOptions = {}): Extension[] {
  const { crosshairCursor: defaultCrosshairCursor = false } = options

  let keymaps: KeyBinding[] = []
  if (options.closeBracketsKeymap !== false) {
    keymaps = keymaps.concat(closeBracketsKeymap)
  }
  if (options.defaultKeymap !== false) {
    keymaps = keymaps.concat(defaultKeymap)
  }
  if (options.searchKeymap !== false) {
    keymaps = keymaps.concat(searchKeymap)
  }
  if (options.historyKeymap !== false) {
    keymaps = keymaps.concat(historyKeymap)
  }
  if (options.foldKeymap !== false) {
    keymaps = keymaps.concat(foldKeymap)
  }
  if (options.completionKeymap !== false) {
    keymaps = keymaps.concat(completionKeymap)
  }
  if (options.lintKeymap !== false) {
    keymaps = keymaps.concat(lintKeymap)
  }
  const extensions: Extension[] = []
  if (options.lineNumbers !== false)
    extensions.push(lineNumbers())
  if (options.highlightActiveLineGutter !== false)
    extensions.push(highlightActiveLineGutter())
  if (options.highlightSpecialChars !== false)
    extensions.push(highlightSpecialChars())
  if (options.history !== false)
    extensions.push(history())
  if (options.foldGutter !== false)
    extensions.push(foldGutter())
  if (options.drawSelection !== false)
    extensions.push(drawSelection())
  if (options.dropCursor !== false)
    extensions.push(dropCursor())
  if (options.allowMultipleSelections !== false)
    extensions.push(EditorState.allowMultipleSelections.of(true))
  if (options.indentOnInput !== false)
    extensions.push(indentOnInput())
  if (options.syntaxHighlighting !== false)
    extensions.push(syntaxHighlighting(defaultHighlightStyle, { fallback: true }))
  if (options.bracketMatching !== false)
    extensions.push(bracketMatching())
  if (options.closeBrackets !== false)
    extensions.push(closeBrackets())
  if (options.autocompletion !== false)
    extensions.push(autocompletion())
  if (options.rectangularSelection !== false)
    extensions.push(rectangularSelection())
  if (defaultCrosshairCursor !== false)
    extensions.push(crosshairCursor())
  if (options.highlightActiveLine !== false)
    extensions.push(highlightActiveLine())
  if (options.highlightSelectionMatches !== false)
    extensions.push(highlightSelectionMatches())
  if (options.tabSize && typeof options.tabSize === 'number')
    extensions.push(indentUnit.of(' '.repeat(options.tabSize)))

  return extensions.concat([keymap.of(keymaps.flat())]).filter(Boolean)
}

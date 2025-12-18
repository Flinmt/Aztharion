// Extend ProseMirror functionality
// Much appreciation to @joaquinp98 on the FoundryVTT Discord for this template
export const ProseMirrorSettings = async () => {
  const { defaultSchema, Schema } = foundry.prosemirror
  const { deepClone } = foundry.utils

  // ---- Define the mark for the symbol span ----
  const wodSymbolMark = {
    attrs: {
      letter: { default: null }
    },
    inclusive: false,
    toDOM(node) {
      return [
        'span',
        {
          class: 'aztharion-symbol'
        },
        node.attrs.letter || ''
      ]
    }
  }

  // ---- Extend Foundry’s ProseMirror Schema ----
  const extendedSchema = new Schema({
    nodes: defaultSchema.spec.nodes,
    marks: deepClone(defaultSchema.spec.marks).addToStart('wodSymbol', wodSymbolMark)
  })

  // Replace the default schema
  Object.assign(foundry.prosemirror.defaultSchema, extendedSchema)

  // ------------------------------------------
  //  Add Dropdown Menu Entry
  // ------------------------------------------
  Hooks.on('getProseMirrorMenuDropDowns', (menu, dropdowns) => {
    const wodMark = menu.schema.marks.wodSymbol
    if (!wodMark) return

    // The below letters map to the /aztharion/assets/fonts/aztharion-symbols.ttf file
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

    // Generate children elements for the "World of Darkness" dropdown in ProseMirror
    const children = letters.map((letter) => ({
      action: `wod-symbol-${letter}`,
      title: letter,
      class: 'aztharion-symbol',
      priority: 1,
      cmd: insertWodSymbol(letter, menu.schema)
    }))

    // Add the dropdown element
    if (dropdowns.format?.entries) {
      dropdowns.format.entries.push({
        action: 'aztharion',
        title: 'World of Darkness',
        children
      })
    }
  })

  function insertWodSymbol(letter, schema) {
    return function (state, dispatch) {
      const { tr } = state
      const { from, to } = tr.selection

      // Insert the letter at the cursor
      tr.insertText(letter, from, to)

      // Create the mark instance
      const markType = schema.marks.wodSymbol
      const mark = markType.create({ attrs: { letter } })

      // Apply the mark to the inserted character
      tr.addMark(from, from + letter.length, mark)

      dispatch(tr)
      return true
    }
  }
}

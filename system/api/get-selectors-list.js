/**
 * Function to handle getting the list of available selectors for any given document
 * @param document
 */
export const getSelectorsList = () => {
  const selectorsList = []

  // Attributes
  const attributes = AZTHARION.Attributes.getList({
    prependType: true
  })
  // "All Attributes" selector
  selectorsList.push({
    id: 'attributes',
    displayName: game.i18n.format('AZTHARION.Modifier.AllString', {
      string: game.i18n.localize('AZTHARION.AttributesList.Attributes')
    })
  })
  // Physical Attributes
  selectorsList.push({
    id: 'physical',
    displayName: game.i18n.format('AZTHARION.Modifier.AllStringPools', {
      string: game.i18n.localize('AZTHARION.SPC.Physical')
    })
  })
  // Mental Attributes
  selectorsList.push({
    id: 'mental',
    displayName: game.i18n.format('AZTHARION.Modifier.AllStringPools', {
      string: game.i18n.localize('AZTHARION.SPC.Mental')
    })
  })
  // Social Attributes
  selectorsList.push({
    id: 'social',
    displayName: game.i18n.format('AZTHARION.Modifier.AllStringPools', {
      string: game.i18n.localize('AZTHARION.SPC.Social')
    })
  })
  // Individual attributes
  for (const [key, value] of Object.entries(attributes)) {
    selectorsList.push({
      id: key,
      displayName: value.displayName
    })
  }

  // Skills
  const skills = AZTHARION.Skills.getList({
    prependType: true
  })
  // "All Skills" selector
  selectorsList.push({
    id: 'skills',
    displayName: game.i18n.format('AZTHARION.Modifier.AllString', {
      string: game.i18n.localize('AZTHARION.SkillsList.Skills')
    })
  })
  // Individual skills
  for (const [key, value] of Object.entries(skills)) {
    selectorsList.push({
      id: key,
      displayName: value.displayName
    })
  }
  // Willpower
  selectorsList.push({
    id: 'willpower',
    displayName: game.i18n.localize('AZTHARION.Willpower')
  })
  // Willpower Re-roll
  selectorsList.push({
    id: 'willpower-reroll',
    displayName: game.i18n.localize('AZTHARION.Chat.Willpower')
  })

  // Vampire
  const disciplines = AZTHARION.Disciplines.getList({
    prependType: true
  })
  // "All Disciplines" selector
  selectorsList.push({
    id: 'disciplines',
    displayName: game.i18n.format('AZTHARION.Modifier.AllString', {
      string: game.i18n.localize('AZTHARION.VTM.Disciplines')
    })
  })
  // Individual disciplines
  for (const [key, value] of Object.entries(disciplines)) {
    selectorsList.push({
      id: key,
      displayName: value.displayName
    })
  }
  // Frenzy
  selectorsList.push({
    id: 'frenzy',
    displayName: game.i18n.localize('AZTHARION.VTM.Frenzy')
  })
  // Remorse
  selectorsList.push({
    id: 'humanity',
    displayName: game.i18n.localize('AZTHARION.VTM.Remorse')
  })
  // Feeding
  selectorsList.push({
    id: 'feeding',
    displayName: game.i18n.localize('AZTHARION.VTM.Feeding')
  })

  // Hunter
  const edges = AZTHARION.Edges.getList({
    prependType: true
  })
  // "All Edges" selector
  selectorsList.push({
    id: 'edges',
    displayName: game.i18n.format('AZTHARION.Modifier.AllString', {
      string: game.i18n.localize('AZTHARION.HTR.Edges')
    })
  })
  // Individual edges
  for (const [key, value] of Object.entries(edges)) {
    selectorsList.push({
      id: key,
      displayName: value.displayName
    })
  }
  // Despair
  selectorsList.push({
    id: 'despair',
    displayName: game.i18n.localize('AZTHARION.HTR.Despair')
  })

  // Werewolf
  // Renown
  const renown = AZTHARION.Renown.getList({
    prependType: true
  })
  // "All Renown" selector
  selectorsList.push({
    id: 'renown',
    displayName: game.i18n.format('AZTHARION.Modifier.AllString', {
      string: game.i18n.localize('AZTHARION.WTA.Renown')
    })
  })
  // Individual renown
  for (const [key, value] of Object.entries(renown)) {
    selectorsList.push({
      id: key,
      displayName: value.displayName
    })
  }

  // Gifts
  const gifts = AZTHARION.Gifts.getList({
    prependType: true
  })
  // "All Gifts" selector
  selectorsList.push({
    id: 'gifts',
    displayName: game.i18n.format('AZTHARION.Modifier.AllString', {
      string: game.i18n.localize('AZTHARION.WTA.Gifts')
    })
  })
  // Individual gifts
  for (const [key, value] of Object.entries(gifts)) {
    selectorsList.push({
      id: key,
      displayName: value.displayName
    })
  }

  return selectorsList
}

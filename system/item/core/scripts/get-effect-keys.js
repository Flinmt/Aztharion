/**
 * Function to handle getting the list of available keys
 */
export const getEffectKeys = () => {
  const keysList = []

  // Attributes
  const attributes = AZTHARION.Attributes.getList({
    useValuePath: true
  })
  // "All Attributes" key
  keysList.push({
    id: 'attributes',
    displayName: game.i18n.format('AZTHARION.Modifier.AllString', {
      string: game.i18n.localize('AZTHARION.AttributesList.Attributes')
    })
  })
  // Individual attributes
  for (const [key, value] of Object.entries(attributes)) {
    keysList.push({
      id: key,
      displayName: value.displayName
    })
  }

  // Physical Attributes
  keysList.push({
    id: 'physical',
    displayName: game.i18n.format('AZTHARION.Modifier.AllString', {
      string: game.i18n.localize('AZTHARION.SPC.Physical')
    })
  })

  // Mental Attributes
  keysList.push({
    id: 'mental',
    displayName: game.i18n.format('AZTHARION.Modifier.AllString', {
      string: game.i18n.localize('AZTHARION.SPC.Mental')
    })
  })

  // Social Attributes
  keysList.push({
    id: 'social',
    displayName: game.i18n.format('AZTHARION.Modifier.AllString', {
      string: game.i18n.localize('AZTHARION.SPC.Social')
    })
  })

  // Skills
  const skills = AZTHARION.Skills.getList({
    useValuePath: true
  })
  // "All Skills" key
  keysList.push({
    id: 'skills',
    displayName: game.i18n.format('AZTHARION.Modifier.AllString', {
      string: game.i18n.localize('AZTHARION.SkillsList.Skills')
    })
  })
  // Individual skills
  for (const [key, value] of Object.entries(skills)) {
    keysList.push({
      id: key,
      displayName: value.displayName
    })
  }

  // "Health Max" key
  keysList.push({
    id: 'system.health.max',
    displayName: game.i18n.format('AZTHARION.MaxString', {
      string: game.i18n.localize('AZTHARION.Health')
    })
  })

  // "Willpower Max" key
  keysList.push({
    id: 'system.willpower.max',
    displayName: game.i18n.format('AZTHARION.MaxString', {
      string: game.i18n.localize('AZTHARION.Willpower')
    })
  })

  // Vampire
  const disciplines = AZTHARION.Disciplines.getList({
    useValuePath: true
  })
  // "All Disciplines" key
  keysList.push({
    id: 'disciplines',
    displayName: game.i18n.format('AZTHARION.Modifier.AllString', {
      string: game.i18n.localize('AZTHARION.VTM.Disciplines')
    })
  })
  // Individual disciplines
  for (const [key, value] of Object.entries(disciplines)) {
    keysList.push({
      id: key,
      displayName: value.displayName
    })
  }
  // "Hunger Max" key
  keysList.push({
    id: 'system.hunger.max',
    displayName: game.i18n.format('AZTHARION.MaxString', {
      string: game.i18n.localize('AZTHARION.VTM.Hunger')
    })
  })

  // Werewolf
  // Renown
  const renown = AZTHARION.Renown.getList({
    useValuePath: true
  })
  // "All Renown" key
  keysList.push({
    id: 'renown',
    displayName: game.i18n.format('AZTHARION.Modifier.AllString', {
      string: game.i18n.localize('AZTHARION.WTA.Renown')
    })
  })
  // Individual renown
  for (const [key, value] of Object.entries(renown)) {
    keysList.push({
      id: key,
      displayName: value.displayName
    })
  }
  // "Rage Max" key
  keysList.push({
    id: 'system.rage.max',
    displayName: game.i18n.format('AZTHARION.MaxString', {
      string: game.i18n.localize('AZTHARION.WTA.Rage')
    })
  })

  return keysList
}

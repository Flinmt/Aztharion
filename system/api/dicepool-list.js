/**
 * Function to handle getting the list of available dice to add to a dicepool
 * @param document
 */
export const getDicepoolList = async (document) => {
  const masterList = []
  const gamesystem = document.system?.gamesystem || 'mortal'
  const isNotEmbedded = !game.items.get('ScZcmxk1WGC0GAQu')?.isEmbedded

  // Attributes
  const attributes = AZTHARION.Attributes.getList({})
  for (const [key, value] of Object.entries(attributes)) {
    masterList.push({
      value: `attributes.${key}`,
      label: value.displayName,
      group: game.i18n.localize('AZTHARION.AttributesList.Attributes')
    })
  }

  // Skills
  const skills = AZTHARION.Skills.getList({})
  for (const [key, value] of Object.entries(skills)) {
    masterList.push({
      value: `skills.${key}`,
      label: value.displayName,
      group: game.i18n.localize('AZTHARION.SkillsList.Skills')
    })
  }

  // Vampire
  if (gamesystem === 'vampire' || isNotEmbedded) {
    const disciplines = AZTHARION.Disciplines.getList({})
    for (const [key, value] of Object.entries(disciplines)) {
      // Add an exlusion list for disciplines that should not be included here (Ceremonies and Rituals)
      const excludedDisciplineKeys = ['ceremonies', 'rituals']

      if (excludedDisciplineKeys.indexOf(key) === -1) {
        masterList.push({
          value: `disciplines.${key}`,
          label: value.displayName,
          group: game.i18n.localize('AZTHARION.VTM.Disciplines')
        })
      }
    }
  }

  // Werewolf
  if (gamesystem === 'werewolf' || isNotEmbedded) {
    const renown = AZTHARION.Renown.getList({})
    for (const [key, value] of Object.entries(renown)) {
      masterList.push({
        value: `renown.${key}`,
        label: value.displayName,
        group: game.i18n.localize('AZTHARION.WTA.Renown')
      })
    }
  }

  return masterList
}

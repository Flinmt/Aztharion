export const _onAddNewRoll = async function (event) {
  event.preventDefault()

  // Generate a new ID
  const newRollID = foundry.utils.randomID(8)

  // Build the new roll
  const defaultRollObject = {
    name: game.i18n.format('AZTHARION.NewString', {
      string: game.i18n.localize('AZTHARION.RollList.Label')
    }),
    isExtendedRoll: false,
    isContestedRoll: false,
    dice: {
      skill: '',
      attribute: ''
    }
  }

  // Get the current list of saved rolls and create a new object inside of them
  const savedRolls = await game.users.current.getFlag('aztharion', 'rollMenuSavedRolls')
  savedRolls[newRollID] = defaultRollObject

  // Persist it back to the user flags
  await game.users.current.setFlag('aztharion', 'rollMenuSavedRolls', savedRolls)

  // Update the active roll to the new
  await game.users.current.setFlag('aztharion', 'rollMenuActiveRoll', newRollID)

  // Re-render the application window once settings are updated
  const RollMenuApplication = foundry.applications.instances.get('aztharion-roll-menu')
  if (RollMenuApplication) {
    RollMenuApplication.render()
  }
}

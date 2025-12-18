export const _onSelectSavedRoll = async function (event, target) {
  const newActiveRoll = target.closest('.saved-roll').getAttribute('data-id')

  await game.users.current.setFlag('aztharion', 'rollMenuActiveRoll', newActiveRoll)

  // Re-render the application window once settings are updated
  const RollMenuApplication = foundry.applications.instances.get('aztharion-roll-menu')
  if (RollMenuApplication) {
    RollMenuApplication.render()
  }
}

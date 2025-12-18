export class AutomationMenu extends FormApplication {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      title: game.i18n.localize('AZTHARION.Settings.AutomationSettings'),
      id: 'aztharion-automation',
      classes: ['aztharion'],
      template: 'systems/aztharion/display/ui/automation-menu.hbs',
      width: 500,
      height: 'auto',
      resizable: true,
      closeOnSubmit: false
    })
  }

  /* -------------------------------------------- */

  /** @override */
  async getData() {
    const data = await super.getData()

    // Encrich editor content
    data.disableAutomation = game.settings.get('aztharion', 'disableAutomation')
    data.automatedWillpower = game.settings.get('aztharion', 'automatedWillpower')
    data.automatedHunger = game.settings.get('aztharion', 'automatedHunger')
    data.automatedOblivion = game.settings.get('aztharion', 'automatedOblivion')
    data.automatedRage = game.settings.get('aztharion', 'automatedRage')

    return data
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    html[0].querySelectorAll('input').forEach((input) => {
      input.addEventListener('change', function (event) {
        event.preventDefault()
        const data = event.target.dataset

        if (data?.id) {
          const settingId = data.id
          const value = event.target.checked

          game.settings.set('aztharion', settingId, value)
        }
      })
    })
  }
}

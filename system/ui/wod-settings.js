export class WoDSettings extends foundry.applications.sidebar.tabs.Settings {
  async _onRender(context, options) {
    await super._onRender(context, options)

    const html = this.element

    // Additional system information resources
    const systemRow = html.querySelectorAll('.settings-sidebar .info .system')
    const systemLinks = `<div class='external-system-links'>
        <a href='https://github.com/Aztharion-Developers/aztharion/releases' target='_blank'>${game.i18n.localize('AZTHARION.Changelog')}</a>
        |
        <a href='https://aztharion-developers.github.io/' target='_blank'>${game.i18n.localize('AZTHARION.Wiki')}</a>
        |
        <a href='https://github.com/Aztharion-Developers/aztharion/issues' target='_blank'>${game.i18n.localize('AZTHARION.Issues')}</a>
      </div>`
    systemRow.forEach((row) => {
      row.insertAdjacentHTML('afterend', systemLinks)
    })

    // License Section
    const accessSection = html.querySelectorAll('.settings-sidebar .access')
    const licenseInformation = `<section class="license flexcol">
      <h4 class="divider">${game.i18n.localize('AZTHARION.LicensedUnderDarkPack')}</h4>
        <section class="info" id='license-information'>
          ${game.i18n.localize('AZTHARION.LicensedUnderDarkPackFulltext')}
        </section>
    </section>`
    accessSection.forEach((section) => {
      section.insertAdjacentHTML('afterend', licenseInformation)
    })
  }
}

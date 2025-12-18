import { BaseDefinitionClass } from './base-definition-class.js'

export class Disciplines extends BaseDefinitionClass {
  static modsEnabled = true
  static type = 'disciplines'
  static defCategory = 'Disciplines'

  // Run any necessary compilation on ready
  static onReady() {
    // Handle adding custom disciplines from the game settings
    let customDisciplines = game.settings.get('aztharion', 'customDisciplines') || {}

    // Handle adding custom disciplines from any active modules
    const activeModules = game.modules.filter(
      (module) => module.active === true && module.flags.aztharion
    )
    activeModules.forEach((module) => {
      if (module.flags.aztharion.customDisciplines) {
        customDisciplines = customDisciplines.concat(module.flags.aztharion.customDisciplines)

        // Log the custom data in the console
        console.log(
          `World of Darkness 5e | Custom Disciplines added by ${module.id}: ${JSON.stringify(module.flags.aztharion.customDisciplines)}`
        )
      }
    })

    if (customDisciplines) {
      Disciplines.addCustom(customDisciplines)
    }

    Disciplines.setSortAlphabetically()
    Disciplines.initializeLabels()
    Disciplines.initializePaths()
  }

  static initializePaths() {
    // Cycle through each entry in the definition file to initialize the paths on each
    // Quickly filter out any non-object, non-null, non-array values
    const definitionEntries = Object.entries(this).filter(
      ([, value]) => typeof value === 'object' && value !== null && !Array.isArray(value)
    )
    for (const [key, value] of definitionEntries) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // Set the path
        value.path = `system.disciplines.${key}.value`
      }
    }
  }

  static animalism = {
    label: 'AZTHARION.VTM.Animalism'
  }

  static auspex = {
    label: 'AZTHARION.VTM.Auspex'
  }

  static celerity = {
    label: 'AZTHARION.VTM.Celerity'
  }

  static dominate = {
    label: 'AZTHARION.VTM.Dominate'
  }

  static fortitude = {
    label: 'AZTHARION.VTM.Fortitude'
  }

  static obfuscate = {
    label: 'AZTHARION.VTM.Obfuscate'
  }

  static potence = {
    label: 'AZTHARION.VTM.Potence'
  }

  static presence = {
    label: 'AZTHARION.VTM.Presence'
  }

  static protean = {
    label: 'AZTHARION.VTM.Protean'
  }

  static sorcery = {
    label: 'AZTHARION.VTM.BloodSorcery'
  }

  static oblivion = {
    label: 'AZTHARION.VTM.Oblivion'
  }

  static alchemy = {
    label: 'AZTHARION.VTM.ThinBloodAlchemy'
  }

  static rituals = {
    label: 'AZTHARION.VTM.Rituals'
  }

  static ceremonies = {
    label: 'AZTHARION.VTM.Ceremonies'
  }
}

// Hook to call onReady when the game is ready
Hooks.once('ready', Disciplines.onReady)

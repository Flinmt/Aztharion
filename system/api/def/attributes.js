import { BaseDefinitionClass } from './base-definition-class.js'

export class Attributes extends BaseDefinitionClass {
  static modsEnabled = true
  static type = 'attributes'
  static defCategory = 'Attributes'

  // Run any necessary compilation on ready
  static onReady() {
    // Handle adding custom disciplines from the game settings
    let customAttributes = game.settings.get('aztharion', 'customAttributes') || {}

    // Handle adding custom disciplines from any active modules
    const activeModules = game.modules.filter(
      (module) => module.active === true && module.flags.aztharion
    )
    activeModules.forEach((module) => {
      if (module.flags.aztharion.customAttributes) {
        customAttributes = customAttributes.concat(module.flags.aztharion.customAttributes)

        // Log the custom data in the console
        console.log(
          `World of Darkness 5e | Custom Attributes added by ${module.id}: ${JSON.stringify(module.flags.aztharion.customAttributes)}`
        )
      }
    })

    if (customAttributes) {
      Attributes.addCustom(customAttributes)
    }

    Attributes.setSortAlphabetically()
    Attributes.initializeLabels()
    Attributes.initializePaths()
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
        value.path = `system.attributes.${key}.value`
      }
    }
  }

  static strength = {
    label: 'AZTHARION.AttributesList.Strength',
    type: 'physical'
  }

  static charisma = {
    label: 'AZTHARION.AttributesList.Charisma',
    type: 'social'
  }

  static intelligence = {
    label: 'AZTHARION.AttributesList.Intelligence',
    type: 'mental'
  }

  static dexterity = {
    label: 'AZTHARION.AttributesList.Dexterity',
    type: 'physical'
  }

  static manipulation = {
    label: 'AZTHARION.AttributesList.Manipulation',
    type: 'social'
  }

  static wits = {
    label: 'AZTHARION.AttributesList.Wits',
    type: 'mental'
  }

  static stamina = {
    label: 'AZTHARION.AttributesList.Stamina',
    type: 'physical'
  }

  static composure = {
    label: 'AZTHARION.AttributesList.Composure',
    type: 'social'
  }

  static resolve = {
    label: 'AZTHARION.AttributesList.Resolve',
    type: 'mental'
  }
}

// Hook to call onReady when the game is ready
Hooks.once('ready', Attributes.onReady)

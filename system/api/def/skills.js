import { BaseDefinitionClass } from './base-definition-class.js'

export class Skills extends BaseDefinitionClass {
  static modsEnabled = true
  static type = 'skills'
  static defCategory = 'Skills'

  // Run any necessary compilation on ready
  static onReady() {
    // Handle adding custom disciplines from the game settings
    let customSkills = game.settings.get('aztharion', 'customSkills') || {}

    // Handle adding custom disciplines from any active modules
    const activeModules = game.modules.filter(
      (module) => module.active === true && module.flags.aztharion
    )
    activeModules.forEach((module) => {
      if (module.flags.aztharion.customSkills) {
        customSkills = customSkills.concat(module.flags.aztharion.customSkills)

        // Log the custom data in the console
        console.log(
          `World of Darkness 5e | Custom Skills added by ${module.id}: ${JSON.stringify(module.flags.aztharion.customSkills)}`
        )
      }
    })

    if (customSkills) {
      Skills.addCustom(customSkills)
    }

    Skills.setSortAlphabetically()
    Skills.initializeLabels()
    Skills.initializePaths()
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
        value.path = `system.skills.${key}.value`
      }
    }
  }

  static athletics = {
    label: 'AZTHARION.SkillsList.Athletics',
    type: 'physical'
  }

  static animalken = {
    label: 'AZTHARION.SkillsList.AnimalKen',
    type: 'social'
  }

  static academics = {
    label: 'AZTHARION.SkillsList.Academics',
    type: 'mental'
  }

  static brawl = {
    label: 'AZTHARION.SkillsList.Brawl',
    type: 'physical'
  }

  static etiquette = {
    label: 'AZTHARION.SkillsList.Etiquette',
    type: 'social'
  }

  static awareness = {
    label: 'AZTHARION.SkillsList.Awareness',
    type: 'mental'
  }

  static craft = {
    label: 'AZTHARION.SkillsList.Craft',
    type: 'physical'
  }

  static insight = {
    label: 'AZTHARION.SkillsList.Insight',
    type: 'social'
  }

  static finance = {
    label: 'AZTHARION.SkillsList.Finance',
    type: 'mental'
  }

  static drive = {
    label: 'AZTHARION.SkillsList.Drive',
    type: 'physical'
  }

  static intimidation = {
    label: 'AZTHARION.SkillsList.Intimidation',
    type: 'social'
  }

  static investigation = {
    label: 'AZTHARION.SkillsList.Investigation',
    type: 'mental'
  }

  static firearms = {
    label: 'AZTHARION.SkillsList.Firearms',
    type: 'physical'
  }

  static leadership = {
    label: 'AZTHARION.SkillsList.Leadership',
    type: 'social'
  }

  static medicine = {
    label: 'AZTHARION.SkillsList.Medicine',
    type: 'mental'
  }

  static larceny = {
    label: 'AZTHARION.SkillsList.Larceny',
    type: 'physical'
  }

  static performance = {
    label: 'AZTHARION.SkillsList.Performance',
    type: 'social'
  }

  static occult = {
    label: 'AZTHARION.SkillsList.Occult',
    type: 'mental'
  }

  static melee = {
    label: 'AZTHARION.SkillsList.Melee',
    type: 'physical'
  }

  static persuasion = {
    label: 'AZTHARION.SkillsList.Persuasion',
    type: 'social'
  }

  static politics = {
    label: 'AZTHARION.SkillsList.Politics',
    type: 'mental'
  }

  static stealth = {
    label: 'AZTHARION.SkillsList.Stealth',
    type: 'physical'
  }

  static streetwise = {
    label: 'AZTHARION.SkillsList.Streetwise',
    type: 'social'
  }

  static science = {
    label: 'AZTHARION.SkillsList.Science',
    type: 'mental'
  }

  static survival = {
    label: 'AZTHARION.SkillsList.Survival',
    type: 'physical'
  }

  static subterfuge = {
    label: 'AZTHARION.SkillsList.Subterfuge',
    type: 'social'
  }

  static technology = {
    label: 'AZTHARION.SkillsList.Technology',
    type: 'mental'
  }
}

// Hook to call onReady when the game is ready
Hooks.once('ready', Skills.onReady)

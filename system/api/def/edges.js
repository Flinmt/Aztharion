import { BaseDefinitionClass } from './base-definition-class.js'

export class Edges extends BaseDefinitionClass {
  static modsEnabled = true
  static type = 'edges'
  static defCategory = 'Edges'

  // Run any necessary compilation on ready
  static onReady() {
    // Handle adding custom disciplines from the game settings
    let customEdges = game.settings.get('aztharion', 'customEdges') || {}

    // Handle adding custom disciplines from any active modules
    const activeModules = game.modules.filter(
      (module) => module.active === true && module.flags.aztharion
    )
    activeModules.forEach((module) => {
      if (module.flags.aztharion.customEdges) {
        customEdges = customEdges.concat(module.flags.aztharion.customEdges)

        // Log the custom data in the console
        console.log(
          `World of Darkness 5e | Custom Edges added by ${module.id}: ${JSON.stringify(module.flags.aztharion.customEdges)}`
        )
      }
    })

    if (customEdges) {
      Edges.addCustom(customEdges)
    }

    Edges.setSortAlphabetically()
    Edges.initializeLabels()
  }

  static arsenal = {
    label: 'AZTHARION.HTR.Arsenal'
  }

  static fleet = {
    label: 'AZTHARION.HTR.Fleet'
  }

  static ordnance = {
    label: 'AZTHARION.HTR.Ordnance'
  }

  static library = {
    label: 'AZTHARION.HTR.Library'
  }

  static improvisedgear = {
    label: 'AZTHARION.HTR.ImprovisedGear'
  }

  static globalaccess = {
    label: 'AZTHARION.HTR.GlobalAccess'
  }

  static dronejockey = {
    label: 'AZTHARION.HTR.DroneJockey'
  }

  static beastwhisperer = {
    label: 'AZTHARION.HTR.BeastWhisperer'
  }

  static sensetheunnatural = {
    label: 'AZTHARION.HTR.SenseTheUnnatural'
  }

  static repeltheunnatural = {
    label: 'AZTHARION.HTR.RepelTheUnnatural'
  }

  static thwarttheunnatural = {
    label: 'AZTHARION.HTR.ThwartTheUnnatural'
  }

  static artifact = {
    label: 'AZTHARION.HTR.Artifact'
  }

  static turncoat = {
    label: 'AZTHARION.HTR.Turncoat'
  }

  static experimentalmedicine = {
    label: 'AZTHARION.HTR.ExperimentalMedicine'
  }

  static cleansetheunnatural = {
    label: 'AZTHARION.HTR.CleanseTheUnnatural'
  }

  static greatdestiny = {
    label: 'AZTHARION.HTR.GreatDestiny'
  }
}

// Hook to call onReady when the game is ready
Hooks.once('ready', Edges.onReady)

import { BaseDefinitionClass } from './base-definition-class.js'

export class Features extends BaseDefinitionClass {
  // Run any necessary compilation on ready
  static onReady() {
    Features.setSortAlphabetically()
    Features.initializeLabels()
  }

  static background = {
    label: 'AZTHARION.ItemsList.Background'
  }

  static merit = {
    label: 'AZTHARION.ItemsList.Merit'
  }

  static flaw = {
    label: 'AZTHARION.ItemsList.Flaw'
  }

  static boon = {
    label: 'AZTHARION.ItemsList.Boon'
  }
}

// Hook to call onReady when the game is ready
Hooks.once('ready', Features.onReady)

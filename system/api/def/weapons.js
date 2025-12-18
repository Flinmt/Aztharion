import { BaseDefinitionClass } from './base-definition-class.js'

export class Weapons extends BaseDefinitionClass {
  // Run any necessary compilation on ready
  static onReady() {
    Weapons.setSortAlphabetically()
    Weapons.initializeLabels()
  }

  static ranged = {
    label: 'AZTHARION.EquipmentList.Ranged'
  }

  static melee = {
    label: 'AZTHARION.EquipmentList.Melee'
  }

  static supernatural = {
    label: 'AZTHARION.EquipmentList.Supernatural'
  }
}

// Hook to call onReady when the game is ready
Hooks.once('ready', Weapons.onReady)

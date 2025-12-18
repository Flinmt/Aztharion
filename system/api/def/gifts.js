import { BaseDefinitionClass } from './base-definition-class.js'

export class Gifts extends BaseDefinitionClass {
  static modsEnabled = true
  static type = 'gifts'
  static defCategory = 'Gifts'

  // Run any necessary compilation on ready
  static onReady() {
    // Handle adding custom disciplines from the game settings
    let customGifts = game.settings.get('aztharion', 'customGifts') || {}

    // Handle adding custom disciplines from any active modules
    const activeModules = game.modules.filter(
      (module) => module.active === true && module.flags.aztharion
    )
    activeModules.forEach((module) => {
      if (module.flags.aztharion.customGifts) {
        customGifts = customGifts.concat(module.flags.aztharion.customGifts)

        // Log the custom data in the console
        console.log(
          `World of Darkness 5e | Custom Gifts added by ${module.id}: ${JSON.stringify(module.flags.aztharion.customGifts)}`
        )
      }
    })

    if (customGifts) {
      Gifts.addCustom(customGifts)
    }

    Gifts.setSortAlphabetically()
    Gifts.initializeLabels()
  }

  static native = {
    label: 'AZTHARION.WTA.Native'
  }

  static ragabash = {
    label: 'AZTHARION.WTA.Ragabash'
  }

  static theurge = {
    label: 'AZTHARION.WTA.Theurge'
  }

  static philodox = {
    label: 'AZTHARION.WTA.Philodox'
  }

  static galliard = {
    label: 'AZTHARION.WTA.Galliard'
  }

  static ahroun = {
    label: 'AZTHARION.WTA.Ahroun'
  }

  static blackfury = {
    label: 'AZTHARION.WTA.BlackFury'
  }

  static bonegnawer = {
    label: 'AZTHARION.WTA.BoneGnawer'
  }

  static childrenofgaia = {
    label: 'AZTHARION.WTA.ChildrenOfGaia'
  }

  static galestalker = {
    label: 'AZTHARION.WTA.Galestalker'
  }

  static ghostcouncil = {
    label: 'AZTHARION.WTA.GhostCouncil'
  }

  static glasswalker = {
    label: 'AZTHARION.WTA.GlassWalker'
  }

  static hartwarden = {
    label: 'AZTHARION.WTA.HartWarden'
  }

  static redtalon = {
    label: 'AZTHARION.WTA.RedTalon'
  }

  static shadowlord = {
    label: 'AZTHARION.WTA.ShadowLord'
  }

  static silentstrider = {
    label: 'AZTHARION.WTA.SilentStrider'
  }

  static silverfang = {
    label: 'AZTHARION.WTA.SilverFang'
  }

  static rite = {
    label: 'AZTHARION.WTA.Rite'
  }
}

// Hook to call onReady when the game is ready
Hooks.once('ready', Gifts.onReady)

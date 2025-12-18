import { AutomationMenu } from '../applications/settings-automation/automation-menu.js'
import { StorytellerMenu } from '../applications/settings-storyteller/storyteller-menu.js'
import { SplatColorsMenu } from '../applications/settings-splat-colors/splat-colors-menu.js'
import { resetActors } from './reset-actors.js'
/* Definitions */
import { Attributes } from '../api/def/attributes.js'
import { Skills } from '../api/def/skills.js'
import { Disciplines } from '../api/def/disciplines.js'
import { Edges } from '../api/def/edges.js'
import { Gifts } from '../api/def/gifts.js'
import { cssVariablesRecord } from './update-css-variables.js'

/**
 * Define all game settings here
 * @return {Promise}
 */
export const loadSettings = async function () {
  // Whether definitions will be sorted alphabetically based on the currently selected language
  game.settings.register('aztharion', 'sortDefAlphabetically', {
    name: game.i18n.localize('AZTHARION.Settings.SortDefAlphabetically'),
    hint: game.i18n.localize('AZTHARION.Settings.SortDefAlphabeticallyHint'),
    scope: 'world',
    config: true,
    type: new foundry.data.fields.StringField({
      required: true,
      blank: false,
      initial: 'default',
      choices: {
        default: 'AZTHARION.Settings.Default',
        all: 'AZTHARION.Settings.All',
        none: 'AZTHARION.Settings.None'
      }
    }),
    requiresReload: true
  })

  // Deactivate Vampire Revised Font
  game.settings.register('aztharion', 'disableVampireFont', {
    name: game.i18n.localize('AZTHARION.Settings.DisableVampireFont'),
    hint: game.i18n.localize('AZTHARION.Settings.DisableVampireFontHint'),
    scope: 'client',
    config: true,
    default: false,
    type: Boolean,
    onChange: () => _updateHeaderFontPreference()
  })

  // Whether the actor banner will appear on sheets or not
  game.settings.register('aztharion', 'actorBanner', {
    name: game.i18n.localize('AZTHARION.Settings.ActorBanner'),
    hint: game.i18n.localize('AZTHARION.Settings.ActorBannerHint'),
    scope: 'client',
    config: true,
    default: true,
    type: Boolean,
    onChange: () => {
      // Update all current actors
      resetActors()
    }
  })

  /*
    Automation Settings
  */

  // Automation Menu
  game.settings.registerMenu('aztharion', 'automationMenu', {
    name: game.i18n.localize('AZTHARION.Settings.AutomationSettings'),
    hint: game.i18n.localize('AZTHARION.Settings.AutomationSettingsHint'),
    label: game.i18n.localize('AZTHARION.Settings.AutomationSettings'),
    icon: 'fas fa-wrench',
    type: AutomationMenu,
    restricted: true
  })

  // Disable All Automation
  game.settings.register('aztharion', 'disableAutomation', {
    name: game.i18n.localize('AZTHARION.Settings.DisableAutomation'),
    hint: game.i18n.localize('AZTHARION.Settings.DisableAutomationHint'),
    scope: 'world',
    config: false,
    default: false,
    type: Boolean,
    onChange: async (value) => {
      if (value) {
        await game.settings.set('aztharion', 'automatedWillpower', false)
        await game.settings.set('aztharion', 'automatedHunger', false)
        await game.settings.set('aztharion', 'automatedOblivion', false)
        await game.settings.set('aztharion', 'automatedRage', false)
      } else {
        await game.settings.set('aztharion', 'automatedWillpower', true)
        await game.settings.set('aztharion', 'automatedHunger', true)
        await game.settings.set('aztharion', 'automatedOblivion', true)
        await game.settings.set('aztharion', 'automatedRage', true)
      }

      // Re-render the automation window once settings are updated
      const AutomationWindow = Object.values(ui.windows).filter(
        (w) => w.id === 'aztharion-automation'
      )[0]
      if (AutomationWindow) {
        AutomationWindow.render()
      }
    }
  })

  // Automated Willpower
  game.settings.register('aztharion', 'automatedWillpower', {
    name: game.i18n.localize('AZTHARION.Settings.AutomateWillpower'),
    hint: game.i18n.localize('AZTHARION.Settings.AutomateWillpowerHint'),
    scope: 'world',
    config: false,
    default: true,
    type: Boolean
  })

  // Automated Hunger
  game.settings.register('aztharion', 'automatedHunger', {
    name: game.i18n.localize('AZTHARION.Settings.AutomateHunger'),
    hint: game.i18n.localize('AZTHARION.Settings.AutomateHungerHint'),
    scope: 'world',
    config: false,
    default: true,
    type: Boolean
  })

  // Automated Oblivion Rolls
  game.settings.register('aztharion', 'automatedOblivion', {
    name: game.i18n.localize('AZTHARION.Settings.AutomateOblivion'),
    hint: game.i18n.localize('AZTHARION.Settings.AutomateOblivionHint'),
    scope: 'world',
    config: false,
    default: true,
    type: Boolean
  })

  // Automated Rage
  game.settings.register('aztharion', 'automatedRage', {
    name: game.i18n.localize('AZTHARION.Settings.AutomateRage'),
    hint: game.i18n.localize('AZTHARION.Settings.AutomateRageHint'),
    scope: 'world',
    config: false,
    default: true,
    type: Boolean
  })

  /*
    Storyteller Settings
  */

  // Register the storyteller menu
  game.settings.registerMenu('aztharion', 'storytellerMenu', {
    name: game.i18n.localize('AZTHARION.Settings.StorytellerMenu'),
    hint: game.i18n.localize('AZTHARION.Settings.StorytellerMenuHint'),
    label: game.i18n.localize('AZTHARION.Settings.StorytellerMenu'),
    icon: 'fas fa-bars',
    type: StorytellerMenu,
    restricted: true
  })

  const modCustomList = {
    attribute: {
      defCategory: 'Attributes',
      defClass: Attributes
    },
    skill: {
      defCategory: 'Skills',
      defClass: Skills
    },
    discipline: {
      defCategory: 'Disciplines',
      defClass: Disciplines
    },
    edge: {
      defCategory: 'Edges',
      defClass: Edges
    },
    gift: {
      defCategory: 'Gifts',
      defClass: Gifts
    }
  }

  for (const [, value] of Object.entries(modCustomList)) {
    // Register the modification
    game.settings.register('aztharion', `modified${value.defCategory}`, {
      name: game.i18n.localize(`AZTHARION.Settings.Modified${value.defCategory}`),
      hint: game.i18n.localize(`AZTHARION.Settings.Modified${value.defCategory}Hint`),
      scope: 'world',
      config: false,
      default: [],
      type: Array,
      onChange: async () => {
        // Re-render the storyteller menu window once settings are updated
        _rerenderStorytellerWindow()

        // Re-init labels
        await value.defClass.initializeLabels()
      }
    })

    // Register the custom subtype
    game.settings.register('aztharion', `custom${value.defCategory}`, {
      name: game.i18n.localize(`AZTHARION.Settings.Custom${value.defCategory}`),
      hint: game.i18n.localize(`AZTHARION.Settings.Custom${value.defCategory}Hint`),
      scope: 'world',
      config: false,
      default: [],
      type: Array,
      onChange: async (custom) => {
        // Re-render the storyteller menu window once settings are updated
        _rerenderStorytellerWindow()

        // Grab the custom attributes and send them to the function to update the list
        await value.defClass.addCustom(custom)

        // Re-init labels
        await value.defClass.initializeLabels()
      }
    })
  }

  // Automatically collapse chat message descriptions
  game.settings.register('aztharion', 'autoCollapseDescriptions', {
    name: game.i18n.localize('AZTHARION.Settings.AutoCollapseDescriptions'),
    hint: game.i18n.localize('AZTHARION.Settings.AutoCollapseDescriptionsHint'),
    scope: 'client',
    config: true,
    default: false,
    type: Boolean
  })

  // Override for the default actor header image
  game.settings.register('aztharion', 'actorHeaderOverride', {
    name: game.i18n.localize('AZTHARION.Settings.ActorHeaderOverride'),
    hint: game.i18n.localize('AZTHARION.Settings.ActorHeaderOverrideHint'),
    scope: 'world',
    config: true,
    default: '',
    type: String,
    filePicker: 'image',
    onChange: async () => {
      // Reload actorsheets
      resetActors()
    }
  })

  // Override for the default actor backgrounds
  game.settings.register('aztharion', 'actorBackgroundOverride', {
    name: game.i18n.localize('AZTHARION.Settings.ActorBackgroundOverride'),
    hint: game.i18n.localize('AZTHARION.Settings.ActorBackgroundOverrideHint'),
    scope: 'world',
    config: true,
    default: '',
    type: String,
    filePicker: 'image',
    onChange: async () => {
      // Reload actorsheets
      resetActors()
    }
  })

  // Override for the "Gain" XP Icon
  game.settings.register('aztharion', 'gainXpIconOverride', {
    name: game.i18n.localize('AZTHARION.Settings.GainXpIconOverride'),
    hint: game.i18n.localize('AZTHARION.Settings.GainXpIconOverrideHint'),
    scope: 'world',
    config: true,
    default: '',
    type: String,
    filePicker: 'image',
    onChange: async (newIcon) => {
      if (newIcon) {
        document.documentElement.style.setProperty('--xp-gain-icon', `url("/${newIcon}")`)
      } else {
        document.documentElement.style.removeProperty('--xp-gain-icon')
      }
    }
  })

  // Override for the "Spend" XP Icon
  game.settings.register('aztharion', 'spendXpIconOverride', {
    name: game.i18n.localize('AZTHARION.Settings.SpendXpIconOverride'),
    hint: game.i18n.localize('AZTHARION.Settings.SpendXpIconOverrideHint'),
    scope: 'world',
    config: true,
    default: '',
    type: String,
    filePicker: 'image',
    onChange: async (newIcon) => {
      if (newIcon) {
        document.documentElement.style.setProperty('--xp-spend-icon', `url("/${newIcon}")`)
      } else {
        document.documentElement.style.removeProperty('--xp-spend-icon')
      }
    }
  })

  // Override for the "Neutral" XP Icon
  game.settings.register('aztharion', 'neutralXpIconOverride', {
    name: game.i18n.localize('AZTHARION.Settings.NeutralXpIconOverride'),
    hint: game.i18n.localize('AZTHARION.Settings.NeutralXpIconOverrideHint'),
    scope: 'world',
    config: true,
    default: '',
    type: String,
    filePicker: 'image',
    onChange: async (newIcon) => {
      if (newIcon) {
        document.documentElement.style.setProperty('--xp-neutral-icon', `url("/${newIcon}")`)
      } else {
        document.documentElement.style.removeProperty('--xp-neutral-icon')
      }
    }
  })

  // World Version, only really needed by developers
  game.settings.register('aztharion', 'worldVersion', {
    name: game.i18n.localize('AZTHARION.Settings.WorldVersion'),
    hint: game.i18n.localize('AZTHARION.Settings.WorldVersionHint'),
    scope: 'world',
    config: true,
    default: '1.5',
    type: String
  })

  // Whether the user declined the migration or not
  game.settings.register('aztharion', 'declinedMigration', {
    scope: 'world',
    config: false,
    default: false,
    type: Boolean
  })

  // Whether the world has finished the settings migration or not
  game.settings.register('aztharion', 'settingsMigrationComplete', {
    scope: 'world',
    config: false,
    default: false,
    type: Boolean
  })

  /*
    Splat Colors Menu
  */

  // Register the splat colors menu
  game.settings.registerMenu('aztharion', 'splatColorsMenu', {
    name: game.i18n.localize('AZTHARION.Settings.SplatColorsMenu'),
    hint: game.i18n.localize('AZTHARION.Settings.SplatColorsHint'),
    label: game.i18n.localize('AZTHARION.Settings.SplatColorsMenu'),
    icon: 'fa-solid fa-palette',
    type: SplatColorsMenu,
    restricted: true
  })

  // Register variable settings
  const cssVariables = cssVariablesRecord()
  Object.keys(cssVariables).forEach((theme) => {
    const settings = cssVariables[theme].settings

    Object.keys(settings).forEach((settingKey) => {
      const { settingId, defaultColor } = settings[settingKey]

      // Register the setting
      game.settings.register('aztharion', settingId, {
        scope: 'world',
        config: false,
        default: defaultColor,
        type: String
      })
    })
  })
}

function _rerenderStorytellerWindow() {
  const storytellerWindow = Object.values(ui.windows).filter((w) => w.id === 'aztharion-storyteller')[0]

  if (storytellerWindow) {
    storytellerWindow.render()
  }
}

/**
 * Set whether the system uses the vampireRevised font for headers or not
 */
export const _updateHeaderFontPreference = async function () {
  const clientSetting = game.settings.get('aztharion', 'disableVampireFont')

  if (clientSetting) {
    // Remove the class from the document body
    document.body.classList.remove('vampire-font-headers')
  } else {
    // Append the class to the document body
    document.body.classList.add('vampire-font-headers')
  }
}

/**
 * Update the XP icons
 */
export const _updateXpIconOverrides = async function () {
  const spendIcon = game.settings.get('aztharion', 'spendXpIconOverride')
  const gainIcon = game.settings.get('aztharion', 'gainXpIconOverride')
  const neutralIcon = game.settings.get('aztharion', 'neutralXpIconOverride')

  if (spendIcon) {
    document.documentElement.style.setProperty('--xp-spend-icon', `url("/${spendIcon}")`)
  }

  if (gainIcon) {
    document.documentElement.style.setProperty('--xp-gain-icon', `url("/${gainIcon}")`)
  }

  if (neutralIcon) {
    document.documentElement.style.setProperty('--xp-neutral-icon', `url("/${neutralIcon}")`)
  }
}

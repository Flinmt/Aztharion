import { BaseDefinitionClass } from './base-definition-class.js'

export class WereForms extends BaseDefinitionClass {
  // Override the initializeLabels method to add extra functionality
  static initializeLabels() {
    super.initializeLabels()

    for (const [, value] of Object.entries(this)) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // Initialize the nickname label too
        value.nickname = game.i18n.localize(value.nickname)

        // Localize the Werewolf attributes
        // This function always localizes the label, and then localizes the
        // hintDescription if one exists
        value.attributes = value.attributes.map((attribute) => {
          return {
            label: game.i18n.localize(attribute.label),
            ...(attribute.hintDescription && {
              hintDescription: game.i18n.localize(attribute.hintDescription)
            }),
            ...(attribute.hintIcon && {
              hintIcon: attribute.hintIcon
            })
          }
        })
      }
    }
  }

  // Run any necessary compilation on ready
  static onReady() {
    WereForms.initializeLabels()
  }

  static homid = {
    label: 'AZTHARION.WTA.HomidName',
    nickname: 'AZTHARION.WTA.HomidTitle',
    cost: 0,
    glyph: 'systems/aztharion/assets/icons/werewolf-forms/homid.webp',
    attributes: [{ label: 'AZTHARION.WTA.SilverImmunity' }]
  }

  static glabro = {
    label: 'AZTHARION.WTA.GlabroName',
    nickname: 'AZTHARION.WTA.GlabroTitle',
    cost: 1,
    glyph: 'systems/aztharion/assets/icons/werewolf-forms/glabro.webp',
    attributes: [
      { label: 'AZTHARION.WTA.GlabroPhysicalTests' },
      {
        label: 'AZTHARION.WTA.GlabroSocialTests',
        hintIcon: '*',
        hintDescription: 'AZTHARION.WTA.GlabroSocialTestExclusion'
      },
      { label: 'AZTHARION.WTA.GlabroRegenerate' }
    ],
    bonuses: [
      {
        source: 'AZTHARION.WTA.GlabroName',
        value: 2,
        paths: ['attributes.strength', 'attributes.dexterity', 'attributes.stamina'],
        activeWhen: {
          check: 'isEqual',
          path: 'activeForm',
          value: 'glabro'
        }
      },
      {
        source: 'AZTHARION.WTA.GlabroName',
        value: -2,
        paths: ['attributes.charisma', 'attributes.manipulation', 'attributes.composure'],
        unless: ['skills.intimidation'],
        activeWhen: {
          check: 'isEqual',
          path: 'activeForm',
          value: 'glabro'
        }
      }
    ]
  }

  static crinos = {
    label: 'AZTHARION.WTA.CrinosName',
    nickname: 'AZTHARION.WTA.CrinosTitle',
    cost: 2,
    glyph: 'systems/aztharion/assets/icons/werewolf-forms/crinos.webp',
    attributes: [
      { label: 'AZTHARION.WTA.CrinosFrenzy' },
      { label: 'AZTHARION.WTA.CrinosPhysicalTests' },
      { label: 'AZTHARION.WTA.CrinosHealth' },
      {
        label: 'AZTHARION.WTA.CrinosSocialTests',
        hintIcon: '*',
        hintDescription: 'AZTHARION.WTA.CrinosSocialTestExclusion'
      },
      { label: 'AZTHARION.WTA.CrinosRegenerate' },
      { label: 'AZTHARION.WTA.CrinosClaws' },
      { label: 'AZTHARION.WTA.CrinosBite' },
      { label: 'AZTHARION.WTA.CausesDelirium' }
    ],
    bonuses: [
      {
        source: 'AZTHARION.WTA.CrinosName',
        value: 4,
        paths: ['attributes.strength', 'attributes.dexterity', 'attributes.stamina'],
        activeWhen: {
          check: 'isEqual',
          path: 'activeForm',
          value: 'crinos'
        }
      }
    ]
  }

  static hispo = {
    label: 'AZTHARION.WTA.HispoName',
    nickname: 'AZTHARION.WTA.HispoTitle',
    cost: 1,
    glyph: 'systems/aztharion/assets/icons/werewolf-forms/hispo.webp',
    attributes: [
      {
        label: 'AZTHARION.WTA.HispoPhysicalTests',
        hintIcon: '*',
        hintDescription: 'AZTHARION.WTA.HispoBonusExclusion'
      },
      { label: 'AZTHARION.WTA.HispoStealthTests' },
      { label: 'AZTHARION.WTA.HispoSocialTests' },
      { label: 'AZTHARION.WTA.HispoRegenerate' },
      { label: 'AZTHARION.WTA.HispoBite' }
    ],
    bonuses: [
      {
        source: 'AZTHARION.WTA.HispoName',
        value: 2,
        paths: ['attributes.strength', 'attributes.dexterity', 'attributes.stamina'],
        unless: ['skills.stealth'],
        activeWhen: {
          check: 'isEqual',
          path: 'activeForm',
          value: 'hispo'
        }
      },
      {
        source: 'AZTHARION.WTA.HispoName',
        value: -2,
        paths: ['skills.stealth'],
        activeWhen: {
          check: 'isEqual',
          path: 'activeForm',
          value: 'hispo'
        }
      }
    ]
  }

  static lupus = {
    label: 'AZTHARION.WTA.LupusName',
    nickname: 'AZTHARION.WTA.LupusTitle',
    cost: 0,
    glyph: 'systems/aztharion/assets/icons/werewolf-forms/lupus.webp',
    attributes: [{ label: 'AZTHARION.WTA.SilverImmunity' }, { label: 'AZTHARION.WTA.LupusSocialTests' }]
  }
}

Hooks.once('ready', WereForms.onReady)

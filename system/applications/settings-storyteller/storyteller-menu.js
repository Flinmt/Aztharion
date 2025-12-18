/* Definitions */
import { Attributes } from '../../api/def/attributes.js'
import { Skills } from '../../api/def/skills.js'
import { Disciplines } from '../../api/def/disciplines.js'
import { Edges } from '../../api/def/edges.js'
import { Gifts } from '../../api/def/gifts.js'

export class StorytellerMenu extends FormApplication {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      title: game.i18n.localize('AZTHARION.Settings.StorytellerMenu'),
      id: 'aztharion-storyteller',
      classes: ['aztharion'],
      template: 'systems/aztharion/display/ui/storyteller-menu.hbs',
      width: 500,
      height: 450,
      resizable: true,
      closeOnSubmit: true,
      tabs: [
        {
          navSelector: '.sheet-tabs',
          contentSelector: 'section',
          initial: 'modifications'
        }
      ]
    })
  }

  constructor(application, options) {
    super(application, options)

    this.listKeys = {
      attribute: {
        newModTitle: game.i18n.format('AZTHARION.Settings.NewStringModification', {
          string: game.i18n.localize('AZTHARION.AttributesList.Label')
        }),
        defCategory: 'Attributes',
        labelCategory: 'AttributesList',
        defClass: Attributes
      },
      skill: {
        newModTitle: game.i18n.format('AZTHARION.Settings.NewStringModification', {
          string: game.i18n.localize('AZTHARION.SkillsList.Label')
        }),
        defCategory: 'Skills',
        labelCategory: 'SkillsList',
        defClass: Skills
      },
      discipline: {
        newModTitle: game.i18n.format('AZTHARION.Settings.NewStringModification', {
          string: game.i18n.localize('AZTHARION.VTM.Discipline')
        }),
        defCategory: 'Disciplines',
        labelCategory: 'DisciplinesList',
        defClass: Disciplines
      },
      edge: {
        newModTitle: game.i18n.format('AZTHARION.Settings.NewStringModification', {
          string: game.i18n.localize('AZTHARION.HTR.Edge')
        }),
        defCategory: 'Edges',
        labelCategory: 'EdgesList',
        defClass: Edges
      },
      gift: {
        newModTitle: game.i18n.format('AZTHARION.Settings.NewStringModification', {
          string: game.i18n.localize('AZTHARION.WTA.Gift')
        }),
        defCategory: 'Gifts',
        labelCategory: 'GiftsList',
        defClass: Gifts
      }
    }
  }

  /* -------------------------------------------- */

  /** @override */
  async getData() {
    const data = await super.getData()

    data.attributeTypes = {
      physical: 'AZTHARION.SPC.Physical',
      social: 'AZTHARION.SPC.Social',
      mental: 'AZTHARION.SPC.Mental'
    }

    // Grab the modifications from the game settings and add them to the application data
    data.attributeModifications = game.settings.get('aztharion', 'modifiedAttributes')
    data.skillModifications = game.settings.get('aztharion', 'modifiedSkills')
    data.disciplineModifications = game.settings.get('aztharion', 'modifiedDisciplines')
    data.edgeModifications = game.settings.get('aztharion', 'modifiedEdges')
    data.giftModifications = game.settings.get('aztharion', 'modifiedGifts')

    // Grab the custom features from the game settings and add them to the application data
    data.customAttributes = game.settings.get('aztharion', 'customAttributes')
    data.customSkills = game.settings.get('aztharion', 'customSkills')
    data.customDisciplines = game.settings.get('aztharion', 'customDisciplines')
    data.customEdges = game.settings.get('aztharion', 'customEdges')
    data.customGifts = game.settings.get('aztharion', 'customGifts')

    return data
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    const handleClick = (selector, handler) => {
      html[0].querySelectorAll(selector).forEach((element) => {
        element.addEventListener('click', function (event) {
          event.preventDefault()
          const data = event.target.dataset
          handler(data)
        })
      })
    }

    const addCustomItem = async (listKey, label) => {
      const list = await game.settings.get('aztharion', listKey)
      const newItem = {
        id: foundry.utils.randomID(8),
        label
      }

      // Fill in extra default data for custom attributes/skills
      if (listKey === 'customAttributes' || listKey === 'customSkills') {
        newItem.type = 'physical'
      }

      // Push the default item into the main list and save the new setting
      list.push(newItem)
      await game.settings.set('aztharion', listKey, list)
    }

    handleClick('.add-mod-button', ({ type }) => this._onGenerateModPrompt(type))
    handleClick('.remove-mod-button', ({ type, id }) => this._onRemoveChange(type, id))

    handleClick('.add-custom-button', async ({ type }) => {
      if (type === 'attribute') {
        await addCustomItem('customAttributes', 'New Attribute')
      } else if (type === 'skill') {
        await addCustomItem('customSkills', 'New Skill')
      } else if (type === 'discipline') {
        await addCustomItem('customDisciplines', 'New Discipline')
      } else if (type === 'edge') {
        await addCustomItem('customEdges', 'New Edge')
      } else if (type === 'gift') {
        await addCustomItem('customGifts', 'New Gift')
      }
    })

    handleClick('.remove-custom-button', ({ type, id }) => this._onRemoveCustom(type, id))

    handleClick('.save-modifications', () => {
      const modifications = {
        attribute: [],
        skill: [],
        discipline: [],
        edge: [],
        gift: []
      }
      const custom = {
        attribute: [],
        skill: [],
        discipline: [],
        edge: [],
        gift: []
      }

      const handleFeature = (feature, list) => {
        const { id, type, label } = feature.dataset
        const rename = $(feature).find('.mod-rename')[0].value
        const hidden = $(feature).find('.mod-hidden')[0].checked
        list[type].push({ id, rename, label, hidden })
      }

      const handleCustomFeature = (feature, customList) => {
        const { id, type } = feature.dataset
        const label = $(feature).find('.label')[0].value
        const attrType = $(feature).find('.attr-type')[0]?.value || ''
        const newItem = { id, label }
        if (type === 'attribute' || type === 'skill') newItem.type = attrType
        customList[type].push(newItem)
      }

      html[0].querySelectorAll('.modification-row').forEach(function (row) {
        handleFeature(row, modifications)
      })

      html[0].querySelectorAll('.customization-row').forEach(function (row) {
        handleCustomFeature(row, custom)
      })

      // Attributes
      game.settings.set('aztharion', 'modifiedAttributes', modifications.attribute)
      game.settings.set('aztharion', 'customAttributes', custom.attribute)
      // SKills
      game.settings.set('aztharion', 'modifiedSkills', modifications.skill)
      game.settings.set('aztharion', 'customSkills', custom.skill)
      // Disciplines
      game.settings.set('aztharion', 'modifiedDisciplines', modifications.discipline)
      game.settings.set('aztharion', 'customDisciplines', custom.discipline)
      // Edges
      game.settings.set('aztharion', 'modifiedEdges', modifications.edge)
      game.settings.set('aztharion', 'customEdges', custom.edge)
      // Gifts
      game.settings.set('aztharion', 'modifiedGifts', modifications.gift)
      game.settings.set('aztharion', 'customGifts', custom.gift)
    })
  }

  // Function for getting the information necessary for the selection dialog
  async _onGenerateModPrompt(type) {
    const list = await AZTHARION[this.listKeys[type].defCategory].getList({})
    this._onRenderPromptDialog(type, list, this.listKeys[type].newModTitle)
  }

  // Function for rendering the dialog for adding a new modification
  async _onRenderPromptDialog(type, list, title) {
    const modifiedKey = `modified${this.listKeys[type].defCategory}`
    const modifiedList = await game.settings.get('aztharion', modifiedKey)

    const effectiveList = Object.fromEntries(
      Object.entries(list).filter((item) => !modifiedList.some((mod) => mod.id === item[0]))
    )

    const template = 'systems/aztharion/display/ui/select-dialog.hbs'
    const content = await foundry.applications.handlebars.renderTemplate(template, {
      options: effectiveList
    })

    const result = await foundry.applications.api.DialogV2.input({
      window: { title },
      content,
      ok: {
        icon: 'fas fa-check',
        label: game.i18n.localize('AZTHARION.Add')
      },
      buttons: [
        {
          action: 'cancel',
          icon: 'fas fa-times',
          label: game.i18n.localize('AZTHARION.Cancel'),
          type: 'button'
        }
      ]
    })

    if (result !== 'cancel') {
      const id = result.optionSelect
      const label = list[id]?.label || id
      modifiedList.push({ id, label, rename: '', hidden: false })
      await game.settings.set('aztharion', modifiedKey, modifiedList)
    }
  }

  // Function for removing a change
  async _onRemoveChange(type, id) {
    const modifiedKey = `modified${this.listKeys[type].defCategory}`
    let modifiedList = await game.settings.get('aztharion', modifiedKey)
    modifiedList = modifiedList.filter((item) => item.id !== id)
    await game.settings.set('aztharion', modifiedKey, modifiedList)
  }

  // Function for removing a custom feature
  async _onRemoveCustom(type, id) {
    const customKey = `custom${this.listKeys[type].defCategory}`
    delete this.listKeys[type].defClass[id]
    let customList = await game.settings.get('aztharion', customKey)
    customList = customList.filter((item) => item.id !== id)
    await game.settings.set('aztharion', customKey, customList)
  }
}

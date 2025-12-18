// Preparation functions
import {
  prepareDescriptionContext,
  prepareModifiersContext,
  prepareItemSettingsContext
} from '../scripts/prepare-partials.js'
import { preparePatronSpiritContext } from './scripts/prepare-partials.js'
// Base item sheet to extend from
import { WoDItemBase } from '../wod-item-base.js'
// Mixin
const { HandlebarsApplicationMixin } = foundry.applications.api

/**
 * Extend the WoDItemBase document
 * @extends {WoDItemBase}
 */
export class TribeItemSheet extends HandlebarsApplicationMixin(WoDItemBase) {
  static DEFAULT_OPTIONS = {
    classes: ['aztharion', 'item', 'sheet'],
    actions: {}
  }

  static PARTS = {
    header: {
      template: 'systems/aztharion/display/wta/items/tribe-sheet.hbs'
    },
    tabs: {
      template: 'templates/generic/tab-navigation.hbs'
    },
    description: {
      template: 'systems/aztharion/display/shared/items/parts/description.hbs'
    },
    patronSpirit: {
      template: 'systems/aztharion/display/wta/items/parts/patron-spirit.hbs'
    },
    modifiers: {
      template: 'systems/aztharion/display/shared/items/parts/modifiers.hbs'
    },
    settings: {
      template: 'systems/aztharion/display/shared/items/parts/item-settings.hbs'
    }
  }

  tabs = {
    description: {
      id: 'description',
      group: 'primary',
      label: 'AZTHARION.Tabs.Description'
    },
    patronSpirit: {
      id: 'patronSpirit',
      group: 'primary',
      label: 'AZTHARION.WTA.PatronSpirit'
    },
    modifiers: {
      id: 'modifiers',
      group: 'primary',
      label: 'AZTHARION.ItemsList.Modifiers'
    },
    settings: {
      id: 'settings',
      group: 'primary',
      label: 'AZTHARION.ItemsList.ItemSettings'
    }
  }

  async _prepareContext() {
    // Top-level variables
    const data = await super._prepareContext()

    return data
  }

  async _preparePartContext(partId, context, options) {
    // Inherit any preparation from the extended class
    context = { ...(await super._preparePartContext(partId, context, options)) }

    // Top-level variables
    const item = this.item

    // Prepare each page context
    switch (partId) {
      // Stats
      case 'description':
        return prepareDescriptionContext(context, item)
      case 'patronSpirit':
        return preparePatronSpiritContext(context, item)
      case 'modifiers':
        return prepareModifiersContext(context, item)
      case 'settings':
        return prepareItemSettingsContext(context, item)
    }

    return context
  }
}

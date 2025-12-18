// Preparation functions
import {
  prepareBiographyContext,
  prepareExperienceContext,
  prepareFeaturesContext,
  prepareEquipmentContext,
  prepareNotepadContext,
  prepareSettingsContext,
  prepareStatsContext,
  prepareLimitedContext
} from './scripts/prepare-partials.js'
// Base actor sheet to extend from
import { WoDActorBase } from './wod-actor-base.js'
// Mixin
const { HandlebarsApplicationMixin } = foundry.applications.api

/**
 * Extend the WoDActorBase document
 * @extends {WoDActorBase}
 */
export class MortalActorSheet extends HandlebarsApplicationMixin(WoDActorBase) {
  static DEFAULT_OPTIONS = {
    classes: ['aztharion', 'actor', 'sheet', 'mortal'],
    actions: {}
  }

  static PARTS = {
    header: {
      template: 'systems/aztharion/display/shared/actors/mortal-sheet.hbs'
    },
    tabs: {
      template: 'systems/aztharion/display/shared/actors/parts/tab-navigation.hbs'
    },
    stats: {
      template: 'systems/aztharion/display/shared/actors/parts/stats.hbs'
    },
    experience: {
      template: 'systems/aztharion/display/shared/actors/parts/experience.hbs'
    },
    features: {
      template: 'systems/aztharion/display/shared/actors/parts/features.hbs'
    },
    equipment: {
      template: 'systems/aztharion/display/shared/actors/parts/equipment.hbs'
    },
    biography: {
      template: 'systems/aztharion/display/shared/actors/parts/biography.hbs'
    },
    notepad: {
      template: 'systems/aztharion/display/shared/actors/parts/notepad.hbs'
    },
    settings: {
      template: 'systems/aztharion/display/shared/actors/parts/actor-settings.hbs'
    },
    banner: {
      template: 'systems/aztharion/display/shared/actors/parts/type-banner.hbs'
    },
    limited: {
      template: 'systems/aztharion/display/shared/actors/limited-sheet.hbs'
    }
  }

  tabs = {
    stats: {
      id: 'stats',
      group: 'primary',
      title: 'AZTHARION.Tabs.Stats',
      icon: '<i class="fa-regular fa-chart-line"></i>'
    },
    experience: {
      id: 'experience',
      group: 'primary',
      title: 'AZTHARION.Tabs.Experience',
      icon: '<i class="fa-solid fa-file-contract"></i>'
    },
    features: {
      id: 'features',
      group: 'primary',
      title: 'AZTHARION.Tabs.Features',
      icon: '<i class="fas fa-gem"></i>'
    },
    equipment: {
      id: 'equipment',
      group: 'primary',
      title: 'AZTHARION.Tabs.Equipment',
      icon: '<i class="fa-solid fa-toolbox"></i>'
    },
    biography: {
      id: 'biography',
      group: 'primary',
      title: 'AZTHARION.Tabs.Biography',
      icon: '<i class="fas fa-id-card"></i>'
    },
    notepad: {
      id: 'notepad',
      group: 'primary',
      title: 'AZTHARION.Tabs.Notes',
      icon: '<i class="fas fa-sticky-note"></i>'
    },
    settings: {
      id: 'settings',
      group: 'primary',
      title: 'AZTHARION.Tabs.Settings',
      icon: '<i class="fa-solid fa-gears"></i>'
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
    const actor = this.actor

    // Prepare each page context
    switch (partId) {
      // Stats
      case 'stats':
        return prepareStatsContext(context, actor)

      // Experience
      case 'experience':
        return prepareExperienceContext(context, actor)

      // Features
      case 'features':
        return prepareFeaturesContext(context, actor)

      // Equipment
      case 'equipment':
        return prepareEquipmentContext(context, actor)

      // Biography
      case 'biography':
        return prepareBiographyContext(context, actor)

      // Notepad
      case 'notepad':
        return prepareNotepadContext(context, actor)

      // Settings
      case 'settings':
        return prepareSettingsContext(context, actor)

      // Limited view
      case 'limited':
        return prepareLimitedContext(context, actor)
    }

    return context
  }
}

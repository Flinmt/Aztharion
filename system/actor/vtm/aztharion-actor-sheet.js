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
} from '../scripts/prepare-partials.js'
import { prepareDisciplinesContext, prepareBloodContext } from './scripts/prepare-partials.js'
import { prepareEdgesContext } from '../htr/scripts/prepare-partials.js'
// Various button functions
import {
  _onAddDiscipline,
  _onDisciplineToChat,
  _onRemoveDiscipline,
  _onSelectDiscipline,
  _onSelectDisciplinePower
} from './scripts/disciplines.js'
import { _onFrenzyRoll } from './scripts/frenzy-roll.js'
import { _onEndFrenzy } from './scripts/end-frenzy.js'
import { _onRemorseRoll } from './scripts/roll-remorse.js'
import {
  _onAddEdge,
  _onRemoveEdge,
  _onEdgeToChat,
  _onSelectEdgePerk,
  _onSelectEdge
} from '../htr/scripts/edges.js'

// import { _onDotCounterChange, _onDotCounterEmpty } from '../scripts/counters.js'
// Base actor sheet to extend from
import { WoDActorBase } from '../wod-actor-base.js'
// Mixin
const { HandlebarsApplicationMixin } = foundry.applications.api

/**
 * Extend the WoDActorBase document
 * @extends {WoDActorBase}
 */
export class AztharionActorSheet extends HandlebarsApplicationMixin(WoDActorBase) {
  static DEFAULT_OPTIONS = {
    classes: ['aztharion', 'actor', 'sheet', 'vampire', 'aztharion'],
    actions: {
      addDiscipline: _onAddDiscipline,
      removeDiscipline: _onRemoveDiscipline,
      disciplineChat: _onDisciplineToChat,
      selectDiscipline: _onSelectDiscipline,
      selectDisciplinePower: _onSelectDisciplinePower,
      resistFrenzy: _onFrenzyRoll,
      endFrenzy: _onEndFrenzy,
      remorseRoll: _onRemorseRoll,
      addEdge: _onAddEdge,
      removeEdge: _onRemoveEdge,
      edgeChat: _onEdgeToChat,
      selectEdge: _onSelectEdge,
      selectEdgePerk: _onSelectEdgePerk,
      dotCounterChange: _onDotCounterChange,
      dotCounterEmpty: _onDotCounterEmpty
    }
  }

  static PARTS = {
    header: {
      template: 'systems/aztharion/display/vtm/actors/aztharion-sheet.hbs'
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
    disciplines: {
      template: 'systems/aztharion/display/vtm/actors/parts/disciplines.hbs'
    },
    edges: {
      template: 'systems/aztharion/display/htr/actors/parts/edges.hbs'
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
    disciplines: {
      id: 'disciplines',
      group: 'primary',
      title: 'AZTHARION.VTM.Disciplines',
      icon: '<span class="aztharion-symbol">b</span>'
    },
    edges: {
      id: 'edges',
      group: 'primary',
      title: 'AZTHARION.HTR.Edges',
      icon: '<span class="aztharion-symbol hunter">e</span>'
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
    const actor = this.actor
    const actorData = actor.system

    // Filters for item-specific data
    const clanFilter = actor.items.filter((item) => item.type === 'clan')

    // Prepare vampire-specific items
    data.domitor = actorData.headers.domitor
    data.humanity = actorData.humanity
    data.hunger = actorData.hunger
    data.clan = clanFilter[0]
    data.frenzyActive = actorData.frenzyActive

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

      // Disciplines
      case 'disciplines':
        return prepareDisciplinesContext(context, actor)

      // Edges
      case 'edges':
        return prepareEdgesContext(context, actor)

      // Disciplines
      case 'blood':
        return prepareBloodContext(context, actor)

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

/**
 * Handle dot counters
 */
async function _onDotCounterChange(event, target) {
  event.preventDefault()

  // Top-level variables
  const element = target
  const dataset = element.dataset
  const index = parseInt(dataset.index)
  const parent = element.closest('.resource-value')
  const fieldStrings = parent.dataset.name

  // Actor
  const actor = this.actor

  // Debugging
  // ui.notifications.info(`Debug: Updating ${fieldStrings} to ${index + 1} for ${actor.name}`)

  // Update
  if (index >= 0) {
      await actor.update({ [fieldStrings]: index + 1 })
  }
}

/**
 * Handle empty dot counters
 */
async function _onDotCounterEmpty(event, target) {
  event.preventDefault()
  
  // Top-level variables
  const element = target
  const parent = element.closest('.resource-value')
  const fieldStrings = parent.dataset.name

  // Actor
  const actor = this.actor

  // Update
  await actor.update({ [fieldStrings]: 0 })
}

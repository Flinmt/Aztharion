/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
  console.log('World of Darkness 5e | SchreckNet: loading subroutines')

  // Define template paths to load
  const templatePaths = [
    // Generic partials
    'templates/generic/tab-navigation.hbs',

    // Base Sheet Partials
    'systems/aztharion/display/shared/actors/parts/lock-button.hbs',
    'systems/aztharion/display/shared/actors/parts/header-profile.hbs',
    'systems/aztharion/display/shared/actors/parts/biography.hbs',
    'systems/aztharion/display/shared/actors/parts/features.hbs',
    'systems/aztharion/display/shared/actors/parts/health.hbs',
    'systems/aztharion/display/shared/actors/parts/notepad.hbs',
    'systems/aztharion/display/shared/actors/parts/stats.hbs',
    'systems/aztharion/display/shared/actors/parts/willpower.hbs',
    'systems/aztharion/display/shared/actors/parts/actor-settings.hbs',
    'systems/aztharion/display/shared/actors/parts/core-features.hbs',
    'systems/aztharion/display/shared/actors/parts/core-details.hbs',
    'systems/aztharion/display/shared/actors/parts/chronicle-tenets.hbs',
    'systems/aztharion/display/shared/actors/parts/touchstones-convictions.hbs',
    'systems/aztharion/display/shared/actors/parts/experience.hbs',
    'systems/aztharion/display/shared/actors/limited-sheet.hbs',

    // Hunter Sheet Partials
    'systems/aztharion/display/htr/actors/parts/danger.hbs',
    'systems/aztharion/display/htr/actors/parts/despair.hbs',
    'systems/aztharion/display/htr/actors/parts/desperation.hbs',
    'systems/aztharion/display/htr/actors/parts/edges.hbs',
    'systems/aztharion/display/htr/actors/parts/features.hbs',
    'systems/aztharion/display/htr/actors/parts/redemption.hbs',
    'systems/aztharion/display/htr/actors/parts/creed-fields.hbs',

    // Vampire Sheet Partials
    'systems/aztharion/display/vtm/actors/parts/disciplines.hbs',
    'systems/aztharion/display/vtm/actors/parts/blood.hbs',
    'systems/aztharion/display/vtm/actors/parts/frenzy.hbs',
    'systems/aztharion/display/vtm/actors/parts/humanity.hbs',
    'systems/aztharion/display/vtm/actors/parts/hunger.hbs',
    'systems/aztharion/display/vtm/actors/parts/rouse.hbs',

    // Werewolf Sheet Partials
    'systems/aztharion/display/wta/actors/parts/gifts-rites.hbs',
    'systems/aztharion/display/wta/actors/parts/wolf.hbs',
    'systems/aztharion/display/wta/actors/parts/balance.hbs',
    'systems/aztharion/display/wta/actors/parts/frenzy.hbs',
    'systems/aztharion/display/wta/actors/parts/rage-button.hbs',
    'systems/aztharion/display/wta/actors/parts/rage-value.hbs',
    'systems/aztharion/display/wta/actors/parts/renown.hbs',
    'systems/aztharion/display/wta/actors/parts/forms.hbs',
    'systems/aztharion/display/wta/actors/parts/features.hbs',
    'systems/aztharion/display/wta/actors/parts/patron-spirit.hbs',
    'systems/aztharion/display/wta/actors/parts/favor.hbs',
    'systems/aztharion/display/wta/actors/parts/ban.hbs',

    // SPC Sheet Partials
    'systems/aztharion/display/shared/actors/parts/spc/stats.hbs',
    'systems/aztharion/display/shared/actors/parts/spc/spc-traits.hbs',
    'systems/aztharion/display/shared/actors/parts/spc/spc-conditions.hbs',
    'systems/aztharion/display/shared/actors/parts/spc/standard-dice-pools.hbs',
    'systems/aztharion/display/shared/actors/parts/spc/exceptional-dice-pools.hbs',
    'systems/aztharion/display/shared/actors/parts/spc/generaldifficulty.hbs',
    'systems/aztharion/display/shared/actors/parts/spc/spc-disciplines.hbs',
    'systems/aztharion/display/shared/actors/parts/spc/spc-gifts.hbs',
    'systems/aztharion/display/shared/actors/parts/spc/spc-edges.hbs',
    'systems/aztharion/display/shared/actors/parts/spc/blood-potency.hbs',

    // Group Sheet Partials
    'systems/aztharion/display/vtm/actors/coterie-sheet.hbs',
    'systems/aztharion/display/htr/actors/cell-sheet.hbs',
    'systems/aztharion/display/wta/actors/pack-sheet.hbs',
    'systems/aztharion/display/shared/actors/parts/group/group-members.hbs',
    'systems/aztharion/display/shared/actors/parts/group/features.hbs',

    // Application Partials
    'systems/aztharion/display/wta/applications/wereform-application/wereform-application.hbs',
    'systems/aztharion/display/shared/applications/skill-application/skill-application.hbs',
    'systems/aztharion/display/shared/applications/skill-application/parts/specialty-display.hbs',

    // Item Sheet Partials (Tabs)
    'systems/aztharion/display/shared/items/parts/description.hbs',
    'systems/aztharion/display/shared/items/parts/dicepool.hbs',
    'systems/aztharion/display/shared/items/parts/macro.hbs',
    'systems/aztharion/display/shared/items/parts/modifiers.hbs',
    'systems/aztharion/display/shared/items/parts/modifier-display.hbs',
    'systems/aztharion/display/shared/items/parts/data-item-id.hbs',
    'systems/aztharion/display/shared/items/parts/item-uses.hbs',
    'systems/aztharion/display/shared/items/parts/source.hbs',

    // Item Sheet Partials (Dropdowns)
    'systems/aztharion/display/shared/items/parts/skills.hbs',
    'systems/aztharion/display/shared/items/parts/disciplines.hbs',
    'systems/aztharion/display/shared/items/parts/edges.hbs',
    'systems/aztharion/display/shared/items/parts/attributes.hbs',
    'systems/aztharion/display/shared/items/parts/gifts.hbs',
    'systems/aztharion/display/shared/items/parts/renown.hbs',

    // Dice Tray Partials
    // 'systems/aztharion/display/ui/parts/select-character.hbs',
    // 'systems/aztharion/display/ui/parts/pool1-select-attribute.hbs',
    // 'systems/aztharion/display/ui/parts/pool1-select-skill.hbs',
    // 'systems/aztharion/display/ui/parts/pool1-select-discipline.hbs',
    // 'systems/aztharion/display/ui/parts/pool2-select-attribute.hbs',
    // 'systems/aztharion/display/ui/parts/pool2-select-skill.hbs',
    // 'systems/aztharion/display/ui/parts/pool2-select-discipline.hbs',
    // 'systems/aztharion/display/ui/parts/pool2-nothing.hbs',

    // Roll dialog Partials
    'systems/aztharion/display/ui/parts/roll-dialog-base.hbs',
    'systems/aztharion/display/ui/parts/situational-modifiers.hbs',
    'systems/aztharion/display/ui/mortal-roll-dialog.hbs',
    'systems/aztharion/display/ui/vampire-roll-dialog.hbs',
    'systems/aztharion/display/ui/werewolf-roll-dialog.hbs',
    'systems/aztharion/display/ui/hunter-roll-dialog.hbs',

    // Chat Message Partials
    'systems/aztharion/display/ui/chat/chat-message-header.hbs',
    'systems/aztharion/display/ui/chat/chat-message-roll.hbs',
    'systems/aztharion/display/ui/chat/willpower-reroll.hbs',

    // Menu Partials
    'systems/aztharion/display/ui/automation-menu.hbs',
    'systems/aztharion/display/ui/storyteller-menu.hbs',
    'systems/aztharion/display/ui/parts/storyteller-menu/modification-menu.hbs',
    'systems/aztharion/display/ui/parts/storyteller-menu/custom-menu.hbs',
    'systems/aztharion/display/ui/select-dialog.hbs'
  ]

  /* Load the template parts
   */
  return foundry.applications.handlebars.loadTemplates(templatePaths)
}

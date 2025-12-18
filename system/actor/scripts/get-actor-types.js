export const getActorTypes = async function (actor) {
  const currentActorType = actor.type

  const playerTypes = {
    mortal: 'AZTHARION.Mortal',
    vampire: 'TYPES.Actor.vampire',
    ghoul: 'AZTHARION.VTM.Ghoul',
    werewolf: 'TYPES.Actor.werewolf',
    hunter: 'TYPES.Actor.hunter'
  }

  const spcTypes = {
    mortal: 'AZTHARION.Mortal',
    ghoul: 'AZTHARION.VTM.Ghoul',
    vampire: 'TYPES.Actor.vampire',
    werewolf: 'TYPES.Actor.werewolf',
    spirit: 'AZTHARION.WTA.Spirit',
    hunter: 'TYPES.Actor.hunter'
  }

  const groupTypes = {
    coterie: 'AZTHARION.VTM.Coterie',
    cell: 'AZTHARION.HTR.Cell',
    pack: 'AZTHARION.WTA.Pack'
  }

  if (currentActorType in playerTypes) {
    return {
      baseActorType: currentActorType,
      currentActorType,
      currentTypeLabel: playerTypes[currentActorType],
      typePath: 'type',
      types: playerTypes
    }
  } else if (currentActorType === 'spc') {
    return {
      baseActorType: 'spc',
      currentActorType: actor.system.spcType,
      currentTypeLabel: spcTypes[actor.system.spcType],
      typePath: 'system.spcType',
      types: spcTypes
    }
  } else if (currentActorType === 'group') {
    return {
      baseActorType: 'group',
      currentActorType: actor.system.groupType,
      currentTypeLabel: groupTypes[actor.system.groupType],
      typePath: 'system.groupType',
      types: groupTypes
    }
  } else {
    // The default is an object that has only the current type in it
    return {
      baseActorType: currentActorType,
      currentActorType,
      currentTypeLabel: currentActorType,
      typePath: 'type',
      types: {
        [currentActorType]: currentActorType
      }
    }
  }
}

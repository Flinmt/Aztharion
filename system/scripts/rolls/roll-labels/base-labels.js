export const getBaseLabel = async function (data) {
  const difficultySet = data.difficulty > 0
  const labelData = {
    showTotalAndDifficulty: true,
    labelClass: '',
    labelText: ''
  }

  // Failure is no difficulty is set
  if (!difficultySet && data.totalResult === 0) {
    labelData.labelClass = 'failure'
    labelData.labelText = game.i18n.localize('AZTHARION.RollList.Fail')
  }

  // Failure if the result is below the difficulty
  if (difficultySet && data.totalResult < data.difficulty) {
    const margin = data.difficulty - data.totalResult

    labelData.labelClass = 'failure'
    labelData.labelText = game.i18n.format('AZTHARION.RollList.FailureBy', {
      string: margin
    })
  }

  // No difficulty provided but we have any successes; just display number of successes
  if (!difficultySet && data.totalResult > 0) {
    const successText = data.totalResult > 1 ? 'AZTHARION.RollList.Successes' : 'AZTHARION.RollList.Success'
    labelData.labelText = `${data.totalResult} ${game.i18n.localize(successText)}`
    labelData.showTotalAndDifficulty = false
  }

  // Total result matches or exceeds the difficulty while difficulty is set; show a success
  if (difficultySet && data.totalResult >= data.difficulty) {
    const margin = data.totalResult - data.difficulty

    labelData.labelClass = 'success'
    labelData.labelText = game.i18n.format('AZTHARION.RollList.SuccessBy', {
      string: margin
    })
  }

  // Return the data we've obtained
  return labelData
}

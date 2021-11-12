const players = require('players.json')
const calculateTeamPoints = require('../calculateTeamPoints')

describe('calculateTeamPoints', () => {
  let result
  beforeAll(() => {
    result = calculateTeamPoints(players)
  })

  it('should return an array of results', () => {
    expect(result).toBeInstanceOf(Array)
  })

  it('should considered only active players', () => {
    const expected = [{ team: 'red', points: 20 }]
    expect(result).toEqual(expect.arrayContaining(expected))
  })

  it('should sort teams in descending order by total points', () => {
    const higherPoints = result[0].points
    expect(result[1].points).toBeLessThan(higherPoints)
    expect(result[2].points).toBeLessThan(higherPoints)
  })
})

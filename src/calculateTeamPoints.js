// Given an array of players
// returns a sorted array of teams with the total team points for active players.
// The output is sorted in descending order by points
// input: [{ team: 'green', name: 'Bob', points: 5, isActive: true }, ...]
// output: [{ team: 'green', points: 40 }, ...]

/**
 * @param {Map<string, Array>} teamsMap
 */
function groupTeams(teamsMap, player) {
  let team = teamsMap.get(player.team)

  if (!team) {
    team = []
  }

  team.push(player)
  teamsMap.set(player.team, team)
  return teamsMap
}

function accumulatePoints(accumulatedPoints, { points, isActive }) {
  if (isActive) {
    return accumulatedPoints + points
  }
  return accumulatedPoints
}

/**
 * @param {Array} players The date
 */
function calculateTeamPoints(players) {
  const playersByTeamMap = players.reduce(groupTeams, new Map())

  const teams = []

  playersByTeamMap.forEach((players, team) => {
    const points = players.reduce(accumulatePoints, 0)
    teams.push({
      team,
      points,
    })
  })

  return teams.sort((a, b) => b.points - a.points)
}
module.exports = calculateTeamPoints

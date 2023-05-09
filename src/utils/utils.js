export const getColor = (userProfile, gameInfo) => {
  if (userProfile.username === gameInfo.username) { 
    return gameInfo.color
  } else {
    return gameInfo.color === 'white' ? 'black' : 'white'
  }
}

export const getDashboardTime = (dateStrUtc) => {
  // convert to local time
  const dateUtc = new Date(dateStrUtc)
  const newDate = new Date(dateUtc.getTime() - dateUtc.getTimezoneOffset()*60*1000)

  const dateCurrent = new Date()

  // if its the current date only return time
  if (newDate.toLocaleDateString() === dateCurrent.toLocaleDateString()) {
    return newDate.toLocaleTimeString()
  } else {
    return newDate.toLocaleDateString()
  }
}

export const getLocalTime = (dateStrUtc) => {
  // convert to local time
  const dateUtc = new Date(dateStrUtc)
  const newDate = new Date(dateUtc.getTime() - dateUtc.getTimezoneOffset()*60*1000)
  return newDate.toLocaleString()
}

// WAITING FOR ACCEPTANCE
// ACCEPTED
// COMPLETED
export const getUseFriendlyStatus = (userProfile, gameInfo) => {
  const userCreatedChallenge = userProfile.username === gameInfo.username
  if (gameInfo.status === "WAITING FOR ACCEPTANCE") {
    return userCreatedChallenge ? "Waiting for opponent" : "Waiting for you to accept"
  } else if (gameInfo.status === "ACCEPTED") {
    return "Ready to play"
  } else if (gameInfo.status === "COMPLETED") {
    return "Completed"
  }
}

export const getOpponent = (userProfile, gameInfo) => {
  if (userProfile.username === gameInfo.username) {
    return gameInfo.opp_username
  } else {
    return gameInfo.username
  }
}
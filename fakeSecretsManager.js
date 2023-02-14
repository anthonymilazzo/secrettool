function createSecret(secretName, value) {
  console.log(`*** [fake] secret create ${secretName}`)
}

function updateSecret(secretName, value) {
  console.log(`*** [fake] secret update ${secretName}`)
}

function getSecret(secretName) {
  console.log(`*** [fake] secret get ${secretName}`)
  return true
}

module.exports = {
  createSecret,
  updateSecret,
  getSecret,
}
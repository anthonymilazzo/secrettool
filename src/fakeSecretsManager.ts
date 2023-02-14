function createSecret(secretName: string, value: string) {
  console.log(`*** [fake] secret create ${secretName}`)
}

function updateSecret(secretName: string, value: string) {
  console.log(`*** [fake] secret update ${secretName}`)
}

function getSecret(secretName: string) {
  console.log(`*** [fake] secret get ${secretName}`)
  return true
}

module.exports = {
  createSecret,
  updateSecret,
  getSecret,
}
export function createSecret(secretName: string, value: string): void {
  console.log(`*** [fake] secret create ${secretName} ${value}`);
}

export function updateSecret(secretName: string, value: string): void {
  console.log(`*** [fake] secret update ${secretName} ${value}`);
}

export function getSecret(secretName: string): boolean {
  console.log(`*** [fake] secret get ${secretName}`);
  return true;
}

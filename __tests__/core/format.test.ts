import {expect, test} from '@jest/globals'
import {renderSecretPath} from '../../src/actions/format'

test('format a secret path', () => {
  const secretsConfig = {
    secrets: ['foo', 'bar'],
    envs: ['dev', 'prod'],
    project: 'clever'
  }
  const secretName = 'test'
  const env = 'dev'
  const secretPath = renderSecretPath(secretsConfig, secretName, env)
  expect(secretPath).toBe('/dev/clever/test')
})

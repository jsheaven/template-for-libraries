import { jest } from '@jest/globals'
import { templateName } from '../dist/index.esm'

describe('templateName', () => {
  it('can call templateName', () => {
    templateName({
      foo: 'X',
    })

    expect(templateName).toBeDefined()
  })
})

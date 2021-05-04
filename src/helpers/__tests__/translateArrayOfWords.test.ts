import { functions } from '../translateFunctions'

describe('translate array os words', () => {
  it('should return an object with the words translated', async () => {
    const arr = ['slippery', 'slope', 'give', 'head']

    const result = await functions.translateArrayOfWords(arr, 'en', 'pt')
    expect(result).toEqual({ give: 'dar', head: 'cabeça', slippery: 'escorregadio', slope: 'inclinação' })
  })
})

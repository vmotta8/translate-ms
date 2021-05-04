import { functions } from '../translateFunctions'

describe('term frequency', () => {
  it('should return an object with the words and their tf', () => {
    const obj = { give: 1, have: 1, head: 1, lame: 1, maybe: 1, name: 1, only: 1, remember: 1, should: 1, slippery: 1, slope: 1, that: 2 }

    const result = functions.tf(obj)
    expect(result).toEqual({
      give: 0.08333333333333333,
      have: 0.08333333333333333,
      head: 0.08333333333333333,
      lame: 0.08333333333333333,
      maybe: 0.08333333333333333,
      name: 0.08333333333333333,
      only: 0.08333333333333333,
      remember: 0.08333333333333333,
      should: 0.08333333333333333,
      slippery: 0.08333333333333333,
      slope: 0.08333333333333333,
      that: 0.16666666666666666
    })
  })
})

import { TranslateService } from '../services/translateService'
import { RedisProviderInMemory } from '../../lib/providers/implementations/RedisProviderInMemory'

const translateService = new TranslateService(
  new RedisProviderInMemory()
)

jest.setTimeout(20000)
describe('translate service', () => {
  it('should return subtitle', async () => {
    const subtitle = await translateService.execute('https:%2F%2Fdl.opensubtitles.org%2Fen%2Fdownload%2Fsubencoding-utf8%2Fsrc-api%2Fvrf-19d90c5f%2Fsid-,Bk1AhzAlfNDjyDEY-uNFfdupn4%2Ffilead%2F1952595684')
    expect(typeof subtitle).toBe('string')
  })
})

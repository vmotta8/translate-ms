import { TranslateService } from '../services/translateService'

const translateService = new TranslateService()

jest.setTimeout(20000)
describe('translate service', () => {
  it('should return subtitle', async () => {
    const subtitle = await translateService.execute('https:%2F%2Fdl.opensubtitles.org%2Fen%2Fdownload%2Fsubencoding-utf8%2Fsrc-api%2Fvrf-19c70c56%2Fsid-uipcnQWvuZhu-9Y2n8a3ga8aXwc%2Ffilead%2F1956621861')
    expect(typeof subtitle).toBe('string')
  })
})

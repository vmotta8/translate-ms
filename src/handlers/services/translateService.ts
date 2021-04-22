/* eslint-disable no-useless-constructor */
import axios from 'axios'
import createError from 'http-errors'
import { ICacheProvider } from '../../lib/providers/ICacheProvider'
import { functions } from '../../helpers/translateFunctions'

export class TranslateService {
  constructor (
    private cache: ICacheProvider
  ) {}

  async execute (url: string) {
    this.cache.connect()
    try {
      let newSubtitle
      const cacheEntry = await this.cache.get(url)

      if (cacheEntry) {
        newSubtitle = cacheEntry
      } else {
        const formattedUrl = url.split('%2F').join('/')
        const subtitle = (await axios.get(formattedUrl)).data

        const subtitleWordsArray = functions.stringToArray(subtitle, 3)
        const subtitleWordsCounted = functions.countWords(subtitleWordsArray)

        const subtitleTF = functions.tf(subtitleWordsCounted)
        const wordsIDF = (await axios.get('https://raw.githubusercontent.com/vmotta8/translate-ms/master/dataset/words.json')).data
        const subtitleTFIDF = functions.tfidf(subtitleTF, wordsIDF)
        const sortedWordsTFIDF = functions.sortable(subtitleTFIDF, 200)

        const translatedWords = await functions.translateArrayOfWords(sortedWordsTFIDF, 'en', 'pt')
        newSubtitle = functions.addTranslatedWordsToSubtitle(subtitle, translatedWords)

        await this.cache.set(url, newSubtitle, 15)
      }
      this.cache.disconnect()

      return newSubtitle
    } catch (err) {
      console.log(err)
      throw new createError.BadGateway(err)
    }
  }
}

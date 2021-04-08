import axios from 'axios'
import createError from 'http-errors'
import { functions } from '../../helpers/translateFunctions'

export class TranslateService {
  async execute (url: string) {
    const formattedUrl = url.split('%2F').join('/')
    try {
      const words = (await axios.get('https://raw.githubusercontent.com/vmotta8/translate-ms/master/dataset/ww.json')).data
      const subtitle = (await axios.get(formattedUrl)).data
      const subtitleWordsArray = functions.stringToArray(subtitle, 3)
      const subtitleWordsCounted = functions.countWords(subtitleWordsArray)

      const subtitleTF = functions.tf(subtitleWordsCounted)
      const wordsIDF = functions.idf(words.index, words.numberOfDocs)
      const subtitleTFIDF = functions.tfidf(subtitleTF, wordsIDF, words)
      const sortedWordsTFIDF = functions.sortable(subtitleTFIDF, 100)

      const translatedWords = await functions.translateArrayOfWords(sortedWordsTFIDF, 'en', 'pt')
      const newSubtitle = functions.addTranslatedWordsToSubtitle(subtitle, translatedWords)
      return newSubtitle
    } catch (err) {
      console.log(err)
      throw new createError.BadGateway('Error')
    }
  }
}

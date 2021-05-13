/* eslint-disable no-prototype-builtins */
const tr = require('googletrans')
const translate = tr.default

export const functions = {
  stringToArray: function (str: string, wordsMinimumLength: number): string[] {
    const strWordsArray = str.match(/[a-zA-Z'áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+/g)!

    const index = []
    for (const word of strWordsArray) {
      const lower = word.toLocaleLowerCase()

      if (word.length > wordsMinimumLength && word === lower) {
        const replaced = word.replace(/[']+/g, '')
        index.push(replaced)
      }
    }

    return index
  },

  countWords: function (wordsArray: string[]): {[x: string]: number} {
    const index: {[x: string]: number} = {}

    wordsArray.forEach(function (word: string) {
      if (!(index.hasOwnProperty(word))) {
        index[word] = 0
      }
      index[word]++
    })

    return index
  },

  tf: function (wordsCountedObj: {[x: string]: number}): {[x: string]: number} {
    const sum = Object.keys(wordsCountedObj).length

    Object.keys(wordsCountedObj).forEach(function (key) { wordsCountedObj[key] /= sum })

    return wordsCountedObj
  },

  /* Deprecated - idf is already included in words dataset */
  idf: function (wordsNumberOfOccurrencesObj: any, numberOfDocs: any) {
    const index: any = {}

    for (const word in wordsNumberOfOccurrencesObj) {
      const number = (numberOfDocs) / (wordsNumberOfOccurrencesObj[word])
      if (number > 10) {
        index[word] = Math.log10(number)
      }
    }

    return index
  },

  tfidf: function (TFObj: {[x: string]: number}, IDFObj: {[x: string]: number}): {[x: string]: number} {
    const index: {[x: string]: number} = {}

    Object.keys(TFObj).forEach(function (key) { if (IDFObj[key] > 1) index[key] = TFObj[key] * IDFObj[key] })

    return index
  },

  sortable: function (TFIDFObj: {[x: string]: number}, numberOfWords: number): string[] {
    const index: [x:string, y: number][] = []

    Object.keys(TFIDFObj).forEach((word: string) => {
      index.push([word, TFIDFObj[word]])
    })

    index.sort(function (a: any, b: any) {
      return b[1] - a[1]
    })

    const sorted = index.slice(0, numberOfWords)

    const wordsArray = sorted.map(item => {
      return item[0]
    })

    return wordsArray
  },

  translateArrayOfWords: async function (wordsArray: string[], from: string, to: string): Promise<{[x: string]: string}> {
    const translated = await (translate(wordsArray.join('. '), { from: from, to: to }))
    const translatedArray = (translated.text).split('. ').map((word: string) => {
      return word.toLocaleLowerCase().replace(/[.':%]+/g, '')
    })

    const mergedObj: {[x: string]: string} = {}
    wordsArray.forEach((item: any, index: any) => {
      mergedObj[item] = translatedArray[index]
    })

    return mergedObj
  },

  addTranslatedWordsToSubtitle: function (subtitle: any, translatedWords: {[x: string]: string}) {
    Object.keys(translatedWords).forEach((word: string) => {
      const reg = new RegExp(` ${word} `, 'g')
      subtitle = subtitle.replace(reg, ` ${word}(${translatedWords[word]}) `)
    })

    return subtitle
  }
}

/* eslint-disable no-prototype-builtins */
const tr = require('googletrans')
const translate = tr.default

export const functions = {
  stringToArray: function (str: any, wordsMinimumLength: any) {
    const strWordsArray = str.match(/[a-zA-Z'áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+/g)

    const index = []
    for (const word of strWordsArray) {
      const replaced = word.replace(/[']+/g, '')
      const lower = word.toLocaleLowerCase()

      if (word.length > wordsMinimumLength && replaced === word && word === lower) {
        index.push(word)
      }
    }

    return index
  },

  countWords: function (wordsArray: any) {
    const index: any = {}

    wordsArray.forEach(function (word: any) {
      if (!(index.hasOwnProperty(word))) {
        index[word] = 0
      }
      index[word]++
    })

    return index
  },

  tf: function (wordsCountedObj: any) {
    let sum = 0
    for (const word in wordsCountedObj) {
      sum += wordsCountedObj[word]
    }

    const index: any = {}
    for (const word in wordsCountedObj) {
      index[word] = (wordsCountedObj[word]) / sum
    }

    return index
  },

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

  tfidf: function (TFObj: any, IDFObj: any) {
    const index: any = {}

    for (const word in TFObj) {
      if (IDFObj[word]) {
        if (IDFObj[word] > 1) {
          index[word] = TFObj[word] * IDFObj[word]
        }
      }
    }

    return index
  },

  sortable: function (obj: any, numberOfWords: any) {
    const index = []
    for (const vehicle in obj) {
      index.push([vehicle, obj[vehicle]])
    }

    index.sort(function (a, b) {
      return b[1] - a[1]
    })

    return index.slice(0, numberOfWords)
  },

  translateArrayOfWords: async function (wordsObj: any, from: any, to: any) {
    const wordsArray = []
    for (const obj of wordsObj) {
      wordsArray.push(obj[0])
    }

    const wordsStr = wordsArray.join('. ')

    const translated = await (translate(wordsStr, { from: from, to: to }))
    const translatedArray = (translated.text).split('. ')

    const index: any = {}
    for (let i = 0; i < translatedArray.length; i++) {
      const translatedWord = translatedArray[i].toLocaleLowerCase().replace(/[.':%]+/g, '')
      if (translatedWord !== wordsArray[i]) {
        index[wordsArray[i]] = translatedWord
      }
    }

    return index
  },

  addTranslatedWordsToSubtitle: function (subtitle: any, translatedWords: any) {
    for (const word in translatedWords) {
      const reg = new RegExp(` ${word} `, 'g')
      subtitle = subtitle.replace(reg, ` ${word}(${translatedWords[word]}) `)
    }

    return subtitle
  }
}

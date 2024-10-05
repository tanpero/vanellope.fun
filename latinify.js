const nodejieba = require("nodejieba")
const {
    pinyin
} = require("pinyin-pro")

nodejieba.load()

const getWords = sentence => nodejieba.cut(sentence)
const getPinyins = sentence => pinyin(sentence, {
    type: 'array'
})

function preprocessWords(words) {
    let processedWords = [];
    let tempWord = '';

    const regex1 = /[‘’“”（\(\[\{《『「“"']/
    const regex2 = /[”）\)\]\}\>》』」”"']/

    for (let i = 0; i < words.length; i++) {
        const word = words[i];

        if (/^[^\p{L}\d]+$/u.test(word)) {

            if (tempWord && regex1.test(tempWord) && regex2.test(word)) {

                tempWord += word;
            } else if (regex2.test(word) && tempWord && regex1.test(tempWord)) {

                processedWords.push(tempWord + word);
                tempWord = '';
            } else {

                if (tempWord) {
                    processedWords.push(tempWord + word);
                    tempWord = '';
                } else {
                    if (processedWords.length > 0) {
                        processedWords[processedWords.length - 1] += word;
                    } else {
                        tempWord = word;
                    }
                }
            }
        } else if (/^[A-Za-z ]+$/.test(word)) {

            if (tempWord && /^[A-Za-z ]+$/.test(tempWord)) {

                tempWord += word;
            } else {
                if (tempWord) {
                    processedWords.push(tempWord);
                }
                tempWord = word;
            }
        } else if (/^\d+$/.test(word)) {

            if (tempWord && /^\d+$/.test(tempWord)) {

                tempWord += word;
            } else {
                if (tempWord) {
                    processedWords.push(tempWord);
                }
                tempWord = word;
            }
        } else {

            if (tempWord) {
                processedWords.push(tempWord);
                tempWord = word;
            } else {
                tempWord = word;
            }
        }
    }


    if (tempWord) {
        processedWords.push(tempWord);
    }

    return processedWords;
}

function rejoinPinyin(originalWords, pinyinArray) {
    let result = [];
    let pinyinIndex = 0;


    let processedWords = preprocessWords(originalWords);

    processedWords.forEach(word => {

        let pinyinLength = word.length;

        let pinyin = pinyinArray.slice(pinyinIndex, pinyinIndex + pinyinLength).join('');

        result.push(pinyin);

        pinyinIndex += pinyinLength;
    });

    return result.join(' ');
}

module.exports = {
    latinify(sentence) {
        return rejoinPinyin(getWords(sentence), getPinyins(sentence))
    }
}
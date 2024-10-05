const nodejieba = require("nodejieba");
const { pinyin } = require("pinyin-pro");

// 确保nodejieba加载了词典和停用词，这一步可以省略或替换为自定义词典
nodejieba.load();

// 定义一个函数，将中文句子转换为分词和拼音
function convertToPinyinWithSegmentation(sentence) {
  // 使用nodejieba进行分词
  const words = nodejieba.cut(sentence, true);
  
  // 获取整个句子的拼音，包括声调
  const pinyinSentence = pinyin(sentence, {
    type: 'array'
  })

  // 定义一个数组，用于存储分词后的拼音
  const segmentedPinyin = [];
  
  // 当前处理的拼音索引
  let pinyinIndex = 0;
  
  words.forEach(word => {
    // 获取当前词的拼音
    const wordPinyin = pinyin(word, {
      toneType: 'tone3',
      type: 'array'
    }).map(item => item.join('')).join(' ');

    // 计算当前词在原文中的起始和结束位置
    const startIndex = sentence.indexOf(word, pinyinIndex);
    const endIndex = startIndex + word.length;

    // 将整个句子的拼音中对应部分替换为当前词的拼音
    segmentedPinyin.push(wordPinyin);
    pinyinIndex = endIndex;
  });

  // 返回分词和拼音结果
  return {
    segmentation: words,
    pinyin: segmentedPinyin.join(' ')
  };
}

// 测试句子
const sentence = "我喜欢自然语言处理";

// 调用函数并打印结果
const result = convertToPinyinWithSegmentation(sentence);
console.log("分词结果:", result.segmentation);
console.log("拼音结果:", result.pinyin);


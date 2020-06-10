
const fs = require('fs');
const path = require('path');

/**
 *
 * @param  {Number} number - number to convert.
 * @param  {String} dictionaryFile - language dictionary to use for convertion.
 */
function numberToText(number, dictionaryFile = 'es', dictionaryFolder = './languages/') {
  const dictionary = getDictionary(dictionaryFile, dictionaryFolder);
  return parseNumber(number.toString(), dictionary);
}

function getDictionary(dictionaryFile, dictionaryFolder) {
  const dictionaryPath = `${dictionaryFolder}${dictionaryFile}.json`;
  const dictionaryExists = fs.existsSync(path.resolve(__dirname, dictionaryPath));
  if (!dictionaryExists) {
    throw new Error('Unsupported language.');
  }
  return require(dictionaryPath);
}

function parseNumber(number, dictionary) {
  let numbered = [];
  let previous = '';
  for (let i = 0; i < number.length; i++) {
    const position = number.length - i - 1;
    const digit = number[i];
    if (Array.isArray(dictionary[dictionary.position[position]])) {
      const parsedDigit = dictionary[dictionary.position[position]][parseInt(digit)];
      if (typeof parsedDigit === 'object') {
        if (parsedDigit.name !== '' && !parsedDigit.connectorReplaces) {
          numbered.push(parsedDigit.name);
          if (parsedDigit.connector !== '') {
            numbered.push(parsedDigit.connector);
          }
        } else if (parsedDigit.connectorReplaces) {
          previous = parsedDigit.connector;
        }
      } else {
        if (previous === '') {
          numbered.push(parsedDigit);
        } else {
          numbered.push(previous + parsedDigit.toLowerCase());
          previous = '';
        }
      }
    } else {
      numbered.push(digit == 1
        ? dictionary[dictionary.position[position]].singular
        : dictionary.single[parseInt(digit)] + dictionary[dictionary.position[position]].plural);
    }
  }
  console.log(numbered)
  return numbered.join(' ');
}

module.exports = numberToText;

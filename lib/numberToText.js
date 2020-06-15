
const fs = require('fs');
const path = require('path');

function numberToText(number, dictionaryFile = 'en', dictionaryFolder = './languages/') {
  const dictionary = getDictionary(dictionaryFile, dictionaryFolder);
  return parseNumber(new Intl.NumberFormat('en-US').format(parseFloat(number)).replace(/,/, ''), dictionary);
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
  if (number.includes('.')) {
    return (
      getText(number.split('.')[0].replace(/\\D/, ''), dictionary) + " " +
      dictionary.decimalConnector + " " +
      getText(number.split('.')[1].replace(/\\D/, ''), dictionary)
    );
  }
  return getText(number.replace(/\\D/, ''), dictionary);
}

function getText(number, dictionary) {
  const numbered = [];
  let previous = '';
  let skip = false;
  let shouldShowDivision = false;
  for (let i = 0; i < number.length; i++) {
    const position = number.length - i - 1;
    const digit = number[i];
    if (Array.isArray(dictionary[dictionary.position[position]])) {
      if (!skip) {
        if (dictionary.position[position] === 'double' && parseInt(number[i] + number[i + 1]) <= dictionary.singleLimit) {
          numbered.push(dictionary.single[parseInt(number[i] + number[i + 1])]);
          skip = true;
        } else {
          const parsedDigit = dictionary[dictionary.position[position]][parseInt(digit)];
          if (typeof parsedDigit === 'object') {
            shouldShowDivision = true;
            if (parsedDigit.name !== '' && (!parsedDigit.connectorReplaces || parseInt(number[i + 1]) == 0)) {
              numbered.push(parsedDigit.name);
              if (parsedDigit.connector !== '' && parseInt(number[i + 1]) > 0) {
                numbered.push(parsedDigit.connector);
              }
            } else if (parsedDigit.connectorReplaces) {
              previous = parsedDigit.connector;
            }
          } else {
            if (parsedDigit !== '' && parsedDigit) {
              shouldShowDivision = true;
              if (previous === '') {
                numbered.push(parsedDigit);
              } else {
                numbered.push(previous + parsedDigit.toLowerCase());
                previous = '';
              }
            }
          }
        }
      } else {
        skip = false;
      }
    } else {
      if (digit > 0 || shouldShowDivision) {
        if (!skip) {
          numbered.push(digit == 1 ?
            dictionary[dictionary.position[position]].singular :
            `${dictionary.single[parseInt(digit)]} ${dictionary[dictionary.position[position]].plural}`);
        }
      }
    }
  }
  return numbered.join(' ');
}

module.exports = numberToText;

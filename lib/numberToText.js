
const fs = require('fs');
const path = require('path');

function numberToText(number, dictionaryFile = 'en', dictionaryFolder = './languages/') {
  const dictionary = getDictionary(dictionaryFile, dictionaryFolder);
  
  // Check for negative numbers
  const numValue = typeof number === 'string' ? parseFloat(number) : number;
  if (numValue < 0) {
    throw new Error('Negative numbers are not supported');
  }
  
  // Handle zero as special case
  if (numValue === 0) {
    if (dictionaryFile === 'es') {
      return 'Cero';
    } else if (dictionaryFile === 'en') {
      return 'Zero';
    } else if (dictionaryFile === 'pt') {
      return 'Zero';
    }
    return 'Zero';
  }
  
  // Handle string inputs directly to preserve precision and handle non-digits
  let processedNumber;
  if (typeof number === 'string') {
    // Handle comma as decimal separator format: periods as thousands, comma as decimal (1.234,5 -> 1234.5)
    if (dictionary.decimalSeparator === ',' && number.includes(',')) {
      const parts = number.split(',');
      if (parts.length === 2) {
        processedNumber = parts[0].replace(/\./g, '') + '.' + parts[1];
      } else {
        processedNumber = number.replace(/\./g, ''); // Just remove thousands separators
      }
    } else {
      processedNumber = number.replace(/,/g, ''); // Remove thousands separators (English format)
    }
  } else {
    processedNumber = new Intl.NumberFormat('en-US').format(parseFloat(number)).replace(/,/g, '');
  }
  
  let result = parseNumber(processedNumber, dictionary);
  
  // Capitalize first letter for English, Spanish, and Portuguese
  if ((dictionaryFile === 'en' || dictionaryFile === 'es' || dictionaryFile === 'pt') && result.length > 0) {
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }
  
  return result;
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
    const wholePart = number.split('.')[0].replace(/\D/g, '').replace(/^0+/, '') || '0';
    const decimalPart = number.split('.')[1].replace(/\D/g, '').padEnd(2, '0');
    
    let wholeText = getText(wholePart, dictionary);
    
    // Handle case where whole part is "0" or empty
    if (!wholeText || wholeText.trim() === '') {
      if (dictionary.zeroValue) {
        wholeText = dictionary.zeroValue.toLowerCase();
      } else {
        wholeText = 'zero';
      }
    }
    
    return (
      wholeText + ' ' +
      dictionary.decimalConnector + ' ' +
      getText(decimalPart, dictionary)
    );
  }
  const cleanNumber = number.replace(/\D/g, '').replace(/^0+/, '') || '0';
  return getText(cleanNumber, dictionary);
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
          shouldShowDivision = true;
        } else {
          const parsedDigit = dictionary[dictionary.position[position]][parseInt(digit)];
          if (typeof parsedDigit === 'object') {
            let filledByZero = false;
            if (Object.prototype.hasOwnProperty.call(parsedDigit, 'filledByZero')) {
              let allZero = true;
              for (let j = 0; j < parsedDigit.filledByZeroDigits; j++) {
                if (number[i+j+1] != 0) {
                  allZero = false;
                }
              }
              if (allZero) {
                filledByZero = true;
                numbered.push(parsedDigit.filledByZero);
                shouldShowDivision = true;
              }
            }
            if (!filledByZero) {
              shouldShowDivision = true;
              if (parsedDigit.name !== '' && (!parsedDigit.connectorReplaces || parseInt(number[i + 1]) == 0)) {
                numbered.push(parsedDigit.name);
                if (parsedDigit.connector !== '' && parseInt(number[i + 1]) > 0) {
                  numbered.push(parsedDigit.connector);
                }
              } else if (parsedDigit.connectorReplaces) {
                previous = parsedDigit.connector;
              }
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
          const pushable = digit == 1 ?
            dictionary[dictionary.position[position]].singular :
            `${dictionary.single[parseInt(digit)]} ${dictionary[dictionary.position[position]].plural}`;
          numbered.push(previous !== '' ? previous.trim() + pushable.toLowerCase().trim() : pushable.trim());
          previous = '';
        } else {
          const pushable = digit == 1 ?
            dictionary[dictionary.position[position]].singular :
            dictionary[dictionary.position[position]].plural;
          numbered.push(pushable.toLowerCase());
          skip = false;
        }
      }
    }
  }
  // Handle hyphen connectors properly (no spaces around hyphens)
  let result = numbered.filter(number => number !== '').join(' ').trim();
  result = result.replace(/ - /g, '-');
  return result;
}

module.exports = numberToText;

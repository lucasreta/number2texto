/**
 * Converts numbers to text in English, Spanish, and Portuguese
 */

/**
 * Language codes supported by the library
 */
export type Language = 'en' | 'es' | 'pt';

/**
 * Converts a number to its text representation in the specified language
 * 
 * @param number - The number to convert (number or string)
 * @param language - The language code ('en', 'es', 'pt')
 * @param dictionaryFolder - Custom path to language dictionary folder
 * @returns The text representation of the number
 * 
 * @example
 * ```typescript
 * import numberToText from 'number2texto';
 * 
 * numberToText(123, 'en'); // "One hundred twenty-three"
 * numberToText(123, 'es'); // "Ciento Veintitrés"
 * numberToText(123, 'pt'); // "Cento e Vinte e Três"
 * numberToText('1.234,56', 'es'); // "Mil Doscientos Treinta y Cuatro con Cincuenta y Seis"
 * ```
 */
declare function numberToText(
  number: number | string,
  language?: Language,
  dictionaryFolder?: string
): string;

export default numberToText;

// Named exports
export { numberToText };
export { numberToText as n2t };
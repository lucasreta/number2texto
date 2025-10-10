# Installation

```bash
npm i -S number2texto
```

# Usage

## CommonJS (Node.js)

```javascript
// Default import
const number2text = require('number2texto');

// Named imports
const { numberToText, n2t } = require('number2texto');

// Basic usage
console.log(number2text(222)); // "Two hundred twenty-two"
console.log(number2text(222, 'es')); // "Doscientos Veintidos"
console.log(number2text(222, 'pt')); // "Duzentos e Vinte e Dois"
```

## ES Modules (Modern JavaScript)

```javascript
// Default import
import number2text from 'number2texto';

// Named imports
import { numberToText, n2t } from 'number2texto';

// Basic usage
console.log(number2text(222)); // "Two hundred twenty-two"
console.log(numberToText(222, 'es')); // "Doscientos Veintidos"
console.log(n2t(222, 'pt')); // "Duzentos e Vinte e Dois"
```

## TypeScript

```typescript
import numberToText, { Language } from 'number2texto';

// Type-safe language parameter
const lang: Language = 'es';
const result: string = numberToText(123.45, lang);
console.log(result); // "Ciento Veintitres con Cuarenta y Cinco"

// All import styles work with full type support
import { numberToText as n2t } from 'number2texto';
```

## Supported Languages

- **English** (`'en'` - default): `number2text(123)` → `"One hundred twenty-three"`
- **Spanish** (`'es'`): `number2text(123, 'es')` → `"Ciento Veintitres"`
- **Portuguese** (`'pt'`): `number2text(123, 'pt')` → `"Cento e Vinte e Três"`

## Examples

```javascript
const n2t = require('number2texto');

// Integers
n2t(0); // "Zero"
n2t(7); // "Seven" 
n2t(21); // "Twenty-one"
n2t(100); // "One hundred"
n2t(1234); // "One thousand two hundred thirty-four"

// Decimals
n2t(3.14); // "Three and fourteen"
n2t(0.7); // "Zero and seventy"
n2t(1234.56); // "One thousand two hundred thirty-four and fifty-six"

// String inputs (preserves precision)
n2t('1234.56'); // "One thousand two hundred thirty-four and fifty-six"
n2t('00021'); // "Twenty-one" (leading zeros handled)
n2t('1a2b3'); // "One hundred twenty-three" (non-digits stripped)

// Spanish examples
n2t(0, 'es'); // "Cero"
n2t(21, 'es'); // "Veintiuno"
n2t(100, 'es'); // "Cien"
n2t(101, 'es'); // "Ciento Uno"
n2t(1234.56, 'es'); // "Mil Doscientos Treinta y Cuatro con Cincuenta y Seis"

// Portuguese examples  
n2t(0, 'pt'); // "Zero"
n2t(21, 'pt'); // "Vinte e Um"
n2t(100, 'pt'); // "Cem"
n2t(101, 'pt'); // "Cento Um" 
n2t(1234.56, 'pt'); // "Mil Duzentos Trinta e Quatro com Cinquenta e Seis"

// Comma decimal separators (Spanish/Portuguese format)
n2t('1.234,56', 'es'); // "Mil Doscientos Treinta y Cuatro con Cincuenta y Seis"
n2t('1.234,56', 'pt'); // "Mil Duzentos Trinta e Quatro com Cinquenta e Seis"
```

## Features

- ✅ **Multiple Import Styles**: CommonJS, ES Modules, named imports
- ✅ **Three Languages**: English, Spanish, Portuguese  
- ✅ **Decimal Support**: Automatic decimal handling with proper connectors
- ✅ **Flexible Input**: Numbers, strings, with automatic cleanup
- ✅ **Regional Formats**: Supports comma decimal separators (1.234,56)
- ✅ **Edge Cases**: Zero handling, leading zeros, non-digit characters
- ✅ **TypeScript Friendly**: Works with TypeScript projects
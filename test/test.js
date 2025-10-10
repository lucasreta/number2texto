const assert = require('assert');
const path = require('path');
const n2t = require('../index.js');

describe('n2t() - English', () => {
  it(`should output 'Fourteen' for params (14)`, () => {
    assert.equal(n2t(14), 'Fourteen');
  });
  it(`should output 'Twenty' for params (20)`, () => {
    assert.equal(n2t(20), 'Twenty');
  });
  it(`should output 'Twenty-one' for params (21)`, () => {
    assert.equal(n2t(21), 'Twenty-one');
  });
  it(`should output 'One hundred' for params (100)`, () => {
    assert.equal(n2t(100), 'One hundred');
  });
  it(`should output 'One hundred one' for params (101)`, () => {
    assert.equal(n2t(101), 'One hundred one');
  });
  it(`should output 'Three thousand three hundred seven and fifty-four' for params (3307.54)`, () => {
    assert.equal(n2t(3307.54), 'Three thousand three hundred seven and fifty-four');
  });
  it(`should output 'Three hundred eighty-five and ten' for params (385.1)`, () => {
    assert.equal(n2t(385.1), 'Three hundred eighty-five and ten');
  });
  it(`should output 'Three hundred eighty-five and ten' for params (385.10)`, () => {
    assert.equal(n2t(385.10), 'Three hundred eighty-five and ten');
  });
  it(`should output 'Three hundred eighty-five and ten' for params ('385.10')`, () => {
    assert.equal(n2t('385.10'), 'Three hundred eighty-five and ten');
  });
  it(`should output 'Ten thousand six hundred thirty-nine and sixty-five' for params (10639.65)`, () => {
    assert.equal(n2t(10639.65), 'Ten thousand six hundred thirty-nine and sixty-five');
  });
  it(`should output 'Thirteen thousand two hundred ninety-three and seventy-six' for params (13293.76)`, () => {
    assert.equal(n2t(13293.76), 'Thirteen thousand two hundred ninety-three and seventy-six');
  });
  it(`should output 'Eighteen thousand two hundred ninety-three and seventy-six' for params (18293.76)`, () => {
    assert.equal(n2t(18293.76), 'Eighteen thousand two hundred ninety-three and seventy-six');
  });
  it(`should output 'Twenty-eight thousand two hundred ninety-three and seventy-six' for params (28293.76)`, () => {
    assert.equal(n2t(28293.76), 'Twenty-eight thousand two hundred ninety-three and seventy-six');
  });
  it(`should output 'Twenty-nine thousand hundred ninety-three and fifty-four' for params (29093.54)`, () => {
    assert.equal(n2t(29093.54), 'Twenty-nine thousand hundred ninety-three and fifty-four');
  });
  it(`should output 'One million two hundred three thousand two hundred ninety-three and seventy-six' for params (1203293.76)`, () => {
    assert.equal(n2t(1203293.76), 'One million two hundred three thousand two hundred ninety-three and seventy-six');
  });
  it(`should output 'One million one hundred sixty-three thousand two hundred ninety-three and seventy' for params (1163293.7)`, () => {
    assert.equal(n2t(1163293.7), 'One million one hundred sixty-three thousand two hundred ninety-three and seventy');
  });
  it(`should output 'One million three hundred three thousand two hundred ninety-three and eighty-nine' for params (1303293.89)`, () => {
    assert.equal(n2t(1303293.89), 'One million three hundred three thousand two hundred ninety-three and eighty-nine');
  });
  it(`should output 'One million thirty thousand hundred thirteen and twelve' for params (1030013.12)`, () => {
    assert.equal(n2t(1030013.12), 'One million thirty thousand hundred thirteen and twelve');
  });
  it(`should output 'Ten million three hundred three thousand two hundred ninety-three and seventy-six' for params ('10303293.76')`, () => {
    assert.equal(n2t('10303293.76'), 'Ten million three hundred three thousand two hundred ninety-three and seventy-six');
  });
  it(`should output 'One hundred million three hundred three thousand two hundred ninety-three and seventy-six' for params (100303293.76)`, () => {
    assert.equal(n2t(100303293.76), 'One hundred million three hundred three thousand two hundred ninety-three and seventy-six');
  });
  it(`should output 'Ten million three hundred three thousand two hundred ninety-three and sixty' for params ('10303293.6')`, () => {
    assert.equal(n2t('10303293.6'), 'Ten million three hundred three thousand two hundred ninety-three and sixty');
  });
  it(`should output 'Thirteen million three hundred three thousand one hundred two and ninety-one' for params ('13303102.91')`, () => {
    assert.equal(n2t('13303102.91'), 'Thirteen million three hundred three thousand one hundred two and ninety-one');
  });
  it(`should output 'Twenty-four million four hundred eighty-eight thousand two hundred three and ninety-nine' for params ('24488203.99')`, () => {
    assert.equal(n2t('24488203.99'), 'Twenty-four million four hundred eighty-eight thousand two hundred three and ninety-nine');
  });
  it(`should output 'Forty-five million thirty thousand seven hundred thirty and ten' for params ('45030730.1')`, () => {
    assert.equal(n2t('45030730.1'), 'Forty-five million thirty thousand seven hundred thirty and ten');
  });
});

describe('n2t() - Spanish', () => {
  it(`should output 'Catorce' for params (14, 'es')`, () => {
    assert.equal(n2t(14, 'es'), 'Catorce');
  });
  it(`should output 'Veinte' for params (20, 'es')`, () => {
    assert.equal(n2t(20, 'es'), 'Veinte');
  });
  it(`should output 'Veintiuno' for params (21, 'es')`, () => {
    assert.equal(n2t(21, 'es'), 'Veintiuno');
  });
  it(`should output 'Cien' for params (100, 'es')`, () => {
    assert.equal(n2t(100, 'es'), 'Cien');
  });
  it(`should output 'Ciento Uno' for params (101, 'es')`, () => {
    assert.equal(n2t(101, 'es'), 'Ciento Uno');
  });
  it(`should output 'Tres mil Trescientos Siete con Cincuenta y Cuatro' for params (3307.54, 'es')`, () => {
    assert.equal(n2t(3307.54, 'es'), 'Tres mil Trescientos Siete con Cincuenta y Cuatro');
  });
  it(`should output 'Trescientos Ochenta y Cinco con Diez' for params (385.1, 'es')`, () => {
    assert.equal(n2t(385.1, 'es'), 'Trescientos Ochenta y Cinco con Diez');
  });
  it(`should output 'Trescientos Ochenta y Cinco con Diez' for params (385.10, 'es')`, () => {
    assert.equal(n2t(385.10, 'es'), 'Trescientos Ochenta y Cinco con Diez');
  });
  it(`should output 'Trescientos Ochenta y Cinco con Diez' for params ('385.10', 'es')`, () => {
    assert.equal(n2t('385.10', 'es'), 'Trescientos Ochenta y Cinco con Diez');
  });
  it(`should output 'Diez mil Seiscientos Treinta y Nueve con Sesenta y Cinco' for params (10639.65, 'es')`, () => {
    assert.equal(n2t(10639.65, 'es'), 'Diez mil Seiscientos Treinta y Nueve con Sesenta y Cinco');
  });
  it(`should output 'Trece mil Doscientos Noventa y Tres con Setenta y Seis' for params (13293.76, 'es')`, () => {
    assert.equal(n2t(13293.76, 'es'), 'Trece mil Doscientos Noventa y Tres con Setenta y Seis');
  });
  it(`should output 'Dieciocho mil Doscientos Noventa y Tres con Setenta y Seis' for params (18293.76, 'es')`, () => {
    assert.equal(n2t(18293.76, 'es'), 'Dieciocho mil Doscientos Noventa y Tres con Setenta y Seis');
  });
  it(`should output 'Veintiocho mil Doscientos Noventa y Tres con Setenta y Seis' for params (28293.76, 'es')`, () => {
    assert.equal(n2t(28293.76, 'es'), 'Veintiocho mil Doscientos Noventa y Tres con Setenta y Seis');
  });
  it(`should output 'Veintinueve mil Noventa y Tres con Cincuenta y Cuatro' for params (29093.54, 'es')`, () => {
    assert.equal(n2t(29093.54, 'es'), 'Veintinueve mil Noventa y Tres con Cincuenta y Cuatro');
  });
  it(`should output 'Un millón Doscientos Tres mil Doscientos Noventa y Tres con Setenta y Seis' for params (1203293.76, 'es')`, () => {
    assert.equal(n2t(1203293.76, 'es'), 'Un millón Doscientos Tres mil Doscientos Noventa y Tres con Setenta y Seis');
  });
  it(`should output 'Un millón Ciento Sesenta y Tres mil Doscientos Noventa y Tres con Setenta' for params (1163293.7, 'es')`, () => {
    assert.equal(n2t(1163293.7, 'es'), 'Un millón Ciento Sesenta y Tres mil Doscientos Noventa y Tres con Setenta');
  });
  it(`should output 'Un millón Trescientos Tres mil Doscientos Noventa y Tres con Ochenta y Nueve' for params (1303293.89, 'es')`, () => {
    assert.equal(n2t(1303293.89, 'es'), 'Un millón Trescientos Tres mil Doscientos Noventa y Tres con Ochenta y Nueve');
  });
  it(`should output 'Un millón Treinta mil Trece con Doce' for params (1030013.12, 'es')`, () => {
    assert.equal(n2t(1030013.12, 'es'), 'Un millón Treinta mil Trece con Doce');
  });
  it(`should output 'Diez millones Trescientos Tres mil Doscientos Noventa y Tres con Setenta y Seis' for params ('10303293.76', 'es')`, () => {
    assert.equal(n2t('10303293.76', 'es'), 'Diez millones Trescientos Tres mil Doscientos Noventa y Tres con Setenta y Seis');
  });
  it(`should output 'Cien millones Trescientos Tres mil Doscientos Noventa y Tres con Setenta y Seis' for params (100303293.76, 'es')`, () => {
    assert.equal(n2t(100303293.76, 'es'), 'Cien millones Trescientos Tres mil Doscientos Noventa y Tres con Setenta y Seis');
  });
  it(`should output 'Diez millones Trescientos Tres mil Doscientos Noventa y Tres con Sesenta' for params ('10303293.6', 'es')`, () => {
    assert.equal(n2t('10303293.6', 'es'), 'Diez millones Trescientos Tres mil Doscientos Noventa y Tres con Sesenta');
  });
  it(`should output 'Trece millones Trescientos Tres mil Ciento Dos con Noventa y Uno' for params ('13303102.91', 'es')`, () => {
    assert.equal(n2t('13303102.91', 'es'), 'Trece millones Trescientos Tres mil Ciento Dos con Noventa y Uno');
  });
  it(`should output 'Veinticuatro millones Cuatrocientos Ochenta y Ocho mil Doscientos Tres con Noventa y Nueve' for params ('24488203.99', 'es')`, () => {
    assert.equal(n2t('24488203.99', 'es'), 'Veinticuatro millones Cuatrocientos Ochenta y Ocho mil Doscientos Tres con Noventa y Nueve');
  });
  it(`should output 'Cuarenta y Cinco millones Treinta mil Setecientos Treinta con Diez' for params ('45030730.1', 'es')`, () => {
    assert.equal(n2t('45030730.1', 'es'), 'Cuarenta y Cinco millones Treinta mil Setecientos Treinta con Diez');
  });
});

describe('n2t() - Portuguese', () => {
  it(`should output 'Catorze' for params (14, 'pt')`, () => {
    assert.equal(n2t(14, 'pt'), 'Catorze');
  });
  it(`should output 'Vinte' for params (20, 'pt')`, () => {
    assert.equal(n2t(20, 'pt'), 'Vinte');
  });
  it(`should output 'Vinte e Um' for params (21, 'pt')`, () => {
    assert.equal(n2t(21, 'pt'), 'Vinte e Um');
  });
  it(`should output 'Cem' for params (100, 'pt')`, () => {
    assert.equal(n2t(100, 'pt'), 'Cem');
  });
  it(`should output 'Cento e Um' for params (101, 'pt')`, () => {
    assert.equal(n2t(101, 'pt'), 'Cento e Um');
  });
  it(`should output 'Três mil Trezentos Sete com Cinquenta e Quatro' for params (3307.54, 'pt')`, () => {
    assert.equal(n2t(3307.54, 'pt'), 'Três mil Trezentos Sete com Cinquenta e Quatro');
  });
  it(`should output 'Trezentos Oitenta e Cinco com Dez' for params (385.1, 'pt')`, () => {
    assert.equal(n2t(385.1, 'pt'), 'Trezentos Oitenta e Cinco com Dez');
  });
  it(`should output 'Trezentos Oitenta e Cinco com Dez' for params (385.10, 'pt')`, () => {
    assert.equal(n2t(385.10, 'pt'), 'Trezentos Oitenta e Cinco com Dez');
  });
  it(`should output 'Trezentos Oitenta e Cinco com Dez' for params ('385.10', 'pt')`, () => {
    assert.equal(n2t('385.10', 'pt'), 'Trezentos Oitenta e Cinco com Dez');
  });
  it(`should output 'Dez mil Seiscentos Trinta e Nove com Sessenta e Cinco' for params (10639.65, 'pt')`, () => {
    assert.equal(n2t(10639.65, 'pt'), 'Dez mil Seiscentos Trinta e Nove com Sessenta e Cinco');
  });
  it(`should output 'Treze mil Duzentos Noventa e Três com Setenta e Seis' for params (13293.76, 'pt')`, () => {
    assert.equal(n2t(13293.76, 'pt'), 'Treze mil Duzentos Noventa e Três com Setenta e Seis');
  });
  it(`should output 'Dezoito mil Duzentos Noventa e Três com Setenta e Seis' for params (18293.76, 'pt')`, () => {
    assert.equal(n2t(18293.76, 'pt'), 'Dezoito mil Duzentos Noventa e Três com Setenta e Seis');
  });
  it(`should output 'Vinte e Oito mil Duzentos Noventa e Três com Setenta e Seis' for params (28293.76, 'pt')`, () => {
    assert.equal(n2t(28293.76, 'pt'), 'Vinte e Oito mil Duzentos Noventa e Três com Setenta e Seis');
  });
  it(`should output 'Vinte e Nove mil Noventa e Três com Cinquenta e Quatro' for params (29093.54, 'pt')`, () => {
    assert.equal(n2t(29093.54, 'pt'), 'Vinte e Nove mil Noventa e Três com Cinquenta e Quatro');
  });
  it(`should output 'Um milhão Duzentos Três mil Duzentos Noventa e Três com Setenta e Seis' for params (1203293.76, 'pt')`, () => {
    assert.equal(n2t(1203293.76, 'pt'), 'Um milhão Duzentos Três mil Duzentos Noventa e Três com Setenta e Seis');
  });
  it(`should output 'Um milhão Cento e Sessenta e Três mil Duzentos Noventa e Três com Setenta' for params (1163293.7, 'pt')`, () => {
    assert.equal(n2t(1163293.7, 'pt'), 'Um milhão Cento e Sessenta e Três mil Duzentos Noventa e Três com Setenta');
  });
  it(`should output 'Um milhão Trezentos Três mil Duzentos Noventa e Três com Oitenta e Nove' for params (1303293.89, 'pt')`, () => {
    assert.equal(n2t(1303293.89, 'pt'), 'Um milhão Trezentos Três mil Duzentos Noventa e Três com Oitenta e Nove');
  });
  it(`should output 'Um milhão Trinta mil Treze com Doze' for params (1030013.12, 'pt')`, () => {
    assert.equal(n2t(1030013.12, 'pt'), 'Um milhão Trinta mil Treze com Doze');
  });
  it(`should output 'Dez milhões Trezentos Três mil Duzentos Noventa e Três com Setenta e Seis' for params ('10303293.76', 'pt')`, () => {
    assert.equal(n2t('10303293.76', 'pt'), 'Dez milhões Trezentos Três mil Duzentos Noventa e Três com Setenta e Seis');
  });
  it(`should output 'Cem milhões Trezentos Três mil Duzentos Noventa e Três com Setenta e Seis' for params (100303293.76, 'pt')`, () => {
    assert.equal(n2t(100303293.76, 'pt'), 'Cem milhões Trezentos Três mil Duzentos Noventa e Três com Setenta e Seis');
  });
  it(`should output 'Dez milhões Trezentos Três mil Duzentos Noventa e Três com Sessenta' for params ('10303293.6', 'pt')`, () => {
    assert.equal(n2t('10303293.6', 'pt'), 'Dez milhões Trezentos Três mil Duzentos Noventa e Três com Sessenta');
  });
  it(`should output 'Treze milhões Trezentos Três mil Cento e Dois com Noventa e Um' for params ('13303102.91', 'pt')`, () => {
    assert.equal(n2t('13303102.91', 'pt'), 'Treze milhões Trezentos Três mil Cento e Dois com Noventa e Um');
  });
  it(`should output 'Vinte e Quatro milhões Quatrocentos Oitenta e Oito mil Duzentos Três com Noventa e Nove' for params ('24488203.99', 'pt')`, () => {
    assert.equal(n2t('24488203.99', 'pt'), 'Vinte e Quatro milhões Quatrocentos Oitenta e Oito mil Duzentos Três com Noventa e Nove');
  });
  it(`should output 'Quarenta e Cinco milhões Trinta mil Setecentos Trinta com Dez' for params ('45030730.1', 'pt')`, () => {
    assert.equal(n2t('45030730.1', 'pt'), 'Quarenta e Cinco milhões Trinta mil Setecentos Trinta com Dez');
  });
});

describe('n2t() - English - extra edge cases', () => {
  it("strips non-digits correctly (regex \\D bug): '1a2b3' -> 'One hundred twenty-three'", () => {
    assert.strictEqual(n2t('1a2b3'), 'One hundred twenty-three');
  });

  it("handles thousands separators safely: '1,234.56' -> 'One thousand two hundred thirty-four and fifty-six'", () => {
    assert.strictEqual(n2t('1,234.56'), 'One thousand two hundred thirty-four and fifty-six');
  });

  it("pads decimals to 2 digits: 385.1 -> '... and ten' (already in your tests) and 7 -> 'Seven'", () => {
    assert.strictEqual(n2t(7), 'Seven');
    assert.strictEqual(n2t(385.1), 'Three hundred eighty-five and ten');
  });

  it("hyphen has no surrounding spaces: 21 -> 'Twenty-one'", () => {
    assert.strictEqual(n2t(21), 'Twenty-one');
    // defensive: ensure no ' - ' present
    assert.ok(!n2t(21).includes(' - '));
  });

  it("leading zeros don’t break parse: '00021' -> 'Twenty-one'", () => {
    assert.strictEqual(n2t('00021'), 'Twenty-one');
  });

  it("decimal with single digit is padded: '0.7' -> 'Zero and seventy'", () => {
    assert.strictEqual(n2t('0.7'), 'Zero and seventy');
  });

  it("teens boundary inside doubles: 119 -> 'One hundred nineteen'", () => {
    assert.strictEqual(n2t(119), 'One hundred nineteen');
  });

  // This en.json needs thousand.singular = "one thousand" for this to pass.
  it("1,005 -> 'One thousand five' (expects proper thousand singular wording)", () => {
    assert.strictEqual(n2t(1005), 'One thousand five');
  });
});

describe('n2t() - Errors & invalids', () => {
  it("unsupported language throws", () => {
    assert.throws(() => n2t(10, 'zz'), /Unsupported language/i);
  });

  it("negative numbers are currently unsupported (decide your behavior: throw)", () => {
    // If you choose to implement negatives later, change this expectation accordingly.
    assert.throws(() => n2t(-12), /negative|unsupported/i);
  });
});

describe('n2t() - Custom dictionary folder resolution', () => {
  it("loads dictionary from a custom folder path", () => {
    // This assumes your languages live under ../lib/languages/
    // Adjust if your structure is different.
    const customFolder = path.resolve(__dirname, '../lib/languages/') + path.sep;
    const out = n2t(42, 'en', customFolder);
    assert.strictEqual(out, 'Forty-two');
  });
});

describe('n2t() - Spanish with comma decimal/period thousands', () => {
});

// Optional: locale-specific decimal separator behavior (depends on your es.json)
describe('n2t() - Spanish with comma decimal/period thousands', () => {
  it("'1.234,5' -> 'Mil Doscientos Treinta y Cuatro con Cincuenta'", () => {
    // This will pass only if es.json uses decimalSeparator="," and your code respects it.
    // If not implemented yet, keep this test to enforce the fix.
    assert.strictEqual(n2t('1.234,5', 'es'), 'Mil Doscientos Treinta y Cuatro con Cincuenta');
  });
});

describe('n2t() - Portuguese with comma decimal/period thousands', () => {
  it("'1.234,5' -> 'Mil Duzentos Trinta e Quatro com Cinquenta'", () => {
    // Portuguese also uses decimalSeparator="," so should handle this format too
    assert.strictEqual(n2t('1.234,5', 'pt'), 'Mil Duzentos Trinta e Quatro com Cinquenta');
  });
});


describe('n2t() - Spanish - extra edge cases', () => {
  it("strips non-digits correctly (regex \\D bug): '1a2b3' -> 'Ciento Veintitres'", () => {
    assert.strictEqual(n2t('1a2b3', 'es'), 'Ciento Veintitres');
  });

  it("handles thousands separators safely: '1.234,56' -> 'Mil Doscientos Treinta y Cuatro con Cincuenta y Seis'", () => {
    assert.strictEqual(n2t('1.234,56', 'es'), 'Mil Doscientos Treinta y Cuatro con Cincuenta y Seis');
  });

  it("pads decimals to 2 digits: 385,1 -> 'Trescientos Ochenta y Cinco con Diez' and 7 -> 'Seven'", () => {
    assert.strictEqual(n2t(7, 'es'), 'Siete');
    assert.strictEqual(n2t(385.1, 'es'), 'Trescientos Ochenta y Cinco con Diez');
  });

  it("leading zeros don’t break parse: '00021' -> 'Veintiuno'", () => {
    assert.strictEqual(n2t('00021', 'es'), 'Veintiuno');
  });

  it("decimal with single digit is padded: '0.7' -> 'Cero con Setenta'", () => {
    assert.strictEqual(n2t('0.7', 'es'), 'Cero con Setenta');
  });

  it("teens boundary inside doubles: 119 -> 'Ciento Diecinueve'", () => {
    assert.strictEqual(n2t(119, 'es'), 'Ciento Diecinueve');
  });
});

describe('n2t() - Portuguese - extra edge cases', () => {
  it("strips non-digits correctly (regex \\D bug): '1a2b3' -> 'Cento e Vinte e Três'", () => {
    assert.strictEqual(n2t('1a2b3', 'pt'), 'Cento e Vinte e Três');
  });

  it("handles thousands separators safely: '1.234,56' -> 'Mil Duzentos Trinta e Quatro com Cinquenta e Seis'", () => {
    assert.strictEqual(n2t('1.234,56', 'pt'), 'Mil Duzentos Trinta e Quatro com Cinquenta e Seis');
  });

  it("pads decimals to 2 digits: 385,1 -> 'Trezentos Oitenta e Cinco com Dez' and 7 -> 'Sete'", () => {
    assert.strictEqual(n2t(7, 'pt'), 'Sete');
    assert.strictEqual(n2t(385.1, 'pt'), 'Trezentos Oitenta e Cinco com Dez');
  });

  it("leading zeros don't break parse: '00021' -> 'Vinte e Um'", () => {
    assert.strictEqual(n2t('00021', 'pt'), 'Vinte e Um');
  });

  it("decimal with single digit is padded: '0.7' -> 'Zero com Setenta'", () => {
    assert.strictEqual(n2t('0.7', 'pt'), 'Zero com Setenta');
  });

  it("teens boundary inside doubles: 119 -> 'Cento e Dezenove'", () => {
    assert.strictEqual(n2t(119, 'pt'), 'Cento e Dezenove');
  });
});
const assert = require('assert');
const n2t = require('../index.js');

describe('n2t()', () => {
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

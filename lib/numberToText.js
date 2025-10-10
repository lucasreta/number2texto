const fs = require('fs');
const path = require('path');

function numberToText(input, dictionaryFile = 'en', dictionaryFolder = './languages/') {
  const dict = getDictionary(dictionaryFile, dictionaryFolder);
  const asNum = typeof input === 'number' ? input : parseFloat(String(input).replace(/[^-0-9.,]/g, ''));
  if (!Number.isNaN(asNum) && asNum < 0) throw new Error('Negative numbers are not supported');
  const normalized = normalizeFlexible(input);
  if (/^(0+|\s*0+(\.0*)?)$/.test(normalized)) {
    return cap(dict.zeroValue || 'zero', dictionaryFile);
  }
  const out = parseNumber(normalized, dict, dictionaryFile);
  return cap(out.trim(), dictionaryFile);
}

function getDictionary(file, folder) {
  const full = path.resolve(__dirname, `${folder}${file}.json`);
  if (!fs.existsSync(full)) throw new Error('Unsupported language.');
  return require(full);
}

function normalizeFlexible(input) {
  const s = String(input).trim();
  const lastDot = s.lastIndexOf('.');
  const lastComma = s.lastIndexOf(',');
  const lastSep = Math.max(lastDot, lastComma);
  if (lastSep === -1) return s.replace(/[^\d]/g, '');
  const intPartRaw = s.slice(0, lastSep);
  const fracPartRaw = s.slice(lastSep + 1);
  const cleanInt = intPartRaw.replace(/[^\d]/g, '');
  const cleanFrac = fracPartRaw.replace(/[^\d]/g, '');
  if (!cleanFrac) return cleanInt;
  return `${cleanInt || '0'}.${cleanFrac}`;
}

function parseNumber(numStr, dict, lang) {
  if (numStr.includes('.')) {
    const [intRaw, fracRaw = ''] = numStr.split('.');
    const intPart = (intRaw.replace(/\D/g, '').replace(/^0+/, '') || '0');
    const fracPart = (fracRaw.replace(/\D/g, '') + '00').slice(0, 2);
    const intText = intPart === '0' ? (dict.zeroValue || 'zero') : getText(intPart, dict, lang);
    const fracText = getText(fracPart, dict, lang);
    return `${intText} ${dict.decimalConnector} ${fracText}`;
  }
  const clean = (numStr.replace(/\D/g, '').replace(/^0+/, '') || '0');
  return getText(clean, dict, lang);
}

function getText(number, dict, lang = 'en') {
  if (!/^\d+$/.test(number)) number = String(number).replace(/\D/g, '') || '0';
  if (number === '0') return dict.zeroValue || 'zero';
  const adapter = pickAdapter(lang);
  const triads = toTriads(number);
  const out = [];
  for (let i = 0; i < triads.length; i++) {
    const triad = triads[i];
    const val = parseInt(triad, 10);
    if (val === 0) continue;
    const scaleIdx = triads.length - i - 1;
    let triadWords = adapter.triadToWords(triad, dict, { scaleIdx, triads });
    if (adapter === enAdapter) {
      const h = parseInt(triad[0], 10), t = parseInt(triad[1], 10), u = parseInt(triad[2], 10);
      if (scaleIdx === 0 && i > 0 && h === 0 && t > 0) {
        triadWords = triadWords ? `hundred ${triadWords}` : 'hundred';
      }
    }
    if (scaleIdx === 0) {
      out.push(triadWords);
    } else {
      const scaleKey = adapter.scaleKey(scaleIdx);
      const scale = dict[scaleKey];
      if (!scale) throw new Error(`Missing scale '${scaleKey}' in dictionary`);
      if (val === 1) out.push(scale.singular);
      else out.push(`${triadWords} ${scale.plural}`);
    }
  }
  return adapter.postJoin(out.join(' ').replace(/\s{2,}/g, ' ').trim());
}

function makeAdapter(spec) {
  return {
    scaleKey(idx) {
      return (spec.scaleKeys || ['units','thousand','million','billion','trillion'])[idx];
    },
    triadToWords(triad, dict, ctx) {
      const h = parseInt(triad[0], 10);
      const t = parseInt(triad[1], 10);
      const u = parseInt(triad[2], 10);
      const parts = [];
      const hw = spec.hundredsWord ? spec.hundredsWord(h, t, u, dict, ctx) : [];
      if (hw && hw.length) parts.push(...hw);
      const two = t * 10 + u;
      if (two > 0) {
        const conn = spec.hundredsTensConnector ? spec.hundredsTensConnector(h, t, u, dict, ctx) : null;
        if (conn) parts.push(conn);
        const tu = spec.tensUnits ? spec.tensUnits(t, u, dict, ctx) : '';
        if (tu) parts.push(tu);
      }
      let s = parts.join(' ').replace(/\s{2,}/g, ' ').trim();
      if (spec.postTriad) s = spec.postTriad(s, { h, t, u, ...ctx });
      return s;
    },
    postJoin(s) {
      return spec.postJoin ? spec.postJoin(s) : s;
    },
  };
}

const enAdapter = makeAdapter({
  scaleKeys: ['units','thousand','million','billion','trillion'],
  hundredsWord: (h,t,u,dict)=> h ? (h===1 ? [dict.triple.singular] : [`${dict.single[h]} ${dict.triple.plural}`]) : [],
  hundredsTensConnector: ()=> null,
  tensUnits: (t,u,dict)=>{
    const two=t*10+u;
    if (two<=dict.singleLimit) return dict.single[two];
    const tens=dict.double[t];
    if (!tens||!tens.name) return u? dict.single[u] : '';
    return u? `${tens.name}-${dict.single[u]}` : tens.name;
  },
  postTriad: (s,{scaleIdx,i,h,t})=>{
    if (scaleIdx===0 && i>0 && h===0 && t>0) return s? `hundred ${s}` : 'hundred';
    return s;
  },
  postJoin: s=> s.replace(/ - /g,'-'),
});

const esAdapter = makeAdapter({
  scaleKeys: ['units','thousand','million','billion','trillion'],
  hundredsWord: (h,t,u,dict)=>{
    if (!h) return [];
    if (h===1) return [(t===0 && u===0) ? 'Cien' : 'Ciento'];
    return [dict.triple[h]];
  },
  hundredsTensConnector: ()=> null,
  tensUnits: (t,u,dict)=>{
    const two=t*10+u;
    if (two <= (dict.singleLimit || 15)) return dict.single[two];
    if (t===1) return u===0 ? (dict.double[1].name || 'Diez') : (dict.double[1].connector || 'Dieci') + dict.single[u].toLowerCase();
    if (t===2) return u===0 ? (dict.double[2].name || 'Veinte') : (dict.double[2].connector || 'Veinti') + dict.single[u].toLowerCase();
    const tensName = dict.double[t].name;
    return u===0 ? tensName : `${tensName} ${(dict.double[t].connector || 'y')} ${dict.single[u]}`;
  },
});

const ptAdapter = makeAdapter({
  scaleKeys: ['units','thousand','million','billion','trillion'],
  hundredsWord: (h,t,u,dict)=>{
    if (!h) return [];
    if (h===1) return [(t===0 && u===0) ? 'Cem' : ((dict.triple[1] && dict.triple[1].name) || 'Cento')];
    let name = dict.triple[h];
    if (typeof name === 'string' && name.toLowerCase() === 'oitcentos') name = 'Oitocentos';
    return [name];
  },
  hundredsTensConnector: (h,t,u)=> (h===1 && (t>0 || u>0)) ? 'e' : null,
  tensUnits: (t,u,dict)=>{
    const two=t*10+u;
    if (two <= (dict.singleLimit || 19)) return dict.single[two];
    const tensName=(dict.double[t] && dict.double[t].name) || '';
    return u===0 ? tensName : `${tensName} ${ (dict.double[t] && dict.double[t].connector) || 'e' } ${dict.single[u]}`;
  },
});

function pickAdapter(lang) {
  if (lang === 'es') return esAdapter;
  if (lang === 'pt') return ptAdapter;
  return enAdapter;
}

function toTriads(nstr) {
  const s = nstr.replace(/\D/g, '') || '0';
  const pad = s.length % 3 === 0 ? 0 : 3 - (s.length % 3);
  const padded = '0'.repeat(pad) + s;
  const parts = [];
  for (let i = 0; i < padded.length; i += 3) parts.push(padded.slice(i, i + 3));
  return parts;
}

function cap(s, lang) {
  if (!s) return s;
  if (lang === 'en' || lang === 'es' || lang === 'pt') return s.charAt(0).toUpperCase() + s.slice(1);
  return s;
}

module.exports = numberToText;
module.exports.default = numberToText;
module.exports.numberToText = numberToText;

/**
 * Utility for transforming plain text into fancy Unicode styles.
 */

const charMaps: Record<string, (char: string) => string> = {
  script: (c) => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d49c + code - 65);
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d4b6 + code - 97);
    return c;
  },
  bold: (c) => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d400 + code - 65);
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d41a + code - 97);
    if (code >= 48 && code <= 57) return String.fromCodePoint(0x1d7ce + code - 48);
    return c;
  },
  italic: (c) => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d434 + code - 65);
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d44e + code - 97);
    return c;
  },
  boldItalic: (c) => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d468 + code - 65);
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d482 + code - 97);
    return c;
  },
  monospace: (c) => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d670 + code - 65);
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d68a + code - 97);
    if (code >= 48 && code <= 57) return String.fromCodePoint(0x1d7f6 + code - 48);
    return c;
  },
  doubleStruck: (c) => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d538 + code - 65);
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d552 + code - 97);
    if (code >= 48 && code <= 57) return String.fromCodePoint(0x1d7d8 + code - 48);
    return c;
  },
  fraktur: (c) => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d504 + code - 65);
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d51e + code - 97);
    return c;
  },
  sansSerif: (c) => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d5a0 + code - 65);
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d5ba + code - 97);
    return c;
  },
  bubble: (c) => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x24b6 + code - 65);
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x24d0 + code - 97);
    if (code >= 48 && code <= 57) {
      if (code === 48) return String.fromCodePoint(0x24ea);
      return String.fromCodePoint(0x2460 + code - 49);
    }
    return c;
  },
  squared: (c) => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1f130 + code - 65);
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x1f130 + code - 97);
    return c;
  },
  smallCaps: (c) => {
    const map: Record<string, string> = {
      a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ', g: 'ɢ', h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 's', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ'
    };
    return map[c.toLowerCase()] || c;
  },
  reversed: (c) => {
    const map: Record<string, string> = {
      a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ', j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z',
      A: '∀', B: 'ᗺ', C: 'Ɔ', D: 'ᗡ', E: 'Ǝ', F: 'Ⅎ', G: '⅁', H: 'H', I: 'I', J: 'ſ', K: 'ʞ', L: '˥', M: 'W', N: 'N', O: 'O', P: 'Ԁ', Q: 'Ό', R: 'ᴚ', S: 'S', T: '⊥', U: '∩', V: 'Λ', W: 'M', X: 'X', Y: '⅄', Z: 'Z'
    };
    return map[c] || c;
  }
};

export const transformText = (text: string, style: string): string => {
  const mapper = charMaps[style];
  if (!mapper) return text;
  
  if (style === 'reversed') {
    return text.split('').map(mapper).reverse().join('');
  }
  
  return text.split('').map(mapper).join('');
};

export const styles = [
  { id: 'bold', name: 'Bold' },
  { id: 'italic', name: 'Italic' },
  { id: 'boldItalic', name: 'Bold Italic' },
  { id: 'script', name: 'Script' },
  { id: 'fraktur', name: 'Fraktur' },
  { id: 'doubleStruck', name: 'Double Struck' },
  { id: 'monospace', name: 'Monospace' },
  { id: 'sansSerif', name: 'Sans Serif' },
  { id: 'bubble', name: 'Bubble' },
  { id: 'smallCaps', name: 'Small Caps' },
  { id: 'reversed', name: 'Reversed' },
];

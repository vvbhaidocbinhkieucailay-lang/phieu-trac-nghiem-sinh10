(function (root) {
  'use strict';
  function parseNumber(value) {
    const text = String(value ?? '').trim();
    if (!text) return { empty: true, valid: false, value: null };
    if (text.length > 4 || !/^-?\d+(?:[.,]\d+)?$/.test(text)) return { empty: false, valid: false, value: null };
    const n = Number(text.replace(',', '.'));
    return { empty: false, valid: Number.isFinite(n), value: n };
  }
  function readColumns(columns) {
    if (!Array.isArray(columns) || columns.length !== 4) return { text: '', valid: false, empty: false };
    let gap = false, malformed = false, text = '';
    columns.forEach(ch => { if (ch === '') gap = true; else { if (gap) malformed = true; text += ch; } });
    const result = parseNumber(text);
    return { ...result, text, valid: result.valid && !malformed, gap: malformed };
  }
  function grade(exam, answers) {
    const rows = [], counts = { mc: 0, tf: 0, short: 0 }, answered = { mc: 0, tf: 0, short: 0 };
    exam.mc.forEach((q, i) => {
      const value = answers.mc[i] || '', correct = value === q.key;
      if (value) answered.mc++;
      if (correct) counts.mc++;
      rows.push({ section: 'mc', id: `A${i+1}`, value, key: q.key, correct, explanation: q.explanation });
    });
    exam.tf.forEach((q, i) => q.items.forEach((item, j) => {
      const value = answers.tf[i][j] || '', correct = value === item.key;
      if (value) answered.tf++;
      if (correct) counts.tf++;
      rows.push({ section: 'tf', id: `B${i+1}${'abcd'[j]}`, value, key: item.key, correct, explanation: item.explanation });
    }));
    exam.short.forEach((q, i) => {
      const p = readColumns(answers.short[i]), k = parseNumber(q.key);
      const correct = p.valid && k.valid && p.value === k.value;
      if (p.valid) answered.short++;
      if (correct) counts.short++;
      rows.push({ section: 'short', id: `C${i+1}`, value: p.text, key: q.key, correct, valid: p.valid || p.empty, explanation: q.explanation });
    });
    const points = { mc: counts.mc * .25, tf: counts.tf * .25, short: counts.short * .25 };
    return { rows, counts, answered, points, total: points.mc + points.tf + points.short, correct: counts.mc + counts.tf + counts.short };
  }
  root.PHIEU = { parseNumber, readColumns, grade };
  if (typeof module !== 'undefined') module.exports = root.PHIEU;
})(typeof window !== 'undefined' ? window : globalThis);

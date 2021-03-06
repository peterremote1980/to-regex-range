'use strict';

const toRegexRange = require('./');
const table = require('text-table');
const Time = require('time-diff');
const time = new Time();

/**
 * $ node examples.js
 */

function toRange(min, max) {
  let key = 'to-range' + min + max;
  time.start(key);
  let str = toRegexRange(min, max);
  return [
    '',
    '`toRegexRange(\'' + min + ', ' + max + '\')`',
    '`' + str.split('|').join('\\|') + '`',
    '_' + time.end(key) + '_',
    ''
  ];
}

toRange('1', '3');

let rows = [
  ['', '**Range**', '**Result**', '**Compile time**', ''],
  ['', '--- ', '--- ', '---', ''],
];

let examples = [
  // ['0001', '5555'],
  // ['1', '5555'],
  // ['1', '555'],
  // ['1', '55'],
  // ['1', '50'],

  ['5', '5'],
  ['5', '6'],
  ['29', '51'],
  ['31', '877'],
  ['111', '555'],
  ['-10', '10'],
  ['-100', '-10'],
  ['-100', '100'],
  ['001', '100'],
  ['0010', '1000'],
  ['1', '2'],
  ['1', '5'],
  ['1', '10'],
  ['1', '100'],
  ['1', '1000'],
  ['1', '10000'],
  ['1', '100000'],
  ['1', '1000000'],
  ['1', '10000000'],
].forEach(function(args) {
  rows.push(toRange.apply(null, args));
});

let text = table(rows, {hsep: ' | '});
console.log(text);

/**
 * This method is exposed as a helper, which is picked up
 * by verb and used in the .verb.md readme template
 */

module.exports = function() {
  return text.split('\n').map(function(line) {
    return line.replace(/^ +/, '');
  }).join('\n');
};

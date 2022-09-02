/**
 * 【GASの起動時間の制限を回避せよ】分割実行や非同期処理を使って高速実行を実現してみた！
 * https://www.pnkts.net/2019/12/25/gas-split-execution-and-_asynchronous-processing
 */
const ss = SpreadsheetApp.getActiveSpreadsheet();

function sandbox() {
  for (let i = 0; i < 10; i++) {
    const rnd = getRandomInt(1, 10);
    console.log(rnd);
  }
  console.log(new Array(4));
  for (const r of new Array(4)) {
    console.log('hoge');
  }
}

function onOpen() {
  const entries = [
    {
      name: '実行',
      functionName: 'run',
    },
  ];
  ss.addMenu('非同期処理確認', entries);
}

function run() {
  const html = HtmlService.createTemplateFromFile('index').evaluate();
  SpreadsheetApp.getUi().showModalDialog(html, '非同期処理実行中。。。');
}

function addRow(word, url, num) {
  console.log(`script: ${word}`);
  ss.getSheetByName('out')
    .getRange(num, 1, 1, 2)
    .setValues([[word, url]]);
}

function getList() {
  console.log('getList');
  return ss.getSheetByName('list').getDataRange().getValues();
}

function search(word) {
  console.log(`search: ${word}`);
  const result = [];
  let count = 0;
  // for (const loop of new Array(4)) {
  for (const loop of new Array(getRandomInt(1, 10))) {
    result.push(`${word}: ${count}`);
    count += 1;
  }
  return { word: word, result: result };
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

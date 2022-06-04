const ss = SpreadsheetApp.getActiveSpreadsheet();

function main() {
  const spreadsheet = ss.getSheetByName('list');
  console.log(spreadsheet.getName());
}




/* Spreadsheet 側のUI関係 */
function onOpen() {
  const entries = [{
    name: '実行',
    functionName: 'run'
  }];
  ss.addMenu('非同期並列処理', entries);
};

function run() {
  const html = HtmlService.createTemplateFromFile('index').evaluate();
  SpreadsheetApp.getUi().showModalDialog(html, '処理中。。。');
}

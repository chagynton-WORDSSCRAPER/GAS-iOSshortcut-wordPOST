function doPost(e) {
  var params = JSON.parse(e.postData.getDataAsString()); // POSTされたデータを取得
  var myData = params.mydata.value;  // ショートカットで指定したPOSTデータを取得
  var result = {};
     
  var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  // addLog("params is :" + JSON.stringify(params)); // デバッグ用
  
  if (myData){
    
    result = {
      "success" : {
        "message" : "正常に処理されました。"
      }
    };
    addLog( JSON.stringify(myData) ); // スプレッドシートにショートカットから送信されてきたデータを記録
    
  } else {
    result = {
   "error": {
       "message": "データがありません。"
     }
   };
  }
  
  // 返すデータ（上記のresult）をセットする
  output.setContent(JSON.stringify(result));
  
  // リクエスト元（ショートカット）に返す
  return output;
}

function addLog(text) {
  var textnotquote = text.replace(/\"/g, "")//  ここが参考サイトからの変更点です
  var spreadsheetId = "1AaYm0uiPhyt4wM6tr1-RzLriFuQFImUVaSwnr0lx7Yg"; // スプレッドシートID
  var sheetName = "シート1"; // スプレッドシート名
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var sheet = spreadsheet.getSheetByName(sheetName);
  sheet.appendRow([textnotquote]); // スプレッドシートにタイムスタンプと引数を書き込む
}
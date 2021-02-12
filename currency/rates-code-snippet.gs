function updateSheet() {

  for (var coin in coins) {

    Logger.log(coins[coin].id);
      var rate = getCoinRateById(coins[coin].id);

      setCoinRateValue(rate, coins[coin].row, coins[coin].column);
  }
}

function getCoinRateById(id) {
  var response = UrlFetchApp.fetch("https://whattomine.com/coins/"+id+".json");

  // log response as text
  Logger.log(response.getContentText());

  var data = JSON.parse(response.getContentText());

  // log specific object value
  Logger.log(data.exchange_rate);

  return data.exchange_rate;
}

function setCoinRateValue(rate, row, column) {
  var sheet = SpreadsheetApp.getActiveSheet();

  // log all cloumns and fields state
  Logger.log(sheet.getDataRange().getValues());
  Logger.log(sheet.getRange(row,column).getValues());

  // set value to specific column field
  sheet.getRange(row,column).setValue(rate);
}

// 1 is BTC, 4 is LTC
var coins = {
  btc: {
    id: 1,
    row: 2,
    column: 2
  },
  ltc: {
    id: 4,
    row: 3,
    column: 2
  }
};

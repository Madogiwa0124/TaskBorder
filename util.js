// HTMLエスケープ処理
function escapeHtml(str) {
  str = str.replace(/&/g, '&amp;');
  str = str.replace(/</g, '&lt;');
  str = str.replace(/>/g, '&gt;');
  str = str.replace(/"/g, '&quot;');
  str = str.replace(/'/g, '&#39;');
  str = str.replace(/[\n\r]/g, '<br />')
  return str;
}

// 日付の整形メソッド
function getformatDate(format,mode) {
  var date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  // 新規モードで呼ばれた場合は、次の時間の0分を設定
  var hour = (mode === 'new')? date.getHours() + 1 : date.getHours()
  var min  = (mode === 'new')? '00' : date.getMinutes()

  // 指定した桁数に0パディングする関数を格納
  var toTargetDigits = function (num, digits) {
    num += '' // 文字列型へ変更
    while (num.length < digits) {
      num = '0' + num
    }
    return num
  }

  // 日付の0パディング
  var yyyy = toTargetDigits(year, 4)
  var MM = toTargetDigits(month, 2)
  var dd = toTargetDigits(day, 2)
  var hh = toTargetDigits(hour, 2)
  var mm = toTargetDigits(min, 2)

  // format変換
  switch (format) {
    case 'yyyyMMdd':   return yyyy + MM + dd
    case 'yyyy-MM-dd': return yyyy + '-' + MM + '-' + dd
    case 'yyyy/MM/dd': return yyyy + '/' + MM + '/' + dd
    case 'yyyy-MM-ddThh:mm': return yyyy + '-' + MM + '-' + dd + 'T' + hh + ':' + mm
    default: break  // なにもしない。
  }
}

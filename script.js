var tasks = []
var taskId = 0
$(function () {
  // 期限の初期値は現在日付を設定
  $('#limit').val(getformatDate('yyyy-MM-ddThh:mm'))
  // タイトルにフォーカスを設定
  $('#title').focus()
})

// 登録ボタン押下時タスクを登録
$('#inputBtn').click(function () {
  // 必須入力チェック
  if (!requiredCheck()) return
  var form = {}
  form.title = escapeHtml($('#title').val())
  form.priority = $('#priority').attr('value')
  form.text = replaceCheckBox(escapeHtml($('#text').val()))
  console.log($('#limit').val())
  form.limit = $('#limit').val()
  // 新規タスクの生成
  var task = new Task(form)
  task.createTask()
  tasks.push(task)
})

// リセットボタン押下時入直値をリセット
// TODO:重要度のリセット機能
$('#resetBtn').click(function () {
  $('#title').val('')
  $('#text').val('')
  // 期限は現在日付へリセット
  $('#limit').val(getformatDate('yyyy-MM-ddThh:mm'))
  // タイトルへフォーカスを設定
  $('#title').focus()
})

// 必須入力チェック
function requiredCheck() {
  var errFields = []
  // 必須項目の入力チェック
  $('.required').each(function () {
    // 値がなかったらErrorMsgを作成
    if ($(this).val() == '') {
      errFields.push($(this).attr('id'))
      console.log(errFields)
      var errMsg = errFields[errFields.length - 1] + ' is required.'
      $('#alert').append('<li>' + errMsg + '</li>')
    }
  })
  // エラーが有った場合、alertエリアを表示
  if (errFields.length > 0) {
    $('#alert').removeClass('hidden');
    $('#' + errFields[0]).focus()
    return false
  } else {
    $('#alert li').remove()
    $('#alert').addClass('hidden')
    return true
  }
}
// タスクの削除
// $function()内に記載するとhtmlから呼び出せないため、外出し
function taskDelete(id) {
  // 削除対象のタスクの取得
  var deleteTask = tasks[id]
  // タスクの削除
  deleteTask.deleteTask()
  tasks.splice(this.id, this.id)
}

function taskStatusChange(id, order) {
  // 変更対象のタスクの取得
  var statusChangeTask = tasks[id]

  // 状態変更前のタスクの削除
  // 状態変更後では、対象を見つけられずErrorとなるため先に削除
  statusChangeTask.deleteTask()
  // タスクの状態変更
  statusChangeTask.statusChangeTask(order)
  // 状態変更後のタスクの生成
  statusChangeTask.createTask()
}

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

// * をチェックボックスに置換
function replaceCheckBox(str) {
  var ret = str.replace(/\*/g, '<input type="checkbox">')
  return ret  
}

// 日付の整形メソッド
function getformatDate(format) {
  var date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var min = date.getMinutes()

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

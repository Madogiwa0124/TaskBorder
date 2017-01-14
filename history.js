// タスク状況変化履歴の登録
function addHistory(title, before, after) {
    // HTMLの生成
    $('#taskHistory_body').append(
          '<tr>'
            + '<td>' + title  + '</td>'
            + '<td>' + before + '</td>'
            + '<td>' + after  + '</td>'
            + '<td>' + getformatDate('yyyy/MM/dd hh:mm','get') + '</td>'
        +'</tr>'        
    )
}

// タスク状況変化履歴のCSV出力処理
$('#downloadHisCsvBtn').click(function () {
    // CSV形式に整形
    $("#taskHistory_table").table2csv('output', { appendTo: '#out' });
    // ファイル名の定義(yyyymmddmm_TaskHistory.csv)
    $("#taskHistory_table").table2csv('output', { filename: getformatDate('yyyyMMddhhmm', 'get') + '_TaskHistory.csv' });
    // CSV出力
    $("#taskHistory_table").table2csv();
})
function addHistory(title,before,after) {
    console.log(before)
    console.log(after)
    $('#taskHistory_body').append(
          '<tr>'
            + '<td>' + title  + '</td>'
            + '<td>' + before + '</td>'
            + '<td>' + after  + '</td>'
            + '<td>' + getformatDate('yyyy/MM/dd hh:mm','get') + '</td>'
        +'</tr>'        
    )
}
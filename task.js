class Task {
  // コンストラクター
  // 入力したタスクの情報を取得
  constructor (form) {
    this.id = taskId
    this.title = form.title
    this.priority = form.priority
    this.text = form.text
    this.limit = form.limit
    // TODO：登録時に状態を選択出来るようにする。
    this.status = 'todo'
    taskId++
  }

  // タスク作成メソッド
  createTask () {
    // 反映先の取得
    var insertPlace = document.getElementById(this.status)
    // タスクのHTMLオブジェクトの生成
    var insertElement = document.createElement('div')
    // クラスの追加
    insertElement.className = 'task'
    insertElement.id = this.id
    // HTML文字列を生成
    insertElement.innerHTML =
      '<p class="task-title ' + this.getTitleColor() + '">' + this.title + '</p>'
      + '<p class="task-text">' + this.text + '</p>'
      + '<p class="task-info">'
      + '期限：<input type="date" value="' + this.limit + '">'
      + '<span class="task-btn">'
      + '<span class="btn-group">'
      + '<button class="btn btn-xs btn-success downBtn" onClick="taskStatusChange(' + this.id + ',\'down\')">'
      + '<i class="glyphicon glyphicon-triangle-left"></i></button > '
      + '<button class="btn btn-xs btn-success upBtn"   onClick="taskStatusChange(' + this.id + ',\'up\')">'
      + '<i class="glyphicon glyphicon-triangle-right"></i></button > '
      + '</span>'
      + '<button class="btn btn-xs btn-danger deleteBtn" onClick="taskDelete(' + this.id + ')">'
      + '<i class="glyphicon glyphicon-remove"></i>削除'
      + '</button>'
      + '</span>'
      + '</p>'
    // 反映先に作成したタスクのHTMLオブジェクトを反映
    insertPlace.appendChild(insertElement)
  }

  // タスクタイトルの背景色取得メソッド
  getTitleColor() {
    // 追加するクラスと重要度の関連を保持した連想配列
    var color = { high: 'bg-danger', normal: 'bg-success', low: 'bg-info', default: 'bg-default' }
    // 引数と連想配列の引当を行い、結果をreturn
    switch (this.priority) {
      case 'high':
        return color.high
      case 'normal':
        return color.normal
      case 'low':
        return color.low
      default:
        return color.default
    }
  }

  // タスク削除メソッド
  deleteTask () {
    // 削除元の取得
    var deletePlace = document.getElementById(this.status)
    // 削除するタスクのHTMLオブジェクトの取得
    var deleteElement = document.getElementById(this.id)
    // 画面からHTMLオブジェクトを削除
    deletePlace.removeChild(deleteElement)
  }

  // タスクの状態変更メソッド
  statusChangeTask(order) {

    // タスクの状態を"up"かつ進捗が"done"でなければタスクの進捗をUP
    if (order === 'up' && this.status !== 'done') {
      this.status = this.status === 'todo' ? 'doing' : 'done'
    }
    // タスクの状態を"down"かつ進捗が"todo"でなければタスクの進捗をDOWN
    else if (order === 'down' && this.status !== 'todo') {
      this.status = this.status === 'done' ? 'doing' : 'todo'
    }
    // それ以外の場合は、Errorをコンソールへ出力
    else {
      console.log('error[method:taskStatusChange order:'+order+' taskStatus:'+this.status+']')
    }
  }

}

var fs = require("fs");


var server = require("http").createServer(function (req, res) {
  res.writeHead(200, { 
    "Content-Type": "text/html",
    // 'Access-Control-Allow-Origin':'https://whitegoat.sakura.ne.jp/index_physical.html',
    // 'Access-Control-Allow-Methods':'POST, GET, OPTIONS',
    // 'Access-Control-Allow-Headers':'*'
   });
  // var output = fs.readFileSync("test.html", "utf-8");
  var output = fs.readFileSync("mobile.html", "utf-8");
  res.end(output);
});
server.listen(process.env.PORT || 8080);
var io = require("socket.io").listen(server);


// ユーザ管理ハッシュ
var userHash = {};

// 2.イベントの定義
io.sockets.on("connection", function (socket) {

  socket.on('bord_control', function (btn) {
    // console.log(btn);
    io.sockets.emit("bord_control", btn);
  });

  // 接続確認
  socket.on("connected", function (msg) {
    console.log(msg);
    io.sockets.emit("connect_return", "connected");
  });

  // メッセージ送信カスタムイベント
  // socket.on("publish", function (data) {
  //   console.log("data" + data);
  //   io.sockets.emit("publish", { value: data.value });
  // });

  // 接続終了組み込みイベント(接続元ユーザを削除し、他ユーザへ通知)
  // socket.on("disconnect", function () {
  //   if (userHash[socket.id]) {
  //     var msg = userHash[socket.id] + "が退出しました";
  //     delete userHash[socket.id];
  //     io.sockets.emit("publish", { value: msg });
  //     console.log("msg" + msg);
  //   }
  // });
});
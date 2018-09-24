var fs = require("fs");


var server = require("http").createServer(function (req, res) {
  res.writeHead(200, { 
    "Content-Type": "text/html",
   });
  var output = fs.readFileSync("mobile.html", "utf-8");
  res.end(output);
});
server.listen(process.env.PORT || 8080);
var io = require("socket.io").listen(server);


// ユーザ管理ハッシュ
var userHash = {};

// 2.イベントの定義
io.sockets.on("connection", function (socket) {

  // 接続確認
  socket.on("connected", function (msg) {
    console.log(msg);
    io.sockets.emit("connect_return", "connected");
  });

  // 手動操作用
  socket.on('bord_control', function (btn) {
    // console.log(btn);
    io.sockets.emit("bord_control", btn);
  });

  // スマホの傾きで制御
  socket.on('jyro_sensor', function (jyro) {
    // console.log(btn);
    io.sockets.emit("jyro_sensor", jyro);
  });

});
const http = require("http");
const io = require("socket.io");

let httpServer = http.createServer();
httpServer.listen(8888);

let wsServer = io.listen(httpServer);
let aSock = [];
wsServer.on("connection", sock => {
  aSock.push(sock);

  //断开连接
  sock.on("disconnect", () => {
    let n = aSock.indexOf(sock);
    if (n != -1) {
      aSock.splice(n, 1);
    }
  });

  sock.on("msg", function(str) {//监听msg 接受信息
    aSock.forEach(s => {
      if (s != sock) {
        s.emit("msg", str);
      }
    });
  });
});

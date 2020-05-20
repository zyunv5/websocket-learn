export default {
  //websocket实例
  // const ws=new WebSocket()
  //保证整个项目只有一个socket实例
  ws: null, //websock实例
  init(config, onMessage, onError) {
    if (this.ws) {
      this.ws.close();
    }
    //实例化socket对象
    this.ws=new WebSocket(`ws://localhost:3000/${config.user.id}`);
    //客户端接收消息
    this.ws.onmessage=event=>{
        let message=JSON.parse(event.data);
        onMessage&&onMessage(message) //接收消息触发回调
    }

    //出错
    this.ws.onerror=error=>{
        onError&&onError(error)
    }
    this.ws.onclose = () => {
      this.ws = null;
    };
  },
  send(msgObj){ //发送消息的时候
    this.ws.send(JSON.stringify(msgObj))
  }
};

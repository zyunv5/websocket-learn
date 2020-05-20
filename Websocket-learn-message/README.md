# websocket+vue+mongoDB 聊天室项目
1. 现在项目不能运行，线上的mongo数据库不存在了
2. token的相关，在App.vue里面获取token，并存在storage中
3. client/http.js 是axios的请求拦截器
4. client/socket.js是websocket的设置
5. 使用了vuex获取用户的登录
6. 聊天的相关逻辑在views/chatView 文件里面
7. router/api/user 有用到头像包 有使用jwt和密码加密

## 应该是习自VueCli3.x实战项目-显示聊天列表
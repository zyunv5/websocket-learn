<template>
  <div class="chat">
    <Header v-if="targetUser" :is-left="true" :title="targetUser.name" btn_icon="ellipsis-h"/>
    <div class="container">
      <div
        class="content_wrap"
        v-if="targetUser&&user"
        v-for="(item,index) in messageList"
        :key="index"
      >
        <div class="left_msg" v-if="item.source=='other'">
          <img :src="targetUser.avatar" alt>
          <span>{{item.msg}}</span>
        </div>

        <div class="right_msg" v-if="item.source=='self'">
          <span>{{item.msg}}</span>
          <img :src="user.avatar" alt>
        </div>
      </div>
    </div>
    <div class="footer_wrap">
      <input type="text" v-model="msgValue">
      <button :disabled="msgValue==''" @click="sendMessage">发送</button>
    </div>
  </div>
</template>
<script>
import Header from "../components/Header";
import WSocket from "../socket.js";
export default {
  data() {
    return {
      targetUser: null,
      msgValue: "",
      messageList: []
    };
  },
  components: {
    Header
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.targetUser = to.params.user;
      vm.getMessage();
    });
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    sendMessage() {
      const msgObj = {
        target: this.targetUser._id,
        current: this.user.id,
        msg: this.msgValue
      };

      WSocket.send(msgObj);

      //本地客户端显示
      this.messageList.push({
        msg: this.msgValue,
        source: "self"
      });

      //清空input
      this.msgValue = "";
    },
    saveMsg() {
      let msg = {
        target: {
          avatar: this.targetUser.avatar,
          name: this.targetUser.name,
          _id: this.targetUser._id
        },
        count: 0,
        message: this.messageList,
        user_id: this.user.id
      };
      this.$axios
        .post("/api/profile/addmsg", message)
        .then(res => console.log(res));
    },
    getMessage() {
      this.$axios(`/api/profile/msg/${this.user.id}`).then(res => {
        let result = res.data.filter(data => {
          return data.target._id == this.targetUser._id;
        });
        if (result.length > 0) {
          this.messageList = result[0].message;
        }
      });
    }
  },
  mounted() {
    WSocket.init(
      { user: this.user },
      message => {
        //收到消息后，将消息储存到数据中
        this.messageList.push({
          msg: message.msg,
          source: "other"
        });
        this.saveMsg();
      },
      error => {
        console.log(error);
      }
    );
  }
};
</script>
<style scoped>
.chat {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.container {
  width: 100%;
  height: calc(100%-100px);
  box-sizing: border-box;
  background-color: #f1f1f1;
  margin-top: 50px;
  padding: 8px;
  overflow-y: scroll;
}
.footer_wrap {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  border-top: 1px solid #d9d9d9;
  position: absolute;
  bottom: 0;
  padding: 8px;
  background-color: #fafafa;
}
.footer_wrap input {
  width: 70%;
  height: 30px;
  outline: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}
.footer_wrap button {
  width: 20%;
  height: 34px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  margin-left: 8px;
  outline: none;
  background-color: #f1f1f1;
}
.footer_wrap button[disabled] {
  background-color: #d9d9d9;
  cursor: not-allowed;
  pointer-events: none;
}

.left_msg span {
  background-color: #fff;
}
.right_msg span {
  background-color: #0fce0d;
}
</style>


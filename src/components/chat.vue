<template>
   1234324
</template>

<script>
import * as mqtt from "mqtt/dist/mqtt.min";
export default {
  name: "chat",
  components: {},

  data:()=>{
    return{
      client: {},
      mtopic:null,
    }
  },
  methods:{
    connect() {
      let options = {
        username: "guest",
        password: "guest",
        cleanSession : false,
        keepAlive:60,
        clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
        connectTimeout: 4000
      }

      this.client = mqtt.connect('ws://127.0.0.1:15675/mqtt',options);
      this.client.on("connect", (e)=>{
        console.log("成功连接服务器:",e);
        //订阅三个名叫'top/#', 'three/#'和'#'的主题
        this.client.subscribe(['top/#', 'three/#', '#'], { qos: 1 }, (err)=> {
          if (!err) {
            console.log("订阅成功");
            //向主题叫“pubtop”发布一则内容为'hello,this is a nice day!'的消息
            this.publish("pubtop", 'hello,this is a nice day!')
          } else {
            console.log('消息订阅失败！')
          }
        });
      });
      //重新连接
      this.reconnect()
      //是否已经断开连接
      this.mqttError()
      //监听获取信息
      this.getMessage()
    },
    publish(topic,message) {
      if (!this.client.connected) {
        console.log('客户端未连接')
        return
      }
      this.client.publish(topic,message,{qos: 1},(err) => {
        if(!err) {
          console.log('主题为'+topic+ "发布成功")
        }
      })
    },
    getMessage() {
      this.client.on("message", (topic, message) => {
        if(message) {
          console.log('收到来着',topic,'的信息',message.toString())
          const res = JSON.parse(message.toString())
          //console.log(res, 'res')
          switch(topic) {
            case 'top/#' :
              this.msg = res
              break;
            case 'three/#' :
              this.msg = res
              break;
            case 'three/#' :
              this.msg = res
              break;
            default:
              return
              this.msg = res
          }
          this.msg = message
        }
      });
    },
    mqttError() {
      this.client.on('error',(error) => {
        console.log('连接失败：',error)
        this.client.end()
      })
    },
    unsubscribe() {
      this.client.unsubscribe(this.mtopic, (error)=> {
        console.log('主题为'+ this.mtopic+'取消订阅成功',error)
      })
    },
    unconnect() {
      this.client.end()
      this.client = null
      console.log('服务器已断开连接！')
    },
    reconnect() {
      this.client.on('reconnect', (error) => {
        console.log('正在重连:', error)
      });
    },
  },
  beforeMount() {
    this.connect()
  }
}
</script>

<style scoped>

</style>
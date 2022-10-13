<template>
  23423
  <h1>{{title}}</h1>

  <h1>{{client}}</h1>

  <h1>{{listData}}</h1>
</template>

<script>

import Stomp from 'stompjs';
import { MQTT_SERVICE, MQTT_USERNAME, MQTT_PASSWORD,MQTT_topic } from '../utils/mqtt';

export default {
  name: "StompChat",
  data() {
    return {
      title:'測試信息',
      client: Stomp.client(MQTT_SERVICE),
      listData: [
      ]
    }
  },
  computed: {
    optionSetting() {
      return {
        step: 1, // 速度，值越大，速度越快
        hoverStop: true // 鼠標懸停效果，false爲關閉該效果
        // 　　　　　　　　　　singleHeight: 120,//單行停頓
        // 　　　　　　　　　　waitTime: 2500,//單行停頓的時間
      }
    }
  },
  created() {
    this.connect()// stomp連接mq
  },
  methods: {
    onConnected: function(frame) {
      // 訂閱頻道
      const topic = MQTT_topic
      this.client.subscribe(topic, this.responseCallback, this.onFailed)
    },
    onFailed: function(frame) {
      console.log('MQ Failed:' + frame)
    },
    responseCallback: function(frame) {
      // 接收消息處理
      console.log('MQ msg=>', frame.body)
      this.title=frame.body;
    },
    connect() {
      // 初始化mqtt客戶端，並連接mqtt服務
      const headers = {
        login: MQTT_USERNAME,
        password: MQTT_PASSWORD
      }
      this.client.connect(MQTT_USERNAME,MQTT_PASSWORD, this.onConnected, this.onFailed)
      // this.client.connect(MQTT_USERNAME,MQTT_PASSWORD, this.onConnected, this.onFailed)//   有的是不需要MQTT_host的，不需要的話，就不用傳這個參數
    }
  }
}
</script>

<style scoped>

</style>
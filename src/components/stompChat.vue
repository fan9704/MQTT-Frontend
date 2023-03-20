<template>
  <v-container>
    <v-row class="mb-6">
      <v-col cols="12">
        <h2>寵物視覺化資訊</h2>
        <p>You selected: {{ selectedPetType }}</p>
      </v-col>
    </v-row>
    <v-row class="mb-6">
      <v-col cols="6" xs="12" sm="12" md="6" lg="6" xl="6">
        <v-select
            v-model="selectPetType"
            label="選擇寵物種類"
            :items="petDictKeys"
        ></v-select>
      </v-col>
      <v-col cols="6" xs="12" sm="12" md="6" lg="6" xl="6">
        <v-select
            label="選擇寵物"
            :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
        ></v-select>
      </v-col>
    </v-row>
    <v-row class="mb-6" >
      <v-col cols="6" xs="12" sm="12" md="6" lg="6" xl="4">
        <div class="line-chart-container">
          <div class="line-chart" ref="barChart"></div>
        </div>
      </v-col>
      <v-col cols="6" xs="12" sm="12" md="6" lg="6" xl="4">
        <div class="line-chart-container">
          <div class="line-chart" ref="lineChart"></div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as echarts from 'echarts';
import * as mqtt from "mqtt/dist/mqtt.min";
import {reactive, ref, provide, onUnmounted, watch, onMounted} from 'vue';

const state = reactive({
  messages: [],
  client: null,
});

export default {
  name: 'MQTT',
  setup() {
    connect();
    subscribe();
    const lineChart = ref(null);
    const barChart = ref(null);
    let myLineChart = null;
    let myBarChart =null;
    const chartData = ref({
      xData: ['1', '2', '3', '4', '5', '6', '7'],
      yData: [100, 100, 100, 100, 100, 100, 100],
    });

    onMounted(() => {
      myLineChart = echarts.init(lineChart.value);
      myBarChart =echarts.init(barChart.value);
      updateChart();
    });

    onUnmounted(() => {
      if (myLineChart != null) {
        myLineChart.dispose();
        myLineChart = null;
      }
      if (myBarChart != null) {
        myBarChart.dispose();
        myBarChart = null;
      }
    });

    watch(chartData, () => {
      updateChart();
    });

    function updateChart() {
      const lineChartOption = {
        title: [
          {
            text: 'MQTT Temperature LineChart'
          }
        ],
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#89c5f9' // color at 0%
          }, {
            offset: 1, color: '#c9f2dc' // color at 100%
          }],
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: chartData.value.xData,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: chartData.value.yData,
            type: 'line',
          },
        ],
      };

      myLineChart.setOption(lineChartOption);
      const barChartOption = {
        title: [
          {
            text: 'MQTT Temperature BarChart'
          }
        ],
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#89c5f9' // color at 0%
          }, {
            offset: 1, color: '#c9f2dc' // color at 100%
          }],
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: chartData.value.xData,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: chartData.value.yData,
            type: 'bar',
          },
        ],
      };
      myBarChart.setOption(barChartOption);
    }

    function getRandomData() {
      return Math.floor(Math.random() * 200);
    }

    // setInterval(() => {
    //   const newData = {
    //     xData: [
    //       ...chartData.value.xData.slice(1),
    //       new Date().toLocaleTimeString(),
    //     ],
    //     yData: [...chartData.value.yData.slice(1), getRandomData()],
    //   };
    //   chartData.value = newData;
    // }, 1000);

    function connect() {
      const options = {
        username: 'guest',
        password: 'guest',
        port: 15675, // RabbitMQ Web MQTT port
      };

      const wss_protocol = (window.location.protocol == 'https:') ? 'wss://': 'ws://';
      let client = mqtt.connect(wss_protocol+'140.125.207.230/ws', options);

      client.on('connect', () => {
        console.log('Connected to MQTT broker');
      });

      // client.on('message', (topic, message) => {
      //   console.log(`Message arrived: ${message.toString()}`);
      //   state.messages.push(message.toString());
      // });

      client.on('message', (topic, message) => {
        const newData = {
          xData: [
            ...chartData.value.xData.slice(1),
            JSON.parse(message)["Time"],
          ],
          yData: [...chartData.value.yData.slice(1), JSON.parse(message)["Temperature"]],
        };
        chartData.value = newData;
        // console.log(`Message arrived: ${message.toString()}`);
        console.log(`Temperature arrived: ${JSON.parse(message)["Temperature"]}`);
        state.messages.push(message.toString());
      });

      state.client = client;
    }

    function publish(message) {
      const topic = 'temperature/';
      const payload = message;

      state.client.publish(topic, payload);
    }

    function subscribe() {
      const topic = 'weightTopic';

      state.client.subscribe(topic, (err) => {
        if (err) {
          console.log(`Failed to subscribe to ${topic}: ${err}`);
        } else {
          console.log(`Subscribed to ${topic}`);
        }
      });
    }
    return {
      lineChart,
      barChart,
      state,
      publish,
    };
  },
  data() {
    return {
      theme: 'light',
      selectPetType:null,
      petDict:{
        "貓":'cat',
        "狗":'dog',
        "老鼠":'mouse',
      },
      petDictKeys:["貓","狗","老鼠"],
    }
  },
  computed: {
    selectedPetType() {
      if (this.selectPetType) {
        return this.petDict[this.selectPetType];
      } else {
        return null;
      }
    }
  },
  methods(){

  },
  beforeCreate() {
    //Get All Animal
  }
};
</script>

<style>
.line-chart-container {
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.line-chart {
  width: 100%;
  height: 100%;
}
</style>
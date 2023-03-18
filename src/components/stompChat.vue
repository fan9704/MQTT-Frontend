<template>
  <div class="line-chart-container">
    <div class="line-chart" ref="lineChart"></div>
  </div>
<!--  <div>-->
<!--    <h1>Mqtt Message:</h1>-->
<!--    <p>{{ state.messages }}</p>-->
<!--  </div>-->

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
  name: 'App',
  setup() {
    connect();
    subscribe();
    const lineChart = ref(null);
    let myChart = null;
    const chartData = ref({
      xData: ['1', '2', '3', '4', '5', '6', '7'],
      yData: [100, 100, 100, 100, 100, 100, 100],
    });

    onMounted(() => {
      myChart = echarts.init(lineChart.value);
      updateChart();
    });

    onUnmounted(() => {
      if (myChart != null) {
        myChart.dispose();
        myChart = null;
      }
    });

    watch(chartData, () => {
      updateChart();
    });

    function updateChart() {
      const option = {
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

      myChart.setOption(option);
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

      let client = mqtt.connect('ws://140.125.207.230/ws', options);

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
            new Date().toLocaleTimeString(),
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
      const topic = 'weightTopic';
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
      state,
      publish,
    };
  },
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
  width: 80%;
  height: 80%;
}
</style>
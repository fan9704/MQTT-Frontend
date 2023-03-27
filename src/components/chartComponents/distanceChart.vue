<template>
  <div class="line-chart" ref="distanceChart"></div>
</template>

<script>
import * as echarts from 'echarts';
import * as mqtt from "mqtt/dist/mqtt.min";
import {reactive, ref, onUnmounted, watch, onMounted} from 'vue';

const state = reactive({
  messages: [],
  client: null,
});

export default {
  name: "distanceChart",
  setup() {
    connect();
    subscribe();
    const distanceChart = ref(null);
    let myLineChart = null;
    const chartData = ref({
      xData: ['1', '2', '3', '4', '5', '6', '7'],
      yData: [100, 100, 100, 100, 100, 100, 100],
    });

    onMounted(() => {
      myLineChart = echarts.init(distanceChart.value);
      updateChart();
    });

    onUnmounted(() => {
      if (myLineChart != null) {
        myLineChart.dispose();
        myLineChart = null;
      }
    });

    watch(chartData, () => {
      updateChart();
    });

    function updateChart() {
      const lineChartOption = {
        title: [
          {
            text: 'MQTT Distance LineChart'
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
    }

    function currentDateTime() {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day}-${hours}:${minutes}:${seconds}`;
    }
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


      client.on('message', (topic, message) => {
        const newData = {
          xData: [
            ...chartData.value.xData.slice(1),
            currentDateTime(),
          ],
          yData: [...chartData.value.yData.slice(1), JSON.parse(message)["Distance"]],
        };
        chartData.value = newData;
        console.log(`Distance arrived: ${JSON.parse(message)["Distance"]}`);
        state.messages.push(message.toString());
      });

      state.client = client;
    }

    function publish(message) {
      const topic = 'distance/';
      const payload = message;

      state.client.publish(topic, payload);
    }

    function subscribe() {
      const topic = 'distance/#';

      state.client.subscribe(topic, (err) => {
        if (err) {
          console.log(`Failed to subscribe to ${topic}: ${err}`);
        } else {
          console.log(`Subscribed to ${topic}`);
        }
      });
    }
    return {
      distanceChart,
      state,
      publish,
    };
  },
  data() {
    return {
      theme: 'light'
    }
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
  width: 100%;
  height: 100%;
}
</style>
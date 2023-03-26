<template>
  <v-container>
    <v-row class="mb-6" >
      <v-col cols="6" sm="12" md="6">
        <div class="line-chart-container">
          <div class="line-chart" ref="barChart"></div>
        </div>
      </v-col>
      <v-col cols="6" sm="12" md="6">
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
import {reactive, ref, onUnmounted, watch, onMounted} from 'vue';

const state = reactive({
  messages: [],
  client: null,
});

export default {
  name: "humidityChart",
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
            text: 'MQTT Humidity LineChart'
          }
        ],
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#e79556' // color at 0%
          }, {
            offset: 1, color: '#e79556' // color at 100%
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
            text: 'MQTT Humidity BarChart'
          }
        ],
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#e79556' // color at 0%
          }, {
            offset: 1, color: '#f6d2b8' // color at 100%
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
          yData: [...chartData.value.yData.slice(1), JSON.parse(message)["Humidity"]],
        };
        chartData.value = newData;
        // console.log(`Message arrived: ${message.toString()}`);
        console.log(`Humidity arrived: ${JSON.parse(message)["Humidity"]}`);
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
      const topic = 'temperature/#';

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

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
            v-model="selectPet"
            label="選擇寵物"
            :items="petList"
        ></v-select>
      </v-col>
    </v-row>
    <!--Chart-->
    <v-row class="mb-6" >
      <v-col cols="6" xs="12" sm="12" md="6" lg="6" xl="6">
        <div class="line-chart-container">
          <StorePetTypeChart></StorePetTypeChart>
        </div>
      </v-col>
      <v-col cols="6" xs="12" sm="12" md="6" lg="6" xl="6">
        <div class="line-chart-container">
          <div class="line-chart" ref="barChart"></div>
        </div>
      </v-col>
      <v-col cols="6" xs="12" sm="12" md="6" lg="6" xl="6">
        <div class="line-chart-container">
          <div class="line-chart" ref="gaugeChart"></div>
        </div>
      </v-col>
      <v-col cols="6" xs="12" sm="12" md="6" lg="6" xl="6">
        <div class="line-chart-container">
          <DistanceChart></DistanceChart>
        </div>
      </v-col>
    </v-row>
    <v-row class="mb-6">
      <v-col cols="12">
         <HumidityChart></HumidityChart>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as echarts from 'echarts';
import * as mqtt from "mqtt/dist/mqtt.min";
import {reactive, ref, onUnmounted, watch, onMounted} from 'vue';
import HumidityChart from "./chartComponents/humidityChart.vue";
import DistanceChart from "./chartComponents/distanceChart.vue";
import StorePetTypeChart from "./chartComponents/storePetTypeChart.vue";


const state = reactive({
  messages: [],
  client: null,
});

export default {
  name: 'MQTT',
  setup() {
    connect();
    subscribe();
    const barChart = ref(null);
    const gaugeChart = ref(null);
    let myGaugeChart = null;
    let myBarChart =null;
    const chartData = ref({
      xData: ['1', '2', '3', '4', '5', '6', '7'],
      yData: [100, 100, 100, 100, 100, 100, 100],
      temperatureData:20
    });

    onMounted(() => {
      myBarChart =echarts.init(barChart.value);
      myGaugeChart =echarts.init(gaugeChart.value);
      updateChart();
    });

    onUnmounted(() => {
      if (myBarChart != null) {
        myBarChart.dispose();
        myBarChart = null;
      }
      if (myGaugeChart != null) {
        myGaugeChart.dispose();
        myGaugeChart = null;
      }
    });

    watch(chartData, () => {
      updateChart();
    });

    function updateChart() {
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
      const TempGaugeOption = {
        title:{
          text:"Temperature Gauge Chart"
        },
        series: [
          {
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: -20,
            max: 60,
            splitNumber: 10,
            itemStyle: {
              color: '#FFAB91'
            },
            progress: {
              show: true,
              width: 30
            },
            pointer: {
              show: false
            },
            axisLine: {
              lineStyle: {
                width: 30
              }
            },
            axisTick: {
              distance: -45,
              splitNumber: 5,
              lineStyle: {
                width: 2,
                color: '#999'
              }
            },
            splitLine: {
              distance: -52,
              length: 14,
              lineStyle: {
                width: 3,
                color: '#999'
              }
            },
            axisLabel: {
              distance: -20,
              color: '#999',
              fontSize: 20
            },
            anchor: {
              show: false
            },
            detail: {
              valueAnimation: true,
              width: '60%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 60,
              fontWeight: 'bolder',
              formatter: '{value} °C',
              color: 'inherit'
            },
            data: [
              {
                value: chartData.value.temperatureData
              }
            ]
          },
          {
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            itemStyle: {
              color: '#FD7347'
            },
            progress: {
              show: true,
              width: 8
            },
            pointer: {
              show: false
            },
            axisLine: {
              show: true
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true
            },
            axisLabel: {
              show: true
            },
            detail: {
              show: false
            },
            data: [
              {
                value: chartData.value.temperatureData
              }
            ]
          }
        ]
      };
      myGaugeChart.setOption(TempGaugeOption);
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

      const wss_protocol = (window.location.protocol == 'https:') ? 'wss://': 'ws://';
      let client = mqtt.connect(wss_protocol+'140.125.207.230/ws', options);

      client.on('connect', () => {
        console.log('Connected to MQTT broker');
      });

      client.on('message', (topic, message) => {
        const newData = {
          xData: [
            ...chartData.value.xData.slice(1),
            currentDateTime(),
          ],
          yData: [...chartData.value.yData.slice(1), JSON.parse(message)["Temperature"]],
          temperatureData:Math.round(JSON.parse(message)["Temperature"])
        };
        chartData.value = newData;
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
      gaugeChart,
      barChart,
      state,
      publish,
    };
  },
  data() {
    return {
      theme: 'light',
      selectPetType:null,
      selectPet:null,
      petDict:{
        "貓":'cat',
        "狗":'dog',
        "老鼠":'mouse',
        "其他":'other'
      },
      petDictKeys:["貓","狗","老鼠","其他"],
      petList:[],
    }
  },
  computed: {
    selectedPetType() {
      if (this.selectPetType) {
        this.axios
            .get(`/api/pet/list/${this.petDict[this.selectPetType]}/`)
            .then((res) => {
              console.log(res)
              let tempList = []
              res.data.forEach(function(jsonObj) {
                tempList.push(jsonObj["name"]);
              });
              this.petList= tempList;
            })
            .catch((err) => console.log(err));
        return this.petDict[this.selectPetType];
      } else {
        return null;
      }
    },
    selectedPet(){
      if (this.selectPet) {
        return this.selectPet;
      } else {
        return null;
      }
    }
  },
  components:{
    DistanceChart,
    HumidityChart,
    StorePetTypeChart
  },
  methods:{
    // getPetByPetType() {
    //   if(this.selectPetType!==null){
    //     console.log(`Type: ${this.selectPetType}`)
    //     this.axios.get(`/api/pet/list/${this.selectPetType}/`)
    //         .then((res)=>{
    //           this.petList = res.data;
    //         })
    //         .catch((err)=>console.log(err));
    //   }
    // }
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
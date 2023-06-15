<template>
  <div class="line-chart" ref="pieChart"></div>
</template>

<script>
import * as echarts from 'echarts';
import {reactive, ref, onUnmounted, watch, onMounted, onBeforeMount} from 'vue';
import axios from 'axios';
const state = reactive({
  client: null,
});

export default {
  name: "storePetTypeChart",
  setup() {
    const pieChart = ref(null);
    let myPieChart =null;
    const chartData = ref(
      [{ value: 1048, name: 'Search Engine' },
      { value: 735, name: 'Direct' },
      { value: 580, name: 'Email' },
      { value: 484, name: 'Union Ads' },
      { value: 300, name: 'Video Ads' }]
    );
    onBeforeMount(()=>{

    });
    onMounted(async () => {
      const res = await axios.get(`/api/pet/count/petType`)
          .then(({data})=>{
            const v = []
            for (const pet in data) {
              v.push({value:data[pet],name:pet})
            }
              chartData.value=v ;
            myPieChart = echarts.init(pieChart.value);
            updateChart();
          })
          .catch((err)=>{console.log(err)})

    });

    onUnmounted(() => {
      if (myPieChart != null) {
        myPieChart.dispose();
        myPieChart = null;
      }
    });

    watch(chartData, () => {
      // updateChart();
    });

    function updateChart() {
      const pieChartOption = {
        title:{
          text: "寵物店內寵物種類占比圖",
          left: "left",
          textStyle: {
            color: "#333",
            fontSize: 20,
          },
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        color:[
            '#f6d2b8',
            '#fabf06',
            '#ffac6f',
            '#f3a065',
        ],
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: true
            },
            data: chartData.value

          }
        ],
      };
      myPieChart.setOption(pieChartOption);
    }
    return {
      pieChart,
      state,
    };
  },
  data() {
    return {
      theme: 'light'
    }
  },
  beforeMount() {

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

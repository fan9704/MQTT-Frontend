<template>
  <v-container>
    <v-card class="mx-auto" max-width="344" v-for="machine in allMachineList" :key="machine.id" data-aos="fade-left">
      <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
          cover
      ></v-img>
      <v-card-title>
        裝置名稱: {{machine.name}}
      </v-card-title>
      <v-card-subtitle>
        裝置狀態:{{machine.onlineStatus}}
      </v-card-subtitle>
      <v-card-actions>
        <v-btn
            color="orange-lighten-2"
            variant="text"
        >
          Explore
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
            :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            @click="show = !show"
        ></v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-card-text>
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </v-container>
</template>

<script>
import {onMounted, onUnmounted, reactive, ref, watch} from "vue";
import * as mqtt from "mqtt/dist/mqtt.min";
const state = reactive({
  messages: [],
  client: null,
});

export default {
  name: "PetManagement",
  setup() {
    connect();
    subscribe();
    const machineList = ref([])

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
        if(!JSON.parse(message)["machineID"] in machineList.value && JSON.parse(message)["onlineStatus"]){
          machineList.value += JSON.parse(message)["machineID"]
        }
        console.log(`Machine:${JSON.parse(message)["machineID"]} Status:${JSON.parse(message)["onlineStatus"]}`);
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
      const topic = 'machine/status/#';

      state.client.subscribe(topic, (err) => {
        if (err) {
          console.log(`Failed to subscribe to ${topic}: ${err}`);
        } else {
          console.log(`Subscribed to ${topic}`);
        }
      });
    }
    return {
      state,
      publish,
    };
  },
  data: () => ({
    show: false,
    allMachineList:[]
  }),
  beforeMount() {
    //TODO: Get ALL Machine
    this.axios
        .get(`/api/machine/list/`)
        .then((res) => {
          this.allMachineList= res.data;
        })
        .catch((err) => console.log(err));
  }
}
</script>

<style scoped>

</style>
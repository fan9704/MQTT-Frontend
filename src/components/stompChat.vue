<template>
  <div>
    <h1>Mqtt Message:</h1>
    <p>{{ state.messages }}</p>
  </div>

</template>

<script>
import * as mqtt from "mqtt/dist/mqtt.min";
import { reactive } from 'vue';

const state = reactive({
  messages: [],
  client: null,
});
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
    console.log(`Message arrived: ${message.toString()}`);
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

export default {
  name: 'App',
  setup() {
    connect();
    subscribe();

    return {
      state,
      publish,
    };
  },
};
</script>
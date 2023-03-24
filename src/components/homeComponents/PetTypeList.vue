<template>
  <v-card
      class="mx-auto"
  >
    <v-container>
      <v-row dense class="justify-center">
        <v-col
            v-for="card in cards"
            :key="card.title"
            :cols="card.flex"
            xs="10" sm="10" md="6" lg="8" xl="8"
            data-aos="fade-left"
        >
          <v-card :to= card.route>
            <v-img
                :src="card.src"
                class="align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
                cover
            >
              <v-card-title class="text-white" v-text="card.title"></v-card-title>
            </v-img>

<!--            <v-card-actions>-->
<!--              <v-spacer></v-spacer>-->

<!--              <v-btn size="small" color="surface-variant" variant="text" icon="mdi-heart"></v-btn>-->
<!--              <v-btn size="small" color="surface-variant" variant="text" icon="mdi-bookmark"></v-btn>-->
<!--              <v-btn size="small" color="surface-variant" variant="text" icon="mdi-share-variant"></v-btn>-->
<!--            </v-card-actions>-->
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "PetList",
  data: () => ({
    cards: [
      { title: '狗', src: 'https://lh3.googleusercontent.com/wMc33Xx61RERog93zX4cRtHtvvp36I3CU3DlhJjpfVfDffIpRZBDDxqMlrPy0R1VUtvUdW6WWm1cprn-GkZBHOWU=w640-h400-e365-rj-sc0x00ffffff', flex: 12,route:{ path: '/pet/dog'  } },
      { title: '貓', src: 'https://c4.wallpaperflare.com/wallpaper/101/380/61/cat-animals-bokeh-cute-wallpaper-preview.jpg', flex: 12 ,route:{ path: '/pet/cat'  }},
      { title: '鼠', src: 'https://wallpaperaccess.com/full/6229261.jpg  ', flex: 12 ,route:{ path: '/pet/mouse'  }},
      { title: '其他', src: 'https://w0.peakpx.com/wallpaper/397/847/HD-wallpaper-bunny-cute-bunny-animals-cute.jpg', flex: 12,route:{ path: '/pet/other'  } },
    ],
  }),
}
</script>

<style scoped>

</style>
<template>
  <v-container>
    <v-row>
      <v-col
          cols="12"
          xs="12" sm="12" md="6" lg="6" xl="6"
      >
        <h2>所有寵物{{ $route.params.petType }}</h2>
      </v-col>
      <v-col
          cols="12"
          xs="12" sm="12" md="6" lg="6" xl="6"
      >
        <v-select
            v-model="selectPetType"
            label="選擇寵物種類"
            :items="petDictKeys"
        ></v-select>
      </v-col>
    </v-row>
    <!--PetList-->
    <v-row class="justify-center" v-for="pet in petList" :key="pet.id" data-aos="fade-left">
      <v-col
          cols="6"
          xs="10" sm="10" md="6" lg="8" xl="8"
      >
        <v-card class="mx-auto">
          <v-card-text>
            <div>寵物編號:{{ pet.id }}</div>
            <p class="text-h4 text--primary">
              {{pet.name}}
            </p>
            <p>生日:{{pet.birthday}}</p>
            <div class="text--primary">
                {{pet.content}}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
                variant="text"
                color="teal-accent-4"
                @click="reveal = true"
            >
              詳細資料
            </v-btn>
            <v-btn
                variant="text"
                color="teal-accent-4"
                @click="editFormPage(pet.id)"
            >
              編輯資料
            </v-btn>
          </v-card-actions>
          <v-expand-transition>
            <v-card
                v-if="reveal"
                class="v-card--reveal"
                style="height: 100%;"
            >
              <v-card-text class="pb-0">
                <p class="text-h4 text--primary">
                  Origin
                </p>
                <p>late 16th century (as a noun denoting a place where alms were distributed): from medieval Latin eleemosynarius, from late Latin eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’ </p>
              </v-card-text>
              <v-card-actions class="pt-0">
                <v-btn
                    variant="text"
                    color="teal-accent-4"
                    @click="reveal = false"
                >
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-expand-transition>
        </v-card>

      </v-col>
    </v-row>
    <!--PetDialog Form-->
    <v-row justify="center">
      <v-dialog
          v-model="dialog"
          persistent
          width="1024"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">寵物資訊</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      label="寵物名字"
                      v-model="formPetName"
                      required
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      label="寵物照顧人"
                      hint="example of helper text only on focus"
                      v-model="formPetKeeper  "
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      label="寵物類型"
                      hint="example of persistent helper text"
                      persistent-hint
                      required
                      v-model="formPetType"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                >
                  <v-date-picker v-model="formPetBirthday" />
                </v-col>
                <v-col cols="12">
                  <v-textarea label="內容" v-model="formPetContent"></v-textarea>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue-darken-1"
                variant="text"
                @click="dialog = false"
            >
              Close
            </v-btn>
            <v-btn
                color="blue-darken-1"
                variant="text"
                @click="dialog = false"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PetList",
  data: () => ({
    selectPetType:null,
    petDict:{
      "貓":'cat',
      "狗":'dog',
      "老鼠":'mouse',
      "其他":'other'
    },
    petDictKeys:["貓","狗","老鼠","其他"],
    petList:[],
    reveal:false,
    //Form Data
    dialog: false,
    formPetId:null,
    formPetName:null,
    formPetType:null,
    formPetBirthday:null,
    formPetContent:null,
    formPetKeeper:null,
  }),
  methods:{
    editFormPage(petId){
      this.dialog = true;
      this.axios
          .get(`/api/pet/${petId}/`)
          .then((res) => {
            console.log(res.data)
            this.formPetId=res.data.id;
            this.formPetName=res.data.name;
            this.formPetKeeper=res.data.keeper;
            this.formPetBirthday = res.data.birthday;
            this.formPetContent = res.data.content;
            this.formPetType=res.data.type;
          })
          .catch((err) => console.log(err));
    }
  },
  beforeMount() {
    this.axios
        .get(`/api/pet/list/${this.$route.params.petType}/`)
        .then((res) => {
          this.petList= res.data;
        })
        .catch((err) => console.log(err));
  }
}
</script>

<style scoped>

</style>
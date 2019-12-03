<template>
  <div class="hello">
    <li v-for="result in results" :key="result.id">{{ result }}</li>
    
    <h1>{{ msg }}</h1>
     <input type='text' name='address' v-model='text'>
    <br>
    <button @click='post'>click me</button>

  </div>
</template>

<script>
import Methods from "@/api/methods";
import axios from "axios";

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      text: "",
      results: []
    };
  },
  methods: {
    // サーバーから返ってくる値をログに出力したいのでasyncとawaitを行う

    async post() {
      let element = { text: this.text };
      let response = await Methods.testPosting(element);
      // this.info = response.data.events;
      for (let responses of response.data.events) {
        let data = {
          from: responses.returnValues.from,
          to: responses.returnValues.to,
          value: responses.returnValues.value //web3.utils.fromWei(event.returnValues.value)
        };
        this.results.push(data);
      }
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <li v-for="result in results" :key="result.id">{{ result }}</li>
    <select v-model="selected">
      <option value="wss://mainnet.infura.io/ws">Mainnet</option>
       <option value="wss://ropsten.infura.io/ws">Ropsten</option>
      <option value="wss://kovan.infura.io/ws">Kovan</option>
      <option value="wss://rinkeby.infura.io/ws">Rinkeby</option>
      
    </select>
    
     <input type='text' name='address' v-model='text'>
    <br>
    <button @click='post'>click me</button>
     <button @click='post1'>click me</button>

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
      results: [],
      selected: ""
    };
  },
  methods: {
    // サーバーから返ってくる値をログに出力したいのでasyncとawaitを行う

    async post() {
      console.log("yy");
      let element = { text: this.text };
      let provider = { text: this.selected };

      let response = await Methods.testPosting(element, provider);
      console.log(response);
      // this.info = response.data.events;
      for (let responses of response.data.events) {
        let data = {
          from: responses.returnValues.from,
          to: responses.returnValues.to,
          value: responses.returnValues.value //web3.utils.fromWei(event.returnValues.value)
        };
        this.results.push(data);
      }
    },
    async post1() {
      let k = { text: this.selected };
      let element1 = { texttest: "jj" };
      let response = await Methods.testPosting1(element1, k);
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

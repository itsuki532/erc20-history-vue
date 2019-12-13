<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <select v-model="selected">
      <option value="wss://mainnet.infura.io/ws">Mainnet</option>
       <option value="wss://ropsten.infura.io/ws">Ropsten</option>
      <option value="wss://kovan.infura.io/ws">Kovan</option>
      <option value="wss://rinkeby.infura.io/ws">Rinkeby</option>
      
    </select>
    
    <div>
    
    
     Contract Address<input type='text' name='address' v-model='text'>
     </div>
     From<input type="text" placeholder="0" v-model="from">
     To<input type="text" placeholder="latest" v-model="to">
    <br>
    <button @click='post'>click me</button>

    <div>
      <li v-for="result in results" :key="result.id">{{ result }}</li>
    </div>


  </div>
</template>

<script>
import Methods from "@/api/methods";
import axios from "axios";

import Web3 from "web3";

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "ERC20 history",
      text: "",
      results: [],
      selected: "",
      from: "",
      to: ""
    };
  },
  methods: {
    // サーバーから返ってくる値をログに出力したいのでasyncとawaitを行う

    async post() {
      let element = { text: this.text };
      let provider = { text: this.selected };
      let from = { text: this.from };
      let to = { text: this.to };
      const web3 = new Web3(this.selected);
      console.log(web3.version);

      let response = await Methods.testPosting(element, provider, from, to);

      // this.info = response.data.events;
      for (let responses of response.data.events) {
        let data = {
          from: responses.returnValues.from,
          to: responses.returnValues.to,
          value: web3.utils.fromWei(responses.returnValues.value._hex)
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

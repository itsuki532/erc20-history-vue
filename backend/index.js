const express = require("express");
const bodyParser = require("body-parser");
// corsポリシーに抵触するため、その対策としてcorsを利用する
const cors = require("cors");
const Web3 = require("web3");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const ABI = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "from", type: "address" },
      { indexed: true, name: "to", type: "address" },
      { indexed: false, name: "value", type: "uint256" }
    ],
    name: "Transfer",
    type: "event"
  }
];

// const TOKEN_ADDRESS = "0xB26bBBb8b8b935a605b8b74949934302aAa27F90"; //トークンアドレス指定
const FROM_BLOCK = 0;
const TO_BLOCK = "latest";
// const PROVIDER = "wss://rinkeby.infura.io/ws";

app.post("/test1", (req, res) => {
  console.log(req.body);
  res.send({
    text: "help"
  });
});

app.post("/test", function(req, res) {
  console.log(req.body.test.text);
  const TOKEN_ADDRESS = req.body.address.text;
  const PROVIDER = req.body.test.text;
  const web3 = new Web3(PROVIDER);
  getTokenTransferHistory(ABI, TOKEN_ADDRESS, FROM_BLOCK, TO_BLOCK);
  async function getTokenTransferHistory(
    abi,
    tokenContractAddress,
    fromBlock,
    toBlock
  ) {
    const contract = new web3.eth.Contract(abi, tokenContractAddress);

    const events = await contract.getPastEvents("Transfer", {
      fromBlock: fromBlock,
      toBlock: toBlock
    });

    console.log(events);
    if (events) {
      for (let event of events) {
        data = {
          from: event.returnValues.from,
          to: event.returnValues.to,
          value: parseInt(event.returnValues.value) / 1000000000000000000 //web3.utils.fromWei(event.returnValues.value)
        };
        console.log(data);
      }
    }
    res.send({
      events
    });
  }
});

app.listen(process.env.PORT || 3000);

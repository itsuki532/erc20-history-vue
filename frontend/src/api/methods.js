import Api from "./index";

export default {
  testPosting(item, provider, fromblock, toblock) {
    return Api().post("/test", {
      address: item,
      test: provider,
      from: fromblock,
      to: toblock
    });
  }
  // 他の処理も追加可能
};

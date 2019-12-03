import Api from "./index";

export default {
  testPosting(item, provider) {
    return Api().post("/test", {
      address: item,
      test: provider
    });
  },
  // 他の処理も追加可能
  testPosting1(item, i) {
    return Api().post("/test1", {
      uu: item,
      ii: i
    });
  }
};

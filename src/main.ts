import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import store from "./store";
import router from "./router";

// 创建vue实例
const app = createApp(App);

// 挂载store
app.use(store);

// 挂载router
app.use(router);

// 挂载vue实例
app.mount("#app");

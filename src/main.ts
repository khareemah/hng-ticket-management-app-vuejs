import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./styles/globals.css"; // optional
import { Toaster } from "vue-sonner";
import "vue-sonner/style.css";

const app = createApp(App);

app.component("Toaster", Toaster);
app.use(router);
app.mount("#app");

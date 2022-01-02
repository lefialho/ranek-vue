import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Loading from './components/Loading'

const app = createApp(App);

app.component('Loading', Loading);

app.use(store).use(router).mount('#app');

app.config.globalProperties.$filters = { //Filtar para converter para R$ BRL
  currencyBR(valor) {
    valor = Number(valor);
    if (!isNaN(valor)) {
      return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      })
    } else {
      return ""
    }
  }
}


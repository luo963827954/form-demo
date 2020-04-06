import Vue from 'vue'
import App from './App.vue'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import BaseItem from './form/BaseItem'

Vue.use(ViewUI);
Vue.component(BaseItem.name, BaseItem)

new Vue({
  el: '#app',
  render: h => h(App)
})

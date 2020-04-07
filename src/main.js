import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import BaseItem from './form/BaseItem'
import Home from './Home'
import News from './News'

const router = new VueRouter({
  routes:[
    {'path':'/n',component:News},
    {'path':'/h',component:Home},
  ]
})


Vue.use(ViewUI);
Vue.use(VueRouter);
Vue.component(BaseItem.name, BaseItem)


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

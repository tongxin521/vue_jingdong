import Vue from 'vue'
import axios from 'axios'
axios.defaults.baseURL = 'http://api.imooc.hybrid.lgdsunday.club/'
Vue.prototype.$http = axios

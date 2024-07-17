import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import uView from '@/uni_modules/uview-ui'
import request from '@/api/requests.js'

Vue.config.productionTip = false
Vue.prototype.$request = request

App.mpType = 'app'
Vue.use(uView)
const app = new Vue({
	...App
})
app.$mount()
// #endif 

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
import Vue from 'vue'
import App from './App'
import plugins from './plugins' // plugins
import './permission' // permission

// uView 整库注入(已在 uni_modules/uview-ui/index.js 移除 http/luch-request 大件, 其余完整保留)
// 全项目 uview 组件运行时依赖完整 uni.$u(throttle/debounce/route/color 等), 不能过度精简
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

// tm-vuetify 需保留整库 Vue.use —— 其全局 mixin 注入到所有页面 onShow/created（依赖 $tm.vx/$store），无法安全拆分
import tmVuetify from "./tm-vuetify";
Vue.use(tmVuetify)

// 全局 mixins
import Mixin from '@/polyfill/mixins';
Vue.mixin(Mixin);

import DictData from '@/common/dict/init'
import DictTag from '@/common/dict/DictTag'
import { hasRole, hasPerimission } from '@/common/auth.js'
import { toast, showConfirm } from "@/common/common.js"
import dictFind from "@/common/dict/dictFind.js"
import preventClick from "./utils/preventClick.js"
Vue.component('DictTag', DictTag)
Vue.prototype.toast = toast
Vue.prototype.dictFind = dictFind
Vue.prototype.showConfirm = showConfirm
Vue.prototype.hasRole = hasRole
Vue.prototype.hasPerimission = hasPerimission
DictData.install()

Vue.use(plugins)
Vue.use(preventClick)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})

app.$mount()
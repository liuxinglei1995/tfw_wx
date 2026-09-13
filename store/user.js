import config from '@/config'
import storage from '@/utils/storage'
import constant from '@/utils/constant'
import { login, logout, getInfo,wxlogin,dylogin } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import {getUserProfile} from '@/api/system/user.js'
const baseUrl = config.baseUrl

const user = {
  state: {
    token: getToken(),
    name: storage.get(constant.name),
    avatar: storage.get(constant.avatar),
    roles: storage.get(constant.roles),
    permissions: storage.get(constant.permissions),
	userdata: storage.get(constant.userdata),
	statusBar: storage.get(constant.statusBar),
	customBar: storage.get(constant.customBar),
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
      storage.set(constant.name, name)
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
      storage.set(constant.avatar, avatar)
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
      storage.set(constant.roles, roles)
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
      storage.set(constant.permissions, permissions)
    },
	SET_USERDATA: (state, userdata) => {
	  state.userdata = userdata
	  storage.set(constant.userdata, userdata)
	},
	SET_STATUS_BAR(state,statusBar){
		state.statusBar = statusBar;
		storage.set(constant.statusBar, statusBar)
	},

  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      const code = userInfo.code
      const uuid = userInfo.uuid
      return new Promise((resolve, reject) => {
        login(username, password, code, uuid).then(res => {
          setToken(res.token)
          commit('SET_TOKEN', res.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // wx登录
    wxLogin({ commit }, userInfo) {
      const code = userInfo.code
      const encryptedIv = userInfo.encryptedIv
      const encryptedData = userInfo.encryptedData
      return new Promise((resolve, reject) => {
        wxlogin(code, encryptedIv, encryptedData).then(res => {
          setToken(res.token)
          commit('SET_TOKEN', res.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
	// dy登录
	dyLogin({ commit }, userInfo) {
	console.log("11111111111111111111111111111111");
	  const code = userInfo.code
	  const anonymousCode = userInfo.anonymousCode1
	  const isLogin = userInfo.isLogin
	  return new Promise((resolve, reject) => {
	    dylogin(code, anonymousCode, isLogin).then(res => {
	      setToken(res.token)
	      commit('SET_TOKEN', res.token)
	      resolve()
	    }).catch(error => {
	      reject(error)
	    })
	  })
	},
	
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          const user = res.user
          const avatar = (user == null || user.avatar == "" || user.avatar == null) ? "" :  user.avatar
          const username = (user == null || user.userName == "" || user.userName == null) ? "" : user.userName
          if (res.roles && res.roles.length > 0) {
            commit('SET_ROLES', res.roles)
            commit('SET_PERMISSIONS', res.permissions)
          } else {
            commit('SET_ROLES', ['ROLE_DEFAULT'])
          }
          commit('SET_NAME', username)
          commit('SET_AVATAR', avatar)
		  commit('SET_USERDATA', user)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取最新用户信息
    UserProfile({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserProfile().then(res => {
			console.log(res,"222222222222");
          const user = res.data
          const avatar = (user == null || user.avatar == "" || user.avatar == null) ? "" :  user.avatar
          const username = (user == null || user.userName == "" || user.userName == null) ? "" : user.userName
          if (res.roles && res.roles.length > 0) {
            commit('SET_ROLES', res.roles)
            commit('SET_PERMISSIONS', res.permissions)
          } else {
            commit('SET_ROLES', ['ROLE_DEFAULT'])
          }
          commit('SET_NAME', username)
          commit('SET_AVATAR', avatar)
		  commit('SET_USERDATA', user)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
		  commit('SET_USERDATA', [])
          removeToken()
          storage.clean()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user

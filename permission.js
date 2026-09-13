import {
	getToken
} from '@/utils/auth'


// 登录页面
const loginPage = "/pagesUser/login/login"

// 页面白名单
const whiteList = [
	'/pagesUser/login/login', '/pages/index/index', '/pagesUser/setting/index'
]
// 页面黑名单
const blacklist = [
	'/pagesTools/pages/xingn/publicyuyue/publicyuyue', '/pagesUser/shop/input/secondHousing',
	'/pagesTools/pages/contract/contract',  '/pagesUser/drafts/drafts', '/pagesUser/shop/input/input',
	'/pagesUser/publish/buy/buy', '/pagesUser/publish/sell/sell'
]

// // 检查地址白名单
// function checkWhite(url) {
//   const path = url.split('?')[0]
//   return whiteList.indexOf(path) !== -1
// }

// 检查地址黑名单
function blackWhite(url) {
	const path = url.split('?')[0]
	return blacklist.indexOf(path) !== -1
}

// 页面跳转验证拦截器
let list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"]
list.forEach(item => {
	uni.addInterceptor(item, {
		invoke(to) {
			if (getToken()) {
				if (to.url === loginPage) {
					uni.reLaunch({
						url: "/"
					})
				}
				return true
			} else {
				if (blackWhite(to.url)) {
					uni.showModal({
						title: '提示',
						content: '您当前未登录',
						confirmText: '去登陆',
						success: function(res) {
							if (res.confirm) {
								uni.reLaunch({
									url: loginPage
								})
							} else if (res.cancel) {
								return false
							}
						}
					});
					return false

				} else {
					return true
				}

			}
		},
		fail(err) {
			console.log(err)
		}
	})
})



// 页面白名单跳转验证拦截器
// let list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"]
// list.forEach(item => {
//   uni.addInterceptor(item, {
//     invoke(to) {
//       if (getToken()) {
//         if (to.url === loginPage) {
//           uni.reLaunch({ url: "/" })
//         }
//         return true
//       } else {
//         if (checkWhite(to.url)) {
//           return true
//         }
//         uni.reLaunch({ url: loginPage })
//         return false
//       }
//     },
//     fail(err) {
//       console.log(err)
//     }
//   })
// })

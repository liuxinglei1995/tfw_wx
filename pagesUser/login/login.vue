<template>
	<view class="content">
		<tm-menubars title="登录" iconColor="white" :showback="true"></tm-menubars>
		<view class="bg-color-1">
		</view>
		<view class="bg-color-2">
		</view>
		<view class="bg-color-3">
		</view>
		<view class="top-icon-box">
			<view class="icon-image-box">
				<image src="/static/logo.png" />
			</view>
			<view class="lgoin-title">
				天府网
			</view>
		</view>

		<!-- #ifdef APP -->
		<view class="login-form">
			<view class="group-line">
				<view class="input-name">
					<span class="icon">
						<image class="image" src="/static/login/login/mobile.png" />
					</span>
					<span class="name">账号</span>
				</view>
				<view class="input-box">
					<input v-model="loginForm.username" type="text" placeholder="请输入账号" />
				</view>
			</view>
			<view class="group-line" v-if=" config.loginType == 1 || config.formType == 2 ">
				<view class="input-name">
					<span class="icon">
						<image class="image" src="/static/login/login/password.png" />
					</span>
					<span class="name">密码</span>
				</view>
				<view class="input-box">
					<input v-model="loginForm.password" type="text" placeholder="请输入密码"
						:password="isHidePassword ? true : false" />
				</view>
			</view>
			<view class="group-line" v-if=" config.loginType ==2  || config.formType == 2 ">
				<view class="input-name">
					<span class="icon">
						<image class="image" src="/static/login/login/vercode.png" />
					</span>
					<span class="name">验证码</span>
				</view>
				<view class="input-box">
					<input v-model="formData.verCode" type="text" placeholder="请输入验证码" />
					<view class="btn-send-box" id="sendMsmText" @click="sendSms()">
						{{currentSmsText}}
					</view>
				</view>
			</view>
			<view class="pass-word-login" @click="changeLoginForm()" v-if="config.formType ==1">
				{{config.loginType==2?'密码登录':'验证码登录/注册'}}
			</view>
			<view class="login-btn" @click="handleLogin()">
				{{config.loginType==1?'登录':'登录/注册'}}
			</view>
			<view class="login-bottom-footer">
				登录即代表您已阅读并同意<span>《用户协议》</span>与<span>《隐私政策》</span>
			</view>
		</view>
		<!-- #endif -->

		<!-- #ifdef MP-WEIXIN -->
		<view class="login-box">
			<view class="title-row">
			</view>
			<view class="other-title">
				<span>快捷登录</span>
			</view>
			<view class="other-flex" style="display: flex;flex-direction: column;margin-top: 90px;">
				<!-- #ifdef MP-WEIXIN -->
				<view class="other-flex-one" @click="wxLogin()">
					<!-- <image class="image" src="/static/login/login/wechat.png" /> -->
					快捷登录
				</view>
				<view class="other-flex-one" style="margin-top: 15px;" @click="close()">
					<!-- <image class="image" src="/static/login/login/wechat.png" /> -->
					取消
				</view>
				<!-- #endif -->
				<!-- #ifdef MP-TOUTIAO -->
				<view class="other-flex-one" @click="dyLogin()">
					抖音
				</view>
				<!-- #endif -->
			</view>

			<!-- 授权框 -->
			<tm-poup v-model="phonenumberflag" height="600" position="bottom">
				<view class="flex-col" style="text-align: center;">
					<view class="tip_title py-40">
						手机号未绑定
					</view>
					<view class="flex-center my-40">
						<tm-avatar :src="avatarUrl"></tm-avatar>
						<tm-icons class="mx-25" name="icon-arrow-right" color="grey"></tm-icons>
						<tm-avatar src="https://cdn.tianfucd.com/images/applet/logo.png"></tm-avatar>
					</view>
					<view class="tip_des">
						请同意将微信账户({{userName}})的手机号信息授权给天府网
					</view>
					<tm-button style="width: 80%;margin: 0 10%;margin-top: 80rpx;" plan open-type="getPhoneNumber"
						@getphonenumber="getPhoneNumber" theme="bg-gradient-orange-accent" :round="24"
						block>手机号快捷登录</tm-button>
				</view>
			</tm-poup>
		</view>
		<!-- #endif -->
	</view>

	<!-- 	<view class="input-item flex align-center" style="width: 60%;margin: 0px;" v-if="captchaEnabled">
				<view class="iconfont icon-code icon"></view>
				<input v-model="loginForm.code" type="number" class="input" placeholder="请输入验证码" maxlength="4" />
				<view class="login-code">
					<image :src="codeUrl" @click="getCode" class="login-code-img"></image>
				</view>
			</view> -->
	<!-- 	<view class="action-btn">
				<button @click="handleLogin" class="login-btn cu-btn block bg-blue lg round">登录</button>
			</view>
			<view class="reg text-center" v-if="register">
				<text class="text-grey1">没有账号？</text>
				<text @click="handleUserRegister" class="text-blue">立即注册</text>
			</view> -->
	<!-- 		<view class="xieyi text-center">
				<text class="text-grey1">登录即代表同意</text>
				<text @click="handleUserAgrement" class="text-blue">《用户协议》</text>
				<text @click="handlePrivacy" class="text-blue">《隐私协议》</text>
			</view> -->


</template>

<script>
	import {
		getCodeImg,
		dylogin,
		getPhoneNumberByCode
	} from '@/api/login'
	import tmButton from '@/pagesUser/tm-vuetify/components/tm-button/tm-button.vue';
	import tmPoup from '@/pagesUser/tm-vuetify/components/tm-poup/tm-poup.vue';
	import tmAvatar from '@/pagesUser/tm-vuetify/components/tm-avatar/tm-avatar.vue';
	import tmIcons from '@/pagesUser/tm-vuetify/components/tm-icons/tm-icons.vue';
	export default {
		components: {
			tmButton,
			tmPoup,
			tmAvatar,
			tmIcons
		},
		data() {
			return {
				phonenumberflag: false,
				codeUrl: "",
				captchaEnabled: true,
				// 用户注册开关
				register: false,
				globalConfig: getApp().globalData.config,
				loginForm: {
					username: "",
					password: "",
					rememberMe: false,
					code: "",
					uuid: ''
				},
				handleTimer: null, //倒计时 基本无用可忽略
				currentTimeout: 0, //当前计时时间
				currentSmsText: '获取验证码',
				config: {
					isDebug: true,
					timeout: 10, //验证码超时时间
					formType: 1, //表单类型
					loginType: 1, //登录类型
				},
				isHidePassword: true,
				captchaOnOff: false,
				userExtend2: '',
				formData: {
					mobile: '',
					verCode: '',
					password: ''
				},
				wxForm: {
					code: "",
					encryptedIv: "",
					encryptedData: ""
				},
			}
		},
		created() {
			this.getCode()
		},
		methods: {

			getPhoneNumber(e) { // 在bindgetphonenumber回调中获取code动态令牌
				if (e.detail.code) {
					console.log(e, "11111111111111111111");
					getPhoneNumberByCode({
						code: e.detail.code,
						userId: this.$store.state.user.userdata.userId
					}).then(res => {
						this.$tab.navigateBack();
					})
				} else {
					this.$store.dispatch("LogOut").then(res => {
						uni.showToast({
							icon: 'none',
							title: '手机号获取失败'
						})
					})
				}

			},
			//表单类型
			changeFormType(type) {
				this.config.formType = type;
			},
			changeLoginForm() {
				if (this.config.loginType == 1) {
					this.config.loginType = 2;
				} else {
					this.config.loginType = 1;
				}
			},
			sendSms() {
				if (this.currentTimeout > 0) {
					return false;
				}
				let reg = /^1[3456789]\d{9}$/
				if (!reg.test(this.formData.mobile)) {
					uni.showToast({
						title: '请填写正确的手机号',
						duration: 2000,
						icon: "none"
					});
					return;
				}

				this.currentTimeout = this.config.timeout;
				this.timerHandler();
			},
			timerHandler() {
				if (this.currentTimeout == 0) {
					this.currentSmsText = "获取验证码"; //重新获取验证码
					return;
				}
				this.currentSmsText = this.currentTimeout + "S后可重发";
				this.currentTimeout--;
				//
				let that = this;
				setTimeout(function() {
					that.timerHandler();
				}, 1000);

			},
			notPass() {
				uni.showToast({
					title: '功能暂未开放敬请期待',
					duration: 2000,
					icon: "none"
				});
			},

			isHidePasswordClick() {
				this.isHidePassword = !this.isHidePassword;
			},
			getCode() {
				getCodeImg().then(res => {
					this.captchaOnOff = res.captchaOnOff === undefined ? true : res.captchaOnOff;
					if (this.captchaOnOff) {
						this.codeUrl = 'data:image/gif;base64,' + res.img;
						this.loginForm.uuid = res.uuid;
					}
				});
			},

			//授权模态框
			wxGetUserProfile: function() {
				return new Promise((resolve, reject) => {
					wx.getUserProfile({
						lang: 'zh_CN',
						desc: '用户登录',
						success: (res) => {
							resolve(res)
						},
					})
				})
			}, //校验授权状态，正常授权后才能去登录
			getUserAuth() {
				// 获取用户的当前设置
				uni.getSetting({
					success(res) {
						// 判断是否拥有此权限，进行拉起授权和重新授权
						if (!res.authSetting['scope.userInfo']) {
							// 未授权此项权限 拉起授界面
							uni.authorize({
								scope: 'scope.userInfo',
								success() {
									// 授权成功
									dyLogin()
								},
								fail(err) {
									//拒绝授权
									uni.showToast({
										title: '拒绝授权将无法正常使用该应用',
										icon: 'none'
									});
									// 这里必须经过一个confirm 不然也会出现问题
									uni.showModal({
										title: '是否重新授权用户信息',
										success(res) {
											if (res.confirm) {
												uni.openSetting({
													success() {
														dyLogin()
														console.log('授权成功');
													},
													fail() {
														console.log('授权失败');
													}
												});
											} else if (res.cancel) {
												console.log('拒绝授权');
											}
										}
									});
								}
							});
						} else {
							// 使用已授权的功能
							dyLogin()
						}
					}
				})
			},
			// 抖音
			dyLogin() {
				uni.getProvider({
					service: 'oauth',
					success(res) {
						if (~res.provider.indexOf("toutiao")) {
							uni.login({
								provider: 'toutiao',
								success: function(loginRes) {
									console.log("loginRes", loginRes);
									dylogin(loginRes).then(dyRes => {
										console.log(dyRes);
									})
									// uni.getUserInfo({
									// 	success(UserInfoRes) {
									// 		console.log(UserInfoRes,"UserInfoRes");
									// 	}
									// })





									// this.$store.dispatch('user/dyLogin',loginRes).then(dyloginres=>{

									// })
									// uni.getUserInfo({
									// 	provider: 'toutiao',
									// 	success(res) {
									// 		console.log("getUserInfo = ", res)
									// 	},
									// 	fail(err) {
									// 		getUserAuth()
									// 		console.log("getUserInfo fail = ", err)
									// 	}
									// })
								}
							});
						}
					}
				})
			},
			// 微信登录
			async wxLogin() {
				// 获取服务供应商
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						if (~res.provider.indexOf("weixin")) {
							// uni微信登陆
							uni.login({
								provider: 'weixin',
								success: (loginRes) => {
									// this.wxGetUserProfile().then(res => {
									// 	console.log(res);
									// })
									// 获取用户信息
									uni.getUserInfo({
										success: (resInfo) => {
											this.wxForm.code = loginRes
												.code,
												this.wxForm
												.encryptedIv = resInfo
												.iv,
												this.wxForm
												.encryptedData =
												resInfo
												.encryptedData,
												this.$store.dispatch(
													'user/wxLogin',
													this.wxForm).then(
													() => {

														this.$store
															.dispatch(
																'user/GetInfo'
															)
															.then(
																res => {
																	let param = {
																		userExtend2: uni
																			.getStorageSync(
																				'cid'
																			)
																	};
																	if (this.$store
																		.state.user
																		.userdata
																		.phonenumber
																	) {
																		console
																			.log(
																				this
																				.$store
																				.state
																				.user
																				.userdata
																				.phonenumber,
																				"1111111111111111111111111111111111111"
																			);
																		this.$tab
																			.navigateBack();
																	} else {
																		console
																			.log(
																				this
																				.$store
																				.state
																				.user
																				.userdata
																				.phonenumber,
																				"2222222222222222222222222222222222222"
																			);
																		this.phonenumberflag =
																			true
																	}

																}
															);

													}).catch(() => {
													if (this
														.captchaEnabled
													) {
														this.getCode()
													}
												})

										}
									})
								}
							})
						}

					}
				})
			},
			//取消登录
			close() {
				uni.navigateBack()
			},
			// 用户注册
			handleUserRegister() {
				this.$tab.redirectTo(`/pages/register`)
			},
			// 隐私协议
			handlePrivacy() {
				let site = this.globalConfig.appInfo.agreements[0]
				this.$tab.navigateTo(`/pages/common/webview/index?title=${site.title}&url=${site.url}`)
			},
			// 用户协议
			handleUserAgrement() {
				let site = this.globalConfig.appInfo.agreements[1]
				this.$tab.navigateTo(`/pages/common/webview/index?title=${site.title}&url=${site.url}`)
			},
			// 获取图形验证码
			getCode() {
				getCodeImg().then(res => {
					this.captchaEnabled = res.captchaEnabled === undefined ? true : res
						.captchaEnabled
					if (this.captchaEnabled) {
						this.codeUrl = 'data:image/gif;base64,' + res.img
						this.loginForm.uuid = res.uuid
					}
				})
			},
			// 登录方法
			async handleLogin() {
				if (this.loginForm.username === "") {
					this.$modal.msgError("请输入您的账号")
				} else if (this.loginForm.password === "") {
					this.$modal.msgError("请输入您的密码")
				} else if (this.loginForm.code === "" && this.captchaEnabled) {
					this.$modal.msgError("请输入验证码")
				} else {
					this.$modal.loading("登录中，请耐心等待...")
					this.pwdLogin()
				}
			},
			// 密码登录
			async pwdLogin() {
				this.$store.dispatch('user/Login', this.loginForm).then(() => {
					this.$modal.closeLoading()
					this.loginSuccess()
				}).catch(() => {
					if (this.captchaEnabled) {
						this.getCode()
					}
				})
			},
			// 登录成功后，处理函数
			loginSuccess(result) {
				// 设置用户信息
				this.$store.dispatch('user/GetInfo').then(res => {
					this.$tab.navigateBack();
				})
			}
		}
	}
</script>

<style lang="scss">
	.other-flex {
		display: flex;
		justify-content: center;
		height: 80rpx;
		width: 80%;
		margin-left: 10%;
		margin-top: 60rpx;
		margin-bottom: 180rpx;
	}

	.other-flex .other-flex-one {
		// height: 80rpx;
		// width: 160rpx;
		// padding: 0rpx 30rpx;
		// cursor: pointer;
		border: none;
		color: #fff;
		background-image: linear-gradient(30deg, #0400ff, #4ce3f7);
		border-radius: 20px;
		background-size: 100% auto;
		font-family: inherit;
		font-size: 17px;
		padding: 0.6em 1.5em;
	}

	.other-flex .other-flex-one:hover {
		/**/
		background-position: right center;
		background-size: 200% auto;
		-webkit-animation: pulse 2s infinite;
	}


	.other-flex .other-flex-one image {
		width: 100%;
		height: 100%;
	}


	.other-title {
		position: relative;
		margin-top: 80rpx;
		font-size: 25rpx;
		text-align: center;
		width: 100%;
		height: 1px;
		border-radius: 1px;
		background-color: #eee;
	}

	.other-title span {
		position: absolute;
		color: #B0B7B7;
		background-color: #EFFDFF;
		display: block;
		z-index: 99;
		font-size: 25rpx;
		width: 300rpx;
		margin: auto;
		z-index: 9;
		margin-top: -13rpx;
		left: 50%;
		margin-left: -150rpx;
		border-radius: 20px;
	}

	.group-line .image {
		width: 100%;
		height: 100%;
	}

	/*底部*/
	.login-bottom-footer {
		// position: fixed;
		// bottom: 30rpx;
		font-size: 25rpx;
		width: 100%;
		text-align: center;
		padding: 10rpx 0rpx;
		color: #686B6C;
		z-index: 99;
	}

	.login-bottom-footer span {
		color: blue;
		cursor: pointer;
		color: #9CD8E8;
	}

	.pass-word-login {
		width: 100%;
		text-align: left;
		padding-left: 20rpx;
		font-size: 25rpx;
		cursor: pointer;
		color: #49BCEA;
	}

	.login-btn {
		width: 100%;
		height: 80rpx;
		background-color: #49BCEA;
		margin-top: 40rpx;
		color: #fff;
		line-height: 80rpx;
		text-align: center;
		border-radius: 80rpx;
		cursor: pointer;
	}

	.login-form {
		position: relative;
		background-color: #fff;
		margin-top: 40rpx;
		padding: 60rpx 40rpx;
		border-radius: 50rpx;
		min-height: 500rpx;
	}

	.group-line {
		width: 100%;
		padding: 10rpx;
		text-align: left;

	}

	.group-line .input-name {
		font-size: 25rpx;


	}

	.group-line .input-name .icon {
		float: left;
		width: 30rpx;
		height: 30rpx;
	}

	.group-line .input-name .name {
		margin-left: 20rpx;
		color: #4F5568;


	}

	.group-line .input-box {
		position: relative;
		margin-top: 20rpx;
		margin-bottom: 20rpx;

	}

	.group-line .input-box input {
		background-color: #F2FAFE;
		padding: 20rpx 60rpx;
		border-radius: 50rpx;
		color: #4F5568;

	}

	.group-line .input-box .btn-send-box {
		position: absolute;
		top: 50%;
		margin-top: -15rpx;
		right: 20rpx;
		width: 200rpx;
		font-size: 25rpx;
		font-weight: 600;
		text-align: center;
		cursor: pointer;
		color: #8AB4C0;
	}

	.group-line .input-box .btn-send-box::before {
		position: absolute;
		content: "";
		width: 3rpx;
		height: 25rpx;
		background-color: #8AB4C0;
		left: 0px;
		top: 3rpx;
		border-radius: 10rpx;
	}



	.login-box {
		position: absolute;
		top: 430rpx;
		text-align: center;
		width: 90%;
		margin-left: 5%;

	}

	.login-box .title-row {
		display: flex;
		justify-content: space-between;
		width: auto;

	}

	.login-box .title-row .title {
		width: 350rpx;
		text-align: center;
		font-size: 25rpx;
		color: #333;
		z-index: 10;
	}

	.login-box .title-row .active {
		color: #000;
		font-size: 30rpx;
		z-index: 10;

	}

	.login-box .title-row .active::before {
		content: "";
		width: 58rpx;
		height: 10rpx;
		background-color: #7AB9DD;
		position: absolute;
		top: 35rpx;
		border-radius: 30rpx;
		z-index: 0;
	}




	.top-icon-box {
		margin-top: 40rpx;
		display: block;
		width: 100%;
		text-align: center;

	}

	.top-icon-box .icon-image-box {
		position: relative;
		width: 160rpx;
		height: 160rpx;
		margin: auto;
		border-radius: 160rpx;
		overflow: hidden;

	}

	.top-icon-box .icon-image-box image {
		height: 100%;
		width: 100%;

	}

	.top-icon-box .lgoin-title {
		margin-top: 20rpx;
		font-size: 35rpx;
		color: #7AB9DD;
		font-weight: 600;

	}

	.btn-back {
		position: absolute;
		display: block;
		width: 100rpx;
		height: 100rpx;
		background-color: #fff;
		box-shadow: 0px 20px 60px rgba(55, 62, 125, 0.05);
		border-radius: 100%;
		left: 50rpx;
		top: 40rpx;
	}

	.btn-back image {
		width: 100%;
		height: 100%;
	}

	.bg-color-1 {
		position: absolute;
		left: -252rpx;
		top: -32rpx;
		width: 420rpx;
		height: 420rpx;
		background-color: #F4D5FF;
		filter: blur(80rpx);
	}

	.bg-color-2 {
		position: absolute;
		top: 0px;
		width: 284rpx;
		height: 284rpx;
		opacity: 1;
		background: rgba(255, 236, 213, 1);
		filter: blur(160rpx);
	}

	.bg-color-3 {
		position: absolute;
		left: 0px;
		top: 1030rpx;
		width: 462rpx;
		height: 462rpx;
		opacity: 1;
		background: rgba(255, 250, 235, 1);
		filter: blur(160rpx);
	}

	.content {
		position: relative;
		top: 0px;
		left: 0px;
		width: 100vw;
		max-width: 1400rpx;
		margin: auto;
		background-color: #EFFDFF;
		min-height: 100vh;
		overflow-y: auto;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
</style>
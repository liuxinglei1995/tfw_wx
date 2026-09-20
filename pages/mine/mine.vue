<template>
	<view style="background-color: #EEEEEE;">
		<view style="
		background: url(https://cdn.tianfucd.com/agent/userbg.png) no-repeat center top;
		background-repeat: no-repeat;
		background-size: 100% auto;
		padding: 0 44rpx;
		padding-bottom: 51rpx;
		">
			<view class="flex-start py-30" style="padding-top:160rpx">
				<view class="login">
					<image class="portrait" :src="userInfo.avatar"></image>
				</view>
				<!-- <u-button type="primary" @click="logOut">去登陆</u-button> -->
				<view class="info" style="background-color: unset !important;">
					<view class="nickname">
						<text v-if="userInfo.nickName!=null" @tap="openNickDialog">{{userInfo.nickName}}</text>
						<text v-else @tap="gologin()">去登录</text>
						<image @tap="rotate" :animation="animationData" class="circle"
							src="/static/static/assets/my/circle.png"></image>
					</view>
					<text v-if="userInfo.userType === '01'" class="phone">好房好教培，就上天府网</text>
					<view v-else-if="userInfo.userType === '00'" style="display: flex;flex-direction: column;justify-content: space-around;">
						<text class="phone">公司简称：{{userInfo.companyDept.deptName}}</text>
						<text class="phone">职位：{{userInfo.roles?userInfo.roles[0].roleName:"暂无职位"}}</text>
						<text class="phone">收费标准：卖方{{sell}}% 买方{{buy}}%</text>
						<text class="phone">电话号码：4008162019,{{userInfo.utel?userInfo.utel:"未录入分机号"}}</text>
					</view>

					<!-- <text v-if="userInfo.usertype == 2" class="phone">店铺位置：{{userInfo.company_name}}</text> -->
				</view>
			</view>
			<view @tap="toPath('/pagesUser/setting/index')" :style="'position: absolute;top:200rpx;right:54rpx'">
				<tm-badges :offset="[5,-5]"></tm-badges>
				<tm-icons @tap="rotate" size="38" name="icon-cog-fill" color="white"></tm-icons>
			</view>

		</view>
		<view class="mt--30 mb-3" v-if="hasRole(['common','jjr','guanjia','dianzhang','tfwadmin'])">
			<tm-listitem value="点击进入" label="我的店铺我做主" :label-inline="true" :round="[5,5,0,0]" :padding="[44,24]"
				:shadow="0" :url="'/pagesUser/shop/shop?userId='+userInfo.userId" value-color="orange"
				right-icon-color="orange" :border="false" :dense="true" title="云小店"></tm-listitem>
		</view>
		<view :class="[userInfo.usertype == 2 ? 'round-br-5 round-bl-5' : 'round-5 mt--30','white','py-20','px-36']">
			<view class="flex-end-left">
				<view v-if="hasPerimission(['system:house:add'])"
					@tap="toPath('/pagesUser/shop/input/input')" class="item">
					<image src="/static/static/img/user/fylr.png"></image>
					<text>房源录入</text>
				</view>
				<view v-if="hasPerimission(['tfw:lpxq:add'])"
					@tap="toPath('/pagesUser/addlpxq/input')" class="item">
					<image src="/static/static/img/user/xfrz.png"></image>
					<text>小区录入</text>
				</view>
				<view v-if="hasRole(['common','jjr','guanjia','dianzhang','tfwadmin'])"
					@tap="toPath('/pagesUser/drafts/drafts')" class="item">
					<image src="/static/static/img/user/cgx.png"></image>
					<text>草稿箱</text>
				</view>
				<view @tap="toPath('/pagesUser/collect/collect')" class="item">
					<image src="/static/static/img/user/lxsc.png"></image>
					<text>浏览/收藏</text>
				</view>
			</view>
			<view class="flex-end-left">
				<view @tap="toPath('/pagesTools/pages/contract/contract?type=0')" class="item">
					<image src="/static/static/img/user/ht.png"></image>
					<text>成交合同</text>
				</view>
				<view @tap="toPath('/pagesUser/subscribe/subscribe')" class="item">
					<image src="/static/static/img/user/wdyy.png"></image>
					<text>我的预约</text>
				</view>
				<view v-if="hasRole(['common','jjr','guanjia','dianzhang','tfwadmin'])"
					@tap="$tab.navigateTo('/pagesUser/task/task')" class="item">
					<image src="/static/static/img/user/sfjs.png"></image>
					<text>代办任务</text>
				</view>
				<view v-if="hasPerimission(['contract:process:list'])"
					@tap="toPath('/pagesTools/pages/contract/contract?type=1')" class="item">
					<image src="/static/static/img/user/ht.png"></image>
					<text>成交流程</text>
				</view>
			</view>
			<view class="flex-end-left">
				<view v-if="userInfo.userType === '00'"
					@tap="toPath('/pagesTools/pages/daily/index')" class="item">
					<image src="/static/static/img/user/ht.png"></image>
					<text>日报</text>
				</view>
				<!-- <view
					@tap="toPath('../moreSharing/moreSharing')" class="item">
					<image src="/static/static/img/user/ht.png"></image>
					<text>多房源分享</text>
				</view>
				<view
					@tap="toPath('/pagesHouse/manyHouseShare/index')" class="item">
					<image src="/static/static/img/user/ht.png"></image>
					<text>多房源分享2</text>
				</view> -->
			</view>
		</view>
		<view v-if="hasPerimission(['chockln:chockln:add'])"
			@tap="toPath('/pagesSignIn/pages/signIn/signIn')" class="mt-15 px-44 py-24 flex-between white round-5">
			<view style="font-size: 30rpx;color: #222222;font-weight: 400;">
				考勤
				<view style="display: flex;flex-direction: column;align-items: center;">
					<text style="color: #999999;font-size: 24rpx;margin-left: 15rpx;">上下班记得打卡哦~</text>
					<text style="color: #999999;font-size: 24rpx;margin-left: 15rpx;">打卡照片仅限于物业中心或门岗照片</text>
				</view>
			</view>
			<view style="font-size: 24rpx;" class="orange text border-orange-a-1 round-3 px-36 py-12">
				签到打卡
			</view>
		</view>

		<view class="white">
			<view class="sever mt-15 px-44 py-30">常用工具</view>
			<tm-row class="">
				<tm-col color="text-size-s" :grid="3">
					<view @tap="toPath('../../pagesTools/pages/calculator/index/index')" class="userSeverItem flex-col">
						<image src="/static/static/img/user/fdjs.png"></image>
						<view>房贷计算</view>
					</view>
				</tm-col>
				<tm-col color="text-size-s" :grid="3">
					<view @tap="toPath('../../pagesTools/onePages/pinggu')" class="userSeverItem flex-col">
						<image src="/static/static/img/user/esfpg.png"></image>
						<view>二手房评估</view>
					</view>
				</tm-col>
				<tm-col v-if="city == '成都'" color="text-size-s" :grid="3">
					<view @tap="toPath('../../pagesTools/pages/xingn/cjshuju/cjshuju')" class="userSeverItem flex-col">
						<image src="/static/static/img/user/cjsj.png"></image>
						<view>成交数据</view>
					</view>
				</tm-col>
				<tm-col color="text-size-s" :grid="3">
					<view @tap="toPath('/pagesTools/pages/zhaopin/zhaopin')" class="userSeverItem flex-col">
						<image src="/static/static/img/user/zp.png"></image>
						<view>招聘</view>
					</view>
				</tm-col>
				<tm-col color="text-size-s" :grid="3">
					<view @tap="toPath('../../pagesTools/onePages/ershoufangdaiban')" class="userSeverItem flex-col">
						<image src="/static/static/img/user/esfdb.png"></image>
						<view>二手房代办</view>
					</view>
				</tm-col>
				<tm-col v-if="city == '成都'" color="text-size-s" :grid="3">
					<view @tap="toPath('../../pagesTools/pages/aboutUs/aboutUs')" class="userSeverItem flex-col">
						<image src="/static/static/img/user/gjje.png"></image>
						<view>公积金额度</view>
					</view>
				</tm-col>
				<tm-col color="text-size-s" :grid="3">
					<view @tap="toPath('../../pagesTools/pages/calculator/taxes/taxes')" class="userSeverItem flex-col">
						<image src="/static/static/img/user/sfjs.png"></image>
						<view>税费计算</view>
					</view>
				</tm-col>
				<tm-col color="text-size-s" :grid="3">
					<view @tap="toPath('../../pagesTools/onePages/tianfuxinyong')" class="userSeverItem flex-col">
						<image src="/static/static/img/user/xycx.png"></image>
						<view>信用查询</view>
					</view>
				</tm-col>
				<tm-col color="text-size-s" :grid="3">
					<view @tap="toPath('../../pagesTools/pages/poster/poster')" class="userSeverItem flex-col">
						<image src="/static/static/img/user/hb.png"></image>
						<view>早报生成</view>
					</view>
				</tm-col>
				<tm-col color="text-size-s" :grid="3">
					<view @tap="toPath('wx71e9d6d9803e8acf', true)" class="userSeverItem flex-col">
						<image src="/static/static/img/user/fyzdj.png"></image>
						<view>物业业主端</view>
					</view>
				</tm-col>
			</tm-row>
		</view>
		<view class="white">
			<view class="sever mt-15 px-44 py-30">天府管家</view>
			<tm-row class="">
				<tm-col color="text-size-s" :grid="3">
					<view @tap="toPath('../../pagesTools/pages/aboutUs/newhouse')" class="userSeverItem flex-col">
						<image src="/static/static/img/user/xfrz.png"></image>
						<view>新房入驻</view>
					</view>
				</tm-col>
				<!-- <tm-col color="text-size-s" :grid="3">
					<view @tap="toPath('../../pagesUser/up/agent',false)" class="userSeverItem flex-col">
						<image src="/static/static/img/user/zjrz.png"></image>
						<text>中介入驻</text>
					</view>
				</tm-col> -->
				<!-- <tm-col color="text-size-s" :grid="3">
					<view @click="todkfw()" class="userSeverItem flex-col">
						<image src="/static/static/img/user/dkfw.png"></image>
						<text>贷款服务</text>
					</view>
				</tm-col> -->
				<tm-col color="text-size-s" :grid="3">
					<view @tap="toPath('../../pagesTools/pages/aboutUs/collaboration')" class="userSeverItem flex-col">
						<image src="/static/static/img/user/yyrz.png"></image>
						<view>异业入驻</view>
					</view>
				</tm-col>
				<tm-col color="text-size-s" :grid="3">
					<view @tap="toPath('../../pagesTools/pages/aboutUs/homeless')" class="userSeverItem flex-col">
						<image src="/static/static/img/user/jzfw.png"></image>
						<view>家政服务</view>
					</view>
				</tm-col>
				<tm-col color="text-size-s" :grid="3">
					<view @tap="toPath('../../pagesTools/pages/aboutUs/movehome')" class="userSeverItem flex-col">
						<image src="/static/static/img/user/bjfw.png"></image>
						<view>搬家服务</view>
					</view>
				</tm-col>
				<tm-col color="text-size-s" :grid="3">
					<view @tap="toPath('../../pagesTools/pages/aboutUs/aboutUs')" class="userSeverItem flex-col">
						<image src="/static/static/img/user/zxfw.png"></image>
						<view>装修服务</view>
					</view>
				</tm-col>
				<tm-col color="text-size-s" :grid="3">
					<view @tap="toPath('../../pagesTools/pages/aboutUs/taxaccounting')" class="userSeverItem flex-col">
						<image src="/static/static/img/user/csjz.png"></image>
						<view>财税记账</view>
					</view>
				</tm-col>
				<!-- <tm-col color="text-size-s" :grid="3">
					<view @tap="toPath('../../pagesUser/browse/browse')" class="userSeverItem flex-col">
						<image src="/static/static/img/user/csjz.png"></image>
						<view>浏览人员</view>
					</view>
				</tm-col> -->
			</tm-row>
		</view>

		<!-- 修改昵称弹窗：微信已不再返回用户昵称，只能用 type="nickname" 让用户主动填写 -->
		<view v-if="showNickDialog" class="nick-mask" @tap="closeNickDialog">
			<view class="nick-box" @tap.stop>
				<view class="nick-title">修改昵称</view>
				<input class="nick-input" type="nickname" v-model="nickInput" maxlength="20" placeholder="请输入昵称"
					placeholder-style="color:#bbbbbb" @blur="onNickBlur" />
				<view class="nick-tip">可点击键盘上方的"使用微信昵称"快捷填入</view>
				<view class="nick-btns">
					<view class="nick-btn nick-cancel" @tap="closeNickDialog">取消</view>
					<view class="nick-btn nick-ok" @tap="saveNickname">保存</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let App = getApp()
	import tmIcons from '@/tm-vuetify/components/tm-icons/tm-icons.vue';
	import tmCol from '@/tm-vuetify/components/tm-col/tm-col.vue';
	import tmListitem from '@/tm-vuetify/components/tm-listitem/tm-listitem.vue';
	import tmRow from '@/tm-vuetify/components/tm-row/tm-row.vue';
	import tmMenubars from '@/tm-vuetify/components/tm-menubars/tm-menubars.vue';
	import tmBadges from '@/tm-vuetify/components/tm-badges/tm-badges.vue';


	import {
		getInfo
	} from '@/api/login.js';
	import {
		getConfigKey
	} from '@/api/system/dict/data.js';
	import {
		updateUserProfile
	} from '@/api/system/user.js';

	export default {
		components: {
			tmIcons,
			tmCol,
			tmRow,
			tmListitem,
			tmMenubars,
			tmBadges
		},
		data() {
			return {
				userInfo: null,
				assetsUrl: App.globalData.assetsUrl,
				titleBarHeight: 0,
				CONFIG: [],
				animationData: {},
				isShow: [0, 0, 0],
				city: uni.getStorageSync('city'),
				sell: '',
				buy: '',
				showNickDialog: false,
				nickInput: ''
			};
		},

		props: {},
		onShow: function() {
			let that = this
			that.setData({
				city: uni.getStorageSync('city')
			})
			this.$store.dispatch('user/GetInfo').then(res => {

			})
			this.userInfo = this.$store.state.user.userdata
			console.log(this.userInfo.userType)
			console.log(this.userInfo.userType === '01')
			getConfigKey()
			getConfigKey("sell").then(response => {
				this.sell = response.msg;
			});
			getConfigKey("buy").then(response => {
				this.buy = response.msg;
			});
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function() {

		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {
			uni.setStatusBarStyle({
				style: 'light',
				success: () => {
					console.log('状态栏样式设置成功');
				},
				fail: (err) => {
					console.error('状态栏样式设置失败', err);
				}
			});
		},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			// 打开修改昵称弹窗（微信已不返回用户昵称，必须由用户主动填写一次）
			openNickDialog() {
				if (!this.userInfo || !this.userInfo.userId) {
					this.gologin()
					return
				}
				this.nickInput = this.userInfo.nickName || ''
				this.showNickDialog = true
			},
			closeNickDialog() {
				this.showNickDialog = false
			},
			// type="nickname" 的输入框在选用微信昵称后，通过 blur 回填
			onNickBlur(e) {
				const val = (e.detail && e.detail.value) || ''
				if (val) {
					this.nickInput = val
				}
			},
			// 保存昵称
			saveNickname() {
				const nickName = (this.nickInput || '').trim()
				if (!nickName) {
					this.$modal.msgError('请输入昵称')
					return
				}
				if (nickName === (this.userInfo.nickName || '')) {
					this.showNickDialog = false
					return
				}
				this.$modal.loading('保存中...')
				updateUserProfile({
					nickName
				}).then(() => {
					this.$modal.closeLoading()
					this.showNickDialog = false
					this.$modal.msgSuccess('昵称修改成功')
					// 刷新本地缓存的用户信息
					this.$store.dispatch('user/GetInfo').then(() => {
						this.userInfo = this.$store.state.user.userdata
					})
				}).catch(() => {
					this.$modal.closeLoading()
				})
			},
			todkfw(){
				wx.switchTab({
					url:"../dkfw/dkfw"
				})
			},
			/**
			 * 跳转页面
			 * @param {Object} path
			 */
			toPath: function(path, flag) {
				if(flag) {
					uni.navigateToMiniProgram({
						appId: path
					})
				} {
					uni.navigateTo({
						url: path
					})
				}
			},
			gologin() {
				uni.navigateTo({
					url: '/pagesUser/login/login'
				})
			},
			rotate() {
				let that = this
				var animation = uni.createAnimation({
					duration: 1000,
					timingFunction: "ease"
				});
				that.animation = animation;
				animation.rotate(760).step();
				that.setData({
					animationData: animation.export()
				});
				this.$store.dispatch('user/UserProfile').then(res => {
					setTimeout(() => {
						animation.rotate(0).step();
						that.setData({
							animationData: animation.export()
						});
					}, 1200);
				})

				// this.$store.dispatch(
				// 	'GetInfo').then(res => {
				// 	let param = {
				// 		userExtend2: uni.getStorageSync('cid')
				// 	};
				// 	updateUser(param).then(res => {
				// 		console.log(res, "66666");
				// 		uni.showToast({
				// 			title: "更新成功",
				// 			icon: "none"
				// 		});
				// 	});
				// })

			},

			getuserinfo() {
				uni.getSetting({
					success(res) {
						if (res.authSetting['scope.userInfo']) {
							uni.login({
								success(res) {
									uni.request({
										url: "",
										method: "POST",
										data: {
											code: res.code
										},
										success(res) {
											console.log(res); // 换取openId  然后换取获取token
										}
									});
								}

							});
						} else {
							uni.showToast({
								title: "授权失败",
								icon: "none"
							});
							uni.openSetting({
								success(res) {
									console.log(res);
								}
							});
						}
					}
				});
			},
			goto() {
				uni.navigateTo({
					url: "pages/home/homeWYue/homeWYue"
				});
			},

			phone() {
				uni.makePhoneCall({
					phoneNumber: "10086"
				});
			},

		}
	};
</script>

<style>
	.portrait {
		width: 146rpx;
		height: 146rpx;
		border-radius: 50%;
		margin-right: 26rpx;
	}

	.conten1 {
		display: none;
	}

	.circle {
		width: 40rpx;
		height: 40rpx;
		margin-left: 20rpx;
		box-shadow: 0rpx 0rpx 3rpx 3rpx #ccc;
		border-radius: 50%;
		transform: rotate(180deg);
	}

	.nickname {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.nickname text {
		font-size: 44rpx;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 0px;
	}

	.info {
		background-color: #fff !important;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.phone {
		font-size: 24rpx;
		font-weight: 400;
		color: #FFFFFF;
	}

	.middle {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin: 20rpx 0rpx 20rpx;
	}

	.item {
		width: 25%;
		display: flex;
		align-items: center;
		flex-direction: column;
		font-size: 22rpx;
		margin-bottom: 20rpx;
	}

	.item image {
		width: 80rpx;
		height: 80rpx;
		margin-bottom: 20rpx;
	}

	.sever {
		font-size: 36rpx;
		font-weight: 400;
	}

	.userSever {
		display: flex;
		width: 100%;
		margin: 40rpx 0rpx 60rpx;
		justify-content: space-between;
	}

	.userSeverItem image {
		width: 80rpx;
		height: 80rpx;
		margin-bottom: 10rpx;
	}

	.userSeverItem view {
		font-size: 22rpx;
		width: 100%;
		margin-bottom: 40rpx;
	}

	.footerTop {
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		font-size: 28rpx;
	}

	.footerTop image {
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
	}

	.footer1 {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		width: 320rpx;
		height: 100rpx;
		background-color: #f4f4f4;
		border-radius: 20rpx;
		padding: 20rpx 0rpx;
	}

	.footer {
		display: flex;
		justify-content: space-between;
		margin-top: 40rpx;
	}

	.info1 {
		font-size: 22rpx;
		color: #bababa;
	}

	.login {
		position: relative;
	}

	.login button {
		width: 100rpx !important;
		height: 100rpx !important;
		position: absolute;
		z-index: 10;
		top: 0rpx;
		opacity: 0;
	}

	/* 修改昵称弹窗 */
	.nick-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.45);
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nick-box {
		width: 600rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		padding: 40rpx 40rpx 30rpx;
		box-sizing: border-box;
	}

	.nick-title {
		font-size: 34rpx;
		font-weight: bold;
		color: #333333;
		text-align: center;
	}

	.nick-input {
		margin-top: 30rpx;
		height: 88rpx;
		background: #F5F6F7;
		border-radius: 12rpx;
		padding: 0 24rpx;
		box-sizing: border-box;
		font-size: 30rpx;
		color: #333333;
		text-align: left;
	}

	.nick-tip {
		margin-top: 16rpx;
		font-size: 24rpx;
		color: #999999;
	}

	.nick-btns {
		display: flex;
		margin-top: 36rpx;
	}

	.nick-btn {
		flex: 1;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 40rpx;
		font-size: 30rpx;
	}

	.nick-cancel {
		background: #F2F2F2;
		color: #666666;
		margin-right: 20rpx;
	}

	.nick-ok {
		background: #00aaff;
		color: #FFFFFF;
	}
</style>
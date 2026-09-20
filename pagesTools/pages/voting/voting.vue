<template>
	<view>
		<tm-menubars title="业主投票" iconColor="white" theme="black"  ></tm-menubars>
		<scroll-view class="container scroll-Y pb-n25" :style="windowHeight" :scroll-top="0" scroll-y="true">
			<view class="tit" :style="'height:'+($store.state.customBar-10)+'px;'"></view>
			
			<tm-form @submit="submit" ref="formData" @request="success" method="post">
				<view class="mx-n8 mt-n20 white pa-20 round-3">
					<view class="vot_user my-20">
						参与投票基本信息填写
					</view>
					<view class="dis">
						<view class="mx-32 my-12 border-b-1  pb-12">
							<tm-input name="owner" required title="产权人姓名" v-model="reqData.owner"></tm-input>
							<tm-input name="dong" required title="几栋" input-type="digit" v-model="reqData.dong" suffix="栋"></tm-input>
							<tm-input name="dy" required title="几单元" input-type="digit" v-model="reqData.dy" suffix="单元"></tm-input>
							<tm-input name="room_num" required title="房号" input-type="digit" v-model="reqData.room_num" suffix="号"></tm-input>
							<tm-input name="mj" required title="面积" input-type="digit" v-model="reqData.mj" suffix="㎡"></tm-input>
							<tm-input name="voters" required title="投票人" v-model="reqData.voters"></tm-input>
							<tm-input name="trustees" title="受托人" v-model="reqData.trustees"></tm-input>
						</view>
						<view class="py-12 px-24 mx-12 round-3 border-b-1 grey text">
							<text class="text-size-n text-weight-b ">产权图片</text>
							<text class="text-grey text-size-xs px-10">(最多可以上传1张)</text>
						</view>
						<view class="py-32 mx-12">
							<tm-upload color="grey"
								:url="'https://up-z2.qiniup.com?token='+reqData.upToken"
								:auto-upload="true"
								:filelist.sync="reqData.property" 
								@change="covUpSuccess"
								url-key="key"
								:max="1" 
								:grid="2"
							></tm-upload>
						</view>
						<view class="vot_user my-20" style="font-size: 24rpx;color: red;">
							注意：带 * 号为必填项，不带 * 号为可选项
						</view>
					</view>
				</view>
				
				<view class="mx-n8 my-20 white pa-20 round-3">
					<view class="vot_user my-20">
						1、投票“续、选、聘”物业公司 (必选)
					</view>
					<view class="dis">
						<view class="mx-32 my-12 border-b-1  pb-12 flex-between">
							<tm-groupradio  name="mode" @change="modechange">
								<tm-radio :name="item.title" v-for="(item,index) in mode" :key="index" v-model="item.checked" :label="item.title"></tm-radio>
							</tm-groupradio>
						</view>
					</view>
				</view>
				<view class="mx-n8 white pa-20 round-3">
					<view class="vot_user my-20">
						2、是否委托业委会审查后选聘物业公司合作合同以及相关工作衔接 (必选)
					</view>
					<view class="dis">
						<view class="mx-32 my-12 border-b-1  pb-12 flex-between">
							<tm-groupradio name="entrusted" @change="entrustedchange">
								<tm-radio :name="item.title" v-for="(item,index) in entrusted" :key="index" v-model="item.checked" :label="item.title"></tm-radio>
							</tm-groupradio>
						</view>
					</view>
				</view>
				
				<tm-button theme="bg-gradient-orange-accent" class="btn mt-20" navtie-type="form" >完成投票</tm-button>
			</tm-form>
		</scroll-view>
		<tm-poup v-model="bindPhone" height="600" position="bottom">
			<view class="flex-col" style="text-align: center;">
				<view class="tip_title py-40">
					手机号未绑定
				</view>
				<view class="flex-center my-40">
					<tm-avatar :src="assetsUrl+userInfo.avatar_file"></tm-avatar>
					<tm-icons class="mx-25" name="icon-arrow-right" color="grey"></tm-icons>
					<tm-avatar src="https://cdn.tianfucd.com/images/applet/logo.png"></tm-avatar>
				</view>
				
				<view class="tip_des">
					请同意将手机号信息授权给天府网
				</view>
				
				<tm-button 
				 style="width: 80%;margin: 0 10%;margin-top: 80rpx;"
				 plan 
				 open-type="getPhoneNumber" 
				 @getphonenumber="getPhoneNumber"
				 theme="bg-gradient-orange-accent" 
				 :round="24" 
				 block
				>授 权 获 取 手 机 号</tm-button>
			</view>
		</tm-poup>
	</view>
</template>
<script>
	let App = getApp()
	import tmForm from '@/pagesTools/tm-vuetify/components/tm-form/tm-form.vue';
	import tmGroupradio from '@/pagesTools/tm-vuetify/components/tm-groupradio/tm-groupradio.vue';
	import tmRadio from '@/pagesTools/tm-vuetify/components/tm-radio/tm-radio.vue';
	import tmButton from '@/pagesTools/tm-vuetify/components/tm-button/tm-button.vue';
	import tmInput from '@/pagesTools/tm-vuetify/components/tm-input/tm-input.vue';
	import tmPoup from '@/pagesTools/tm-vuetify/components/tm-poup/tm-poup.vue';
	import tmAvatar from '@/pagesTools/tm-vuetify/components/tm-avatar/tm-avatar.vue';
	import tmIcons from '@/pagesTools/tm-vuetify/components/tm-icons/tm-icons.vue';
	import tmUpload from '@/pagesTools/tm-vuetify/components/tm-upload/tm-upload.vue';
	
	let QQMapWS = require("@/js_sdk/skyrrrt-ws-jssdk/qqmap-ws-jssdk.js"); // 实例化API核心类
	// 实例化API核心类
	let qqmapsdk = new QQMapWS.default({
		key: 'XJTBZ-XW5K4-5KBU6-D37VL-LAHGF-RSBBI'
	});
	
	export default {
		data() {
			return {
				upToken:"",
				property:"",
				assetsUrl: App.globalData.assetsUrl,
				phone:"",
				bindPhone:false,
				windowHeight:null,
				userInfo:[],
				mode:[
					{title:'续聘现有物业'},
					{title:'选聘新物业'}
				],
				entrusted:[
					{title:'是'},
					{title:'否'}
				],
				address:"",
				reqData:{
					voters:'',
					owner:'',
					dong:'',
					dy:'',
					room_num:'',
					mj:'',
					mode:'',
					entrusted:'',
					property:[],
				}
			};
		},

		components: {tmForm,tmGroupradio,tmRadio,tmButton,tmInput,tmPoup,tmAvatar,tmIcons,tmUpload},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let that = this
			let info = uni.getSystemInfoSync();
			that.windowHeight = "height:"+(info.windowHeight)+'px;'
			
			that.$apis.userInfo().then(res => {
				that.userInfo = res
				if(res.mot == '' || res.mot == null){
					that.bindPhone = true
				}else{
					that.phone = res.mot?res.mot:""
				}
				that.$apis.getVoting().then(res => {
					that.setData({
						upToken:res.upToken,
						reqData:res
					})
				})
				that.dingwei()
			})
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			
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
			
			covUpSuccess(e){
				let that = this
				let file = ""
				for(var i = 0 ; i<e.length; i++){
					if(i != e.length-1) file = file + e[i]['key'] + ','
					else file = file + e[i]['key']
				}
				//type=cover
				that.property = file
			},
			/**
			* 微信小程序一键导入手机号登录
			* @param {Object} e
			*/
			getPhoneNumber(e) {
				var that = this;
				uni.showToast({
					icon:"loading",
					title:"绑定中"
				})
				var errMsg = e.detail.errMsg;
				var msg = errMsg.split(":");
				if (msg[1] != "ok") {
					return;
				}
				var encryptedData = e.detail.encryptedData;
				var iv = e.detail.iv;
				uni.login({
					success(res) {
						if (res.code) {
							that.$apis.telDecrypt({
								encryptedData: encryptedData,
								iv: iv,
								code: res.code
							}).then(res => {
								that.$apis.bindPhone({
									phone : res.phone
								}).then(res1 => {
									uni.showToast({
										title: '手机号绑定成功',
										icon: "none"
									});
									that.bindPhone = false
									that.setData({
										phone:res.phone
									})
								})
							})
						}
					}
				});
			},
			dingwei: function() {
				var that = this;
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						var latitude = res.latitude;
						var longitude = res.longitude;
						qqmapsdk.reverseGeocoder({
							location: {
								latitude: latitude,
								longitude: longitude
							},
							success: function(res) {
								that.address = res.result.address
							}
						});
					},
					fail: function(res) {
						
					}
				});
			},
			submit(e){
				//e为false表示校验未通过。否则为数据集合对象数据。
				let that = this
				if(that.phone == "" || that.phone == null){
					that.bindPhone = true
					return false;
				}else{
					e.phone = that.phone
				}
				if(e===false){
					uni.$tm.toast("请填写必填项。")
					return false;
				}
				if(e.mode.length > 0){
					e.mode = this.mode[e.mode[0].index].title
				}else{
					uni.showToast({
						icon:"none",
						title:"请投票“续、选、聘”物业公司"
					})
					return false;
				}
				if(e.entrusted.length > 0){
					e.entrusted = this.entrusted[e.entrusted[0].index].title
				}else{
					uni.showToast({
						icon:"none",
						title:"请投票是否委托业委会审查后选聘物业公司合作合同以及相关工作衔接"
					})
					return false;
				}
				if(that.property == ''){
					uni.showToast({
						icon:"none",
						title:"请上传产权证照片"
					})
					return false;
				}else{
					e.property = that.property
				}
				e.address = that.address
				that.$apis.voting(e).then(res => {
					uni.$tm.toast("提交成功")
					uni.switchTab({
						url: '/pages/index/index'
					});
				})
			},
			//当前使用自动验证提交数据到服务器时，提交后，会触发此request事件，下面 的e是服务器返回的数据。
			success(e){
				//提交成功 。
				uni.$tm.toast(e.msg)
			},
			modechange(e){
				if(e[0].index==0) {
					this.$set(this.reqData,"mode",true)
				}else{this.$set(this.reqData,"mode",false)}
			},
			entrustedchange(e){
				if(e[0].index==0) {
					this.$set(this.reqData,"entrusted",true)
				}else{this.$set(this.reqData,"entrusted",false)}
			},
		}
	};
</script>
<style>
	.container{
		width: 100%;
		background-image: url(https://cdn.tianfucd.com/images/applet/bg/voting/bg.png);
		background-size: 100% 100%;
	}
	.tit{
		text-align: center;
		font-size: 50rpx;
		font-weight: 400;
		color: #FFD324;
		text-shadow: -2rpx 2rpx 2rpx #210000;
	}
	.vot_user{
		font-size: 32rpx;
		font-family: Source Han Sans CN-Regular, Source Han Sans CN;
		font-weight: 400;
		color: #333;
		font-weight: 700;
	}
	.dis{
		font-size: 24rpx;
		font-family: Source Han Sans CN-Regular, Source Han Sans CN;
		font-weight: 400;
		color: #222222;
		line-height: 48rpx;
	}
	.btn{
		float: right;
		margin-right: 40rpx;
	}
	.tip_title{
		font-size: 40rpx;
		font-weight: bold;
	}
</style>

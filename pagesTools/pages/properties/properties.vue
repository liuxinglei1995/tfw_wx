<template>
	<view style="background-color: #F0F0F0;">
		<tm-message ref="toast"></tm-message>
		<view v-if="xq == ''" class="mx-20 py-20">
			<tm-skeleton v-for="(item,index) in 2" :key="index" color="white" model='cardActions'></tm-skeleton>
		</view>
		<view v-else class="">
			<view class="top" :style="{'padding-top':statusBar+'px'}">
				<view class="tit">
					访客登记
				</view>
				<view class="xq">
					{{xq}}
				</view>
			</view>
			<tm-sheet v-if="reqData.phone == '' || reqData.phone == null" :shadow="24" :padding="[12,24]" :margin="[30,20]">
				<view class="project_tit"><text class="text-red">*</text>到访类型</view>
				<tm-col v-for="(item,index) in typeList" :key="index" color="text-weight-b text-size-xs" :grid="4">
					<view class="flex-center">
						<button class="typeItem" @tap="selectType(item)" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" :class="reqData.type == item.title?'selected':''">
							<view class="box">
								<img :src="item.icon" style="width: 64rpx;height: 64rpx;">
								<view class="">
									{{item.title}}
								</view>
							</view>
						</button>
					</view>
				</tm-col>
			</tm-sheet>
			<tm-sheet v-else :shadow="24" :padding="[12,24]" :margin="[30,20]">
				<view class="project_tit"><text class="text-red">*</text>到访类型</view>
				<tm-col v-for="(item,index) in typeList" :key="index" color="text-weight-b text-size-xs" :grid="4">
					<view class="flex-center">
						<button class="typeItem" @tap="selectType(item)" :class="reqData.type == item.title?'selected':''">
							<view class="box">
								<img :src="item.icon" style="width: 64rpx;height: 64rpx;">
								<view class="">
									{{item.title}}
								</view>
							</view>
						</button>
					</view>
				</tm-col>
			</tm-sheet>
			<tm-form @submit="submit">
				<tm-sheet :shadow="24" :padding="[12,24]" :margin="[30,20]">
					<tm-input @click="show=true" disabled name="room_no" placeholder="请输入受访房号" required title="受访房号" v-model="reqData.room_no"></tm-input>
					<tm-input @click="show=false" name="name" required title="访客姓名" placeholder="请输入访客姓名" v-model="reqData.name"></tm-input>
					<tm-input @click="show=false" name="phone" required title="访客电话" placeholder="点击输入访客电话" v-model="reqData.phone" disabled=""></tm-input>
					<tm-keyborad model="house" :show.sync="show" v-model="reqData.room_no"></tm-keyborad>
					<view v-if="reqData.type == '中介看房' || reqData.type == '来客'" class="mx-32 my-12 border-b-1  pb-12 flex-between">
						<text style="font-size: 28rpx;">
							<text class="text-red">*</text>房屋状况
						</text>
						<tm-groupradio name="hose_type" @change="selectHouseType">
							<tm-radio :name="item.title" v-for="(item,index) in HouseType" :key="index" v-model="item.checked" :label="item.title"></tm-radio>
						</tm-groupradio>
					</view>
					<tm-input @click="show=false" name="remark" required title="到访事由" placeholder="请输入到访事由" v-model="reqData.remark"></tm-input>
					<!-- <tm-pickersCity  @confirm="setFrom" :default-value="area" btn-color="bg-gradient-deep-purple-accent">
						<tm-input name="from" disabled required title="从哪里来" placeholder="点击选择出发地" v-model="reqData.from"></tm-input>
					</tm-pickersCity> -->
					<!-- <tm-input name="from" @click="goMap" disabled required title="从哪里来" placeholder="点击选择出发地" v-model="reqData.from"></tm-input> -->
					<view class="px-24 mt-30">
						<tm-button navtie-type="form" theme="bg-gradient-blue-accent" block>提交信息</tm-button>
						<view class="py-32 text-size-s text-grey text-align-center">请注意资料的上传，必填项。</view>
					</view>
				</tm-sheet>
			</tm-form>
		</view>
	</view>
</template>
<script>
	let App = getApp()
	import tmKeyborad from '@/pagesTools/tm-vuetify/components/tm-keyborad/tm-keyborad.vue';
	import tmInput from '@/pagesTools/tm-vuetify/components/tm-input/tm-input.vue';
	import tmForm from '@/pagesTools/tm-vuetify/components/tm-form/tm-form.vue';
	import tmButton from '@/pagesTools/tm-vuetify/components/tm-button/tm-button.vue';
	import tmSheet from '@/pagesTools/tm-vuetify/components/tm-sheet/tm-sheet';
	import tmRow from '@/pagesTools/tm-vuetify/components/tm-row/tm-row';
	import tmCol from '@/pagesTools/tm-vuetify/components/tm-col/tm-col';
	import tmSkeleton from '@/pagesTools/tm-vuetify/components/tm-skeleton/tm-skeleton';
	import tmMessage from '@/pagesTools/tm-vuetify/components/tm-message/tm-message';
	import tmGroupradio from '@/pagesTools/tm-vuetify/components/tm-groupradio/tm-groupradio';
	import tmRadio from '@/pagesTools/tm-vuetify/components/tm-radio/tm-radio';
	import tmPickersCity from '@/pagesTools/tm-vuetify/components/tm-pickersCity/tm-pickersCity';
	
	let QQMapWS = require("@/js_sdk/skyrrrt-ws-jssdk/qqmap-ws-jssdk.js"); // 实例化API核心类
	// 实例化API核心类
	let qqmapsdk = new QQMapWS.default({
		key: 'XJTBZ-XW5K4-5KBU6-D37VL-LAHGF-RSBBI'
	});
	
	export default {
		data() {
			return {
				code:'',
				lastTime:0,
				area:[],
				xq:"",
				project_id:null,
				statusBar:this.$store.state.statusBar,
				phone:'',
				typeList:[
					{title:"外卖",icon:"https://cdn.tianfucd.com/agent/icon/properties/wm.png",remark:"外卖"},
					{title:"家政",icon:"https://cdn.tianfucd.com/agent/icon/properties/jz.png",remark:"家政"},
					{title:"中介看房",icon:"https://cdn.tianfucd.com/agent/icon/properties/zj.png",remark:"看房"},
					{title:"来客",icon:"https://cdn.tianfucd.com/agent/icon/properties/dk.png",remark:"来客看房"},
					{title:"访友",icon:"https://cdn.tianfucd.com/agent/icon/properties/fy.png",remark:"访友"},
					{title:"装修",icon:"https://cdn.tianfucd.com/agent/icon/properties/qt.png",remark:"装修"}
				],
				HouseType:[
					{title:"出售",checked:false},
					{title:"出租",checked:false}
				],
				show:false,
				reqData:{
					type:'',
					hose_type:'',
					project_name:'',
					title:'',
					// from:'',
					remark:'',
					room_no:'',
					phone:''
				}
			};
		},
		components: {
			tmKeyborad,tmInput,tmForm,tmButton,tmSheet,tmRow,tmCol,
			tmSkeleton,tmMessage,tmPickersCity,tmGroupradio,tmRadio
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			try {
			    var scene = decodeURIComponent(options.scene);
				scene = scene.split('=')
				if(scene.length == 2 && scene[0] == 'xqid'){
					//增加扫码次数
					this.$apis.scanXq({
						'sign':scene[1]
					}).then(res => {
						this.project_id = scene[1]
						this.xq = res
					})
				}else{
					this.$nextTick(()=>{
						this.$refs.toast.show({model:'error',label:'参数错误，请联系客服',mask:true})
					})
				}
			}catch(e){
				this.$nextTick(()=>{
					this.$refs.toast.show({model:'error',label:'入口错误，请扫码进入',mask:true})
				})
			}
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {
			
		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			let that = this
			uni.login({
				success(res) {
					if (res.code) {
						that.code = res.code
						that.lastTime = uni.$tm.dayjs().unix()
					}
				}
			})
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
			/**
			 * 选择租售方式
			 * @param {Object} data
			 */
			selectHouseType(data){
				if(data[0].checked==true) {
					this.$set(this.reqData,"hose_type",data[0].name)
				}
			},
			/**
			* 微信小程序一键导入手机号登录
			* @param {Object} e
			*/
			getPhoneNumber(e) {
				var that = this;
				if(that.reqData.phone != '' && that.reqData.phone != null && that.reqData.phone != 'NULL'){
					return false
				}
				var errMsg = e.detail.errMsg;
				var msg = errMsg.split(":");
				if (msg[1] != "ok") {
					return;
				}
				var encryptedData = e.detail.encryptedData;
				var iv = e.detail.iv;
				let this_time = uni.$tm.dayjs().unix()
				if(that.code == '' || this_time-that.lastTime>290){
					uni.login({
						success(res) {
							if (res.code) {
								setTimeout(function(){
									that.$apis.telDecrypt({
										encryptedData: encryptedData,
										iv: iv,
										code: res.code
									}).then(res => {
										that.reqData.phone = res.phone
										console.log(res.phone)
									})
								},1000);
							}
						}
					});
				}else{
					that.$apis.telDecrypt({
						encryptedData: encryptedData,
						iv: iv,
						code: that.code
					}).then(res => {
						var phone = that.phone = res.phone
						phone = "" + phone;
						var reg=/(\d{3})\d{5}(\d{3})/;
						that.reqData.phone = phone.replace(reg, "$1*****$2")
					})
				}
			},
			setFrom:function(e){
				this.reqData.from = e[0]+"-"+e[1]+"-"+e[2]
			},
			submit:function(e){
				e.type = this.reqData.type
				e.phone = this.phone
				e.hose_type = this.reqData.hose_type
				e.project_id = this.project_id
				e.project_name = this.xq
				if(e.type == ""){
					this.$refs.toast.show({model:'quest',label:'请选择到访类型',mask:true})
					return false
				}
				if(e.type == '中介看房' || e.type == '来客'){
					if(e.hose_type == ""){
						this.$refs.toast.show({model:'quest',label:'请选择房屋租售类型',mask:true})
						return false
					}
				}
				if(e.name == '' || e.phone == '' || e.project_id == '' || e.project_name == '' || e.room_num == ''){
					this.$refs.toast.show({model:'quest',label:'请检查是否填写完整',mask:true})
					return false
				}
				this.$apis.properties(e).then(res => {
					uni.navigateTo({
						url:"./success?xq="+this.xq+"&type="+res.type+"&house_type="+e.hose_type+"&time="+res.time+"&return_type="+res.return_type
					})
				})
			},
			selectType:function(item){
				let that = this
				that.reqData.type = item.title
				that.reqData.remark = item.remark
			},
			/**
			 * 跳转到地图选点
			 */
			goMap:function(){
				uni.navigateTo({
					url:"./buildMap"
				})
			},
		}
	};
</script>
<style lang="scss">
	.top{
		height: 108rpx;
		width: 100%;
		background-color: #00AAFF;
		color: #FFF;
		text-align: center;
		.tit{
			padding-top: 15rpx;
			font-size: 36rpx;
		}
		.xq{
			font-size: 22rpx;
		}
	}
	.typeItem{
		height: 136rpx;
		width: 136rpx;
		border-radius:20rpx;
		padding: 0px;
		background-color: #FFF;
		.box{
			padding-top: 14rpx;
			line-height: 36rpx;
			font-size: 28rpx;
			font-weight: 600;
			color: #333;
		}
	}
	.typeItem::after{
		border: 4rpx solid #FFF;
	}
	.selected{
		box-sizing: border-box;
		border: 4rpx solid #00AAFF;
	}
	.project_tit{
		margin-left: 35rpx;
		margin-bottom: 20rpx;
		font-size: 32rpx;
	}
</style>

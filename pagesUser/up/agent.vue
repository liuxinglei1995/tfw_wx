<template>
	<view  class="">
		<!-- v-if="passAudit == '0'" -->
		<tm-menubars title="经纪人入驻" iconColor="white"></tm-menubars>
		<tm-form @submit="submit" ref="formData" v-if="passAudit != 1">
			<tm-sheet :shadow="24" :padding="[12,24]" :margin="[24,24]">
				<tm-pickers v-if="companys.length > 0" @confirm="companysSelect" :default-value.sync="reqData.companys" rang-key="title" :list="companys">
					<tm-input name="companys" required title="经纪公司" placeholder="请选择经纪公司" disabled
						:value="obTstr2(reqData.companys)" right-icon="icon-angle-right"></tm-input>
				</tm-pickers>
				<tm-pickers v-if="companysArea.length > 0" @confirm="companysAreaSelect" :default-value.sync="reqData.companysArea" rang-key="title" :list="companysArea">
					<tm-input name="companysArea" required title="店铺区域" placeholder="请选择店铺区域" disabled
						:value="obTstr2(reqData.companysArea)" right-icon="icon-angle-right"></tm-input>
				</tm-pickers>

				<tm-pickers v-if="companysShop.length > 0" :default-value.sync="reqData.companysShop" rang-key="title" :list="companysShop">
					<tm-input name="companysShop" required title="所在店铺" placeholder="请选择所在店铺" disabled
						:value="obTstr2(reqData.companysShop)" right-icon="icon-angle-right"></tm-input>
				</tm-pickers>
				<tm-input v-model="reqData.uname" name="uname" required title="真实姓名" placeholder="真实姓名"></tm-input>
				<tm-input v-model="reqData.sfz" name="sfz" required title="身份证号" placeholder="身份证号"></tm-input>
				<tm-input v-model="reqData.mot" name="mot" required title="手机号" placeholder="手机号"></tm-input>
				<tm-input v-model="reqData.wechat" name="wechat" title="微信号" placeholder="微信号"></tm-input>
				<view class="py-12 px-24 mx-12 round-3 border-b-1 grey text">
					<text class="text-size-n text-weight-b ">经纪人名片</text>
				</view>
				<view class="py-32 mx-12">
					<tm-upload color="grey"
						:url="'https://up-z2.qiniup.com?token='+qn_token"
						:auto-upload="true"
						:filelist.sync="reqData.callingCardImg"
						url-key="key"
						:max="1"
						:grid="2"
					></tm-upload>
				</view>

				<view class="py-12 px-24 mx-12 round-3 border-b-1 grey text">
					<text class="text-size-n text-weight-b">经纪人执业证</text>
				</view>

				<view class="py-32 mx-12">
					<tm-upload
						color="grey"
						:url="'https://up-z2.qiniup.com?token='+qn_token"
						:filelist.sync="reqData.licensedImg"
						:auto-upload="true"
						:max="1"
						:grid="2">
					</tm-upload>
				</view>

				<view class="px-24">
					<tm-button navtie-type="form" theme="bg-gradient-blue-accent" block>申请入驻</tm-button>
				</view>
			</tm-sheet>
		</tm-form>
		<view class="" >
			暂不开放
		</view>
	</view>
	<!-- <view v-else>
		<tm-menubars :fllowTheme="false" :shadow="0" title="404" color="white" theme="white" :showback="true"></tm-menubars>
		<view class="noData" style="margin-top: 200rpx;" v-if="isShow == false || networkType == 'none'">
			<noData :custom="true">
				<view class="title" @tap="update()">404</view>
			</noData>
		</view>
	</view> -->
</template>

<script>
	import tmSheet from '@/pagesUser/tm-vuetify/components/tm-sheet/tm-sheet.vue';
	import tmForm from '@/pagesUser/tm-vuetify/components/tm-form/tm-form.vue';
	import tmPickers from '@/pagesUser/tm-vuetify/components/tm-pickers/tm-pickers.vue';
	import tmButton from '@/pagesUser/tm-vuetify/components/tm-button/tm-button.vue';
	import tmInput from '@/pagesUser/tm-vuetify/components/tm-input/tm-input.vue';
	import tmUpload from '@/pagesUser/tm-vuetify/components/tm-upload/tm-upload.vue';
	// import noData from "@/components/noData/noData.vue"
	export default {
		components: {
			tmSheet,
			tmForm,
			tmPickers,
			tmButton,
			tmInput,
			tmUpload,
			// noData
		},
		data() {
			return {
				passAudit : uni.getStorageSync('passAudit')=="0"?uni.getStorageSync('passAudit'):"1",
				isShow: false,
				companys: [],
				companysArea:[],
				companysShop:[],
				qn_token:"",
				reqData: {
					companys: [],
					companysArea:[],
					companysShop:[],
					uname:'',
					sfz:'',
					mot:'',
					wechat:'',
					callingCardImg:[],
					licensedImg:[]
				},
			}
		},
		onLoad() {
			let that = this
			that.getCompanys()
			// that.getQnToken()
		},
		onShow() {
			let that = this
			that.setData({
				passAudit:uni.getStorageSync('passAudit')
			})
		},
		methods: {
			/**
			 * 获取用户信息【携带七牛token】
			 * @param {Object} e
			 */
			getQnToken:function(e){
				let that = this
				that.$apis.getQnToken().then(res => {
					that.setData({
						qn_token:res
					})
				})
			},
			companysAreaSelect:function(e){
				let that = this
				that.$apis.getCompanysAreaOrShop({
					id:e[0]['data']['id'],
					control:'shop',
					rank:3
				}).then(res => {
					that.setData({
						companysShop:res
					})
				})
			},
			companysSelect:function(e){
				let that = this
				that.$apis.getCompanysAreaOrShop({
					id:e[0]['data']['id'],
					control:'area',
					rank:2
				}).then(res => {
					that.setData({
						companysArea:res
					})
				})
			},
			getCompanys:function(){
				let that = this
				// that.$apis.getCompanys({}).then(res => {
				// 	that.setData({
				// 		companys:res
				// 	})
				// })
			},
			/**
			 * @param {Object} o
			 */
			obTstr2(o) {
				if (Array.isArray(o)) {
					if (o.length.length === 0) return "";
					return o[0]?.title ?? ""
				}
				return ''
			},
			submit:function(e){
				let that = this
				console.log(that.reqData)
				if((that.reqData.callingCardImg).length == 0){
					uni.showToast({
						icon:'none',
						title:'请上传经纪人名片'
					})
				}else{
					e.calling_card_file = that.reqData.callingCardImg[0].key
				}
				if((that.reqData.licensedImg).length == 0){
					uni.showToast({
						icon:'none',
						title:'请上传经纪人执业证'
					})
				}else{
					e.licensed_file = that.reqData.licensedImg[0].key
				}
				that.$apis.brokerSettled(e).then(res => {
					uni.showModal({
						icon:'none',
						title:'申请注册成功！请注意接收短信，将会在1-2个工作日内通知结果'
					})
				})
			},
		}
	};
</script>

<style>
	.title {
		font-size: 36rpx;
		font-weight: bold;
		text-align: left;
		color: #333333;
	}

	.time {
		font-size: 24rpx;
		font-weight: 400;
		text-align: left;
		color: #999999;
	}

	.type {
		font-size: 32rpx;
		font-weight: 400;
		text-align: left;
		color: #333333;
		letter-spacing: 0px;
	}
</style>

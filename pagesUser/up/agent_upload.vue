<template>
	<view class="">
		<tm-menubars title="经纪人入驻" iconColor="white"></tm-menubars>
		<tm-form @submit="submit" ref="formData">
			<tm-sheet :shadow="24" :padding="[12,24]" :margin="[24,24]">
				<view class="py-12 px-24 mx-12 round-3 border-b-1 grey text">
					<text class="text-size-n text-weight-b ">身份证正面</text>
				</view>
				<view class="py-32 mx-12">
					<tm-upload
						color="grey" name="uploadImg" file-name="inp11"
						:filelist.sync="reqData.uploadImg" autoUpload :max="1" :grid="2">
					</tm-upload>
				</view>
				<view class="py-12 px-24 mx-12 round-3 border-b-1 grey text">
					<text class="text-size-n text-weight-b ">身份证反面</text>
				</view>
				<view class="py-32 mx-12">
					<tm-upload
						color="grey" name="uploadImg"  file-name="inp21"
						:filelist.sync="reqData.uploadImg" autoUpload :max="1" :grid="2">
					</tm-upload>
				</view>
				<view class="py-12 px-24 mx-12 round-3 border-b-1 grey text">
					<text class="text-size-n text-weight-b ">经纪人名片</text>
				</view>
				<view class="py-32 mx-12">
					<tm-upload
						color="grey" name="uploadImg"  file-name="inp41"
						:filelist.sync="reqData.uploadImg" autoUpload :max="1" :grid="2">
					</tm-upload>
				</view>

				<view class="py-12 px-24 mx-12 round-3 border-b-1 grey text">
					<text class="text-size-n text-weight-b ">经纪人执业证</text>
				</view>
				<view class="py-32 mx-12">
					<tm-upload
						color="grey" name="uploadImg"  file-name="inp31"
						:filelist.sync="reqData.uploadImg" autoUpload :max="1" :grid="2">
					</tm-upload>
				</view>

				<view class="px-24">
					<tm-button navtie-type="form" theme="bg-gradient-blue-accent" block>申请入驻</tm-button>
					<view class="py-32 text-size-s text-grey text-align-center">*税费计算结果仅供参考，请以实际缴纳金额结果为准。</view>
				</view>
			</tm-sheet>
		</tm-form>
	</view>
</template>
<script>
	import tmSheet from '@/pagesUser/tm-vuetify/components/tm-sheet/tm-sheet.vue';
	import tmForm from '@/pagesUser/tm-vuetify/components/tm-form/tm-form.vue';
	import tmPickers from '@/pagesUser/tm-vuetify/components/tm-pickers/tm-pickers.vue';
	import tmButton from '@/pagesUser/tm-vuetify/components/tm-button/tm-button.vue';
	import tmInput from '@/pagesUser/tm-vuetify/components/tm-input/tm-input.vue';
	import tmUpload from '@/pagesUser/tm-vuetify/components/tm-upload/tm-upload.vue';
	export default {
		components: {
			tmSheet,
			tmForm,
			tmPickers,
			tmButton,
			tmInput,
			tmUpload
		},
		data() {
			return {
				companys: [],
				companysArea:[],
				companysShop:[],
				reqData: {
					companys: [],
					companysArea:[],
					companysShop:[],
					name:'',
					ID_card:'',
				},
			}
		},
		onLoad() {
			let that = this
			that.getCompanys()
		},
		methods: {
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
				that.$apis.getCompanys({}).then(res => {
					that.setData({
						companys:res
					})
				})
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
				uni.navigateTo({
					url:"agent_upload?companys"+e.companys+"&companysArea="+e.companysArea+"&companysShop="+e.companysShop+"&name="+e.name+"&ID_card="+e.ID_card
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

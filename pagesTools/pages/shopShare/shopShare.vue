<template>
	<view class="page">
		<tm-menubars title="房源分享" iconColor="white" ></tm-menubars>
		<view class="poster" v-if="!show_poster">
			<lPainter :board="posterObj" ref="painter"></lPainter>
			<view class="footer-btn">
				<view class="">
					返回
				</view>
				<view class="save" @click="toSave">
					保存
				</view>
			</view>
		</view>
		<view class="poster-btn">
			<view :class="{'is-check':check_idx==index}" v-for="(item,index) in footer_arr" :key="index"
				@click="toChoose(index)">
				<image :src="item" mode=""></image>
				<view v-if="check_idx==index"></view>
			</view>
		</view>
		<!-- 生成的图片 -->
		<tm-maskFlow v-model="show_1" :position="pos">
			<view class="poster-img">
				<text @click="closePopup"></text>
				<image :src="path" mode="" @click="previewImg"></image>
				<!-- #ifdef H5 -->
				<view class="">
					长按图片保存到手机
				</view>
				<!-- #endif -->
				<!-- #ifndef H5 -->
				<view class="">
					点击图片保存到手机
				</view>
				<!-- #endif -->
			</view>
		</tm-maskFlow>
		<!-- 内容输入 -->
		<tm-poup v-model="showInput" :height="500"  :position="posInput">
			<tm-input :border-bottom="false" :adjust-position="true" v-model="posterObj.views[1].text"  :vertical="true" title="输入你想要招聘的岗位" border-color="grey-lighten-1"></tm-input>
			<tm-input :border-bottom="false" :adjust-position="true" v-model="posterObj.views[2].text" :vertical="true" title="输入你想要招聘的岗位" input-type="textarea" border-color="grey-lighten-1"></tm-input>
		</tm-poup>
	</view>
</template>

<script>
	import lPainter from '../../components/lime-painter/index.vue'
	import tmMaskFlow from '@/pagesTools/tm-vuetify/components/tm-maskFlow/tm-maskFlow.vue';
	import tmInput from '@/pagesTools/tm-vuetify/components/tm-input/tm-input.vue';
	import tmPoup from '@/pagesTools/tm-vuetify/components/tm-poup/tm-poup.vue';
	var siteConfig = uni.getStorageSync('siteConfigs')
	export default {
		components: {
			lPainter,tmMaskFlow,tmInput,tmPoup
		},
		data() {
			return {

				show_1: false,
				pos: 'center',
				showInput:false,
				posInput: 'bottom',


				show_poster: false, //显示海报
				path: '', //生成的图片地址
				posterObj: {
					width: '670rpx',
					height: '928rpx',
					background: '#fff',
					borderRadius: '16rpx',
					views: [
						{
							type: 'image',
							src: siteConfig.assetsPath + '/ad/share/shop/0.png',
							css: {
								width: '100%',
								height: '100%',
								left: '0rpx',
								top: '0rpx',
							}
						},
						{
							type: 'image',
							src:siteConfig.assetsPath + '/upload/9/user.jpg',
							css: {
								left: '50rpx',
								top: '50rpx',
								background: '#ff976a',
								width: '150rpx',
								height: '150rpx',
								radius: '50%'
							}
						},
						{
							type:'view',
							css:{
								left:'50rpx',
								top:'180rpx',
								background: '#FAAD14',
								width:'160rpx',
								height:'40rpx',
								radius:'20rpx'
							}
						},
						{
							type:'text',
							text:'买卖经纪人',
							css:{
								width:'160rpx',
								fontSize: '25rpx',
								fontWeight: 'bold',
								color: '#FFF',
								lineHeight: '28rpx',
								textAlign: 'center',
								left: '50rpx',
								top: '180rpx'
							}
						},
						{
							type:'text',
							text:'天府小二',
							css:{
								width:'370rpx',
								fontSize: '48rpx',
								fontWeight: 'bold',
								color: '#333333',
								lineHeight: '28rpx',
								left: '250rpx',
								top: '60rpx'
							}
						},
						{
							type:'text',
							text:'所属公司：赶集好房',
							css:{
								width:'370rpx',
								fontSize: '32rpx',
								fontWeight: '400',
								color: '#333333',
								lineHeight: '28rpx',
								left: '250rpx',
								top: '120rpx'
							}
						},
						{
							type:'text',
							text:'入驻平台：24个月',
							css:{
								width:'370rpx',
								fontSize: '32rpx',
								fontWeight: '400',
								color: '#333333',
								lineHeight: '28rpx',
								left: '250rpx',
								top: '170rpx'
							}
						},
						{
							type:'text',
							text:'15',
							css:{
								width:'223rpx',
								fontSize: '32rpx',
								fontWeight: '400',
								color: '#333333',
								textAlign: 'center',
								lineHeight: '28rpx',
								left: '0rpx',
								top: '250rpx'
							}
						},
						{
							type:'text',
							text:'在售房源',
							css:{
								width:'223rpx',
								fontSize: '32rpx',
								fontWeight: '400',
								color: '#333333',
								textAlign: 'center',
								lineHeight: '28rpx',
								left: '0rpx',
								top: '300rpx'
							}
						},
						{
							type:'text',
							text:'15',
							css:{
								width:'223rpx',
								fontSize: '32rpx',
								fontWeight: '400',
								color: '#333333',
								textAlign: 'center',
								lineHeight: '28rpx',
								left: '223rpx',
								top: '250rpx'
							}
						},
						{
							type:'text',
							text:'在租房源',
							css:{
								width:'223rpx',
								fontSize: '32rpx',
								fontWeight: '400',
								color: '#333333',
								textAlign: 'center',
								lineHeight: '28rpx',
								left: '223rpx',
								top: '300rpx'
							}
						},
						{
							type:'text',
							text:'15',
							css:{
								width:'223rpx',
								fontSize: '32rpx',
								fontWeight: '400',
								color: '#333333',
								textAlign: 'center',
								lineHeight: '28rpx',
								left: '446rpx',
								top: '250rpx'
							}
						},
						{
							type:'text',
							text:'代理楼盘',
							css:{
								width:'223rpx',
								fontSize: '32rpx',
								fontWeight: '400',
								color: '#333333',
								textAlign: 'center',
								lineHeight: '28rpx',
								left: '446rpx',
								top: '300rpx'
							}
						},
						{
							type:'view',
							css:{
								width:'570rpx',
								height:'350rpx',
								background: '#FFF',
								left: '50rpx',
								top: '420rpx',
								radius:'20rpx'
							}
						},
						{
							type:'text',
							text:'主营商圈：',
							css:{
								fontSize: '40rpx',
								fontWeight: '500',
								color: '#333333',
								lineHeight: '40rpx',
								left: '70rpx',
								top: '440rpx'
							}
						},
						{
							type:'text',
							text:'主营小区：',
							css:{
								fontSize: '40rpx',
								fontWeight: '500',
								color: '#333333',
								lineHeight: '40rpx',
								left: '70rpx',
								top: '580rpx'
							}
						},
						{
							type:'text',
							text:'经纪人姓名：张三',
							css:{
								fontSize: '32rpx',
								fontWeight: '400',
								color: '#6c7386',
								lineHeight: '32rpx',
								left: '50rpx',
								top: '790rpx'
							}
						},
						{
							type:'text',
							text:'经纪人电话：18888888888',
							css:{
								fontSize: '32rpx',
								fontWeight: '400',
								color: '#6c7386',
								lineHeight: '32rpx',
								left: '50rpx',
								top: '850rpx'
							}
						}
					]
				}, //画板数据
				footer_arr: [
					'../static/img/zhaopin/jianyue.png',
					'../static/img/zhaopin/heijin.png',
					'../static/img/zhaopin/jianbian.png',
					'../static/img/zhaopin/huoli.png',
					'../static/img/zhaopin/zhigan.png',
					'../static/img/zhaopin/more.png'
				], //底部选项
				check_idx: 0, //底部选中的下标
			}
		},
		onLoad() {

		},
		watch: {
			// check_idx(newVal,oldVal){
			// 	console.log(111,newVal);
			// 	console.log(222,oldVal);
			// }
		},
		methods: {
			previewImg() {
				// #ifdef H5
				return;
				// #endif
				uni.previewImage({
					current: this.path,
					urls: [this.path]
				});
			},
			closePopup() {
				this.show_1 = false;
				this.show_poster = false;
			},
			toSave() {
				uni.showLoading({
					title: '海报生成中',
				})
				const painter = this.$refs.painter;
				painter.canvasToTempFilePath().then(res => {
					this.path = res.tempFilePath;
					this.show_1 = true;
					this.show_poster = true;
					uni.hideLoading()
				});
			},
			getImg(r) {

			},
			toChoose(index) {
				if (index == 5) return;
				this.check_idx = index;
				switch (index) {
					case 0:
						this.posterObj.background = '#fff';
						this.posterObj.views = [{
							type: 'image',
							src: siteConfig.assetsPath + '/ad/zhaopin/zhaopin0.png',
							css: {
								width: '100%',
								height: '100%',
								left: '0rpx',
								top: '0rpx',
							}
						}, ]
						break;
					default:
						break;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import './style.scss';
</style>

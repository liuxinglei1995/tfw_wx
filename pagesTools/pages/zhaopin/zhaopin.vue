<template>
	<view class="page" v-if="passAudit != 1">
		<tm-menubars :fllowTheme="false" :shadow="0" title="招聘广告" color="white" theme="white" :showback="true"></tm-menubars>
		<view class="poster" v-if="!show_poster">
			<view @tap="clickInput"><lPainter :board="posterObj" ref="painter"></lPainter></view>
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
	<view v-else>
		<tm-menubars :fllowTheme="false" :shadow="0" title="404" color="white" theme="white" :showback="true"></tm-menubars>
		<view class="noData" style="margin-top: 200rpx;" v-if="isShow == false || networkType == 'none'">
			<!-- <noData :custom="true"><view class="title" @tap="update()">404</view></noData> -->
		</view>
	</view>
</template>

<script>
	import lPainter from '../../components/lime-painter/index.vue'
	import tmMaskFlow from '@/pagesTools/tm-vuetify/components/tm-maskFlow/tm-maskFlow.vue';
	import tmInput from '@/pagesTools/tm-vuetify/components/tm-input/tm-input.vue';
	import tmPoup from '@/pagesTools/tm-vuetify/components/tm-poup/tm-poup.vue';
	import tmMenubars from "@/pagesTools/tm-vuetify/components/tm-menubars/tm-menubars.vue"
	
	// import noData from "@/components/noData/noData.vue"
	var siteConfig = uni.getStorageSync('siteConfigs')
	export default {
		components: {
			lPainter,tmMaskFlow,tmInput,tmPoup,
			// noData,
			tmMenubars
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
							src: siteConfig.assetsPath + '/ad/zhaopin/zhaopin0.png',
							css: {
								width: '100%',
								height: '100%',
								left: '0rpx',
								top: '0rpx',
							}
						},{
							type: 'text',
							text: '点击录入相关信息',
							css: {
								width:'430rpx',
								fontSize: '28rpx',
								fontWeight: 'bold',
								color: '#2E3192',
								lineHeight: '28rpx',
								left: '30rpx',
								top: '350rpx'
							}
						},{
							type: 'text',
							text: '点击录入相关信息',
							css:{
								width:'430rpx',
								height:'500rpx',
								fontSize: '24rpx',
								fontWeight: '700',
								color: '#2E3192',
								lineHeight: '32rpx',
								left: '30rpx',
								top: '500rpx'
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
				
				passAudit : uni.getStorageSync('passAudit'),
				isShow: false,
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
			/**
			 * 点击预览图开始录入
			 */
			clickInput:function(){
				let that = this
				that.setData({
					showInput:true
				})
			},
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

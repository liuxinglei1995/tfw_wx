<template>
	<view class="page" style="background-color: #f2f4f8;">
		<view class="poster" :style="'margin-top:'+statusBar+'px'" v-if="!show_poster && posterObj != []">
			<l-painter css="height: 1056rpx; width: 570rpx;borderRadius: 20rpx;" ref="painter" :pixelRatio="4"
				v-if="style == '1'">
				<l-painter-view css="background: #CCD7EB;height: 1056rpx; width: 570rpx;borderRadius: 20rpx">
					<l-painter-image :src="posterObj.bg1"
						css="position:absolute;left: 0rpx;top: 0rpx;height: 1056rpx; width: 570rpx;borderRadius: 20rpx" />
					<l-painter-view
						css="position:absolute;left: 35rpx;top: 45rpx;background: #FFF;height: 966rpx; width: 501rpx;">
						<l-painter-view
							css="position:absolute;left:21rpx;top:21rpx;width:108rpx;height:108rpx;textAlign:center;background: #0055FF;">
							<l-painter-text css="fontFamily: YYJXS;fontSize:83rpx;color:#FFF;lineHeight:83rpx"
								text="早" />
						</l-painter-view>
						<l-painter-view css="position:absolute;left:147rpx;top:40rpx;textAlign:center;">
							<l-painter-text css="fontFamily: YYJXS;fontSize:83rpx;color:#0055FF;lineHeight:83rpx"
								text="安" />
						</l-painter-view>
						<l-painter-view
							css="position:absolute;left:21rpx;top:141rpx;textAlign:center;width:190rpx;height:5rpx;background: #0055FF;">
						</l-painter-view>
						<l-painter-view
							css="position:absolute;left:21rpx;top:156rpx;textAlign:center;width:80rpx;height:5rpx;background: #0055FF;">
						</l-painter-view>
						<l-painter-view css="position:absolute;right:-0rpx;top:32rpx;marginRight:25rpx;width:252rpx;">
							<l-painter-view css="width:140rpx;textAlign:center;fontSize:17rpx;">
								<l-painter-view css="marginRight:10rpx;">
									<l-painter-text css="fontSize:44rpx;fontFamily: SHUZI;lineHeight:44rpx"
										:text="posterObj.this_day" />
									<l-painter-text css="marginTop:25rpx;marginLeft:5rpx;" text="日" />
								</l-painter-view>
								<l-painter-text css="marginRight:10rpx;" :text="posterObj.this_month" />
							</l-painter-view>
							<l-painter-view
								css="position:absolute;right:121rpx;top:10rpx;textAlign:center;width:2rpx;height:60rpx;background: #000;"></l-painter-view>
							<l-painter-view
								css="position:absolute;right:-0rpx;top:6rpx;width:110rpx;textAlign:left;fontSize:17rpx;">
								<l-painter-text css="marginRight:10rpx;" :text="posterObj.this_week" />
								<l-painter-text css="marginRight:10rpx;"
									:text="posterObj.lives[0].temperature + ' ℃ ' + posterObj.lives[0].weather" />
								<l-painter-text css="marginRight:10rpx;"
									:text='"农历"+posterObj.lunar[1]+posterObj.lunar[2]' />
							</l-painter-view>
						</l-painter-view>
						<l-painter-image :src="posterObj.bg"
							css="background: #FFF;height: 455rpx; width: 455rpx;objectFit:cover;marginTop:186rpx;marginLeft:22rpx" />
						<l-painter-view css="position:absolute;left:21rpx;top:660rpx;textAlign:left;width:455rpx;">
							<l-painter-text
								:css="'fontSize:'+textSize+'rpx;color:'+textColor+';lineHeight:30rpx;maxLines:3;maxHeight:90rpx;textDecoration:'+textDecoration+';fontWeight:'+fontWeight"
								:text="posterObj.hitokoto.hitokoto" />
							<l-painter-text v-if="posterObj.hitokoto.from != ''"
								css="width:455rpx;marginTop:45rpx;textAlign:right;fontSize:20rpx;color:#333;"
								:text="'——— '+posterObj.hitokoto.from" />
						</l-painter-view>
						<l-painter-view
							css="position:absolute;left:0rpx;top:790rpx;background: #FFF;height: 176rpx; width: 501rpx;">

						</l-painter-view>
						<l-painter-image :src="posterObj.loginUser.user.avatar"
							css="position:absolute;left: 97rpx;bottom: 66rpx;width: 100rpx;height: 100rpx;border-radius:50%;border:5rpx;border-color:#FFF;" />
						<l-painter-view css="position:absolute;left:47rpx;bottom: 25rpx;width: 200rpx;">
							<l-painter-text css="textAlign:center;width: 200rpx;color:#0F0301;fontSize:18rpx;"
								:text="posterObj.loginUser.user.nickName" />
						</l-painter-view>
						<l-painter-image :src="'data:image/jpeg;base64,'+wxqrcode"
							css="position:absolute;right: 97rpx;bottom: 66rpx;background: #ff976a;width: 100rpx;height: 100rpx" />
						<l-painter-view css="position:absolute;right:47rpx;bottom: 25rpx;width: 200rpx;">
							<l-painter-text css="textAlign:center;width: 200rpx;color:#0F0301;fontSize:18rpx;"
								text="扫码查看更多信息" />
						</l-painter-view>
					</l-painter-view>
				</l-painter-view>
			</l-painter>
			<l-painter css="height: 1056rpx; width: 570rpx;borderRadius: 20rpx;" ref="painter" :pixelRatio="4"
				v-if="style == '2'">
				<l-painter-view css="background: #FFF;height: 1056rpx; width: 570rpx;borderRadius: 20rpx">
					<l-painter-image :src="'https://static.tianfucd.com/img/share/news/Default/logo.png'"
						css="position:absolute;left: 28rpx;top: 34rpx;background: #ff976a;width: 121rpx;height: 34rpx" />
					<l-painter-view css="position:absolute;right:-0rpx;top:17rpx;marginRight:25rpx;width:240rpx;">
						<l-painter-view css="width:128rpx;textAlign:center;fontSize:17rpx;">
							<l-painter-view css="marginRight:10rpx;">
								<l-painter-text css="fontSize:44rpx;fontFamily: SHUZI;lineHeight:44rpx"
									:text="posterObj.this_day" />
								<l-painter-text css="marginTop:25rpx;marginLeft:5rpx;" text="日" />
							</l-painter-view>
							<l-painter-text css="marginRight:10rpx;" :text="posterObj.this_month" />
						</l-painter-view>
						<l-painter-view
							css="position:absolute;right:121rpx;top:10rpx;textAlign:center;width:2rpx;height:60rpx;background: #000;"></l-painter-view>
						<l-painter-view
							css="position:absolute;right:-0rpx;top:6rpx;width:110rpx;textAlign:left;fontSize:17rpx;">
							<l-painter-text css="marginRight:10rpx;" :text="posterObj.this_week" />
							<l-painter-text css="marginRight:10rpx;"
								:text="posterObj.lives[0].temperature + ' ℃ ' + posterObj.lives[0].weather" />
							<l-painter-text css="marginRight:10rpx;"
								:text='"农历"+posterObj.lunar[1]+posterObj.lunar[2]' />
						</l-painter-view>
					</l-painter-view>
					<l-painter-view
						css="position:absolute;right:0rpx;top:158rpx;height: 626rpx; width: 487rpx;background: #FFC239;"></l-painter-view>
					<l-painter-image :src="posterObj.bg"
						css="position:absolute;left:41rpx;top:112rpx;height: 626rpx; width: 487rpx;objectFit:cover;" />
					<l-painter-view css="position:absolute;left:39rpx;top:804rpx;textAlign:left;width:455rpx;">
						<l-painter-view css="fontSize:24rpx;color:#040C23;lineHeight:30rpx;">
							<l-painter-text text="Hello" />
						</l-painter-view>
						<l-painter-view css="fontSize:44rpx;color:#040C23;lineHeight:50rpx;">
							<l-painter-text text="你好·早安" />
						</l-painter-view>
						<l-painter-view
							css="background: #040C23;height: 3rpx; width: 227rpx;marginTop:10rpx;"></l-painter-view>
						<l-painter-view css="height: 4rpx; width: 372rpx;marginTop:10rpx;">
							<l-painter-text
								:css="'fontSize:'+textSize+'rpx;color:'+textColor+';lineHeight:24rpx;maxLines:3;maxHeight:73rpx;textDecoration:'+textDecoration+';fontWeight:'+fontWeight"
								:text="posterObj.hitokoto.hitokoto" />
						</l-painter-view>

					</l-painter-view>
					<l-painter-image :src="'data:image/jpeg;base64,'+wxqrcode"
						css="position:absolute;right: 33rpx;bottom: 96rpx;background: #ff976a;width: 91rpx;height: 91rpx" />
					<l-painter-view css="position:absolute;right:0rpx;bottom: 52rpx;width: 159rpx;">
						<l-painter-text css="textAlign:center;width: 159rpx;color:#0F0301;fontSize:17rpx;"
							text="扫码查看更多" />
					</l-painter-view>
				</l-painter-view>
			</l-painter>
			<l-painter css="height: 1056rpx; width: 570rpx;borderRadius: 20rpx;" ref="painter" :pixelRatio="4"
				v-if="style == '3'">
				<l-painter-view css="background: #FC9F35;height: 1056rpx; width: 570rpx;borderRadius: 20rpx">
					<l-painter-image :src="'https://static.tianfucd.com/img/share/news/White/logo.png'"
						css="position:absolute;left: 28rpx;top: 34rpx;background: #ff976a;width: 121rpx;height: 34rpx" />
					<l-painter-view
						css="position:absolute;right:-0rpx;top:17rpx;marginRight:25rpx;width:240rpx;color:#FFF">
						<l-painter-view css="width:128rpx;textAlign:center;fontSize:17rpx;">
							<l-painter-view css="marginRight:10rpx;">
								<l-painter-text css="fontSize:44rpx;fontFamily: SHUZI;lineHeight:44rpx"
									:text="posterObj.this_day" />
								<l-painter-text css="marginTop:25rpx;marginLeft:5rpx;" text="日" />
							</l-painter-view>
							<l-painter-text css="marginRight:10rpx;" :text="posterObj.this_month" />
						</l-painter-view>
						<l-painter-view
							css="position:absolute;right:121rpx;top:10rpx;textAlign:center;width:2rpx;height:60rpx;background: #FFF;"></l-painter-view>
						<l-painter-view
							css="position:absolute;right:-0rpx;top:6rpx;width:110rpx;textAlign:left;fontSize:17rpx;">
							<l-painter-text css="marginRight:10rpx;" :text="posterObj.this_week" />
							<l-painter-text css="marginRight:10rpx;"
								:text="posterObj.lives[0].temperature + ' ℃ ' + posterObj.lives[0].weather" />
							<l-painter-text css="marginRight:10rpx;"
								:text='"农历"+posterObj.lunar[1]+posterObj.lunar[2]' />
						</l-painter-view>
					</l-painter-view>
					<l-painter-image :src="posterObj.bg"
						css="position:absolute;left:95rpx;top:157rpx;height: 380rpx; width: 380rpx;objectFit:cover;radius:50%;" />
					<l-painter-view css="position:absolute;left:85rpx;top:590rpx;">
						<l-painter-text
							css="width:399rpx;height:59rpx;radius:30rpx;textAlign:center;background: #FFF;fontSize:31rpx;lineHeight:59rpx;color:#FC9F35;"
							text="Hello my friend" />
					</l-painter-view>
					<l-painter-view css="position:absolute;left:108rpx;top:679rpx;height:160rpx;">
						<l-painter-text
							:css="'textAlign:center;width:354rpx;fontSize:'+textSize+'rpx;color:'+textColor+';lineHeight:40rpx;height:160rpx;textDecoration:'+textDecoration+';fontWeight:'+fontWeight"
							:text="posterObj.hitokoto.hitokoto" />
					</l-painter-view>
					<l-painter-view
						css="position:absolute;left: 231rpx;top: 862rpx;width: 109rpx;height: 109rpx;background: #FFF;radius:50%;"></l-painter-view>
					<l-painter-image :src="'data:image/jpeg;base64,'+wxqrcode"
						css="position:absolute;left: 236rpx;top: 867rpx;width: 99rpx;height: 99rpx" />
					<l-painter-view css="position:absolute;bottom: 48rpx;width: 100%;">
						<l-painter-text css="textAlign:center;width: 100%;color:#FFF;fontSize:18rpx;" text="扫码查看更多" />
					</l-painter-view>
				</l-painter-view>
			</l-painter>
			<tm-message ref="toast"></tm-message>
			<view style="width: 570rpx;" class="mt-10">
				<tm-tabs align="left" v-model="selectTabs" :list="tabs"></tm-tabs>
				<view style="background-color: #FFF;" v-if="selectTabs == 0">
					<view class="flex-start mx-30 py-20">
						<view class="mr-40" style="font-size: 20rpx;">
							字号
						</view>
						<view class="mr-20" @click="textSize = item"
							:style="'font-size: 27rpx;color:'+(item == textSize ? 'rgba(0,170,255,1)':'')"
							v-for="(item,index) in zihao" :key="index">
							{{item}}
						</view>
					</view>
					<view class="flex-start mx-30 py-10">
						<view class="mr-40" style="font-size: 20rpx;">
							颜色
						</view>
						<view class="mr-20" @click="textColor = item"
							:style="'width: 25rpx;height: 25rpx;background: #FFFFFF;border-radius: 20rpx;opacity: 1;border: 2rpx solid #999;background-color:'+item+';'+(textColor == item?'border: 3rpx solid rgb(0, 170, 255);border-radius: 20rpx;':'')"
							v-for="(item,index) in color" :key="index"></view>
					</view>
					<tm-input :adjust-position="true" @clear="posterObj.hitokoto.from = ''"
						@input="posterObj.hitokoto.from = ''" :vertical="true" :height="120" :maxlength="88"
						:border-bottom="false" placeholder="请输入你的文案." input-type="textarea"
						v-model="posterObj.hitokoto.hitokoto" bg-color="grey-lighten-5" clear></tm-input>
					<view class="mt--n15 ml-40 flex-between" style="position: absolute;width: 80rpx;">
						<view @click="fontWeight = 'normal'" v-if="fontWeight == 'bold'">
							<img src="../../static/img/poster/icon/boldSelect.png" style="width: 40rpx;height: 40rpx;"
								alt="" srcset="">
						</view>
						<view @click="fontWeight = 'bold'" v-if="fontWeight != 'bold'">
							<img src="../../static/img/poster/icon/bold.png" style="width: 40rpx;height: 40rpx;" alt=""
								srcset="">
						</view>

						<view @click="textDecoration = 'none'" v-if="textDecoration == 'underline'">
							<img src="../../static/img/poster/icon/underLineSelect.png"
								style="width: 40rpx;height: 40rpx;" alt="" srcset="">
						</view>
						<view @click="textDecoration = 'underline'" v-if="textDecoration != 'underline'">
							<img src="../../static/img/poster/icon/underLine.png" style="width: 40rpx;height: 40rpx;"
								alt="" srcset="">
						</view>
					</view>
				</view>
				<view style="background-color: #FFF;" v-if="selectTabs == 1">
					<l-clipper v-if="clipperShow" :width="clipperWidth" :height="clipperHeight" :isLockWidth="true"
						:isLockHeight="true" :isLockRatio="true" :isLimitMove="false" :isDisableScale="false"
						:isDisableRotate="false" :isShowCancelBtn="true" :isShowPhotoBtn="true" :scale-ratio="6"
						:isShowRotateBtn="true" :isShowConfirmBtn="true" @success="handleSuccess"
						@cancel="clipperShow = false">
						<!-- 四个基本按钮插槽 -->
						<view slot="cancel">取消</view>
						<view slot="photo">选择图片</view>
						<view slot="rotate">旋转</view>
						<view slot="confirm">确定</view>
					</l-clipper>
					<button style="background-color: #FFF;font-size: 30rpx;" @tap="clipperShow = true">更换图片</button>
				</view>
			</view>
			<view class="footer-btn">
				<view class="" @tap="back">
					返回
				</view>
				<view class="save" @click="toSave">
					保存
				</view>
			</view>
		</view>
		<view class="poster-btn" :style="'margin-top:'+(customBar+5)+'px'">
			<view :class="{'is-check':check_idx==index}" v-for="(item,index) in footer_arr" :key="index"
				@click="toChoose(index)">
				<image :src="item" mode=""></image>
				<view v-if="check_idx==index"></view>
			</view>
		</view>
		<view style="position: fixed;bottom: 40rpx;right: 28rpx;">
			<image @tap="rotate" :animation="animationData" class="circle" src="/static/static/assets/my/circle.png">
			</image>
		</view>
		<!-- 生成的图片 -->
		<tm-maskFlow v-model="show_1" :close="false" :position="pos">
			<view class="poster-img">
				<text @click="closePopup"></text>
				<image :src="path" mode="aspectFit" @click="previewImg"></image>
				<!-- #ifdef H5 -->
				<view style="color: #ffff00;padding: 10rpx 30rpx;border: #FFF 1rpx;">
					长按图片,长按保存
				</view>
				<!-- #endif -->
				<!-- #ifndef H5 -->
				<view>
					点击图片保存到手机
				</view>
				<!-- #endif -->
			</view>
		</tm-maskFlow>
	</view>
</template>
<script>
	let App = getApp()
	import tmMaskFlow from '@/pagesTools/tm-vuetify/components/tm-maskFlow/tm-maskFlow.vue';
	import tmInput from '@/pagesTools/tm-vuetify/components/tm-input/tm-input.vue';
	import tmPoup from '@/pagesTools/tm-vuetify/components/tm-poup/tm-poup.vue';
	import tmMessage from '@/pagesTools/tm-vuetify/components/tm-message/tm-message.vue';
	import tmUpload from '@/pagesTools/tm-vuetify/components/tm-upload/tm-upload.vue';
	import tmTabs from '@/pagesTools/tm-vuetify/components/tm-tabs/tm-tabs.vue';
	import tmScroll from '@/pagesTools/tm-vuetify/components/tm-scroll/tm-scroll.vue';
	import {
		base64ToPath
	} from '../../components/lime-painter/utils.js';

	import lPainterView from '../../components/l-painter-view/l-painter-view.vue';
	import lPainterText from '../../components/l-painter-text/l-painter-text.vue';
	import lPainterImage from '../../components/l-painter-image/l-painter-image.vue';
	import lPainterQrcode from '../../components/l-painter-qrcode/l-painter-qrcode.vue';
	import lPainter from '../../components/l-painter/l-painter.vue';
	import lClipper from '../../components/l-clipper/l-clipper.vue';
	import {
		getzaobao,
		wxtest
	} from '@/api/houst.js';
	var siteConfig = uni.getStorageSync('siteConfigs')
	export default {
		components: {
			tmMaskFlow,
			tmInput,
			tmPoup,
			tmMessage,
			tmScroll,
			tmTabs,
			tmUpload,
			lPainterView,
			lPainterText,
			lPainterImage,
			lPainter,
			lPainterQrcode,
			lClipper
		},
		data() {
			return {
				customBar: null,
				statusBar: null,
				animationData: [], //动画
				tabs: ['文案', '图片'],
				selectTabs: 0,
				show_1: false,
				showP: false,
				pos: 'center',
				showInput: false,
				posInput: 'bottom',
				show_poster: false, //显示海报
				path: '', //生成的图片地址
				posterObj: {
					bg: "https://cdn.tianfucd.com/images/applet/poster/16.jpg",
					bg1: "https://cdn.tianfucd.com/images/applet/poster/16.jpg",
					count: "1",
					hitokoto: {},
					info: "OK",
					infocode: "10000",
					lives: [],
					loginUser: {},
					lunar: [],
					status: "1",
					this_day: 30,
					this_month: "",
					this_week: "",
				}, //画板数据
				footer_arr: [
					'https://cdn.tianfucd.com/images/applet/poster/icon/3.png',
					'https://cdn.tianfucd.com/images/applet/poster/icon/2.png',
					'https://cdn.tianfucd.com/images/applet/poster/icon/1.png',
					// '../../static/img/poster/4.png'
				], //底部选项
				check_idx: 0, //底部选中的下标
				wxqrcode: "",
				style: '1',
				color: '#333333',

				clipperShow: false,
				clipperWidth: 455,
				clipperHeight: 455,
				textSize: '20',
				textColor: '#333',
				textDecoration: 'none',
				fontWeight: 'normal',
				zihao: ['16', '18', '20', '22', '24', '26', '28'],
				color: ['#333', '#666', '#999', '#FFF', '#01F', '#00b9ff', '#ff6f00']
			}
		},
		onReady() {
			if (uni.getSystemInfoSync().platform == 'android') {
				uni.loadFontFace({
					family: 'SHUZI',
					source: 'url("https://cdn.tianfucd.com/agent/fonts/PangMenZhengDao-Regular.woff")',
					scopes: ['webview', 'native'],
					success(e) {
						console.log('success', e)
					}
				})
			}
			uni.loadFontFace({
				family: 'YYJXS',
				source: 'url("https://cdn.tianfucd.com/agent/fonts/YYJXS.woff")',
				scopes: ['webview', 'native'],
				success(e) {
					console.log('success', e)
				}
			})
			uni.loadFontFace({
				family: 'XYGHXS-S',
				source: 'url("https://cdn.tianfucd.com/agent/fonts/XYGHXS-S.woff")',
				scopes: ['webview', 'native'],
				success(e) {
					console.log('success', e)
				}
			})
			// this.$nextTick(() => {
			// 	this.$refs.toast.show({
			// 		model: 'load',
			// 		mask: true
			// 	})
			// })
			this.getPosterInfo(true)
		},
		onLoad() {
			this.customBar = uni.getStorageSync('customBar')
			this.statusBar = uni.getStorageSync('statusBar')
			console.log(this.customBar, this.statusBar, "适配");
		},
		methods: {
			handleSuccess(event) {
				console.log(event, '-->handleSuccess')
				this.posterObj.bg = event.url;
				this.clipperShow = false;
			},
			/**
			 * 刷新图片以及文案
			 */
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
				this.$nextTick(() => {
					this.$refs.toast.show({
						model: 'load',
						mask: true
					})
				})
				that.getPosterInfo(false)
				setTimeout(() => {
					animation.rotate(0).step();
					that.setData({
						animationData: animation.export()
					});
				}, 1200);
			},
			/*获取小程序码*/
			getWxacode() {
				let that = this
				wxtest({
					page: 'pages/index/index',
					scene: 'type_poster'
				}).then(res => {
					// console.log(res, "sssssdddd");
					this.wxqrcode = res
				})
			},
			getPosterInfo: function(ifRefQr) {
				let that = this
				console.log('到getPosterInfo')
				getzaobao().then(res => {
					console.log("进入");
					console.log(res, "11111");
					res.bg1 = res.bg
					that.setData({
						posterObj: res,
						showP: true
					})
					console.log(that.posterObj)
					if (ifRefQr) {
						// #ifdef MP-WEIXIN
						this.getWxacode()
						// #endif
						// #ifdef H5
						that.$nextTick(() => {
							that.$refs.toast.hide()
						})
						// #endif
					} else {
						that.$nextTick(() => {
							that.$refs.toast.hide()
						})
					}
				})
			},
			back: function() {
				uni.navigateBack({
					delta: 1
				})
			},
			/**
			 * 点击预览图开始录入
			 */
			clickInput: function() {
				let that = this
				that.setData({
					showInput: true
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
			toChoose(index) {
				console.log(index,'-->toChoose')
				let that = this
				let isLad = false
				switch (index) {
					case 0:
						that.style = '1'
						that.textSize = '20'
						that.textColor = '#333'
						that.textDecoration = 'none'
						that.fontWeight = 'normal'
						that.clipperWidth = 455
						that.clipperHeight = 455
						isLad = true
						break;
					case 1:
						that.style = '2'
						that.textSize = '18'
						that.textColor = '#333'
						that.textDecoration = 'none'
						that.fontWeight = 'normal'
						that.clipperWidth = 490
						that.clipperHeight = 634
						isLad = true
						break;
					case 2:
						that.style = '3'
						that.textSize = '24'
						that.textColor = '#FFF'
						that.textDecoration = 'none'
						that.fontWeight = 'normal'
						that.clipperWidth = 380
						that.clipperHeight = 380
						isLad = true
						break;
					case 3:
						that.style = '4'
						isLad = true
						break;
					default:
						uni.showToast({
							icon: 'none',
							title: '敬请期待'
						})
						break;
				}
				if (isLad) {
					this.check_idx = index;
					uni.showLoading({
						title: '加载中'
					});
					setTimeout(function() {
						uni.hideLoading();
					}, 3000);
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import './style.scss';

	.circle {
		width: 80rpx;
		height: 80rpx;
		margin-left: 20rpx;
		box-shadow: 0rpx 0rpx 3rpx 3rpx #ccc;
		border-radius: 50%;
		transform: rotate(180deg);
	}
</style>
<template>
	<view class="page">
		<tm-menubars title="天府网税费计算器" iconColor="white"></tm-menubars>
		<view>
			<tm-tabs :shadow="0" v-model="active" :list="['买方税费','买房承担所有税费','卖方税费']"></tm-tabs>
			<view class="poster" v-if="op.type == 'rent'">
				<l-painter ref="painter">
					<l-painter-view css="background: #FFF;height: 995rpx; width: 670rpx;borderRadius: 20rpx">
						<l-painter-text v-if="active == 0"
							css="position:absolute;left:34rpx;top:28rpx;width:602rpx;color:#333333;fontWeight:bold;fontSize:28rpx;line-clamp:1;"
							text="买方税费" />
						<l-painter-text v-if="active == 1"
							css="position:absolute;left:34rpx;top:28rpx;width:602rpx;color:#333333;fontWeight:bold;fontSize:28rpx;line-clamp:1;"
							text="买房承担所有税费" />
						<l-painter-text v-if="active == 2"
							css="position:absolute;left:34rpx;top:28rpx;width:602rpx;color:#333333;fontWeight:bold;fontSize:28rpx;line-clamp:1;"
							text="卖方税费" />
						<l-painter-text
							css="position:absolute;left:34rpx;top:70rpx;width:602rpx;color:#333333;fontWeight:bold;fontSize:36rpx;line-clamp:1;"
							text="房屋信息" />
						<l-painter-view
							css="position:absolute;left: 34rpx;top: 130rpx;width: 602rpx;fontSize:28rpx;color:#333333;">
							<l-painter-text text="房屋总价" />
							<l-painter-text css="position:absolute;right:-0rpx;color:#666666;"
								:text="numFilter(op.money)+' 万'" />
						</l-painter-view>
						<l-painter-view
							css="position:absolute;left: 34rpx;top: 174rpx;width: 602rpx;fontSize:28rpx;color:#333333;">
							<l-painter-text text="房屋单价" />
							<l-painter-text css="position:absolute;right:-0rpx;color:#666666;"
								:text="numFilter(op.money *10000 / op.mj)+' /㎡'" />
						</l-painter-view>
						<l-painter-view
							css="position:absolute;left: 34rpx;top: 216rpx;width: 602rpx;fontSize:28rpx;color:#333333;">
							<l-painter-text text="房屋面积" />
							<l-painter-text css="position:absolute;right:-0rpx;color:#666666;"
								:text="numFilter(op.mj)+' ㎡'" />
						</l-painter-view>

						<l-painter-text
							css="position:absolute;left:34rpx;top:284rpx;width:602rpx;color:#333333;fontWeight:bold;fontSize:36rpx;line-clamp:1;"
							text="费用明细" />
						<l-painter-view v-if="active == 0 || active == 1"
							css="position:absolute;left: 34rpx;top: 352rpx;width: 602rpx;fontSize:28rpx;color:#333333;">
							<l-painter-text :text="'契税 ('+s.qiSui.t+')'" />
							<l-painter-text css="position:absolute;right:-0rpx;color:#666666;"
								:text="numFilter(s.qiSui.v)+' 元'" />
						</l-painter-view>
						<l-painter-view v-if="active == 0 || active == 1"
							css="position:absolute;left: 34rpx;top: 412rpx;width: 602rpx;fontSize:28rpx;color:#333333;">
							<l-painter-text text="登记转移费" />
							<l-painter-text css="position:absolute;right:-0rpx;color:#666666;"
								:text="numFilter(s.zydjf)+' 元'" />
						</l-painter-view>
						<l-painter-view v-if="active == 0"
							css="position:absolute;left: 34rpx;top: 472rpx;width: 602rpx;fontSize:28rpx;color:#333333;">
							<l-painter-text :text="'中介费 ('+s.buy_zjf.t+')'" />
							<l-painter-text css="position:absolute;right:-0rpx;color:#666666;"
								:text="numFilter(s.buy_zjf.v)+' 元'" />
						</l-painter-view>
						<l-painter-view v-if="active == 0"
							css="position:absolute;left: 34rpx;top: 532rpx;width: 602rpx;fontSize:28rpx;color:#333333;">
							<l-painter-text css="color:red;fontWeight:bold;" text="总计" />
							<l-painter-text css="position:absolute;right:-0rpx;color:red;fontWeight:bold;"
								:text="numFilter(s.buy_zjf.v + s.zydjf + s.qiSui.v)+' 元'" />
						</l-painter-view>

						<l-painter-view v-if="active == 1"
							css="position:absolute;left: 34rpx;top: 472rpx;width: 602rpx;fontSize:28rpx;color:#333333;">
							<l-painter-text :text="'个税 ('+s.gs.t+')'" />
							<l-painter-text css="position:absolute;right:-0rpx;color:#666666;"
								:text="numFilter(s.gs.v)+' 元'" />
						</l-painter-view>
						<l-painter-view v-if="active == 1"
							css="position:absolute;left: 34rpx;top: 532rpx;width: 602rpx;fontSize:28rpx;color:#333333;">
							<l-painter-text :text="'增值税 ('+s.zzs.t+')'" />
							<l-painter-text css="position:absolute;right:-0rpx;color:#666666;"
								:text="numFilter(s.zzs.v)+' 元'" />
						</l-painter-view>
						<l-painter-view v-if="active == 1"
							css="position:absolute;left: 34rpx;top: 592rpx;width: 602rpx;fontSize:28rpx;color:#333333;">
							<l-painter-text :text="'中介费 ('+s.buy_zjf.t+')'" />
							<l-painter-text css="position:absolute;right:-0rpx;color:#666666;"
								:text="numFilter(s.buy_zjf.v)+' 元'" />
						</l-painter-view>
						<l-painter-view v-if="active == 1"
							css="position:absolute;left: 34rpx;top: 652rpx;width: 602rpx;fontSize:28rpx;color:#333333;">
							<l-painter-text css="color:red;fontWeight:bold;" text="总计" />
							<l-painter-text css="position:absolute;right:-0rpx;color:red;fontWeight:bold;"
								:text="numFilter(s.buy_zjf.v + s.zydjf + s.qiSui.v + s.gs.v + s.zzs.v)+' 元'" />
						</l-painter-view>


						<l-painter-view v-if="active == 2"
							css="position:absolute;left: 34rpx;top: 352rpx;width: 602rpx;fontSize:28rpx;color:#333333;">
							<l-painter-text :text="'个税 ('+s.gs.t+')'" />
							<l-painter-text css="position:absolute;right:-0rpx;color:#666666;"
								:text="numFilter(s.gs.v)+' 元'" />
						</l-painter-view>
						<l-painter-view v-if="active == 2"
							css="position:absolute;left: 34rpx;top: 412rpx;width: 602rpx;fontSize:28rpx;color:#333333;">
							<l-painter-text :text="'增值税 ('+s.zzs.t+')'" />
							<l-painter-text css="position:absolute;right:-0rpx;color:#666666;"
								:text="numFilter(s.zzs.v)+' 元'" />
						</l-painter-view>
						<l-painter-view v-if="active == 2"
							css="position:absolute;left: 34rpx;top: 472rpx;width: 602rpx;fontSize:28rpx;color:#333333;">
							<l-painter-text :text="'中介费 ('+s.sell_zjf.t+')'" />
							<l-painter-text css="position:absolute;right:-0rpx;color:#666666;"
								:text="numFilter(s.sell_zjf.v)+' 元'" />
						</l-painter-view>
						<l-painter-view v-if="active == 2"
							css="position:absolute;left: 34rpx;top: 532rpx;width: 602rpx;fontSize:28rpx;color:#333333;">
							<l-painter-text css="color:red;fontWeight:bold;" text="总计" />
							<l-painter-text css="position:absolute;right:-0rpx;color:red;fontWeight:bold;"
								:text="numFilter(s.gs.v + s.zzs.v + s.sell_zjf.v)+' 元'" />
						</l-painter-view>


						<l-painter-view
							css="position:absolute;left: 34rpx;top: 770rpx;width: 602rpx;fontSize:28rpx;color:#666666;">
							<l-painter-text :text="'购房性质 ： '+decodeURIComponent(op.gouFangXingZhi)" />
							<l-painter-text css="position:absolute;right:-0rpx;"
								:text="'转让年限 ： '+decodeURIComponent(op.zhuanRangNianXian)" />
						</l-painter-view>
						<l-painter-view
							css="position:absolute;left: 34rpx;top: 830rpx;width: 602rpx;fontSize:28rpx;color:#666666;">
							<l-painter-text :text="'是否唯一 ： '+decodeURIComponent(op.shiFouWeiYi)" />
							<l-painter-text </l-painter-view>

								<l-painter-view
									css="position:absolute;left: 0rpx;top: 920rpx;background: #DBDBDB;height: 2rpx;width: 670rpx;fontSize:28rpx;"></l-painter-view>
								<l-painter-view
									css="position:absolute;left: 34rpx;top: 940rpx;width: 602rpx;fontSize:24rpx;color:#999999;textAlign:center;">
									<l-painter-text text="*税费计算结果仅供参考，请以实际缴纳金额结果为准。" />
									<l-painter-text </l-painter-view>
								</l-painter-view>
				</l-painter>
				<view class="footer-btn">
					<view class="" @tap="back">
						返回
					</view>
					<view class="save" @click="toSave">
						保存
					</view>
				</view>
				<!-- 生成的图片 -->
				<tm-maskFlow v-model="show_1" :close="false" :position="pos">
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
			</view>

			<tm-sheet v-if="op.type == 'new'">
				<view class="title">
					<text class="type px-40 py-10">新房</text>
					<text class="des ml-15">共需额外缴费：</text>
				</view>
				<view class="money mt-30">
					{{parseInt(s.qiSui.v) + parseInt(s.wxjj.v) + parseInt(s.qsdj) + parseInt(s.gb)}} 元
				</view>

				<view class="flex-between mt-20">
					<view class="item">
						<view class="title">
							{{numFilter(op.money)}} 万
						</view>
						<view class="des">
							房屋总价
						</view>
					</view>
					<view class="item">
						<view class="title">
							{{Math.round((parseInt(op.money) / parseInt(op.mj))*1000)/1000}} 万/㎡
						</view>
						<view class="des">
							房屋单价
						</view>
					</view>
					<view class="item">
						<view class="title">
							{{numFilter(op.mj)}} ㎡
						</view>
						<view class="des">
							房屋面积
						</view>
					</view>
				</view>
			</tm-sheet>

			<tm-sheet v-if="op.type == 'new'" :padding="[0,40]">
				<view class="pb-30 ml-30">税费明细</view>

				<view class="border-grey-b-1 pl-30 py-20"
					style="line-height: 50rpx;font-size: 32rpx;font-weight: 400;color: #333333;">
					契税 ({{s.qiSui.t}})
					<text class="mr-50"
						style="float: right;font-size: 32rpx;font-weight: 400;color: #666666;">{{s.qiSui.v}}元</text>
				</view>
				<view class="border-grey-b-1 pl-30 py-20"
					style="line-height: 50rpx;font-size: 32rpx;font-weight: 400;color: #333333;">
					维修基金 ({{s.wxjj.t}} 元/㎡)
					<text class="mr-50"
						style="float: right;font-size: 32rpx;font-weight: 400;color: #666666;">{{numFilter(s.wxjj.v)}}元</text>
				</view>
				<view class="border-grey-b-1 pl-30 py-20"
					style="line-height: 50rpx;font-size: 32rpx;font-weight: 400;color: #333333;">
					权属登记费
					<text class="mr-50"
						style="float: right;font-size: 32rpx;font-weight: 400;color: #666666;">{{numFilter(s.qsdj)}}元</text>
				</view>
				<view class="border-grey-b-1 pl-30 py-20"
					style="line-height: 50rpx;font-size: 32rpx;font-weight: 400;color: #333333;">
					工本费
					<text class="mr-50"
						style="float: right;font-size: 32rpx;font-weight: 400;color: #666666;">{{numFilter(s.gb)}}元</text>
				</view>

				<view class="flex-between py-10 mt-30" style="font-size: 28rpx;color: #666666;">
					<view class="pl-30">
						购房性质：{{decodeURIComponent(op.gouFangXingZhi)}}
					</view>
					<view class="pr-30">
						房屋面积：{{op.mj}} ㎡
					</view>
				</view>
				<view class="flex-between py-10" style="font-size: 28rpx;color: #666666;">
					<view class="pl-30">
						房屋总价：{{op.money}} 万
					</view>
					<view v-if="op.type == 'rent'" class="pr-30">
						转让年限：{{decodeURIComponent(op.zhuanRangNianXian)}}
					</view>
				</view>
				<view v-if="op.type == 'rent'" class="flex-between py-10" style="font-size: 28rpx;color: #666666;">
					<view class="pl-30">
						是否唯一：{{decodeURIComponent(op.shiFouWeiYi)}}
					</view>
				</view>

				<view class="mt-20">
					<view class="py-32 text-size-s text-grey text-align-center">*税费计算结果仅供参考，请以实际缴纳金额结果为准。</view>
				</view>
			</tm-sheet>
		</view>
	</view>
</template>

<script>
	import tmSheet from '@/pagesTools/tm-vuetify/components/tm-sheet/tm-sheet.vue';
	import tmTabs from '@/pagesTools/tm-vuetify/components/tm-tabs/tm-tabs.vue';
	import tmMaskFlow from '@/pagesTools/tm-vuetify/components/tm-maskFlow/tm-maskFlow.vue';
	import lPainterView from '../../../components/l-painter-view/l-painter-view.vue';
	import lPainterText from '../../../components/l-painter-text/l-painter-text.vue';
	import lPainterImage from '../../../components/l-painter-image/l-painter-image.vue';
	import lPainterQrcode from '../../../components/l-painter-qrcode/l-painter-qrcode.vue';
	import lPainter from '../../../components/l-painter/l-painter.vue';
	import {
		gethousetaxcalculator
	} from '@/api/houst.js';

	export default {
		components: {
			tmSheet,
			tmTabs,
			tmMaskFlow,
			lPainterView,
			lPainterText,
			lPainterImage,
			lPainter,
			lPainterQrcode
		},
		data() {
			return {
				s: [],
				op: [],
				active: 0,

				pos: 'center',
				show_1: false,
				path: '', //生成的图片地址
			}
		},
		onLoad(option) {
			console.log(option, "kkkkkkkkkk");
			let that = this
			option = JSON.parse(option.e)
			console.log(option, "22222222222222");
			gethousetaxcalculator(option).then(res => {
				console.log(res, "33333333");
				that.setData({
					s: res,
					op: option
				})
			})

		},
		methods: {
			back: function() {
				uni.navigateBack({
					delta: 1
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
			numFilter(value) {
				// 截取当前数据到小数点后三位
				let tempVal = parseFloat(value).toFixed(3)
				let realVal = tempVal.substring(0, tempVal.length - 1)
				return realVal
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
		}
	};
</script>
<style lang="scss" scoped>
	@import './style.scss';
</style>
<style>
	.title {
		font-weight: bold;
		text-align: left;
		color: #ffffff;

	}

	.title .type {
		background: #13c2c2;
		color: #FFF;
		font-size: 32rpx;
		border-radius: 32rpx;
	}

	.title .des {
		color: #333333;
		font-size: 32rpx;
	}

	.money {
		font-size: 60rpx;
		font-weight: 700;
		text-align: left;
		color: #faad14;
		letter-spacing: 2rpx;
	}

	.item {
		width: 100%;
		text-align: center;
	}

	.item .title {
		font-size: 32rpx;
		font-weight: 400;
		text-align: center;
		color: #333333;
		margin-bottom: 10rpx;
	}

	.item .dex {
		font-size: 32rpx;
		font-weight: 400;
		text-align: center;
		color: #333333;
	}

	.time {
		font-size: 24rpx;
		font-weight: 400;
		text-align: left;
		color: #999999;
	}
</style>
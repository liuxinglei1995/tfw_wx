<template>
	<view class="page">
		<view>
			<view @tap="goHouseD" class="my-20 mx-30 round-5 pa-5 flex-between"
				:style="'background-color: #FFF;margin-top:180rpx;'">
				<view class="pa-20">
					<img style="width: 234rpx;height: 190rpx;" :src="'https://static.tianfucd.com/'+houselist.coverfile"
						alt="">
				</view>
				<view class="py-20 pr-20">
					<view style="font-size: 28rpx;margin-bottom: 10rpx;">
						{{houselist.title}}
					</view>
					<view style="font-size: 20rpx;font-weight: 400;color: #666666;display: flex;">
						<view class="">
							{{houselist.loupanHuxing.bedRoomNum}}室{{houselist.loupanHuxing.livingRoomNum}}厅{{houselist.loupanHuxing.bathroomNum?houselist.loupanHuxing.bathroomNum:"--"}}卫|
							{{houselist.propertyArea}}㎡ |
						</view>
						<dict-tag :options="dict.type.tfw_decoration_situation" :value="houselist.decoration" />
					</view>
					<view style="font-size: 40rpx;font-weight: bold;color: #FF0000;letter-spacing: 3rpx;float: right;">
						{{houselist.sellingPrice}} 万
					</view>
				</view>
			</view>
			<view class="my-20 mx-30 round-5 pa-5 flex-col">
				<view class="flex-between mb-20">
					<view class="djl_box round-3">
						<view class="my-20 text-align-center">
							<view style="font-size: 24rpx;color: #707070;line-height: 34rpx;">
								今日浏览量
							</view>
							<view style="font-size: 48rpx;font-weight: 700;line-height: 66rpx;">
								{{house.todayViews}}
							</view>
							<view v-if="day_type == 'up'" style="font-size: 24rpx;color: #FF0404;line-height: 34rpx;">
								相对昨日+ {{day_up}} %
							</view>
							<view v-else style="font-size: 24rpx;color: #16AE12;;line-height: 34rpx;">
								相对昨日- {{day_down}} %
							</view>
						</view>
					</view>
					<view class="djl_box round-3">
						<view class="my-20 text-align-center">
							<view style="font-size: 24rpx;color: #707070;line-height: 34rpx;">
								本月浏览量
							</view>
							<view style="font-size: 48rpx;font-weight: 700;line-height: 66rpx;">
								{{house.thisMonthViews}}
							</view>
							<view v-if="month_type == 'up'" style="font-size: 24rpx;color: #FF0404;line-height: 34rpx;">
								相对上月+ {{month_up}} %
							</view>
							<view v-else style="font-size: 24rpx;color: #16AE12;;line-height: 34rpx;">
								相对上月- {{month_down}} %
							</view>
						</view>
					</view>
				</view>
				<view class="flex-between">
					<view class="djl_box round-3">
						<view class="my-34 text-align-center">
							<view style="font-size: 28rpx;color: #707070;line-height: 34rpx;">
								昨日浏览量
							</view>
							<view style="font-size: 48rpx;font-weight: 700;line-height: 66rpx;">
								{{house.yesterdayViews}}
							</view>
						</view>
					</view>
					<view class="djl_box round-3">
						<view class="my-34 text-align-center">
							<view style="font-size: 28rpx;color: #707070;line-height: 34rpx;">
								总浏览量
							</view>
							<view style="font-size: 48rpx;font-weight: 700;line-height: 66rpx;">
								{{house.totalViews}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="my-20 mx-30 round-5 pa-5" style="background-color: #FFF;">
				<canvas canvas-id="tTWVQWppPCvLAzkTeDBGWEHXoCzaBvtg" id="tTWVQWppPCvLAzkTeDBGWEHXoCzaBvtg"
					class="charts" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" />
			</view>
			<view class="my-20 mx-30 round-5 pa-5 pt-50" style="background-color: #FFF;">
				<tm-timeline :list="list" model="left"></tm-timeline>
			</view>
			<!-- <tm-menubars title="调价记录" :transparent="false" iconColor="white"></tm-menubars> -->
			<u-navbar title="调价记录" :placeholder="true" :autoBack="true" bgColor="#00aaff"
				:titleStyle="{ color: '#FFF', fontSize: '32rpx' }" leftIconColor="white">
			</u-navbar>
		</view>
		<!-- 	<view class="py-20 px-20">
			<tm-menubars title="调价记录" :transparent="false" iconColor="white"></tm-menubars>
			<tm-skeleton v-for="(item,index) in 2" :key="index" model='cardActions' color="white"></tm-skeleton>
		</view> -->
	</view>
</template>

<script>
import UNavbar from "@/pagesHouse/uview-ui/components/u-navbar/u-navbar.vue";
	import uCharts from '../js_sdk/u-charts/u-charts.js';
	import tmTimeline from '@/pagesHouse/tm-vuetify/components/tm-timeline/tm-timeline.vue';
	import tmSkeleton from '@/pagesHouse/tm-vuetify/components/tm-skeleton/tm-skeleton.vue';
	import {
		pricelist
	} from '@/api/houst.js'
	var uChartsInstance = {};
	export default {
		dicts: ['tfw_decoration_situation'],
		data() {
			return {
				customBar: this.$store.state.customBar,
				cWidth: 680,
				cHeight: 500,
				house: [],
				houselist: [],
				list: [],
				month_type: "up",
				day_type: "up",
				day_up: 0,
				day_down: 0,
				month_up: 0,
				month_down: 0,
				chartData: {
					"categories": [],
					"series": []
				},
				// chartData: {
				// 	"categories": ["2012", "2013", "2014", "2015", "2016", "2017"],
				// 	"series": [{
				// 		"name": "成交量A",
				// 		"data": [35, 8, 25, 37, 4, 20]
				// 	}]
				// }
			};
		},
		components: {
      UNavbar,
			tmTimeline,
			tmSkeleton
		},
		onReady() {
			//这里的 750 对应 css .charts 的 width
			this.cWidth = uni.upx2px(680);
			//这里的 500 对应 css .charts 的 height
			this.cHeight = uni.upx2px(500);
		},
		onLoad(option) {
			let that = this
			console.log(option.id, "11111");
			pricelist({
				houseId: option.id
			}).then(res => {
				this.house = res.map;
				this.houselist = res.house;
				console.log(res, "2222222");
				let data = res.rows;
				let seriesdata = {
					name: "售价",
					data: [],
					formatter: function(value, index, series, opts) {
						return value + '万'
					}
				}
				data.forEach((item, index) => {
					this.chartData.categories.push(new Date(item.adjustmentDate).toLocaleDateString())
					seriesdata.data.push(item.newPrice)
					let color=""
					if(item.type==1){
						color="green"
					}else{
						color="red"
					}
					let listdata = {
						title: item.reason+"万", //标题
						content: '原价:'+item.oldPrice+'万,修改后为:'+item.newPrice+'万', //内容
						size: 24, //节点大小，字段，不存在时，使用默认的值。,单位upx
						time: item.adjustmentDate, //时间标题
						color: color, //主题色，默认primary
						borderColor: '' ,//如果此字段没有，将使用默认的。
						icon: 'icon-position-fill', //圆点中的图标
						iconSize: 36, //圆点中图标的大小，默认为24,单位upx
					}
					this.list.push(listdata)
				});
				this.chartData.series.push(seriesdata)
				this.drawCharts('tTWVQWppPCvLAzkTeDBGWEHXoCzaBvtg', this.chartData);
			})
		},
		methods: {
			// goHouseD: function() {
			// 	let that = this
			// 	uni.navigateTo({
			// 		url: '/pagesHouse/esHouseDetail/esHouseDetail?id=' + that.house.id
			// 	});
			// },
			drawCharts(id, data) {
				const ctx = uni.createCanvasContext(id, this);
				uChartsInstance[id] = new uCharts({
					type: "line",
					context: ctx,
					width: this.cWidth,
					height: this.cHeight,
					categories: data.categories,
					series: data.series,
					animation: true,
					timing: "easeOut",
					duration: 1000,
					rotate: false,
					rotateLock: false,
					background: "#FFFFFF",
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [10, 10, 15, 10],
					fontSize: 13,
					fontColor: "#666666",
					dataLabel: true,
					dataPointShape: true,
					dataPointShapeType: "solid",
					touchMoveLimit: 60,
					enableScroll: true,
					enableMarkLine: true,
					legend: {
						show: true,
						position: "top",
						float: "right",
						padding: 5,
						margin: 5,
						backgroundColor: "rgba(0,0,0,0)",
						borderColor: "rgba(0,0,0,0)",
						borderWidth: 0,
						fontSize: 13,
						fontColor: "#666666",
						lineHeight: 11,
						hiddenColor: "#CECECE",
						itemGap: 10
					},
					xAxis: {
						disableGrid: true,
						disabled: false,
						axisLine: true,
						axisLineColor: "#CCCCCC",
						calibration: false,
						fontColor: "#666666",
						fontSize: 13,
						rotateLabel: false,
						rotateAngle: 45,
						itemCount: 3,
						boundaryGap: "center",
						splitNumber: 5,
						gridColor: "#CCCCCC",
						gridType: "solid",
						dashLength: 4,
						gridEval: 1,
						scrollShow: false,
						scrollAlign: "right",
						scrollColor: "#A6A6A6",
						scrollBackgroundColor: "#EFEBEF",
						formatter: ""
					},
					yAxis: {
						gridType: "dash",
						dashLength: 2,
						disabled: false,
						disableGrid: false,
						splitNumber: 5,
						gridColor: "#CCCCCC",
						padding: 10,
						showTitle: false,
						data: [{
							unit: "万"
						}]
					},
					extra: {
						line: {
							type: "curve",
							width: 2
						},
						tooltip: {
							showBox: true,
							showArrow: true,
							showCategory: false,
							borderWidth: 0,
							borderRadius: 0,
							borderColor: "#000000",
							borderOpacity: 0.7,
							bgColor: "#000000",
							bgOpacity: 0.7,
							gridType: "solid",
							dashLength: 4,
							gridColor: "#CCCCCC",
							fontColor: "#FFFFFF",
							splitLine: true,
							horizentalLine: false,
							xAxisLabel: false,
							yAxisLabel: false,
							labelBgColor: "#FFFFFF",
							labelBgOpacity: 0.7,
							labelFontColor: "#666666"
						},
						markLine: {
							type: "solid",
							dashLength: 4,
							data: []
						}
					}
				});
			},
			touchstart(e) {
				uChartsInstance[e.target.id].scrollStart(e);
			},
			touchmove(e) {
				uChartsInstance[e.target.id].scroll(e);
			},
			touchend(e) {
				uChartsInstance[e.target.id].scrollEnd(e);
				uChartsInstance[e.target.id].touchLegend(e);
				uChartsInstance[e.target.id].showToolTip(e);
			}
		}
	};
</script>

<style scoped>
	page {
		background-color: #F0F0F0 !important;
	}

	.charts {
		width: 690rpx;
		height: 510rpx;
	}

	.djl_box {
		width: 330rpx;
		height: 174rpx;
		background-color: #FFF;
	}
</style>

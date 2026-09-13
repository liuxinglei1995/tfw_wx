<template>
	<view class="">
		<tm-menubars title="周边" iconColor="white" :transparent="true"></tm-menubars>
		<tm-sheet id="map" :margin="[0,0]" :padding="[0,0]">
			<map id="myMap" style="width:100%;height:65vh;" :markers="markers" :latitude="latitude"
				:longitude="longitude" :scale='scale' v-if="isshowmap">
			</map>
			<view class="flex-around" style="font-size: 20rpx;color: #757575;">
				<view v-for="(item,index) in iconMeun" @tap="toMap" :data-img="item.img" :data-name="item.name"
					:data-keyword="item.keyword" style="text-align: center;padding: 10rpx;"
					:class="item.name==selectName?'select':''">
					<view :class="'iconfont '+ item.icon" style="font-size: 40rpx;margin-bottom: 5rpx;"></view>
					<view>{{item.name}}</view>
				</view>
			</view>
		</tm-sheet>
		<tm-sheet :margin="[0,0]" :padding="[0,0]">
			<scroll-view scroll-y="true" :style="'height:'+listHeight+'px'" class="scroll-Y">
				<view class="list">
					<view v-for="(listItem,index) in resultList" class="border-b-1"
						style="margin-top: 10rpx;padding: 10rpx;">
						<view class="flex-between">
							<view class="listTitle">
								{{listItem.title}}
							</view>
							<view class="listDistance">
								步行 {{distance!=[]?distance[index].distance:'--'}} 米
							</view>
						</view>
						<view v-if="listItem.address" class="listDes">
							{{listItem.address}}
						</view>
					</view>

				</view>
			</scroll-view>
		</tm-sheet>
	</view>
</template>

<script>
	import {
		getlpxq
	} from '@/api/houst.js';
	import tmSheet from '@/tm-vuetify/components/tm-sheet/tm-sheet.vue';
	var app = getApp();
	var utils = require("../../utils/util.js")
	let QQMapWS = require("../../js_sdk/skyrrrt-ws-jssdk/qqmap-ws-jssdk.js"); // 实例化API核心类
	// 实例化API核心类
	let qqmapsdk = new QQMapWS.default({
		key: 'XJTBZ-XW5K4-5KBU6-D37VL-LAHGF-RSBBI'
	});

	export default {
		components: {
			tmSheet
		},
		data() {
			return {
				listHeight: 0,
				ishowlist: false,
				resultList: [],
				distance: [],
				isshowmap: false,
				selectName: '公交',
				selectImg: 'gj.png',
				selectKey: '公交站',
				'iconMeun': [{
						'name': '公交',
						'keyword': '公交站',
						'icon': 'icon-Transportation-13',
						'img': 'gj.png'
					},
					{
						'name': '地铁',
						'keyword': '地铁站',
						'icon': 'icon-ditie',
						'img': 'dt.png'
					},
					{
						'name': '学校',
						'keyword': '学校',
						'icon': 'icon-daxue',
						'img': 'xx.png'
					},
					{
						'name': '医院',
						'keyword': '医院',
						'icon': 'icon-yiyuan',
						'img': 'yy.png'
					},
					{
						'name': '银行',
						'keyword': '银行',
						'icon': 'icon-021-bank',
						'img': 'yh.png'
					},
					{
						'name': '休闲娱乐',
						'keyword': '休闲娱乐',
						'icon': 'icon-jianshenfang',
						'img': 'xxyl.png'
					},
					{
						'name': '购物',
						'keyword': '购物',
						'icon': 'icon-shangchang',
						'img': 'gw.png'
					},
				],
				'markers': [{
					callout: {
						'content': '测试',
						'display': 'ALWAYS'
					},
					latitude: "39.980014",
					longitude: "116.313972",
					iconPath: "https://cdn.tianfucd.com/images/applet/dingwei.png", //图标路径
					width: 20,
					height: 20
				}],
				latitude: 39.980014,
				longitude: 116.313972,
				scale: 13
			};
		},
		onLoad(options) {
			console.log(options,"jjjjjjjjjjjjjjjjjjjjjj");
			let that = this
			getlpxq(options.id).then(res => {
				console.log(res,"ssssssssssssssss");
				if (res != '' && res != null) {
					qqmapsdk.reverseGeocoder({
						location: {
							latitude: res.data.lat,
							longitude: res.data.lon
						},
						get_poi: 0,
						coord_type: 6,
						success: function(locaRes) {
							let markers = [];
							let thisMark = {
								callout: {
									'content': res.data.title,
									'display': 'ALWAYS',
									'borderRadius': '25',
									'bgColor': '#3fbaa6',
									'color': '#FFF',
									'padding': '10'
								},
								latitude: res.data.lat,
								longitude: res.data.lon,
								iconPath: "https://cdn.tianfucd.com/images/applet/dingwei.png", //图标路径
								width: 20,
								height: 20
							};

							markers.push(thisMark)
							that.setData({
								latitude: res.data.lat,
								longitude: res.data.lon,
								markers: markers,
								thisMark: thisMark
							})
							that.nearby_search("公交")
							that.isshowmap = true
						}
					});

				}
			});
		},
		mounted() {
			let that = this
			const query = uni.createSelectorQuery().in(this);
			uni.getSystemInfo({
				success: function(res) {
					query.select('#map').boundingClientRect(data => {
						that.setData({
							'listHeight': res.screenHeight - data.height
						})
					}).exec();
				}
			});
		},
		methods: {
			/**
			 * 切换筛选
			 * @param {Object} e
			 */
			toMap: function(e) {
				let that = this
				that.setData({
					selectName: e.currentTarget.dataset.name,
					selectImg: e.currentTarget.dataset.img,
					selectKey: e.currentTarget.dataset.keyword
				})
				that.nearby_search()
			},
			// 事件触发，调用接口
			nearby_search: function() {
				var _this = this;
				// 调用接口
				qqmapsdk.search({
					keyword: _this.selectKey, //搜索关键词
					location: _this.latitude + ',' + _this.longitude, //设置周边搜索中心点
					rectangle: (Number(_this.latitude) - 0.02) + "," + (Number(_this.longitude) - 0.02) + "," +
						(Number(_this.latitude) + 0.02) + "," + (Number(_this.longitude) + 0.02),
					success: function(res) { //搜索成功后的回调
						console.log(res,"00000");
						var mks = []
						var to = []
						mks.push(_this.thisMark)
						for (var i = 0; i < res.data.length; i++) {
							mks.push({ // 获取返回结果，放到mks数组中
								callout: {
									'content': res.data[i].title,
									'display': 'BYCLICK',
									'borderRadius': '25',
									'bgColor': '#3fbaa6',
									'color': '#FFF',
									'padding': '10'
								},
								id: res.data[i].id,
								latitude: res.data[i].location.lat,
								longitude: res.data[i].location.lng,
								iconPath: "/static/img/icon/" + _this.selectImg, //图标路径
								width: 26,
								height: 32
							})
							to.push({
								latitude: res.data[i].location.lat,
								longitude: res.data[i].location.lng,
							})
						}
						qqmapsdk.calculateDistance({
							mode: 'walking',
							from: {
								latitude: _this.latitude,
								longitude: _this.longitude
							},
							to: to,
							success: function(res) {
								_this.setData({
									distance: res.result.elements
								})
							},
						})
						_this.setData({ //设置markers属性，将搜索结果显示在地图中
							markers: mks,
							resultList:res.data,
						})
						console.log();
					}
				});
			}
		}
	};
</script>

<style>
	@import url("../static/iconfont/iconfont.css");

	.list {
		padding: 20rpx 20rpx;
	}

	.listTitle {
		font-size: 22rpx;
		font-weight: 600;
		line-height: 40rpx;
	}

	.listDistance {
		font-size: 20rpx;
		line-height: 40rpx;
		color: #757575;
	}

	.listDes {
		font-size: 20rpx;
		font-weight: 600;
		color: #757575;
		line-height: 36rpx;
	}

	.select {
		color: #30bcbc;
	}
</style>
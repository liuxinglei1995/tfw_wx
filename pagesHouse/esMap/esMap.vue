<template>
	<view class="">
		<tm-menubars title="周边" iconColor="white" :transparent="true"></tm-menubars>
		<tm-sheet id="map" :margin="[0,0]" :padding="[0,0]">
			<map id="myMap" style="width:100%;height:65vh;" :markers="markers" :latitude="latitude"
				:longitude="longitude" :scale='scale'>
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
								步行 {{listItem.distance}} 米
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
		data() {
			return {
				listHeight: 0,
				resultList: [],
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
						'name': '医疗',
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
						'keyword': '娱乐',
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
				scale: 16
			};
		},
		components: {
			tmSheet
		},
		onLoad(options) {
			// console.log("44444");
			getlpxq(options.id).then(res => {
					if (res != '' && res != null) {
						let markers = [];
						let thisMark = {
								callout: {
									'content': res.xq,
									'display': 'ALWAYS',
									'borderRadius': '25',
									'bgColor': '#3fbaa6',
									'color': '#FFF',
									'padding': '10'
								},
								latitude: res.lat,
								longitude: res.lng,
								iconPath: "https://cdn.tianfucd.com/images/applet/dingwei.png", //图标路径
								width: 20,
								height: 20,
							};
						markers.push(thisMark)
					this.latitude = res.lat,
				this.longitude = res.lng,
				this.markers = markers,
				this.thisMark = thisMark ,
				that.nearby_search("公交")
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
			 * 附近位置最大最小经纬度计算 
			 * @param   longitude  经度
			 * @param   latitude   纬度
			 * @param   distince    距离（千米）
			 * @returns 格式：经度最小值-经度最大值-纬度最小值-纬度最大值
			 */
			getMaxMinLongitudeLatitude(longitude, latitude, distince) {
				console.log("MaxMinLongitudeLatitude", longitude, latitude);
				let r = 6371.393; // 地球半径千米
				let lng = longitude;
				let lat = latitude;
				let dlng = 2 * Math.asin(Math.sin(distince / (2 * r)) / Math.cos(lat * Math.PI / 180));
				dlng = dlng * 180 / Math.PI; // 角度转为弧度
				let dlat = distince / r;
				dlat = dlat * 180 / Math.PI;
				let minlat = lat - dlat;
				let maxlat = lat + dlat;
				let minlng = lng - dlng;
				let maxlng = lng + dlng;
				return {
					minlng: minlng,
					maxlng: maxlng,
					minlat: minlat,
					maxlat: maxlat
				}
			},
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
			/*
			 * @description    根据某个字段实现对json数组的排序
			 * @param   array  要排序的json数组对象
			 * @param   field  排序字段（此参数必须为字符串）
			 * @param   reverse 是否倒序（默认为false）
			 * @return  array  返回排序后的json数组
			 */
			jsonSort: function(array, field, reverse, isStr) {
				//数组长度小于2 或 没有指定排序字段 或 不是json格式数据
				if (array.length < 2 || !field || typeof array[0] !== "object") return array;
				if (isStr) {
					array.sort(function(x, y) {
						return x[field].localeCompare(y[field])
					});
				} else {
					array.sort(function(x, y) {
						return x[field] - y[field]
					});
				}
				//倒序
				if (reverse) {
					array.reverse();
				}
				return array;
			},
			// 事件触发，调用接口
			nearby_search: function() {
				var _this = this;
				// 调用接口
				let atAng = _this.getMaxMinLongitudeLatitude(_this.longitude, _this.latitude, 2)
				qqmapsdk.search({
					keyword: _this.selectKey, //搜索关键词
					page_size: 30,
					location: _this.latitude + ',' + _this.longitude, //设置周边搜索中心点
					rectangle: atAng.minlat + ',' + atAng.minlng + ',' + atAng.maxlat + ',' + atAng.maxlng,
					success: function(res) { //搜索成功后的回调
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
								iconPath: "/pagesHouse/static/img/icon/" + _this.selectImg, //图标路径
								width: 26,
								height: 32
							})
							to.push({
								latitude: res.data[i].location.lat,
								longitude: res.data[i].location.lng,
							})
						}
						var ret = res.data;
						qqmapsdk.calculateDistance({
							mode: 'walking',
							from: {
								latitude: _this.latitude,
								longitude: _this.longitude
							},
							to: to,
							success: function(res) {
								for (var ii = 0; ii < ret.length; ii++) {
									var key = 'distance'
									ret[ii][key] = res['result']['elements'][ii][key]
								}
								ret = _this.jsonSort(ret, 'distance', false, false)
							},
						})
						_this.setData({ //设置markers属性，将搜索结果显示在地图中
							markers: mks,
							resultList: res.data
						})
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
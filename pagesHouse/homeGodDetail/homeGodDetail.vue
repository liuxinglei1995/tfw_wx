<template>
	<view>
		<tm-menubars :title="houseDetail.xq" iconColor="white"></tm-menubars>
		<view class="" style="">
			<swiper class="swiper" :indicator-dots="true" indicator-color="#fff" indicator-active-color="#3fbaa6" style="height: 430rpx;">
				<swiper-item v-if="houseDetail.video">
					<video id="myVideo" :src="houseDetail.video"  controls></video>
				</swiper-item>
				<swiper-item :item-id="'p'+index" v-for="(swiperTtem,index) in houseDetail.imgs">
					<tm-images :width="750" :height="563" :previmage="false" @click="previewOpen(swiperTtem,false)" :src="swiperTtem" model="scaleToFill"></tm-images>
				</swiper-item>
			</swiper>
		</view>
		<view class="content">
			<view class="flex-between py-20">
				<view class="text-weight-b text-size-xl">
					{{houseDetail.tit}}
				</view>
				<view class="flex-center" style="width: 170rpx;height: 80rpx;">
					<view class="flex-col flex-center" style="width: 85rpx;" @tap="shareShow = true">
						<tm-icons size="42" :dense="true" name="icon-share"></tm-icons>
						<view class="rt1">分享</view>
					</view>
					<view class="flex-col flex-center" style="width: 85rpx;" @tap="userCollect">
						<tm-icons name="icon-collection" :dense="true" size="42" :color="collect?'red':''"></tm-icons>
						<view :class="'rt1 ' + (collect?'red':'')">收藏</view>
					</view>
				</view>
			</view>
			<view class="flex-start">
				<view class="tags" style="background-color: #ff8b26;color: #FFF;">
					{{houseDetail.lpzt}}
				</view>
				<view class="tags" v-for="(item1,index) in houseDetail.jzlb" :key="index">
					{{item1}}
				</view>
			</view>
			<view class="flex-between">
				<view class="inputItem">
					<text>{{houseDetail.money1?houseDetail.money1:'--'}} 元/㎡</text>
					<text class="c">参考单价</text>
				</view>
				<view class="inputItem be">
					<text>{{(houseDetail.qjmj?((houseDetail.qjmj).split("-"))[0] * houseDetail.money1 / 10000:'--') | totalPrice}}万起</text>
					<text class="c">参考总价</text>
				</view>
				<view class="inputItem be">
					<text>{{houseDetail.qjmj?((houseDetail.qjmj).split("-"))[0]:'--'}}m²</text>
					<text class="c">最小面积</text>
				</view>
			</view>
			<view class="i" style="margin-top: 20rpx;">
				<view class="it">
					<text>产权年限：</text>
					<text>{{houseDetail.cq?houseDetail.cq:'--'}} 年</text>
				</view>
				<view class="it">
					<text>总栋数：</text>
					<text>{{houseDetail.dong?houseDetail.dong:'--'}} 栋</text>
				</view>
				<view class="it">
					<text>开盘时间：</text>
					<text>{{houseDetail.kpsj?houseDetail.kpsj:'--'}}</text>
				</view>
				<view class="it">
					<text>交房时间：</text>
					<text>{{houseDetail.rzsj?houseDetail.rzsj:'--'}}</text>
				</view>
				<view class="it">
					<text>物业费：</text>
					<text>{{houseDetail.wyf?houseDetail.wyf:'--'}}元/㎡</text>
				</view>
				<view class="w">
					<text>附近学校：</text>
					<text v-for="(item,index) in schools" :key="index">
						<text style="color: #333;" v-if="index<2">
							{{item.title}}( {{item._distance}} 米 ) , 
						</text>
					</text>
				</view>
				<view class="w">
					<text>附近地铁：</text>
					<text v-for="(item,index) in ditie" :key="index">
						<text style="color: #333;" v-if="index<2">
							{{item.title}}( {{item._distance}} 米 ) , 
						</text>
					</text>
				</view>
				
				<view class="w" @tap="toMap(houseDetail.id)">
					<text>楼盘地址：</text>
					<text>{{houseDetail.xqadd?houseDetail.xqadd:'--'}}</text>
					<tm-icons style="float: right;" name="icon-angle-right" size="28"></tm-icons>
				</view>
			</view>
			
			<view v-if="houseDetail.hxlist && houseDetail.hxlist.length > 0" class="side">在售户型 ( {{houseDetail.hxlist != ''?houseDetail.hxlist.length:0}} )</view>
			

			<tm-row v-if="houseDetail.hxlist && houseDetail.hxlist.length > 0">
				<scroll-view class='scrollContainer' scroll-x :show-scrollbar="true" @scroll="scroll">
					<view class='scrollitem' v-for="(hxItem, index) in houseDetail.hxlist" :key="index">
						<tm-images :width="300" :height="225" :src="hxItem.images"></tm-images>
						<view class="pt-10 pl-10" style="font-size: 32rpx;font-weight: bold;color: #333333;">
							{{hxItem.hx1}}室{{hxItem.hx2}}厅{{hxItem.hx3}}厨{{hxItem.hx4}}卫
						</view>
						<view class="pt-10 pl-10" style="font-size: 24rpx;color: 333;">
							<text class="mr-20">{{hxItem.mj}} ㎡</text><text>{{hxItem.zxqk}}</text>
						</view>
						<view style="width: 280rpx;font-size: 24rpx;color: 333;text-align: right;margin-top: 25rpx;">
							预估总价：<text style="font-size: 40rpx;font-weight: bold;color: #E20000;">{{hxItem.money1}}万 </text> 起
						</view>
					</view>
				</scroll-view>
				<progress :percent="percent" border-radius="10" stroke-width="8" backgroundColor="#999" activeColor="#30bcbc" />
			</tm-row>


			<view class="side">楼盘信息</view>
			<view class="i" style="margin-top: 20rpx;">
				<view class="it">
					<text>建面：</text>
					<text>{{houseDetail.jzmj?houseDetail.jzmj:'-- m²'}}</text>
				</view>
				<view class="it">
					<text>容积率：</text>
					<text>{{houseDetail.rjl?houseDetail.rjl:'--'}} %</text>
				</view>
				<view class="it">
					<text>占地面积：</text>
					<text>{{houseDetail.zdmj?houseDetail.zdmj:'-- 亩'}}</text>
				</view>
				<view class="it">
					<text>绿化率：</text>
					<text>{{houseDetail.lhl?houseDetail.lhl:'--'}}</text>
				</view>
				<view class="it">
					<text>总户数：</text>
					<text>{{houseDetail.zhs?houseDetail.zhs:'--'}} 户</text>
				</view>
				<view class="it">
					<text>公摊比：</text>
					<text>{{houseDetail.gtmj?houseDetail.gtmj:'--'}}</text>
				</view>
				<view class="it">
					<text>车位数：</text>
					<text>{{houseDetail.tcw?houseDetail.tcw:'--'}}</text>
				</view>
				<view class="it">
					<text>车位比：</text>
					<text>{{houseDetail.cwb?houseDetail.cwb:'--'}}</text>
				</view>
				
				<view class="w">
					<text>物管公司：</text>
					<text>{{houseDetail.wygs?houseDetail.wygs:'--'}}</text>
				</view>
				<view class="w">
					<text>开发商：</text>
					<text>{{houseDetail.kfs?houseDetail.kfs:'--'}}</text>
				</view>
				<view class="w">
					<text>楼盘地址：</text>
					<text>{{houseDetail.xqadd?houseDetail.xqadd:'--'}}</text>
				</view>
			</view>

			<view class="side">位置与周边</view>
			<map-mini 
			:latitude="parseFloat(houseDetail.lat)"
			:longitude="parseFloat(houseDetail.lng)"
			:markers="markers"
			:fangId="houseDetail.id" 
			:scale="houseDetail.zbdj"></map-mini>
			<view class="side">房源描述</view>
			<tm-tabs align="left" @change="tabChange" v-model="activeIndex" :list="['项目介绍','周边配套','交通状况']"></tm-tabs>
			<tm-sheet :margin="sheetMargin">
				<scroll-view scroll-y="true" style="height: 400rpx;" class="scroll-Y" >
					<mp-html v-if="activeIndex == 0" class="sideInfo" :content="houseDetail.txt" />
					<mp-html v-if="activeIndex == 1" class="sideInfo" :content="houseDetail.zb" />
					<mp-html v-if="activeIndex == 2" class="sideInfo" :content="houseDetail.jtzk" />
				</scroll-view>
			</tm-sheet>
		</view>
		<!-- 划线分割 -->
		<view class="divLine"></view>
		<!-- 二手房 -->
		<home-List-Item v-bind:homeListItem="personalHousing" :homeFeuer="homeES"></home-List-Item>
		
		<!-- 划线分割 -->
		<view class="divLine"></view>
		<!-- 看新房 -->
		<home-god-list v-bind:newHouseListItem="nearbyNewHouse" :homeFeuer="homeNew"></home-god-list>
		
		<view class="g"></view>
		<view class="footer2 ">
			<view class="n" @tap="shop(houseDetail.uid)">
				<image :src="houseDetail.lxrtx" mode="aspectFill"></image>
				<view class="n1">
					<text>{{houseDetail.lxr}}</text>
					<text>{{houseDetail.typeip}}</text>
				</view>
			</view>
			<button @tap="call(houseDetail.lxrmot)" class="btn2">交易服务</button>
			<button class="btn3" @tap="call(houseDetail.lxrmot)">预约看房</button>
		</view>
		<previewImage ref="previewImage" :imgs="houseDetail.imgs" :descs="houseDetail.descs" :saveBtn="false" :rotateBtn="false"></previewImage>
		<tm-shareSheet @change="shereClick" :actions="shareAct" v-model="shareShow"></tm-shareSheet>
	</view>
</template>
<script>
	var app = getApp();
	import homeListItem from "@/components/homeListItem/homeListItem";
	import homeGodList from "@/components/homeGodList/homeGodList";
	import mapMini from "../components/mapMini/mapMini.vue";
	import tmImages from '@/tm-vuetify/components/tm-images/tm-images.vue';
	import tmSheet from '@/tm-vuetify/components/tm-sheet/tm-sheet.vue';
	import tmTabs from '@/tm-vuetify/components/tm-tabs/tm-tabs.vue';
	import tmCol from '@/tm-vuetify/components/tm-col/tm-col.vue';
	import tmRow from '@/tm-vuetify/components/tm-row/tm-row.vue';
	import tmIcons from '@/tm-vuetify/components/tm-icons/tm-icons.vue';
	import tmShareSheet from '@/tm-vuetify/components/tm-shareSheet/tm-shareSheet.vue';
	import tmMenubars from '@/tm-vuetify/components/tm-menubars/tm-menubars.vue';
	import tmPoup from '@/tm-vuetify/components/tm-poup/tm-poup.vue';
	import previewImage from '@/components/kxj-previewImage/kxj-previewImage.vue';
	
	let QQMapWS = require("../../js_sdk/skyrrrt-ws-jssdk/qqmap-ws-jssdk.js"); // 实例化API核心类
	// 实例化API核心类
	let qqmapsdk = new QQMapWS.default({
		key: 'XJTBZ-XW5K4-5KBU6-D37VL-LAHGF-RSBBI'
	});
	

	export default {
		components: {
			tmPoup,mapMini,homeListItem,homeGodList,tmImages,tmSheet,tmTabs,tmCol,
			tmRow,tmIcons,tmShareSheet,tmMenubars,previewImage
		},
		data() {
			return {
				schools:[],
				ditie:[],
				markers:[],
				homeES: [{
					title01: "二手房",
					title02: "查看更多",
					more:"/pages/index/rentouthouse/rentouthouse",
					type: 1,
					img: "/static/assets/svg/fhui.svg"
				}],
				homeNew: [{
					title01: "精选新房",
					title02: "查看更多",
					more:'/pagesHouse/newhouse/newhouse',
					img: "/static/assets/svg/fhui.svg"
				}],
				shareAct: [
					[
						// #ifdef MP-WEIXIN
						{name: "微信",bgcolor: "#07c160",icon: "icon-weixin",color: "white"},
						// #endif
						// #ifndef MP-WEIXIN
						{name: "微信",bgcolor: "#07c160",icon: "icon-weixin",color: "white"},
						{name: "朋友圈",bgcolor: "#04c887",icon: "icon-pengyouquan",color: "white"},
						{name: "微博",bgcolor: "#e91e38",icon: "icon-weibo",color: "white"},
						{name: "QQ",bgcolor: "#1dc0fd",icon: "icon-QQ",color: "white"},
						// #endif
					],
					[
						{name: "分享海报",bgcolor: "#f5f5f5",icon: "icon-picture",color: "grey-darken-1"},
						{name: "复制链接",bgcolor: "#f5f5f5",icon: "icon-connection",color: "grey-darken-1"},
						{name: "二维码",bgcolor: "#f5f5f5",icon: "icon-qrcode",color: "grey-darken-1"},
					]
				],
				assetsPath : uni.getStorageSync('siteConfigs')['assetsPath'],
				shareShow:false,
				
				activeIndex:0,
				sheetMargin:[0.0],
				
				houseDetail:[],
				/**
				 * 页面的初始数据
				 */
				collect: false,
				personalHousing: [],
				nearbyNewHouse: [],
				currentInexs: 0,
				
				thisUser:[],
				
				
				yzShow:false,
				
				houseFollow:[],
				OwnerInfo:{},
				
				percent: 5,
			};
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},

		
		props: {},
		
		onLoad: function(options) {
			let that = this
			const id = options.id?options.id:options.scene
			console.log(options)
			if(options.id){
				const id = options.id;
				if((id != null && id != '' && id > 0)){
					that.getHouseDetail(id)
				}else{
					uni.navigateTo({
						url: "/pagesHouse/newhouse/newhouse"
					});
				}
			}else{
				var scene = options.scene.split('_')
				const id = scene[0];
				if((id != null && id != '' && id > 0)){
					that.getHouseDetail(id,scene[1])
				}else{
					uni.navigateTo({
						url: "/pagesHouse/newhouse/newhouse"
					});
				}
			}
		},
		filters:{
			totalPrice(value) {
				let realVal = Number(value).toFixed(1)
				return Number(realVal)
			}
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			this.getNewHousrRecommend()
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
		onShareAppMessage(res) {
			let houseDetail = this.houseDetail
			let thisUser = this.thisUser
		    return {
				title: houseDetail.xq + ' 【' + houseDetail.qjmj + '㎡】 【参考单价 ：'+houseDetail.money1+' 元/㎡】' ,
				imageUrl:houseDetail.images[0],
				path: '/pagesHouse/homeGodDetail/homeGodDetail?scene='+houseDetail.id
		    }
		},
		methods: {
			/**
			 * 滑动户型列表
			 * @param {Object} event
			 */
			scroll(event) {
				var num1 = event.detail.scrollWidth / 2
				var num2 = event.detail.scrollLeft
				var p = (num2 / num1) * 100;
				this.percent = p;
				if (p === 0) {
					this.percent = 5;
				}
			},
			previewOpen(e,ifhx) {
				let that = this
				if(ifhx){
					that.$refs.previewHx.open(e);
					return;
				}else{
					that.$refs.previewImage.open(e);
					return;
				}
			},
			/**
			   * 附近位置最大最小经纬度计算 
			   * @param   longitude  经度
			   * @param   latitude   纬度
			   * @param   distince    距离（千米）
			   * @returns 格式：经度最小值-经度最大值-纬度最小值-纬度最大值
			*/
			getMaxMinLongitudeLatitude(longitude,latitude,distince){
			    console.log("MaxMinLongitudeLatitude",longitude,latitude);
			    let r = 6371.393;    // 地球半径千米
			    let lng = longitude;
			    let lat = latitude;
			    let dlng = 2 * Math.asin(Math.sin(distince / (2 * r)) / Math.cos(lat * Math.PI / 180));
			    dlng = dlng * 180 / Math.PI;// 角度转为弧度
			    let dlat = distince / r;
			    dlat = dlat * 180 / Math.PI;
			    let minlat = lat - dlat;
			    let maxlat = lat + dlat;
			    let minlng = lng - dlng;
			    let maxlng = lng + dlng;
				return {
					minlng:minlng,
					maxlng:maxlng,
					minlat:minlat,
					maxlat:maxlat
				}
			},
			/*
			* @description    根据某个字段实现对json数组的排序
			* @param   array  要排序的json数组对象
			* @param   field  排序字段（此参数必须为字符串）
			* @param   reverse 是否倒序（默认为false）
			* @return  array  返回排序后的json数组
			*/
			jsonSort:function(array, field, reverse,isStr) {
			    //数组长度小于2 或 没有指定排序字段 或 不是json格式数据
			    if(array.length < 2 || !field || typeof array[0] !== "object") return array;
			    if(isStr) {
			        array.sort(function(x, y) { return x[field].localeCompare(y[field])});
			    }else{
			        array.sort(function(x, y) { return x[field] - y[field]});
			    }
			    //倒序
			    if(reverse) {
			        array.reverse();
			    }
			    return array;
			},
			// 事件触发，调用接口
			nearby_search: function(lat,lng) {
				var _this = this;
				// 调用接口
				let atAng = _this.getMaxMinLongitudeLatitude(lng,lat,2)
				qqmapsdk.search({
					keyword: "地铁", //搜索关键词
					page_size:30,
					location: lat+','+lng, //设置周边搜索中心点
					rectangle:atAng.minlat+','+atAng.minlng+','+atAng.maxlat+','+atAng.maxlng,
					success: function(res) { //搜索成功后的回调
						for (var i = 0; i < res.data.length; i++) {
							res.data[i].title = res.data[i].title.replace("[地铁站]","地铁站")
						}
						_this.setData({ //设置markers属性，将搜索结果显示在地图中
							ditie: res.data
						})
					}
				});
			},
			// 事件触发，调用接口
			nearby_search_school: function(lat,lng) {
				var _this = this;
				// 调用接口
				let atAng = _this.getMaxMinLongitudeLatitude(lng,lat,2)
				qqmapsdk.search({
					keyword: "小学", //搜索关键词
					page_size:30,
					location: lat+','+lng, //设置周边搜索中心点
					rectangle:atAng.minlat+','+atAng.minlng+','+atAng.maxlat+','+atAng.maxlng,
					success: function(res) { //搜索成功后的回调
						for (var i = 0; i < res.data.length; i++) {
							res.data[i].title = res.data[i].title.replace("[地铁站]","地铁站")
						}
						_this.setData({ //设置markers属性，将搜索结果显示在地图中
							schools: res.data
						})
					}
				});
			},
			
			
			/*监听分享选项*/
			shereClick: function(e) {
				let that = this
				switch (e.data.name) {
					case '分享海报':
						uni.navigateTo({
							url:"../../pagesTools/pages/newHouseShare/newHouseShare?id="+that.houseDetail.id
						})
						that.shareShow = false
						break;
					default :
						uni.showToast({
							icon:"none",
							title:"功能暂未开放"
						})
				}
			},
			/**
			 * 是否登录
			 * 如果登录执行需要用户权限的接口，显示登录用户特定模块
			 * @param {Object} e
			 */
			isLogin:function(fangid){
				let that = this
				that.$apis.isLogin({
					token:uni.getStorageSync('userToken')
				}).then(res => {
					if(res.code == 1){
						that.setData({
							thisUser : res.data
						})
						that.isCollect(fangid)
					}
				})
			},
			/**
			 * 是否收藏
			 * @param {Object} id
			 */
			isCollect:function(id){
				let that = this
				that.$apis.getCollect({
					id:id
				})
				.then(res => {
					that.setData({
						collect: res.id != 0
					})
				})
			},
			/**
			 * 监听tab改变
			 * @param {Object} e
			 */
			tabChange:function(e){
				this.activeIndex = e
			},
			/**
			 * 跳转到地图页
			 * @param {Object} id
			 */
			toMap:function(id){
				uni.navigateTo({
					url:"../map/map?id="+id
				})
				console.log(id)
			},
			/**
			 * 获取相关推荐
			 */
			getNewHousrRecommend:function(){
				let that = this
				that.$apis.getNewHousrRecommend({
					'area' : uni.getStorageSync('cityCode')
				}).then(res => {
					if(res != '' && res != null){
						that.setData({
							nearbyNewHouse:res.lp_house,
							personalHousing:res.second_house
						})
					}
				})
			},
			/**
			 * 获取房源信息
			 */
			getHouseDetail:function(id,user_id=''){
				let that = this
				that.$apis.getHouseDetail({
					'id':id,
					'user_id':user_id
				}).then(res => {
					if(res != '' && res != null){
						that.isLogin(res.id)
						that.setData({
							houseDetail:res,
							markers:[{
								callout: {
									'content': res.xq,
									'display': 'ALWAYS',
									'borderRadius':'25',
									'bgColor':'#3fbaa6',
									'color':'#FFF',
									'padding':'10'
								},
								latitude: res.lat,
								longitude: res.lng,
								iconPath: "https://cdn.tianfucd.com/images/applet/dingwei.png", //图标路径
								width: 20,
								height: 20
							}]
						})
						that.nearby_search(res.lat,res.lng)
						that.nearby_search_school(res.lat,res.lng)
					}
				})
			},
			/**
			 * 收藏userCollect
			 */
			userCollect:function() {
				let that = this
				if (that.collect) {
					that.$apis.userCollect({
						'id' : that.houseDetail.id,
						'type' : 1
					}).then(res => function(){
						console.log(res)
					})
					that.setData({
						collect: false
					});
					uni.showToast({
						title: "取消收藏成功",
						icon: "none"
					});
				} else {
					that.setData({
						collect: true
					});
					uni.showToast({
						title: "收藏成功",
						icon: "none"
					});
				}
			},
			/**
			 * 拨号
			 */
			call() {
				uni.makePhoneCall({
					phoneNumber: this.houseDetail.sltel
				});
			},

			personal() {
				let pages = getCurrentPages();
				let currPage = pages[pages.length - 1];
				let prevPage = pages[pages.length - 2];
				prevPage.setData({
					currentInexs: 0
				});
				uni.navigateBack({
					delta: 1
				});
			},

		}
	};
</script>
<style>
	.container {
		width: 100vw;
	}

	.top {
		position: relative;
	}

	.t1 {
		width: 100%;
	}

	.t2 {
		width: 100%;
		/* position: absolute; */
		background-color: #3fbaa6;
		display: flex;
		align-items: center;
		padding: 20rpx 0rpx;
		/* border-radius: 30rpx 30rpx 0rpx 0rpx; */
		bottom: 0rpx;
		color: white;
		justify-content: space-around;
		padding: 0rpx 40rpx;
		box-sizing: border-box;
		height: 70rpx;
	}

	

	.t {
		font-size: 25rpx;
		margin-top: 10rpx;
	}

	.main {
		font-size: 30rpx;
	}

	.icon-dui,
	.icon-fangwu {
		font-family: 'iconfont';
		margin-right: 10rpx;
	}

	.icon-fangwu {
		font-size: 40rpx;
	}

	.content {
		padding: 0rpx 40rpx;
	}

	.c1 {
		width: 100%;
		display: flex;
		align-items: center;
		padding: 20rpx 0rpx;
	}

	.l {
		font-size: 40rpx;
		font-weight: bold;
		letter-spacing: 4rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		width: 540rpx;
	}

	.r {
		flex-shrink: 0;
		display: flex;
		width: 130rpx;
		justify-content: space-between;
		margin-top: -10rpx;
	}

	.icon-fenxiang,
	.icon-shoucang1 {
		font-family: 'iconfont';
		font-size: 55rpx;
		color: #7a7a7a;
	}

	.r1 {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.rt1 {
		font-size: 28rpx;
		color: #949494;
	}

	.icon-you {
		font-family: 'iconfont';
		font-size: 28rpx;
		color: #949494;
	}

	.m {
		display: flex;
		background-color: #f4f4f4;
		padding: 10rpx 6rpx;
		align-items: center;
	}

	.hint {
		background-color: #3fbaa6;
		color: white;
		flex-shrink: 0;
		width: 100rpx;
		height: 48rpx;
		line-height: 48rpx;
		font-size: 20rpx;
		padding: 0rpx 10rpx;
		border-radius: 30rpx 0rpx 30rpx 0rpx;
		margin-right: 15rpx;
		text-align: center;
	}

	.mt {
		font-size: 18rpx;
	}

	.m1 {
		font-size: 20rpx;
		margin: 10rpx 0rpx;
		color: #FF7F12;
	}

	.pt {
		display: flex;
		height: 100rpx;
		justify-content: space-around;
	}

	.inputItem {
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.inputItem text:first-of-type {
		color: #FF7F12;
		font-weight: bold;
		font-size: 37rpx;
	}

	.c {
		font-size: 30rpx;
		color: #9c9c9c;
	}

	.be::after {
		content: "";
		position: absolute;
		display: block;
		width: 2rpx;
		height: 58rpx;
		background-color: #ccc;
		left: -34rpx;
		top: 10rpx;
	}

	.i {
		display: flex;
		flex-wrap: wrap;
		font-size: 28rpx;
	}

	.tp {
		margin-top: 25rpx !important;
	}

	.it {
		width: 50%;
		padding: 10rpx 0rpx;
	}

	.it text:first-child {
		color: #acacac;
	}

	.it text:last-of-type {
		color: #2d2d2d;
	}

	.it:nth-child(2n) {
		padding-left: 40rpx;
		box-sizing: border-box;
	}

	.side {
		margin: 35rpx 0rpx;
		font-weight: bold;
	}

	.side text:first-of-type {
		margin-right: 20rpx;
		font-weight: bold;
	}

	.side text:last-of-type {
		font-size: 26rpx;
		color: #7c7c7c;
	}

	.pc1 {
		width: 100%;
	}

	.icon-xinxi {
		font-family: 'iconfont';
		color: white;
		width: 80rpx;
		height: 80rpx;
		font-size: 45rpx;
	}

	.icon-huizhang {
		font-family: 'iconfont';
		color: #ffb319;
	}

	.ml {
		display: flex;
		background-color: #fff;
		height: 180rpx;
		border-radius: 10rpx;
		box-shadow: 0rpx 0rpx 30rpx 0rpx #ccc;
		align-items: center;
	}

	.ml image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		margin: 0rpx 20rpx;
		flex-shrink: 0;
	}

	.center {
		display: flex;
		flex-direction: column;
	}

	.ct text:last-of-type {
		font-weight: bold;
	}

	.info {
		font-size: 26rpx;
		color: #939393;
	}

	.i1 {
		display: flex;
		flex-direction: column;
	}

	.w {
		width: 100%;
		padding: 13rpx 0rpx;
		font-size: 28rpx;
	}

	.w text:first-child {
		color: #acacac;
	}

	.sd {
		width: 100%;
		height: 225rpx;
	}

	.sd {
		margin-top: 20rpx;
	}

	.side1 {
		font-weight: bold;
		margin: 40rpx 0rpx 20rpx 0rpx;
		display: flex;
		align-items: center;
	}

	.r2 {
		display: flex;
		flex-direction: column;
		margin: 0rpx 40rpx;
		align-items: center;
	}

	.cs {
		width: 90rpx;
		height: 90rpx;
		background-color: #ffb319;
		border-radius: 50%;
		position: relative;
	}

	.cs text {
		position: absolute;
		left: 24rpx;
		top: 24rpx;
	}

	.ct1 {
		font-size: 26rpx;
		color: #a2a2a2;
	}

	.sideInfo {
		text-align: justify;
		text-spacing: 8rpx;
		font-size: 28rpx;
		line-height: 50rpx;
		color: #333;
	}

	.f {
		display: flex;
		justify-content: space-between;
	}

	.sideL {
		font-weight: normal;
		font-size: 25rpx;
		color: #b9b9b9;
	}

	.bottom {
		position: fixed;
		bottom: 0rpx;
		background-color: #fff;
		width: 100%;
		height: 120rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding: 0rpx 30rpx;
		justify-content: space-between;
		z-index: 10;
		padding: 8rpx 0rpx !important;
	}

	.footer2 image {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.n {
		display: flex;
		flex-shrink: 0;
		margin: 20rpx 40rpx 20rpx 20rpx;
	}

	.n1 {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.n1 text:first-of-type {
		font-weight: bold;
	}

	.n1 text:last-of-type {
		color: #30bcbc;
		font-size: 24rpx;
		font-weight: bold;
	}

	button {
		height: 90rpx;
		line-height: 66rpx !important;
		width: 2150rpx !important;
		color: white;
		font-size: 28rpx;
		font-weight: normal;
	}

	button:active {
		filter: brightness(90%);
	}

	.deal {
		background-color: rgb(255, 182, 55);
	}

	.contact {
		background-color: rgb(0, 190, 165);
		margin-left: 10rpx !important;
	}

	.g {
		height: 120rpx;
	}

	.footer2 {
		position: fixed;
		bottom: 0rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		height: 100rpx;
		background-color: #f7f7f7;
		z-index: 200;
		font-size: 25rpx;
		justify-content: space-between;
	}

	.collect {
		display: flex;
		flex-direction: column;
		margin: 0rpx 40rpx;
		width: 80rpx;
		align-items: center;
		flex-shrink: 0;
		margin-top: -19rpx;
	}

	.red {
		color: #cc0000 !important;
	}

	.collect text:last-of-type {
		font-size: 24rpx;
		color: #7a7a7a;
	}

	.footer2 button {
		margin: 0 !important;
		height: 100%;
		line-height: 100rpx !important;
		font-weight: unset;
		color: white;
		border-radius: 0;
		font-size: 28rpx;
	}

	.footer2 button:active {
		filter: brightness(90%);
	}

	.btn2 {
		background-color: rgb(255, 188, 57);
	}

	.btn3 {
		background-color: #27bbb2;
	}

	.icon {
		position: relative;
	}

	.share {
		position: absolute;
		width: 55rpx !important;
		height: 90rpx !important;
		z-index: 10;
		padding: 0;
		opacity: 0;
	}

	.wrap2 {
		margin: 0rpx 40rpx;
		box-sizing: border-box;
	}
	
	.tags{
		margin-right: 20rpx;
		font-size: 16rpx;
		background-color: #ceefff;
		padding: 4rpx 15rpx;
		color: #00aaff;
		margin-bottom: 24rpx;
	}
	
	#myVideo{
		width: 100%;
	}
	
		// 容器
		.scrollContainer {
			width: 666rpx;
			white-space: nowrap;
		}
	
		// 容器项
		.scrollitem {
			display: inline-block;
			margin-left: 22rpx;
			height: 410rpx;
			margin-top: 5rpx;
			margin-bottom: 20rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 10rpx 2rpx rgba(0,0,0,0.2);
			border-radius: 10rpx 10rpx 10rpx 10rpx;
			padding: 0 8rpx;
		}
	
		.scrollimage {
			width: 270rpx;
			height: 154rpx;
		}
	
		.recommandItemText {
			width: 270rpx;
			text-align: center;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
	
		.EmptyData {
			text-align: center;
			margin-top: 50rpx;
		}

</style>

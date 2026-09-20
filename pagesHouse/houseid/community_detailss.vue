<template>
	<view>
		<u-navbar title="小区详情" :placeholder="true" :autoBack="true" bgColor="#00aaff"
			:titleStyle="{ color: '#FFF', fontSize: '32rpx' }" leftIconColor="white">
		</u-navbar>
		<!-- 轮播图 -->
		<view v-if="reslistflag">
			<swiper class="swiper" :interval="interval" :duration="duration" v-if="reslist.length>0">
				<swiper-item v-for="(item,index) in reslist" :key="index">
					<view class="swiper-item">
						<image :src="item.image" alt="" style="height:100%;width: 100%;object-fit: cover;"
							@click="preview(index)">
					</view>
				</swiper-item>
			</swiper>
			<div v-else style="height:160px;">
				<u-empty mode="data" text="正在拍摄中"></u-empty>
			</div>
		</view>

		<view class="content">
			<!-- 标题分享 -->
			<view class="flex-between">
				<view class="flex-betweenleft" style="font-size: 36rpx; font-weight: 700;">
					{{lpxqlist.title}}
				</view>
				<view class="flex-betweenright" style="width: 170rpx;height: 80rpx;display: flex;">
					<view class="betweenrightbox" style="width: 85rpx;" @tap="fenxiang()">
						<u-icon name="share-square" color="#2979ff" size="28"></u-icon>
						<view class="rt1">分享</view>
					</view>
					<view class="betweenrightbox" style="width: 85rpx;" @tap="userCollect">
						<u-icon name="heart" color="#2979ff" size="28"></u-icon>
						<view :class="'rt1 ' + (collect?'red':'')">收藏</view>
					</view>
				</view>
			</view>
			<!-- <view class="flex-start">
				<view class="tags" style="background-color: #ff8b26;color: #FFF;">
					{{lpxqlist.lpzt}}
				</view>
				<view class="tags" v-for="(item1,index) in lpxqlist.jzlb" :key="index">
					{{item1}}
				</view>
			</view> -->
			<view class="flex-between">
				<view class="inputItem">
					<text>{{lpxqlist.refPrice?lpxqlist.refPrice:'--'}} 元/㎡</text>
					<text class="c">参考单价</text>
				</view>
				<view class="inputItem be">
					<text>{{lpxqlist.stardprice.price}}万起</text>
					<text class="c">参考总价</text>
				</view>
				<view class="inputItem be">
					<text>{{lpxqlist.qjmj?((lpxqlist.qjmj).split("-"))[0]:'--'}}m²</text>
					<text class="c">最小面积</text>
				</view>
			</view>
			<view class="i" style="margin-top: 20rpx;">
				<view class="it">
					<text>产权年限：</text>
					<text>{{lpxqlist.sort?getSort(lpxqlist.sort):'--'}} 年</text>
				</view>
				<view class="it">
					<text>总栋数：</text>
					<text>{{lpxqlist.totalBuilding?lpxqlist.totalBuilding:'--'}} 栋</text>
				</view>
				<view class="it">
					<text>开盘时间：</text>
					<text>{{lpxqlist.openDate?formatDateTime(lpxqlist.openDate, 'yyyy'):'--'}}</text>
				</view>
				<view class="it">
					<text>交房时间：</text>
					<text>{{lpxqlist.completed?formatDateTime(lpxqlist.completed, 'yyyy'):'--'}}</text>
				</view>
				<view class="it">
					<text>物业费：</text>
					<text>{{lpxqlist.serviceCharge?lpxqlist.serviceCharge:'--'}}元/㎡</text>
				</view>
				<view class="w">
					<text>附近学校：{{lpxqlist.schoolDistrict?lpxqlist.schoolDistrict:"--"}}</text>
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

				<view class="w" @tap="toMap(lpxqlist.id)">
					<text>楼盘地址：</text>
					<text>{{lpxqlist.address?lpxqlist.address:'--'}}</text>
					<tm-icons style="float: right;" name="icon-angle-right" size="28"></tm-icons>
				</view>
			</view>

			<view v-if="lpxqlist.hxlist && lpxqlist.hxlist.length > 0" class="side">在售户型 (
				{{lpxqlist.hxlist != ''?lpxqlist.hxlist.length:0}} )
			</view>


			<tm-row v-if="lpxqlist.loupanHuxings && lpxqlist.loupanHuxings.length > 0">
				<scroll-view class='scrollContainer' scroll-x :show-scrollbar="true" @scroll="scroll">
					<view class='scrollitem' v-for="(hxItem, index) in lpxqlist.loupanHuxings" :key="index">
						<tm-images :width="300" :height="225"
							:src="'https://static.tianfucd.com/'+hxItem.img"></tm-images>
						<view class="pt-10 pl-10" style="font-size: 32rpx;font-weight: bold;color: #333333;">
							{{hxItem.bedRoomNum}}室{{hxItem.livingRoomNum}}厅{{hxItem.kitchenNum}}厨{{hxItem.bathroomNum}}卫
						</view>
						<view class="pt-10 pl-10" style="font-size: 24rpx;color: 333;display: flex;">
							<text class="mr-20">{{hxItem.habitableSpace}} ㎡</text>
							<dict-tag :options="dict.type.tfw_decoration_situation" :value="hxItem.fitment" />
						</view>
						<view v-if="hxItem.price !== null && hxItem.price !== 0" style="width: 280rpx;font-size: 24rpx;color: 333;text-align: right;margin-top: 25rpx;">
							预估总价：
							<text style="font-size: 40rpx;font-weight: bold;color: #E20000;">{{hxItem.price}}万
							</text> 起
						</view>
						<view v-else style="width: 280rpx;font-size: 24rpx;color: 333;text-align: right;margin-top: 25rpx;">
							预估总价：
							<text style="font-size: 40rpx;font-weight: bold;color: #E20000;">待定
							</text> 
						</view>
					</view>
				</scroll-view>
				<progress :percent="percent" border-radius="10" stroke-width="8" backgroundColor="#999"
					activeColor="#30bcbc" />
			</tm-row>


			<view class="side">楼盘信息</view>
			<view class="i" style="margin-top: 20rpx;">
				<view class="it">
					<text>建面：</text>
					<text>{{lpxqlist.buildingArea?lpxqlist.buildingArea+'m²':'--'}}</text>
				</view>
				<view class="it">
					<text>容积率：</text>
					<text>{{lpxqlist.plotRatio?lpxqlist.plotRatio+'%':'--'}}</text>
				</view>
				<view class="it">
					<text>占地面积：</text>
					<text>{{lpxqlist.landArea?lpxqlist.landArea:'-- 亩'}}</text>
					<text v-if="lpxqlist.landArea">{{lpxqlist.landAreaType == '1' ? '亩' : lpxqlist.landAreaType}}</text>
				</view>
				<view class="it">
					<text>绿化率：</text>
					<text>{{lpxqlist.forestationRate?lpxqlist.forestationRate+'%':'--'}}</text>
				</view>
				<view class="it">
					<text>总户数：</text>
					<text>{{lpxqlist.totalHouseholds?lpxqlist.totalHouseholds+'户':'--'}} </text>
				</view>
				<view class="it">
					<text>公摊比：</text>
					<text>{{lpxqlist.shareRatio?lpxqlist.shareRatio+'%':'--'}}</text>
				</view>
				<view class="it">
					<text>车位数：</text>
					<text>{{lpxqlist.parkingPlace?lpxqlist.parkingPlace+'个':'--'}}</text>
				</view>
				<view class="it">
					<text>车位比：</text>
					<text>{{lpxqlist.cwb?lpxqlist.cwb:'--'}}</text>
				</view>

				<view class="w">
					<text>物业公司：</text>
					<text>{{lpxqlist.pmc?lpxqlist.pmc:'--'}}</text>
				</view>
				<view class="w">
					<text>开发商：</text>
					<text>{{lpxqlist.developer?lpxqlist.developer:'--'}}</text>
				</view>
			</view>

			<!-- 位置与周边 -->
			<view class="side">位置与周边</view>
			<mapMini :latitude="markers[0].latitude" :longitude="markers[0].longitude" :markers="markers"
				:fangId='lpxqlist.id' :scale="15" v-if="isshowmap"></mapMini>

			<view class="side">房源描述</view>
			<tm-tabs align="left" @change="tabChange" v-model="activeIndex" :list="['项目介绍','周边配套','交通状况']"></tm-tabs>
			<tm-sheet :margin="sheetMargin">
				<scroll-view scroll-y="true" style="height: 400rpx;" class="scroll-Y">
					<mp-html v-if="activeIndex == 0" class="sideInfo" :content="lpxqlist.detail" />
					<mp-html v-if="activeIndex == 1" class="sideInfo" :content="lpxqlist.periphery" />
					<mp-html v-if="activeIndex == 2" class="sideInfo" :content="lpxqlist.transportation" />
				</scroll-view>
			</tm-sheet>
		</view>
		<!-- 划线分割 -->
		<!-- 二手房 -->
		<!-- 划线分割 -->
		<!-- 看新房 -->
		<view class="footer2 ">
			<view class="n" @tap="shop(lpxqlist.uid)">
				<image :src="shareUser.avatar" mode="aspectFill"></image>
				<view class="n1">
					<text>{{shareUser.nickName}}</text>
					<text>{{shareUser.companyDept.deptName}}</text>
				</view>
			</view>
			<view v-if="hasRoleflag" style="display: flex;width: 70%;">
				<button @tap="showCooprate()" class="btn2" style="width: 50%;">分销合作商</button>
				<button class="btn3" @tap="gopath()" style="width: 50%;">新房报备</button>
			</view>
			<u-button v-if="!hasRoleflag" type="primary" shape="circle" text="电话联系"
				@tap="call('4008162019,'+shareUser.utel)"></u-button>
			<u-button v-if="!hasRoleflag" type="warning" shape="circle" text="在线咨询" @tap="goChat()"></u-button>
		</view>
		<!-- <previewImage ref="previewImage" :imgs="lpxqlist.imgs" :descs="lpxqlist.descs" :saveBtn="false" :rotateBtn="false"></previewImage> -->
		<tm-shareSheet @change="shereClick" :actions="shareAct" v-model="shareShow"></tm-shareSheet>
		
		<view>
			<tm-poup height="600" v-if="popupshow" v-model="popupshow" position="bottom">
				<view class="text-size-lg text-weight-b text-align-center py-30">
					分销渠道合作商
				</view>
				<view class="flex-between mb-20" style="width: 100%;">
					<view class="ml-50" style="text-align: left !important;width: 100%;">
						<view style="color: #666666;width: 100%;">
							<view v-for="(item,index) in lpxqlist.lpxqCooperates" :key="index" style="font-size: 36rpx;width: 100%;">
								<view style="font-size: 32rpx;display: flex;justify-content: space-around;align-items: center;">
									<span>{{item.partners}}</span>
									<span>{{item.contacts}}</span>
									<view style="color: #E20000;font-size: 30rpx;font-weight: 700;" @tap="call(item.phone)">
										<uni-icons type="phone-filled"></uni-icons>
										{{item.phone}}
									</view>
								</view>
								<view style="font-size: 26rpx;display: flex;justify-content: space-around;">
									<span v-if="item.type === 1">佣金:{{item.divide}}%</span>
									<span v-else>佣金:{{item.divide}}元</span>
									<span v-if="item.cash !== undefined && item.cash !== 0">现金奖:{{item.cash}}元</span>
									<span v-else>现金奖:待定</span>
									<span style="width: 10rpx;"></span>
								</view>
							</view>
						</view>
					</view>
				</view>
			</tm-poup>
		</view>
	</view>
</template>
<script>
	var app = getApp();
	import UIcon from "@/pagesHouse/uview-ui/components/u-icon/u-icon.vue";
	import UButton from "@/pagesHouse/uview-ui/components/u-button/u-button.vue";
	import USwiper from "@/pagesHouse/uview-ui/components/u-swiper/u-swiper.vue";
	import UNavbar from "@/pagesHouse/uview-ui/components/u-navbar/u-navbar.vue";
	import tmImages from '@/pagesHouse/tm-vuetify/components/tm-images/tm-images.vue';
	import tmSheet from '@/pagesHouse/tm-vuetify/components/tm-sheet/tm-sheet.vue';
	import tmTabs from '@/pagesHouse/tm-vuetify/components/tm-tabs/tm-tabs.vue';
	import tmCol from '@/pagesHouse/tm-vuetify/components/tm-col/tm-col.vue';
	import tmRow from '@/pagesHouse/tm-vuetify/components/tm-row/tm-row.vue';
	import tmIcons from '@/pagesHouse/tm-vuetify/components/tm-icons/tm-icons.vue';
	import tmShareSheet from '@/pagesHouse/tm-vuetify/components/tm-shareSheet/tm-shareSheet.vue';
	import tmMenubars from '@/pagesHouse/tm-vuetify/components/tm-menubars/tm-menubars.vue';
	import tmPoup from '@/pagesHouse/tm-vuetify/components/tm-poup/tm-poup.vue';
	// import previewImage from '@/components/kxj-previewImage/kxj-previewImage.vue';
	import {
		getlpxq,
		listLoupanxiangce
	} from '@/api/houst.js'
	let QQMapWS = require("../../js_sdk/skyrrrt-ws-jssdk/qqmap-ws-jssdk.js"); // 实例化API核心类
	// 实例化API核心类
	let qqmapsdk = new QQMapWS.default({
		key: 'XJTBZ-XW5K4-5KBU6-D37VL-LAHGF-RSBBI'
	});


	export default {
		dicts: ['tfw_decoration_situation'],
		components: {
			UIcon,
			UButton,
			USwiper,
			UNavbar,
			tmPoup,
			tmImages,
			tmSheet,
			tmTabs,
			tmCol,
			tmRow,
			tmIcons,
			tmShareSheet,
			tmMenubars,
		},
		data() {
			return {
				interval: 2000,
				duration: 500,
				reslistflag: false,
				//楼盘数据
				lpxqlist: null,
				//地图显示
				isshowmap: false,
				hasRoleflag: false,
				//地图数据
				markers: [{
					callout: {
						'content': "kunkun",
						'display': 'ALWAYS',
						'borderRadius': '25',
						'bgColor': '#3fbaa6',
						'color': '#FFF',
						'padding': '10'
					},
					latitude: 0,
					longitude: 0,
					iconPath: "https://cdn.tianfucd.com/images/applet/dingwei.png", //图标路径
					width: 20,
					height: 20
				}],
				//房源相册
				reslist: [],
				schools: [],
				ditie: [],
				homeES: [{
					title01: "二手房",
					title02: "查看更多",
					more: "/pages/index/rentouthouse/rentouthouse",
					type: 1,
					img: "/static/assets/svg/fhui.svg"
				}],
				homeNew: [{
					title01: "精选新房",
					title02: "查看更多",
					more: '/pagesHouse/newhouse/newhouse',
					img: "/static/assets/svg/fhui.svg"
				}],
				shareAct: [
					[
						// #ifdef MP-WEIXIN
						{
							name: "微信",
							bgcolor: "#07c160",
							icon: "icon-weixin",
							color: "white"
						},
						// #endif
						// #ifndef MP-WEIXIN
						{
							name: "微信",
							bgcolor: "#07c160",
							icon: "icon-weixin",
							color: "white"
						},
						{
							name: "朋友圈",
							bgcolor: "#04c887",
							icon: "icon-pengyouquan",
							color: "white"
						},
						{
							name: "微博",
							bgcolor: "#e91e38",
							icon: "icon-weibo",
							color: "white"
						},
						{
							name: "QQ",
							bgcolor: "#1dc0fd",
							icon: "icon-QQ",
							color: "white"
						},
						// #endif
					],
					[{
							name: "分享海报",
							bgcolor: "#f5f5f5",
							icon: "icon-picture",
							color: "grey-darken-1"
						},
						{
							name: "复制链接",
							bgcolor: "#f5f5f5",
							icon: "icon-connection",
							color: "grey-darken-1"
						},
						{
							name: "二维码",
							bgcolor: "#f5f5f5",
							icon: "icon-qrcode",
							color: "grey-darken-1"
						},
					]
				],
				assetsPath: uni.getStorageSync('siteConfigs')['assetsPath'],
				shareShow: false,

				activeIndex: 0,
				sheetMargin: [0.0],
				/**
				 * 页面的初始数据
				 */
				collect: false,
				personalHousing: [],
				nearbyNewHouse: [],
				currentInexs: 0,
				thisUser: [],
				yzShow: false,
				houseFollow: [],
				OwnerInfo: {},
				percent: 5,
				shareUser: null,
				popupshow: false,
			};
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},


		props: {},

		onLoad: function(e) {
			let eid = null
			let ehouseid = null
			if (e.scene) {
				eid = e.scene
			}
			if (e.id) {
				eid = e.id
			}
			//楼盘数据
			getlpxq(eid).then(response => {
				console.log(response, "楼盘")
				if (response.data && response.data.loupanHuxings.length > 0) {
					const minIdHousingType = response.data.loupanHuxings.reduce((minObj, currentObj) => {
						if (!minObj || (currentObj.price !== null && currentObj.price !== 0 && currentObj.price < minObj
								.price)) {
							return currentObj;
						}
						return minObj;
					}, null);
					response.data.stardprice = minIdHousingType
					// 现在minIdHousingType就是id值最小的对象
				}
				if (response.data && response.data.loupanHuxings.length > 1) {
					const firstHx = response.data.loupanHuxings[0];
					const lastHx = response.data.loupanHuxings[response.data.loupanHuxings.length - 1];
					if (firstHx.habitableSpace != null && lastHx.habitableSpace != null) {
						response.data.qjmj = firstHx.habitableSpace + '-' + lastHx.habitableSpace;
					} else if (firstHx.habitableSpace == null && lastHx.habitableSpace != null) {
						// 如果首个为空，取下一个非空的
						let secondHx = response.data.loupanHuxings.find((hx, index) => hx.habitableSpace !=
							null && index > 0);
						response.data.qjmj = secondHx.habitableSpace + '-' + lastHx.habitableSpace;
					} else if (lastHx.habitableSpace == null) {
						// 如果末尾为空，取倒数第二个非空的
						let secondLastHx = response.data.loupanHuxings.reverse().find((hx, index) => hx
							.habitableSpace != null && index > 0);
						response.data.qjmj = firstHx.habitableSpace + '-' + secondLastHx.habitableSpace;
					} else {
						response.data.qjmj = null; // 若两者都为空，则设为null
					}
				}
				this.lpxqlist = response.data
				let randomIndex = Math.floor(Math.random() * this.lpxqlist.userList.length)
				this.shareUser = this.lpxqlist.userList[randomIndex]
				this.markers[0].callout.content = response.data.title
				this.markers[0].latitude = response.data.lat
				this.markers[0].longitude = response.data.lon
				this.isshowmap = true;
				if (response.data.loupanPhotos) {
					response.data.loupanPhotos.forEach(function(item) {
						item.image = "https://static.tianfucd.com/" + item.image;
					});
					this.reslist = response.data.loupanPhotos
					this.reslistflag = true
				}
				this.hasRoleflag = this.hasRole(['common', 'jjr', 'guanjia', 'dianzhang', 'tfwadmin'])
			});
		},
		filters: {
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
			let lpxqlist = this.lpxqlist
			console.log(lpxqlist,'lpxqlist')
			let thisUser = this.thisUser
			return {
				title: lpxqlist.title + ' 【' + lpxqlist.qjmj + '㎡】 【参考单价 ：' + lpxqlist.refPrice + ' 元/㎡】',
				// imageUrl: lpxqlist.images[0],
				path: '/pagesHouse/houseid/community_detailss?scene=' + lpxqlist.id
			}
		},
		onShareTimeline(res) { //分享到朋友圈
			console.log(res, "发送到朋友圈");
			let lpxqlist = this.lpxqlist
			console.log(lpxqlist,'lpxqlist')
			let thisUser = this.thisUser
			return {
				title: lpxqlist.title + ' 【' + lpxqlist.qjmj + '㎡】 【参考单价 ：' + lpxqlist.refPrice + ' 元/㎡】',
				path: '/pagesHouse/houseid/community_detailss?scene=' + lpxqlist.id
			}
		},
		methods: {
			//获取产权年限
			getSort(sort) {
				let sorts = sort.split(",");
				let cq = "";
				sorts.forEach(function(item) {  
				    if(item == "1") {
				    	if(cq.length > 0) cq += ",";
				    	cq += "40";
				    }
				    if(item == "2") {
				    	if(cq.length > 0) cq += ",";
				    	cq += "50";
				    }
				    if(item == "3") {
				    	if(cq.length > 0) cq += ",";
				    	cq += "60";
				    }
				    if(item == "4") {
				    	if(cq.length > 0) cq += ",";
				    	cq += "70";
				    }
				}); 
				return cq
			},
			formatDateTime(dater, format) {
				let date = new Date(dater);
				const o = {
					'M+': date.getMonth() + 1, // 月份
					'd+': date.getDate(), // 日
					'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
					'H+': date.getHours(), // 小时
					'm+': date.getMinutes(), // 分
					's+': date.getSeconds(), // 秒
					'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
					S: date.getMilliseconds(), // 毫秒
					a: date.getHours() < 12 ? '上午' : '下午', // 上午/下午
					A: date.getHours() < 12 ? 'AM' : 'PM', // AM/PM
				};
				if (/(y+)/.test(format)) {
					format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
				}
				for (let k in o) {
					if (new RegExp('(' + k + ')').test(format)) {
						format = format.replace(
							RegExp.$1,
							RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
						);
					}
				}
				return format;
			},
			gopath() {
				uni.navigateTo({
					url: '/pagesUser/customerMG/customerMG'
				})
			},
			fenxiang() {
				this.shareShow = true
			},
			preview(i) {
				uni.previewImage({
					// 预览时，默认显示图片的索引
					current: i,
					// 所有图片 url 地址的数组
					urls: this.reslist.map(x => x.image)
				})
			},
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
			previewOpen(e, ifhx) {
				let that = this
				if (ifhx) {
					that.$refs.previewHx.open(e);
					return;
				} else {
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
			nearby_search: function(lat, lng) {
				var _this = this;
				// 调用接口
				let atAng = _this.getMaxMinLongitudeLatitude(lng, lat, 2)
				qqmapsdk.search({
					keyword: "地铁", //搜索关键词
					page_size: 30,
					location: lat + ',' + lng, //设置周边搜索中心点
					rectangle: atAng.minlat + ',' + atAng.minlng + ',' + atAng.maxlat + ',' + atAng.maxlng,
					success: function(res) { //搜索成功后的回调
						for (var i = 0; i < res.data.length; i++) {
							res.data[i].title = res.data[i].title.replace("[地铁站]", "地铁站")
						}
						_this.setData({ //设置markers属性，将搜索结果显示在地图中
							ditie: res.data
						})
					}
				});
			},
			// 事件触发，调用接口
			nearby_search_school: function(lat, lng) {
				var _this = this;
				// 调用接口
				let atAng = _this.getMaxMinLongitudeLatitude(lng, lat, 2)
				qqmapsdk.search({
					keyword: "小学", //搜索关键词
					page_size: 30,
					location: lat + ',' + lng, //设置周边搜索中心点
					rectangle: atAng.minlat + ',' + atAng.minlng + ',' + atAng.maxlat + ',' + atAng.maxlng,
					success: function(res) { //搜索成功后的回调
						for (var i = 0; i < res.data.length; i++) {
							res.data[i].title = res.data[i].title.replace("[地铁站]", "地铁站")
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
							url: "../../pagesTools/pages/newHouseShare/newHouseShare?id=" + that.lpxqlist.id
						})
						that.shareShow = false
						break;
					default:
						uni.showToast({
							icon: "none",
							title: "功能暂未开放"
						})
				}
			},
			/**
			 * 是否登录
			 * 如果登录执行需要用户权限的接口，显示登录用户特定模块
			 * @param {Object} e
			 */
			isLogin: function(fangid) {
				let that = this
				that.$apis.isLogin({
					token: uni.getStorageSync('userToken')
				}).then(res => {
					if (res.code == 1) {
						that.setData({
							thisUser: res.data
						})
						that.isCollect(fangid)
					}
				})
			},
			/**
			 * 是否收藏
			 * @param {Object} id
			 */
			isCollect: function(id) {
				let that = this
				that.$apis.getCollect({
						id: id
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
			tabChange: function(e) {
				this.activeIndex = e
			},
			/**
			 * 跳转到地图页
			 * @param {Object} id
			 */
			toMap: function(id) {
				uni.navigateTo({
					url: "../map/map?id=" + id
				})
				console.log(id)
			},


			/**
			 * 收藏userCollect
			 */
			userCollect: function() {
				let that = this
				if (that.collect) {
					that.$apis.userCollect({
						'id': that.lpxqlist.id,
						'type': 1
					}).then(res => function() {
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
			call(e) {
				console.log(e)
				uni.makePhoneCall({
					phoneNumber: e
				});
			},

			// 在线咨询（跳转聊天页，带房源信息）
			goChat() {
				const brokerId = this.shareUser ? this.shareUser.userId : '';
				if (!brokerId) {
					uni.showToast({
						icon: 'none',
						title: '暂无法咨询'
					});
					return;
				}
				const d = this.lpxqlist || {};
				const houseInfo = {
					houseId: d.id,
					title: d.title || '',
					huxing: '',
					area: d.qjmj ? d.qjmj + '㎡' : '',
					price: d.refPrice ? d.refPrice + '元/㎡' : '',
					tradeType: '买房'
				};
				uni.navigateTo({
					url: '/pagesHouse/chat/chat?brokerId=' + brokerId + '&brokerName=' + encodeURIComponent(this
						.shareUser ? (this.shareUser.nickName || '') : '') + '&houseInfo=' + encodeURIComponent(JSON
						.stringify(houseInfo))
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
			// 显示合作商
			showCooprate() {
				this.popupshow = true;
			},
			//关闭业主信息
			close() {
				this.popupshow = false
			},
		}
	};
</script>
<style>
	.swiper {
		height: 500rpx;
		width: 100%;
	}

	.swiper-item {
		position: relative;
		display: block;
		height: 500rpx;
		width: 100%;
		line-height: 500rpx;
		text-align: center;
	}

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
		padding-left: 30rpx;
		padding-right: 30rpx;
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

	/* 电话联系/在线咨询：与二手房详情页(houseid.vue)保持一致，圆角覆盖 u-button 的 circle 形状 */
	.footer2 .u-button {
		border-radius: 20rpx;
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

	.tags {
		margin-right: 20rpx;
		font-size: 16rpx;
		background-color: #ceefff;
		padding: 4rpx 15rpx;
		color: #00aaff;
		margin-bottom: 24rpx;
	}

	#myVideo {
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
		box-shadow: 0rpx 0rpx 10rpx 2rpx rgba(0, 0, 0, 0.2);
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
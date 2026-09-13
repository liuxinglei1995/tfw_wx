<template>
	<view>
		<tm-menubars :title="houseDetail.xq" iconColor="white" color="tfw"></tm-menubars>
		<view class="" style="">
			<swiper class="swiper" @change="current_change" :current-item-id="current_item_id" :indicator-dots="false" indicator-color="#fff" indicator-active-color="#3fbaa6" style="height: 563rpx;">
				<!-- <swiper-item item-id="v0" v-if="houseDetail.video">
					<video id="myVideo" :src="assetsPath + houseDetail.video"  controls></video>
				</swiper-item> -->
				<swiper-item item-id="hx0" v-if="houseDetail.hx_images">
					<tm-images :width="750" :height="563" :previmage="false" @click="previewOpen(houseDetail.hx_images,true)" :src="houseDetail.hx_images" model="scaleToFill"></tm-images>
				</swiper-item>
				<swiper-item :item-id="'p'+index" v-for="(swiperTtem,index) in houseDetail.imgs">
					<tm-images :width="750" :height="563" :previmage="false" @click="previewOpen(swiperTtem,false)" :src="swiperTtem" model="scaleToFill"></tm-images>
				</swiper-item>
			</swiper>
		</view>
		<view style="width: 100%;" class="flex-between gallery-button">
			<view v-if="houseDetail.hx_images" @tap="gallery_sel('hx')" :class="'gallery-button-tag '+ (gallery_select == 0 ? 'gallery-button-tag-active' : '')">
				户型
			</view>
			<view v-if="houseDetail.imgs" @tap="gallery_sel('p')" :class="'gallery-button-tag '+ (gallery_select == 1 ? 'gallery-button-tag-active' : '')">
				图片
			</view>
		</view>
		<view class="content">
			<view class="flex-around mt-20 mb-10">
				<view class="round-4" @tap="watchVr" style="width: 338rpx;height: 126rpx;background: #DFFFFF; position: relative;">
					<image style="width: 60rpx;height: 60rpx;border-radius: 50%;position: absolute;top: 28rpx;left: 28rpx;" src="https://static.tianfucd.com/img/icon/esHouseDetail/vrNew.png" mode="scaleToFill"></image>
					<view style="position: absolute;top: 18rpx;left: 94rpx;color:#333333;">
						<view style="font-size: 32rpx;margin-bottom: 10rpx;">
							VR看房
						</view>
						<view style="font-size: 24rpx;">
							身临其境，在线解答
						</view>
					</view>
				</view>
				<!-- <tm-lottie :height="650" ref='lottie' :autoplay="true" url="https://assets8.lottiefiles.com/packages/lf20_z0b82vos.json"></tm-lottie> -->
				<view @tap="watchVideo(houseDetail.livePlayback,houseDetail.tit)">
					<explanation :show="houseDetail.livePlayback != '' && houseDetail.livePlayback != null"></explanation>
				</view>
			</view>
			<view class="c1">
				<view class="l">
					{{houseDetail.tit}}
				</view>
				<view style="width: 140rpx;height: 80rpx;position: relative;padding-left: 20rpx;top: 0rpx;">
					<tm-col grid="6" @click="shareShow = true">
						<tm-icons size="42" :dense="true" name="icon-share"></tm-icons>
						<view class="rt1">分享</view>
					</tm-col>
					<tm-col grid="6" @tap="userCollect">
						<tm-icons name="icon-collection" :dense="true" size="42" :color="collect?'red':''"></tm-icons>
						<view :class="'rt1 ' + (collect?'red':'')">收藏</view>
					</tm-col>
				</view>
			</view>
			<view class="flex-start">
				<view class="tags" style="background-color: #30bcbc;color: #FFF;">
					{{houseDetail.type1}}
				</view>
				<view class="tags">{{houseDetail.fkfs}}</view>
				<view class="tags" v-if="houseDetail.gjsj == 0">今天跟进</view>
				<view class="tags" v-else>近{{houseDetail.gjsj}}天跟进</view>
			</view>
			<view class="flex-between">
				<view class="inputItem">
					<text>{{houseDetail.money1?houseDetail.money1:'--'}} {{houseDetail.jgdw}}</text>
					<text class="c">租金</text>
				</view>
				<view class="inputItem be">
					<text>{{houseDetail.fkfs?houseDetail.fkfs:'--'}}</text>
					<text class="c">付款方式</text>
				</view>
				<view class="inputItem be">
					<text>{{houseDetail.cqmj?houseDetail.cqmj:'--'}}m²</text>
					<text class="c">面积</text>
				</view>
			</view>
			<view class="i" style="margin-top: 20rpx;">
				<view class="it">
					<text>套内面积：</text>
					<text>{{houseDetail.tnmj?houseDetail.tnmj:'--'}}m²</text>
				</view>
				<view class="it">
					<text>送后预估：</text> 
					<text>{{houseDetail.symj?houseDetail.symj:'--'}}m²</text>
				</view>
				<view class="it">
					<text>装修情况：</text>
					<text>{{houseDetail.zxqk?houseDetail.zxqk:'--'}}</text>
				</view>
				<view class="it">
					<text>房屋朝向：</text>
					<text>{{houseDetail.chaoxiang?houseDetail.chaoxiang:'--'}}</text>
				</view>
				<view class="it">
					<text>户型：</text>
					<text>{{houseDetail.huxing?houseDetail.huxing:'--'}}</text>
				</view>
				<view class="it">
					<text>房本年限：</text>
					<text>{{houseDetail.fbnx?houseDetail.fbnx:'--'}}</text>
				</view>
				<view class="it">
					<text>建筑年代：</text>
					<text>{{houseDetail.jianzhund?houseDetail.jianzhund:'--'}}</text>
				</view>
				<view class="it">
					<text>楼层：</text>
					<text>{{houseDetail.jianzhulx?houseDetail.jianzhulx:'--'}} / {{houseDetail.lc2?'共'+(houseDetail.lc2)+' 层':'--'}}</text>
				</view>
				<view class="it">
					<text>佣金：</text>
					<text>{{houseDetail.yongjin?houseDetail.yongjin:'--'}}</text>
				</view>
				<view class="it">
					<text>物业费：</text>
					<text>{{houseDetail.money2?houseDetail.money2:'--'}}元/㎡</text>
				</view>
				<view class="w">
					<text>小区：</text>
					<text>{{houseDetail.xq?houseDetail.xq:'--'}}</text>
				</view>
				<!-- <view class="w">
					<text>税费：</text>
					<text>{{houseDetail.feis?houseDetail.feis:'--'}}</text>
				</view> -->
				<view class="w">
					<text>租赁税：</text>
					<text>预计 8% - 15%</text>
				</view>
				<view class="w">
					<text>附近学校：</text>
					<text>{{houseDetail.schoolid?houseDetail.schoolid:'--'}}</text>
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
					<text>{{houseDetail.pianqu?houseDetail.pianqu:'--'}}{{houseDetail.quhao?houseDetail.quhao:'--'}} 号</text>
					<tm-icons style="float: right;" name="icon-angle-right" size="28"></tm-icons>
				</view>
			</view>
			<view class="side">位置与周边</view>
			<map-mini 
			:latitude="parseFloat(houseDetail.lat)"
			:longitude="parseFloat(houseDetail.lng)"
			:markers="markers"
			:fangId="houseDetail.id"
			:type="3"
			:scale="15"></map-mini>
			
			<view class="side">房源描述</view>
			<tm-tabs align="left" @change="tabChange" v-model="activeIndex" :list="['核心卖点','小区介绍','房源详情']"></tm-tabs>
			<tm-sheet :margin="sheetMargin">
				<scroll-view scroll-y="true" style="height: 400rpx;" class="scroll-Y" >
					<mp-html v-if="activeIndex == 0" class="sideInfo" :content="houseDetail.txt" />
					<view v-if="activeIndex == 1" class="i" style="margin-top: 20rpx;">
						<view class="w">
							<text>小区名：</text>
							<text>{{houseDetail.xq?houseDetail.xq:'--'}}</text>
						</view>
						<view class="w">
							<text>开发商名：</text>
							<text>{{houseDetail.kfsming?houseDetail.kfsming:'--'}}</text>
						</view>
						<view class="w">
							<text>建筑类型：</text>
							<text>{{houseDetail.jzts?houseDetail.jzts:'--'}}</text>
						</view>
						<view class="w"></view>
						<view class="it">
							<text>建筑年代：</text>
							<text>{{houseDetail.jianzhund?houseDetail.jianzhund:'--'}}</text>
						</view>
						<view class="it">
							<text>总栋数：</text>
							<text>{{houseDetail.zdong?houseDetail.zdong:'--'}} 栋</text>
						</view>
						<!-- <view class="it">
							<text>总户数：</text>
							<text>{{houseDetail.zhs?houseDetail.zhs:'--'}} 户</text>
						</view> -->
						<view class="it">
							<text>车位总数：</text>
							<text>{{houseDetail.cwzong?houseDetail.cwzong:'--'}}</text>
						</view>
						<view class="it">
							<text>停车月费：</text>
							<text>{{houseDetail.tincyf?houseDetail.tincyf:'--'}}</text>
						</view>
						<view class="it">
							<text>物业公司：</text>
							<text>{{houseDetail.wygs?houseDetail.wygs:'--'}}</text>
						</view>
						<view class="it">
							<text>物业单价：</text>
							<text>{{houseDetail.wydj?houseDetail.wydj:'--'}} 元/㎡</text>
						</view>
					</view>
					<view v-if="activeIndex == 2" class="i" style="margin-top: 20rpx;">
						<view class="w">
							<text>天府编号：</text>
							<text>{{houseDetail.bh?houseDetail.bh:'--'}}</text>
						</view>
						<view class="w">
							<text>房源户型：</text>
							<text>{{houseDetail.fyhx?houseDetail.fyhx:'--'}}</text>
						</view>
						<view class="it">
							<text>产权日期：</text>
							<text>{{houseDetail.cqrq?houseDetail.cqrq:'--'}}</text>
						</view>
						<view class="it">
							<text>产权面积：</text>
							<text>{{houseDetail.cqmj?houseDetail.cqmj:'--'}}m²</text>
						</view>
						<view class="it">
							<text>套内面积：</text>
							<text>{{houseDetail.tnmj?houseDetail.tnmj:'--'}}m²</text>
						</view>
						<view class="it">
							<text>供暖方式：</text>
							<text>{{houseDetail.gl?houseDetail.gl:'--'}}</text>
						</view>
						<view class="it">
							<text>梯户比例：</text>
							<text>{{houseDetail.tihb1?houseDetail.tihb1:'--'}}梯{{houseDetail.tihb?houseDetail.tihb:'--'}}户</text>
						</view>
						<view class="it">
							<text>房本年限：</text>
							<text>{{houseDetail.fbnx?houseDetail.fbnx:'--'}}</text>
						</view>
						<view class="it">
							<text>房屋用途：</text>
							<text>{{houseDetail.fwyt?houseDetail.fwyt:'--'}}</text>
						</view>
						<view class="it">
							<text>交易权属：</text>
							<text>{{houseDetail.jyqs?houseDetail.jyqs:'--'}}</text>
						</view>
						<view class="it">
							<text>产权所有：</text>
							<text>{{houseDetail.cqsy?houseDetail.cqsy:'--'}}</text>
						</view>
						<view class="it">
							<text>是否贷款：</text>
							<text>{{houseDetail.fwdy?houseDetail.fwdy:'--'}}</text>
						</view>
					</view>
				</scroll-view>
			</tm-sheet>
			<view class="side">小区经纪人</view>
			<view class="flex-between mb-20" v-for="(item,index) in agents" :key="index">
				<tm-avatar :size="100" :shadow="4" :src="'https://static.tianfucd.com/'+item.avatar_file" ></tm-avatar>
				<view style="text-align: left !important;width: 350rpx;">
					<view style="font-size: 32rpx;font-weight: 700;">
						{{item.uname}}
						<text class="ml-20" style="font-size: 24rpx;font-weight: 400;color: #999999;">
							{{item.gs}}
						</text>
					</view>
					<view style="font-size: 32rpx;font-weight: 400;color: #666666;">
						上线 {{item.count}} 套房源
					</view>
				</view>
				<view class="flex-col mr-20">
					<view class="flex-start" @tap="chat(1)">
						<tm-icons size="32" color="cyan" name="icon-headset"></tm-icons>
						<view class="text-size-xxs" style="color: #666666;">在线聊</view>
					</view>
					<view class="flex-start" @tap="call(item.utel)">
						<tm-icons size="32" color="cyan" name="icon-phone"></tm-icons>
						<view class="text-size-xxs" style="color: #666666;">打电话</view>
					</view>
				</view>
			</view>
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
		<view class="footer2 " v-if="!(houseDetail.uid == thisUser.uid || houseDetail.gsname == thisUser.gs)">
			<block v-for="(item,index) in agents" :key="index">
				<block v-if="index==0">
					<view class="n" @tap="shop(item.uid)">
						<image :src="'https://static.tianfucd.com/'+item.avatar_file" mode="aspectFill"></image>
						<view class="n1">
							<text>{{item.uname}}</text>
							<text>{{item.typeip}}</text>
						</view>
					</view>
					<button @tap="call(item.mot)" class="btn2">交易服务</button>
					<button class="btn3" @tap="subscribe(houseDetail.bh,houseDetail.xq,item.mot)">预约看房</button>
				</block>
			</block>
		</view>
		<view class="footer2" v-else>
			<button v-if="receive > 0" class="btn3">已领取房源</button>
			<button v-else @tap="goReceive(houseDetail.bh)" class="btn3">领取房源</button>
			<button @tap="yzShow = true" class="btn2">业主信息</button>
			<button class="btn3" @tap="goFollowUp(houseDetail.bh)">房源跟进</button>
		</view>
		<tm-poup v-model="yzShow" :height="450" position="bottom">
			<view class="text-size-lg text-weight-b text-align-center py-30">
				业主信息
			</view>
			<tm-empty v-if="OwnerInfo == '暂无权限!'" class="pt-n20" :label="OwnerInfo"></tm-empty>
			<view class="flex-between mb-20">
				<view class="ml-50" style="text-align: left !important;">
					<view style="font-size: 32rpx;font-weight: 700;">
						{{OwnerInfo.fdname}}
					</view>
					<view style="font-size: 32rpx;font-weight: 400;color: #666666;">
						{{OwnerInfo.fdmot1}}
					</view>
				</view>
				<view class="flex-col mr-50" v-if="OwnerInfo.type == 1">
					<view class="flex-start" @tap="call(OwnerInfo.fdmot)">
						<tm-icons size="64" color="cyan" name="icon-phone"></tm-icons>
					</view>
				</view>
			</view>
			<view class="flex-between mb-20">
				<view class="ml-50" style="text-align: left !important;">
					<view style="font-size: 32rpx;font-weight: 700;">
						{{OwnerInfo.fadd}}
					</view>
					<view style="font-size: 32rpx;font-weight: 400;color: #666666;">
						{{OwnerInfo.dong1}}栋{{OwnerInfo.dy1}}单元{{OwnerInfo.lc1}}楼{{OwnerInfo.room_num}}号
						<text style="margin-left: 20rpx;" v-if="houseDetail.kfang != ''">(看房：{{houseDetail.kfang}})</text>
					</view>
				</view>
			</view>
			<view class="flex-between mb-20">
				<view class="ml-50" style="text-align: left !important;">
					<view style="font-size: 32rpx;font-weight: 700;">
						首录人
					</view>
					<view style="font-size: 32rpx;font-weight: 400;color: #666666;">
						{{houseDetail.lxr}}
					</view>
				</view>
				<view class="flex-col mr-50">
					<view class="flex-start" @tap="call(houseDetail.mot)">
						<tm-icons size="64" color="cyan" name="icon-phone"></tm-icons>
					</view>
				</view>
			</view>
		</tm-poup>
		<previewImage ref="previewImage" :imgs="houseDetail.imgs" :descs="houseDetail.descs" :saveBtn="false" :rotateBtn="false"></previewImage>
		<previewImage ref="previewHx" :imgs="[houseDetail.hx_images]" :descs="['户型图']" :saveBtn="false" :rotateBtn="false"></previewImage>
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
	import tmIcons from '@/tm-vuetify/components/tm-icons/tm-icons.vue';
	import tmAvatar from '@/tm-vuetify/components/tm-avatar/tm-avatar.vue';
	import tmCol from '@/tm-vuetify/components/tm-col/tm-col.vue';
	import tmPoup from '@/tm-vuetify/components/tm-poup/tm-poup.vue';
	import tmShareSheet from '@/tm-vuetify/components/tm-shareSheet/tm-shareSheet.vue';
	import tmMenubars from '@/tm-vuetify/components/tm-menubars/tm-menubars.vue';
	import previewImage from '@/components/kxj-previewImage/kxj-previewImage.vue';
	import tmEmpty from '@/tm-vuetify/components/tm-empty/tm-empty.vue';
	
	import explanation from '@/pagesHouse/components/explanation/explanation.vue';
	
	let QQMapWS = require("../../js_sdk/skyrrrt-ws-jssdk/qqmap-ws-jssdk.js"); // 实例化API核心类
	// 实例化API核心类
	let qqmapsdk = new QQMapWS.default({
		key: 'XJTBZ-XW5K4-5KBU6-D37VL-LAHGF-RSBBI'
	});

	export default {
		components: {
			tmCol,mapMini,homeListItem,homeGodList,
			tmImages,tmSheet,tmTabs,tmIcons,tmAvatar,
			tmPoup,tmShareSheet,tmMenubars,previewImage,tmEmpty,explanation
		},
		data( ) {
			return {
				ditie:[],
				agents:[],
				
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
				
				config: {
					title:"二手房详情", //title
					bgcolor:"#fafafa", //背景颜色
					fontcolor:"black", //文字颜色，默认白色
					// #ifdef MP-WEIXIN
					type: 1, //type 1，3胶囊 2，4无胶囊模式
					// #endif
				},
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
				
				houseAgent:[],
				
				thisUser:[],
				
				
				receive:0,
				
				yzShow:false,
				
				houseFollow:[],
				OwnerInfo:{},
				
				gallery_select : -1,
				current_item_id:'0',
			};
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},

		
		props: {},
		onLoad: function(options) {
			let that = this
			const id = options.id?options.id:options.scene
			if(options.id){
				const id = options.id;
				if((id != null && id != '' && id > 0)){
					that.getRentHouseDetail(id)
				}else{
					uni.navigateTo({
						url: "/pagesHouse/rentHouse/rentHouse"
					});
				}
			}else{
				var scene = options.scene.split('_')
				const id = scene[0];
				if((id != null && id != '' && id > 0)){
					that.getRentHouseDetail(id,scene[1])
					that.getHouseAgent(id)
				}else{
					uni.navigateTo({
						url: "/pagesHouse/rentHouse/rentHouse"
					});
				}
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
				title: houseDetail.xq + ' 【' + houseDetail.cqmj + '㎡】 【' +houseDetail.huxing+ '】 【'+houseDetail.money1+houseDetail.jgdw+'】' ,
				path: '/pagesHouse/rentDetail/rentDetail?scene='+houseDetail.id+'_'+thisUser.id
		    }
		},
		methods: {
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
			watchVideo:function(video,title){
				if(video != '' && video != null){
					uni.navigateTo({
						url:'../esHouseDetail/watchVideo?video='+video+'&title='+title
					})
				}else{
					uni.showToast({
						icon:'none',
						title:'视频拍摄中'
					})
				}
			},
			/**
			 * 轮播切换
			 * @param {Object} item
			 */
			current_change(item){
				let that = this
				that.setData({
					gallery_select : item.detail.currentItemId == 'hx0' ? 0 : 1,
					current_item_id : item.detail.currentItemId
				})
			},
			/**
			 * 切换内容
			 * @param {Object} f
			 */
			gallery_sel(f){
				let that = this
				let gallery_select = that.gallery_select
				let current_item_id = that.current_item_id
				if(f == 'v'){
					if(that.houseDetail.video){
						gallery_select = 0,
						current_item_id = f+'0'
					}else{
						uni.showToast({
							icon:'none',
							title:"暂无视频"
						})
					}
				}else if(f == 'p'){
					gallery_select = 1,
					current_item_id = f+'0'
				}else if(f == 'hx'){
					gallery_select = 0,
					current_item_id = f+'0'
				}
				that.setData({
					gallery_select:gallery_select,
					current_item_id:current_item_id
				})
			},
			previewOpen(e,ifhx) {
				if(ifhx){
					this.$refs.previewHx.open(e);
					return;
				}else{
					this.$refs.previewImage.open(e);
					return;
				}
			},
			/**
			 * 获取业主信息
			 */
			getOwnerInfo:function(){
				let that = this
				that.$apis.getOwnerInfo({
					'bh' : that.houseDetail.bh
				}).then(res => {
					if(res != '' && res != null){
						res.fdmot1 = res.fdmot.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
						that.setData({
							OwnerInfo : res
						})
					}
				})
			},
			/*监听分享选项*/
			shereClick: function(e) {
				let that = this
				switch (e.data.name) {
					case '分享海报':
						uni.navigateTo({
							url:"../../pagesTools/pages/houseShare/houseShare?id="+that.houseDetail.id
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
			goReceive:function (bh) {
				let that = this
				that.$apis.goReceive({
					bh:bh
				}).then(res => {
					uni.showToast({
						icon:"success",
						title:"成功"
					})
					that.setData({
						receive:1
					})
				})
			},
			/**
			 * 是否领取房源
			 * @param {Object} bh
			 */
			getReceive:function(bh){
				let that = this
				that.$apis.getReceive({
					bh:bh
				}).then(res => {
					that.setData({
						receive:res.count
					})
				})
			},
			/**
			 * 跳转到跟进页面
			 * @param {Object} bh
			 */
			goFollowUp:function(bh){
				uni.navigateTo({
					url:"../../pagesUser/shop/follow_up?bh="+bh
				})
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
						that.getReceive(that.houseDetail.bh)
						that.getOwnerInfo()
					}
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
					url:"../esMap/esMap?id="+id
				})
			},
			/**
			 * 获取可用经纪人列表
			 * @param {Object} bh
			 */
			houseAgentList:function(bh,user_id=''){
				let that = this
				that.$apis.houseAgentList({
					bh:bh,
					user_id:user_id
				}).then(res => {
					that.setData({
						agents:res
					})
				})
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
			 * 获取房源信息
			 */
			getRentHouseDetail:function(id,user_id=''){
				let that = this
				that.$apis.getRentHouseDetail({
					'id':id
				}).then(res => {
					if(res != '' && res != null){
						that.isLogin(res.id)
						let gallery_select = that.gallery_select;
						let current_item_id = that.current_item_id
						
						if(res.hx_images){
							gallery_select = 0,
							current_item_id = 'hx0'
						}else{
							gallery_select = 1,
							current_item_id = 'p0'
						}
						that.setData({
							houseDetail:res,
							gallery_select:gallery_select,
							current_item_id:current_item_id,
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
						that.houseAgentList(res.bh,user_id)
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

			call(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				});
			},
			chat(id) {
				uni.showToast({
					icon:"error",
					title:"暂未开放该功能"
				})
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
		bottom: 0rpx;
		color: white;
		justify-content: space-around;
		box-sizing: border-box;
		height: 80rpx;
		line-height: 80rpx;
		padding: 0rpx 40rpx;
		margin-top: -8px;
	}
	
	
	
	.t {
		font-size: 25rpx;
		width: 150rpx;
		float: right;
	}
	.icon-dian{
		height: 20rpx;
		width: 20rpx;
		border-radius: 10rpx;
		margin: 30rpx 0rpx;
		background-color: #fff;
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
	
	.icon-fenxiang,
	.icon-shoucang1 {
		font-family: 'iconfont';
		font-size: 55rpx;
		color: #7a7a7a;
	}
	
	.rt1 {
		font-size: 18rpx;
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
		color: #f74c18;
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
		margin-right: 20rpx;font-size: 16rpx;background-color: #eeeeee;padding: 4rpx 15rpx;color: #757575;margin-bottom: 24rpx;
	}
	#myVideo{
		width: 100%;
	}
	
	.gallery-button {
	    position: absolute;
	    display: -webkit-inline-box;
	    display: inline-flex;
	    -webkit-box-orient: horizontal;
	    -webkit-box-direction: normal;
	    flex-direction: row;
	    left: 50%;
	    -webkit-transform: translateX(-50%);
	    transform: translateX(-50%);
	    border-radius: 2px;
	    z-index: 2;
		margin-top: -90rpx;
	}
	.gallery-button-tag {
	    font-size: 12px;
	    font-family: PingFangSC-Regular,PingFang SC;
	    color: #ffffff;
		background-color: #bcbcbc;
	    display: inline-block;
	    width: 120rpx;
	    height: 60rpx;
	    line-height: 60rpx;
	    text-align: center;
	}
	.gallery-button-tag-active{
	    background: #23c993;
	    border-radius: 2px 0 0 2px;
	    color: #fff;
	}
</style>
<template>
	<view>
		<tm-menubars style="position: fixed;z-index: 999999;" :title="house_name+'出租'" :transparent="true" iconColor="white"></tm-menubars>
		<view class="city-search-wrap" style="position: fixed;z-index: 997;" @touchmove.stop.prevent="moveHandle">
			<view  :style="{ height: topHeight.height+'px' }"></view>
			
			<tm-tabs v-model="activeIndex" @change="protectionSelect" :list="Flist" height="60" align="center" range-key="title"></tm-tabs>
			<view class="search">
				<view class="l-search">
					<view class="searchIcon">
						<tm-icons size="32" name="icon-search" style="line-height: 32rpx;"></tm-icons>
					</view>
					<input class="input-search" type="text" confirm-type="搜索" :value="inputvalue" @input="searchChange" @confirm="getRentList(undefined)" placeholder="请输入关键字" placeholder-style="color:#8E8F97" />
					<view class="searchBtn" @click="clearSearch" v-if="isClearBtn">
						取消
					</view>
				</view>
			</view>
			
			
			<HM-filterDropdown :menuTop="80" :filterData="filterData" :defaultSelected="filterDropdownValue"
				:updateMenuName="true" @confirm="confirm" dataFormat="Object">
			</HM-filterDropdown>
			<view class="reach-content" style="height: 70vh;"  v-if="searchFocus">
				<view v-if="searchData.length>0">
					<scroll-view style="height: 70vh;" scroll-y="true" class="scroll-Y">
						<view  v-for="item in searchData" :key="item.id" class="li flex-start" :data-xq="item.xq" @click="inputSearch">
							<view style="width: 120rpx;">
								<tm-tags color="bg-gradient-amber-accent" size="s" model="fill" >小区</tm-tags>
							</view>
							<view style="margin: auto;width: 480rpx;">
								<view style="font-size: 28rpx;margin: 0 10rpx;text-align: left;">
									{{item.xq}}
								</view>
								<view v-if="item.dt" style="float: left;font-size: 22rpx;color: #bdbdbd;margin: 0 10rpx;">
									{{item.dt}}
								</view>
								<view v-if="item.tihb1 && item.tihb" style="float: left;font-size: 22rpx;color: #bdbdbd;margin: 0 10rpx;">
									{{item.tihb1}}梯{{item.tihb}}户
								</view>
							</view>
							<text style="font-size: 26rpx;color: #D50000;font-weight: bold;line-height: 62rpx;width:100rpx ;">
								{{item.fangNum}}套
							</text>
						</view>
					</scroll-view>
				</view>
				<view class="has-no-data" v-if="hasNoData">
					<tm-empty model="refresh"></tm-empty>
				</view>
			</view>
		</view>
		<view :style="{ height: (topHeight.height+55+44+40)+'px' }"></view>
		<!-- 出租 -->
		<home-god :key="page" :titShow="false" v-bind:homeListItem="rent_hou" :homeFeuer="homeRENT"></home-god>
		<tm-loadding v-if="loadmoreShow"></tm-loadding>
		<tm-divider style="margin-bottom: 30rpx;" v-if="!loadmore" text="没有更多内容了Σ(°Д°;"></tm-divider>
	</view>
</template>

<script>
	import utils from "@/utils/util.js"
	import homeGod from "@/components/homeGod/homeGod";
	import tmDropDownMenu from '@/tm-vuetify/components/tm-dropDownMenu/tm-dropDownMenu.vue';
	import tmSticky from '@/tm-vuetify/components/tm-sticky/tm-sticky.vue';
	import tmLoadding from '@/tm-vuetify/components/tm-loadding/tm-loadding.vue';
	import tmEmpty from '@/tm-vuetify/components/tm-empty/tm-empty.vue';
	import tmTranslate from '@/tm-vuetify/components/tm-translate/tm-translate.vue';
	import tmIcons from '@/tm-vuetify/components/tm-icons/tm-icons.vue';
	import tmRow from '@/tm-vuetify/components/tm-row/tm-row.vue';
	import tmCol from '@/tm-vuetify/components/tm-col/tm-col.vue';
	import tmTags from '@/tm-vuetify/components/tm-tags/tm-tags.vue';
	import tmMenubars from '@/tm-vuetify/components/tm-menubars/tm-menubars.vue';
	import tmDivider from '@/tm-vuetify/components/tm-divider/tm-divider.vue';
	import tmTabs from '@/tm-vuetify/components/tm-tabs/tm-tabs.vue';
	import HMFilterDropdown from '../components/HM-filterDropdown/HM-filterDropdown.vue';
	var app = getApp();
	export default {
		components: {
			tmRow,tmCol,tmTags,tmDivider,tmMenubars,HMFilterDropdown,
			homeGod,tmDropDownMenu,tmSticky,tmLoadding,tmEmpty,tmTranslate,tmIcons,tmTabs
		},
		data() {
			return {
				filterDropdownValue:[
				],
				filterData: [],
				
				topHeight:{},
				searchH:null,
				house_name: '住宅',
				dropDownShow:false,
				list:[
					{title: '区域',children: [{model: "radio",children: []}]},
					{title: '价格',children: [{model: "radio",children: [{'id':1,'title':'123'}]}]},
					{title: '户型',children: [{model: "radio",children: [{id: 0,title: '不限'}, {id: 1,title: '1居室'}, {id: 2,title: '2居室'}, {id: 3,title: '3居室'}, {id: 4,title: '4居室'}]}]},
					{title: '类型',children: [{model: "radio",children: [{id: 0,title: '不限'}, {id: 2,title: '住宅'}, {id: 1,title: '商铺'}, {id: 1,title: '写字楼'}]}]},
				],
				rent_hou: [],
				homeRENT: [{title01: "",title02: "",more:"",img: ""}],
				searchFocus: false,
				hasNoData: true,
				isClearBtn: false,
				searchData: [], // 搜索的数据
				loadmoreShow:false,
				//进入加载
				id: '',
				inputvalue: '',
				page: 1,
				loadmore: true,
				//加载状态
				area: 0,
				yx: 'none',
				key: "",
				zfPrice:'',
				hx:'',
				souvalue: [],
				dis_id: "",
				name: "",
				activeIndex:0,
				Flist:[ '业主租房','平台租房'],
				house_uid:"",//店铺筛选选项
			};
		},
		
		props: {},
		onReachBottom: function() {
			// console.log('加载更多');
			var that = this;
			var page = that.page;
			page = page + 1;
			if(page > 1 && that.loadmore){
				that.setData({
					loadmoreShow:true
				})
			}
			setTimeout(() => {
				that.setData({
					page: page
				});
				if (that.loadmore) {
					that.getRentList();
				}
			}, 1000);
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			var that = this;
			that.getSearch();
			var input_val = options.input_val;
			if (input_val == undefined) {
				input_val = '';
			}
			that.setData({
				inputvalue:input_val
			})
			if(options.wylx != null && options.wylx != undefined){
				that.setData({
					house_name:options.wylx
				})
			}
			if(options.uid != null && options.uid != undefined){
				that.setData({
					house_uid:options.uid
				})
			}
			that.getRentList(input_val)
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {
			const that = this
			uni.getSystemInfo({
			    success: function (res) {
					that.setData({
						searchH : (res.pixelRatio * res.windowHeight)
					})
			    }
			});
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			let that = this
			that.topHeight = utils.getTop()
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
		 * 用户点击右上角分享
		 */
		onShareAppMessage(res) {
		    return {
				title: '天府网',
		    }
		},
		methods: {
			/**
			 * 获取检索条件
			 */
			getSearch:function(){
				let that = this
				that.$apis.getSearch({
					'area' : uni.getStorageSync('cityCode'),
					'wylx' : that.house_name,
					'type1' : '出租'
				}).then(res => {
					res[3]['submenu'][2] = {
						'name' : '房源归属(单选)',
						'submenu' : [
							{'name':'本人','value':'1'},
							{'name':'公司','value':'2'}
						]
					}
					that.setData({
						filterData:res
					})
				})
				setTimeout(() => {
					this.changeSelected();
				}, 500);
			},
			//修改选中项-示例
			changeSelected() {
				//设置选中项
				let that = this
				that.filterDropdownValue = [];
				that.$nextTick(() => {
					that.filterDropdownValue = [
						[0,0,0],
						[],
						[],
						[]
					];
				})
			},
			
			
			protectionSelect:function(f){
				let that = this
				that.setData({
					isProtection:f==1?1:0,
					esHouseList: [],
					page:1,
					searchFocus : false,
					loadmoreShow:false,
					loadmore:true
				})
				that.getRentList(undefined)
			},
			//二手房列表
			getRentList:function(input_val=undefined,p=false){
				let that = this
				if (input_val == undefined || input_val == '' || input_val == null) {
					input_val=that.inputvalue
				}
				if(p) {
					that.setData({
						page:1,
						rent_hou:[]
					})
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 300
					})
				}
				that.$apis.getRentListsByCompany({
					'area' : uni.getStorageSync('cityCode'),
					'area2' : that.area2?that.area2:'',
					'area3' : that.area3?that.area3:'',
					'hx' : that.hx?that.hx:'',
					'mianji' : that.mianji?that.mianji:'',
					'esf_price' : that.esPrice?that.esPrice:'',
					'zxqk': that.zxqk?that.zxqk:'',
					'fwyt': that.fwyt?that.fwyt:'',
					'house_uid' : that.house_uid,
					'key' : input_val,
					'page':that.page,
					'from' : 0,
					'wylx' : this.house_name=='不限'?'':this.house_name,
					'isProtection' : that.isProtection,
					'ifpt' : that.activeIndex,
					'ssy':that.ssy?that.ssy:'',
				}).then(res => {
					if (res != null) {
						if (that.page == 1) {
							that.setData({
								rent_hou: res,
								searchFocus : false,
								loadmoreShow:false
							});
						} else {
							var messageList = that.rent_hou;
							for (var i = 0; i < res.length; i++) {
								messageList.push(res[i]);
							}
							that.setData({
								rent_hou: messageList,
								searchFocus : false,
								loadmoreShow:false
							});
						}
						if (res.length < 6 && res.length > 0) {
							that.setData({
								loadmore: false
							});
						}
						if (res.length <= 0) {
							that.setData({
								loadmore: false,
							});
							uni.showToast({
								title: '没有更多数据了…^_^',
								icon: 'none',
								duration: 2000
							});
						}
					} else {
						that.setData({
							rent_hou: []
						});
					}
				});
			},
			searchChange(e) {
				let that = this
				let {value} = e.detail;
				that.setData({
					inputvalue:value,
					searchFocus : true,
				})
				// if(that.isClearBtn == false && value != '') that.$refs.a_1.play()
				if(value != ''){
					that.$apis.getRentSearch({
						'area' : uni.getStorageSync('cityCode'),
						'key' : that.inputvalue,
						'fwyt': that.fwyt?that.fwyt:'',
						'wylx' : that.fwlx&&that.fwlx!='不限'?that.fwlx:that.house_name,
					}).then(res => {
						if(res.length > 0){
							that.searchFocus = true 
							that.hasNoData = false
							that.searchData = res
							that.isClearBtn = true
						}else{
							that.searchFocus = false
							that.hasNoData = true
							that.searchData = []
							that.isClearBtn = false
						}
					})
				}else{
					that.searchFocus = false
					that.isClearBtn = false
					that.searchData = []
					that.hasNoData = true
				}
			},
			//关闭快速搜索
			clearSearch(e){
				const that = this
				that.setData({
					inputvalue : '',
					isClearBtn : false,
					searchFocus : false
				})
			},
			// 搜索框输入搜索
			inputSearch: function(name) {
				let that = this
				var house_name = that.house_name;
				if (name !== '' && house_name !== '') {
					that.inputvalue = name.currentTarget.dataset.xq
					that.hasNoData = true
					that.searchData = []
					that.isClearBtn = false
					that.searchFocus = false
					that.getRentList(name.currentTarget.dataset.xq,true)
				} else {
					uni.showToast({
						title: '房屋搜索条件不匹配',
						icon: 'loading',
						duration: 1500
					});
					that.hasNoData = true
					that.searchData = []
					that.isClearBtn = false
					that.searchFocus = false
				}
			},
			//下拉菜单检索
			confirm:function(e){
				let that = this
				let esPrice = e.value[2][0];
				that.setData({
					area2:e.value[0][1],
					area3:e.value[0][2],
					hx:e.value[1][0][0],
					mianji:e.value[1][1][0],
					esPrice:esPrice,
					fwyt: e.value[3][0][0],
					zxqk : e.value[3][1][0],
					ssy : e.value[3][2][0],
					esHouseList: [],
					page:1,
					searchFocus : false,
					loadmoreShow:false,
					loadmore:true
				});
				that.getRentList(undefined,true)
			},
		}
	};
</script>
<style lang="less" scoped>
	.city-search-wrap {
		width: 100%;
		box-sizing: border-box;
	
		.search {
			width: 750rpx;
			height: 110rpx;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			color: #222;
			padding: 14rpx 36rpx;
			box-sizing: border-box;
			background: #fff;
	
			.l-search {
				width: 597rpx;
				position: relative;
				height: 72rpx;
				line-height: 72rpx;
				.searchIcon {
					font-size: 28rpx;
					position: absolute;
					left: 30rpx;
					top: 0;
					color: #8e8f97;
					font-weight: 700;
					height: 72rpx;
					line-height: 72rpx;
				}
				.searchBtn {
					font-size: 28rpx;
					position: absolute;
					right: -20rpx;
					top: 0;
					color: #8e8f97;
					font-weight: 700;
					height: 72rpx;
					line-height: 72rpx;
				}
				.input-search {
					width: 680rpx;
					height: 72rpx;
					box-sizing: border-box;
					padding: 0 24rpx 0 84rpx;
					text-align: left;
					background: #f4f5f9;
					border-radius: 12rpx;
					border: 0;
				}
				.clear-input {
					font-size: 30rpx;
					position: absolute;
					right: 10rpx;
					top: 50%;
					transform: translateY(-50%);
					padding: 10rpx;
					color: #8e8f97;
				}
			}
		}
	}
	.reach-content {
		box-sizing: border-box;
		position: absolute; 
		z-index: 999999;
		width: 100%;
		background-color: white;
		.li {
			height: 70rpx;
			padding: 14rpx 36rpx;
			border-bottom: 2rpx solid #F5F5F5;
		}
	}
	.has-no-data {
		font-size: 24rpx;
		text-align: center;
		color: #8e8f97;
		margin-top: 50rpx;
	}
</style>
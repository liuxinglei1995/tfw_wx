<template>
	<view class="home">
		<tm-menubars style="position: fixed;z-index: 999999;" :title="house_name+'出售'" :transparent="true"
			iconColor="white"></tm-menubars>
		<view class="city-search-wrap" style="position: fixed;z-index: 997;" @touchmove.stop.prevent="moveHandle">
			<view :style="{ height: topHeight.height+'px' }"></view>

			<tm-tabs v-model="activeIndex" @change="fwlxSelect" :list="list" height="60" align="center"
				range-key="title"></tm-tabs>
			<view class="search">
				<view class="l-search">
					<view class="searchIcon">
						<tm-icons size="32" name="icon-search" style="line-height: 32rpx;" color="grey"></tm-icons>
					</view>
					<input class="input-search" type="text" confirm-type="搜索" :value="query.inputVal"
						@input="searchChange" @confirm="getEsListsByCompany()" placeholder="请输入关键字"
						placeholder-style="color:#8E8F97" />
					<view class="searchBtn" @click="clearSearch" v-if="isClearBtn">
						取消
					</view>
				</view>
			</view>

			<HM-filterDropdown :menuTop="80" :filterData="filterData" :defaultSelected="filterDropdownValue"
				:updateMenuName="true" @confirm="confirm" dataFormat="Object">
			</HM-filterDropdown>
			<view class="flex-between pt-10 pb-10 px-40" style="background-color: #FFF;">
				<tm-input name="dong1" :height="30" :border-bottom="false" placeholder="几栋" :padding="[5,0]"
					:vertical="true" border-color="grey-lighten-1" @input="searchDong" v-model="query.dong1"></tm-input>
				<tm-input name="dy1" :height="30" :border-bottom="false" placeholder="几单元" :padding="[5,0]"
					:vertical="true" border-color="grey-lighten-1" @input="searchDy" v-model="query.dy1"></tm-input>
				<tm-input name="lc1" :height="30" :border-bottom="false" placeholder="几楼" :padding="[5,0]"
					:vertical="true" border-color="grey-lighten-1" @input="searchLc" v-model="query.lc1"></tm-input>
				<tm-input name="room_num" :height="30" :border-bottom="false" placeholder="几号" :padding="[5,0]"
					:vertical="true" border-color="grey-lighten-1" @input="searchRn"
					v-model="query.room_num"></tm-input>
			</view>
			<view class="reach-content" style="height: 70vh;" v-if="searchFocus">
				<view v-if="searchData.length>0">
					<scroll-view style="height: 70vh;" scroll-y="true" class="scroll-Y">
						<view v-for="item in searchData" :key="item.id" class="li flex-start" :data-xq="item.xq"
							@click="getEsListsByCompany(item)">
							<view style="width: 120rpx;">
								<tm-tags color="bg-gradient-amber-accent" size="s" model="fill">小区</tm-tags>
							</view>
							<view style="margin: auto;width: 480rpx;">
								<view style="font-size: 28rpx;margin: 0 10rpx;text-align: left;">
									{{item.title}}
								</view>
								<view v-if="item.dt"
									style="float: left;font-size: 22rpx;color: #bdbdbd;margin: 0 10rpx;">
									{{item.dt}}
								</view>
								<view v-if="item.tihb1 && item.tihb"
									style="float: left;font-size: 22rpx;color: #bdbdbd;margin: 0 10rpx;">
									{{item.tihb1}}梯{{item.tihb}}户
								</view>
							</view>
							<text
								style="font-size: 26rpx;color: #D50000;font-weight: bold;line-height: 62rpx;width:100rpx ;">
								{{item.houseNum}}套
							</text>
						</view>
					</scroll-view>
				</view>
				<view class="has-no-data" v-if="hasNoData">
					<tm-empty model="refresh"></tm-empty>
				</view>
			</view>
		</view>
		
		<view :style="{ height: (topHeight.height+55+44+40+30)+'px' }"></view>
		<view class="px-30 py-10" v-if="xq_info">
			<view class="text-size-lg text-weight-b">
				{{xq_info.title}}
			</view>
			<view class="text-size-s pt-10">
				<text class="pr-10">{{xq_info.areaName}}</text>
				<text class="pr-10">{{xq_info.zoneName}}</text>
				<text class="pr-10" style="color: #b9b9b9;">{{xq_info.refPrice}} 元/㎡</text>
				<view class="pr-10" style="color: #b9b9b9;">
					住宅{{xq_info.sell_house_count}}套，车位{{xq_info.parking_space_count}}套
				</view>
			</view>
		</view>

		<index-house :homeFeuer="esHouseList" :houseid="this.query.type" :househead="2"></index-house>
		<u-loadmore :status="status" />
	</view>
</template>

<script>
	import utils from "@/utils/util.js"
	import indexHouse from "@/pagesHouse/components/index-house/index-house.vue";
	import tmLoadding from '@/pagesHouse/tm-vuetify/components/tm-loadding/tm-loadding.vue';
	import tmIcons from '@/pagesHouse/tm-vuetify/components/tm-icons/tm-icons.vue';
	import tmEmpty from '@/pagesHouse/tm-vuetify/components/tm-empty/tm-empty.vue';
	import tmTags from '@/pagesHouse/tm-vuetify/components/tm-tags/tm-tags.vue';
	import tmInput from '@/pagesHouse/tm-vuetify/components/tm-input/tm-input.vue';
	import tmMenubars from '@/pagesHouse/tm-vuetify/components/tm-menubars/tm-menubars.vue';
	import tmDivider from '@/pagesHouse/tm-vuetify/components/tm-divider/tm-divider.vue';
	import tmTabs from '@/pagesHouse/tm-vuetify/components/tm-tabs/tm-tabs.vue';

	import HMFilterDropdown from './HM-filterDropdown/HM-filterDropdown.vue';
	import {
		gethouseTitle,
		getxiaoqulist,
		test,
		getrefPriceHouse
	} from '@/api/houst.js'
	var app = getApp();
	export default {
		components: {
			indexHouse,
			tmLoadding,
			tmIcons,
			tmEmpty,
			tmTags,
			tmDivider,
			tmMenubars,
			tmTabs,
			tmInput,
			HMFilterDropdown
		},
		data() {
			return {
				//顶部高度
				topHeight: {},
				searchH: null,
				house_name: '住宅',
				esHouseList: [],
				homeES: [{
					title01: "",
					title02: "",
					more: "",
					type: 1,
					img: ""
				}],
				searchFocus: false,
				hasNoData: true,
				isClearBtn: false,
				searchData: [], // 搜索的数据
				loadmoreShow: false,

				//进入加载
				id: '',
				inputvalue: '',
				page: 1,
				loadmore: true,
				//加载状态
				yx: 'none',
				key: "",
				souvalue: [],
				dis_id: "",
				name: "",
				filterDropdownValue: [],
				filterData: [],

				house_uid: "", //店铺筛选选项
				area: "", //位置筛选条件
				area2: "", //区筛选条件
				area3: "", //片区筛选条件
				hx: '', //户型筛选条件
				mianji: '', //面积筛选条件
				esPrice: '', //价格筛选条件
				fwlx: '', //房屋类型筛选条件
				fangling: '', //房龄筛选条件
				zxqk: '', //装修情况筛选条件
				fbnx: '', //产权情况筛选条件
				fwxz: '', //房屋性质筛选条件
				fwyt: '', //房屋用途筛选条件

				fypj: '', //房源评级
				ssy: '', //房源归属（搜索源）

				activeIndex: 0,
				list: ['全部', '二手房', '新房单套'],
				fwlxVal: ['', '二手房', '新房'],
				xq_info:null,
				esHouseList: [],
				isLastPage: null,
				status: 'loadmore',
				query: {
					houseUid: null,
					inputVal: null,
					type: "0",
					isnewhouse: null,
					pageNum: 1,
					pageSize: 6,
					esfPrice: "",
					area2: "不限", //区筛选条件
					area3: "不限", //片区筛选条件
					area: 510100, //位置筛选条件
					mianji: 0, //面积筛选条件
					house_uid: "", //店铺筛选选项
					hx: '', //户型筛选条件
					mianji: '', //面积筛选条件
					esPrice: '', //价格筛选条件
					fwlx: '', //房屋类型筛选条件
					fangling: '', //房龄筛选条件
					zxqk: '', //装修情况筛选条件
					fbnx: '', //产权情况筛选条件
					fwxz: '', //房屋性质筛选条件
					fwyt: '', //房屋用途筛选条件
					fypj: '', //房源评级
					uid: null,
					dong1: '', //栋检索
					dy1: '', //单元检索
					lc1: '', //楼层检索
					room_num: '', //房号检索
				},
			};
		},


		props: {},
		onReachBottom: function() {
			// console.log('加载更多');
			var that = this;
			if (this.isLastPage) {
				this.status = 'nomore'
			} else {
				this.query.pageNum++;
				this.status = 'loading';
				setTimeout(() => {
					this.gethousetitle(this.query)
				}, 500)
			}

		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			console.log(options, "sssssssss");
			var that = this;
			that.getSearch();
			var input_val = options.input_val;
			if (input_val == undefined) {
				input_val = '';
			}
			that.setData({
				inputvalue: input_val
			})
			if (options.wylx != null && options.wylx != undefined) {
				that.setData({
					house_name: options.wylx
				})
			}
			if (options.uid != null && options.uid != undefined) {
				that.setData({
					house_uid: options.uid
				})
			}
			// that.getEsListsByCompany(input_val)
			this.gethousetitle(this.query);
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {
			const that = this
			uni.getSystemInfo({
				success: function(res) {
					that.setData({
						searchH: (res.pixelRatio * res.windowHeight)
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
			gethousetitle(query) {
				gethouseTitle(query).then(response => {
					console.log(response, "1111");
					this.isLastPage = response.data.isLastPage;
					this.esHouseList = this.esHouseList.concat(response.data.list)
					if (this.isLastPage) this.status = 'nomore';
				})
			},
			/**
			 * 房号搜索
			 * @param {Object} input
			 */
			searchRn: function(input) {
				let that = this
				that.setData({
					esHouseList: [],
					page: 1,
					searchFocus: false,
					loadmoreShow: false,
					loadmore: true
				})
				this.query.room_num = input,
					this.query.pageNum = 1,
					// that.getEsListsByCompany(undefined)
					this.gethousetitle(this.query);
			},
			/**
			 * 楼层检索
			 * @param {Object} input
			 */
			searchLc: function(input) {
				let that = this
				that.setData({

					esHouseList: [],
					page: 1,
					searchFocus: false,
					loadmoreShow: false,
					loadmore: true
				})
				this.query.lc1 = input,
					// that.getEsListsByCompany(undefined)
					this.query.pageNum = 1,
					this.gethousetitle(this.query);
			},
			/**
			 * 检索单元
			 * @param {Object} input
			 */
			searchDy: function(input) {
				let that = this
				that.setData({
					esHouseList: [],
					page: 1,
					searchFocus: false,
					loadmoreShow: false,
					loadmore: true
				})
				this.query.dy1 = input,
					// that.getEsListsByCompany(undefined)
					this.query.pageNum = 1,
					this.gethousetitle(this.query);
			},
			/**
			 * 搜索栋
			 * @param {Object} input
			 */
			searchDong: function(input) {
				let that = this
				that.setData({
					esHouseList: [],
					page: 1,
					searchFocus: false,
					loadmoreShow: false,
					loadmore: true
				})
				this.query.dong1 = input,
					// that.getEsListsByCompany(undefined)
					this.query.pageNum = 1,
					this.gethousetitle(this.query);
			},
			/**
			 * 房屋类型
			 * @param {Object} f
			 */
			fwlxSelect: function(f) {
				console.log(f, "aaaaaaa");
				let that = this
				if (f == 1) {
					f = 2
				} else if (f == 2) {
					f = 1
				}
				this.query.fwlx = f,
					this.esHouseList = [],
					this.query.page = 1,
					this.searchFocus = false,
					this.loadmoreShow = false,
					this.loadmore = true,
					this.gethousetitle(this.query)
			},
			/**
			 * 获取检索条件
			 */
			getSearch: function() {
				let that = this
				test(this.query.area, "1").then(res => {
					console.log(res, "wwwwwwwwwwww");
					res.data[3]['submenu'][6] = {
						'name': '房源归属(单选)',
						'submenu': [{
								'name': '本人',
								'value': '1'
							},
							{
								'name': '公司',
								'value': '2'
							}
						]
					}
					console.log(res.data, "sssss");
					that.setData({
						filterData: res.data
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
						[0, 0, 0],
						[],
						[],
						[]
					];
				})
			},
			//获取小区信息
			
			//二手房列表
			getEsListsByCompany(e) {
				console.log(e, "hhhhhhsssss");
				if (e) {
					this.query.inputVal=e.title
					getrefPriceHouse({
						id: e.id
					}).then(res => {
						console.log(res, "xxxxxxxx");
						this.xq_info = res.data
					})
				}
				let that = this
				let input_val = this.query.inputVal;
				console.log(input_val,this.query.inputVal,this.inputvalue, "11111111111111");
				this.esHouseList = [];
				this.query.pageNum = 1
				gethouseTitle({
					'inputVal': input_val,
					'type': this.query.type,
					'house_uid': that.house_uid,
					'page': that.page,
					'from': 2,
					'wylx': that.house_name,
					'area': uni.getStorageSync('cityCode'),
					'area2': that.area2 ? that.area2 : '',
					'area3': that.area3 ? that.area3 : '',
					'hx': that.hx ? that.hx : '',
					'mianji': that.mianji ? that.mianji : '',
					'fwlx': that.fwlx ? that.fwlx : '',
					'esfPrice': that.esPrice ? that.esPrice : '',
					'fangling': that.fangling ? that.fangling : '',
					'zxqk': that.zxqk ? that.zxqk : '',
					'fbnx': that.fbnx ? that.fbnx : '',
					'fwxz': that.fwxz ? that.fwxz : '',
					'fwyt': that.fwyt ? that.fwyt : '',
					'fypj': that.fypj ? that.fypj : '',
					'pageNum': this.query.pageNum,
					'uid': this.query.uid,
					'pageSize': 6,
				}).then(response => {
					console.log(response, "sadwd");
					this.isLastPage = response.data.isLastPage;
					if (response.data.total == 0) {
						this.status = 'nomore';
						this.searchFocus = false
						uni.showToast({
							title: '没有更多数据了…^_^',
							icon: 'none',
							duration: 2000
						});
					} else {
						console.log(response);
						this.esHouseList = this.esHouseList.concat(response.data.list)
						this.loading = false
						this.searchFocus = false
					}
				})
			},
			//二手房搜索
			searchChange(e) {
				let that = this
				let {
					value
				} = e.detail;
				that.setData({
					searchFocus: true,
				})
				this.query.inputVal=value
				// if(that.isClearBtn == false && value != '') that.$refs.a_1.play()
				if (value != '') {
					getxiaoqulist({
						searchValue: value,
						area: null,
						pageNum: 1
					}).then(res => {
						console.log(res, "jjjjjjjjjj");
						if (res.total > 0) {
							that.searchFocus = true
							that.searchData = res.rows
						} else {
							that.searchFocus = false
							that.searchData = []
						}
					})
				} else {
					that.searchFocus = false
					that.isClearBtn = false
					that.searchData = []
					that.hasNoData = true
				}
			},
			//关闭快速搜索
			clearSearch(e) {
				const that = this
				that.setData({
					inputvalue: '',
					isClearBtn: false,
					searchFocus: false
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
					that.getEsListsByCompany(name.currentTarget.dataset.xq, true)
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
			confirm: function(e) {
				console.log(e, "kkkkk")
				let that = this
				this.query.esfPrice = e.value[2][0]
				that.setData({
					area2: e.value[0][1],
					area3: e.value[0][2],
					hx: e.value[1][0][0],
					mianji: e.value[1][1][0],
					esPrice: e.value[2][0],
					fwyt: e.value[3][0][0],
					zxqk: e.value[3][1][0],
					fangling: e.value[3][2][0],
					fbnx: e.value[3][3][0],
					fwxz: e.value[3][4][0],
					fypj: e.value[3][5][0],
					ssy: e.value[3][6][0],
					esHouseList: [],
					page: 1,
					searchFocus: false,
					loadmoreShow: false,
					loadmore: true
				});
				let input_val = this.query.inputVal;
				this.query.pageNum = 1
				this.esHouseList = [];
				console.log(input_val, "11111111111111");

				gethouseTitle({
					'inputVal': input_val,
					'type': 0,
					'house_uid': that.house_uid,
					'page': that.page,
					'from': 2,
					'wylx': that.house_name,
					'area': uni.getStorageSync('cityCode'),
					'area2': that.area2 ? that.area2 : '',
					'area3': that.area3 ? that.area3 : '',
					'hx': that.hx ? that.hx : '',
					'mianji': that.mianji ? that.mianji : '',
					'fwlx': that.fwlx ? that.fwlx : '',
					'esfPrice': this.query.esfPrice ? this.query.esfPrice : '',
					'fangling': that.fangling ? that.fangling : '',
					'zxqk': that.zxqk ? that.zxqk : '',
					'fbnx': that.fbnx ? that.fbnx : '',
					'fwxz': that.fwxz ? that.fwxz : '',
					'fwyt': that.fwyt ? that.fwyt : '',
					'fypj': that.fypj ? that.fypj : '',
					'ssy': that.ssy ? that.ssy : '',
					'pageNum': this.query.pageNum,
					'uid': this.query.uid,
					'pageSize': 6,
				}).then(response => {
					console.log(response, "1111");
					this.isLastPage = response.data.isLastPage;
					this.esHouseList = this.esHouseList.concat(response.data.list)
					if (this.isLastPage) this.status = 'nomore';
				})
			},
		}
	};
</script>
<style lang="less" scoped>
	.home {
		width: 100%;
		overflow-x: hidden;
		overflow-y: hidden;
	}
	.city-search-wrap {
		width: 100%;
		box-sizing: border-box;

		.search {
			width: 750rpx;
			height: 55px;
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
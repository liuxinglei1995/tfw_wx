<template>
	<view class="home">
		<tm-menubars style="position: fixed;z-index: 999999;" :title="house_name+'出售'" iconColor="white"></tm-menubars>
		<view class="wrap" style="position:relative;z-index: 997;">
			<view :style="{ height: topHeight.height+'px' }"></view>
			<tmTabs v-model="activeIndex" @change="fwlxSelect" :list="list" height="60" align="center"
				range-key="title"></tmTabs>
			<view class="search">
				<view class="l-search">
					<view class="searchIcon">
						<tm-icons size="32" name="icon-search" style="line-height: 32rpx;" color="grey"></tm-icons>
					</view>
					<input class="input-search" type="text" confirm-type="搜索" v-model="query.inputVal"
						@input="searchChange" @confirm="getEsList()" placeholder="请输入关键字"
						placeholder-style="color:#8E8F97" />
					<view class="searchBtn" @click="clearSearch">取消</view>
				</view>
			</view>
			<!-- 组件 -->
			<HMFilterDropdown :menuTop="80" :filterData="filterData" :defaultSelected="filterDropdownValue"
				:updateMenuName="true" @confirm="confirm" dataFormat="Object">
			</HMFilterDropdown>
			<view class="reach-content" style="height: 70vh;" v-if="searchFocus">
				<view v-if="searchData.length>0">
					<scroll-view style="height: 70vh;" scroll-y="true" class="scroll-Y">
						<view v-for="item in searchData" :key="item.id" class="li flex-start" :data-xq="item.xq"
							@click="getEsList(item)">
							<view style="width: 120rpx;">
								<tm-tags color="bg-gradient-amber-accent" size="s" model="fill">小区</tm-tags>
							</view>
							<view style="margin: auto;width: 480rpx;">
								<view style="font-size: 28rpx;margin: 0 10rpx;text-align: left;">
									{{item.title}}
								</view>
								<view v-if="item.subway"
									style="float: left;font-size: 22rpx;color: #bdbdbd;margin: 0 10rpx;">
									近地铁
								</view>
								<view v-if="item.tihb1 && item.tihb"
									style="float: left;font-size: 22rpx;color: #bdbdbd;margin: 0 10rpx;">
									{{item.tihb1}}梯{{item.tihb}}户
								</view>
							</view>
							<text
								style="font-size: 26rpx;color: #D50000;font-weight: bold;line-height: 62rpx;width:100rpx ;">
								{{item.sellHouseNum}}套
							</text>
						</view>
					</scroll-view>
				</view>
			</view>


			<!-- <view :style="{ height: (topHeight.height+55+44+40)+'px' }"></view> -->
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


			<indexHouse :homeFeuer="houselist" :houseid="this.query.type" :househead="0"></indexHouse>

			<uLoadmore :status="status" />


		</view>
	</view>
</template>

<script>
	import utils from "@/utils/util.js"
	import tmTabs from '@/pagesHouse/tm-vuetify/components/tm-tabs/tm-tabs.vue';
	import HMFilterDropdown from './HM-filterDropdown/HM-filterDropdown.vue';
	import uSkeleton from "@/pagesHouse/uview-ui/components/u-skeleton/u-skeleton.vue"
	import uLoadmore from "@/pagesHouse/uview-ui/components/u-loadmore/u-loadmore.vue"
	import indexHouse from "@/pagesHouse/components/index-house/index-house.vue";
	import {
		gethouseTitle,
		test,
		getxiaoqulist,
		getrefPriceHouse
	} from '@/api/houst.js'
	export default {
		components: {
			tmTabs,
			HMFilterDropdown,
			uSkeleton,
			uLoadmore,
			indexHouse
		},
		data() {
			return {
				loading: true,
				//顶部高度
				topHeight: {},
				house_name: '住宅',
				esHouseList: [],
				activeIndex: 0,
				inputval: null,
				list: ['全部', '二手房', '新房单套'],
				fwlxVal: ['', '二手房', '新房'],
				searchFocus: false,
				hasNoData: true,
				isClearBtn: false,
				filterData: [],
				isLastPage: null,
				searchData: [], // 搜索的数据
				query: {
					houseUid: null,
					inputVal: null,
					type: "",
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
					houseType: null,
					minArea: null,
					maxArea: null,
				},
				filterDropdownValue: [],
				status: 'loading',
				house_uid: "", //店铺筛选选项
				area: "", //位置筛选条件
				area2: "不限", //区筛选条件
				area3: "不限", //片区筛选条件
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
				houselist: [],
				xq_info: null
			}
		},
		onShareAppMessage: function() {
			return {
				title: '自家店  实在',
				path: '/pagesHouse/eshouse/eshouse?type=0'
			};
		},
		methods: {
			gethousetitle(query) {
				console.log(query, '--->query')
				gethouseTitle(query).then(response => {
					console.log(response, '--->response')
					
					if (response.data.total == 0) {
						this.status = 'nomore';
						this.searchFocus = false
						uni.showToast({
							title: '没有更多数据了…^_^',
							icon: 'none',
							duration: 2000
						});
					} else {
						this.isLastPage = response.data.isLastPage;
						this.houselist = this.houselist.concat(response.data.list)
					}
				})
			},
			// 搜索
			searchChange(e) {
				let that = this
				let {
					value
				} = e.detail;
				that.setData({
					searchFocus: true,
				})
				if (value != '') {
					getxiaoqulist({
						searchValue: value,
						area: that.query.area,
						pageNum: 1
					}).then(res => {
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
					that.searchData = []

				}
			},
			//下拉菜单检索
			confirm: function(e) {
				this.query.esfPrice = e.value[2][0]
				let minArea = null
				let maxArea = null
				if(e.value[5] != null) {
					minArea = e.value[5][0];
					maxArea = e.value[5][1];
				}
				let that = this
				console.log(e.value);
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
					esHouseList: [],
					page: 1,
					searchFocus: false,
					loadmoreShow: false,
					loadmore: true,
					minArea: minArea,
					maxArea: maxArea,
				});
				that.getEsList()
			},
			//二手房列表
			getEsList(e) {
				console.log(e, '--->ee')
				if (e) {
					this.query.inputVal = e.title
					getrefPriceHouse({
						id: e.id
					}).then(res => {
						this.xq_info = res.data
					})
				}
				let that = this
				let input_val = that.query.inputVal;
				that.houselist = [];
				that.query.pageNum = 1
				that.query = {
					'inputVal': input_val,
					'type': that.query.type,
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
					'pageNum': that.query.pageNum,
					'uid': that.query.uid,
					'pageSize': 6,
					'houseType': that.query.houseType,
					'minArea': that.minArea,
					'maxArea': that.maxArea,
				}
				gethouseTitle(that.query).then(response => {
					console.log(response, "sadwd");
					that.isLastPage = response.data.isLastPage;
					if (response.data.total == 0) {
						that.status = 'nomore';
						that.searchFocus = false
						uni.showToast({
							title: '没有更多数据了…^_^',
							icon: 'none',
							duration: 2000
						});
					} else {
						console.log(response);
						that.houselist = that.houselist.concat(response.data.list)
						that.loading = false
						that.searchFocus = false
					}
				})
			},
			/**
			 * 切换房屋类型
			 * @param {Object} f
			 */
			fwlxSelect: function(f) {

				if (f == 1) {
					f = 2
				} else if (f == 2) {
					f = 1
				}
				this.fwlx = f,
					this.esHouseList = [],
					this.page = 1,
					this.searchFocus = false,
					this.loadmoreShow = false,
					this.loadmore = true,
					this.getEsList(undefined)
			},
			//关闭快速搜索
			clearSearch() {
				this.input_val = null,
					this.isClearBtn = false,
					this.searchFocus = false
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
		},
		onLoad(e) {
			let that = this
			if (e.uid) {
				this.query.uid = e.uid
			}
			if (e.input_val) {
				this.query.inputVal = e.input_val
			}
			if(e.houseType) {
				this.query.houseType = e.houseType
			}
			if (e.type) {
				this.query.type = e.type
				this.query.area = uni.getStorageSync('cityCode')
				test(this.query.area, "1").then(res => {
					that.setData({
						filterData: res.data
					})
				})
				setTimeout(() => {
					that.changeSelected();
				}, 500);
				this.gethousetitle(this.query);
			}
			// 延时2秒钟
			uni.$u.sleep(1500).then(() => {
				this.loading = false
			})
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			let that = this
			that.topHeight = utils.getTop()
		},
		onReachBottom() {
			let that = this
			this.query.pageNum++;
			// if (this.query.pageNum >= ((this.total+5) / 6) -1) return;
			this.status = 'loading';
			setTimeout(() => {
				this.gethousetitle({
					'inputVal': this.query.inputVal,
					'type': this.query.type,
					'houseType': this.query.houseType,
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
					'pageSize': 6
				})
				if (this.isLastPage) {
					this.status = 'nomore';
				} else {
					this.status = 'loadmore'
				}
			}, 500)
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		width: 100%;
		overflow-x: hidden;
		overflow-y: hidden;
	}

	.wrap {
		padding: 0 24rpx 24rpx;
		box-sizing: border-box;
	}

	.item {
		padding: 24rpx 0;
		color: $u-content-color;
		font-size: 28rpx;
	}

	.reach-content {
		box-sizing: border-box;
		position: absolute;
		z-index: 999;
		width: 100%;
		background-color: white;

		.li {
			height: 70rpx;
			padding: 14rpx 36rpx;
			border-bottom: 2rpx solid #F5F5F5;
		}
	}

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
				z-index: 10;
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
</style>
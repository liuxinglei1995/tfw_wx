<template>
	<view>
		<tm-menubars style="position: fixed;z-index: 999;" :title="house_name+'出售'" :transparent="true"
			iconColor="white"></tm-menubars>
		<view class="city-search-wrap" style="position: fixed;z-index: 997;" @touchmove.stop.prevent="moveHandle">
			<view :style="{ height: topHeight.height+'px' }"></view>
			<view class="search">
				<view class="l-search">
					<view class="searchIcon">
						<tm-icons size="32" name="icon-search" style="line-height: 32rpx;"></tm-icons>
					</view>
					<input class="input-search" type="text" confirm-type="搜索" :value="inputvalue" @input="searchChange"
						@confirm="getLpList(undefined,true)" placeholder="请输入关键字" placeholder-style="color:#8E8F97" />
					<view class="searchBtn" @click="clearSearch" v-if="isClearBtn">
						取消
					</view>
				</view>
			</view>

			<HM-filterDropdown :menuTop="80" :filterData="filterData" :defaultSelected="filterDropdownValue"
				:updateMenuName="true" @confirm="confirm" dataFormat="Object">
			</HM-filterDropdown>
			<view class="reach-content" style="height: 70vh;" v-if="searchFocus" @touchmove.stop.prevent>
				<block v-show="searchData.length">
					<scroll-view style="height: 70vh;" scroll-y="true" class="scroll-Y" @touchmove.stop.prevent>
						<view v-for="item in searchData" :key="item.id" class="li flex-start" :data-xq="item.xq"
							@click="inputSearch(item)">
							<view style="width: 120rpx;">
								<tm-tags color="bg-gradient-amber-accent" size="s" model="fill">楼盘</tm-tags>
							</view>
							<view style="margin: auto;width: 320rpx;">
								<view style="font-size: 28rpx;margin: 0 10rpx;text-align: left;">
									{{item.title}}
								</view>
								<!-- <view style="float: left;font-size: 22rpx;color: #bdbdbd;margin: 0 10rpx;"
									v-for="item1 in (item.type).split('、')" class="">
									{{item1}}
								</view> -->
							</view>
							<text style="font-size: 26rpx;color: #D50000;font-weight: bold;line-height: 62rpx;">
								{{item.refPrice?item.refPrice:""}}元/㎡
							</text>
						</view>
					</scroll-view>
				</block>
				<view class="has-no-data" v-show="hasNoData">
					<tm-empty model="refresh"></tm-empty>
				</view>
			</view>
		</view>
		<view :style="{ height: (topHeight.height+55+44)+'px' }"></view>
		<home-god-list :key="page" :titShow="false" v-bind:newHouseListItem="newHouseList"
			:homeFeuer="newHouseListnewHouseList"></home-god-list>
			
		<u-loadmore :status="status" />
	</view>
</template>

<script>
	import ULoadmore from "@/pagesHouse/uview-ui/components/u-loadmore/u-loadmore.vue";
	import utils from "@/utils/util.js"
	import homeGodList from "@/pagesHouse/components/homeGodList/homeGodList";
	import tmSticky from '@/pagesHouse/tm-vuetify/components/tm-sticky/tm-sticky.vue';
	import tmLoadding from '@/pagesHouse/tm-vuetify/components/tm-loadding/tm-loadding.vue';
	import tmTranslate from '@/pagesHouse/tm-vuetify/components/tm-translate/tm-translate.vue';
	import tmEmpty from '@/pagesHouse/tm-vuetify/components/tm-empty/tm-empty.vue';
	import tmIcons from '@/pagesHouse/tm-vuetify/components/tm-icons/tm-icons.vue';
	import tmTags from '@/pagesHouse/tm-vuetify/components/tm-tags/tm-tags.vue';
	import tmDivider from '@/pagesHouse/tm-vuetify/components/tm-divider/tm-divider.vue';
	import HMFilterDropdown from '../eshouse/HM-filterDropdown/HM-filterDropdown.vue';
	import {
		test,
		getnewloupan,
		getxiaoqulist
	} from '@/api/houst.js'
	var app = getApp();
	export default {
		components: {
			ULoadmore,
			tmTags,
			tmDivider,
			HMFilterDropdown,
			homeGodList,
			tmSticky,
			tmLoadding,
			tmTranslate,
			tmEmpty,
			tmIcons
		},
		data() {
			return {
				lastPage:false,
				total: null,
				//顶部高度
				topHeight: {},
				house_name: '新房',
				filterDropdownValue: [],
				filterData: [],
				homeNew: [{
					title01: "",
					title02: "",
					more: '',
					img: ""
				}, ],
				searchFocus: false,
				hasNoData: true,
				isClearBtn: false,
				searchData: [], // 搜索的数据
				newHouseList: [],
				status: 'loading',
				//进入加载
				id: '',
				inputvalue: '',
				price: '',
				page: 1,
				loadmoreShow: false,
				loadmore: true,
				//加载状态
				area: 0,
				yx: 'none',
				key: "",
				dis_id: "",
				name: "",
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
				},


			};
		},

		props: {},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(e) {
			let that = this
			if (e.input_val) {

			}
			if (e.type) {
				this.query.type = e.type
				this.area = uni.getStorageSync('cityCode')
				test(this.area, "3").then(res => {
					that.setData({
						filterData: res.data
					})
				})
				that.setData({
						inputvalue: e.input_val
					}),
					that.getLpList(this.inputvalue)
				setTimeout(() => {
					that.changeSelected();
				}, 500);

			}
			// 延时2秒钟
			uni.$u.sleep(1500).then(() => {
				this.loading = false
			})

		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

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
		onReachBottom() {
			if(this.lastPage){
				
			}else{
				this.page++;
				// if (this.page > (this.total / 6) + 1) return;
				// this.status = 'loading';
				setTimeout(() => {
					this.getLpList();
				}, 500)
			}
		
		},
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage(res) {
			return {
				title: '自家店  实在', 
				path: '/pagesHouse/newhouse/newhouse?type=1',
			}
		},
		methods: {
			//修改选中项-示例
			changeSelected() {
				//设置选中项
				let that = this
				that.filterDropdownValue = [];
				that.$nextTick(() => {
					that.filterDropdownValue = [
						[0, 0, 0],
						[]
					];
				})
			},
			// 搜索框输入搜索
			inputSearch: function(name) {
				let that = this
				console.log(name, "55555")
				var house_name = that.house_name;
				if (name !== '' && house_name !== '') {
					// that.inputvalue = name.currentTarget.dataset.xq
					that.hasNoData = true
					that.searchData = []
					that.isClearBtn = false
					that.searchFocus = false
					this.newHouseList = []
					if(name){
						this.inputvalue=name.title
					}
					console.log(this.inputvalue, "11111000000");
					that.getLpList(this.inputvalue, true)
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
			moveHandle: function() {},
			//楼盘列表
			getLpList: function(input_val = undefined, p = false) {
				let that = this
				if (input_val == undefined || input_val == '' || input_val == null) {
					input_val = that.inputvalue
				}
				getnewloupan({
					'area': uni.getStorageSync('cityCode'),
					'area2': that.area2 ? that.area2 : '',
					'area3': that.area3 ? that.area3 : '',
					'esfPrice': that.price ? that.price : '',
					'inputVal': input_val,
					'pageNum': that.page,
					'pageSize': 6,
					'from': 0,
					'status': 0
				}).then(res => {
					console.log(res, "kkkkkkkk");
					if (res.total == 0) {
						this.loading = true
						this.status = 'nomore'
					} else {
						this.total = res.total;
						this.newHouseList = this.newHouseList.concat(res.rows)
						this.lastPage=res.lastPage
						if (res.lastPage){
							this.status = 'nomore';
						}else{
							this.status = 'loadmore'
						} 
						this.loading = false
					}

				});
			},
			//楼盘搜索
			searchChange(e) {
				console.log(e, "kkkkk");
				let that = this
				let {
					value
				} = e.detail;
				that.setData({
					inputvalue: value,
					searchFocus: true,
					page: 1
				})
				if (value != '') {
					getxiaoqulist({
						searchValue: value,
						area: uni.getStorageSync('cityCode'),
						pageNum: 1
					}).then(res => {
						console.log(res, "ddddddd");
						if (res.rows.length) {
							that.searchFocus = true
							that.hasNoData = false
							that.searchData = res.rows
							that.isClearBtn = true
						} else {
							that.searchFocus = false
							that.hasNoData = true
							that.searchData = []
							that.isClearBtn = false
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
					searchFocus: false,
					page: 1,
					newHouseList: []
				})
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300,
				})
				that.getLpList()
			},

			//下拉菜单检索
			confirm: function(e) {
				console.log(e)
				let that = this
				that.setData({
					area2: e.value[0][1],
					area3: e.value[0][2],
					price: e.value[1][0],
					newHouseList: [],
					page: 1,
					searchFocus: false,
					loadmoreShow: false,
					loadmore: true
				});
				that.getLpList(undefined)
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
<template>
	<view>
		<tm-menubars title="备用房源" iconColor="white"></tm-menubars>
		<!-- 搜索 -->
		<!-- 搜索 -->
		<view class="topsearch">
			<view class="ditu" @click="gocity" v-if="cityState">
				{{city?city:'地图'}}<u-icon name="arrow-down"></u-icon>
			</view>
			<uni-data-select class="ditu" :clear="false" v-else v-model="cityCode" :localdata="citiesList" @change="cityChange">
			</uni-data-select>
			<view class="search">
				<view class="l-search">
					<view class="searchIcon">
						<tm-icons size="32" name="icon-search" style="line-height: 32rpx;" color="grey"></tm-icons>
					</view>
					<input class="input-search" type="text" confirm-type="搜索" :value="queryParams2.xqname"
						@input="searchChange" @confirm="getEsListsByCompany()" placeholder="请输入关键字"
						placeholder-style="color:#8E8F97" />
					<view class="searchBtn" @click="clearSearch" v-if="isClearBtn">
						取消
					</view>
				</view>
			</view>
		</view>
		
		<!-- <view style="display: flex;flex-direction: row; align-items: center;">
			<view style="width: 20%;">
				<uni-card @click="gocity" v-if="cityState">
					{{city}}
				</uni-card>
				<uni-data-select v-else v-model="cityCode" :localdata="citiesList" @change="cityChange">
				</uni-data-select>
			</view>
			<view class="search">
				<view class="l-search">
					<view class="searchIcon">
						<tm-icons size="32" name="icon-search" style="line-height: 32rpx;" color="grey"></tm-icons>
					</view>
					<input class="input-search" type="text" confirm-type="搜索" :value="queryParams2.xqname"
						@input="searchChange" @confirm="getEsListsByCompany()" placeholder="请输入关键字"
						placeholder-style="color:#8E8F97" />
					<view class="searchBtn" @click="clearSearch" v-if="isClearBtn">
						取消
					</view>
				</view>
			</view>
		</view> -->
		
		<view class="flex-between pt-10 pb-10 px-40" style="background-color: #FFF;height: 100rpx;">
			<tm-input name="building" :height="30" :border-bottom="false" placeholder="几栋" :padding="[5,0]"
				:vertical="true" border-color="grey-lighten-1" @input="searchDong"
				v-model="queryParams2.building"></tm-input>
			<tm-input name="unit" :height="30" :border-bottom="false" placeholder="几单元" :padding="[5,0]"
				:vertical="true" border-color="grey-lighten-1" @input="searchDy" v-model="queryParams2.unit"></tm-input>
			<tm-input name="floor" :height="30" :border-bottom="false" placeholder="几楼" :padding="[5,0]"
				:vertical="true" border-color="grey-lighten-1" @input="searchLc"
				v-model="queryParams2.floor"></tm-input>
			<tm-input name="roomNum" :height="30" :border-bottom="false" placeholder="几号" :padding="[5,0]"
				:vertical="true" border-color="grey-lighten-1" @input="searchRn"
				v-model="queryParams2.roomNum"></tm-input>
		</view>

		<view class="reach-content" style="height: 70vh;" v-if="searchFocus">
			<scroll-view style="height: 70vh;" scroll-y="true" class="scroll-Y" v-if="searchData.length>0">
				<view v-for="item in searchData" :key="item.id" class="li flex-start" :data-xq="item.xq"
					@click="getEsListsByCompany(item)">
					<view style="width: 120rpx;">
						<tm-tags color="bg-gradient-amber-accent" size="s" model="fill">小区</tm-tags>
					</view>
					<view style="margin: auto;width: 480rpx;">
						<view style="font-size: 28rpx;margin: 0 10rpx;text-align: left;">
							{{item.title}}
						</view>
						<view v-if="item.dt" style="float: left;font-size: 22rpx;color: #bdbdbd;margin: 0 10rpx;">
							{{item.dt}}
						</view>
						<view v-if="item.tihb1 && item.tihb"
							style="float: left;font-size: 22rpx;color: #bdbdbd;margin: 0 10rpx;">
							{{item.tihb1}}梯{{item.tihb}}户
						</view>
					</view>
					<text style="font-size: 26rpx;color: #D50000;font-weight: bold;line-height: 62rpx;width:100rpx ;">
						<!-- {{item.houseNum}}套 -->
					</text>
				</view>
			</scroll-view>
		</view>
		<view>
			<view v-for="(item,index) in houseList">
				<uni-card>
					<view>{{item.xqname}}</view>
					<view>
						{{item.building}}栋{{item.unit}}单元{{item.floor}}层{{item.roomNum}}号
					</view>
					<view>
						{{item.propertyArea}}㎡
					</view>
					<view>
						<tm-button theme="indigo" size="s" @click="particulars(item)"
							v-if="item.ifUpdate">详情</tm-button>
						<tm-button theme="indigo" @click="picklisting(item)" size="s" v-else>领取</tm-button>
						<tm-button theme="indigo" @click="genjin(item)" size="s">跟进</tm-button>
					</view>
				</uni-card>

			</view>
			<tm-pagination @change="change" color="green" :page.sync="queryParams2.pageNum" :total="total"
				:totalVisible="5" :size="queryParams2.pageSize">
			</tm-pagination>
		</view>
	</view>
</template>

<script>
	import tmPagination from '@/pagesUser/tm-vuetify/components/tm-pagination/tm-pagination';
	import tmButton from '@/pagesUser/tm-vuetify/components/tm-button/tm-button';
	import uniCard from "@/pagesUser/components/uni-card/components/uni-card/uni-card.vue";
	import tmInput from '@/pagesUser/tm-vuetify/components/tm-input/tm-input.vue';
	import {
		stanbylist,
		getxiaoqulist,
		getlist,
		receiveById
	} from '@/api/houst.js'
	import {
		handleTree
	} from '@/utils/util.js'
	export default {
		components: {
			tmPagination,
			tmButton,
			uniCard,
			tmInput
		},
		data() {
			return {
				houseList: [],
				total: 0,
				loading: true,
				searchFocus: false,
				isClearBtn: false,
				searchData: [], // 搜索的数据
				loadmoreShow: false,
				hasNoData: true,
				queryParams2: {
					pageNum: 1,
					pageSize: 10,
					userId: null,
					xqname: null,
					building: null,
					unit: null,
					floor: null,
					roomNum: null,
					propertyArea: null,
					params: {
						propertyAreaMin: null,
						propertyAreaMax: null,
					},
					status: 6,
				},
				cityState: false,
				nowcity: '',
				city: '成都',
				cityCode: '510100',
				citiesList: [],
			}
		},
		methods: {
			//取消
			clearSearch() {
				this.queryParams2.xqname = ""
				this.searchFocus = false
			},
			getEsListsByCompany(e) {
				this.queryParams2.xqname = e.title
				this.queryParams2.pageNum = 1
				this.getList()
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
				// if(that.isClearBtn == false && value != '') that.$refs.a_1.play()
				if (value != '') {
					getxiaoqulist({
						searchValue: value,
						area: null,
						pageNum: 1
					}).then(res => {
						if (res.total > 0) {
							that.searchFocus = true
							that.isClearBtn = true
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
			/** 领取房源 */
			picklisting(row) {
				receiveById({
					id: row.id
				}).then(res => {
					if (res.code == 200) {
						this.$modal.msg(res.msg);
					} else {
						this.$modal.msg(res.msg);
					}
					this.getList();
				})
			},
			// 跟进
			genjin(row) {
				this.$tab.navigateTo("/pagesUser/standby/standbyid?id=" + row.id + "&ifUpdate=" + row.ifUpdate);
			},
			// 详情
			particulars(row) {
				this.$tab.navigateTo("/pagesUser/standby/standbyid?id=" + row.id + "&ifUpdate=" + row.ifUpdate);
			},
			change(e) {
				this.queryParams2.pageNum = e
				this.getList()
			},
			/** 查询备用房源 */
			getList() {
				this.loading = true;
				this.queryParams2.cityCode = this.cityCode
				stanbylist(this.queryParams2).then(response => {
					this.houseList = response.rows;
					this.total = response.total;
					this.loading = false;
					this.searchFocus = false
				});
			},
			/**
			 * 房号搜索
			 * @param {Object} input
			 */
			searchRn: function(input) {
				let that = this
				that.setData({
					searchFocus: false,
					loadmoreShow: false,
					loadmore: true
				})
				this.queryParams2.roomNum = input,
					this.queryParams2.pageNum = 1,
					this.getList()
			},
			/**
			 * 楼层检索
			 * @param {Object} input
			 */
			searchLc: function(input) {
				let that = this
				that.setData({
					searchFocus: false,
					loadmoreShow: false,
					loadmore: true
				})
				this.queryParams2.floor = input,

					this.queryParams2.pageNum = 1,
					this.getList()
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
				this.queryParams2.unit = input,
					this.queryParams2.pageNum = 1,
					this.getList()
			},
			/**
			 * 搜索栋
			 * @param {Object} input
			 */
			searchDong: function(input) {
				let that = this
				that.setData({
					searchFocus: false,
					loadmoreShow: false,
					loadmore: true
				})
				this.queryParams2.building = input,
					this.queryParams2.pageNum = 1,
					this.getList()
			},
			//跳转到地图搜索
			gocity() {
				uni.navigateTo({
					url: '/pagesTools/pages/mapAll/mapAll?type=1'
				});
			},
			cityChange() {
				this.queryParams2.cityCode = this.cityCode
				this.getList();
			}
		},
		onLoad() { 
			let _this = this;
			if(_this.$store.state.user.userdata.userId != 116) {
				let list = _this.$store.state.user.userdata.userCities;
				list.forEach(function(item, index) {
					let values = {
						value: item.cityId,
						text: item.cityName,
					}
					_this.citiesList.push(values)
				});
				_this.cityCode = list[0].cityId;
			}
		},
		onShow() {
			if (this.$store.state.user.userdata.userId === 1 || this.$store.state.user.userdata.userId === 116) {
				this.cityState = true
				//判断是否有指定城市
				this.city = uni.getStorageSync('innerCity')
				this.cityCode = uni.getStorageSync('innerCityCode')
			} else {
				this.cityState = false
			}
			this.getList();
		}
	}
</script>

<style lang="less" scoped>
	.search {
		width: 500rpx;
		height: 55px;
		display: flex;
		/* align-items: center; */
		font-size: 28rpx;
		color: #222;
		padding: 14rpx 5rpx;
		box-sizing: border-box;
		background: #fff;
	}

	.l-search {
		width: 400rpx;
		position: relative;
		height: 72rpx;
		line-height: 72rpx;
	}

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
		width: 460rpx;
		height: 72rpx;
		box-sizing: border-box;
		padding: 0 24rpx 0 84rpx;
		text-align: left;
		background: #f4f5f9;
		border-radius: 12rpx;
		border: 0;
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
	
	.topsearch {
		margin-top: 20rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-sizing: border-box;
	}
	
	.ditu {
		display: flex;
		align-items: center;
		margin-right: 10rpx;
		width: 150rpx;
	}
</style>
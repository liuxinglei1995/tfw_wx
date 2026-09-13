<template>
	<view class="content">
		<view>
			<tm-menubars title="客源" iconColor="white"></tm-menubars>
		</view>
		<view style="margin-top:30rpx;">
			<u-search placeholder="请输入姓名/手机号/备注" :showAction="true" v-model="filterResult.customer" actionText="快捷搜索"
				@change="searchchange" @custom="searchcustom" :animation="true"></u-search>
		</view>
		<view>
			<sl-filter :ref="'slFilter'" :topFixed="true" :isTransNav="true" :navHeight="0" :color="titleColor"
				:themeColor="themeColor" :menuList="menuList" @result="result"></sl-filter>
		</view>
		<view>
			<u-tabs :list="list1" @click="click" :activeStyle="{
            color: '#6558d3',
            fontWeight: 'bold',
            transform: 'scale(1.05)'
        }" :inactiveStyle="{
            color: '#606266',
            transform: 'scale(1)'
        }"></u-tabs>
		</view>
		<view>
			<view v-for="(item,index) in guestData" :key="index">
				<div class="plan">
					<div class="inner">
						<span class="pricing">
							<span>
								<dict-tag :options="dict.type.tfw_wtly" :value="item.source"
									style="font-size: 1.25rem;font-weight: 600;color: #425475;" />
								<small>
									<dict-tag :options="dict.type.tfw_wtlx" :value="item.type" />
								</small>
							</span>
						</span>
						<p class="title" v-for="(customer,index) in JSON.parse(item.customer)" :key="index">
							{{customer.name}}
						</p>
						<p class="info">客源所属人:{{item.nickName}}</p>
						<ul class="features">
							<li>
								<span class="icon">
									<svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
										<path d="M0 0h24v24H0z" fill="none"></path>
										<path fill="currentColor"
											d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z">
										</path>
									</svg>
								</span>
								<span v-if="item.type == 1 || item.type == 3" class="display"><strong>目标:</strong>
									购房</span>
								<span v-if="item.type == 2 || item.type == 3" class="display"><strong>目标:</strong>
									租房</span>
							</li>
							<li>
								<span class="icon">
									<svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
										<path d="M0 0h24v24H0z" fill="none"></path>
										<path fill="currentColor"
											d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z">
										</path>
									</svg>
								</span>
								<span v-if="item.type == 1 || item.type == 3" class="display">
									<strong>需求:</strong>
									{{ item.purchasePriceMin ?item.purchasePriceMin : "--"}}万--{{ item.purchasePriceMax ? item.purchasePriceMax : "--" }}万
									/{{ item.purchaseAreaMin ?item.purchaseAreaMin : "--" }}㎡--{{item.purchaseAreaMax ? item.purchaseAreaMax : "--" }}㎡
									/<dict-tag :options="dict.type.tfw_fuxing"
										:value="item.purchaseRoom ? item.purchaseRoom.split(',') : []" />
								</span>
								<span v-if="item.type == 2 || item.type == 3" class="display">
									<strong>需求:</strong>
									{{ item.rentingPriceMin ? item.rentingPriceMin : "--" }}元--{{item.rentingPriceMax ? item.rentingPriceMax : "--" }}元
									/
									{{ item.rentingAreaMin ?item.rentingAreaMin : "--" }}㎡--{{item.rentingAreaMax ? item.rentingAreaMax : "--" }}㎡
									/<dict-tag :options="dict.type.tfw_fuxing"
										:value="item.rentingRoom ? item.rentingRoom.split(',') : []" />
								</span>
							</li>
							<li>
								<span class="icon">
									<svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
										<path d="M0 0h24v24H0z" fill="none"></path>
										<path fill="currentColor"
											d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z">
										</path>
									</svg>
								</span>
								<span
									class="display"><strong>需求区域:</strong>{{ item.area ? item.area.split(",")[1] + item.area.split(",")[2] : "" }}{{ item.remarks?item.remarks:"" }}</span>
							</li>
							<li>
								<span class="icon">
									<svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
										<path d="M0 0h24v24H0z" fill="none"></path>
										<path fill="currentColor"
											d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z">
										</path>
									</svg>
								</span>
								<span class="display"><strong>委托日期:</strong>{{item.createTime}}</span>
							</li>
							<li>
								<span class="icon">
									<svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
										<path d="M0 0h24v24H0z" fill="none"></path>
										<path fill="currentColor"
											d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z">
										</path>
									</svg>
								</span>
								<span class="display"><strong>最后跟进:</strong>{{item.followTime}}</span>
							</li>
						</ul>
						<div class="action" @click="godetails(item)">
							<a class="button" href="#">
								Choose
							</a>
						</div>
					</div>
				</div>
			</view>
			<u-loadmore :status="status" />
			<view class="footer2 flex-center">
				<button class="btn3" @tap="$tab.navigateTo('/pagesUser/customerMG/adddetails/adddetails')">添加客源</button>
			</view>
		</view>
	</view>
</template>

<script>
	import ULoadmore from "@/pagesUser/uview-ui/components/u-loadmore/u-loadmore.vue";
	import UTabs from "@/pagesUser/uview-ui/components/u-tabs/u-tabs.vue";
	import USearch from "@/pagesUser/uview-ui/components/u-search/u-search.vue";
	import slFilter from '@/pagesUser/components/sl-filter/sl-filter.vue';
	import tmTabs from '@/pagesUser/tm-vuetify/components/tm-tabs/tm-tabs.vue';

	import uniCard from "@/pagesUser/components/uni-card/components/uni-card/uni-card.vue";
	import {
		guestList,
		listTourists 
	} from '@/api/houst.js'
	export default {
		dicts: ['tfw_wtly', 'tfw_wtlx', 'tfw_fuxing'],
		components: {
			ULoadmore,
			UTabs,
			USearch,
			slFilter,
			tmTabs,
			uniCard
		},
		data() {
			return {
				isLastPage: null,
				status: 'loadmore',
				loading: true,
				guestData: [],
				list1: [{
					name: '私客',
				}, {
					name: '公客',
				}],
				activeIndex: 0,
				themeColor: '#000000',
				titleColor: '#666666',
				filterResult: {
					pageNum: 1,
					pageSize: 10,
					queryState: 1,
					customer: null
				},
				menuList: [{
						'title': '委托来源',
						'detailTitle': '请选择委托来源',
						'isMutiple': false,
						'key': 'source',
						'detailList': [{
								'title': '不限',
								'value': ''
							},
							{
								'title': '小程序录入',
								'value': '1'
							},
							{
								'title': '物业推荐',
								'value': '2'
							},
							{
								'title': '上门客户',
								'value': '3'
							},
							{
								'title': '400电话咨询',
								'value': '4'
							},
							{
								'title': '老客户推荐',
								'value': '5'
							},
							{
								'title': '其他第三方平台',
								'value': '6'
							},
							{
								'title': '天府网',
								'value': '7'
							}
						]

					},
					{
						'title': '房屋用途',
						'key': 'purposeOfTheHouse',
						'isMutiple': false,
						'detailList': [{
								'title': '不限',
								'value': ''
							},
							{
								'title': '经济住宅',
								'value': '1'
							},
							{
								'title': '养老房',
								'value': '2'
							},
							{
								'title': '商品房',
								'value': '3'
							},
							{
								'title': '高楼层',
								'value': '4'
							},
							{
								'title': '多层',
								'value': '5'
							},
							{
								'title': '别墅',
								'value': '6'
							},
							{
								'title': '投资地产',
								'value': '7'
							},
							{
								'title': '水景地产',
								'value': '8'
							},
							{
								'title': '旅游地产',
								'value': '9'
							},
							{
								'title': '洋房',
								'value': '10'
							},
							{
								'title': '小高层',
								'value': '11'
							},
							{
								'title': '超高层',
								'value': '12'
							},
							{
								'title': '大平层',
								'value': '13'
							},
							{
								'title': '叠拼别墅',
								'value': '14'
							},
							{
								'title': '车位',
								'value': '15'
							}
						]

					},
					{
						'title': '客户类型',
						'key': 'type',
						'isSort': true,
						'reflexTitle': true,
						'detailList': [{
								'title': '私客',
								'value': '1'
							},
							{
								'title': '公客',
								'value': '2'
							}
						]
					},
				],
				buttonItem: "私客"
			}
		},
		onReachBottom() {
			if (this.isLastPage) {
				this.status = 'nomore'
			} else {
				this.filterResult.pageNum++;
				this.status = 'loading';
				setTimeout(() => {
					if(this.buttonItem == "私客") {
						this.getguestData()
					} else {
						this.getguestData2()
					}
				}, 1000)
			}
		},
		onLoad() {
			this.getguestData()
		},
		onShow() {
			this.getguestData()
		},
		methods: {
			searchclear() {
			},
			searchchange(e) {
				this.filterResult.customer = e
			},
			searchcustom(e) {
				this.filterResult.customer = e
				this.guestData = []
				this.getguestData()
			},
			godetails(e) {
				this.$tab.navigateTo("/pagesUser/customerMG/details/details?id=" + e.eId);
			},
			getguestData() {
				uni.showLoading({
					title:"加载中...",
					mask: true 
				})
				guestList(this.filterResult).then(res => {
					this.isLastPage = res.lastPage
					this.guestData = this.guestData.concat(res.rows)
					if (this.isLastPage) {
						this.status = 'nomore'
					}
					uni.hideLoading();
				})
			},
			getguestData2() {
				uni.showLoading({
					title:"加载中...",
					mask: true 
				})
				listTourists(this.filterResult).then(res => {
					this.isLastPage = res.lastPage
					this.guestData = this.guestData.concat(res.rows)
					if (this.isLastPage) {
						this.status = 'nomore'
					}
					uni.hideLoading();
				})
			},
			click(item) {
				this.buttonItem = item.name;
				if (item.name == "私客") {
					this.filterResult.publicAndPrivate = null
					this.guestData = []
					this.getguestData()
				} else {
					this.filterResult.publicAndPrivate = 1
					this.guestData = []
					this.getguestData2()
				}
			},
			changeMenuList() {
				let menuListItem = {
					'title': '职位',
					'detailTitle': '请选择职位类型（单选）(默认值为1)',
					'isMutiple': false,
					'key': 'jobType',
					'defaultSelectedIndex': 1,
					'detailList': [{
							'title': '不限',
							'value': ''
						},
						{
							'title': 'new_1',
							'value': 'new_1'
						},
						{
							'title': 'new_2',
							'value': 'new_2'
						},
						{
							'title': 'new_3',
							'value': 'new_3'
						},
						{
							'title': 'new_4',
							'value': 'new_4'
						},
						{
							'title': 'new_5',
							'value': 'new_5'
						}
					]
				}
				this.menuList[0] = menuListItem;
				this.$refs.slFilter.resetMenuList(this.menuList)
			},
			changeMenuListDetailList() {
				let tempDetailList = [{
						'title': '不限',
						'value': ''
					},
					{
						'title': 'new_1',
						'value': 'new_1'
					},
					{
						'title': 'new_2',
						'value': 'new_2'
					},
					{
						'title': 'new_3',
						'value': 'new_3'
					}
				]
				this.menuList[0].detailList = tempDetailList;
				this.$refs.slFilter.resetMenuList(this.menuList)
			},
			result(val) {
				val.pageNum = 1
				val.pageSize = 5
				this.filterResult.type = val.type
				this.filterResult.purposeOfTheHouse = val.purposeOfTheHouse
				this.filterResult.source = val.source
				this.guestData = []
				this.getguestData()
			},
			// 重置所有选项，包括默认选项，并更新result
			resetAllSelect() {
				this.$refs.slFilter.resetAllSelect(function(result) {
					console.log('重置之后回调的result:' + JSON.stringify(result))
				})
			},
			// 重置选项为设置的默认值，并更新result
			resetSelectToDefault() {
				this.$refs.slFilter.resetSelectToDefault(function(result) {
					console.log('重置为默认值之后回调的result:' + JSON.stringify(result))
				})
			}
		}
	}
</script>

<style scoped>
	.display {
		display: flex;
	}

	.display strong {
		margin-right: 10rpx;
	}

	.plan {
		border-radius: 16px;
		box-shadow: 0 30px 30px -25px rgba(0, 38, 255, 0.205);
		padding: 10px;
		background-color: #fff;
		color: #697e91;
		max-width: 350px;
	}

	.plan strong {
		font-weight: 600;
		color: #425275;
	}

	.plan .inner {
		align-items: center;
		padding: 20px;
		padding-top: 40px;
		background-color: #ecf0ff;
		border-radius: 12px;
		position: relative;
	}

	.plan .pricing {
		position: absolute;
		top: 0;
		right: 0;
		background-color: #bed6fb;
		border-radius: 99em 0 0 99em;
		display: flex;
		align-items: center;
		padding: 0.625em 0.75em;

	}

	.plan .pricing small {
		color: #707a91;
		font-size: 0.75em;
		margin-left: 0.25em;
	}

	.plan .title {
		font-weight: 600;
		font-size: 1.25rem;
		color: #425675;
	}

	.plan .title {
		margin-top: 0.75rem;
	}

	.plan .info {
		margin-top: 0.5rem;
	}

	.plan .features {
		display: flex;
		flex-direction: column;
		margin-top: 0.75rem;
	}

	.plan .features li {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 0.50rem;
	}

	.plan .features .icon {
		background-color: #1FCAC5;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		border-radius: 50%;
		width: 20px;
		height: 20px;
	}

	.plan .features .icon svg {
		width: 14px;
		height: 14px;
	}


	.plan .action {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: end;
		margin-top: 30rpx;
	}

	.plan .button {
		background-color: #6558d3;
		border-radius: 6px;
		color: #fff;
		font-weight: 500;
		font-size: 1.125rem;
		text-align: center;
		border: 0;
		outline: 0;
		width: 100%;
		padding: 0.625em 0.75em;
		text-decoration: none;
	}

	.plan .button:hover,
	.plan .button:focus {
		background-color: #4133B7;
	}

	.text {
		margin-top: 50px;
		margin-left: 20px;
		width: 100%;
	}

	page {
		background-color: #F0F0F0;
	}

	.footer2 {
		position: fixed;
		bottom: 0px;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		height: 50px;
		background-color: #f7f7f7;
		z-index: 200;
		font-size: 12px;
		justify-content: space-between;
	}

	.footer2 button {
		margin: 0 !important;
		height: 100%;
		width: 100%;
		line-height: 100rpx !important;
		font-weight: unset;
		color: white;
		border-radius: 0;
		font-size: 28rpx;
	}

	.footer2 button:active {
		filter: brightness(90%);
	}

	.btn3 {
		background-color: #6558d3;
	}

	.title {
		font-size: 36rpx;
		font-weight: bold;
		text-align: left;
		color: #333333;
	}
</style>
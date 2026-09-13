<template>
	<view>
		<tm-menubars :shadow="0" title="合同列表" fontColor="white" :back="true"></tm-menubars>
		<tm-tabs v-if="type === '1'" v-model="activeIndex" @change="fwlxSelect" :list="tabBars" height="60" align="center"
			range-key="title"></tm-tabs>
		<span style="color: crimson;">*请各方及时查看展示信息是否有误，如有误请及时联系权证人员</span>
		<uni-card :title="item.title" :extra="item.no" v-for="(item,index) in contracts" :key="index">
			<div v-if="item.state===1" style="display: flex;flex-direction: row;position: absolute;margin-left: 55%;">
				<uni-tag v-if="item.type ==='1'" class="uni-tag--mark1" :circle="true" text="房屋买卖" type="primary"
					size="mini" />
				<uni-tag v-else-if="item.type ==='2'" class="uni-tag--mark1" :circle="true" text="租房合同" type="primary"
					size="mini" />
				<uni-tag v-else-if="item.type ==='3'" class="uni-tag--mark1" :circle="true" text="车位买卖" type="primary"
					size="mini" />
				<uni-tag v-else-if="item.type ==='4'" class="uni-tag--mark1" :circle="true" text="车位租赁" type="primary"
					size="mini" />
				<uni-tag v-else class="uni-tag--mark1" :circle="true" text="房屋买卖" type="primary" size="mini" />

				<uni-tag class="uni-tag--mark2" v-if="item.status" :mark="true" text="已确认" type="success" size="mini" />
				<uni-tag class="uni-tag--mark2" v-else :mark="true" text="未确认" type="error" size="mini" />
			</div>
			<div style="display: flex;flex-direction: column;">
				<div v-if="item.state===1" style="width: 350rpx;">卖方：{{item.trilateralInformation.a_name}}</div>
				<div v-else style="width: 350rpx;">卖方：{{item.tfwContractOut.seller}}</div>
				<div style="display: flex;justify-content: space-between;">
					<span v-if="item.state===1" style="width: 350rpx;">买方：{{item.trilateralInformation.b_name}}</span>
					<span v-else style="width: 350rpx;">买方：{{item.tfwContractOut.buyer}}</span>
					<div v-if="item.state===1">
						<span v-if="item.type === '1'">合同金额：{{item.pricesDeals.money}}</span>
						<span v-else-if="item.type === '2'">合同金额：{{item.pricesDeals.field104}}</span>
						<span v-else-if="item.type === '3'">合同金额：{{item.pricesDeals.money}}</span>
						<span v-else-if="item.type === '4'">合同金额：{{item.pricesDeals.field104}}</span>
						<span v-else>合同金额：{{item.pricesDeals.money}}</span>
					</div>
					<div v-else>合同金额：{{item.tfwContractOut.deal}}</div>
				</div>
				<div style="display: flex;margin-top: 5px;">
					<div class="fake_button" v-if="item.state===1">
						<span v-if="type === '0' && !item.status" @click=" showTowst(item)">合同确认</span>
					</div>
					<div class="vertical-line"></div>
					<div class="fake_button" @click="openDoc(item)">预览合同</div>
				</div>
			</div>
		</uni-card>
		<u-loadmore :status="status" />
		<tm-empty v-if="contracts.length == 0" label="暂无合同" style="margin-top: 200rpx;"></tm-empty>
	</view>
</template>

<script>
	import tmMenubars from "@/pagesTools/tm-vuetify/components/tm-menubars/tm-menubars.vue"
	import tmMessage from "@/pagesTools/tm-vuetify/components/tm-message/tm-message.vue"
	import tmDialog from "@/pagesTools/tm-vuetify/components/tm-dialog/tm-dialog.vue"
	import tmSheet from "@/pagesTools/tm-vuetify/components/tm-sheet/tm-sheet.vue"
	import tmEmpty from "@/pagesTools/tm-vuetify/components/tm-empty/tm-empty.vue"
	import tmTabs from '@/pagesTools/tm-vuetify/components/tm-tabs/tm-tabs.vue';

	import {
		listContract,
		contractValidate
	} from '@/api/houst.js'
	export default {
		components: {
			tmMenubars,
			tmSheet,
			tmMessage,
			tmDialog,
			tmEmpty,
			tmTabs
		},
		data() {
			return {
				tabBars: ['签约合同', '外部合同'],
				activeIndex: 0,
				show1: false,
				contracts: [], // 当前显示图片
				thisid: 0,
				queryParams: {
					pageNum: 1,
					pageSize: 10,
					special: null,
					types: [],
					state: null,
				},
				contract: {},
				type: 0,
				finished: false, // 是否加载完毕
				status: 'more',
				isLastPage: null,
			}
		},
		onLoad: function(option) {
			this.type = option.type;
			this.queryParams.special = this.type;
			if (this.type === '1') {
				this.queryParams.state = 1;
				this.queryParams.types = [1, 3];
			}
			this.init()
		},
		methods: {
			init() {
				let _this = this
				listContract(_this.queryParams).then(res => {
					_this.isLastPage = res.isLastPage;
					let contractsData = res.rows
					contractsData.forEach(function(item, index) {
						if (item.state === 1) {
							item.status = false
							item.trilateralInformation = JSON.parse(item.trilateralInformation)
							item.pricesDeals = JSON.parse(item.pricesDeals)
							if (item.trilateralInformation.a_phone === _this.$store.state.user.userdata
								.phonenumber) {
								if (item.partyAStatus === 1) {
									item.status = true
								}
							} else if (item.trilateralInformation.b_phone === _this.$store.state.user
								.userdata
								.phonenumber) {
								if (item.partyAStatus === 1) {
									item.status = true
								}
							}
						}

					});
					_this.contracts = _this.contracts.concat(contractsData)
				})
			},
			openDoc(item) {
				//查询合同流程
				if(item.state === 2) {
					uni.navigateTo({
						url: 'contractProcess?id=' + item.id + '&type=' + this.type
					});
				} else if (item.type === "1" || item.type === '3') {
					uni.navigateTo({
						url: 'contractProcess?id=' + item.id + '&type=' + this.type
					});
				} else {
					uni.navigateTo({
						url: 'ifrom?id=' + item.id
					});
					// uni.showLoading({
					// 	title: '打开中…',
					// 	icon: "loading",
					// })
					// uni.downloadFile({
					// 	url: "https://new.tianfucd.com/prod-api/contract/contract/generateReport?id=" + item.id,
					// 	success: function(res) {
					// 		if (res.statusCode === 200) { //成功
					// 			var Path = res.tempFilePath //返回的文件临时地址，用于后面打开本地预览所用
					// 			uni.openDocument({
					// 				filePath: Path, //要打开的文件路径
					// 				showMenu: true,
					// 				success: function(res) {
					// 					uni.hideLoading()
					// 				}
					// 			})
					// 		}
					// 	},
					// 	fail: function(res) {
					// 		console.error(res, '成交合同'); //失败
					// 		uni.hideLoading()
					// 	}
					// })
				}
			},
			showTowst(item) {
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '请确认合同',
					success: function(res) {
						if (res.confirm) {
							if (item.trilateralInformation.a_phone === _this.$store.state.user.userdata
								.phonenumber) {
								item.partyAStatus = 1
							} else if (item.trilateralInformation.b_phone === _this.$store.state.user.userdata
								.phonenumber) {
								item.partyBStatus = 1
							}
							contractValidate({
								id: item.id,
								partyAStatus: item.partyAStatus,
								partyBStatus: item.partyBStatus,
							}).then(res => {
								_this.init()
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},

			//顶部选项卡
			fwlxSelect: function(f) {
				if (f == 0) {
					this.queryParams.state = 1;
					this.queryParams.types = [1, 3]
				} else if (f == 1) {
					this.queryParams.state = 2;
					this.queryParams.types = []
				}
				this.contracts = [];
				this.init();
			},
		},
		onReachBottom() {
			this.pageSize++
			this.status = 'loading';
			setTimeout(() => {
				this.init();
				if (this.isLastPage) {
					this.status = 'nomore';
				} else {
					this.status = 'loadmore'
				}
			}, 500)

		}
	}
</script>
<style>
	.uni-tab-item-title-active {
		color: #007AFF;
	}

	.swiper {
		width: 100%;
		height: 904rpx;
		position: absolute;
	}

	.swiper-itemImage {
		position: relative;
		top: 0;
		margin-top: 34rpx;
		width: 100%;
		height: auto;
		border-radius: 24rpx;
	}

	.swiperItemActive {
		position: relative;
		transition: top 0.5s linear, height 0.5s linear;
		top: -34rpx;
		height: 904rpx;
	}

	.contract_box {
		background-image: url(bg.png);
		background-size: 100% 100%;
		height: 250rpx;
		width: 658rpx;
	}

	.contract_tit {
		height: 52rpx;
		line-height: 52rpx;
	}

	.contract_no {
		height: 52rpx;
		line-height: 52rpx;
		color: #666666;
		font-size: 24rpx;
	}

	.uni-card--shadow {
		width: 90%;
		margin: 5px 5px 0px 5px !important;
	}

	.uni-tag--mark1 {
		border-top-left-radius: 15px !important;
		border-bottom-left-radius: 15px !important;
		border-top-right-radius: 15px !important;
		border-bottom-right-radius: 15px !important;
	}

	.uni-tag--mark2 {
		margin-left: 5px;
		border-top-left-radius: 15px !important;
		border-bottom-left-radius: 15px !important;
		border-top-right-radius: 0 !important;
		border-bottom-right-radius: 0 !important;
	}

	.vertical-line {
		border-left: 1px solid #d5d5d6;
		/* 可以调整宽度、样式和颜色 */
	}

	.fake_button {
		width: 50%;
		text-align: center;
	}

	.fake_button :active {
		background-color: #d5d5d6;
	}
</style>
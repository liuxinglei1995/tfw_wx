<template>
	<view>
		<tm-menubars :shadow="0" title="合同流程" fontColor="white" :back="true"></tm-menubars>

		<uni-card :title="contract.title" :extra="contract.no" v-if="contract">
			<uni-forms v-if="contract.state === 1">
				<uni-forms-item :label="'卖方：'+contract.trilateralInformation.a_name" label-width="50%">
					<view>合同价：{{contract.pricesDeals.add_money}}</view>
				</uni-forms-item>
				<uni-forms-item :label="'买方：'+contract.trilateralInformation.b_name" label-width="50%">
					<view @click="openDoc(contract.id)">查看</view>
				</uni-forms-item>
				<uni-forms-item :label="'成交经纪人：'+userInfo.nickName" label-width="50%">
				</uni-forms-item>
			</uni-forms>
			<uni-forms v-else>
				<uni-forms-item :label="'卖方：'+contract.tfwContractOut.seller" label-width="50%">
					<view>合同价：{{contract.tfwContractOut.deal}}</view>
				</uni-forms-item>
				<uni-forms-item :label="'买方：'+contract.tfwContractOut.buyer" label-width="50%">
					<view @click="callPhone(userInfo.utel)"><uni-icons
							type="phone-filled"></uni-icons>经办人：{{userInfo.nickName}}</view>
				</uni-forms-item>
			</uni-forms>

			<view v-if="type === '0'" class="mr-42"
				style="margin-left: 10rpx;margin-top: 10rpx; font-size: 24rpx;display: flex;justify-content: space-between;">
				<view v-if="type === '1'"
					style="width: 116rpx;height: 36rpx;line-height: 36rox;background-color: #61B9FE;color: #FFF;text-align: center;border-radius: 8rpx;font-size: 20rpx;">
					已确认</view>
				<view v-else
					style="width: 116rpx;height: 36rpx;background-color: #FFB553;color: #FFF;text-align: center;border-radius: 8rpx;font-size: 20rpx;">
					未确认</view>
				<view v-if="type != '1'">
					<view @click="showTowst(contract)">确认合同</view>
				</view>
			</view>

			<uni-collapse v-if="contract.state === 2" style="width: 100%;" ref="collapse" @change="change">
				<uni-collapse-item title="详情">
					<uni-forms>
						<uni-forms-item label="中介：" label-width="100px">
							<span>{{contract.tfwContractOut.intermediary}} &nbsp;
								联系电话:{{ contract.tfwContractOut.intermediaryPhone }}</span>
						</uni-forms-item>
						<uni-forms-item label="经纪人：" label-width="100px">
							<span>{{contract.tfwContractOut.broker}} &nbsp;
								联系电话:{{ contract.tfwContractOut.brokerPhone }}</span>
						</uni-forms-item>
						<uni-forms-item label="定金：" label-width="100px">
							<span>{{contract.tfwContractOut.deposit}}</span>
						</uni-forms-item>
						<uni-forms-item :label="'首付：'+contract.tfwContractOut.advance" label-width="60%">
							<span>资金监管：{{contract.tfwContractOut.remark}}</span>
						</uni-forms-item>
						<uni-forms-item :label="'贷款银行：'+contract.tfwContractOut.bank" label-width="60%">
							<span>贷款额：{{contract.tfwContractOut.loan}}</span>
						</uni-forms-item>
						<uni-forms-item :label="'贷款年限：'+contract.tfwContractOut.loanAge" label-width="60%">
							<span>贷款服务费：{{contract.tfwContractOut.loanServe}}</span>
						</uni-forms-item>
					</uni-forms>
				</uni-collapse-item>
			</uni-collapse>
		</uni-card>

		<uni-card title="合同流程" extra="进度情况" v-if="type === '1'">
			<uni-collapse style="width: 100%;" accordion>
				<uni-collapse-item v-for="(item,index) in contract.tfwContractProcessList"
					v-if="(index+1) <= contract.process"
					:title="item.title + '—' + format(item.interactDate, 'yyyy-MM-dd')">
					<!-- 买卖合同签约 -->
					<uni-forms v-if="item.title === '买卖合同签约'" style="align-items: center;">
						<uni-forms-item label="合同编号" label-width="100px">
							<span class="item-span">{{contract.no}}</span>
						</uni-forms-item>
						<uni-forms-item label="卖方" label-width="100px">
							<span class="item-span">{{contract.trilateralInformation.a_name}}</span>
						</uni-forms-item>
						<uni-forms-item label="买方" label-width="100px">
							<span class="item-span">{{contract.trilateralInformation.b_name}}</span>
						</uni-forms-item>
					</uni-forms>
					<!-- 购房款监管 -->
					<uni-forms v-else-if="item.title === '购房款监管'" style="align-items: center;">
						<uni-forms-item label="协议名称" label-width="100px">
							<span class="item-span">{{item.content.title}}</span>
						</uni-forms-item>
						<uni-forms-item label="协议编号" label-width="100px">
							<span class="item-span">{{item.content.no}}</span>
						</uni-forms-item>
						<uni-forms-item label="物业保证金" label-width="100px">
							<span class="item-span">{{item.content.wy}}</span>
						</uni-forms-item>
						<uni-forms-item label="首付款" label-width="100px">
							<span class="item-span">{{item.content.deposite}}</span>
						</uni-forms-item>
						<uni-forms-item label="已付定金" label-width="100px">
							<span class="item-span">{{item.content.deposit}}</span>
						</uni-forms-item>
						<uni-forms-item label="银行评估价" label-width="100px">
							<span class="item-span">{{item.content.estimate}}</span>
						</uni-forms-item>
					</uni-forms>
					<!-- 银行贷款面签 -->
					<uni-forms v-else-if="item.title === '银行贷款面签'" style="align-items: center;">
						<uni-forms-item label="贷款类型" label-width="100px">
							<span class="item-span">{{item.content.type}}</span>
						</uni-forms-item>
						<uni-forms-item label="贷款银行" label-width="100px">
							<span class="item-span">{{item.content.bank}}</span>
						</uni-forms-item>
						<uni-forms-item label="贷款支行" label-width="100px">
							<span class="item-span">{{item.content.subBank}}</span>
						</uni-forms-item>
						<uni-forms-item label="贷款年限" label-width="100px">
							<span class="item-span">{{item.content.duration}}</span>
						</uni-forms-item>
						<uni-forms-item label="贷款金额" label-width="100px">
							<span class="item-span">{{item.content.sum}}</span>
						</uni-forms-item>
						<uni-forms-item label="还款模式" label-width="100px">
							<span class="item-span">{{item.content.mode}}</span>
						</uni-forms-item>
					</uni-forms>
					<!-- 银行贷款批贷 -->
					<uni-forms v-else-if="item.title === '银行贷款批贷'" style="align-items: center;">
						<uni-forms-item label="贷款套数" label-width="100px">
							<span class="item-span">{{item.content.sets}}</span>
						</uni-forms-item>
						<uni-forms-item label="贷款利率" label-width="100px">
							<span class="item-span">{{item.content.rate}}</span>
						</uni-forms-item>
						<uni-forms-item label="贷款银行" label-width="100px">
							<span class="item-span">{{item.content.bank}}</span>
						</uni-forms-item>
						<uni-forms-item label="贷款支行" label-width="100px">
							<span class="item-span">{{item.content.subBank}}</span>
						</uni-forms-item>
						<uni-forms-item label="批贷年限" label-width="100px">
							<span class="item-span">{{item.content.duration}}</span>
						</uni-forms-item>
						<uni-forms-item label="批贷金额" label-width="100px">
							<span class="item-span">{{item.content.sum}}</span>
						</uni-forms-item>
					</uni-forms>
					<!-- 交税取新证 -->
					<uni-forms v-else-if="item.title === '交税取新证'" style="align-items: center;">
						<uni-forms-item label="实纳税额" label-width="100px">
							<span class="item-span">{{item.content.limit}}</span>
						</uni-forms-item>
					</uni-forms>
					<!-- 银行放款 -->
					<uni-forms v-else-if="item.title === '银行放款'" style="align-items: center;">
						<uni-forms-item label="实放款银行" label-width="100px">
							<span class="item-span">{{item.content.bank}}</span>
						</uni-forms-item>
						<uni-forms-item label="实放款支行" label-width="100px">
							<span class="item-span">{{item.content.subBank}}</span>
						</uni-forms-item>
						<uni-forms-item label="实贷款年限" label-width="100px">
							<span class="item-span">{{item.content.duration}}</span>
						</uni-forms-item>
						<uni-forms-item label="实放款金额" label-width="100px">
							<span class="item-span">{{item.content.sum}}</span>
						</uni-forms-item>
						<uni-forms-item label="还款模式" label-width="100px">
							<span class="item-span">{{item.content.mode}}</span>
						</uni-forms-item>
					</uni-forms>
					<!-- 银行贷款评估 -->
					<uni-forms v-else-if="item.title === '银行贷款评估'" style="align-items: center;">
						<uni-forms-item label="银行评估价" label-width="100px">
							<span class="item-span">{{item.content.estimate}}</span>
						</uni-forms-item>
					</uni-forms>
					<!-- 房管局网签 -->
					<uni-forms v-else style="align-items: center;">
						<uni-forms-item label="备案价" label-width="100px">
							<span class="item-span">{{item.content.text}}</span>
						</uni-forms-item>
					</uni-forms>
					<!-- 其他 -->
					<div v-else>{{item.content.text}}</div>
					<uni-forms style="align-items: center;">
						<uni-forms-item label="权证人" label-width="100px">
							<span @click="callPhone(item.phonenumber)" class="item-span"><uni-icons
									type="phone-filled"></uni-icons>{{item.nickName}}</span>
						</uni-forms-item>
					</uni-forms>
				</uni-collapse-item>
			</uni-collapse>
		</uni-card>
	</view>
</template>

<script>
	import tmMenubars from "@/pagesTools/tm-vuetify/components/tm-menubars/tm-menubars.vue"
	import tmMessage from "@/pagesTools/tm-vuetify/components/tm-message/tm-message.vue"
	import tmDialog from "@/pagesTools/tm-vuetify/components/tm-dialog/tm-dialog.vue"
	import tmSheet from "@/pagesTools/tm-vuetify/components/tm-sheet/tm-sheet.vue"
	import tmEmpty from "@/pagesTools/tm-vuetify/components/tm-empty/tm-empty.vue"
	import {
		listContract,
		wxContract,
		contractValidate,
		listContractProcess
	} from '@/api/houst.js'
	import {
		format
	} from '@/utils/util.js'
	export default {
		components: {
			tmMenubars,
			tmSheet,
			tmMessage,
			tmDialog,
			tmEmpty,
		},
		data() {
			return {
				show1: false,
				contracts: [], // 当前显示图片
				thisid: 0,
				queryParams: {
					pageNum: 1,
					pageSize: 10,
					no: null,
					title: null,
					company: null,
					partyAStatus: null,
					partyBStatus: null,
					trilateralInformation: null,
					houseInformation: null,
					otherInformation: null,
					pricesDeals: null,
					createtime: null,
				},
				contract: null,
				id: null,
				type: 0,
				userInfo: null,
			}
		},
		onLoad: function(option) {
			this.userInfo = this.$store.state.user.userdata
			this.id = option.id;
			this.type = option.type;
			console.log(this.type === '0')
			this.init();
		},
		mounted() {
			if (this.$refs['item_0']) {
				this.rContentHeight = this.$refs['item_0'][0].clientHeight;
			}
		},
		methods: {
			format,
			init() {
				let _this = this
				wxContract({
					id: _this.id,
				}).then(res => {
					console.log(res.rows)
					if (res.rows.length > 0) {
						_this.contract = res.rows[0];
						if (_this.contract.state === 1) {
							_this.contract.pricesDeals = JSON.parse(_this.contract.pricesDeals)
							_this.contract.trilateralInformation = JSON.parse(_this.contract.trilateralInformation)
							if (_this.type != '1') {
								if (_this.contract.trilateralInformation.a_phone === _this.$store.state.user
									.userdata
									.phonenumber) {
									if (_this.contract.partyAStatus === 1) {
										_this.type = '1'
									}
								} else if (_this.contract.trilateralInformation.b_phone === _this.$store.state.user
									.userdata.phonenumber) {
									if (_this.contract.partyAStatus === 1) {
										_this.type = '1'
									}
								}
							}
						} else {
							_this.type = '1'
						}
						_this.contract.tfwContractProcessList.forEach(function(item2, index2) {
							item2.content = JSON.parse(item2.content)
						})
					}
				})
			},
			openDoc(path) {
				// uni.showLoading({
				// 	title: '打开中…',
				// 	icon: "loading",
				// })
				uni.navigateTo({
					url: 'ifrom?id=' + path
				});
				
				// uni.downloadFile({
				// 	url: "https://new.tianfucd.com/prod-api/contract/contract/generateReport?id=" + path,
				// 	success: function(res) {
				// 		console.log(res, '合同流程')
				// 		if (res.statusCode === 200) { //成功
				// 			var docPath = res.tempFilePath //返回的文件临时地址，用于后面打开本地预览所用
				// 			uni.openDocument({
				// 				filePath: docPath, //要打开的文件路径
				// 				fileType: "doc",
				// 				showMenu: true,
				// 				success: function(res) {
				// 					uni.hideLoading()
				// 				},
				// 				fail: function(res) {
				// 					uni.hideLoading()
				// 					console.error("打开失败")
				// 				}
				// 			})
				// 		}
				// 	},
				// 	fail: function(res) {
				// 		console.error(res, '合同流程'); //失败
				// 		uni.hideLoading()
				// 	}
				// })
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
								console.log(JSON.stringify(res))
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			callPhone(phonenumber) {
				uni.makePhoneCall({
					phoneNumber: '4008162019,' + phonenumber //仅为示例
				});
			},

			change(e) {
				console.log(e);
			}
		}
	}
</script>
<style>
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

	.item-span {
		height: 100%;
		display: flex;
		align-items: center;
	}

	.uni-forms-item {
		margin-bottom: 1px !important;
		display: flex !important;
		align-items: center !important;
	}
</style>
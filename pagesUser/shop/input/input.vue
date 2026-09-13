<template>
	<view class="home">
		<tm-menubars title="房源录入" iconColor="white"></tm-menubars>
		<view class="pb-50 text grey ">
			<tm-form @submit="submit" @request="success" method="post" url="">
				<tm-sheet :shadow="24" :padding="[12,24]" :margin="[24,24]">
					<view class="py-12 px-24 mx-12 round-3 border-b-1 grey text">
						<text class="text-size-n text-weight-b ">房源小区信息</text>
					</view>
					<tm-input name="xqname" @click="goCommunity" disabled required title="小区名称" placeholder="点击快速录入"
						v-model="reqData.title"></tm-input>
					<tm-input name="address" @click="goCommunity" disabled required title="小区所在区域" placeholder="点击快速录入"
						v-model="reqData.address"></tm-input>
					<tm-input name="xqId" @click="goCommunity" disabled required title="小区编号" placeholder="点击快速录入"
						v-model="reqData.id"></tm-input>
					<view class="py-12 px-24 mx-12 round-3 border-b-1 grey text">
						<text class="text-size-n text-weight-b ">房源属性</text>
					</view>
					<tm-input name="title" required title="房源标题" placeholder="房源标题" v-model="form.title"></tm-input>
					<view class="pl-32 pt-20" style="color: #212121!important;font-size: 30rpx;">
						<text class="text-red">*</text>房源位置
					</view>
					<view class="margin qingkuang topq">
						<tm-input name="building" :border-bottom="false" required placeholder="几栋" :padding="[10,0]"
							:vertical="true" border-color="grey-lighten-1" v-model="form.building"></tm-input>
						<tm-input name="unit" :border-bottom="false" required placeholder="几单元" :padding="[10,0]"
							:vertical="true" border-color="grey-lighten-1" v-model="form.unit"></tm-input>
						<tm-input name="floor" :border-bottom="false" required placeholder="几楼" :padding="[10,0]"
							:vertical="true" border-color="grey-lighten-1" v-model="form.floor"></tm-input>
						<tm-input name="roomNum" :border-bottom="false" required placeholder="几号" :padding="[10,0]"
							:vertical="true" border-color="grey-lighten-1" v-model="form.roomNum"></tm-input>
					</view>

					<tm-button @click="addDomain">新增业主</tm-button>
					<view name="phoneNumber" v-for="(item,index) in form.phoneNumber" :key="index">
						<tm-input title="业主姓名" required placeholder="业主姓名" v-model="item.name"></tm-input>
						<tm-input title="业主手机号" required placeholder="业主手机号" v-model="item.value"></tm-input>
						<tm-pickers v-if="item" :default-value="item.typeName" @confirm="typeSelect($event,index)"
							:list="dict.type.tfw_yzgx" rang-key="label" name="propertyType">
							<tm-input v-model="item.typeName" disabled required title="业主类型"
								placeholder="点击快速录入"></tm-input>
						</tm-pickers>
						<tm-button @click="removeDomain(item)">删除{{index+1}}业主</tm-button>
					</view>

					<view class="mx-32 my-12 border-b-1  pb-12 flex-between">
						<text class="text-size-n ">
							<text class="text-red">*</text>销售类型
						</text>
						<tm-groupradio name="type" @change="salesTypeSelect">
							<tm-radio :name="item.value" v-for="(item,index) in dict.type.tfw_rent_sale" :key="index"
								v-model="item.checked" :label="item.label"></tm-radio>
						</tm-groupradio>
					</view>
					<tm-pickers :default-value="form.propertyTypeName" @confirm="select"
						:list="dict.type.tfw_property_type" rang-key="label" name="propertyType">
						<tm-input v-model="form.propertyTypeName" disabled required title="物业类型"
							placeholder="点击快速录入"></tm-input>
					</tm-pickers>

					<view class="mx-32 my-12 border-b-1  pb-12 flex-between">
						<text class="text-size-n ">
							<text class="text-red">*</text>房屋类型
						</text>
						<tm-groupradio name="ifNewHouse" @change="fwlxSelect">
							<tm-radio :name="item.value" v-for="(item,index) in dict.type.tfw_new_old" :key="index"
								v-model="item.checked" :label="item.label"></tm-radio>
						</tm-groupradio>
					</view>
					<view class="px-24">
						<tm-button navtie-type="form" theme="bg-gradient-blue-accent" block>提交数据</tm-button>
						<view class="py-32 text-size-s text-grey text-align-center">请注意资料的上传，必填项。</view>
					</view>
				</tm-sheet>
			</tm-form>
		</view>
	</view>
</template>
<script>
	import tmForm from '@/pagesUser/tm-vuetify/components/tm-form/tm-form.vue';
	import tmButton from '@/pagesUser/tm-vuetify/components/tm-button/tm-button.vue';
	import tmRadio from '@/pagesUser/tm-vuetify/components/tm-radio/tm-radio.vue';
	import tmGroupradio from '@/pagesUser/tm-vuetify/components/tm-groupradio/tm-groupradio.vue';
	import tmGroupcheckbox from '@/pagesUser/tm-vuetify/components/tm-groupcheckbox/tm-groupcheckbox.vue';
	import tmCheckbox from '@/pagesUser/tm-vuetify/components/tm-checkbox/tm-checkbox.vue';
	import tmInput from '@/pagesUser/tm-vuetify/components/tm-input/tm-input.vue';
	import tmSheet from '@/pagesUser/tm-vuetify/components/tm-sheet/tm-sheet.vue';
	import tmPickers from '@/pagesUser/tm-vuetify/components/tm-pickers/tm-pickers.vue';


	import {
		addFangyuan,
		listFangyuan,
		ifFangYuan
	} from '@/api/houst.js'
	import {
		log
	} from 'util';
	export default {
		dicts: ['tfw_property_type', 'tfw_new_old', 'tfw_rent_sale', 'tfw_yzgx'],
		components: {
			tmForm,
			tmButton,
			tmRadio,
			tmGroupradio,
			tmInput,
			tmSheet,
			tmCheckbox,
			tmGroupcheckbox,
			tmPickers
		},
		data() {
			return {
				step: 1,
				iscf: 0,
				loadingShow: true,
				reqData: {},
				query: {
					xqId: null,
					building: null,
					unit: null,
					floor: null,
					roomNum: null,
				},
				form: {
					propertyTypeName: null,
					id: null,
					no: null,
					xqId: null,
					xqname: null,
					title: null,
					huxingId: null,
					oldHuxingId: null,
					video: null,
					coverfile: null,
					titleDeeds: null,
					featuredTags: [],
					ifNewHouse: "1",
					type: '1',
					commission: null,
					sellingPrice: null,
					expectedRent: null,
					rental: null,
					priceUnits: null,
					rentalMethod: null,
					paymentMethod: null,
					shortestRentalPeriod: null,
					rentFreeTime: null,
					transactionOwnership: null,
					propertyType: 0,
					propertyArea: null,
					usableArea: null,
					giveAwayArea: null,
					equityOwnership: null,
					titleDeedDate: null,
					ownershipYears: null,
					housingPeriod: null,
					building: null,
					totalUnit: null,
					unit: null,
					totalFloor: null,
					floor: null,
					roomNum: null,
					floorHigh: null,
					elevator: null,
					suites: null,
					grade: null,
					structure: null,
					entrustmentMethod: null,
					entrustmentSource: null,
					lift: null,
					heating: null,
					powerType: [],
					orientation: null,
					decoration: null,
					statusQuo: null,
					collateral: null,
					ifOnly: null,
					kfang: null,
					features: null,
					detailed: null,
					hits: null,
					industryType: null,
					businessType: null,
					businessLevel: null,
					bay: null,
					depth: null,
					topSort: null,
					topExpiryTime: null,
					ifIncorporation: null,
					ifPublic: null,
					ifPlatform: null,
					ifRecommend: null,
					ifRepeat: null,
					ifCheapest: null,
					status: null,
					createdBy: null,
					updatedBy: null,
					createdAt: null,
					updatedAt: null,
					deletedAt: null,
					remark: null,
					deletedState: null,
					createByName: null,
					updateByName: null,
					homeowner: null,
					phoneNumber: [{
						type: '',
						value: '',
						name: ''
					}],
				},


			}
		},
		onLoad(options) {
			let userInfo = JSON.parse(decodeURIComponent(options.info));
			this.reqData = userInfo
		},
		onShow() {},
		methods: {
			//手机号表格删除
			removeDomain(item) {
				var index = this.form.phoneNumber.indexOf(item)
				if (index !== -1) {
					this.form.phoneNumber.splice(index, 1)
				}
			},
			//手机号表格新增
			addDomain() {
				console.log("333333333333333");
				this.form.phoneNumber.push({
					type: '',
					typeName: '',
					value: '',
					name: ''
				});
			},



			typeSelect: function(e, key) {
				console.log(e, key, "0000000000000000000000000");
				this.form.phoneNumber[key].typeName = e[0].data.label
				// e[0].data.raw.dictValue
				this.form.phoneNumber[key].type = e[0].data.value
			},

			/**
			 * 销售类型选择
			 * @param {Object} e
			 */
			salesTypeSelect: function(e) {
				console.log(e);
				if (e[0].checked) {
					this.form.type = e[0].name
				}
				console.log(this.form.type, "55555");
			},
			/**
			 * 物业类型选择
			 * @param {Object} e
			 */
			select(e) {
				console.log(e);
				this.form.propertyTypeName = e[0].data.label
				// e[0].data.raw.dictValue
				this.form.propertyType = e[0].data.raw.dictValue
				console.log(this.form.propertyType, "4444");
			},
			/**
			 * 房屋类型选择
			 * @param {Object}
			 */
			fwlxSelect(e) {
				console.log(e);
				if (e[0].checked) {
					this.form.ifNewHouse = e[0].name
				}
			},

			/**
			 * 跳转到小区选择
			 */
			goCommunity: function() {
				uni.navigateTo({
					url: "./communitys"
				})
			},

			submit: function(e) {
				if (e === false) {
					uni.$tm.toast("请填写必填项。")
				} else {
					let that = this
					e.status = "3";
					// e.status=this.reqData.status;
					var ditieid = []
					e.ifNewHouse = this.form.ifNewHouse;
					e.propertyType = this.form.propertyType;
					e.type = this.form.type;
					e.phoneNumber = this.form.phoneNumber;
					e.phoneNumber = JSON.stringify(e.phoneNumber)
					this.query.xqId = this.reqData.id;
					this.query.building = this.form.building;
					this.query.unit = this.form.unit;
					this.query.floor = this.form.floor;
					this.query.roomNum = this.form.roomNum;
					console.log(this.query);
					console.log(e, "1111");
					ifFangYuan(this.query).then(res => {
						console.log(res, "22222");
						this.iscf = res.total
						if (this.iscf == 0) {
							e.state = 1
							addFangyuan(e).then(res => {
									console.log(res, "333333");
									uni.redirectTo({
										url: "secondHousing?bh=" + res.data
									})
								})
						} else {
							uni.showToast({
								title: '房源重复',
								duration: 2000,
								icon: "error"
							})
						}

					})
				}
				//
			}
		}
	}
</script>
<!-- 1634715624lp9 -->
<style>
	.home {
		width: 100%;
		overflow-x: hidden;
		overflow-y: hidden;
	}
	/* 自定义piker */
	.hidden {
		display: none !important;
	}

	.picker {
		width: 100%;
		background-color: #fff;
		bottom: 0;
		width: 100%;
		display: flex;
	}

	.pikerTitle {
		background-color: #f9f9f9;
		display: flex;
		justify-content: space-between;
		padding: 0rpx 40rpx;
		height: 80rpx;
		align-items: center;
		font-size: 28rpx;
	}

	/* 请选择户型 */
	.choose {
		color: #acacac;
	}

	.confirm {
		color: #3fbaa6;
		font-size: 30rpx;
	}

	.zhuti {
		color: #3fbaa6 !important;
	}

	.top1 {
		border-top: 2rpx solid #3fbaa6;
	}

	picker-view {
		padding: 0rpx 40rpx;
	}

	/* 户型样式 */
	.color {
		background-color: #eeeeee;
	}

	.guige {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: fixed;
		background-color: #fff;
		width: 100%;
		bottom: 0;
		z-index: 10000;
	}

	.guige text:first-of-type {
		font-size: 26rpx;
		color: #cfcfcf;
	}

	.top {
		display: flex;
		flex-direction: column;
		height: 130rpx;
		justify-content: center;
		align-items: center;
		width: 100%;
		text-align: center;
	}

	.top text:last-of-type {
		font-size: 34rpx;
		margin-top: 10rpx;
		font-weight: 400;
		color: #333;
	}

	.pickerIiew {
		color: #333;
	}

	picker-view-column view {
		font-size: 36rpx;
	}



	.phone {
		display: flex;
		justify-content: space-between;
		margin: 20rpx 0rpx;
		align-items: center;
	}

	radio {
		margin-left: 20rpx;
	}

	.item input {
		border-bottom: 1rpx solid #ccc;
	}

	.phone1 {
		width: 300rpx;
		font-size: 30rpx;
		text-align: left;
		border-bottom: 1rpx solid #ccc;
		padding-left: 20rpx;
	}

	.phone1[placeholder] {
		font-size: 36rpx;
	}

	tm-input {
		width: 150rpx;
		height: 35px;
		text-align: center;
		font-size: 28rpx;
		border-radius: 7rpx;
	}

	.topq {
		padding-left: 22rpx;
		padding-right: 22rpx;
	}

	.topq tm-input {
		border: 1rpx solid #ccc;
	}

	.qingkuang {
		justify-content: space-between;
	}

	.margin {
		display: flex;
		margin: 20rpx 0rpx;
		margin-bottom: 10rpx;
	}
</style>

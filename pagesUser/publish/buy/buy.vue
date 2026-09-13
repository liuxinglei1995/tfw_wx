<template>
	<view>
		<tm-menubars title="委托找房" iconColor="white"></tm-menubars>
		<view class="container pb-20">
			<tm-form @submit="submit" ref="formData" @request="success" method="post">
				<tm-pickersCity ref="citypieek" :default-value.sync="reqData.area">
					<tm-input name="area" :border-bottom="false" required title="需求区域" placeholder="请选择城市区域" disabled
						:value="cityDisplay" right-icon="icon-angle-right"></tm-input>
				</tm-pickersCity>
				<tm-input name="remarks" title="片区备注" v-model="reqData.remarks"></tm-input>
				<tm-pickers :default-value="reqData.typeName" @confirm="select" :list="typelist" rang-key="l"
					name="type">
					<tm-input v-model="reqData.typeName" disabled required title="委托类型"
						placeholder="请选择委托类型"></tm-input>
				</tm-pickers>
				<tm-pickers :default-value="reqData.purposeOfTheHouseName" @confirm="purposeOfTheHouseSelect"
					:list="dict.type.tfw_featured_tags" rang-key="label" name="purposeOfTheHouse">
					<tm-input v-model="reqData.purposeOfTheHouseName" disabled required title="房屋用途"
						placeholder="请选择房屋用途"></tm-input>
				</tm-pickers>
				<!-- 求购 -->
				<view v-if="reqData.type==1 ||reqData.type==3">
					求购需求
					<view class="info">你想要买多大的房子？(平方米)</view>
					<view class="flex-start my-20">
						<tm-input :border-bottom="false" inputType="number" name="purchaseAreaMin"
							v-model="reqData.purchaseAreaMin" placeholder="最小面积" :vertical="true"
							border-color="grey-lighten-1"></tm-input>
						<view class="mx-20">
							-
						</view>
						<tm-input :border-bottom="false" inputType="number" name="purchaseAreaMax"
							v-model="reqData.purchaseAreaMax" placeholder="最大面积" :vertical="true"
							border-color="grey-lighten-1"></tm-input>
					</view>


					<view class="info"><text>你的预算是多少万</text></view>
					<view class="flex-start my-20">
						<tm-input :border-bottom="false" inputType="number" name="purchasePriceMin"
							v-model="reqData.purchasePriceMin" placeholder="最低预算" :vertical="true"
							border-color="grey-lighten-1"></tm-input>
						<view class="mx-20">
							-
						</view>
						<tm-input :border-bottom="false" inputType="number" name="purchasePriceMax"
							v-model="reqData.purchasePriceMax" placeholder="最高预算" :vertical="true"
							border-color="grey-lighten-1"></tm-input>
					</view>
					购房需求户型
					<u-checkbox-group name="purchaseRoom" v-model="reqData.purchaseRoom" placement="column"
						@change="checkboxChange" style="display: flex;flex-direction: row">
						<u-checkbox :customStyle="{marginBottom: '8px'}" v-for="(item, index) in dict.type.tfw_fuxing"
							:key="index" :label="item.label" :name="item.value" :disabled="item.disabled">
						</u-checkbox>
					</u-checkbox-group>
				</view>
				<view v-if="reqData.type==2||reqData.type==3">
					求租需求
					<view class="info">你想要租多大的房子？(平方米)</view>
					<view class="flex-start my-20">
						<tm-input :border-bottom="false" inputType="number" name="rentingAreaMin"
							v-model="reqData.rentingAreaMin" placeholder="最小面积" :vertical="true"
							border-color="grey-lighten-1"></tm-input>
						<view class="mx-20">
							-
						</view>
						<tm-input :border-bottom="false" inputType="number" name="rentingAreaMax"
							v-model="reqData.rentingAreaMax" placeholder="最大面积" :vertical="true"
							border-color="grey-lighten-1"></tm-input>
					</view>


					<view class="info"><text>你的预算是多少(元)</text></view>
					<view class="flex-start my-20">
						<tm-input :border-bottom="false" inputType="number" name="rentingPriceMin"
							v-model="reqData.rentingPriceMin" placeholder="最低预算" :vertical="true"
							border-color="grey-lighten-1"></tm-input>
						<view class="mx-20">
							-
						</view>
						<tm-input :border-bottom="false" inputType="number" name="rentingPriceMax"
							v-model="reqData.rentingPriceMax" placeholder="最高预算" :vertical="true"
							border-color="grey-lighten-1"></tm-input>
					</view>
					租房需求户型
					<u-checkbox-group name="purchaseRoom" v-model="reqData.rentingRoom" placement="column"
						@change="checkboxChange2" style="display: flex;flex-direction: row">
						<u-checkbox :customStyle="{marginBottom: '8px'}" v-for="(item, index) in dict.type.tfw_fuxing"
							:key="index" :label="item.label" :name="item.value" :disabled="item.disabled">
						</u-checkbox>
					</u-checkbox-group>
				</view>
				<tm-button @click="addDomain">新增联系方式</tm-button>
				<view name="phoneNumber" v-for="(item,index) in customer" :key="index">
					<tm-input title="业主姓名" required placeholder="姓名" v-model="item.name"></tm-input>
					<tm-pickers v-if="item" :default-value="item.sexName" @confirm="typeSelect($event,index)"
						:list="dict.type.sys_user_sex" rang-key="label">
						<tm-input v-model="item.sexName" disabled required title="性别" placeholder="请选择性别"></tm-input>
					</tm-pickers>
					<tm-input title="业主手机号" required placeholder="手机号" v-model="item.value"></tm-input>

					<tm-button @click="removeDomain(item)">删除{{index+1}}</tm-button>
				</view>




				<tm-button navtie-type="form">提交数据</tm-button>
			</tm-form>
		</view>
	</view>
</template>

<script>
	import {
		addMandate,
		addTourists
	} from '@/api/houst.js'
  import UCheckbox from "@/pagesUser/uview-ui/components/u-checkbox/u-checkbox.vue";
  import UCheckboxGroup from "@/pagesUser/uview-ui/components/u-checkbox-group/u-checkbox-group.vue";
	import tmSliders from '@/pagesUser/tm-vuetify/components/tm-sliders/tm-sliders.vue';
	import tmInput from '@/pagesUser/tm-vuetify/components/tm-input/tm-input.vue';
	import tmForm from '@/pagesUser/tm-vuetify/components/tm-form/tm-form.vue';
	import tmPickersCity from '@/pagesUser/tm-vuetify/components/tm-pickersCity/tm-pickersCity.vue';
	import tmButton from '@/pagesUser/tm-vuetify/components/tm-button/tm-button';
	import tmPickers from '@/pagesUser/tm-vuetify/components/tm-pickers/tm-pickers';

import {
	showConfirm,
} from '@/utils/common'

	export default {
		dicts: ['tfw_featured_tags', 'tfw_fuxing', 'sys_user_sex'],
		components: {
      UCheckbox,
      UCheckboxGroup,
			tmSliders,
			tmInput,
			tmForm,
			tmButton,
			tmPickersCity,
			tmPickers
		},
		data() {
			return {
				customer: [{
					sex: "",
					sexName: "",
					value: "",
					name: "",
					value2flag: false,
					value2: ""
				}],
				purchaseRoom: [],
				rentingRoom: [],
				reqData: {
					customer: null,
					area: [],
					remarks: null,
					type: null,
					typeName: null,
					purposeOfTheHouse: null,
					purposeOfTheHouseName: null,
					purchaseRoom: null,
					purchasePriceMax: null,
					purchasePriceMin: null,
					purchaseAreaMax: null,
					purchaseAreaMin: null,
					rentingPriceMax: null,
					rentingPriceMin: null,
					rentingAreaMax: null,
					rentingAreaMin: null,
					rentingRoom: null,
					publicAndPrivate:1,
					source:1,

				},
				typelist: [{
						l: '求购',
						v: 1
					},
					{
						l: '求租',
						v: 2
					},
					{
						l: '租购',
						v: 3
					}
				]

			};
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(option) {

		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},

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
		onShareAppMessage: function() {},
		computed: {
			cityDisplay: function() {
				if (typeof this.reqData.area[0] === 'object') {
					let ds = [];
					this.reqData.area.forEach(item => {
						ds.push(item.text)
					})
					return ds.join(',')
				} else if (typeof this.reqData.area[0] === 'string') {

					return this.reqData.area.join(',')
				}
			}
		},
		methods: {

			typeSelect: function(e, key) {
				this.customer[key].sexName = e[0].data.label
				// e[0].data.raw.dictValue
				this.customer[key].sex = e[0].data.value
			},

			//动态表格删除
			removeDomain(item) {
				var index = this.customer.indexOf(item)
				if (index !== -1) {
					this.customer.splice(index, 1)
				}
			},
			//动态表格新增
			addDomain() {

				this.customer.push({
					type: "",
					typeName: "",
					value: "",
					name: ""
				});
			},


			// 购房户型
			checkboxChange(e) {
				this.purchaseRoom = e

			},
			// 租房户型
			checkboxChange2(e) {
				this.rentingRoom = e
			},
			/**
			 * 委托类型选择
			 * @param {Object} ee
			 */
			select(e) {
				this.reqData.typeName = e[0].data.l
				this.reqData.type = e[0].data.v
			},
			/**
			 * 房屋用途选择
			 * @param {Object} e
			 */
			purposeOfTheHouseSelect(e) {
				this.reqData.purposeOfTheHouseName = e[0].data.label
				this.reqData.purposeOfTheHouse = e[0].data.raw.dictValue
			},
			submit(e) {
				this.reqData.area = e.area
				this.reqData.customer = JSON.stringify(this.customer)
				this.reqData.purchaseRoom = this.purchaseRoom.join(",")
				this.reqData.rentingRoom = this.rentingRoom.join(",")
				addTourists(this.reqData).then(res => {
					showConfirm('添加成功，请耐心等待工作人员联系').then(res => {
						if (res.confirm) {
								uni.reLaunch({
									url: '/pages/index/index'
								})
						}
					})
					reject('无效的会话')
				})
			},


		}
	};
</script>
<style>
	image {
		width: 100%;
		height: 300rpx;
	}

	.content {
		padding: 20rpx 40rpx;
	}

	.content .info {
		background-color: #fff !important;
		color: #000000;
		position: relative;
		font-weight: bold;
		font-size: 34rpx;
	}

	.items {
		display: flex;
		flex-wrap: wrap;
		margin-top: 40rpx;
		margin-bottom: 20rpx;
	}

	.item {
		width: 100%;
		padding: 10rpx 20rpx;
		background-color: #ececec;
		font-size: 28rpx;
		font-weight: 400;
		width: 108rpx;
		height: 40rpx;
		line-height: 40rpx;
		float: left;
		margin-right: 20rpx;
		margin-bottom: 25rpx;
		text-align: center;
		font-size: 24rpx !important;
		border-radius: 5rpx;
		border: 1rpx solid transparent;
	}

	.item:active {
		filter: brightness(90%);
	}

	.item:nth-child(4n) {
		margin-right: 0rpx;
	}

	.middle {
		margin-top: 40rpx;
		overflow: hidden;
		margin-bottom: 20rpx !important;
	}

	.blue {
		background-color: #3fbaa6;
		color: #fff;
	}

	.search {
		display: flex;
		align-items: center;
		height: 70rpx;
		margin: 40rpx 0rpx;
		border-radius: 10rpx;
		border: 1rpx solid #ccc;
	}

	input {
		width: 80%;
	}

	.icon-xingtaiduICON {
		color: #c1c1c1;
		margin: 0rpx 20rpx;
	}

	input[placeholder] {
		font-size: 28rpx;
	}

	.btn {
		width: 90% !important;
		border-radius: 50rpx;
		font-weight: normal;
		background-color: #3fbaa6;
		color: white;
		margin-top: 40rpx;
		margin-bottom: 60rpx;
	}

	.btn:active {
		filter: brightness(90%);
	}

	.big {
		display: flex;
		flex-wrap: wrap;
		margin-top: 40rpx;
		margin-bottom: 40rpx;
	}

	.ma {
		margin: 40rpx 0rpx;
	}

	.title {
		font-size: 28rpx;
	}

	.price {
		display: flex;
		justify-content: space-around;
		margin: 20rpx 0rpx 40rpx;
		font-size: 25rpx;
		color: #b3b3b3;
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
		margin: 30rpx 0rpx;
	}

	.phone1[placeholder] {
		font-size: 36rpx;
	}
</style>

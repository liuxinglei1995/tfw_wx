<template>
	<view class="">
		<tm-menubars title="天府网税费计算器" iconColor="white"></tm-menubars>
		<tm-tabs @change="tabChange" v-model="activeIndex" :list="list" align="left" range-key="title"></tm-tabs>

		<tm-sheet :shadow="24" :padding="[12,24]" :margin="[24,24]">
			<tm-form @submit="submit" ref="formData" @request="success" method="post" url="">
				<tm-pickers :default-value.sync="reqData.gouFangXingZhi" rang-key="title" :list="gouFangXingZhi">
					<tm-input name="gouFangXingZhi" title="购房性质" placeholder="请选择购房性质" disabled
						:value="obTstr2(reqData.gouFangXingZhi)" right-icon="icon-angle-right"></tm-input>
				</tm-pickers>

				<tm-pickers v-show="rentShow" :default-value.sync="reqData.zhuanRangNianXian" rang-key="title"
					:list="zhuanRangNianXian">
					<tm-input name="zhuanRangNianXian" title="转让年限" placeholder="请选择转让年限" disabled
						:value="obTstr2(reqData.zhuanRangNianXian)" right-icon="icon-angle-right"></tm-input>
				</tm-pickers>

				<tm-pickers v-show="rentShow" :default-value.sync="reqData.shiFouWeiYi" rang-key="title"
					:list="shiFouWeiYi">
					<tm-input name="shiFouWeiYi" title="是否唯一" placeholder="请选择是否唯一" disabled
						:value="obTstr2(reqData.shiFouWeiYi)" right-icon="icon-angle-right"></tm-input>
				</tm-pickers>

				<tm-input v-model="reqData.mj" name="mj" title="房屋面积" placeholder="房屋面积" suffix="㎡"></tm-input>
				<tm-input v-model="reqData.money" name="money" title="房屋总价" placeholder="房屋总价" suffix="万元"></tm-input>
				<tm-input v-show="rentShow" v-model="reqData.feis_buy" name="feis_buy" title="买方中介费" placeholder="买方中介费"
					suffix="%"></tm-input>
				<tm-input v-show="rentShow" v-model="reqData.feis_sell" name="feis_sell" title="卖方中介费"
					placeholder="卖方中介费" suffix="%"></tm-input>

				<view class="px-24">
					<tm-button navtie-type="form" theme="bg-gradient-blue-accent" block>开始计算</tm-button>
					<view class="py-32 text-size-s text-grey text-align-center">*税费计算结果仅供参考，请以实际缴纳金额结果为准。</view>
				</view>
			</tm-form>
		</tm-sheet>
	</view>
</template>

<script>
	import tmSheet from '@/tm-vuetify/components/tm-sheet/tm-sheet.vue';
	import tmForm from '@/tm-vuetify/components/tm-form/tm-form.vue';
	import tmPickers from '@/tm-vuetify/components/tm-pickers/tm-pickers.vue';
	import tmButton from '@/tm-vuetify/components/tm-button/tm-button.vue';
	import tmInput from '@/tm-vuetify/components/tm-input/tm-input.vue';
	import tmTabs from '@/tm-vuetify/components/tm-tabs/tm-tabs.vue';
	export default {
		components: {
			tmSheet,
			tmForm,
			tmPickers,
			tmButton,
			tmInput,
			tmTabs
		},
		data() {
			return {
				activeIndex: 0,
				list: ['二手房', '新房'],
				gouFangXingZhi: [],
				zhuanRangNianXian: [],
				shiFouWeiYi: [{
						title: "唯一",
						id: 0
					},
					{
						title: "非唯一",
						id: 1
					},
				],
				reqData: {
					gouFangXingZhi: [],
					zhuanRangNianXian: [],
					shiFouWeiYi: [],
					mj: null,
					money: null,
					feis_buy: null,
					feis_sell: null,
				},
				rentShow: true,
				type: 'rent'
			}
		},
		onShow() {
			// uni.navigateTo({
			// 	url: '/pagesTools/pages/calculator/index/index'
			// })
			
			let that = this
			let area = uni.getStorageSync('city') ? uni.getStorageSync('city') : '成都'
			let zrnx = []
			let gouFangXingZhi = []
			if (area == '成都') {
				zrnx = [{
						title: "满二",
						id: 0
					},
					{
						title: "不满二",
						id: 1
					},
					{
						title: "满五",
						id: 2
					}
				]
				gouFangXingZhi = [{
						title: "首套",
						id: 0
					},
					{
						title: "二套",
						id: 1
					},
					{
						title: "三套",
						id: 2
					}
				]
			}
			if (area == '内江') {
				zrnx = [{
						title: "满二",
						id: 0
					},
					{
						title: "不满二",
						id: 1
					},
					{
						title: "满五",
						id: 2
					}
				]
				gouFangXingZhi = [{
						title: "首套",
						id: 0
					},
					{
						title: "二套",
						id: 1
					},
					{
						title: "三套",
						id: 2
					}
				]
			}
			that.zhuanRangNianXian = zrnx,
				that.gouFangXingZhi = gouFangXingZhi
		},
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
			 * 对象转url参数
			 * @param {*} data
			 * @param {*} isPrefix
			 */
			queryParams(data, isPrefix) {
				isPrefix = isPrefix ? isPrefix : false
				let prefix = isPrefix ? '?' : ''
				let _result = []
				for (let key in data) {
					let value = data[key]
					// 去掉为空的参数
					if (['', undefined, null].includes(value)) {
						continue
					}
					if (value.constructor === Array) {
						value.forEach(_value => {
							_result.push(encodeURIComponent(key) + '[]=' + encodeURIComponent(_value))
						})
					} else {
						_result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
					}
				}

				return _result.length ? prefix + _result.join('&') : ''
			},
			/**
			 * @param {Object} o
			 */
			obTstr2(o) {
				if (Array.isArray(o)) {
					if (o.length.length === 0) return "";
					return o[0]?.title ?? ""
				}
				return ''
			},
			submit: function(e) {
				console.log(e, "1111111");
				let that = this
				e.type = that.type
				if (e.type == 'new') {
					e.zhuanRangNianXian = '满五'
					e.shiFouWeiYi = '唯一'
					e.feis = 0
				}
				e.area = uni.getStorageSync('cityCode') ? uni.getStorageSync('cityCode') : '510100'
				console.log(JSON.stringify(e), "ssssssssss");
				uni.navigateTo({
					url: "./result?e=" + JSON.stringify(e)
				})
			},
			tabChange: function(e) {
				if (e == 1) {
					this.rentShow = false
					this.type = 'new'
				} else {
					this.rentShow = true
					this.type = 'rent'
				}
			}
		}
	};
</script>

<style>
	.title {
		font-size: 36rpx;
		font-weight: bold;
		text-align: left;
		color: #333333;
	}

	.time {
		font-size: 24rpx;
		font-weight: 400;
		text-align: left;
		color: #999999;
	}

	.type {
		font-size: 32rpx;
		font-weight: 400;
		text-align: left;
		color: #333333;
		letter-spacing: 0px;
	}
</style>
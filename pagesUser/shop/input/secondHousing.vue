<template>
	<view class="home">
		<tm-menubars title="二手房录入" iconColor="white"></tm-menubars>
		<view class="pb-50 text grey ">
			<view class="table_index">
				<view class="py-12 px-24 mx-12 round-3 border-b-1 grey text mb-12">
					<text class="text-size-n text-weight-b ">房源属性</text>
				</view>
				<uni-forms ref="houseFrom" :model="reqData" :rules="rules">
					<uni-forms-item label="房源标题" name="title" label-width="80px">
						<uni-easyinput type="text" v-model="reqData.title" placeholder="房源标题" />
					</uni-forms-item>
					<uni-forms-item label="销售类型" name="type" label-width="80px">
						<uni-data-select v-model="reqData.type" @change="initType"
							:localdata="dictFind.dictUniSelect(dict.type.tfw_rent_sale)"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item name="propertyType" label="物业类型" label-width="80px">
						<uni-data-select v-model="reqData.propertyType"
							:localdata="dictFind.dictUniSelect(dict.type.tfw_property_type)"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item name="grade" label="房源评级" label-width="80px">
						<uni-data-select v-model="reqData.grade"
							:localdata="dictFind.dictUniSelect(dict.type.tfw_ecommendation_level)"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item name="structure" label="房屋结构" label-width="80px">
						<uni-data-select v-model="reqData.structure"
							:localdata="dictFind.dictUniSelect(dict.type.tfw_house_structure)"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item name="decoration" label="装修情况" label-width="80px">
						<uni-data-select v-model="reqData.decoration"
							:localdata="dictFind.dictUniSelect(dict.type.tfw_decoration_situation)"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item name="orientation" label="房屋朝向" label-width="80px">
						<uni-data-select v-model="reqData.orientation"
							:localdata="dictFind.dictUniSelect(dict.type.tfw_housing_orientation)"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item name="heating" label="房屋供暖" label-width="80px">
						<uni-data-select v-model="reqData.heating"
							:localdata="dictFind.dictUniSelect(dict.type.tfw_heating_type)"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item name="lift" label="电梯情况" label-width="80px">
						<uni-data-select v-model="reqData.lift"
							:localdata="dictFind.dictUniSelect(dict.type.tfw_elevator_situation)"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item name="statusQuo" label="房屋现况" label-width="80px">
						<uni-data-select v-model="reqData.statusQuo"
							:localdata="dictFind.dictUniSelect(dict.type.twf_fwxz)"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item name="powerType" label="用电类型" label-width="80px">
						<uni-data-select v-model="reqData.powerType"
							:localdata="dictFind.dictUniSelect(dict.type.tfw_electricity_consumption)"></uni-data-select>
					</uni-forms-item>
					<view class="py-12 px-24 mx-12 round-3 border-b-1 grey text mb-12">
						<text class="text-size-n text-weight-b ">房源位置</text>
					</view>
					<view class="flex-top-start pb-20 pt-20">
						<uni-easyinput v-model="reqData.building" placeholder="栋" @input="input">
							<template #right>
								<view style="font-weight: 700;margin-right: 5px;">栋</view>
							</template>
						</uni-easyinput>
						<uni-easyinput v-model="reqData.unit" placeholder="单元" @input="input">
							<template #right>
								<view style="font-weight: 700;margin-right: 5px;">单元</view>
							</template>
						</uni-easyinput>
						<uni-easyinput v-model="reqData.floor" placeholder="楼" @input="input">
							<template #right>
								<view style="font-weight: 700;margin-right: 5px;">楼</view>
							</template>
						</uni-easyinput>
						<uni-easyinput v-model="reqData.roomNum" placeholder="号" @input="input">
							<template #right>
								<view style="font-weight: 700;margin-right: 5px;">号</view>
							</template>
						</uni-easyinput>
					</view>
					<uni-forms-item name="ownershipYears" label="产权年限" label-width="80px">
						<uni-data-select v-model="reqData.ownershipYears"
							:localdata="dictFind.dictUniSelect(dict.type.tfw_property_rights)"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item name="ifOnly" label="是否唯一" label-width="80px">
						<uni-data-select v-model="reqData.ifOnly"
							:localdata="dictFind.dictUniSelect(dict.type.tfw_sfwy)"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item name="equityOwnership" label="产权所有" label-width="80px">
						<uni-data-select v-model="reqData.equityOwnership"
							:localdata="dictFind.dictUniSelect(dict.type.tfw_property_ownership)"></uni-data-select>
					</uni-forms-item>
					<view class="py-12 px-24 mx-12 mb-12 round-3 border-b-1 grey text">
						<text class="text-size-n text-weight-b ">房源详情</text>
					</view>
					<uni-forms-item label="套内面积" name="usableArea" label-width="80px">
						<uni-easyinput v-model="reqData.usableArea" placeholder="套内面积" />
					</uni-forms-item>
					<uni-forms-item label="使用面积" name="propertyArea" label-width="80px">
						<uni-easyinput v-model="reqData.propertyArea" placeholder="使用面积" />
					</uni-forms-item>
					<uni-forms-item label="房源特色" name="features" label-width="80px">
						<uni-easyinput type="textarea" v-model="reqData.features" placeholder="房源特色" />
					</uni-forms-item>
					<view class="py-12 px-24 mx-12  mb-12 round-3 border-b-1 grey text">
						<text class="text-size-n text-weight-b ">封面图</text>
						<text class="text-grey text-size-xs px-10">(最多可以上传1张)</text>
					</view>
					<view v-if="fileList1" class="py-32 mx-12">
						<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
							:maxCount="1"></u-upload>
					</view>
					<view class="py-12 px-24 mx-12 round-3 border-b-1 grey text">
						<text class="text-size-n text-weight-b ">费用相关</text>
					</view>
					<!-- 售卖 -->
					<uni-forms-item label="买方佣金" name="commission" v-if="reqData.type === '1'" 
						:rules="reqData.type === '1' ? [{ required: true, errorMessage: '请输入买方佣金' }] : []">
						<uni-easyinput v-model="reqData.commission" placeholder="买方佣金" />
					</uni-forms-item>
					<uni-forms-item label="售价" name="sellingPrice" v-if="reqData.type === '1'"
						:rules="reqData.type === '1' ? [{ required: true, errorMessage: '请输入售价' }] : []">
						<uni-easyinput v-model="reqData.sellingPrice" placeholder="售价" />
					</uni-forms-item>
					<!-- 出租 -->
					<uni-forms-item label="出租佣金" name="commissionMethod" v-if="reqData.type === '2'"
						:rules="reqData.type === '2' ? [{ required: true, errorMessage: '请输入出租佣金' }] : []">
						<uni-data-select v-model="reqData.commissionMethod"
							:localdata="dictFind.dictUniSelect(dict.type.tfw_house_commission_method)"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item label="租金" name="rental" v-if="reqData.type === '2'"
						:rules="reqData.type === '2' ? [{ required: true, errorMessage: '请输入租金' }] : []">
						<uni-easyinput v-model="reqData.rental" placeholder="请输入租金" />
					</uni-forms-item>
					<uni-forms-item label="出租方式" name="rentalMethod" v-if="reqData.type === '2'"
						:rules="reqData.type === '2' ? [{ required: true, errorMessage: '请选择出租方式' }] : []">
						<uni-data-select v-model="reqData.rentalMethod"
							:localdata="czlist"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item label="最短租期" name="shortestRentalPeriod" v-if="reqData.type === '2'"
						:rules="reqData.type === '2' ? [{ required: true, errorMessage: '请选择最短租期' }] : []">
						<uni-data-select v-model="reqData.shortestRentalPeriod"
							:localdata="zqlist"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item label="免租时间" name="rentFreeTime" v-if="reqData.type === '2'"
						:rules="reqData.type === '2' ? [{ required: true, errorMessage: '请选择免租时间' }] : []">
						<uni-data-select v-model="reqData.rentFreeTime"
							:localdata="mzlist"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item label="付款方式" name="paymentMethod" v-if="reqData.type === '2'"
						:rules="reqData.type === '2' ? [{ required: true, errorMessage: '请选择付款方式' }] : []">
						<uni-data-select v-model="reqData.paymentMethod"
							:localdata="fklist"></uni-data-select>
					</uni-forms-item>
					<!-- 租售同步 -->
					<uni-forms-item label="买方佣金" name="commission" v-if="reqData.type === '3'"
						:rules="reqData.type === '3' ? [{ required: true, errorMessage: '请输入买方佣金' }] : []">
						<uni-easyinput v-model="reqData.commission" placeholder="买方佣金" />
					</uni-forms-item>
					<uni-forms-item label="售价" name="sellingPrice" v-if="reqData.type === '3'"
						:rules="reqData.type === '3' ? [{ required: true, errorMessage: '请输入售价' }] : []">
						<uni-easyinput v-model="reqData.sellingPrice" placeholder="售价" />
					</uni-forms-item>
					<uni-forms-item label="出租佣金" name="commissionMethod" v-if="reqData.type === '3'"
						:rules="reqData.type === '3' ? [{ required: true, errorMessage: '请选择出租佣金' }] : []">
						<uni-data-select v-model="reqData.commissionMethod"
							:localdata="dictFind.dictUniSelect(dict.type.tfw_house_commission_method)"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item label="租金" name="rental" v-if="reqData.type === '3'"
						:rules="reqData.type === '3' ? [{ required: true, errorMessage: '请输入租金' }] : []">
						<uni-easyinput v-model="reqData.rental" placeholder="请输入租金" />
					</uni-forms-item>
					<uni-forms-item label="出租方式" name="rentalMethod" v-if="reqData.type === '3'"
						:rules="reqData.type === '3' ? [{ required: true, errorMessage: '请选择出租方式' }] : []">
						<uni-data-select v-model="reqData.rentalMethod"
							:localdata="czlist"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item label="最短租期" name="shortestRentalPeriod" v-if="reqData.type === '3'"
						:rules="reqData.type === '3' ? [{ required: true, errorMessage: '请选择最短租期' }] : []">
						<uni-data-select v-model="reqData.shortestRentalPeriod"
							:localdata="zqlist"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item label="免租时间" name="rentFreeTime" v-if="reqData.type === '3'"
						:rules="reqData.type === '3' ? [{ required: true, errorMessage: '请选择免租时间' }] : []">
						<uni-data-select v-model="reqData.rentFreeTime"
							:localdata="mzlist"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item label="付款方式" name="paymentMethod" v-if="reqData.type === '2'"
						:rules="reqData.type === '3' ? [{ required: true, errorMessage: '请选择付款方式' }] : []">
						<uni-data-select v-model="reqData.paymentMethod"
							:localdata="fklist"></uni-data-select>
					</uni-forms-item>
					<view class="py-12 px-24 mx-12 mb-12 round-3 border-b-1 grey text">
						<text class="text-size-n text-weight-b ">业主信息</text>
					</view>
					<view v-for="(item,index) in reqData.phoneNumber">
						<uni-forms-item label="业主姓名" name="homeowner" label-width="80px">
							<uni-easyinput v-model="item.name" placeholder="业主姓名" />
						</uni-forms-item>
						<uni-forms-item label="业主电话" name="phoneNumber" label-width="80px">
							<uni-easyinput v-model="item.value" placeholder="业主电话" />
						</uni-forms-item>
					</view>
					<view class="py-12 px-24 mx-12 mb-12 round-3 border-b-1 grey text">
						<text class="text-size-n text-weight-b ">其他信息</text>
					</view>
					<uni-forms-item name="kfang" label="看房方式" label-width="80px">
						<uni-data-select v-model="reqData.kfang"
							:localdata="dictFind.dictUniSelect(dict.type.tfw_kffs)"></uni-data-select>
					</uni-forms-item>

					<view class="py-12 px-24 mx-12 mb-12 round-3 border-b-1 grey text">
						<text class="text-size-n text-weight-b ">状态信息</text>
					</view>
					<uni-forms-item name="entrustmentSource" label="委托来源" label-width="80px">
						<uni-data-select v-model="reqData.entrustmentSource"
							:localdata="dictFind.dictUniSelect(dict.type.tfw_source_commission)"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item name="entrustmentMethod" label="委托方式" label-width="80px">
						<uni-data-select v-model="reqData.entrustmentMethod"
							:localdata="dictFind.dictUniSelect(dict.type.tfw_entrustment_method)"></uni-data-select>
					</uni-forms-item>
					<view style="display: flex;">
						<button class="uni-button" style="width: 45%;" size="mini" type="primary" @click="submit(1)">提交审核</button>
						<button class="uni-button" style="width: 45%;" size="mini" type="primary" @click="submit(0)">保存数据</button>
					</view>
					<view class="py-32 text-size-s text-grey text-align-center">请注意资料的上传，必填项。</view>
				</uni-forms>
			</view>
		</view>
	</view>
</template>

<script>
	import uRadioGroup from "@/pagesUser/uview-ui/components/u-radio-group/u-radio-group.vue"
	import uRadio from "@/pagesUser/uview-ui/components/u-radio/u-radio.vue"
	import uUpload from "@/pagesUser/uview-ui/components/u-upload/u-upload.vue"
	import config from '@/config'
	import uniForms from '@/pagesUser/components/uni-forms/components/uni-forms/uni-forms';
	import uniFormsItem from '@/pagesUser/components/uni-forms/components/uni-forms-item/uni-forms-item';
	import uniEasyinput from "@/pagesUser/components/uni-easyinput/components/uni-easyinput/uni-easyinput.vue";
	import uniDataSelect from "@/pagesUser/components/uni-data-select/components/uni-data-select/uni-data-select.vue";
	import {
		getFangyuan,
		updateFangyuan,

	} from '@/api/houst.js'
	export default {
		dicts: ['tfw_property_type', 'tfw_house_structure', 'tfw_decoration_situation', 'tfw_housing_orientation',
			'tfw_heating_type', 'tfw_elevator_situation', 'twf_fwxz', "tfw_property_rights", 'tfw_sfwy',
			'tfw_property_ownership', 'tfw_entrustment_method', 'tfw_source_commission', 'tfw_rent_sale', 'tfw_kffs',
			'tfw_electricity_consumption', 'tfw_ecommendation_level','tfw_house_commission_method'
		],
		components: {
			uRadio,
			uUpload,
			uRadioGroup,

			uniForms,
			uniFormsItem,
			uniEasyinput,
			uniDataSelect,
		},
		data() {
			return {
				//上传图片列表
				fileList1: [],
				//视频
				fileList2: [],
				step: 1,
				// loadingShow:true,
				//选择器内容
				pickerType: 'layout',
				//户型显示
				housePickerShow: false,
				value: [],
				reqData: {
					title: "", //标题
					type: "", //销售类型
					propertyType: "", //物业类型
					grade: "", //房源评级
					structure: "", //房屋结构
					decoration: "", //装修情况
					orientation: "", //房屋朝向
					heating: "", //房屋供暖
					lift: "", //电梯情况
					statusQuo: "", //房屋现况
					powerType: "", //用电类型
					building: "", //栋
					unit: "", //单元
					floor: "", //层
					roomNum: "", //号
					ownershipYears: "", //产权年限
					ifOnly: "", //是否唯一
					equityOwnership: "", //产权所有
					usableArea: "", //套内面积
					propertyArea: "", //使用面积
					features: '', //房源特色
					commission: "", //售卖佣金
					sellingPrice: "", //出售价格
					commissionMethod: '', //出租佣金
					rental: '', //租金
					rentalMethod: '', //出租方式
					shortestRentalPeriod: '', //最短租期
					rentFreeTime: '', // 免租时间
					paymentMethod: '', //付款方式
					kfang: '', //看房方式
					entrustmentSource: '', //委托来源
					entrustmentMethod: '', //委托方式
				},
				rules: {
					title: { rules:[{ required: true, errorMessage: '请填写标题', }] },
					type: { rules:[{ required: true, errorMessage: '请选择销售类型', }] },
					propertyType: { rules:[{ required: true, errorMessage: '请选择物业类型', }] },
					grade: { rules:[{ required: true, errorMessage: '请选择房源评级', }] },
					structure: { rules:[{ required: true, errorMessage: '请选择房屋结构', }] },
					decoration: { rules:[{ required: true, errorMessage: '请选择装修情况', }] },
					orientation: { rules:[{ required: true, errorMessage: '请选择房屋朝向', }] },
					heating: { rules:[{ required: true, errorMessage: '请选择供暖情况', }] },
					lift: { rules:[{ required: true, errorMessage: '请选择电梯情况', }] },
					statusQuo: { rules:[{ required: true, errorMessage: '请选择房屋现况', }] },
					powerType: { rules:[{ required: true, errorMessage: '请选择用电类型', }] },
					building: { rules:[{ required: true, errorMessage: '请输入栋数', }] },
					unit: { rules:[{ required: true, errorMessage: '请输入单元', }] },
					floor: { rules:[{ required: true, errorMessage: '请输入楼层', }] },
					roomNum: { rules:[{ required: true, errorMessage: '请输入房号', }] },
					ownershipYears: { rules:[{ required: true, errorMessage: '请选择产权年限', }] },
					ifOnly: { rules:[{ required: true, errorMessage: '请选择是否唯一', }] },
					equityOwnership: { rules:[{ required: true, errorMessage: '请选择产权所有情况', }] },
					propertyArea: { rules:[{ required: true, errorMessage: '请输入使用面积', }] },
					kfang: { rules:[{ required: true, errorMessage: '请选择看房方式', }] },
					entrustmentSource: { rules:[{ required: true, errorMessage: '请选择委托来源', }] },
					entrustmentMethod: { rules:[{ required: true, errorMessage: '请选择委托方式', }] },
				},
				id: 0,
				checkList: {},
				rate: 0,
				czlist: [
					{ value: 1, text: '整租' },
					{ value: 2, text: '合租' },
					{ value: 3, text: '单间' },
					{ value: 4, text: '青年公寓' }
				],
				zqlist: [
					{ value: 0, text: '半年' },
					{ value: 1, text: '一年' },
					{ value: 2, text: '协商' }
				],
				mzlist: [
					{ value: 0, text: '半月' },
					{ value: 1, text: '一月' },
					{ value: 2, text: '两月' },
					{ value: 3, text: '协商' },
					{ value: 4, text: '无' },
					{ value: 5, text: '有' },
				],
				czrlist: [
					{ value: 0, text: '业主租' },
					{ value: 1, text: '包租公司租' },
					{ value: 2, text: '其他租' }
				],
				fklist: [
					{ value: 0, text: '押一付三' },
					{ value: 1, text: '押一付一' },
					{ value: 2, text: '押一付二' },
					{ value: 3, text: '押二付一' },
					{ value: 4, text: '年付不押' },
					{ value: 5, text: '半年付不押' },
					{ value: 6, text: '面议' },
					{ value: 7, text: '半年付押一' },
					{ value: 8, text: '年付押一' },
				],
			}
		},
		onLoad(option) {
			let that = this
			if (option.bh == '' || option.bh == null) {
				uni.navigateTo({
					url: "./input"
				})
			}
			getFangyuan(option.bh).then(res => {
					console.log(res, "ssssss");
					// this.id=res.data.id;
					if (res.data.coverfile) {
						let a = res.data.coverfile.split(',')
						for (var i = 0; i < a.length; i++) {
							// this.fileList1.push("url":"url:https://static.tianfucd.com/"+a[i])
							this.fileList1.push({
								url: "https://static.tianfucd.com/" + a[i]
							})
						}
						console.log(this.fileList1, "3333333333333333333");
					}
					res.data.phoneNumber = JSON.parse(res.data.phoneNumber)
					if (res.data.decoration) {
						res.data.decoration = res.data.decoration.toString()
					}
					if (res.data.equityOwnership) {
						res.data.equityOwnership = res.data.equityOwnership.toString()
					}
					that.setData({
						reqData: res.data,
						id: res.data.id

					})
					console.log(this.reqData, "4444");
				})
		},
		onShow() {

		},
		methods: {
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				console.log(lists, "11111");
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					console.log(result, "44444");
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: config.baseUrl + '/common/uploadQiNiu', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							console.log(res, "2222222");
							let b = JSON.parse(res.data).url;
							console.log(b, "33333");
							this.reqData.coverfile = JSON.parse(res.data).fileName
							setTimeout(() => {
								resolve(b)
							}, 1000)
						}
					});
				})
			},
			changerate(e) {
				this.reqData.grade = e.value
				console.log(this.reqData.grade, "4456s");
			},
			/**
			 * 产权日期
			 * @param {Object} e
			 */
			cqrqSelect(e) {
				this.reqData.titleDeedDate = (e.year + '-' + e.month + '-' + e.day)
			},
			initType() {
				// if(this.reqData.type === 1) 
			},
			submit: function(e) {
				// 进行数据校验
				if(e === 1) {
					let status = this.reqData.status;
					this.$refs.houseFrom.validate().then(res=>{
						console.log('表单数据信息：', res);
						this.reqData.status = 4;
						this.save()
					}).catch(err =>{
						this.reqData.status = status;
						console.log('表单错误信息：', err);
					})
				} else {
					this.reqData.status = 3;
					this.save()
				}
			},
			save() {
				this.reqData.phoneNumber = JSON.stringify(this.reqData.phoneNumber)
				updateFangyuan(this.reqData).then(res => {
					uni.showLoading({
						title: '修改成功'
					});
					setTimeout(() => {
						uni.hideLoading();
						uni.navigateBack({
							delta: 1
						});
					}, 500);
				})
			}
		}
	}
</script>
<!-- 1634715624lp9 -->
<style>
	.uni-easyinput {
		margin-right: 5px;
	}

	.uni-forms-item {
		margin-bottom: 12px;
	}

	.uni-forms-item__label {
		font-weight: 700;
	}

	.table_index {
		background-color: #fff;
		height: 100%;
		padding: 20px 30px;
	}

	.uni-button {
		font-size: 18px;
		width: 100%;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.home {
		width: 100%;
		overflow-x: hidden;
		overflow-y: hidden;
	}

	.curetr {
		flex-wrap: wrap !important;
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
</style>
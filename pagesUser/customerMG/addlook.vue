<template>
	<view class="container">
		<tm-menubars title="新增看房" iconColor="white"></tm-menubars>
		<view class="example">
			<!-- 基础表单校验 -->
			<uni-forms label-width="100" ref="valiForm" :rules="rules" :modelValue="valiFormData">
				<uni-forms-item label="标题" required name="title">
					<uni-easyinput v-model="valiFormData.title" placeholder="请输入标题" />
				</uni-forms-item>
				<uni-forms-item label="到访时间" required name="customerReportingTime">
					<uni-datetime-picker type="datetime" v-model="valiFormData.customerReportingTime" />
				</uni-forms-item>
				<uni-forms-item label="到访人数" required name="customerReportingTime">
					<u-number-box v-model="valiFormData.userNum" :min="1" :max="10"></u-number-box>
				</uni-forms-item>

				<uni-forms-item label="看房类型" required name="type">
					<uni-data-select v-model="valiFormData.type" :localdata="tfwlooktypeOptions"></uni-data-select>
				</uni-forms-item>
				<view v-if="valiFormData.type==1" style="font-size: 30rpx;">
					以选中小区
					<view v-for="(item,index) in xqids">
						<view> {{item.title}}
							<button @click="deletechoose(index)" class="cu-btn">删除</button>
						</view>
					</view>
					<!-- 基本用法 -->
					<uni-search-bar v-model=" searchtext" @confirm="search" @input="input" @focus="focus" @blur="blur">
					</uni-search-bar>
					<view @click="xqclick(item)" v-for="(item,index) in fuzzyqueriesbysearchValuedata">
						<button>{{item.title}}</button>
					</view>
				</view>
				<view v-if="valiFormData.type==2">
					<view>
						<housesearch @input="housesInput" type="5"></housesearch>
					</view>
				</view>

				<view v-if="valiFormData.type==3">
					<housesearch @input="housesInput" type="4"></housesearch>
				</view>
				<view style="font-size: 30rpx;">
					陪看人
					<!-- 基本用法 -->
					<uni-search-bar v-model="nickName" @confirm="search1" @input="input1" @focus="focus1" @blur="blur1">
					</uni-search-bar>
					<view v-for="(item,index) in anduserdata">
						<button @click="nicknameclick(item)">{{item.nickName}}</button>
					</view>
					已选中陪看人
					<view v-for="(item,index) in andusers">
						<view> {{item.nickName}}
							<button @click="userdeletechoose(index)" class="cu-btn">删除</button>
						</view>
					</view>
				</view>

				<uni-forms-item label="备注" name="reason">
					<uni-easyinput type="textarea" v-model="valiFormData.reason" placeholder="请输入备注" />
				</uni-forms-item>
				
				<view style="margin: 15rpx;font-size: 30px;">
					<u-button v-if="valiFormData.attachmentLink === null" @click="photo()">拍照</u-button>
					<view v-else>
						<image :src="'https://static.tianfucd.com/'+valiFormData.attachmentLink[0]"></image>
						<u-button @click="photo()">重新拍照</u-button>
					</view>
				</view>
				
			</uni-forms>
			<button type="primary" @click="submit('valiForm')">提交</button>
		</view>

	</view>
</template>

<script>
	import {
		fuzzyqueriesbysearchValue,
		andlistUser,
		addReporting
	} from '@/api/houst.js'
	import UNumberBox from "@/pagesUser/uview-ui/components/u-number-box/u-number-box.vue";
	import housesearch from "./housesearch.vue"
	import uniForms from '@/pagesUser/components/uni-forms/components/uni-forms/uni-forms';
	import uniFormsItem from '@/pagesUser/components/uni-forms/components/uni-forms-item/uni-forms-item';
	import uniSearchBar from '@/pagesUser/components/uni-search-bar/components/uni-search-bar/uni-search-bar.vue';
	import uniDataSelect from '@/pagesUser/components/uni-data-select/components/uni-data-select/uni-data-select.vue';
	import uniEasyinput from "@/pagesUser/components/uni-easyinput/components/uni-easyinput/uni-easyinput.vue";
	import uniDatetimePicker
	from "@/pagesUser/components/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.vue";
	import {
		getDicts
	} from "@/api/system/dict/data";
	export default {
		components: {
			UNumberBox,
			housesearch,
			uniForms,
			uniFormsItem,
			uniSearchBar,
			uniDataSelect,
			uniEasyinput,
			uniDatetimePicker
		},
		data() {
			return {
				andusers: [],
				anduserdata: [],
				searchtext: null,
				nickName: null,
				fuzzyqueriesbysearchValuedata: [],
				xqids: [],
				// 校验表单数据
				valiFormData: {
					title: '',
					customerReportingTime: '',
					userNum: 1,
					reason: '',
					customerId: null,
					type: null,
					xqId: null,
					houseId: null,
					userType: 2,
					attachmentLink: null,
				},
				tfwlooktypeOptions: [],
				// 校验规则
				rules: {
					title: {
						rules: [{
							required: true,
							errorMessage: '标题不能为空'
						}]
					},
					customerReportingTime: {
						rules: [{
							required: true,
							errorMessage: '到访时间不能为空'
						}]
					}
				}

			}
		},
		computed: {

		},
		onLoad(option) {
			if (option.id == '' || option.id == null) {} else {
				this.valiFormData.customerId = option.id
				this.valiFormData.title = this.$store.state.user.userdata.nickName + " " + new Date().toLocaleString() +
					"看房记录"
			}
			getDicts("tfw_look_type").then(response => {
				this.tfwlooktypeOptions = this.dicts(response.data);
			});
		},
		onReady() {
			// 设置自定义表单校验规则，必须在节点渲染完毕后执行
			this.$refs.customForm.setRules(this.customRules)
		},
		methods: {
			housesInput(e) {
				this.valiFormData.houseId = e
			},
			userdeletechoose(index) {
				if (index > -1) {
					this.andusers.splice(index, 1);
				}
			},
			nicknameclick(e) {
				this.andusers.push({
					nickName: e.nickName,
					userId: e.userId
				})
				this.anduserdata = []
			},
			// 失去焦点
			blur1(e) {
				this.nickName = null
			},
			// 获取焦点
			focus1(e) {
				this.anduserdata = []
			},
			//输入
			input1(e) {
				if (e) {
					setTimeout(() => {
						andlistUser({
							nickName: e
						}).then(res => {
							this.anduserdata = res.rows
						})
					}, 500)
				} else {

				}


			},
			//删除
			search1(e) {

			},

			deletechoose(index) {
				if (index > -1) {
					this.xqids.splice(index, 1);
				}
			},
			xqclick(e) {
				this.xqids.push({
					title: e.title,
					id: e.id
				})
			},
			// 失去焦点
			blur(e) {
				this.searchtext = null

			},
			// 获取焦点
			focus(e) {
				this.fuzzyqueriesbysearchValuedata = []

			},
			//输入
			input(e) {
				setTimeout(() => {
					fuzzyqueriesbysearchValue(e).then(res => {
						this.fuzzyqueriesbysearchValuedata = res.rows
					})
				}, 500)

			},
			//删除
			search(e) {
				console.log(e, "删除search按钮");
			},
			dicts(e) {
				let data = []
				e.forEach((item, index) => {
					data.push({
						text: item.dictLabel,
						value: item.dictValue,
					});
				});
				return data
			},
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					if (this.xqids) {
						let ids = this.xqids.map(item => {
							return item.id
						})
						this.valiFormData.xqId = ids.join(',');
					}
					if (this.andusers) {
						let ids = this.andusers.map(item => {
							return item.userId
						})
						this.valiFormData.andUserId = ids.join(',');
					}
					if (this.valiFormData.houseId != null && this.valiFormData.houseId.length > 0) {
						this.valiFormData.houseId = this.valiFormData.houseId.map(item => {
							return item.id
						})
						this.valiFormData.houseId = this.valiFormData.houseId.join(',')
					}
					if(this.valiFormData.attachmentLink != null) {
						this.valiFormData.attachmentLink = JSON.stringify(this.valiFormData.attachmentLink)
					}
					addReporting(this.valiFormData).then(response => {
						if (response.msg == '新增成功') {
							uni.showToast({
								title: response.msg,
							})
							setTimeout(() => {
								this.$tab.navigateBack();
							}, 2000)
						} else {
							uni.showToast({
								title: response.msg,
								icon: 'error',
							})
						}
					})
				}).catch(err => {
					uni.showToast({
						title: err[0].errorMessage,
						icon: 'error',
					})
				})
			},
			photo() {
				let that = this
				uni.navigateTo({
					url: "/pagesTools/pages/camera/watermark/watermark2",
					events: {
						'acceptData': (data) => {
							that.valiFormData.attachmentLink = [data.photoUrl]
						}
					}
				})
			},
		}
	}
</script>
<style lang="scss">
	.example {
		padding: 15px;
		background-color: #fff;
	}

	.segmented-control {
		margin-bottom: 15px;
	}

	.button-group {
		margin-top: 15px;
		display: flex;
		justify-content: space-around;
	}

	.form-item {
		display: flex;
		align-items: center;
	}

	.button {
		display: flex;
		align-items: center;
		height: 35px;
		margin-left: 10px;
	}
</style>
<template>
	<view class="">
		<tm-menubars title="房源跟进" iconColor="white"></tm-menubars>
		<view style="height: 700rpx;">
			<view v-for="(item,index) in list">
				<uni-card v-if="item.type==1" :title="item.way+' — '+item.deptName+'  '+item.createByName" :extra="item.createdAt">
					<text style="color: #00aa00;">{{removePTags(item.remark)}}</text>
				</uni-card>
				<uni-card v-if="item.type==2" :title="'评价 — '+item.deptName+'  '+item.createByName" :extra="item.createdAt">
					<text style="color: #00aa00;">{{removePTags(item.remark)}}</text>
				</uni-card>
			</view>
		</view>
		
		<view class="footer2 flex-center">
			<!-- <button class="btn2 red" @tap="showManage" v-if="hasPerimission(['system:follow:edit'])">管理跟进</button> -->
			<button class="btn3 green" @tap="showAdd">添加跟进</button>
			<button class="btn3 yellow" @tap="showpingjia">添加评价</button>
		</view>
		<!-- 模态框 -->
		<tm-poup v-model="addShow" :height="1000" position="bottom">
			<view class="text-size-lg text-weight-b text-align-center py-30">
				房源跟进
			</view>
			<tm-form @submit="submit" ref="formData" @request="success" method="post">
				<tm-sheet :shadow="24" :padding="[12,24]" :margin="[24,24]">
					<view class="mx-32 my-12 border-b-1  pb-12 flex-col">
						<text class="text-size-n ">跟进方式</text>
						<tm-groupradio name="shiguche" @change="shiguchechange">
							<tm-radio :name="item.title" v-for="(item,index) in shifoushiguche" :key="index"
								v-model="item.checked" :label="item.title"></tm-radio>
						</tm-groupradio>
					</view>
					<tm-input :adjust-position="true" :vertical="true" required :height="150" input-type="textarea"
						bg-color="grey-lighten-5" :maxlength="200" title="跟进内容" placeholder="请输入,不超过200字符"
						v-model="reqData.remark"></tm-input>
					<view class="px-24">
						<tm-button navtie-type="form" theme="bg-gradient-blue-accent" block>提交数据</tm-button>
					</view>
				</tm-sheet>
			</tm-form>
		</tm-poup>


		<tm-poup v-model="addpingjia" :height="1000" position="bottom">
			<view class="text-size-lg text-weight-b text-align-center py-30">
				房源评价
			</view>
			<tm-form @submit="addpingjiafuncation" ref="formData" @request="success" method="post">
				<tm-sheet :shadow="24" :padding="[12,24]" :margin="[24,24]">
					<tm-input :adjust-position="true" :vertical="true" required :height="150" input-type="textarea"
						bg-color="grey-lighten-5" :maxlength="200" title="评价内容" placeholder="请输入,不超过200字符"
						v-model="reqData.remark"></tm-input>
					<view class="px-24">
						<tm-button navtie-type="form" theme="bg-gradient-blue-accent" block>提交数据</tm-button>
					</view>
				</tm-sheet>
			</tm-form>
		</tm-poup>



		<!-- <tm-poup v-model="manageShow" :height="1000" position="bottom">
			<view class="text-size-lg text-weight-b text-align-center py-30">
				跟进管理
			</view>
			<tm-empty v-if="!list"></tm-empty>
			<tm-sheet v-else v-for="(item,index) in list" :key="index">
				<view class="title flex-between">
					{{item.createByName}}
					<text class="time">{{item.createdAt}}</text>
				</view>
				<view class="my-15 type">
					<view v-if="item.type==1" style="font-size: 18px;"> 跟进 :{{item.remark}}</view>
					<view v-if="item.type==2" style="font-size: 18px;"> 评价 :{{item.remark}}</view>
					<text>{{item.deptName}}:{{item.createdAt}}</text>
				</view>
				<view style="margin-top: -50rpx;width: 100%;position: relative;top: -10rpx;left: 560rpx;"
					@click.stop="followId = item.id,ifdel=true">
					<tm-icons size="32" color="red" name="icon-delete-fill"></tm-icons>
				</view>
			</tm-sheet>
		</tm-poup>
		<tm-dialog confirmText="确定删除" cancelText="取消" @confirm="delFollowUp" v-model="ifdel" content="该操作不可逆,是否确认删除!"
			theme="split"></tm-dialog> -->
	</view>
</template>

<script>
	import USteps from "@/pagesHouse/uview-ui/components/u-steps/u-steps.vue";
	import UStepsItem from "@/pagesHouse/uview-ui/components/u-steps-item/u-steps-item.vue";
	import getDateTime from '@/utils/getdateTime.js';
	import tmSheet from '@/pagesHouse/tm-vuetify/components/tm-sheet/tm-sheet.vue'
	import tmPoup from '@/pagesHouse/tm-vuetify/components/tm-poup/tm-poup.vue'
	import tmTimeline from '@/pagesHouse/tm-vuetify/components/tm-timeline/tm-timeline.vue'
	import tmForm from '@/pagesHouse/tm-vuetify/components/tm-form/tm-form.vue'
	import tmInput from '@/pagesHouse/tm-vuetify/components/tm-input/tm-input.vue'
	import tmGroupradio from '@/pagesHouse/tm-vuetify/components/tm-groupradio/tm-groupradio.vue'
	import tmRadio from '@/pagesHouse/tm-vuetify/components/tm-radio/tm-radio.vue'
	import tmButton from '@/pagesHouse/tm-vuetify/components/tm-button/tm-button.vue'
	import tmEmpty from '@/pagesHouse/tm-vuetify/components/tm-empty/tm-empty.vue'
	import tmIcons from '@/pagesHouse/tm-vuetify/components/tm-icons/tm-icons.vue'
	import tmDialog from '@/pagesHouse/tm-vuetify/components/tm-dialog/tm-dialog.vue'
	import {
		getfloower,
		deletefloower,
		addfloower
	} from '@/api/houst.js'
	export default {
		components: {
			UStepsItem,
			USteps,
			tmDialog,
			tmIcons,
			tmSheet,
			tmTimeline,
			tmPoup,
			tmForm,
			tmInput,
			tmGroupradio,
			tmButton,
			tmRadio,
			tmEmpty
		},
		data() {
			return {
				list: [],
				shifoushiguche: [{
						title: "去电",
						checked: null
					},
					{
						title: "来电",
						checked: null
					},
					{
						title: "看房",
						checked: null
					},
					{
						title: "勘察",
						checked: null
					},
					{
						title: "来访",
						checked: null
					},
					{
						title: "拜访",
						checked: null
					},
				],
				siteConfigs: uni.getStorageSync('siteConfigs'),
				reqData: {
					way: "",
					remark: "",
					houseId: 0,
					type: 1
				},
				myFollows: [],
				addShow: false,
				addpingjia: false,
				manageShow: false,
				ifdel: false
			}
		},
		onLoad(option) {
			let that = this
			console.log(option, "9");
			if (option.id == '' || option.id == null) {
			} else {
				this.reqData.houseId = option.id
				getfloower({
					houseId: option.id,
					pageNum: 1,
					pageSize: 100,
				}).then(response => {
					this.list = response.rows;
					console.log(this.list, "getfloower");
				})
			}
		},
		methods: {
			removePTags(html) {
			    return html.trim().replace(/<\/?p>/g, '');
			},
			delFollowUp: function(e) {
				let that = this
				let followId = that.followId
				deletefloower(followId).then(res => {
					// console.log(res, "66666");
					uni.showToast({
						icon: "success",
						title: "成功"
					})
					getfloower({
						houseId: this.reqData.houseId
					}).then(response => {
						this.list = response.rows;
					})
					this.addpingjia = false
				})
			},
			showManage: function(e) {
				this.manageShow = true;
			},
			submit: function(e) {
				let that = this
				let reqData = this.reqData
				console.log(reqData, "5555");
				if(reqData.remark == "") {
					uni.showToast({
						icon: "error",
						title: "请填写跟进内容！"
					})
					return false
				}
				if(reqData.way == "") {
					uni.showToast({
						icon: "error",
						title: "请选择跟进方式！"
					})
					return false
				}
				addfloower(reqData).then(res => {
					uni.showToast({
						icon: "success",
						title: "成功"
					})
					getfloower({
						houseId: this.reqData.houseId
					}).then(response => {
						this.list = response.rows;
						console.log(response, "777");
					})
					this.addShow = false
				})
			},
			shiguchechange: function(e) {
				let that = this
				let reqData = that.reqData
				if (e[0].checked) {
					reqData['way'] = e[0].name
				}
			},
			/**
			 * 添加跟进
			 */
			showAdd: function() {
				this.addShow = true
			},
			//添加评价
			showpingjia() {
				this.addpingjia = true
			},
			//增加评价
			addpingjiafuncation: function(e) {
				let that = this
				let reqData = this.reqData
				reqData.type = 2
				addfloower(reqData).then(res => {
					uni.showToast({
						icon: "success",
						title: "成功"
					})
					getfloower({
						houseId: this.reqData.houseId
					}).then(response => {
						this.list = response.rows;
						console.log(response, "777");
					})
					this.addpingjia = false

				})
			},
			goShare: function(id) {
				uni.navigateTo({
					url: "../../pagesTools/pages/shopShare/shopShare?id=" + id
				})
			},

			change(e) {
				let that = this
				that.setData({
					shopType: this.list[e],
					page: 1,
					houstList: [],
					loadmoreShow: false,
					loadmore: true,
				})
				that.getShopHouseList()
			},
			/**
			 * 获取跟进列表
			 * @param {Object} bh
			 */
			getAgentShopInfo: function(bh, clean) {
				let that = this
				var list = (clean == false) ? that.list : []
				that.$apis.getFollowUp({
					fangBh: bh
				}).then(res => {
					if (res.length == 0) {
						list.push({
							title: '文方天府网',
							content: '该房源暂无任何跟进',
							time: getDateTime.dateTimeStr('y-m-d h:i'),
							color: "green",
							borderColor: 'green',
							icon: '',
							size: 36
						})
					} else {
						for (var i = 0; i < res.length; i++) {
							let gj = {
								title: res[i]['name'] + ' [' + res[i]['type'] + ']',
								content: res[i]['texts'],
								time: res[i]['gjsj'],
								color: "green",
								borderColor: 'green',
								icon: '',
								size: 36
							}
							list.push(gj)
						}
					}
					that.setData({
						list: list
					})
				})
			},
		}
	}
</script>

<style>
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

	.btn2 {
		background-color: rgb(255, 188, 57);
	}

	.btn3 {
		background-color: #27bbb2;
	}

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
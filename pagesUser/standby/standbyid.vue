<template>
	<view>
		<tm-menubars title="备用房源详情" iconColor="white"></tm-menubars>
		<view>
			<view v-if="ifUpdate=='true'">
				<uni-card>
					<view>小区名称</view>
					<view>{{ drawerdata.xqname }}</view>
					<view>业主信息</view>
					<view v-for="(item, index) in drawerdata.phoneNumber" :key="index">
						{{ item.name }}<br>{{ item.value }}
						<tm-button theme="bg-gradient-green-accent" size="l" @click="call(item.value)">拨打电话</tm-button>
					</view>
					<view>房源详情</view>
					<view>{{ drawerdata.building }}栋-{{ drawerdata.unit }}单元-{{ drawerdata.floor }}层-{{ drawerdata.roomNum
                            }}号</view>
					<view>备注</view>
					<view>{{ drawerdata.remarkString }}</view>
					<tm-button theme="bg-gradient-green-accent" size="l"
						@click="Conversiontoofficialpremises(drawerdata.id)">转为正式房源</tm-button>
				</uni-card>
			</view>
			<view>跟进</view>
			<view>
				<tm-button theme="bg-gradient-green-accent" size="l" @tap="showAdd">添加跟进</tm-button>
				<view v-if="followList.length>0">
					<view v-for="(item,index) in followList">
						<uni-card>
							<view>
								{{ item.deptName }}: {{ item.createByName }}
								{{ item.createdAt }}
							</view>
							<view>
								{{item.remark}}
							</view>
						</uni-card>
					</view>
				</view>
				
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
		</view>
	</view>
</template>

<script>
	import tmButton from '@/pagesUser/tm-vuetify/components/tm-button/tm-button';
	import uniCard from "@/pagesUser/components/uni-card/components/uni-card/uni-card.vue";
	import tmPoup from '@/pagesUser/tm-vuetify/components/tm-poup/tm-poup.vue'
	import tmSheet from '@/pagesUser/tm-vuetify/components/tm-sheet/tm-sheet.vue'
	import tmGroupradio from '@/pagesUser/tm-vuetify/components/tm-groupradio/tm-groupradio.vue'
	import tmRadio from '@/pagesUser/tm-vuetify/components/tm-radio/tm-radio.vue'
	import tmForm from '@/pagesUser/tm-vuetify/components/tm-form/tm-form.vue'
	import tmInput from '@/pagesUser/tm-vuetify/components/tm-input/tm-input.vue'

	import {
		getFangyuan,
		getfloower,
		updateFangyuan,
		addfloower
	} from '@/api/houst.js'
	export default {
		components: {
			tmButton,
			uniCard,
			tmPoup,
			tmSheet,
			tmGroupradio,
			tmRadio,
			tmForm,
			tmInput
		},
		data() {
			return {
				ifUpdate: null,
				addShow: false,
				drawerdata: null,
				followList: [],
				total: null,
				// 查询参数
				queryParams: {
					houseId: null,
					type: null,
					createdBy: null,
					updatedBy: null,
					createdAt: null,
					updatedAt: null,
					deletedAt: null,
				},
				houseId: null,
				reqData: {
					remark: "",
					houseId: 0,
					type: 1
				},
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
			}
		},
		methods: {
			submit: function(e) {
				let that = this
				let reqData = this.reqData
				console.log(reqData, "5555");
				addfloower(reqData).then(res => {
					uni.showToast({
						icon: "success",
						title: "成功"
					})
					getfloower({
						houseId: this.reqData.houseId
					}).then(response => {
						this.followList = response.rows;
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
			showAdd() {
				this.reqData={
					remark: "",
					houseId: this.houseId,
					type: 1
				},
				this.addShow = true
			},
			//转为正式房源
			Conversiontoofficialpremises(e) {
				updateFangyuan({
					id: e,
					status: 3,
					propertyType: "",
					featuredTags: "",
					type: "1",
					info: "1",
					params: {
						formal: true,
						status: 3
					}
				}).then(res => {
					this.$modal.msg('转移成功');
				})
			},
			//拨打电话
			call(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				});
			},
			getById(row) {
				getFangyuan(row.id).then(response => {
					this.drawerdata = response.data;
					this.drawerdata.phoneNumber = JSON.parse(this.drawerdata.phoneNumber)
				});
			},
			getfollow(e) {
				console.log(e,"222222222222222222222222222222222222");
				this.queryParams.houseId = e.id
				getfloower(this.queryParams).then(response => {
					this.followList = response.rows;
					console.log(this.followList,"111111111111111111111111111111111111");
				});
			}

		},
		onLoad(e) {
			this.ifUpdate = e.ifUpdate
			this.houseId = e.id
			this.reqData.houseId = this.houseId
			this.getById(e)
			this.getfollow(e)
		}
	}
</script>

<style>
<template>
	<view>
		<tm-menubars title="日报" iconColor="white"></tm-menubars>
		<uni-row>
			<uni-col :span="24" style="margin: 10px;">
				<uni-datetime-picker type="date" v-model="dailyDate" />
			</uni-col>
		</uni-row>
		<uni-row v-for="item in dailyFrom" style="margin-top: 20rpx;">
			<uni-col :span="18" style="margin-bottom: 10px"> <!-- 占据12栅格，即一半宽度 -->
				<div style="font-size: larger; font-weight: bolder;margin-left: 20px">
					{{ item.stencilContent.text }}
				</div>
				<div style="display: flex;margin-top: 10px">
					<!-- <ImagePreview v-if="item.stencilImage1" :coverFile="item.stencilImage1" :height="70" :width="80"
						style="margin-left: 20px;" />
					<ImagePreview v-if="item.stencilImage2" :coverFile="item.stencilImage2" :height="70" :width="80"
						style="margin-left: 20px;" /> -->
				</div>
			</uni-col>
			<uni-col :span="6" style="margin-bottom: 10px"> <!-- 占据12栅格，即一半宽度 -->
			</uni-col>
			<uni-col :span="18" style="margin-bottom: 10px"> <!-- 占据12栅格，即一半宽度 -->
				<div style="font-size: larger; font-weight: bolder;margin-left: 20px;">
					<uni-easyinput v-if="show" type="textarea" v-model="item.text" placeholder="请填写汇报内容"
						:autosize="{ minRows: 5, maxRows: 5}" maxlength="250" autoHeight />
					<uni-card v-else>
						{{item.text}}
					</uni-card>
				</div>
			</uni-col>
			<uni-col :span="6" style="margin-bottom: 10px"> <!-- 占据12栅格，即一半宽度 -->
			</uni-col>
		</uni-row>
		<uni-row>
			<uni-col :span="18">
				<div style="margin-left: 20px;">
					<button class="mini-btn" type="primary" size="mini" v-if="show" v-loading.fullscreen.lock="loading"
						@click="saveDailyContent('submit')">提交</button>
					<button class="mini-btn" type="primary" size="mini" v-if="show" v-loading.fullscreen.lock="loading"
						@click="saveDailyContent('save')">保存</button>
				</div>
			</uni-col>
		</uni-row>
	</view>
</template>

<script>
	import {
		listStencilContentByUser,
		listDaily,
		insertDaily,
		delDaily,
		updateDaily,
		listDailyContent
	} from '@/api/system/daily.js';
	import uniDatetimePicker from "@/pagesTools/components/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.vue";

	export default {
		components: {
			uniDatetimePicker
		},
		data() {
			return {
				//加载
				loading: false,
				dailyLoading: true,
				dailyFromSyn: false,
				dailyTitle: "",
				dailyFrom: [],
				dailyDate: null,
				stencilId: null,
				dailyId: null,
				state: 1,
				show: true,

				//提示信息
				msgType: 'success',
				messageText: '这是一条成功提示',
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			if (options.dailyId != null) {
				this.dailyId = options.dailyId;
				this.state = options.state;
				this.dailyDate = options.date;
				if(this.state === '1') {
					this.loadUpdate()
				} else {
					this.loadContent()
				}
			} else {
				this.loadData()
			}
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
		methods: {
			loadData() {
				this.state = 0;
				this.dailyFrom = []
				this.dailyDate = new Date();
				listStencilContentByUser().then(res => {
					this.loading = false
					if (res.msg === "400") {
						this.msgType = "error"
						this.messageText = `暂未分配日报模板！`
						this.$refs.messages.open()
						return false
					}
					this.stencilId = res.data.id;
					//填写日报格式
					for (let content of res.data.contentList) {
						let remark = JSON.parse(content.remark)
						let value = {
							stencilContent: content,
							stencilImage1: remark.image1,
							stencilImage2: remark.image2,
							stencilContentId: content.id,
							text: '',
							remark: ""
						}
						this.dailyFrom.push(value)
					}
					console.log(this.dailyFrom, '-->dailyFrom')
				})
			},

			loadUpdate() {
				this.loading = true
				listDailyContent({
					id: this.dailyId
				}).then(res => {
					this.dailyFrom = res.rows;
					console.log(this.dailyFrom)
					//填写日报格式
					for (let content of this.dailyFrom) {
						let remark = JSON.parse(content.stencilContent.remark)
						content.stencilImage1 = remark.image1;
						content.stencilImage2 = remark.image2;
						this.stencilId = content.stencilContent.stencilId
					}
					this.loading = false;
					this.dailyTitle = "填写日报";
					this.dailyFromSyn = true;
					this.state = 1;
				})
			},

			loadContent() {
				this.loading = true
				listDailyContent({
					id: this.dailyId
				}).then(res => {
					this.show = false;
					this.dailyFrom = res.rows;
					console.log(this.dailyFrom)
					this.loading = false;
					this.dailyTitle = "查看日报";
					this.dailyFromSyn = true;
				})
			},

			saveDailyContent(model) {
				console.log(this.stencilId)
				this.loading = true
				let massage = '保存成功'
				let state = 1;
				if (model === 'submit') {
					//需校验是否全部填写
					for (let dailyContent of this.dailyFrom) {
						if (dailyContent.text.trim() === '') {
							this.msgType = "error"
							uni.showToast({
								title: '未填写' + dailyContent.stencilContent.text,
								icon: this.msgType,
							})
							this.loading = false;
							return false;
						}
					}
					massage = '提交成功'
					state = 2
				}
				if (this.state === 0) {
					insertDaily({
						date: this.dailyDate,
						stencilId: this.stencilId,
						state: state,
						contentList: this.dailyFrom
					}).then(res => {
						if (res.msg === "400") {
							this.loading = false
							this.dailyFromSyn = false;
							this.msgType = "info"
							uni.showToast({
								title: `今天已有日报，无法重复创建！`,
								icon: this.msgType,
							})
							return false
						}
						this.loading = false
						this.dailyFromSyn = false;
						this.msgType = "success"
						uni.showToast({
							title: massage,
							icon: this.msgType,
						})
						uni.navigateBack()
					})
				} else {
					updateDaily({
						id: this.dailyId,
						state: state,
						contentList: this.dailyFrom
					}).then(res => {
						this.dailyFromSyn = false;
						this.loading = false
						this.msgType = "success"
						uni.showToast({
							title: massage,
							icon: this.msgType,
						})
						uni.navigateBack()
					})
				}
			},
		}
	}
</script>

<style>

</style>
<template>
	<view class="TimeRecode_page">
		<u-navbar title="打卡记录" @rightClick="rightClick" :autoBack="true" placeholder="true" fixed></u-navbar>
		<!-- <u-button type="primary" shape="circle" text="补卡" size="mini" @click="replacement()"></u-button> -->
		<!-- <uni-section title="输入框示例" type="line" padding>
			<view class="dialog-box">
				<text class="dialog-text">输入内容：{{ value }}</text>
			</view>
			<button class="button" type="primary" @click="inputDialogToggle"><text
					class="button-text">补卡</text></button>
		</uni-section> -->
		<!-- <u-button type="primary" shape="circle" text="补卡" size="mini" @click="this.show = true"></u-button> -->
		<u-calendar :show="show" :mode="mode" @confirm="open2" @close="this.show=false"></u-calendar>
		<u-modal :show="show2" :title="title" showCancelButton="true" v-if="any" @confirm="opene4"
			@cancel="this.show2=false">
			<view class="slot-content">
				<rich-text :nodes="content">
				</rich-text>
				<u--input placeholder="请输入内容" border="surround" clearable></u--input>
				<u-picker :show="show3" :columns="columns" @confirm="open3" @cancel="this.show3=false"></u-picker>
			</view>
		</u-modal>
		<u-modal :show="show2" :title="title" showCancelButton="true" @confirm="opene4" @cancel="this.show2=false"
			v-else>
			<view class="slot-content">
				<rich-text :nodes="content">
				</rich-text>
				<u--textarea v-model="beizhu" placeholder="请输入备注" autoHeight></u--textarea>
				<u-picker :show="show3" :columns="columns" @confirm="open3" @cancel="this.show3=false"></u-picker>
			</view>
		</u-modal>

		<view class="list-view">
			<view class="header-search">
				<view class="left">打卡记录</view>
				<!-- <view class="right" @click="open"> -->
				<view class="right" @click="">
					<image class="right-img" src="../..//static/wdkq_B.png"></image>
					<view class="right-date">{{selectDate}}</view>
					<u-icon class="right-more" name="arrow-right"></u-icon>
				</view>
			</view>
			<uni-calendar :insert="false" ref="calendar" :lunar="false" @confirm="confirm"
				:selected="selectedList"></uni-calendar>

			<template>
				<timeline>
					<block v-for="(item, index) in RecordList" :key="index">
						<timelineItem :leftTime="item.date">
							<view class="tripItem">
								<!-- <view class="tips one">机构名称:&nbsp;&nbsp;{{ item.PositionType }}</view> -->
								<!-- <view class="tips">所任职务:&nbsp;&nbsp;xxxxxxx</view> -->
								<view class="" v-if="item.type==1">
									<view class="tips">
										<view>{{item.uname}}</view>
										<view class="">
											签到信息：
										</view>
										<view class="" v-if="item.signInTime">
											<view class="">
												<view class="">
													<dict-tag :options="dict.type.tfw_daka"
														:value="JSON.parse(item.signInRemark).status" />
												</view>
												时间：{{ item.signInTime }} &nbsp;&nbsp
												地点:&nbsp;&nbsp;{{ item.signInLocation }}
											</view>
											<view class="">
												{{JSON.parse(item.signInRemark).type}}
											</view>
										</view>
										<view class="" v-else>
											未签到
										</view>
									</view>
									<view class="tips" v-if="item.signOutTime">
										<view class="">
											签退信息：
										</view>
										<view class="" v-if="item.signOutTime">
											<view class="">
												<view class="">
													<dict-tag :options="dict.type.tfw_daka"
														:value="JSON.parse(item.signOutRemark).status" />
												</view>
												时间：{{ item.signOutTime }} &nbsp;&nbsp
												地点:&nbsp;&nbsp;{{ item.signOutLocation }}
											</view>
											<view class="">
												{{JSON.parse(item.signOutRemark).type}}
											</view>
										</view>
										<view class="" v-else>
											未签退
										</view>
										<view class="" v-if="item.signOutTime&&item.signInRemark">
											今日时长：{{item.totalHours}}
										</view>
									</view>
									<view class="" v-else>
										未签退
									</view>
									<view v-if="item.tfwChocklnOutsides.length > 0">
										<view>外勤次数：{{item.tfwChocklnOutsides.length}}</view>
										<uni-card v-for="outside in item.tfwChocklnOutsides">
											<view>时间：{{outside.outsideTime}} </view>
											<view>地点：{{outside.outsideLocation}} </view>
										</uni-card>
									</view>
								</view>
								<view v-else>
									<view class="tips">
										<view>{{item.uname}}</view>
										<dict-tag :options="dict.type.tfw_qqlx" :value="item.type" />
										<view>时间：{{item.date}}</view>
									</view>
								</view>
							</view>
						</timelineItem>
					</block>
				</timeline>
			</template>
			<!-- <template v-if="RecordList.length === 0 && Loading === true">
				<empty :Today="Today"></empty>
			</template> -->
		</view>
		<u-tabbar :value="value" @change="gotoothen" :fixed="true" :placeholder="true" :safeAreaInsetBottom="true"
			border>
			<u-tabbar-item text="打卡" icon="home"></u-tabbar-item>
			<u-tabbar-item text="打卡记录" icon="photo"></u-tabbar-item>
			<!-- <u-tabbar-item text="设置" icon="play-right"></u-tabbar-item> -->
		</u-tabbar>
	</view>
</template>

<script>
	import UPicker from "@/pagesSignIn/uview-ui/components/u-picker/u-picker.vue";
	import UInput from "@/pagesSignIn/uview-ui/components/u--input/u--input.vue";
	import UModal from "@/pagesSignIn/uview-ui/components/u-modal/u-modal.vue";
	import UCalendar from "@/pagesSignIn/uview-ui/components/u-calendar/u-calendar.vue";
	import UButton from "@/pagesSignIn/uview-ui/components/u-button/u-button.vue";
	import UNavbar from "@/pagesSignIn/uview-ui/components/u-navbar/u-navbar.vue";
	import UIcon from "@/pagesSignIn/uview-ui/components/u-icon/u-icon.vue";
	import UTabbarItem from "@/pagesSignIn/uview-ui/components/u-tabbar-item/u-tabbar-item.vue";
	import UTabbar from "@/pagesSignIn/uview-ui/components/u-tabbar/u-tabbar.vue";
	import uniPopup from '@/pagesSignIn/components/uni-popup/components/uni-popup/uni-popup';
	import empty from './components/empty/empty.vue';
	import timeline from './components/chenbin-timeline/timeLine.vue';
	import timelineItem from './components/chenbin-timeline/timelineItem.vue';
	import uniCalendar from './components/uni-calendar/uni-calendar.vue';

	import {
		addnewcardlist,
		getcardlist,
		addnewclose,
		addnewcardmsg,
		addReplacement
	} from "@/api/houst.js"

	export default {
		dicts: ['tfw_qqlx', 'tfw_daka'],
		components: {
			UPicker,
			UInput,
			UModal,
			UCalendar,
			UButton,
			UNavbar,
			UIcon,
			UTabbarItem,
			UTabbar,
			empty,
			timeline,
			timelineItem,
			uniCalendar,
			uniPopup
		},
		data() {
			return {
				show: false,
				show2: false,
				show3: false,
				any: null,
				columns: [
					['请假', '休假', '年假']
				],
				chocklnTimelist: [],
				beizhu: "",
				title: '请假原因',
				content: `星期六和星期天当两天哦`,
				mode: 'multiple',
				value: 1,
				RecordList: [], //打卡数据
				Loading: false,
				Today: '',
				userInfo: null,
				selectDate: "",
				//这里面是已经打卡的日期，自己从后台得到数据后，赋值给这个属性
				selectedList: [],
			};
		},


		onShow() {
			// 获取当前角色信息
			this.userInfo = this.$store.state.user.userdata
			// 渲染部分打卡信息
			this.GetRecordList();
			//渲染当前角色的打卡数据
			// this.getcardmsg();
		},
		methods: {
			// previewImage(data) {
			// 	uni.previewImage({
			// 		urls: data,
			// 		longPressActions: {
			// 			itemList: [],
			// 			success: function(res) {},
			// 			fail: function(err) {
			// 				console.log(err.errMsg);
			// 			}
			// 		}
			// 	});
			// },

			//打卡框
			inputDialogToggle() {
				this.$refs.inputDialog.open()
			},
			//补卡
			replacement() {
				addReplacement().then(res => {

				})
			},
			rightClick() {
				console.log('rightClick');
			},
			gotoothen(name) {
				console.log(name);
				this.value = name;
				if (name === 0) {
					uni.redirectTo({
						url: "./signIn"
					})
				} else if (name === 2) {
					uni.redirectTo({
						url: "./set"
					})
				}
			},
			//打开日历
			open() {
				this.$refs.calendar.open();
				getcardlist().then(res => {
					this.selectedList = res.rows
				})
			},

			//选择请假日期
			open2(e) {
				this.chocklnTimelist = e
				var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
				this.any = e.some((item, index, array) => {
					return weekDay[new Date(item).getDay()] == "星期天" || weekDay[new Date(item).getDay()] == "星期六";
				});
				this.show2 = true
				this.show3 = true
			},
			open3(e) {
				this.show3 = false
				this.type = e.indexs[0]
			},
			opene4() {
				addnewclose({
					chocklnTimelist: this.chocklnTimelist,
					type: this.type,
					remark: this.beizhu
				}).then(res => {
					if (res.code == 200) {
						uni.showLoading({
							title: '请假成功'
						});
						setTimeout(() => {
							this.show = false
							this.show2 = false
							uni.hideLoading();
						}, 1000);
					}
				})
			},

			//选择时间确认
			confirm(e) {
				this.GetRecordList(e.fulldate);
				console.log(e.fulldate, "1");
			},
			//格式化今天时间
			dateFormat(fmt) {
				let date = new Date();
				let ret;
				const opt = {
					'Y+': date.getFullYear().toString(), // 年
					'm+': (date.getMonth() + 1).toString(), // 月
					'd+': date.getDate().toString(), // 日
					'H+': date.getHours().toString(), // 时
					'M+': date.getMinutes().toString(), // 分
					'S+': date.getSeconds().toString() // 秒
				};
				for (let k in opt) {
					ret = new RegExp('(' + k + ')').exec(fmt);
					if (ret) {
						fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
					}
				}
				return fmt;
			},
			//获取打卡数据
			getcardmsg() {
				addnewcardmsg().then(res => {
					console.log(res, "当前数据");
				})
			},
			//获取数据
			GetRecordList(keycodes) {
				var The_Day = "";
				if (keycodes === undefined) {
					The_Day = keycodes || this.dateFormat('YYYY-mm');
				} else {
					The_Day = keycodes.substring(0, 7);
				}
				this.selectDate = The_Day;
				console.log(The_Day, "2");
				uni.showLoading({
					title: '加载中',
					duration: 2000,
				});
				addnewcardlist({
					userId: this.userInfo.userId,
					// chocklnTime: The_Day,
					// remark: 2
				}).then(res => {
					console.log(res, "44444444444444444");
					this.RecordList = res.rows;
					// if (res.success === true) {
					// 	if (this.RecordList.length !== 0) {
					// 		this.RecordList.forEach(item => {
					// 			if (item.PositionType == 1) {
					// 				item.PositionType = '出差办公';
					// 			} else {
					// 				item.PositionType = '公司办公';
					// 			}
					// 		});
					// 	} else {
					// 		if (keycodes === undefined || keycodes === '') {
					// 			this.Today = '今天暂无打卡记录';
					// 		} else {
					// 			this.Today = `暂无${keycodes}数据`;
					// 		}
					// 	}
					// 	setTimeout(() => {
					// 		this.Loading = true;
					// 		uni.hideLoading();
					// 	}, 500);
					// } else {
					// 	this.Loading = false;
					// 	uni.showToast({
					// 		title: '获取数据失败',
					// 		duration: 2000,
					// 		icon: 'none'
					// 	});
					// }
				});
			}
		}
	};
</script>

<style lang="scss">
	.TimeRecode_page {
		width: 100%;
		display: flex;
		flex-direction: column;

		.header {
			width: 100%;
			height: 330rpx;
			padding: 30rpx;

			.header-card {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 100%;
				background-color: #FFF;
				border-radius: 15rpx;

				.card-item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 210rpx;
					height: 200rpx;
					margin: 15rpx;

					&.circle {
						border: 4px solid #638EFF;
						border-radius: 50%;
					}

					.top {
						font-size: 39rpx;
						color: red;
					}

					.bottom {
						font-size: 24rpx;
						color: #666666;
						font-weight: 600;
					}
				}
			}
		}

		.list-view {
			display: flex;
			flex-direction: column;
			flex: 1;
			width: 100%;
			height: 100%;
			background-color: #fff;

			.header-search {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				height: 88rpx;
				border-bottom: 1px solid #ececec;
				margin-bottom: 8rpx;

				.left {
					width: 200rpx;
					font-size: 34rpx;
					margin-left: 30rpx;
				}

				.right {

					display: flex;
					flex-direction: row;
					justify-content: right;
					align-items: center;
					width: 250rpx;
					padding: 20rpx 0;

					.right-img {
						width: 37rpx;
						height: 37rpx;
						margin: 0 19rpx;
					}

					.right-date {
						font-size: 27rpx;
						color: #3677f7;
					}

					.right-more {
						color: #3677f7;
						margin-left: 20rpx;
						font-size: 34rpx
					}
				}
			}

			.tripItem {
				flex: 1;
				padding: 0rpx 10rpx;
				padding-bottom: 10rpx;
				box-sizing: border-box;
				//background: rgba(255, 255, 255, 1);
				//box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
				//border-radius: 10px;
				//margin-bottom: 30rpx;
				border-bottom: 1px solid #ececec;
				padding-bottom: 30rpx;

				.title {
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #666;
				}

				.tips {
					font-size: 26rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666;
					margin-top: 10rpx;

					&.one {
						margin-top: -5rpx;
					}
				}
			}
		}



		.Photo {
			padding-top: 20rpx;
			display: flex;
			align-items: center;

			.Photo_item {
				padding-right: 10rpx;

				image {
					width: 130rpx;
					height: 120rpx;
					border: 1px solid #ececec;
					padding: 3rpx;
				}
			}
		}
	}
</style>
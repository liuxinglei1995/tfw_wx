<template>
	<page-meta :page-style="'overflow:'+(show?'hidden':'visible')"></page-meta>
	<view>
		<view style="height: 1350rpx;overflow-y: auto;">
			<uni-card v-for="(item, index) in viewList" :key="index">
				<div class="browse-tags">
					<div class="browse-tags-left">
						<div v-for="item2 in item.tfwSourceTourists">
							<uni-tag v-if="item2.nickName != null" :mark="true"
								:text="'by'+nickNameParts(item2.nickName)" type="primary" size="mini" />
						</div>
						<uni-tag v-if="item.sysUser.remark" :text="item.sysUser.remark" />
					</div>
					<div class="browse-region" v-if="item.params">
						{{item.params.phoneRegionCode}}
					</div>
				</div>
				<view class="browse-body">
					<view class="browse-cell browse-phone"
						@click="callPhone(item)">
						<div v-if="item.phonenumber">
							<div v-if="item.tfwSourceTourists && item.tfwSourceTourists.length> 0">
								{{ phoneNumberParts(item.sysUser.phonenumber)}}
							</div>
							<div v-else>
								{{item.sysUser.phonenumber}}
							</div>
							<div v-if="item.tfwSourceTourists && item.tfwSourceTourists.length > 0">
								<div v-for="item1 in item.tfwSourceTourists">
									<div v-for="item2 in JSON.parse(item1.customer) ">
										{{item2.name}}
									</div>
								</div>
							</div>
						</div>
						<div v-else>
							未授权用户
						</div>
						<div>
							<span v-for="(item3, index) in item.queryType">
								<span v-if="index> 0"> / </span>
								<span v-if="item3 === '1'" style="color: red">买</span>
								<span v-else>租</span>
							</span>
						</div>
					</view>
					<view class="browse-cell browse-stat">
						<span>{{ format(item.viewTime, 'yyyy-MM-dd') }}</span>
						<span>{{ item.userViews.length }} / {{item.total}} 套</span>
					</view>
					<view
						class="browse-actions">
						<u-button size="mini" type="primary" @click="showFollow(item)">跟进</u-button>
						<u-button size="mini" type="primary" :plain="true" @click="showDetail(item)">看详情</u-button>
						<u-button size="mini" type="warning" :plain="true" @click="addCustomer(item)">领私客</u-button>
					</view>
				</view>
			</uni-card>
		</view>
		<view style=" position: fixed;width: 100%;">
			<uni-pagination title="标题文字" show-icon="true" :total="total" :pageSize="queryData.pageSize"
				:current="queryData.pageNum" @change="change"></uni-pagination>
		</view>

		<uni-popup ref="popup" type="center" background-color="#fff" @change="popChange">
			<view class="popup-content">
				<view class="popup-header">
					<text class="popup-title">浏览明细</text>
					<view class="popup-close" @click="closePopup('popup')">✕</view>
				</view>
				<view class="popup-body">
					<uni-card v-for="item in viewData">
						<view :class="[{'background-red': item.type == 1}, {'background-blue': item.type != 1}]"
							style="display: flex;align-content: center;color: #fff;">
							<view
								style="display: flex;flex-direction: column;align-items: center;margin-left: 2rpx; width: 200rpx;">
								<div>
									{{ item.tfwHouse.xqname}}
								</div>
								<div>
									{{item.tfwHouse.building}}-*-{{item.tfwHouse.floor}}-*
								</div>
							</view>
							<view class="browse-cell browse-stat">
								<uni-tag v-if="item.tfwLoupanHuxing.bedRoomNum" size="small"
									:text="item.tfwLoupanHuxing.bedRoomNum+'室'+item.tfwLoupanHuxing.livingRoomNum+'厅'+item.tfwLoupanHuxing.bathroomNum+'卫'"
									type="primary" />
								<uni-tag v-else text="未知" type="primary" size="small"></uni-tag>
								<span v-if="item.type === '1' && item.tfwHouse.sellingPrice > 0">
									{{item.tfwHouse.sellingPrice}}万
								</span>
								<span v-else>
									{{item.tfwHouse.rental}}元
								</span>
							</view>
							<view style="display: flex;flex-direction: column;align-items: center;">
								<span>{{ format(item.viewTime, 'yyyy-MM-dd') }}</span>
							</view>
						</view>
					</uni-card>
				</view>
				<view class="popup-footer">
					<uni-pagination show-icon="true" :total="viewQuery.total" :pageSize="viewQuery.pageSize"
						:current="viewQuery.pageNum" @change="changeView"></uni-pagination>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="popup2" type="center" background-color="#fff" @change="popChange">
			<view class="popup-content">
				<view class="popup-header">
					<text class="popup-title">沟通记录</text>
					<view class="popup-header-right">
						<u-button size="mini" type="primary" @click="showAddRemark()">添加沟通</u-button>
						<view class="popup-close" @click="closePopup('popup2')">✕</view>
					</view>
				</view>
				<view class="popup-body">
					<!-- 用原生 view 代替 uni-table，避免把 172KB 的表格组件打进 pagesUser 分包 -->
					<view class="remark-table">
						<view class="remark-row remark-row--head">
							<text class="remark-cell-name">沟通人</text>
							<text class="remark-cell-text">沟通内容</text>
						</view>
						<view class="remark-row" v-for="(item, index) in remarkList" :key="index">
							<view class="remark-cell-name">
								<text>{{item.user.nickName}}</text>
								<text class="remark-date">{{ format(item.interactDate, 'yyyy-MM-dd')}}</text>
							</view>
							<view class="remark-cell-text">{{item.interact}}</view>
						</view>
						<view v-if="remarkList.length === 0" class="remark-empty">暂无更多数据</view>
					</view>
				</view>
				<view class="popup-footer">
					<uni-pagination show-icon="true" :total="remarkQuery.total" :pageSize="remarkQuery.pageSize"
						:current="remarkQuery.pageNum" @change="changeView"></uni-pagination>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="popup3" type="center" background-color="#fff" @change="popChange">
			<view class="popup-content" style="width: 600rpx; height: 560rpx;">
				<view class="popup-header">
					<text class="popup-title">添加沟通</text>
					<view class="popup-close" @click="closePopup('popup3')">✕</view>
				</view>
				<view class="popup-body">
					<uni-easyinput type="textarea" v-model="from.interact" placeholder="请输入内容"></uni-easyinput>
					<u-button size="mini" type="primary" @click="submitForm">确定</u-button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		wxListViews,
		listPhoneData,
		addViewsRemark,
		listViewsRemark
	} from '@/api/user_browse.js';
	import {
		nickNameParts,
		format,
		phoneNumberParts
	} from '@/utils/util.js';
	// 这些组件都在 pagesUser/components 下，不在 uni_modules 里，easycom 扫不到，必须显式注册。
	// 注意：组件「内部」用到的子组件（如 uni-popup 模板里的 uni-transition）必须写在那个组件
	// 自己的 script 里，在这里注册对它无效——模板作用域不同。
	import uniCard from "@/pagesUser/components/uni-card/components/uni-card/uni-card.vue";
	import uniTag from "@/pagesUser/components/uni-tag/components/uni-tag/uni-tag.vue";
	import uniPopup from "@/pagesUser/components/uni-popup/components/uni-popup/uni-popup.vue";
	import uniPagination from "@/pagesUser/components/uni-pagination/components/uni-pagination/uni-pagination.vue";
	import uniEasyinput from "@/pagesUser/components/uni-easyinput/components/uni-easyinput/uni-easyinput.vue";
	export default {
		components: {
			uniCard,
			uniTag,
			uniPopup,
			uniPagination,
			uniEasyinput
		},
		data() {
			return {
				show: false,
				total: 20,
				queryData: {
					pageNum: 1,
					pageSize: 10,
				},
				viewList: [],
				houseViews: [],
				viewQuery: {
					pageNum: 1,
					pageSize: 10,
					total: 0,
					userId: null,
					phonenumber: ''
				},
				viewData: [],
				from: {
					useUserId: null,
					interact: null,
				},
				remarkQuery: {
					pageNum: 1,
					pageSize: 10,
					total: 0,
					useUserId: null
				},
				remarkList: []
			}
		},
		onLoad() {
			if (this.$store.state.user.userdata.userid != 116)
				this.queryData.cityCode = this.$store.state.user.userdata.dept.cityCode
			this.getList();
		},
		methods: {
			nickNameParts,
			format,
			phoneNumberParts,
			getList() {
				uni.showLoading({
					title: "数据加载中..."
				})
				wxListViews(this.queryData).then(res => {
					this.viewList = res.rows;
					console.log(this.viewList)
					this.total = res.total
					uni.hideLoading()
				})
			},
			change(e) {
				this.queryData.pageNum = e.current
				this.getList();
			},
			// 关闭指定弹窗
			closePopup(ref) {
				if (this.$refs[ref]) this.$refs[ref].close()
			},
			showFollow(item) {
				const tourists = item.tfwSourceTourists || []
				const myId = this.$store.state.user.userdata.userId
				// 注意：这里必须用 find/for...of 取元素，for...in 拿到的是下标，tourist.userId 恒为 undefined
				const mine = tourists.find(tourist => tourist.userId == myId)
				if (mine) {
					this.$tab.navigateTo("/pagesUser/customerMG/details/details?id=" + item.userId);
					return
				}
				// 没有跳转时一律打开跟进弹窗
				this.from.useUserId = item.userId;
				this.remarkQuery.useUserId = item.userId
				this.getRemarks();
				this.$refs.popup2.open()
			},
			showDetail(row) {
				this.viewQuery.phonenumber = row.phonenumber;
				this.viewQuery.userId = row.userId;
				this.viewQuery.pageNum = 1;
				this.getViews()
			},
			getViews() {
				this.$refs.popup.open()
				uni.showLoading({
					title: "数据加载中..."
				})
				listPhoneData(this.viewQuery).then(res => {
					uni.hideLoading();
					this.viewData = res.rows;
					this.viewQuery.total = res.total
				});
			},
			changeView(e) {
				this.viewQuery.pageNum = e.current
				this.getViews();
			},
			popChange(e) {
				this.show = e.show
			},
			callPhone(item) {
				console.log(item, 'item')
				if (item.tfwSourceTourists != null && item.tfwSourceTourists.length > 0) return false
				uni.makePhoneCall({
					phoneNumber: item.sysUser.phonenumber //仅为示例
				});
			},
			//沟通
			changeRemark(e) {
				this.remarkQuery.pageNum = e.current
				this.getViews();
			},
			getRemarks() {
				uni.showLoading({
					title: '数据加载中...'
				})
				listViewsRemark(this.remarkQuery).then(res => {
					this.remarkList = res.rows
					this.remarkQuery.total = res.total
					uni.hideLoading()
				});
			},
			showAddRemark() {
				this.$refs.popup3.open()
			},
			submitForm() {
				console.log(this.from, 'from')
				addViewsRemark(this.from).then(res => {
					this.$modal.msgSuccess("添加沟通成功");
					this.$refs.popup3.close();
					this.getRemarks();
				})
			},
			addCustomer(item) {
				this.$tab.navigateTo("/pagesUser/customerMG/adddetails/adddetails?phonenumber=" + item.phonenumber +
					"&type=2");
			}
		}
	}
</script>

<style>
	/* 居中弹窗：屏幕正中，四周留白 */
	.popup-content {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		width: 660rpx;
		height: 80vh;
		margin: 0;
		padding: 0;
		border-radius: 16rpx;
		overflow: hidden;
		background-color: #fff;
	}

	/* 弹窗头部：标题 + 关闭按钮 */
	.popup-header {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		height: 96rpx;
		padding: 0 24rpx;
		border-bottom: 1rpx solid #F0F2F5;
	}

	.popup-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
	}

	.popup-header-right {
		display: flex;
		align-items: center;
	}

	.popup-close {
		width: 60rpx;
		height: 60rpx;
		line-height: 60rpx;
		margin-left: 16rpx;
		text-align: center;
		font-size: 36rpx;
		color: #999999;
	}

	/* 弹窗内容区：占满剩余高度，内部滚动 */
	.popup-body {
		flex: 1;
		box-sizing: border-box;
		padding: 24rpx;
		overflow-y: auto;
	}

	/* 弹窗底部分页：回归文档流，不再用 position: fixed */
	.popup-footer {
		flex-shrink: 0;
		box-sizing: border-box;
		padding: 16rpx 24rpx 24rpx;
		border-top: 1rpx solid #F0F2F5;
	}

	.background-red {
		background-color: #ff8e94;
	}

	.background-blue {
		background-color: #abc4ff;
	}
	/* ===== 浏览历史列表 ===== */
	.browse-tags {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 18rpx;
		border-bottom: 1rpx solid #F0F2F5;
	}

	.browse-tags-left {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		flex: 1;
		overflow: hidden;
	}

	.browse-tags-left > div,
	.browse-tags-left > uni-tag {
		margin-right: 10rpx;
		margin-bottom: 6rpx;
	}

	/* 地区码：淡蓝小胶囊 */
	.browse-region {
		flex-shrink: 0;
		margin-left: 16rpx;
		padding: 4rpx 16rpx;
		border-radius: 22rpx;
		background-color: #F0F7FF;
		font-size: 22rpx;
		color: #3C9CFF;
	}

	.browse-body {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 22rpx;
	}

	/* ===== 沟通记录表（替代 uni-table） ===== */
	.remark-table {
		width: 100%;
	}

	.remark-row {
		display: flex;
		align-items: flex-start;
		padding: 18rpx 0;
		border-bottom: 1rpx solid #F0F2F5;
	}

	.remark-row--head {
		padding: 16rpx 0;
		background-color: #FAFAFA;
	}

	.remark-row--head .remark-cell-name,
	.remark-row--head .remark-cell-text {
		font-weight: bold;
		color: #333333;
	}

	.remark-cell-name {
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		width: 220rpx;
		font-size: 26rpx;
		color: #606266;
	}

	.remark-date {
		margin-top: 6rpx;
		font-size: 22rpx;
		color: #999999;
	}

	.remark-cell-text {
		flex: 1;
		font-size: 26rpx;
		color: #333333;
		word-break: break-all;
	}

	.remark-empty {
		padding: 40rpx 0;
		text-align: center;
		font-size: 26rpx;
		color: #999999;
	}

	/* 三列统一纵向居中 */
	.browse-cell {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* 手机号：主信息，加大加粗 */
	.browse-phone {
		width: 260rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #1A1A1A;
		line-height: 42rpx;
	}

	/* 买 / 租：弱化 */
	.browse-phone > div:last-child {
		margin-top: 6rpx;
		font-size: 24rpx;
		font-weight: normal;
		color: #909399;
	}

	/* 日期 / 套数：弱化 */
	.browse-stat {
		width: 160rpx;
		font-size: 24rpx;
		color: #909399;
		line-height: 38rpx;
	}

	.browse-stat > span:first-child {
		color: #606266;
	}

	.browse-actions {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-evenly;
		width: 150rpx;
		height: 150rpx;
	}
</style>
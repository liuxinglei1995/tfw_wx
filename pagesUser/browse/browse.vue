<template>
	<page-meta :page-style="'overflow:'+(show?'hidden':'visible')"></page-meta>
	<view>
		<view style="height: 1350rpx;overflow-y: auto;">
			<uni-card v-for="item in viewList">
				<div style="display: flex;justify-content: space-between;">
					<div style="display: flex;">
						<div v-for="item2 in item.tfwSourceTourists">
							<uni-tag v-if="item2.nickName != null" :mark="true"
								:text="'by'+nickNameParts(item2.nickName)" type="primary" size="mini" />
						</div>
						<uni-tag v-if="item.sysUser.remark" :text="item.sysUser.remark" />
					</div>
					<div v-if="item.params">
						{{item.params.phoneRegionCode}}
					</div>
				</div>
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view style="display: flex;flex-direction: column;align-items: center; width: 250rpx;"
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
					<view style="display: flex;flex-direction: column;align-items: center;width: 150rpx;">
						<span>{{ format(item.viewTime, 'yyyy-MM-dd') }}</span>
						<span>{{ item.userViews.length }} / {{item.total}} 套</span>
					</view>
					<view
						style="display: flex;align-items: center; flex-direction: column;justify-content: space-evenly;width: 130rpx;height: 130rpx;">
						<u-button size="mini" @click="showFollow(item)">跟进</u-button>
						<u-button size="mini" @click="showDetail(item)">看详情</u-button>
						<u-button size="mini" @click="addCustomer(item)">领私客</u-button>
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
				<view style="overflow-y: auto;height: 90%;">
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
							<view style="display: flex;flex-direction: column;align-items: center;width: 150rpx;">
								<uni-tag v-if="item.tfwLoupanHuxing.bedRoomNum"
									:text="item.tfwLoupanHuxing.bedRoomNum+'室'+item.tfwLoupanHuxing.livingRoomNum+'厅'+item.tfwLoupanHuxing.bathroomNum+'卫'"
									type="primary" />
								<uni-tag v-else text="未知" type="primary"></uni-tag>
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
				<view style=" position: fixed; width: 80%;">
					<uni-pagination show-icon="true" :total="viewQuery.total" :pageSize="viewQuery.pageSize"
						:current="viewQuery.pageNum" @change="changeView"></uni-pagination>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="popup2" type="center" background-color="#fff" @change="popChange">
			<view class="popup-content">
				<u-button size="mini" @click="showAddRemark()">添加沟通</u-button>
				<view style="overflow-y: auto;height: 90%;">
					<uni-table ref="table" :loading="loading" border stripe emptyText="暂无更多数据"
						@selection-change="selectionChange">
						<uni-tr>
							<uni-th width="150" align="center">沟通人</uni-th>
							<uni-th align="center">沟通内容</uni-th>
						</uni-tr>
						<uni-tr v-for="item in remarkList">
							<uni-th width="150" align="center">
								<view>
									<span>{{item.user.nickName}}</span>
									<span>{{ format(item.interactDate, 'yyyy-MM-dd')}}</span>
								</view>
							</uni-th>
							<uni-th align="center">{{item.interact}}</uni-th>
						</uni-tr>
					</uni-table>
				</view>
				<view style=" position: fixed; width: 80%;">
					<uni-pagination show-icon="true" :total="remarkQuery.total" :pageSize="remarkQuery.pageSize"
						:current="remarkQuery.pageNum" @change="changeView"></uni-pagination>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="popup3" type="center" background-color="#fff" @change="popChange">
			<view class="popup-content" style="width: 500rpx; height: 400rpx;">
				<uni-easyinput type="textarea" v-model="from.interact" placeholder="请输入内容"></uni-easyinput>
				<u-button size="mini" @click="submitForm">确定</u-button>
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
	export default {
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
			showFollow(item) {
				if (item.tfwSourceTourists != null && item.tfwSourceTourists.length > 0) {
					for (let tourist in item.tfwSourceTourists) {
						if (tourist.userId == this.$store.state.user.userdata.userId) {
							console.log('跳转到新页面')
							this.$tab.navigateTo("/pagesUser/customerMG/details/details?id=" + item.userId);
							return false
						}
					}
				} else {
					console.log(item, 'item')
					this.from.useUserId = item.userId;
					this.remarkQuery.useUserId = item.userId
					this.getRemarks();
					this.$refs.popup2.open()
				}
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
	.popup-content {
		align-items: center;
		justify-content: center;
		padding: 15px;
		height: 50px;
		background-color: #fff;
		width: 600rpx;
		height: 900rpx;
	}

	.background-red {
		background-color: #ff8e94;
	}

	.background-blue {
		background-color: #abc4ff;
	}
</style>
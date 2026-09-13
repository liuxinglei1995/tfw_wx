<template>
	<view>
		<tm-menubars title="代办任务"></tm-menubars>
		<view>
			<uni-card v-for="(item,index) in tastList">
				<view>{{item.instanceName}}</view>
				<view>{{item.name}}</view>
				<view>{{item.status}}</view>
				<view>{{item.createdDate}}</view>
				<view
					style="color: white;background-color: rgba(76,175,80,1); border-radius: 8px;width: 80rpx;padding: 10rpx;"
					@click="$tab.navigateTo('/pagesUser/task/examineAndApprove/examineAndApprove?data='+JSON.stringify(item));">
					待审批</view>
			</uni-card>
			<tm-pagination @change="change" color="green" :page.sync="queryParams.pageNum" :total="total"
				:totalVisible="5" :size="queryParams.pageSize">
			</tm-pagination>
		</view>
	</view>
</template>

<script>
	import {
		listTask
	} from '@/api/houst.js'
	import uniCard from "@/pagesUser/components/uni-card/components/uni-card/uni-card.vue";
	import tmPagination from '@/pagesUser/tm-vuetify/components/tm-pagination/tm-pagination';
	export default {
		components: {
			uniCard,
			tmPagination
		},
		data() {
			return {
				queryParams: {
					pageNum: 1,
					pageSize: 5,
				},
				tastList: [],
				total: null
			}
		},

		onLoad() {
			this.getlistTask();
			uni.$on('refreshData', () => {
				this.getlistTask();
			})
		},
		methods: {
			change(e) {
				this.queryParams.pageNum = e
				this.getlistTask()
			},
			getlistTask() {
				uni.showLoading({
					title: '加载中…',
					icon: "loading",
				})
				listTask(this.queryParams).then(response => {
					this.isLastPage = response.lastPage
					this.tastList = response.rows
					this.total = response.total;
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>

</style>
<template>
	<view class="content">
		<tm-menubars title="楼盘录入" iconColor="white"></tm-menubars>
		<ourLoading :active="loadingShow" text="加载中..." />
		<tm-search v-model="query.searchValue" prefixIcon="" @confirm="communitySearch()" placeholder="请输入小区关键词"
			suffixIcon="icon-search"></tm-search>
		<tm-sheet v-for="(item,index) in communitys" :key="index" class="icommunityItem" @tap="select(item)">
			<view>
				{{item.title}}
			</view>
		</tm-sheet>
		<u-loadmore :status="status" />
	</view>
</template>

<script>
import ULoadmore from "@/pagesUser/uview-ui/components/u-loadmore/u-loadmore.vue";
	import tmSearch from '@/pagesUser/tm-vuetify/components/tm-search/tm-search.vue';
	import tmSheet from '@/pagesUser/tm-vuetify/components/tm-sheet/tm-sheet.vue';
	import {
		getxiaoqulist
	} from '@/api/houst.js'
	export default {
		components: {
      ULoadmore,
			tmSearch,
			tmSheet
		},
		data() {
			return {
				query: {
					searchValue: null,
					area: null,
					pageNum: 1
				},
				loadingShow: true,
				isLastPage: null,
				communitys: [],
				status: 'loadmore',
			}
		},
		onLoad() {
			let that = this
			that.communitySearch()
		},
		onReachBottom() {
			let that = this
			this.query.pageNum++;
			this.status = 'loading';
			setTimeout(() => {
				getxiaoqulist(this.query).then(res => {
					console.log(res, "7777");
					this.isLastPage = res.rows.length;
					this.loadingShow = false
					this.communitys = this.communitys.concat(res.rows)
					if (this.isLastPage == 0) this.status = 'nomore';
					else this.status = 'loadmore';
				})
			}, 2000)
		},
		methods: {
			/**
			 * 搜索
			 */
			communitySearch: function() {
				console.log(this.query.searchValue, "444");
				let that = this
				that.setData({
					loadingShow: true,
				})
				if (this.query.searchValue) {
					this.query.pageNum = 1,
						this.communitys = []
				}
				getxiaoqulist(this.query).then(res => {
					console.log(res, "7777");
					this.isLastPage = res.rows.length;
					this.loadingShow = false
					this.communitys = this.communitys.concat(res.rows)
					if (this.isLastPage == 0) this.status = 'nomore';
					else this.status = 'loadmore';
				})
			},
			select: function(index) {
				console.log(index, "444");
				uni.navigateTo({ //返回
					url: './input?info=' + encodeURIComponent(JSON.stringify(index))
				})
			}
		}
	}
</script>

<style></style>

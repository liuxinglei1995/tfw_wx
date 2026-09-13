<template>
	<view class="">
		<tm-menubars title="审核中房源" iconColor="white" ></tm-menubars>
		<tm-empty v-if="houstList.length == 0" class="pt-n20" label="暂无审核中房源"></tm-empty>
		<home-list v-if="houstList.length > 0" :key="page" :titShow="false" v-bind:homeListItem="houstList" :homeFeuer="homeRENT"></home-list>
	</view>
</template>

<script>
	import tmEmpty from '@/tm-vuetify/components/tm-empty/tm-empty.vue';
	import homeList from "@/components/home-list/home-list.vue";
	export default {
		components: {
			tmEmpty,homeList
		},
		data() {
			return {
				page:1,
				loadmoreShow:false,
				loadmore:true,
				houstList: [],
				homeRENT: [{title01: "",title02: "",more:"",img: ""}],
			}
		},
		onLoad() {
			this.myShopHouseList()
		},
		methods: {
			myShopHouseList : function(){
				let that = this
				that.$apis.myShopHouseList({
					zt:1,
					page:that.page,
				}).then(res => {
					if (res != null) {
						if (that.page == 1) {
							that.setData({
								houstList: res,
								loadmoreShow:false
							});
						} else {
							var messageList = that.houstList;
							for (var i = 0; i < res.length; i++) {
								messageList.push(res[i]);
							}
							that.setData({
								houstList: messageList,
								loadmoreShow:false
							});
						}
						if (res.length < 10) {
							that.setData({
								loadmore: false
							});
						}
					} else {
						that.setData({
							houstList: []
						});
					}
				})
			}
		}
	}
</script>

<style>
</style>

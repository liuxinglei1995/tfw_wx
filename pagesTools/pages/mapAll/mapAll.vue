<template>
	<view>
		<tm-menubars title="城市选择" iconColor="white" ></tm-menubars>
		<chose-city @selectCity="selectCity" v-if="showCity" @closeModal="closeModal"></chose-city>
	</view>
</template>

<script>
	var app = getApp();
	import choseCity from "@/pagesTools/components/choseCity/choseCity"
	export default {
		components: {
			choseCity,
		},
		data() {
			return {
				showCity:true,
				type: 0,
			}
		},
		onLoad: function(e) {
			if(e.type === '1') {
				this.type = e.type
			} else {
				this.type = 0
			}
		},
		methods: { 
			selectCity(item) {
				var city = item.name;
				if (city !== null) {} 
				var pages = getCurrentPages();
				var currPage = pages[pages.length - 1];
				if (item.citycode != null) {
					if(this.type === '1') {
						uni.setStorageSync('innerCityCode',item.citycode)
						uni.setStorageSync('innerCity',item.name)
					} else{
						app.globalData.city_area = item.citycode;
						uni.setStorageSync('city',item.name)
						uni.setStorageSync('cityCode',item.citycode)
						uni.setStorageSync('cityDistrict',item.name+"市")
						var history = uni.getStorageSync('areaChooseHis')
						var historyAll = [] ;
						if(history == null || history == ''){
							historyAll.unshift(item)
							uni.setStorageSync('areaChooseHis',historyAll)
						}else{
							history.forEach(function(itemHis,index){
								if(index < 20 && itemHis.name == item.name) history.splice(index,1)
								else if(index > 20) history.splice(index,1)
							})
							history.unshift(item)
							uni.setStorageSync('areaChooseHis',history)
						}
					}
				}
				uni.navigateBack();
			},
			closeModal() {
				this.showCity = false
			},
		}
	}
</script>


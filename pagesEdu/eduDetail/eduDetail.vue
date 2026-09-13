<template>
	<view>
		<tm-menubars title="详情" iconColor="white" ></tm-menubars>
		<view class="mt-n21">
			<tm-empty label="升级中,暂不开放"></tm-empty>
		</view>
	</view>
</template>

<script>
	import tmEmpty from '@/tm-vuetify/components/tm-empty/tm-empty.vue';
	
	export default {
		components : {tmEmpty},
	}
</script>

<style>
</style>

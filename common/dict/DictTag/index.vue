<template>
	<div>
		<template v-for="(item, index) in options">
			<template v-if="values.includes(item.value)">
				<span :key="item.value" :index="index" :class="classshow">{{ item.label }}</span>
			</template>
		</template>
	</div>
</template>

<script>
	export default {
		name: "DictTag",
		props: {
			options: {
				type: Array,
				default: null,
			},
			value: [Number, String, Array],
			classshow: [String],
		},
		computed: {
			values() {
				if (this.value !== null && typeof this.value !== 'undefined') {
					return Array.isArray(this.value) ? this.value : [String(this.value)];
				} else {
					return [];
				}
			},
		},
	};
</script>
<style scoped>
	.num1 {
		border: 1px solid #149CEA;
		color: #149CEA;
		background-color: white;
		margin-right: 10rpx;
	}

	.num2 {
		color: #FF7F12;
		font-weight: bold;
		font-size: 37rpx;
	}

	.el-tag+.el-tag {
		margin-left: 10px;
	}
</style>
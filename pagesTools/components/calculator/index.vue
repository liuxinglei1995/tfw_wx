<template>
	<view class="container">
		<view class="container-page" :style="{'backgroundColor': bgcColor}">
			<tm-tabs v-model="tabIndex" color="light-green" :list="tabs" range-key="name" @change="tabChange"></tm-tabs>
			<view class="">
				<view v-if="tabIndex === 0">
					<business @submit='submit' ref="business"></business>
				</view>
				<view v-if="tabIndex === 1">
					<accumulation @submit='submit'  ref="accumulation"></accumulation>
				</view>
				<view v-if="tabIndex === 2">
					<group @submit='submit'  ref="group"></group>
				</view>
			</view>
			<view class="btn">
				<button class="reset" @tap="reset">重置</button>
				<button class="save" @tap="save" :style="{'backgroundColor': btnColor}">确认</button>
			</view>
		</view>
	</view>
</template>

<script>
	import business from '@/pagesTools/components/calculator/business.vue'
	import accumulation from '@/pagesTools/components/calculator/accumulation.vue'
	import group from '@/pagesTools/components/calculator/group.vue'
	import tmTabs from '@/pagesTools/tm-vuetify/components/tm-tabs/tm-tabs.vue';
	export default {
		components: {
			business,
			accumulation,
			group,
			tmTabs
		},
		props: {
			bgcColor: {
				type: String,
				default: '#8CC5FF'
			},
			btnColor: {
				type: String,
				default: '#409EFF'
			},
			activeColor: {
				type: String,
				default: '#53A8FF'
			}
		},
		data() {
			return {
				list: [
					'商业贷款',
					'公积金贷款',
					'组合贷款'
				],
				tabIndex: 0,
				tabs: [{
						name: '商业贷款'
					},
					{
						name: '公积金贷款'
					},
					{
						name: '组合贷款'
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			tabChange() {

			},
			submit(obj, type) {
				this.$emit('submit', obj, type)
			},
			save() {
				let that = this
				if (that.tabIndex === 0) {
					that.$refs.business.submit()
					return
				}
				if (that.tabIndex === 1) {
					that.$refs.accumulation.submit()
					return
				}
				if (that.tabIndex === 2) {
					that.$refs.group.submit()
					return
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container-page {
		height: 100vh;

		.header-group {
			display: flex;
			border-top-right-radius: 15rpx;
			border-top-left-radius: 15rpx;

			.group {
				width: 34%;
				height: 100rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}

	.right-bottom {
		border-radius: 0 15rpx 0 0;
	}

	.left-bottom {
		border-radius: 15rpx 0 0 0;
	}

	.center-left-bottom {
		border-radius: 15rpx 15rpx 0 0;
	}

	.center-right-bottom {
		border-radius: 15rpx 15rpx 0 0;
	}

	.btn {
		margin-top: 50rpx;
		display: flex;

		.reset {
			width: 40%;
			border-radius: 50rpx;
		}

		.save {
			width: 40%;
			border-radius: 50rpx;
			color: #FFFFFF;

			&::after {
				border: none !important;
			}
		}
	}
</style>

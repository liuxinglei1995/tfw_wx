<template>
	<div class="hm-cover-card" :class="index?'active':''">
		<div class="box" :style="'background-color: '+options.backgroundColor">
			<view class="circle"></view>
			<view class="body">
				<view class="title ">
					{{ options.title }}
				</view>
				<view class="title_en">
					{{ options.title_en }}
				</view>
			</view>
			<view class="line-12"></view>
			<view class="line-100"></view>
			<view class="dis">
				<view v-for="(item,index) in options.dis" class="dis-item" :key="index">
					{{ item }}
				</view>
			</view>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'HmCoverCard',
		props: {
			dataId: {
				type: String,
				default: 'hm-cover-card'
			},
			inits: {
				type: Boolean,
				default: false
			},
			index: {
				type: Boolean,
				default: false
			},
			idx: {
				type: Number,
				default: 0
			},
			options: {
				type: Object,
				default: function() {
					return {
						entryPic: './images/img_25361_0_1.png',
						title: 'loading...',
						text: 'loading...',
						shoucang: './images/img_25361_0_0.png'
					};
				}
			}
		},
		data() {
			return {
				zan: false
			};
		},
		methods: {
			async dianzan() {
				this.zan = this.zan ? false : true;
				this.$emit('click', {
					zan: this.zan,
					idx: this.idx
				});
				let res = this.$api.sentenceZan({
					id: this.options.id
				})
			}
		}
	};
</script>
<style>
	@import './index.response.css';
</style>

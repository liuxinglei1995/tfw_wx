<template>
	<view class="msg-page">
		<view v-if="loading" class="msg-center">
			<text>加载中...</text>
		</view>
		<view v-else-if="!login" class="msg-center">
			<view class="msg-nologin-text">登录后查看会话消息</view>
			<button size="mini" type="primary" @tap="goLogin">去登录</button>
		</view>
		<view v-else-if="!sessions.length" class="msg-center">
			<text>暂无会话</text>
		</view>
		<view v-else class="msg-list">
			<view class="msg-item" v-for="s in sessions" :key="s.sessionId" @tap="openChat(s)">
				<view class="msg-avatar">{{ (s.otherNickName || '?').charAt(0) }}</view>
				<view class="msg-main">
					<view class="msg-name">{{ s.otherNickName || '联系人' }}</view>
					<view class="msg-content">{{ s.content || '' }}</view>
				</view>
				<view class="msg-side">
					<view class="msg-time">{{ fmtTime(s.createTime) }}</view>
					<view v-if="s.unreadCount > 0" class="msg-badge">{{ s.unreadCount > 99 ? '99+' : s.unreadCount }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getChatSessions
	} from '@/api/chat'

	export default {
		data() {
			return {
				loading: false,
				login: false,
				sessions: []
			}
		},
		onShow() {
			this.loadSessions()
		},
		onPullDownRefresh() {
			this.loadSessions(() => {
				uni.stopPullDownRefresh()
			})
		},
		methods: {
			loadSessions(done) {
				const userdata = this.$store.state.user.userdata || {}
				this.login = !!userdata.userId
				if (!this.login) {
					this.loading = false
					done && done()
					return
				}
				this.loading = true
				getChatSessions().then(res => {
					this.sessions = res.data || []
				}).catch(() => {
					this.sessions = []
				}).finally(() => {
					this.loading = false
					done && done()
				})
			},
			openChat(s) {
				uni.navigateTo({
					url: '/pagesHouse/chat/chat?brokerId=' + s.otherId + '&brokerName=' +
						encodeURIComponent(s.otherNickName || '')
				})
			},
			goLogin() {
				uni.navigateTo({
					url: '/pagesUser/login/login'
				})
			},
			fmtTime(t) {
				if (!t) return ''
				let d = new Date(t)
				if (isNaN(d.getTime())) return ''
				const pad = (n) => (n < 10 ? '0' + n : '' + n)
				const now = new Date()
				const today = now.getDate() === d.getDate() && now.getMonth() === d.getMonth()
				return today ? pad(d.getHours()) + ':' + pad(d.getMinutes()) :
					pad(d.getMonth() + 1) + '-' + pad(d.getDate())
			}
		}
	}
</script>

<style>
	.msg-page {
		min-height: 100vh;
		background: #f5f6f7;
	}

	.msg-center {
		padding: 200rpx 0;
		text-align: center;
		color: #999;
		font-size: 28rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.msg-nologin-text {
		margin-bottom: 24rpx;
	}

	.msg-list {
		background: #fff;
	}

	.msg-item {
		display: flex;
		align-items: center;
		padding: 24rpx 30rpx;
		border-bottom: 1rpx solid #f0f0f0;
	}

	.msg-avatar {
		width: 88rpx;
		height: 88rpx;
		border-radius: 50%;
		background: #409eff;
		color: #fff;
		font-size: 36rpx;
		text-align: center;
		line-height: 88rpx;
		flex-shrink: 0;
	}

	.msg-main {
		flex: 1;
		margin-left: 20rpx;
		overflow: hidden;
	}

	.msg-name {
		font-size: 30rpx;
		color: #333;
		font-weight: 500;
	}

	.msg-content {
		font-size: 26rpx;
		color: #999;
		margin-top: 8rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.msg-side {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		flex-shrink: 0;
		margin-left: 16rpx;
	}

	.msg-time {
		font-size: 22rpx;
		color: #bbb;
	}

	.msg-badge {
		margin-top: 10rpx;
		min-width: 32rpx;
		height: 32rpx;
		line-height: 32rpx;
		border-radius: 16rpx;
		background: #fa3534;
		color: #fff;
		font-size: 20rpx;
		text-align: center;
		padding: 0 8rpx;
		box-sizing: border-box;
	}
</style>

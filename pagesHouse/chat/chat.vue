<template>
	<view class="chat-page">
		<!-- 顶部经纪人信息 -->
		<view class="chat-header">
			<text class="broker-name">{{ brokerName || '经纪人' }}</text>
		</view>

		<!-- 消息列表 -->
		<scroll-view class="chat-body" scroll-y :scroll-into-view="scrollIntoView" scroll-with-animation>
			<view class="msg-list">
				<view v-for="(msg, index) in messageList" :key="msg.id || index"
					:class="['msg-item', msg.fromUserId === myUserId ? 'msg-right' : 'msg-left']"
					:id="'msg-' + index">
					<view class="msg-time">{{ formatTime(msg.createTime) }}</view>
					<!-- 房源信息卡片 -->
					<view v-if="msg.msgType === 2" class="house-card">
						<view class="house-tag">{{ (msg.house && msg.house.tradeType) || '房源' }}</view>
						<view class="house-title">{{ (msg.house && msg.house.title) || '房源信息' }}</view>
						<view class="house-sub" v-if="msg.house && (msg.house.huxing || msg.house.area)">
							{{ msg.house.huxing }} {{ msg.house.area }}
						</view>
						<view class="house-price" v-if="msg.house && msg.house.price">{{ msg.house.price }}</view>
					</view>
					<!-- 普通文本 -->
					<view v-else class="msg-bubble">{{ msg.content }}</view>
				</view>
			</view>
		</scroll-view>

		<!-- 底部输入区 -->
		<view class="chat-footer">
			<input class="chat-input" v-model="inputText" placeholder="请输入消息..." confirm-type="send"
				@confirm="sendMessage" />
			<button class="send-btn" size="mini" type="primary" @tap="sendMessage">发送</button>
		</view>
	</view>
</template>

<script>
	import config from '@/config'
	import { getChatHistory, markChatRead } from '@/api/chat'

	export default {
		data() {
			return {
				brokerId: '',
				brokerName: '',
				myUserId: '',
				messageList: [],
				inputText: '',
				socketTask: null,
				scrollIntoView: '',
				// 房源信息(从房源详情页带入)，进入聊天时作为第一条消息发送
				houseInfo: null,
				houseSent: false
			}
		},
		onLoad(option) {
			this.brokerId = option.brokerId || ''
			this.brokerName = option.brokerName ? decodeURIComponent(option.brokerName) : ''
			this.myUserId = this.$store.state.user.userdata ? this.$store.state.user.userdata.userId : ''
			if (option.houseInfo) {
				try {
					this.houseInfo = JSON.parse(decodeURIComponent(option.houseInfo))
				} catch (e) {
					this.houseInfo = null
				}
			}
			// 拉取历史
			this.loadHistory()
			// 标记已读
			if (this.brokerId) {
				markChatRead(this.brokerId)
			}
			// 连接WebSocket
			this.connectSocket()
		},
		onUnload() {
			if (this.socketTask) {
				this.socketTask.close({
					code: 1000,
					success: () => {
						console.log('聊天连接已关闭')
					}
				})
			}
		},
		methods: {
			// 统一处理消息(房源卡片 content 为 JSON，解析出 house 供渲染)
			normalizeMsg(msg) {
				if (msg && msg.msgType === 2 && !msg.house) {
					try {
						msg.house = JSON.parse(msg.content)
					} catch (e) {
						msg.house = { title: msg.content }
					}
				}
				return msg
			},
			// 拉取历史消息
			loadHistory() {
				if (!this.brokerId) return
				getChatHistory(this.brokerId).then(res => {
					this.messageList = (res.data || []).map(m => this.normalizeMsg(m))
					this.scrollToBottom()
				}).catch(() => {
					console.log('拉取历史失败')
				})
			},
			// 连接WebSocket
			connectSocket() {
				if (!this.myUserId) {
					console.log('未获取到用户ID，无法连接聊天')
					return
				}
				const wsUrl = config.baseUrl.replace('http://', 'ws://').replace('https://', 'wss://') +
					'/websocket/chat?userId=' + this.myUserId
				this.socketTask = uni.connectSocket({
					url: wsUrl,
					success: () => {
						console.log('WebSocket连接成功')
					},
					fail: (err) => {
						console.log('WebSocket连接失败', err)
					}
				})
				this.socketTask.onOpen(() => {
					console.log('WebSocket已打开')
					// 连接建立后，发送房源信息卡片(每次进入只发一次)
					if (this.houseInfo && !this.houseSent) {
						this.sendHouseInfo()
					}
				})
				this.socketTask.onMessage((res) => {
					try {
						const data = JSON.parse(res.data)
						if (data.type === 'unread') {
							return
						}
						this.messageList.push(this.normalizeMsg(data))
						this.scrollToBottom()
					} catch (e) {
						console.log('解析消息失败', e)
					}
				})
				this.socketTask.onClose(() => {
					console.log('WebSocket已关闭')
				})
				this.socketTask.onError((err) => {
					console.log('WebSocket错误', err)
				})
			},
			// 发送房源信息卡片(msgType=2)
			sendHouseInfo() {
				if (!this.socketTask || !this.houseInfo) return
				const content = JSON.stringify(this.houseInfo)
				this.socketTask.send({
					data: JSON.stringify({
						toUserId: Number(this.brokerId),
						content: content,
						msgType: 2
					}),
					success: () => {
						this.houseSent = true
					}
				})
				// 本地立即展示
				this.messageList.push(this.normalizeMsg({
					fromUserId: Number(this.myUserId),
					toUserId: Number(this.brokerId),
					content: content,
					msgType: 2,
					createTime: new Date().toISOString()
				}))
				this.scrollToBottom()
			},
			// 发送普通文本消息
			sendMessage() {
				const content = this.inputText.trim()
				if (!content) return
				if (!this.brokerId || !this.myUserId) {
					uni.showToast({
						icon: 'none',
						title: '无法发送消息'
					})
					return
				}
				const msg = {
					toUserId: Number(this.brokerId),
					content: content,
					msgType: 0
				}
				if (this.socketTask) {
					this.socketTask.send({
						data: JSON.stringify(msg),
						success: () => {
							// 本地追加自己的消息
							this.messageList.push({
								fromUserId: Number(this.myUserId),
								toUserId: Number(this.brokerId),
								content: content,
								msgType: 0,
								createTime: new Date().toISOString()
							})
							this.scrollToBottom()
						}
					})
				}
				this.inputText = ''
			},
			// 滚动到底部
			scrollToBottom() {
				this.$nextTick(() => {
					this.scrollIntoView = 'msg-' + (this.messageList.length - 1)
				})
			},
			// 格式化时间
			formatTime(time) {
				if (!time) return ''
				const d = new Date(time)
				if (isNaN(d.getTime())) return ''
				const pad = (n) => (n < 10 ? '0' + n : '' + n)
				return pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d
					.getMinutes())
			}
		}
	}
</script>

<style>
	.chat-page {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background: #f5f5f5;
	}

	.chat-header {
		padding: 20rpx 30rpx;
		background: #fff;
		border-bottom: 1px solid #eee;
	}

	.broker-name {
		font-size: 32rpx;
		font-weight: 600;
	}

	.chat-body {
		flex: 1;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		overflow-y: auto;
	}

	.msg-item {
		display: flex;
		flex-direction: column;
		margin-bottom: 24rpx;
	}

	.msg-right {
		align-items: flex-end;
	}

	.msg-left {
		align-items: flex-start;
	}

	.msg-time {
		font-size: 22rpx;
		color: #999;
		margin-bottom: 8rpx;
	}

	.msg-bubble {
		max-width: 70%;
		padding: 16rpx 24rpx;
		border-radius: 12rpx;
		font-size: 28rpx;
		line-height: 1.5;
		word-break: break-all;
	}

	.msg-right .msg-bubble {
		background: #409eff;
		color: #fff;
	}

	.msg-left .msg-bubble {
		background: #fff;
		color: #333;
	}

	/* 房源信息卡片 */
	.house-card {
		max-width: 70%;
		background: #fff;
		border-radius: 12rpx;
		padding: 20rpx 24rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.06);
	}

	.msg-right .house-card {
		background: #eaf3ff;
	}

	.house-tag {
		display: inline-block;
		font-size: 20rpx;
		color: #fff;
		background: #409eff;
		border-radius: 6rpx;
		padding: 2rpx 12rpx;
		margin-bottom: 12rpx;
	}

	.house-title {
		font-size: 30rpx;
		font-weight: 600;
		color: #333;
	}

	.house-sub {
		font-size: 24rpx;
		color: #888;
		margin-top: 8rpx;
	}

	.house-price {
		font-size: 30rpx;
		color: #fa3534;
		font-weight: 700;
		margin-top: 10rpx;
	}

	.chat-footer {
		display: flex;
		align-items: center;
		padding: 16rpx 30rpx;
		background: #fff;
		border-top: 1px solid #eee;
	}

	.chat-input {
		flex: 1;
		height: 72rpx;
		background: #f0f0f0;
		border-radius: 36rpx;
		padding: 0 24rpx;
		font-size: 28rpx;
	}

	.send-btn {
		margin-left: 16rpx;
	}
</style>

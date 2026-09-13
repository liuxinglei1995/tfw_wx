import request from '@/utils/request'

// 获取与指定用户的聊天历史
export function getChatHistory(otherId) {
	return request({
		url: '/chat/history/' + otherId,
		method: 'get'
	})
}

// 标记与指定用户的会话为已读
export function markChatRead(otherId) {
	return request({
		url: '/chat/markRead/' + otherId,
		method: 'get'
	})
}

// 查询未读消息数
export function getUnreadCount() {
	return request({
		url: '/chat/unread',
		method: 'get'
	})
}

// 获取会话列表(消息tab)
export function getChatSessions() {
	return request({
		url: '/chat/sessions',
		method: 'get'
	})
}

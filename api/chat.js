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

// 底部 tabBar 中"消息"的位置（0 首页 / 1 税费计算 / 2 消息）
const MSG_TAB_INDEX = 2

/**
 * 按会话列表刷新"消息"tab 角标，显示有未读消息的人数
 * @param {Array} sessions 会话列表，每项含 unreadCount
 */
export function updateMsgTabBadge(sessions) {
	const count = (sessions || []).filter(s => s.unreadCount > 0).length
	if (count > 0) {
		uni.setTabBarBadge({
			index: MSG_TAB_INDEX,
			text: count > 99 ? '99+' : String(count),
			fail: () => {}
		})
	} else {
		uni.removeTabBarBadge({
			index: MSG_TAB_INDEX,
			fail: () => {}
		})
	}
}

/**
 * 主动拉取会话列表刷新角标（供 App 启动/切回前台时调用，未登录会被 request 拦截）
 */
export function refreshMsgTabBadge() {
	return getChatSessions().then(res => {
		updateMsgTabBadge(res.data || [])
	}).catch(() => {})
}

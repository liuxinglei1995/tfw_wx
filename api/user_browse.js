import upload from '@/utils/upload'
import request from '@/utils/request'
// 查询人员浏览房源信息
export function wxListViews(query) {
	return request({
		url: '/views/views/list',
		method: 'get',
		params: query
	})
}

// 查询用户浏览历史列表
export function listPhoneData(query) {
  return request({
    url: '/views/views/listPhoneData',
    method: 'get',
    params: query
  })
}

// 查询用户浏览历史列表
export function listViewsRemark(query) {
  return request({
    url: '/views/viewsRemark/list',
    method: 'get',
    params: query
  })
}
// 新增用户浏览历史
export function addViewsRemark(data) {
  return request({
    url: '/views/viewsRemark',
    method: 'post',
    data: data
  })
}

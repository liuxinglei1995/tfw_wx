import upload from '@/utils/upload'
import request from '@/utils/request'

// 查询日报模板列表
export function listStencilContentByUser(query) {
  return request({
    url: '/stencil/role/byUser',
    method: 'get',
    params: query
  })
}

// 查询日报列表
export function listDaily(query) {
  return request({
    url: '/daily/list',
    method: 'get',
    params: query
  })
}

// 新增日报
export function insertDaily(data) {
  return request({
    url: '/daily',
    method: 'post',
    data: data
  })
}

// 删除日报
export function delDaily(id) {
  return request({
    url: '/daily/' + id,
    method: 'delete'
  })
}

//修改日报
export function updateDaily(data) {
  return request({
    url: '/daily',
    method: 'put',
    data: data
  })
}

// 查询日报内容
export function listDailyContent(query) {
  return request({
    url: '/daily/content/list',
    method: 'get',
    params: query
  })
}
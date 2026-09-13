import request from '@/utils/request'

// 查询房源列表
export function listFangyuan(query) {
	return request({
		url: '/fangyuan/fangyuan/list',
		method: 'get',
		params: query
	})
}
//降价房源列表
export function pricerEductionHouseByAreaCode(query) {
	console.log("进入查询")
	return request({
		url: '/fangyuan/fangyuan/house/pricerEductionHouseByAreaCode',
		method: 'post',
		params: query
	})
}

// 查询房源是否存在
export function ifFangYuan(query) {
	return request({
		url: '/fangyuan/fangyuan/ifFangYuan',
		method: 'get',
		params: query
	})
}
// 查询税费计算
export function getHouseTaxes(query) {
	return request({
		url: '/fangyuan/fangyuan/getHouseTaxes',
		method: 'get',
		params: query
	})
}
// 查询小区列表
export function getxiaoqulist(query) {
	return request({
		url: '/tfw/lpxq/getTitle',
		method: 'post',
		params: query
	})
}

// 查询租房中心列表
export function wxIndexList(query) {
	return request({
		url: '/fangyuan/fangyuan/wxIndexList',
		method: 'get',
		params: query
	})
}
//查询楼盘详情
export function getlpxq(id) {
	return request({
		url: '/tfw/lpxq/' + id,
		method: 'get',
	})
}
// 新增楼盘小区
export function addLpxq(data) {
	return request({
		url: '/tfw/lpxq',
		method: 'post',
		data: data
	})
}
// 获得省市区
export function getlist(dept) {
	return request({
		url: '/reception/user/list',
		method: 'get',
		params: {
			dept: dept
		}

	})
}
//新楼盘列表
export function newloupan(query) {
	return request({
		url: '/tfw/lpxq/list',
		method: 'get',
		params: query
	})
}
//新首页新房楼盘接口
export function wxnewlp(query) {
	return request({
		url: '/tfw/lpxq/wxList',
		method: 'get',
		params: query
	})
}
//查询轮播图照片
export function swiperimglist(query) {
	return request({
		url: '/banners/banners/list',
		method: 'get',
		params: query
	})
}
// 查询楼盘相册列表
export function listLoupanxiangce(query) {
	return request({
		url: '/loupanxiangce/loupanxiangce/list',
		method: 'get',
		params: query
	})
}
//查询城市列表
export function getcitylist(query) {
	return request({
		url: '/reception/user/getCityJson',
		method: 'get',
		params: query
	})
}
//新房楼盘
export function getnewloupan(query) {
	return request({
		url: '/tfw/lpxq/wxLpList',
		method: 'get',
		params: query
	})
}
//房源相册列表
export function getfanyuanphotos(query) {
	return request({
		url: '/housephotos/photos/list',
		method: 'get',
		params: query
	})
}
//户型列表
export function gethuxing(id) {
	return request({
		url: '/huxing/huxing/' + id,
		method: 'get',
	})
}
//获取省市区
export function test(id, type) {
	return request({
		url: '/reception/user/getSearch/' + id + '/' + type,
		method: 'get',
	})
}
//查询房源跟踪
export function getfloower(query) {
	return request({
		url: '/system/follow/list',
		method: 'get',
		params: query
	})
}
export function getmydianpu(ids) {
	return request({
		url: '/system/user/getBrokerData?userId=' + ids,
		method: 'get',
	})
}

//删除房源跟踪
export function deletefloower(ids) {
	return request({
		url: '/system/follow/delete/' + ids,
		method: 'post',
	})
}
//新增房源跟踪
export function addfloower(data) {
	return request({
		url: '/system/follow',
		method: 'post',
		data: data
	})
}
// 查询房源详细
export function getFangyuan(id,usertype, shareUserId, houseType) {
	let data = {
		ifwx: usertype,
		shareUserId: shareUserId,
		houseType: houseType
	}
	return request({
		url: '/fangyuan/fangyuan/' + id,
		method: 'post',
		params: data
	})
}
// 查询房源经纪人列表
export function getUserHouse(query) {
	return request({
		url: '/fangyuan/fangyuan/getUserHouse',
		method: 'get',
		params: query
	})
}
//模糊查询   搜索房源
export function gethouseTitle(query) {
	return request({
		url: '/fangyuan/fangyuan/house/searchValue',
		method: 'post',
		params: query
	})
}
// 新增房源
export function addFangyuan(query) {
	return request({
		url: '/fangyuan/fangyuan',
		method: 'post',
		data: query
	})
}
//修改房源
export function updateFangyuan(data) {
	return request({
		url: '/fangyuan/fangyuan',
		method: 'put',
		data: data
	})
}
// 新增委托
export function addMandate(query) {
	return request({
		url: '/mandate/mandate',
		method: 'post',
		data: query
	})
}
// 新增委托
export function addWtmai(query) {
	return request({
		url: '/wtmai/wtmai',
		method: 'post',
		data: query
	})
}
// 新增预约
export function addreservation(query) {
	return request({
		url: '/reservation/reservation',
		method: 'post',
		data: query
	})
}
// 查询合同列表
export function listContract(query) {
	return request({
		url: '/contract/contract/wxList',
		method: 'get',
		params: query
	})
}
//查询合同流程
export function listContractProcess(query) {
  return request({
    url: '/contract/contract_process/list',
    method: 'get',
    params: query
  })
}
export function wxContract(query) {
	return request({
		url: '/contract/contract/wxContract',
		method: 'get',
		params: query
	})
}

// 确认合同
// export function contractValidate(query) {
// 	return request({
// 		url: '/contract/contract/wxContractValidate',
// 		method: 'post',
// 		data: query
// 	})
// }
export function contractValidate(data) {
	return request({
		'url': '/contract/contract/wxContractValidate',
		'method': 'post',
		data: data
	})
}


// 删除房源
export function delFangyuan(id) {
	return request({
		url: '/fangyuan/fangyuan/' + id,
		method: 'delete'
	})
}

// 删除房源
export function delMyFangyuan(id) {
	return request({
		url: '/fangyuan/fangyuan/my/' + id,
		method: 'delete'
	})
}
// 模糊查询
export function fuzzyqueries(searchValue) {
	return request({
		url: '/tfw/lpxq/getXQ/' + searchValue,
		method: 'post'
	})
}
//户型数据
export function listHuxing(query) {
	return request({
		url: '/huxing/huxing/list',
		method: 'get',
		params: query
	})
}
//新增打卡记录
export function addnewcard(query) {
	return request({
		url: '/chockln/chockln',
		method: 'post',
		data: query
	})
}
//新增外勤打卡记录
export function addChocklnOutside(query) {
	return request({
		url: '/chockln/chocklnOutside',
		method: 'post',
		data: query
	})
}

//新增请假
export function addnewclose(query) {
	return request({
		url: '/chockln/chockln/addLeave',
		method: 'post',
		data: query
	})
}
//获取打卡记录
export function addnewcardlist(query) {
	return request({
		url: '/chockln/chockln/list',
		method: 'get',
		param: query
	})
}
//获取打卡数据
export function addnewcardmsg(query) {
	return request({
		url: '/chockln/chockln/list',
		method: 'get',
		param: query
	})
}

//上传打卡照片
export function getphotos(path) {
	return request({
		url: '/common/uploadMinio',
		method: 'post',
		path: path
	})
}
//获取考勤记录
export function getcardlist(query) {
	return request({
		url: '/chockln/chockln/moonList',
		method: 'get',
		param: query
	})
}
// 获取预约列表
export function reservationlist(query) {
	return request({
		url: '/reservation/reservation/wxlist',
		method: 'get',
		params: query
	})
}

// 调价记录
export function pricelist(query) {
	return request({
		url: '/price/price/wxList',
		method: 'get',
		params: query
	})
}
// 新增          客源
export function addTourists(data) {
	return request({
		url: '/tourists/tourists',
		method: 'post',
		data: data
	})
}
//私客列表
export function guestList(query) {
	return request({
		url: '/tourists/tourists/guestList',
		method: 'get',
		params: query
	})
}
// 查询客源列表
export function listTourists(query) {
  return request({
    url: '/tourists/tourists/list',
    method: 'get',
    params: query
  })
}
// 查询客源详细
export function getTourists(eId) {
	return request({
		url: '/tourists/tourists/' + eId,
		method: 'get'
	})
}
// 查询客源跟进列表
export function listFollow(query) {
	return request({
		url: '/source/follow/list',
		method: 'get',
		params: query
	})
}
// 新增客源跟进
export function addFollow(data) {
	return request({
		url: '/source/follow',
		method: 'post',
		data: data
	})
}
// 查询带看接口
export function lookafter(query) {
	return request({
		url: '/reporting/reporting/listAll',
		method: 'get',
		params: query
	})
}
// 确认带看接口
export function confirmLook(query) {
	return request({
		url: '/reporting/reporting/confirmLook',
		method: 'get',
		params: query
	})
}
// 查询带看详细
export function getReporting(id) {
	return request({
		url: '/reporting/reporting/' + id,
		method: 'get'
	})
}
// 查询带看详细跟进autoid
export function getInfoByAutoId(autoId) {
	return request({
		url: '/reporting/reporting/getInfoByAutoId/' + autoId,
		method: 'get'
	})
}
//流程图内的数据
export function historyFromData(instanceId) {
	return request({
		url: '/historyFromData/ByInstanceId/' + instanceId,
		method: 'get'
	})
}
// 模糊查询
export function fuzzyqueriesbysearchValue(searchValue) {
	return request({
		url: '/tfw/lpxq/getTitle?pageNum=1&searchValue=' + searchValue,
		method: 'post'
	})
}

// 查询用户列表
export function andlistUser(query) {
	return request({
		url: '/system/user/andlist',
		method: 'get',
		params: query
	})
}

// 新增带看
export function addReporting(data) {
	return request({
		url: '/reporting/reporting',
		method: 'post',
		data: data
	})
}

// 查询task列表
export function listTask(query) {
	return request({
		url: '/task/list',
		method: 'get',
		params: query
	})
}

// 查询表单
export function formDataShow(taskID) {
	return request({
		url: '/task/formDataShow/' + taskID,
		method: 'get',
	})
}

// 带看审批
export function formDataSave(taskID, data) {
	return request({
		url: '/task/formDataSave/' + taskID,
		method: 'post',
		data: data
	})
}
//a级房源列表
export function getaHhouseList(query) {
	return request({
		url: '/fangyuan/fangyuan/house/aHouseList',
		method: 'post',
		params: query
	})
}
// 点击模糊搜索小区
export function getrefPriceHouse(query) {
	return request({
		url: '/tfw/lpxq/refPriceHouse',
		method: 'post',
		params: query
	})
}

//房源海报
export function getphoneCode(query) {
	return request({
		url: '/fangyuan/fangyuan/house/phoneCode',
		method: 'get',
		params: query
	})
}
//小区海报
export function getnewHouseShareInfo(query) {
	return request({
		url: '/tfw/lpxq/newHouseShareInfo',
		method: 'get',
		params: query
	})
}

// 早报
export function getzaobao(query) {
	return request({
		url: '/system/user/getPosterInfo',
		method: 'get',
		params: query
	})
}

// 二维码
export function wxtest(data) {
	return request({
		url: '/wx',
		method: 'get',
		params: data
	})
}
// 获取最近店铺位置
export function deptLatLon(query) {
	return request({
		url: '/system/dept/deptLatLon',
		method: 'get',
		params: query
	})
}
//获取今日是否打卡
export function listByData(query) {
	return request({
		url: '/chockln/chockln/listByData',
		method: 'get',
		params: query
	})
}
// 查询备用房源列表
export function stanbylist(query) {
	return request({
		url: '/fangyuan/fangyuan/stanbylist',
		method: 'get',
		params: query
	})
}

//领取房源
export function receiveById(query) {
	return request({
		url: '/fangyuan/fangyuan/receiveById',
		method: 'get',
		params: query
	})
}

//税费计算
export function gethousetaxcalculator(query) {
	return request({
		url: '/fangyuan/fangyuan/HouseTaxCalculator',
		method: 'get',
		params: query
	})
}

export function addLoan(data) {
  return request({
    url: '/loan/loan',
    method: 'post',
    data: data
  })
}

// 新增补卡申请
export function addReplacement(data) {
  return request({
    url: '/replacement/replacement',
    method: 'post',
    data: data
  })
}

// 查看判断是否超出查看套数
export function todayView(data) {
  return request({
    url: '/views/views/today',
    method: 'get',
    data: data
  })
}
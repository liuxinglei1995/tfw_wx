/**
 * 打开天地图全屏页（APP 端用 web-view 加载天地图 JS API）
 *
 * @param {Object} opt
 * @param {Number} opt.lng      中心点经度
 * @param {Number} opt.lat      中心点纬度
 * @param {Number} opt.zoom     缩放级别，默认 12
 * @param {String} opt.title    顶部标题
 * @param {Array}  opt.markers  打点 [{ lng, lat, title }]，兼容 { longitude, latitude }
 * @param {Boolean} opt.pick    是否选点模式；选点结果通过 uni.$emit('tdtMapPick', {lng,lat}) 回传
 */
export function openTdtMap(opt) {
	opt = opt || {}
	const params = {
		lng: opt.lng != null ? opt.lng : 104.0665,
		lat: opt.lat != null ? opt.lat : 30.5723,
		zoom: opt.zoom || 12,
		title: opt.title || '',
		pick: opt.pick ? 1 : 0,
		markers: JSON.stringify(opt.markers || [])
	}
	const query = Object.keys(params)
		.map(k => k + '=' + encodeURIComponent(params[k]))
		.join('&')
	uni.navigateTo({
		url: '/pagesHouse/tdtMap/index?' + query
	})
}

/**
 * 监听选点结果，返回取消监听的函数
 * @param {Function} cb ({ lng, lat }) => {}
 */
export function onTdtMapPick(cb) {
	const handler = (data) => cb(data)
	uni.$on('tdtMapPick', handler)
	return () => uni.$off('tdtMapPick', handler)
}

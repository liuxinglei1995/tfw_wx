/**
 * H5 JavaScriptSDK
 *
 * @version 1.0
 */
var ERROR_CONF = {
	KEY_ERR: 311,
	KEY_ERR_MSG: 'key格式错误',
	PARAM_ERR: 310,
	PARAM_ERR_MSG: '请求参数信息有误',
	SYSTEM_ERR: 600,
	SYSTEM_ERR_MSG: '系统错误',
	WX_ERR_CODE: 1000,
	WX_OK_CODE: 200
};
var BASE_URL = 'https://apis.map.qq.com/ws/';
var URL_SEARCH = BASE_URL + 'place/v1/search';
var URL_SUGGESTION = BASE_URL + 'place/v1/suggestion';
var URL_GET_GEOCODER = BASE_URL + 'geocoder/v1/';
var URL_CITY_LIST = BASE_URL + 'district/v1/list';
var URL_AREA_LIST = BASE_URL + 'district/v1/getchildren';
var URL_DISTANCE = BASE_URL + 'distance/v1/';
var URL_DIRECTION = BASE_URL + "direction/v1/";

var EARTH_RADIUS = 6378136.49;
var Utils = {
	/**
	 * 得到终点query字符串
	 * @param {Array|String} 检索数据
	 */
	location2query(data) {
		if (typeof data == 'string') {
			return data;
		}
		var query = '';
		for (var i = 0; i < data.length; i++) {
			var d = data[i];
			if (!!query) {
				query += ';';
			}
			if (d.location) {
				query = query + d.location.lat + ',' + d.location.lng;
			}
			if (d.latitude && d.longitude) {
				query = query + d.latitude + ',' + d.longitude;
			}
		}
		return query;
	},
	/**
	* 计算角度
	*/
	rad(d) {
	    return d * Math.PI / 180.0;
	}, 
	/**
	* 处理终点location数组
	* @return 返回终点数组
	*/
	getEndLocation(location){
	    var to = location.split(';');
	    var endLocation = [];
	    for (var i = 0; i < to.length; i++) {
			endLocation.push({
				lat: parseFloat(to[i].split(',')[0]),
				lng: parseFloat(to[i].split(',')[1])
	        })
	    }
	    return endLocation;
	},
	/**
	* 计算两点间直线距离
	* @param a 表示纬度差
	* @param b 表示经度差
	* @return 返回的是距离，单位m
	*/
	getDistance(latFrom, lngFrom, latTo, lngTo) {
	    var radLatFrom = this.rad(latFrom);
	    var radLatTo = this.rad(latTo);
	    var a = radLatFrom - radLatTo;
	    var b = this.rad(lngFrom) - this.rad(lngTo);
	    var distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLatFrom) * Math.cos(radLatTo) * Math.pow(Math.sin(b / 2), 2)));
	    distance = distance * EARTH_RADIUS;
	    distance = Math.round(distance * 10000) / 10000;
	    return parseFloat(distance.toFixed(0));
	},
	/**
	 * 使用微信接口进行定位
	 */
	getWXLocation(success, fail, complete) {
		uni.getLocation({
			type: 'gcj02',
			success: success,
			fail: fail,
			complete: complete
		});
	},

	/**
	 * 获取location参数
	 */
	getLocationParam(location) {
		if (typeof location == 'string') {
			var locationArr = location.split(',');
			if (locationArr.length === 2) {
				location = {
					latitude: location.split(',')[0],
					longitude: location.split(',')[1]
				};
			} else {
				location = {};
			}
		}
		return location;
	},

	/**
	 * 回调函数默认处理
	 */
	polyfillParam(param) {
		param.success = param.success || function() {};
		param.fail = param.fail || function() {};
		param.complete = param.complete || function() {};
	},

	/**
	 * 验证param对应的key值是否为空
	 *
	 * @param {Object} param 接口参数
	 * @param {String} key 对应参数的key
	 */
	checkParamKeyEmpty(param, key) {
		if (!param[key]) {
			var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + key + '参数格式有误');
			param.fail(errconf);
			param.complete(errconf);
			return true;
		}
		return false;
	},

	/**
	 * 验证参数中是否存在检索词keyword
	 *
	 * @param {Object} param 接口参数
	 */
	checkKeyword(param) {
		return !this.checkParamKeyEmpty(param, 'keyword');
	},

	/**
	 * 验证location值
	 *
	 * @param {Object} param 接口参数
	 */
	checkLocation(param) {
		var location = this.getLocationParam(param.location);
		if (!location || !location.latitude || !location.longitude) {
			var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + ' location参数格式有误');
			param.fail(errconf);
			param.complete(errconf);
			return false;
		}
		return true;
	},

	/**
	 * 构造错误数据结构
	 * @param {Number} errCode 错误码
	 * @param {Number} errMsg 错误描述
	 */
	buildErrorConfig(errCode, errMsg) {
		return {
			status: errCode,
			message: errMsg
		};
	},

	/**
	 * 构造微信请求参数，公共属性处理
	 *
	 * @param {Object} param 接口参数
	 * @param {Object} param 配置项
	 */
	buildWxRequestConfig(param, options) {
		var that = this;
		options.header = {
			"content-type": "application/json"
		};
		options.method = 'GET';
		options.success = function(res) {
			var data = res.data;
			if (data.status === 0) {
				param.success(data);
			} else {
				param.fail(data);
			}
		};
		options.fail = function(res) {
			res.statusCode = ERROR_CONF.WX_ERR_CODE;
			param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, result.errMsg));
		};
		options.complete = function(res) {
			var statusCode = +res.statusCode;
			switch (statusCode) {
				case ERROR_CONF.WX_ERR_CODE: {
					param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
					break;
				}
				case ERROR_CONF.WX_OK_CODE: {
					var data = res.data;
					if (data.status === 0) {
						param.complete(data);
					} else {
						param.complete(that.buildErrorConfig(data.status, data.message));
					}
					break;
				}
				default: {
					param.complete(that.buildErrorConfig(ERROR_CONF.SYSTEM_ERR, ERROR_CONF.SYSTEM_ERR_MSG));
				}

			}
		};
		return options;
	},

	/**
	 * 处理用户参数是否传入坐标进行不同的处理
	 */
	locationProcess(param, locationsuccess, locationfail, locationcomplete) {
		var that = this;
		locationfail = locationfail || function(res) {
			res.statusCode = ERROR_CONF.WX_ERR_CODE;
			param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
		};
		locationcomplete = locationcomplete || function(res) {
			if (res.statusCode == ERROR_CONF.WX_ERR_CODE) {
				param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
			}
		};
		if (!param.location) {
			that.getWXLocation(locationsuccess, locationfail, locationcomplete);
		} else if (that.checkLocation(param)) {
			var location = Utils.getLocationParam(param.location);
			locationsuccess(location);
		}
	},
	/**
	 * 构造微信请求参数，公共属性处理
	 *
	 * @param {Object} options 配置项
	 * @param {Object} param 接口参数
	 */
	buildWsJsonpConfig(options, param) {
		var that = this;
		var {
			url,
			data
		} = param;
		let urlParam = "";
		for (let key in data) {
			if (data.hasOwnProperty(key)) {
				let arrb = data[key];
				urlParam += `${key}=${arrb}&`;
			}
		}
		param.url = `${url}?${urlParam}output=jsonp`;
		param.success = function(res) {
			var data = res;
			if (data.status === 0) {
				options.success(data);
			} else {
				options.fail(data);
			}
		};
		param.fail = function(res) {
			res.statusCode = ERROR_CONF.WX_ERR_CODE;
			options.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, result.errMsg));
		};
		param.complete = function(res) {
			var statusCode = +res.statusCode;
			switch (statusCode) {
				case ERROR_CONF.WX_ERR_CODE: {
					options.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
					break;
				}
				case ERROR_CONF.WX_OK_CODE: {
					var data = res.data;
					if (data.status === 0) {
						options.complete(data);
					} else {
						options.complete(that.buildErrorConfig(data.status, data.message));
					}
					break;
				}
				default: {
					options.complete(that.buildErrorConfig(ERROR_CONF.SYSTEM_ERR, ERROR_CONF.SYSTEM_ERR_MSG));
				}
			}
		};
		return param;
	},
	getJSONP(url, options, success, error, complete) {
		var js = document.createElement('script');
		var callbackKey = options.callback || 'callback';
		var callbackName = '__callback' + Date.now();
		var timeout = options.timeout || 30000;
		var timing;

		function end(res) {
			clearTimeout(timing);
			delete window[callbackName];
			js.remove();
			if (typeof complete === 'function') {
				complete(res);
			}
		}
		window[callbackName] = (res) => {
			if (typeof success === 'function') {
				success(res);
			}
			end(res);
		};
		js.onerror = (err) => {
			if (typeof error === 'function') {
				error(err);
			}
			end(err);
		};
		timing = setTimeout(function() {
			if (typeof error === 'function') {
				error();
			}
			end({});
		}, timeout);
		js.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + callbackKey + '=' + callbackName;
		document.body.appendChild(js);
	},
	jsonpWs(options, param) {
		options = Utils.buildWsJsonpConfig(options, param);
		let {
			url,
			success,
			fail,
			complete
		} = options;
		delete options.url;
		let jsopOption = {
			callback: 'callback'
		};
		Utils.getJSONP(url, jsopOption, success, fail, complete);
	},
	ajaxWx(options, param) {
		options = Utils.buildWxRequestConfig(options, param);
		uni.request(options);
	},
	requestData(options, param) {
		// #ifdef H5
		Utils.jsonpWs(options, param);
		// #endif
		// #ifndef H5
		param.data.output = "json";
		Utils.ajaxWx(options, param);
		// #endif
	}
};


class QQMapWS {

	/**
	 * 构造函数
	 *
	 * @param {Object} options 接口参数,key 为必选参数
	 */
	constructor(options) {
		console.log(options)
		if (!options.key) {
			throw Error('key值不能为空');
		}
		this.key = options.key;
	}

	/**
	 * POI周边检索
	 *
	 * @param {Object} options 接口参数对象
	 *
	 * 参数对象结构可以参考
	 * @see http://lbs.qq.com/webservice_v1/guide-search.html
	 */
	search(options) {
		var that = this;
		options = options || {};

		Utils.polyfillParam(options);

		if (!Utils.checkKeyword(options)) {
			return;
		}

		var requestParam = {
			keyword: options.keyword,
			orderby: options.orderby || '_distance',
			page_size: options.page_size || 10,
			page_index: options.page_index || 1,
			// output: 'json',
			key: that.key
		};

		if (options.address_format) {
			requestParam.address_format = options.address_format;
		}

		if (options.filter) {
			requestParam.filter = options.filter;
		}

		var distance = options.distance || "1000";
		var auto_extend = options.auto_extend || 1;

		var locationsuccess = function(result) {
			requestParam.boundary = "nearby(" + result.latitude + "," + result.longitude + "," + distance +
				"," +
				auto_extend + ")";
			Utils.requestData(options, {
				url: URL_SEARCH,
				data: requestParam
			});
		};
		Utils.locationProcess(options, locationsuccess);
	}

	/**
	 * sug模糊检索
	 *
	 * @param {Object} options 接口参数对象
	 *
	 * 参数对象结构可以参考
	 * http://lbs.qq.com/webservice_v1/guide-suggestion.html
	 */
	getSuggestion(options) {
		var that = this;
		options = options || {};
		Utils.polyfillParam(options);

		if (!Utils.checkKeyword(options)) {
			return;
		}

		var requestParam = {
			keyword: options.keyword,
			region: options.region || '全国',
			region_fix: options.region_fix || 0,
			policy: options.policy || 0,
			key: that.key
		};
		Utils.requestData(options, {
			url: URL_SUGGESTION,
			data: requestParam
		});
	}
	/**
	 * 用于单起点到多终点的路线距离(非直线距离)计算：
	 * 支持两种距离计算方式：步行和驾车。
	 * 起点到终点最大限制直线距离10公里。
	 *
	 * 新增直线距离计算。
	 * 
	 * @param {Object} options 接口参数对象
	 * 
	 * 请求参数结构可以参考
	 * http://lbs.qq.com/webservice_v1/guide-distance.html
	 */
	calculateDistance(options) {
		var that = this;
		options = options || {};
		Utils.polyfillParam(options);

		if (Utils.checkParamKeyEmpty(options, 'to')) {
			return;
		}

		var requestParam = {
			mode: options.mode || 'walking',
			to: Utils.location2query(options.to),
			key: that.key
		};

		if (options.from) {
			options.location = options.from;
		}

		//计算直线距离
		if (requestParam.mode == 'straight') {
			var locationsuccess = function(result) {
				var locationTo = Utils.getEndLocation(requestParam.to); //处理终点坐标
				var data = {
					message: "query ok",
					result: {
						elements: []
					},
					status: 0
				};
				for (var i = 0; i < locationTo.length; i++) {
					data.result.elements.push({ //将坐标存入
						distance: Utils.getDistance(result.latitude, result.longitude, locationTo[i]
							.lat, locationTo[i].lng),
						duration: 0,
						from: {
							lat: result.latitude,
							lng: result.longitude
						},
						to: {
							lat: locationTo[i].lat,
							lng: locationTo[i].lng
						}
					});
				}
				var calculateResult = data.result.elements;
				var distanceResult = [];
				for (var i = 0; i < calculateResult.length; i++) {
					distanceResult.push(calculateResult[i].distance);
				}
				return options.success(data, {
					calculateResult: calculateResult,
					distanceResult: distanceResult
				});
			};

			Utils.locationProcess(options, locationsuccess);
		} else {
			var locationsuccess = function(result) {
				requestParam.from = result.latitude + ',' + result.longitude;
				if (options.sig) {
					requestParam.sig = Utils.getSig(requestParam, options.sig, 'calculateDistance');
				}
				Utils.requestData(options, {
					url: URL_DISTANCE,
					data: requestParam
				}, 'calculateDistance');
			};
			Utils.locationProcess(options, locationsuccess);
		}
	};

	/**
	 * 逆地址解析
	 *
	 * @param {Object} options 接口参数对象
	 *
	 * 请求参数结构可以参考
	 * http://lbs.qq.com/webservice_v1/guide-gcoder.html
	 */
	reverseGeocoder(options) {
		var that = this;
		options = options || {};
		Utils.polyfillParam(options);
		var requestParam = {
			coord_type: options.coord_type || 5,
			get_poi: options.get_poi || 0,
			// output: 'json',
			key: that.key
		};
		if (options.poi_options) {
			requestParam.poi_options = options.poi_options;
		}

		var locationsuccess = function(result) {
			requestParam.location = result.latitude + ',' + result.longitude;
			Utils.requestData(options, {
				url: URL_GET_GEOCODER,
				data: requestParam
			});
		};
		Utils.locationProcess(options, locationsuccess);
	}

	/**
	 * 地址解析
	 *
	 * @param {Object} options 接口参数对象
	 *
	 * 请求参数结构可以参考
	 * http://lbs.qq.com/webservice_v1/guide-geocoder.html
	 */
	geocoder(options) {
		var that = this;
		options = options || {};
		Utils.polyfillParam(options);
		if (Utils.checkParamKeyEmpty(options, 'address')) {
			return;
		}

		var requestParam = {
			address: options.address,
			// output: 'json',
			key: that.key
		};

		Utils.requestData(options, {
			url: URL_GET_GEOCODER,
			data: requestParam
		});
	}
	/**
	 * 获取城市列表
	 *
	 * @param {Object} options 接口参数对象
	 *
	 * 请求参数结构可以参考
	 * http://lbs.qq.com/webservice_v1/guide-region.html
	 */
	getCityList(options) {
		var that = this;
		options = options || {};
		Utils.polyfillParam(options);
		var requestParam = {
			// output: 'json',
			key: that.key
		};
		Utils.requestData(options, {
			url: URL_CITY_LIST,
			data: requestParam
		});
	}
}
export default QQMapWS;

function formatTime(date) {
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	return [hour, minute].map(formatNumber).join(':');
}

/**
 * 附近位置最大最小经纬度计算 
 * @param   longitude  经度
 * @param   latitude   纬度
 * @param   distince    距离（千米）
 * @returns 格式：经度最小值-经度最大值-纬度最小值-纬度最大值
 */
function getMaxMinLongitudeLatitude(longitude, latitude, distince) {
	let r = 6371.393;
	let lng = longitude;
	let lat = latitude;
	let dlng = 2 * Math.asin(Math.sin(distince / (2 * r)) / Math.cos(lat * Math.PI / 180));
	dlng = dlng * 180 / Math.PI;
	let dlat = distince / r;
	dlat = dlat * 180 / Math.PI;
	let minlat = lat - dlat;
	let maxlat = lat + dlat;
	let minlng = lng - dlng;
	let maxlng = lng + dlng;
	return minlng + "-" + maxlng + "-" + minlat + "-" + maxlat;
}

function getTop() {
	let sysinfo = uni.getSystemInfoSync();
	let sysbarheight = 0;
	// #ifdef MP || APP-PLUS || APP-VUE
	sysbarheight = sysinfo.statusBarHeight;
	// #endif
	return {
		sysbarheight: sysbarheight,
		height: (sysbarheight + 45)
	}
}

function formatNumber(n) {
	n = n.toString();
	return n[1] ? n : '0' + n;
}

function formatTimeTwo(number, format) {
	var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
	var returnArr = [];
	var date = new Date(number * 1000);
	returnArr.push(date.getFullYear());
	returnArr.push(formatNumber(date.getMonth() + 1));
	returnArr.push(formatNumber(date.getDate()));
	returnArr.push(formatNumber(date.getHours()));
	returnArr.push(formatNumber(date.getMinutes()));
	returnArr.push(formatNumber(date.getSeconds()));

	for (var i in returnArr) {
		format = format.replace(formateArr[i], returnArr[i]);
	}

	return format;
}

function add0(m) {
	return m < 10 ? '0' + m : m;
}

function format(shijianchuo) {
	var time = new Date(shijianchuo);
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return add0(h) + ':' + add0(mm);
}

const formatTimeDate = date => {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();
	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(
		':');
};



function handleTree(data, id, parentId, children) {
	let config = {
		id: id || 'id',
		parentId: parentId || 'parentId',
		childrenList: children || 'children'
	};

	var childrenListMap = {};
	var nodeIds = {};
	var tree = [];

	for (let d of data) {
		let parentId = d[config.parentId];
		if (childrenListMap[parentId] == null) {
			childrenListMap[parentId] = [];
		}
		nodeIds[d[config.id]] = d;
		childrenListMap[parentId].push(d);
	}

	for (let d of data) {
		let parentId = d[config.parentId];
		if (nodeIds[parentId] == null) {
			tree.push(d);
		}
	}

	for (let t of tree) {
		adaptToChildrenList(t);
	}

	function adaptToChildrenList(o) {
		const children = childrenListMap[o[config.id]];
		if (children && children.length > 0) {
			o[config.childrenList] = children;
			for (let c of children) {
				adaptToChildrenList(c);
			}
		}
	}
	return tree;
}




function handleSelectTree(data, id, parentId, children, type) {
	let config = {
		id: id || 'id',
		parentId: parentId || 'parentId',
		childrenList: children || 'children',
		type: type || "type"
	};
	var childrenListMap = {};
	var nodeIds = {};
	var tree = [];
	for (let d of data) {
		if (!d.hasOwnProperty('text')) {
			d.text = '';
		}
		d.text = d.extName;
		if (!d.hasOwnProperty('value')) {
			d.value = '';
		}
		if (type == "extName") {
			d.value = d.extName;
		} else {
			d.value = d.id
		}
		let parentId = d[config.parentId];
		if (childrenListMap[parentId] == null) {
			childrenListMap[parentId] = [];
		}
		nodeIds[d[config.id]] = d;
		childrenListMap[parentId].push(d);
	}

	for (let d of data) {
		let parentId = d[config.parentId];
		if (nodeIds[parentId] == null) {
			tree.push(d);
		}
	}

	for (let t of tree) {
		adaptToChildrenList(t);
	}

	function adaptToChildrenList(o) {
		const children = childrenListMap[o[config.id]];
		if (children && children.length > 0) {
			o[config.childrenList] = children;
			for (let c of children) {
				adaptToChildrenList(c);
			}
		}
	}
	return tree;
}

/**
 * 名字省略
 * @param {Object} name
 */
function nickNameParts(name) {
  return name.slice(0, 1) + '*';
}

/**
 * 日期格式转换 yyyy-MM-dd
 * @param {Object} time
 * @param {Object} format
 */
function format(time, format) {
  var t = new Date(time);
  var tf = function (i) { return (i < 10 ? '0' : '') + i };
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear());
        break;
      case 'MM':
        return tf(t.getMonth() + 1);
        break;
      case 'mm':
        return tf(t.getMinutes());
        break;
      case 'dd':
        return tf(t.getDate());
        break;
      case 'HH':
        return tf(t.getHours());
        break;
      case 'ss':
        return tf(t.getSeconds());
        break;
    }
  })
}

/**
 * 电话省略
 * @param {Object} phoneNumber
 */
function phoneNumberParts(phoneNumber) {
  // 检查电话号码的长度是否至少为7
  if (phoneNumber.length < 7) {
  }
  // 提取前3位
  let firstPart = phoneNumber.slice(0, 3);
  // 提取后4位
  let lastPart = phoneNumber.slice(-4);
  // 返回结果
  return firstPart+ '****' +lastPart;
}

/**
 * 初始化我指定格式的省市区
 * @param {Object} provinceData
 * @param {Object} cityData
 * @param {Object} areaData
 */
function formatDataForUniPicker(provinceData, cityData, areaData) {
  return provinceData.map((province, provinceIndex) => ({
    value: province.value,
    text: province.label,
    children: cityData[provinceIndex]?.map((city, cityIndex) => ({
      value: city.value,
      text: city.label,
      children: areaData[provinceIndex]?.[cityIndex]?.map(area => ({
        value: area.value,
        text: area.label
      }))
    }))
  }));
}


module.exports = {
	formatTime: formatTime,
	formatTimeTwo: formatTimeTwo,
	format: format,
	formatTimeDate: formatTimeDate,
	getMaxMinLongitudeLatitude: getMaxMinLongitudeLatitude,
	getTop: getTop,
	handleTree: handleTree,
	handleSelectTree: handleSelectTree,
	nickNameParts: nickNameParts,
	format: format,
	phoneNumberParts: phoneNumberParts,
	formatDataForUniPicker: formatDataForUniPicker
};
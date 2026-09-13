
export default {
	dictFind(dict,value){
		let array=[]
		if(dict){
			value=value.toString()
			let valuelist=value.split(',')
			array=dict
			let data=[]
			for (var i = 0; i < valuelist.length; i++) {
				let e = array.find(item=>
				 item.value == valuelist[i]
				 )
				 data.push(e)
			}
			return data
		}
	},
	dictUniSelect(dict){
		if (Array.isArray(dict) && dict.length > 0) {
			const array = dict.map(item => ({ "value": item.value, "text": item.label }));
			return array;
		} else {
			return [];
		}
	}
}

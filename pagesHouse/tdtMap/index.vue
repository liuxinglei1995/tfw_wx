<template>
	<view class="tdt-map-page">
		<!-- APP 端：全屏天地图（web-view + 天地图 JS API，无需原生地图模块） -->
		<!-- #ifdef APP-PLUS -->
		<web-view :src="url" @message="onMessage"></web-view>
		<!-- #endif -->

		<!-- 小程序/H5：沿用原生 map，行为不变 -->
		<!-- #ifndef APP-PLUS -->
		<map id="tdtMap" class="tdt-native-map" :latitude="lat" :longitude="lng" :scale="zoom" :markers="nativeMarkers"
			show-location></map>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
				lng: 104.0665,
				lat: 30.5723,
				zoom: 12,
				pick: false,
				nativeMarkers: []
			}
		},
		onLoad(option) {
			this.lng = Number(option.lng || 104.0665)
			this.lat = Number(option.lat || 30.5723)
			this.zoom = Number(option.zoom || 12)
			this.pick = option.pick === '1'

			let markers = []
			try {
				markers = JSON.parse(decodeURIComponent(option.markers || '[]')) || []
			} catch (e) {
				markers = []
			}
			this.nativeMarkers = markers.map(m => ({
				id: m.id || 0,
				latitude: m.lat != null ? m.lat : m.latitude,
				longitude: m.lng != null ? m.lng : m.longitude,
				title: m.title || '',
				width: 24,
				height: 24
			}))

			// #ifdef APP-PLUS
			this.url = '/hybrid/html/tdt-map.html' +
				'?lng=' + this.lng +
				'&lat=' + this.lat +
				'&zoom=' + this.zoom +
				'&pick=' + (this.pick ? 1 : 0) +
				'&title=' + encodeURIComponent(option.title || '') +
				'&markers=' + encodeURIComponent(JSON.stringify(markers))
			// #endif
		},
		methods: {
			// web-view 里 postMessage 上来的消息
			onMessage(e) {
				const list = (e && e.detail && e.detail.data) || []
				const msg = list[list.length - 1]
				if (!msg) return
				if (msg.type === 'pick') {
					// 选点结果回传给调用方
					uni.$emit('tdtMapPick', msg)
					uni.navigateBack({ delta: 1 })
				} else if (msg.type === 'marker') {
					uni.$emit('tdtMapMarker', msg)
				}
			}
		}
	}
</script>

<style>
	.tdt-map-page {
		width: 100%;
		height: 100vh;
	}

	.tdt-native-map {
		width: 100%;
		height: 100vh;
	}
</style>

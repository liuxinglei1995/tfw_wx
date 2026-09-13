<template>
	<view class="page">
		<tm-menubars title="房源分享" iconColor="white"></tm-menubars>
		<tm-message ref="toast"></tm-message>
		<view class="poster" v-if="!show_poster && showP">
			<l-painter ref="painter" v-if="style == 'Default'">
				<l-painter-view css="background: #CCD7EB;height: 995rpx; width: 670rpx;borderRadius: 20rpx">
					<l-painter-image :src="'https://static.tianfucd.com/img/share/news/'+style+'/bg.png'"
						css="position:absolute;left: 0rpx;top: 0rpx;height: 995rpx; width: 670rpx;borderRadius: 20rpx" />
					<l-painter-image :src="'https://static.tianfucd.com/img/share/news/'+style+'/logo.png'"
						css="position:absolute;left: 30rpx;top: 35rpx;background: #ff976a;width: 184rpx;height: 50rpx" />
					<l-painter-view css="position:absolute;right:-0rpx;top:5rpx;marginRight:30rpx;width:320rpx;">
						<l-painter-view css="width:140rpx;textAlign:center;fontSize:24rpx;">
							<l-painter-view css="marginRight:10rpx;">
								<l-painter-text css="fontSize:60rpx;fontFamily: SHUZI;lineHeight:60rpx"
									:text="posterObj.this_day" />
								<l-painter-text css="marginTop:30rpx;marginLeft:5rpx;" text="日" />
							</l-painter-view>
							<l-painter-text css="marginRight:10rpx;" :text="posterObj.this_month" />
						</l-painter-view>
						<l-painter-view
							css="position:absolute;right:168rpx;top:6rpx;textAlign:center;width:2rpx;height:100rpx;background: #000;"></l-painter-view>
						<l-painter-view
							css="position:absolute;right:-0rpx;top:6rpx;width:150rpx;textAlign:left;fontSize:24rpx;">
							<l-painter-text css="marginRight:10rpx;" :text="posterObj.this_week" />
							<l-painter-text css="marginRight:10rpx;"
								:text="posterObj.lives[0].temperature + ' ℃ ' + posterObj.lives[0].weather" />
							<l-painter-text css="marginRight:10rpx;"
								:text='"农历"+posterObj.lunar[1]+posterObj.lunar[2]' />
						</l-painter-view>
					</l-painter-view>
					<l-painter-image :src="'https://static.tianfucd.com/'+posterObj.loupanXq.coverfile"
						css="position:absolute;left: 30rpx;top: 115rpx;width: 610rpx;height: 380rpx;object-fit:cover" />
					<l-painter-text
						css="position:absolute;left: 50rpx;top: 135rpx;background: #FF8500;width: 100rpx;height:46rpx;borderRadius:8rpx;color:#fff;fontSize:24rpx;textAlign:center;lineHeight:47rpx;"
						:text="item.label"
						v-for="(item,index) in dictFind.dictFind(dict.type.tfw_property_status,posterObj.loupanXq.status)" />
					<l-painter-view
						css="position:absolute;background: #FFF;left: 30rpx;top: 495rpx;width: 610rpx;height: 310rpx" />
					<l-painter-view css="position:absolute;left:55rpx;top:510rpx;width:560rpx;height:40rpx;">
						<l-painter-text
							css="color:#333333;fontWeight:bold;fontSize:36rpx;height: 40rpx;lineHeight:40rpx;marginRight:30rpx"
							:text="posterObj.loupanXq.title">
						</l-painter-text>
						<l-painter-text
							css="color:#F94E4E;fontWeight:bold;fontSize:36rpx;height: 40rpx;lineHeight:40rpx;"
							:text="posterObj.stardprice.price+'万起'" />
					</l-painter-view>

					<l-painter-view
						css="position:absolute;left:55rpx;top:565rpx;width:50%;color:#666;fontWeight:bold;fontSize:24rpx">
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;width:100%"
							:text="'户型： '+posterObj.hx" />
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;width:100%;marginTop:5rpx"
							:text="'区间面积： '+(posterObj.qjmj?posterObj.qjmj:'--')+' ㎡'" />
						<l-painter-text
							css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;width:100%;marginTop:5rpx;"
							:text="'均价： '+posterObj.loupanXq.refPrice+' 元/㎡'" />
					</l-painter-view>
					<l-painter-view
						css="position:absolute;left:50%;top:565rpx;width:50%;color:#666;fontWeight:bold;fontSize:24rpx">
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;width:100%"
							:text="'开盘： '+(posterObj.loupanXq.openDate?formatDateTime(posterObj.loupanXq.openDate,'yyyy'):'--')" />
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;width:100%;marginTop:5rpx"
							:text="'总户数： '+(posterObj.loupanXq.totalHouseholds?posterObj.loupanXq.totalHouseholds:'')" />
						<l-painter-text
							css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;width:100%;marginTop:5rpx;"
							:text="'总栋数： '+(posterObj.loupanXq.totalBuilding?posterObj.loupanXq.totalBuilding+'栋':'--')" />
					</l-painter-view>
					<l-painter-text
						css="position:absolute;left:55rpx;top:675rpx;width:550rpx;color:#666;fontWeight:bold;fontSize:24rpx;lineClamp:1;"
						:text="'附近学校： '+(posterObj.loupanXq.schoolDistrict?posterObj.loupanXq.schoolDistrict:'--')" />
					<l-painter-text
						css="position:absolute;left:55rpx;top:708rpx;width:550rpx;color:#666;fontWeight:bold;fontSize:24rpx;lineClamp:1;"
						:text="'楼盘区域： '+posterObj.loupanXq.areaName" />
					<l-painter-text
						css="position:absolute;left:55rpx;top:744rpx;width:550rpx;color:#F94E4E;fontWeight:bold;fontSize:24rpx;lineClamp:1;"
						:text="'标签:   '+posterObj.bq" />
					<l-painter-image :src="posterObj.loginUser.user.avatar"
						css="position:absolute;left: 30rpx;top: 830rpx;background: #ff976a;width: 130rpx;height: 130rpx;border-radius:50%" />
					<l-painter-text
						css="position:absolute;left:180rpx;top:830rpx;color:#666;fontWeight:bold;fontSize:30rpx"
						:text="posterObj.loginUser.user.nickName" />
					<l-painter-text
						css="position:absolute;left:180rpx;top:870rpx;color:#666;fontWeight:bold;fontSize:26rpx"
						:text="(posterObj.loginUser.user.companyDept.deptName?posterObj.loginUser.user.companyDept.deptName:'天府网')" />
					<l-painter-text
						css="position:absolute;left:180rpx;top:930rpx;color:#666;fontWeight:bold;fontSize:18rpx"
						text="好房 优价 上天府网" />
					<l-painter-image :src="'data:image/jpeg;base64,'+wxqrcode"
						css="position:absolute;left: 490rpx;top: 817rpx;background: #ff976a;width: 140rpx;height: 140rpx" />
					<l-painter-text
						css="position:absolute;left:490rpx;top:955rpx;color:#666;fontWeight:bold;fontSize:18rpx"
						text="扫码查看详细信息" />
				</l-painter-view>
			</l-painter>
			<l-painter ref="painter" v-if="style == 'SimplicityNew'">
				<l-painter-view css="background: #CCD7EB;height: 995rpx; width: 670rpx;borderRadius: 20rpx">
					<l-painter-image :src="'https://static.tianfucd.com/img/share/news/'+style+'/bg.png?v=1'"
						css="position:absolute;left: 0rpx;top: 0rpx;height: 995rpx; width: 670rpx;borderRadius: 20rpx" />
					<l-painter-image :src="'https://static.tianfucd.com/img/share/news/'+style+'/logo.png'"
						css="position:absolute;left: 30rpx;top: 35rpx;background: #ff976a;width: 184rpx;height: 50rpx" />
					<l-painter-view
						css="position:absolute;right:-0rpx;top:5rpx;marginRight:30rpx;width:320rpx;color:#FFF">
						<l-painter-view css="width:140rpx;textAlign:center;fontSize:24rpx;">
							<l-painter-view css="marginRight:10rpx;">
								<l-painter-text css="fontSize:60rpx;fontFamily: SHUZI;lineHeight:60rpx"
									:text="posterObj.this_day" />
								<l-painter-text css="marginTop:30rpx;marginLeft:5rpx;" text="日" />
							</l-painter-view>
							<l-painter-text css="marginRight:10rpx;" :text="posterObj.this_month" />
						</l-painter-view>
						<l-painter-view
							css="position:absolute;right:168rpx;top:6rpx;textAlign:center;width:2rpx;height:100rpx;background: #FFF;"></l-painter-view>
						<l-painter-view
							css="position:absolute;right:-0rpx;top:6rpx;width:150rpx;textAlign:left;fontSize:24rpx;">
							<l-painter-text css="marginRight:10rpx;" :text="posterObj.this_week" />
							<l-painter-text css="marginRight:10rpx;"
								:text="posterObj.weather.temperature + ' ℃ ' + posterObj.weather.weather" />
							<l-painter-text css="marginRight:10rpx;"
								:text='"农历"+posterObj.lunar[1]+posterObj.lunar[2]' />
						</l-painter-view>
					</l-painter-view>
					<l-painter-image :src="'https://static.tianfucd.com/'+posterObj.loupanXq.coverfile"
						css="position:absolute;left: 35rpx;top: 120rpx;width: 600rpx;height: 506rpx;object-fit:cover" />
					<l-painter-text
						css="position:absolute;left: 50rpx;top: 135rpx;background: #FF8500;width: 100rpx;height:46rpx;borderRadius:8rpx;color:#fff;fontSize:24rpx;textAlign:center;lineHeight:47rpx;"
						:text="item.label"
						v-for="(item,index) in dictFind.dictFind(dict.type.tfw_property_status,posterObj.loupanXq.status)" />
					<l-painter-view css="position:absolute;left: 34rpx;top: 658rpx;color:#FFF;">
						<l-painter-view css="">
							<l-painter-text css="fontFamily: PMZDBTT;fontSize:50rpx;height: 64rpx;lineHeight:64rpx;"
								:text="posterObj.loupanXq.title" />
						</l-painter-view>
						<l-painter-view css="">
							<l-painter-text css="fontSize:24rpx;lineHeight:34rpx;marginTop:10rpx;"
								:text="'参考单价： '+posterObj.loupanXq.refPrice+' 元/㎡'" />
						</l-painter-view>
						<l-painter-view css="">
							<l-painter-text css="fontSize:24rpx;lineHeight:34rpx;marginTop:10rpx;"
								:text="'参考总价： '+posterObj.stardprice.price+'万起'" />
						</l-painter-view>
						<l-painter-view css="">
							<l-painter-text css="fontSize:24rpx;lineHeight:34rpx;marginTop:10rpx;"
								:text="'区间面积： '+(posterObj.qjmj?posterObj.qjmj:'--')+' ㎡'" />
						</l-painter-view>
						<l-painter-view css="">
							<l-painter-text
								css="fontSize:24rpx;lineHeight:34rpx;marginTop:10rpx;width:394rpx;height:70rpx"
								:text="'楼盘区域： '+posterObj.loupanXq.areaName" />
						</l-painter-view>
						<l-painter-view css="">
							<l-painter-text css="fontSize:24rpx;lineHeight:34rpx;marginTop:10rpx;"
								:text="'联系电话： '+(posterObj.loginUser.user.utel?posterObj.loginUser.user.utel:'--')" />
						</l-painter-view>
					</l-painter-view>
					<l-painter-view
						css="position:absolute;left: 472rpx;top: 744rpx;background:#FFF;width:160rpx;height:160rpx;radius:80rpx;"></l-painter-view>
					<l-painter-image :src="'data:image/jpeg;base64,'+wxqrcode"
						css="position:absolute;left: 483rpx;top: 755rpx;width: 137rpx;height: 137rpx;object-fit:cover;radius:50%" />
					<l-painter-view css="position:absolute;right: 0rpx;top: 920rpx;width:234rpx;color:#FFF">
						<l-painter-text
							css="fontSize:24rpx;lineHeight:34rpx;marginTop:10rpx;width:234rpx;textAlign:center;"
							text="扫码查看详情" />
					</l-painter-view>
				</l-painter-view>
			</l-painter>
			<l-painter ref="painter" v-if="style == 'Dazzle'">
				<l-painter-view css="background: #CCD7EB;height: 995rpx; width: 670rpx;borderRadius: 20rpx">
					<l-painter-image :src="'https://static.tianfucd.com/img/share/news/'+style+'/bg.png'"
						css="position:absolute;left: 0rpx;top: 0rpx;height: 995rpx; width: 670rpx;borderRadius: 20rpx" />
					<l-painter-image :src="'https://static.tianfucd.com/img/share/news/'+style+'/logo.png'"
						css="position:absolute;left: 30rpx;top: 35rpx;background: #ff976a;width: 184rpx;height: 50rpx" />
					<l-painter-view css="position:absolute;right:-0rpx;top:5rpx;marginRight:30rpx;width:320rpx;">
						<l-painter-view css="width:140rpx;textAlign:center;fontSize:24rpx;">
							<l-painter-view css="marginRight:10rpx;">
								<l-painter-text css="fontSize:60rpx;fontFamily: SHUZI;lineHeight:60rpx"
									:text="posterObj.this_day" />
								<l-painter-text css="marginTop:30rpx;marginLeft:5rpx;" text="日" />
							</l-painter-view>
							<l-painter-text css="marginRight:10rpx;" :text="posterObj.this_month" />
						</l-painter-view>
						<l-painter-view
							css="position:absolute;right:168rpx;top:6rpx;textAlign:center;width:2rpx;height:100rpx;background: #FFF;"></l-painter-view>
						<l-painter-view
							css="position:absolute;right:-0rpx;top:6rpx;width:150rpx;textAlign:left;fontSize:24rpx;">
							<l-painter-text css="marginRight:10rpx;" :text="posterObj.this_week" />
							<l-painter-text css="marginRight:10rpx;"
								:text="posterObj.weather.temperature + ' ℃ ' + posterObj.weather.weather" />
							<l-painter-text css="marginRight:10rpx;"
								:text='"农历"+posterObj.lunar[1]+posterObj.lunar[2]' />
						</l-painter-view>
					</l-painter-view>
					<l-painter-image :src="'https://static.tianfucd.com/'+posterObj.loupanXq.coverfile"
						css="position:absolute;left: 30rpx;top: 115rpx;width: 610rpx;height: 380rpx;object-fit:cover" />
					<l-painter-text
						css="position:absolute;left: 50rpx;top: 135rpx;background: #FF8500;width: 100rpx;height:46rpx;borderRadius:8rpx;color:#fff;fontSize:24rpx;textAlign:center;lineHeight:47rpx;"
						:text="item.label"
						v-for="(item,index) in dictFind.dictFind(dict.type.tfw_property_status,posterObj.loupanXq.status)" />
					<l-painter-view
						css="position:absolute;background: #FFF;left: 30rpx;top: 495rpx;width: 610rpx;height: 460rpx" />
					<l-painter-view
						css="position:absolute;background: #EC5786;left: 40rpx;top: 790rpx;width: 590rpx;height: 158rpx;radius:10rpx;">
						<l-painter-view
							css="background: #FFF;position:absolute;left:138rpx;marginTop:22rpx;width: 116rpx;height: 116rpx;">
							<l-painter-image :src="'data:image/jpeg;base64,'+wxqrcode"
								css="background: #ff976a;width: 116rpx;height: 116rpx" />
						</l-painter-view>
						<l-painter-view css="position:absolute;left:284rpx;marginTop:22rpx;">
							<l-painter-view>
								<l-painter-text css="color:#FFFFFF;fontSize:30rpx;fontWeight: bold;lineHeight:55rpx"
									text="扫一扫" />
							</l-painter-view>
							<l-painter-view>
								<l-painter-text css="color:#FFFFFF;fontSize:24rpx;lineHeight:32rpx;"
									text="详情扫码查看\n更多房源进入小程序" />
							</l-painter-view>
						</l-painter-view>
					</l-painter-view>
					<l-painter-view css="position:absolute;left:55rpx;top:510rpx;width:560rpx;height:40rpx;">
						<l-painter-text
							css="color:#333333;fontWeight:bold;fontSize:36rpx;height: 40rpx;lineHeight:40rpx;marginRight:30rpx"
							:text="posterObj.loupanXq.title">
						</l-painter-text>
						<l-painter-text
							css="color:#F94E4E;fontWeight:bold;fontSize:36rpx;height: 40rpx;lineHeight:40rpx;"
							:text="posterObj.stardprice.price+'万起'" />
					</l-painter-view>

					<l-painter-view
						css="position:absolute;left:55rpx;top:565rpx;width:50%;color:#666;fontWeight:bold;fontSize:24rpx">
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;width:100%"
							:text="'户型： '+posterObj.hx" />
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;width:100%;marginTop:5rpx"
							:text="'区间面积： '+(posterObj.qjmj?posterObj.qjmj:'--')+' ㎡'" />
						<l-painter-text
							css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;width:100%;marginTop:5rpx;"
							:text="'均价： '+posterObj.loupanXq.refPrice+' 元/㎡'" />
					</l-painter-view>
					<l-painter-view
						css="position:absolute;left:50%;top:565rpx;width:50%;color:#666;fontWeight:bold;fontSize:24rpx">
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;width:100%"
							:text="'开盘： '+(posterObj.loupanXq.openDate?formatDateTime(posterObj.loupanXq.openDate,'yyyy'):'--')" />
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;width:100%;marginTop:5rpx"
							:text="'总户数： '+(posterObj.loupanXq.totalHouseholds?posterObj.loupanXq.totalHouseholds:'')" />
						<l-painter-text
							css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;width:100%;marginTop:5rpx;"
							:text="'总栋数： '+(posterObj.loupanXq.totalBuilding?posterObj.loupanXq.totalBuilding+'栋':'--')" />
					</l-painter-view>
					<l-painter-text
						css="position:absolute;left:55rpx;top:675rpx;width:550rpx;color:#666;fontWeight:bold;fontSize:24rpx;lineClamp:1;"
						:text="'附近学校： '+(posterObj.loupanXq.schoolDistrict?posterObj.loupanXq.schoolDistrict:'--')" />
					<l-painter-text
						css="position:absolute;left:55rpx;top:708rpx;width:550rpx;color:#666;fontWeight:bold;fontSize:24rpx;lineClamp:1;"
						:text="'楼盘区域： '+posterObj.loupanXq.areaName" />
					<l-painter-text
						css="position:absolute;left:55rpx;top:744rpx;width:550rpx;color:#F94E4E;fontWeight:bold;fontSize:24rpx;lineClamp:1;"
						:text="'标签： '+posterObj.bq" />
					<l-painter-text
						css="color:#FFF;position:absolute;top:962rpx;width:100%;text-align:center;fontWeight:bold;fontSize:18rpx"
						text="上自家店 实在 好房 优价 上天府网" />
				</l-painter-view>
			</l-painter>
			<l-painter ref="painter" v-if="style == 'murkyBlack'">
				<l-painter-view css="background: #CCD7EB;height: 995rpx; width: 670rpx;borderRadius: 20rpx">
					<l-painter-image :src="'https://static.tianfucd.com/img/share/news/'+style+'/bg.png'"
						css="position:absolute;left: 0rpx;top: 0rpx;height: 995rpx; width: 670rpx;borderRadius: 20rpx" />
					<l-painter-image :src="'https://static.tianfucd.com/img/share/news/'+style+'/logo.png'"
						css="position:absolute;left: 30rpx;top: 35rpx;background: #ff976a;width: 184rpx;height: 50rpx" />
					<l-painter-view
						css="position:absolute;right:-0rpx;top:5rpx;marginRight:30rpx;width:320rpx;color:#FFF">
						<l-painter-view css="width:140rpx;textAlign:center;fontSize:24rpx;">
							<l-painter-view css="marginRight:10rpx;">
								<l-painter-text css="fontSize:60rpx;fontFamily: SHUZI;lineHeight:60rpx"
									:text="posterObj.this_day" />
								<l-painter-text css="marginTop:30rpx;marginLeft:5rpx;" text="日" />
							</l-painter-view>
							<l-painter-text css="marginRight:10rpx;" :text="posterObj.this_month" />
						</l-painter-view>
						<l-painter-view
							css="position:absolute;right:168rpx;top:6rpx;textAlign:center;width:2rpx;height:100rpx;background: #FFF;"></l-painter-view>
						<l-painter-view
							css="position:absolute;right:-0rpx;top:6rpx;width:150rpx;textAlign:left;fontSize:24rpx;">
							<l-painter-text css="marginRight:10rpx;" :text="posterObj.this_week" />
							<l-painter-text css="marginRight:10rpx;"
								:text="posterObj.weather.temperature + ' ℃ ' + posterObj.weather.weather" />
							<l-painter-text css="marginRight:10rpx;"
								:text='"农历"+posterObj.lunar[1]+posterObj.lunar[2]' />
						</l-painter-view>
					</l-painter-view>
					<l-painter-image :src="'https://static.tianfucd.com/'+posterObj.loupanXq.coverfile"
						css="position:absolute;left: 30rpx;top: 115rpx;width: 610rpx;height: 380rpx;object-fit:cover" />
					<l-painter-text
						css="position:absolute;left: 50rpx;top: 135rpx;background: #FF8500;width: 100rpx;height:46rpx;borderRadius:8rpx;color:#fff;fontSize:24rpx;textAlign:center;lineHeight:47rpx;"
						:text="item.label"
						v-for="(item,index) in dictFind.dictFind(dict.type.tfw_property_status,posterObj.loupanXq.status)" />
					<l-painter-view
						css="position:absolute;background: #FFF;left: 30rpx;top: 495rpx;width: 610rpx;height: 300rpx" />
					<l-painter-view
						css="position:absolute;left: 40rpx;top: 790rpx;width: 590rpx;height: 158rpx;radius:10rpx;">
						<l-painter-view
							css="background: #FFF;position:absolute;left:138rpx;marginTop:22rpx;width: 116rpx;height: 116rpx;">
							<l-painter-image :src="'data:image/jpeg;base64,'+wxqrcode"
								css="background: #ff976a;width: 116rpx;height: 116rpx" />
						</l-painter-view>
						<l-painter-view css="position:absolute;left:284rpx;marginTop:22rpx;">
							<l-painter-view>
								<l-painter-text css="color:#FFFFFF;fontSize:30rpx;fontWeight: bold;lineHeight:55rpx"
									text="扫一扫" />
							</l-painter-view>
							<l-painter-view>
								<l-painter-text css="color:#FFFFFF;fontSize:24rpx;lineHeight:32rpx;"
									text="详情扫码查看\n更多房源进入小程序" />
							</l-painter-view>
						</l-painter-view>
					</l-painter-view>
					<l-painter-view css="position:absolute;left:55rpx;top:510rpx;width:560rpx;height:40rpx;">
						<l-painter-text
							css="color:#333333;fontWeight:bold;fontSize:36rpx;height: 40rpx;lineHeight:40rpx;marginRight:30rpx"
							:text="posterObj.loupanXq.title">
						</l-painter-text>
						<l-painter-text
							css="color:#F94E4E;fontWeight:bold;fontSize:36rpx;height: 40rpx;lineHeight:40rpx;"
							:text="posterObj.stardprice.price+'万起'" />
					</l-painter-view>

					<l-painter-view
						css="position:absolute;left:55rpx;top:565rpx;width:50%;color:#666;fontWeight:bold;fontSize:24rpx">
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;width:100%"
							:text="'户型： '+posterObj.hx" />
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;width:100%;marginTop:5rpx"
							:text="'区间面积： '+(posterObj.qjmj?posterObj.qjmj:'--')+' ㎡'" />
						<l-painter-text
							css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;width:100%;marginTop:5rpx;"
							:text="'均价： '+posterObj.loupanXq.refPrice+' 元/㎡'" />
					</l-painter-view>
					<l-painter-view
						css="position:absolute;left:50%;top:565rpx;width:50%;color:#666;fontWeight:bold;fontSize:24rpx">
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;width:100%"
							:text="'开盘： '+(posterObj.loupanXq.openDate?formatDateTime(posterObj.loupanXq.openDate,'yyyy'):'--')" />
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;width:100%;marginTop:5rpx"
							:text="'总户数： '+(posterObj.loupanXq.totalHouseholds?posterObj.loupanXq.totalHouseholds:'')" />
						<l-painter-text
							css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;width:100%;marginTop:5rpx;"
							:text="'总栋数： '+(posterObj.loupanXq.totalBuilding?posterObj.loupanXq.totalBuilding+'栋':'--')" />
					</l-painter-view>
					<l-painter-text
						css="position:absolute;left:55rpx;top:675rpx;width:550rpx;color:#666;fontWeight:bold;fontSize:24rpx;lineClamp:1;"
						:text="'附近学校： '+(posterObj.loupanXq.schoolDistrict?posterObj.loupanXq.schoolDistrict:'--')" />
					<l-painter-text
						css="position:absolute;left:55rpx;top:708rpx;width:550rpx;color:#666;fontWeight:bold;fontSize:24rpx;lineClamp:1;"
						:text="'楼盘区域： '+posterObj.loupanXq.areaName" />
					<l-painter-text
						css="position:absolute;left:55rpx;top:744rpx;width:550rpx;color:#F94E4E;fontWeight:bold;fontSize:24rpx;lineClamp:1;"
						:text="'标签： '+posterObj.bq" />
					<l-painter-text
						css="color:#FFF;position:absolute;top:962rpx;width:100%;text-align:center;fontWeight:bold;fontSize:18rpx"
						text="上自家店 实在 好房 优价 上天府网" />

				</l-painter-view>
			</l-painter>

			<tm-scroll width="590" color='blue' :show-dot="false" style="position: absolute;top: 492rpx;left: 80rpx;">
				<image v-for="(item,index) in posterObj.imgs" :key="index" @click="posterObj.img = item"
					style="width: 200rpx;height: 110rpx;margin-right: 10rpx;" :src="item" mode="aspectFill"></image>
			</tm-scroll>
			<view class="footer-btn">
				<view class="" @tap="back">
					返回
				</view>
				<view class="save" @click="toSave">
					保存
				</view>
			</view>
		</view>
		<view class="poster-btn">
			<view :class="{'is-check':check_idx==index}" v-for="(item,index) in footer_arr" :key="index"
				@click="toChoose(index)">
				<image :src="item" mode=""></image>
				<view v-if="check_idx==index"></view>
			</view>
		</view>
		<!-- 生成的图片 -->
		<tm-maskFlow v-model="show_1" :close="false" :position="pos">
			<view class="poster-img">
				<text @click="closePopup"></text>
				<image :src="path" mode="" @click="previewImg"></image>
				<!-- #ifdef H5 -->
				<view class="">
					长按图片保存到手机
				</view>
				<!-- #endif -->
				<!-- #ifndef H5 -->
				<view class="">
					点击图片保存到手机
				</view>
				<!-- #endif -->
			</view>
		</tm-maskFlow>
	</view>
</template>
<script>
	import tmMaskFlow from '@/pagesTools/tm-vuetify/components/tm-maskFlow/tm-maskFlow.vue';
	import tmInput from '@/pagesTools/tm-vuetify/components/tm-input/tm-input.vue';
	import tmPoup from '@/pagesTools/tm-vuetify/components/tm-poup/tm-poup.vue';
	import tmMessage from '@/pagesTools/tm-vuetify/components/tm-message/tm-message.vue';
	import tmScroll from '@/pagesTools/tm-vuetify/components/tm-scroll/tm-scroll.vue';
	import {
		base64ToPath
	} from '../../components/lime-painter/utils.js';

	import lPainterView from '../../components/l-painter-view/l-painter-view.vue';
	import lPainterText from '../../components/l-painter-text/l-painter-text.vue';
	import lPainterImage from '../../components/l-painter-image/l-painter-image.vue';
	import lPainterQrcode from '../../components/l-painter-qrcode/l-painter-qrcode.vue';
	import lPainter from '../../components/l-painter/l-painter.vue';
	import {
		getnewHouseShareInfo,
		wxtest
	} from '@/api/houst.js'
	var siteConfig = uni.getStorageSync('siteConfigs')
	export default {
		dicts: ['tfw_featured_tags', 'tfw_property_status'],
		components: {
			tmMaskFlow,
			tmInput,
			tmPoup,
			tmMessage,
			tmScroll,
			lPainterView,
			lPainterText,
			lPainterImage,
			lPainter,
			lPainterQrcode
		},
		data() {
			return {
				wxqrcode: "",
				show_1: false,
				showP: false,
				pos: 'center',
				showInput: false,
				posInput: 'bottom',


				show_poster: false, //显示海报
				path: '', //生成的图片地址
				posterObj: {
					imgs: []
				}, //画板数据
				footer_arr: [
					'https://cdn.tianfucd.com/images/applet/poster/icon/default.png',
					'https://cdn.tianfucd.com/images/applet/poster/icon/jianyue.png',
					'https://cdn.tianfucd.com/images/applet/poster/icon/xuancai.png',
					'https://cdn.tianfucd.com/images/applet/poster/icon/mohei.png',
					'https://cdn.tianfucd.com/images/applet/poster/icon/more.png'
				], //底部选项
				check_idx: 0, //底部选中的下标
				fangid: null,
				wxqrcode: "",
				style: 'Default',
				color: '#333333'
			}
		},
		onReady() {
			uni.loadFontFace({
				family: 'PMZDBTT',
				source: 'url("https://cdn.tianfucd.com/agent/fonts/PangMenZhengDaoBiaoTiTi-1.ttf")',
				success(e) {
					console.log('success', e)
				}
			})
			uni.loadFontFace({
				family: 'SHUZI',
				source: 'url("https://cdn.tianfucd.com/agent/fonts/PangMenZhengDao-Regular.woff")',
				success(e) {
					console.log('success', e)
				}
			})
		},
		onLoad(option) {
			this.fangid = option.id
		},
		onShow() {
			let that = this
			// that.$nextTick(()=>{
			// 	that.$refs.toast.show({model:'load',mask:true})
			// })
			that.getShareInfo()
		},
		methods: {
			formatDateTime(dater, format) {
				let date = new Date(dater);
				const o = {
					'M+': date.getMonth() + 1, // 月份
					'd+': date.getDate(), // 日
					'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
					'H+': date.getHours(), // 小时
					'm+': date.getMinutes(), // 分
					's+': date.getSeconds(), // 秒
					'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
					S: date.getMilliseconds(), // 毫秒
					a: date.getHours() < 12 ? '上午' : '下午', // 上午/下午
					A: date.getHours() < 12 ? 'AM' : 'PM', // AM/PM
				};
				if (/(y+)/.test(format)) {
					format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
				}
				for (let k in o) {
					if (new RegExp('(' + k + ')').test(format)) {
						format = format.replace(
							RegExp.$1,
							RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
						);
					}
				}
				return format;
			},
			/*获取小程序码*/
			getWxacode() {
				let that = this
				let map = "id=" + this.fangid
				wxtest({
					page: "pagesHouse/houseid/community_detailss",
					scene: map
				}).then(res => {
					console.log(res, "sssssdddd");
					this.wxqrcode = res
					// base64ToPath(res).then(path => {
					// 	console.log(path,"kkkkkkkkkkkkkkkkk");
					// 	that.setData({
					// 		wxqrcode: path
					// 	})
					// 	that.$nextTick(() => {
					// 		that.$refs.toast.hide()
					// 	})
					// }).catch(error => {
					// 	console.error(error,"4444444")
					// })
				})
			},
			getShareInfo: function() {
				let that = this
				getnewHouseShareInfo({
					id: that.fangid,
				}).then(res => {
					console.log(res, "ssssss");
					// if (res.loupanXq.loupanHuxings.length > 1) {
					// 	res.qjmj = res.loupanXq.loupanHuxings[0].habitableSpace + '-' + res.loupanXq
					// 		.loupanHuxings[res.loupanXq.loupanHuxings.length - 1].habitableSpace
					// }
					if (res.loupanXq && res.loupanXq.loupanHuxings.length > 1) {
						const firstHx = res.loupanXq.loupanHuxings[0];
						const lastHx = res.loupanXq.loupanHuxings[res.loupanXq.loupanHuxings.length - 1];

						if (firstHx.habitableSpace != null && lastHx.habitableSpace != null) {
							res.qjmj = firstHx.habitableSpace + '-' + lastHx.habitableSpace;
						} else if (firstHx.habitableSpace == null && lastHx.habitableSpace != null) {
							// 如果首个为空，取下一个非空的
							let secondHx = res.loupanXq.loupanHuxings.find((hx, index) => hx.habitableSpace !=
								null && index > 0);
							res.qjmj = secondHx.habitableSpace + '-' + lastHx.habitableSpace;
						} else if (lastHx.habitableSpace == null) {
							// 如果末尾为空，取倒数第二个非空的
							let secondLastHx = res.loupanXq.loupanHuxings.reverse().find((hx, index) => hx
								.habitableSpace != null && index > 0);
							res.qjmj = firstHx.habitableSpace + '-' + secondLastHx.habitableSpace;
						} else {
							res.qjmj = null; // 若两者都为空，则设为null
						}
					}
					if (res.loupanXq && res.loupanXq.loupanHuxings.length > 0) {
						const bedroomConfigs = res.loupanXq.loupanHuxings
							.map(item => item.bedRoomNum ? `${item.bedRoomNum}室` : null)
							.filter(Boolean);

						res.hx = [...new Set(bedroomConfigs)];
					}

					if (res.loupanXq && res.loupanXq.featuredTags) {
						res.bq = this.dictFind.dictFind(this.dict.type.tfw_featured_tags, res.loupanXq
								.featuredTags)
							.find(item => item !== undefined && item !== null);

						if (res.bq) {
							res.bq = res.bq.label.toString();
						} else {
							res.bq = null;
						}
					}

					if (res.loupanXq && res.loupanXq.loupanHuxings.length > 0) {
						const minIdHousingType = res.loupanXq.loupanHuxings.reduce((minObj, currentObj) => {
							if (!minObj || (currentObj.price !== null && currentObj.price < minObj
									.price)) {
								return currentObj;
							}
							return minObj;
						}, null);
						res.stardprice = minIdHousingType
						// 现在minIdHousingType就是id值最小的对象
					}

					that.setData({
						posterObj: res,
						showP: true
					})
					// #ifdef MP-WEIXIN
					this.getWxacode()
					// #endif
					that.$nextTick(() => {
						that.$refs.toast.hide()
					})
				})
			},
			back: function() {
				uni.navigateBack({
					delta: 1
				})
			},
			/**
			 * 点击预览图开始录入
			 */
			clickInput: function() {
				let that = this
				that.setData({
					showInput: true
				})
			},
			previewImg() {
				// #ifdef H5
				return;
				// #endif
				uni.previewImage({
					current: this.path,
					urls: [this.path]
				});
			},
			closePopup() {
				this.show_1 = false;
				this.show_poster = false;
			},
			toSave() {
				uni.showLoading({
					title: '海报生成中',
				})
				const painter = this.$refs.painter;
				painter.canvasToTempFilePath().then(res => {
					this.path = res.tempFilePath;
					this.show_1 = true;
					this.show_poster = true;
					uni.hideLoading()
				});
			},
			toChoose(index) {
				let that = this
				let isLad = false
				switch (index) {
					case 0:
						that.style = 'Default'
						isLad = true
						break;
					case 1:
						that.style = 'SimplicityNew'
						isLad = true
						break;
					case 2:
						that.style = 'Dazzle'
						isLad = true
						break;
					case 3:
						that.style = 'murkyBlack'
						isLad = true
						break;
					default:
						uni.showToast({
							icon: 'none',
							title: '敬请期待'
						})
						break;
				}
				if (isLad) {
					this.check_idx = index;
					uni.showLoading({
						title: '加载中'
					});
					setTimeout(function() {
						uni.hideLoading();
					}, 3000);
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import './style.scss';
</style>
<template>
	<view class="page">
		<tm-menubars title="房源分享" iconColor="white"></tm-menubars>
		<view class="poster" v-if="showP">
			<l-painter ref="painter" v-if="style == 'Default'">
				<l-painter-view css="background: #CCD7EB;height: 995rpx; width: 670rpx;borderRadius: 20rpx">
					<l-painter-image src="https://static.tianfucd.com/img/share/news/Default/bg.png"
						css="position:absolute;left: 0rpx;top: 0rpx;height: 995rpx; width: 670rpx;borderRadius: 20rpx" />
					<l-painter-image src="https://static.tianfucd.com/img/share/news/Default/logo.png"
						css="position:absolute;left: 30rpx;top: 32rpx;background: #ff976a;width: 184rpx;height: 50rpx" />
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
					<l-painter-image :src="'https://static.tianfucd.com/'+posterObj.house.coverfile"
						css="position:absolute;left: 30rpx;top: 120rpx;width: 610rpx;height: 380rpx;object-fit:cover" />
					<l-painter-view
						css="position:absolute;background: #FFF;left: 30rpx;top: 490rpx;width: 610rpx;height: 320rpx" />
					<l-painter-text
						css="position:absolute;left:55rpx;top:510rpx;width:570rpx;color:#333333;fontWeight:bold;fontSize:36rpx;line-clamp:1;"
						:text="posterObj.house.title" />
					<l-painter-text css="position:absolute;left:55rpx;top:565rpx;color:#333;fontSize:30rpx"
						:text="posterObj.house.xqname">
					</l-painter-text>
					<l-painter-view css="position:absolute;left: 55rpx;top: 620rpx;width: 500rpx;height: 30rpx;">
						<l-painter-text
							css="background: #B5F5EC;height: 30rpx;borderRadius:4rpx;color:#13C2C2;fontWeight:bold;fontSize:16rpx;textAlign:center;lineHeight:30rpx;paddingLeft:10rpx;paddingRight:10rpx;marginRight:25rpx;"
							:text="getfivenear(posterObj.house.titleDeedDate)" />
						<l-painter-text
							css="background: #B5F5EC;height: 30rpx;borderRadius:4rpx;color:#13C2C2;fontWeight:bold;fontSize:16rpx;textAlign:center;lineHeight:30rpx;paddingLeft:10rpx;paddingRight:10rpx;marginRight:25rpx;"
							:text="item.label"
							v-for="(item,index) in dictFind.dictFind(dict.type.tfw_ecommendation_level,posterObj.house.grade)" />
						<l-painter-text
							css="background: #B5F5EC;height: 30rpx;borderRadius:4rpx;color:#13C2C2;fontWeight:bold;fontSize:16rpx;textAlign:center;lineHeight:30rpx;paddingLeft:10rpx;paddingRight:10rpx;marginRight:25rpx;"
							:text="item.label"
							v-for="(item,index) in dictFind.dictFind(dict.type.tfw_property_type,posterObj.house.propertyType)" />
					</l-painter-view>
					<l-painter-view
						css="position:absolute;left:55rpx;top:655rpx;color:#666;fontWeight:bold;fontSize:24rpx;width:700rpx">
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;"
							:text="posterObj.house.propertyArea+'㎡'" />
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;"
							:text="posterObj.house.loupanHuxing?(posterObj.house.loupanHuxing.bedRoomNum+'室'+posterObj.house.loupanHuxing.livingRoomNum+'厅'+posterObj.house.loupanHuxing.bathroomNum+'卫'):''" />
						<l-painter-text v-if="posterObj.wylx == '写字楼'"
							css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;"
							:text="posterObj.jb + ' | ' + posterObj.lx" />
						<l-painter-text v-if="posterObj.wylx == '商铺'"
							css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;"
							:text="posterObj.jb + ' | ' + posterObj.helx" />
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;" :text="item.label"
							v-for="(item,index) in dictFind.dictFind(dict.type.tfw_housing_orientation,posterObj.house.orientation)" />
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;" :text="item.label"
							v-for="(item,index) in dictFind.dictFind(dict.type.tfw_decoration_situation,posterObj.house.decoration)" />
					</l-painter-view>
					<l-painter-image src="https://www.tianfucd.com/img/shareArea.png"
						css="position:absolute;left: 55rpx;top: 708rpx;width: 12rpx;height: 18rpx;border-radius:50%" />
					<l-painter-text
						css="position:absolute;left:75rpx;top:700rpx;color:#333;fontWeight:400;fontSize:20rpx"
						:text=" posterObj.house.loupanXq.cityName + ' '+ posterObj.house.loupanXq.areaName+ ' | ' +(posterObj.house.loupanXq.zoneCode?posterObj.house.loupanXq.zoneCode:'') " />

					<view v-if="housetype==2">
						<l-painter-text v-if="posterObj.house.type == 2"
							css="position:absolute;left:55rpx;top:715rpx;color:#F94E4E;fontWeight:bold;fontSize:32rpx"
							:text="'租金：'+posterObj.house.rental +'元'" />
						<view v-else>
							<l-painter-text
								css="position:absolute;left:55rpx;top:715rpx;color:#F94E4E;fontWeight:bold;fontSize:32rpx"
								:text="'总价：'+posterObj.house.sellingPrice+'万'" />
							<l-painter-text
								css="position:absolute;left:355rpx;top:715rpx;color:#F94E4E;fontWeight:bold;fontSize:32rpx"
								:text="Math.ceil(posterObj.house.sellingPrice * 10000 / posterObj.house.propertyArea)+' 元/㎡'" />
						</view>
					</view>
					<l-painter-text v-else-if="housetype==4"
						css="position:absolute;left:55rpx;top:715rpx;color:#F94E4E;fontWeight:bold;fontSize:32rpx"
						:text="'租金：'+posterObj.house.rental +'元'" />
					<view v-else>
						<l-painter-text
							css="position:absolute;left:55rpx;top:715rpx;color:#F94E4E;fontWeight:bold;fontSize:32rpx"
							:text="'总价：'+posterObj.house.sellingPrice+'万'" />
						<l-painter-text
							css="position:absolute;left:355rpx;top:715rpx;color:#F94E4E;fontWeight:bold;fontSize:32rpx"
							:text="Math.ceil(posterObj.house.sellingPrice * 10000 / posterObj.house.propertyArea)+' 元/㎡'" />
					</view>

					<l-painter-image :src="posterObj.loginUser.user.avatar"
						css="position:absolute;left: 35rpx;top: 820rpx;width: 130rpx;height: 130rpx;border-radius:50%;border:5rpx;border-color:#FDE364;" />
					<l-painter-text
						css="color:#1A1A1A;position:absolute;left:190rpx;top:840rpx;fontWeight:bold;fontSize:30rpx"
						:text="posterObj.loginUser.user.nickName" />
					<l-painter-text css="position:absolute;left:190rpx;top:890rpx;color:#5555ff;fontSize:20rpx"
						:text="userInfo.companyDept.deptName" />
					<l-painter-image :src="'data:image/jpeg;base64,'+wxqrcode"
						css="position:absolute;left: 490rpx;top: 820rpx;background: #ff976a;width: 140rpx;height: 140rpx" />
					<l-painter-text
						css="position:absolute;left:490rpx;top:958rpx;color:#666;fontWeight:bold;fontSize:18rpx"
						text="扫码查看详细信息" />
					<l-painter-text
						css="position:absolute;left:190rpx;top:958rpx;color:#666666;fontWeight:bold;fontSize:18rpx"
						text="好房 优价 上天府网" />
				</l-painter-view>
			</l-painter>
			<l-painter ref="painter" v-if="style == 'Simplicity'">
				<l-painter-view css="background: #CCD7EB;height: 995rpx; width: 670rpx;borderRadius: 20rpx">
					<l-painter-image src="https://static.tianfucd.com/img/share/news/Simplicity/bg.png"
						css="position:absolute;left: 0rpx;top: 0rpx;height: 995rpx; width: 670rpx;borderRadius: 20rpx" />
					<l-painter-image src="https://static.tianfucd.com/img/share/news/Simplicity/logo.png"
						css="position:absolute;left: 30rpx;top: 32rpx;background: #ff976a;width: 184rpx;height: 50rpx" />
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
					<l-painter-image :src="'https://static.tianfucd.com/'+posterObj.house.coverfile"
						css="position:absolute;left: 30rpx;top: 120rpx;width: 610rpx;height: 380rpx;object-fit:cover" />
					<l-painter-view
						css="position:absolute;background: #FFF;left: 30rpx;top: 490rpx;width: 610rpx;height: 280rpx" />
					<l-painter-text
						css="position:absolute;left:55rpx;top:500rpx;width:570rpx;color:#333333;fontWeight:bold;fontSize:36rpx;line-clamp:1;"
						:text="posterObj.house.title" />
					<l-painter-text
						css="position:absolute;left:55rpx;top:560rpx;width:570rpx;color:#333333;fontWeight:bold;fontSize:22rpx;line-clamp:1;"
						:text="posterObj.house.xqname" />
					</l-painter-text>
					<l-painter-view css="position:absolute;left: 55rpx;top: 600rpx;width: 500rpx;height: 30rpx;">
						<l-painter-text
							css="background: #B5F5EC;height: 30rpx;borderRadius:4rpx;color:#13C2C2;fontWeight:bold;fontSize:16rpx;textAlign:center;lineHeight:30rpx;paddingLeft:10rpx;paddingRight:10rpx;marginRight:25rpx;"
							:text="getfivenear(posterObj.house.titleDeedDate)" />
						<l-painter-text
							css="background: #B5F5EC;height: 30rpx;borderRadius:4rpx;color:#13C2C2;fontWeight:bold;fontSize:16rpx;textAlign:center;lineHeight:30rpx;paddingLeft:10rpx;paddingRight:10rpx;marginRight:25rpx;"
							:text="item.label"
							v-for="(item,index) in dictFind.dictFind(dict.type.tfw_ecommendation_level,posterObj.house.grade)" />
						<l-painter-text
							css="background: #B5F5EC;height: 30rpx;borderRadius:4rpx;color:#13C2C2;fontWeight:bold;fontSize:16rpx;textAlign:center;lineHeight:30rpx;paddingLeft:10rpx;paddingRight:10rpx;marginRight:25rpx;"
							:text="item.label"
							v-for="(item,index) in dictFind.dictFind(dict.type.tfw_property_type,posterObj.house.propertyType)" />
					</l-painter-view>
					<l-painter-view
						css="position:absolute;left:55rpx;top:640rpx;color:#666;fontWeight:bold;fontSize:24rpx;width:700rpx">
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;"
							:text="posterObj.house.propertyArea+'㎡'" />
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;"
							:text="posterObj.house.loupanHuxing?(posterObj.house.loupanHuxing.bedRoomNum+'室'+posterObj.house.loupanHuxing.livingRoomNum+'厅'+posterObj.house.loupanHuxing.bathroomNum+'卫'):''" />
						<l-painter-text v-if="posterObj.wylx == '住宅'"
							css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;" :text="posterObj.fyhx" />
						<l-painter-text v-if="posterObj.wylx == '写字楼'"
							css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;"
							:text="posterObj.jb + ' | ' + posterObj.lx" />
						<l-painter-text v-if="posterObj.wylx == '商铺'"
							css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;"
							:text="posterObj.jb + ' | ' + posterObj.helx" />
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;" :text="item.label"
							v-for="(item,index) in dictFind.dictFind(dict.type.tfw_housing_orientation,posterObj.house.orientation)" />
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;" :text="item.label"
							v-for="(item,index) in dictFind.dictFind(dict.type.tfw_decoration_situation,posterObj.house.decoration)" />
					</l-painter-view>
					<l-painter-image src="https://www.tianfucd.com/img/shareArea.png"
						css="position:absolute;left: 55rpx;top: 688rpx;width: 12rpx;height: 18rpx;border-radius:50%" />
					<l-painter-text
						css="position:absolute;left:75rpx;top:685rpx;color:#333;fontWeight:400;fontSize:20rpx"
						:text=" posterObj.house.loupanXq.cityName + ' '+ posterObj.house.loupanXq.areaName+ ' | ' +(posterObj.house.loupanXq.zoneCode?posterObj.house.loupanXq.zoneCode:'') " />

					<view v-if="housetype==2">
						<l-painter-text v-if="posterObj.house.type == 2"
							css="position:absolute;left:55rpx;top:715rpx;color:#F94E4E;fontWeight:bold;fontSize:32rpx"
							:text="'租金：'+posterObj.house.rental +'元'" />
						<view v-else>
							<l-painter-text
								css="position:absolute;left:55rpx;top:715rpx;color:#F94E4E;fontWeight:bold;fontSize:32rpx"
								:text="'总价：'+posterObj.house.sellingPrice+'万'" />
							<l-painter-text
								css="position:absolute;left:355rpx;top:715rpx;color:#F94E4E;fontWeight:bold;fontSize:32rpx"
								:text="Math.ceil(posterObj.house.sellingPrice * 10000 / posterObj.house.propertyArea)+' 元/㎡'" />
						</view>
					</view>
					<l-painter-text v-else-if="housetype==4"
						css="position:absolute;left:55rpx;top:715rpx;color:#F94E4E;fontWeight:bold;fontSize:32rpx"
						:text="'租金：'+posterObj.house.rental +'元'" />
					<view v-else>
						<l-painter-text
							css="position:absolute;left:55rpx;top:715rpx;color:#F94E4E;fontWeight:bold;fontSize:32rpx"
							:text="'总价：'+posterObj.house.sellingPrice+'万'" />
						<l-painter-text
							css="position:absolute;left:355rpx;top:715rpx;color:#F94E4E;fontWeight:bold;fontSize:32rpx"
							:text="Math.ceil(posterObj.house.sellingPrice * 10000 / posterObj.house.propertyArea)+' 元/㎡'" />
					</view>

					<l-painter-image :src="posterObj.loginUser.user.avatar"
						css="position:absolute;left: 35rpx;top: 820rpx;width: 130rpx;height: 130rpx;border-radius:50%;border:5rpx;border-color:#FDE364;" />
					<l-painter-text
						css="color:#1A1A1A;position:absolute;left:190rpx;top:840rpx;fontWeight:bold;fontSize:30rpx"
						:text="posterObj.loginUser.user.nickName" />
					<l-painter-text css="position:absolute;left:190rpx;top:890rpx;color:#5555ff;fontSize:20rpx"
						:text="userInfo.companyDept.deptName" />
					<l-painter-image :src="'data:image/jpeg;base64,'+wxqrcode"
						css="position:absolute;left: 490rpx;top: 820rpx;background: #ff976a;width: 140rpx;height: 140rpx" />
					<l-painter-text
						css="position:absolute;left:490rpx;top:958rpx;color:#666;fontWeight:bold;fontSize:18rpx"
						text="扫码查看详细信息" />
					<l-painter-text
						css="position:absolute;left:190rpx;top:958rpx;color:#666666;fontWeight:bold;fontSize:18rpx"
						text="好房 优价 上天府网" />
				</l-painter-view>
			</l-painter>
			<l-painter ref="painter" v-if="style == 'BlackGold'">
				<l-painter-view css="background: #CCD7EB;height: 995rpx; width: 670rpx;borderRadius: 20rpx">
					<l-painter-image src="https://static.tianfucd.com/img/share/news/BlackGold/bg.png"
						css="position:absolute;left: 0rpx;top: 0rpx;height: 995rpx; width: 670rpx;borderRadius: 20rpx" />
					<l-painter-image src="https://static.tianfucd.com/img/share/news/BlackGold/logo.png"
						css="position:absolute;left: 30rpx;top: 32rpx;background: #ff976a;width: 184rpx;height: 50rpx" />
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
							css="position:absolute;right:168rpx;top:6rpx;textAlign:center;width:2rpx;height:100rpx;background: #fff;"></l-painter-view>
						<l-painter-view
							css="position:absolute;right:-0rpx;top:6rpx;width:150rpx;textAlign:left;fontSize:24rpx;">
							<l-painter-text css="marginRight:10rpx;" :text="posterObj.this_week" />
							<l-painter-text css="marginRight:10rpx;"
								:text="posterObj.lives[0].temperature + ' ℃ ' + posterObj.lives[0].weather" />
							<l-painter-text css="marginRight:10rpx;"
								:text='"农历"+posterObj.lunar[1]+posterObj.lunar[2]' />
						</l-painter-view>
					</l-painter-view>
					<l-painter-image :src="'https://static.tianfucd.com/'+posterObj.house.coverfile"
						css="position:absolute;left: 30rpx;top: 120rpx;width: 610rpx;height: 380rpx;object-fit:cover" />
					<l-painter-view
						css="position:absolute;background: #FFF;left: 30rpx;top: 490rpx;width: 610rpx;height: 280rpx" />
					<l-painter-text
						css="position:absolute;left:55rpx;top:500rpx;width:570rpx;color:#333333;fontWeight:bold;fontSize:36rpx;line-clamp:1;"
						:text="posterObj.house.title" />
					</l-painter-text>
					<l-painter-view css="position:absolute;left: 55rpx;top: 560rpx;width: 500rpx;height: 30rpx;">
						<l-painter-text
							css="background: #B5F5EC;height: 30rpx;borderRadius:4rpx;color:#13C2C2;fontWeight:bold;fontSize:16rpx;textAlign:center;lineHeight:30rpx;paddingLeft:10rpx;paddingRight:10rpx;marginRight:25rpx;"
							:text="getfivenear(posterObj.house.titleDeedDate)" />
						<l-painter-text
							css="background: #B5F5EC;height: 30rpx;borderRadius:4rpx;color:#13C2C2;fontWeight:bold;fontSize:16rpx;textAlign:center;lineHeight:30rpx;paddingLeft:10rpx;paddingRight:10rpx;marginRight:25rpx;"
							:text="item.label"
							v-for="(item,index) in dictFind.dictFind(dict.type.tfw_ecommendation_level,posterObj.house.grade)" />
						<l-painter-text
							css="background: #B5F5EC;height: 30rpx;borderRadius:4rpx;color:#13C2C2;fontWeight:bold;fontSize:16rpx;textAlign:center;lineHeight:30rpx;paddingLeft:10rpx;paddingRight:10rpx;marginRight:25rpx;"
							:text="item.label"
							v-for="(item,index) in dictFind.dictFind(dict.type.tfw_property_type,posterObj.house.propertyType)" />
					</l-painter-view>
					<l-painter-view
						css="position:absolute;left:55rpx;top:605rpx;color:#666;fontWeight:bold;fontSize:24rpx;width:700rpx">
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;"
							:text="posterObj.house.propertyArea+'㎡'" />
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;"
							:text="posterObj.house.loupanHuxing?(posterObj.house.loupanHuxing.bedRoomNum+'室'+posterObj.house.loupanHuxing.livingRoomNum+'厅'+posterObj.house.loupanHuxing.bathroomNum+'卫'):''" />
						<l-painter-text v-if="posterObj.wylx == '住宅'"
							css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;" :text="posterObj.fyhx" />
						<l-painter-text v-if="posterObj.wylx == '写字楼'"
							css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;"
							:text="posterObj.jb + ' | ' + posterObj.lx" />
						<l-painter-text v-if="posterObj.wylx == '商铺'"
							css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;"
							:text="posterObj.jb + ' | ' + posterObj.helx" />
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;" :text="item.label"
							v-for="(item,index) in dictFind.dictFind(dict.type.tfw_housing_orientation,posterObj.house.orientation)" />
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;" :text="item.label"
							v-for="(item,index) in dictFind.dictFind(dict.type.tfw_decoration_situation,posterObj.house.decoration)" />
					</l-painter-view>
					<l-painter-image src="https://www.tianfucd.com/img/shareArea.png"
						css="position:absolute;left: 55rpx;top: 668rpx;width: 12rpx;height: 18rpx;border-radius:50%" />
					<l-painter-text
						css="position:absolute;left:75rpx;top:660rpx;color:#333;fontWeight:400;fontSize:20rpx"
						:text=" posterObj.house.loupanXq.cityName + ' '+ posterObj.house.loupanXq.areaName+ ' | ' +(posterObj.house.loupanXq.zoneCode?posterObj.house.loupanXq.zoneCode:'') " />

					<view v-if="housetype==2">
						<l-painter-text v-if="posterObj.house.type == 2"
							css="position:absolute;left:55rpx;top:715rpx;color:#F94E4E;fontWeight:bold;fontSize:32rpx"
							:text="'租金：'+posterObj.house.rental +'元'" />
						<view v-else>
							<l-painter-text
								css="position:absolute;left:55rpx;top:715rpx;color:#F94E4E;fontWeight:bold;fontSize:32rpx"
								:text="'总价：'+posterObj.house.sellingPrice+'万'" />
							<l-painter-text
								css="position:absolute;left:355rpx;top:715rpx;color:#F94E4E;fontWeight:bold;fontSize:32rpx"
								:text="Math.ceil(posterObj.house.sellingPrice * 10000 / posterObj.house.propertyArea)+' 元/㎡'" />
						</view>
					</view>
					<l-painter-text v-else-if="housetype==4"
						css="position:absolute;left:55rpx;top:715rpx;color:#F94E4E;fontWeight:bold;fontSize:32rpx"
						:text="'租金：'+posterObj.house.rental +'元'" />
					<view v-else>
						<l-painter-text
							css="position:absolute;left:55rpx;top:715rpx;color:#F94E4E;fontWeight:bold;fontSize:32rpx"
							:text="'总价：'+posterObj.house.sellingPrice+'万'" />
						<l-painter-text
							css="position:absolute;left:355rpx;top:715rpx;color:#F94E4E;fontWeight:bold;fontSize:32rpx"
							:text="Math.ceil(posterObj.house.sellingPrice * 10000 / posterObj.house.propertyArea)+' 元/㎡'" />
					</view>

					<l-painter-image :src="posterObj.loginUser.user.avatar"
						css="position:absolute;left: 35rpx;top: 820rpx;width: 130rpx;height: 130rpx;border-radius:50%;border:5rpx;border-color:#FDE364;" />
					<l-painter-text
						css="color:#1A1A1A;position:absolute;left:190rpx;top:840rpx;fontWeight:bold;fontSize:30rpx"
						:text="posterObj.loginUser.user.nickName" />
					<l-painter-text css="position:absolute;left:190rpx;top:890rpx;color:#5555ff;fontSize:20rpx"
						:text="userInfo.companyDept.deptName" />
					<l-painter-image :src="'data:image/jpeg;base64,'+wxqrcode"
						css="position:absolute;left: 490rpx;top: 820rpx;background: #ff976a;width: 140rpx;height: 140rpx" />
					<l-painter-text
						css="position:absolute;left:490rpx;top:958rpx;color:#666;fontWeight:bold;fontSize:18rpx"
						text="扫码查看详细信息" />
					<l-painter-text
						css="position:absolute;left:190rpx;top:958rpx;color:#666666;fontWeight:bold;fontSize:18rpx"
						text="好房 优价 上天府网" />
				</l-painter-view>
			</l-painter>
			<l-painter ref="painter" v-if="style == 'Gradient'">
				<l-painter-view css="background: #CCD7EB;height: 995rpx; width: 670rpx;borderRadius: 20rpx">
					<l-painter-image src="https://static.tianfucd.com/img/share/news/Gradient/bg.png"
						css="position:absolute;left: 0rpx;top: 0rpx;height: 995rpx; width: 670rpx;borderRadius: 20rpx" />
					<l-painter-image src="https://static.tianfucd.com/img/share/news/Gradient/logo.png"
						css="position:absolute;left: 30rpx;top: 32rpx;background: #ff976a;width: 184rpx;height: 50rpx" />
					<l-painter-view
						css="position:absolute;right:-0rpx;top:5rpx;marginRight:30rpx;width:320rpx;color:#333">
						<l-painter-view css="width:140rpx;textAlign:center;fontSize:24rpx;">
							<l-painter-view css="marginRight:10rpx;">
								<l-painter-text css="fontSize:60rpx;fontFamily: SHUZI;lineHeight:60rpx;"
									:text="posterObj.this_day" />
								<l-painter-text css="marginTop:30rpx;" text="日" />
							</l-painter-view>
							<l-painter-text css="marginRight:10rpx;" :text="posterObj.this_month" />
						</l-painter-view>
						<l-painter-view
							css="position:absolute;right:168rpx;top:6rpx;textAlign:center;width:2rpx;height:100rpx;background: #333;"></l-painter-view>
						<l-painter-view
							css="position:absolute;right:-0rpx;top:6rpx;width:150rpx;textAlign:left;fontSize:24rpx;">
							<l-painter-text css="marginRight:10rpx;" :text="posterObj.this_week" />
							<l-painter-text css="marginRight:10rpx;"
								:text="posterObj.lives[0].temperature + ' ℃ ' + posterObj.lives[0].weather" />
							<l-painter-text css="marginRight:10rpx;"
								:text='"农历"+posterObj.lunar[1]+posterObj.lunar[2]' />
						</l-painter-view>
					</l-painter-view>
					<l-painter-image :src="'https://static.tianfucd.com/'+posterObj.house.coverfile"
						css="position:absolute;left: 30rpx;top: 120rpx;width: 610rpx;height: 380rpx;object-fit:cover" />
					<l-painter-view
						css="position:absolute;background: #FFF;left: 30rpx;top: 490rpx;width: 610rpx;height: 280rpx" />

					<l-painter-text
						css="position:absolute;left:55rpx;top:490rpx;width:570rpx;color:#333333;fontWeight:bold;fontSize:36rpx;line-clamp:1;"
						:text="posterObj.house.xqname" />
					<l-painter-text css="position:absolute;left:55rpx;top:540rpx;color:#333;fontSize:30rpx"
						:text="posterObj.house.title">
					</l-painter-text>
					<l-painter-view css="position:absolute;left: 55rpx;top: 600rpx;width: 500rpx;height: 30rpx;">
						<l-painter-text
							css="background: #B5F5EC;height: 30rpx;borderRadius:4rpx;color:#13C2C2;fontWeight:bold;fontSize:16rpx;textAlign:center;lineHeight:30rpx;paddingLeft:10rpx;paddingRight:10rpx;marginRight:25rpx;"
							:text="getfivenear(posterObj.house.titleDeedDate)" />
						<l-painter-text
							css="background: #B5F5EC;height: 30rpx;borderRadius:4rpx;color:#13C2C2;fontWeight:bold;fontSize:16rpx;textAlign:center;lineHeight:30rpx;paddingLeft:10rpx;paddingRight:10rpx;marginRight:25rpx;"
							:text="item.label"
							v-for="(item,index) in dictFind.dictFind(dict.type.tfw_ecommendation_level,posterObj.house.grade)" />
						<l-painter-text
							css="background: #B5F5EC;height: 30rpx;borderRadius:4rpx;color:#13C2C2;fontWeight:bold;fontSize:16rpx;textAlign:center;lineHeight:30rpx;paddingLeft:10rpx;paddingRight:10rpx;marginRight:25rpx;"
							:text="item.label"
							v-for="(item,index) in dictFind.dictFind(dict.type.tfw_property_type,posterObj.house.propertyType)" />
						<!-- <l-painter-text
							css="background: #B5F5EC;height: 30rpx;borderRadius:4rpx;color:#13C2C2;fontWeight:bold;fontSize:16rpx;textAlign:center;lineHeight:30rpx;paddingLeft:10rpx;paddingRight:10rpx;marginRight:25rpx;"
							:text="posterObj.dztuij" /> -->
					</l-painter-view>
					<l-painter-view
						css="position:absolute;left:55rpx;top:640rpx;color:#666;fontWeight:bold;fontSize:24rpx;width:700rpx">
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;"
							:text="posterObj.house.propertyArea+'㎡'" />
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;"
							:text="posterObj.house.loupanHuxing?(posterObj.house.loupanHuxing.bedRoomNum+'室'+posterObj.house.loupanHuxing.livingRoomNum+'厅'+posterObj.house.loupanHuxing.bathroomNum+'卫'):''" />
						<l-painter-text v-if="posterObj.wylx == '住宅'"
							css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;" :text="posterObj.fyhx" />
						<l-painter-text v-if="posterObj.wylx == '写字楼'"
							css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;"
							:text="posterObj.jb + ' | ' + posterObj.lx" />
						<l-painter-text v-if="posterObj.wylx == '商铺'"
							css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;"
							:text="posterObj.jb + ' | ' + posterObj.helx" />
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;" :text="item.label"
							v-for="(item,index) in dictFind.dictFind(dict.type.tfw_housing_orientation,posterObj.house.orientation)" />
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;" :text="item.label"
							v-for="(item,index) in dictFind.dictFind(dict.type.tfw_decoration_situation,posterObj.house.decoration)" />
					</l-painter-view>

					<l-painter-image src="https://www.tianfucd.com/img/shareArea.png"
						css="position:absolute;left: 55rpx;top: 688rpx;width: 12rpx;height: 18rpx;border-radius:50%" />
					<l-painter-text
						css="position:absolute;left:75rpx;top:680rpx;color:#333;fontWeight:400;fontSize:20rpx"
						:text=" posterObj.house.loupanXq.cityName + ' '+ posterObj.house.loupanXq.areaName+ ' | ' +(posterObj.house.loupanXq.zoneCode?posterObj.house.loupanXq.zoneCode:'') " />

					<view v-if="housetype==2">
						<l-painter-text v-if="posterObj.house.type == 2"
							css="position:absolute;left:55rpx;top:715rpx;color:#F94E4E;fontWeight:bold;fontSize:32rpx"
							:text="'租金：'+posterObj.house.rental +'元'" />
						<view v-else>
							<l-painter-text
								css="position:absolute;left:55rpx;top:715rpx;color:#F94E4E;fontWeight:bold;fontSize:32rpx"
								:text="'总价：'+posterObj.house.sellingPrice+'万'" />
							<l-painter-text
								css="position:absolute;left:355rpx;top:715rpx;color:#F94E4E;fontWeight:bold;fontSize:32rpx"
								:text="Math.ceil(posterObj.house.sellingPrice * 10000 / posterObj.house.propertyArea)+' 元/㎡'" />
						</view>
					</view>
					<l-painter-text v-else-if="housetype==4"
						css="position:absolute;left:55rpx;top:715rpx;color:#F94E4E;fontWeight:bold;fontSize:32rpx"
						:text="'租金：'+posterObj.house.rental +'元'" />
					<view v-else>
						<l-painter-text
							css="position:absolute;left:55rpx;top:715rpx;color:#F94E4E;fontWeight:bold;fontSize:32rpx"
							:text="'总价：'+posterObj.house.sellingPrice+'万'" />
						<l-painter-text
							css="position:absolute;left:355rpx;top:715rpx;color:#F94E4E;fontWeight:bold;fontSize:32rpx"
							:text="Math.ceil(posterObj.house.sellingPrice * 10000 / posterObj.house.propertyArea)+' 元/㎡'" />
					</view>

					<l-painter-image :src="posterObj.loginUser.user.avatar"
						css="position:absolute;left: 35rpx;top: 820rpx;width: 130rpx;height: 130rpx;border-radius:50%;border:5rpx;border-color:#FDE364;" />
					<l-painter-text
						css="color:#1A1A1A;position:absolute;left:190rpx;top:840rpx;fontWeight:bold;fontSize:30rpx"
						:text="posterObj.loginUser.user.nickName" />
					<l-painter-text css="position:absolute;left:190rpx;top:890rpx;color:#5555ff;fontSize:20rpx"
						:text="userInfo.companyDept.deptName" />
					<l-painter-image :src="'data:image/jpeg;base64,'+wxqrcode"
						css="position:absolute;left: 490rpx;top: 820rpx;background: #ff976a;width: 140rpx;height: 140rpx" />
					<l-painter-text
						css="position:absolute;left:490rpx;top:958rpx;color:#666;fontWeight:bold;fontSize:18rpx"
						text="扫码查看详细信息" />
					<l-painter-text
						css="position:absolute;left:190rpx;top:958rpx;color:#666666;fontWeight:bold;fontSize:18rpx"
						text="好房 优价 上天府网" />
				</l-painter-view>
			</l-painter>
			<l-painter ref="painter" v-if="style == 'Vitality'">
				<l-painter-view css="background: #CCD7EB;height: 995rpx; width: 670rpx;borderRadius: 20rpx">
					<l-painter-image src="https://static.tianfucd.com/img/share/news/Vitality/bg.png"
						css="position:absolute;left: 0rpx;top: 0rpx;height: 995rpx; width: 670rpx;borderRadius: 20rpx" />
					<l-painter-image src="https://static.tianfucd.com/img/share/news/Vitality/logo.png"
						css="position:absolute;left: 30rpx;top: 32rpx;background: #ff976a;width: 184rpx;height: 50rpx" />
					<l-painter-view
						css="position:absolute;right:-0rpx;top:5rpx;marginRight:30rpx;width:320rpx;color:#333">
						<l-painter-view css="width:140rpx;textAlign:center;fontSize:24rpx;">
							<l-painter-view css="marginRight:10rpx;">
								<l-painter-text css="fontSize:60rpx;fontFamily: SHUZI;lineHeight:60rpx;"
									:text="posterObj.this_day" />
								<l-painter-text css="marginTop:30rpx;" text="日" />
							</l-painter-view>
							<l-painter-text css="marginRight:10rpx;" :text="posterObj.this_month" />
						</l-painter-view>
						<l-painter-view
							css="position:absolute;right:168rpx;top:6rpx;textAlign:center;width:2rpx;height:100rpx;background: #333;"></l-painter-view>
						<l-painter-view
							css="position:absolute;right:-0rpx;top:6rpx;width:150rpx;textAlign:left;fontSize:24rpx;">
							<l-painter-text css="marginRight:10rpx;" :text="posterObj.this_week" />
							<l-painter-text css="marginRight:10rpx;"
								:text="posterObj.lives[0].temperature + ' ℃ ' + posterObj.lives[0].weather" />
							<l-painter-text css="marginRight:10rpx;"
								:text='"农历"+posterObj.lunar[1]+posterObj.lunar[2]' />
						</l-painter-view>
					</l-painter-view>
					<l-painter-image :src="'https://static.tianfucd.com/'+posterObj.house.coverfile"
						css="position:absolute;left: 30rpx;top: 120rpx;width: 610rpx;height: 380rpx;object-fit:cover" />
					<l-painter-view
						css="position:absolute;background: #FFF;left: 30rpx;top: 490rpx;width: 610rpx;height: 280rpx" />
					<l-painter-text
						css="position:absolute;left:55rpx;top:490rpx;width:570rpx;color:#333333;fontWeight:bold;fontSize:36rpx;line-clamp:1;"
						:text="posterObj.house.xqname" />
					<l-painter-text css="position:absolute;left:55rpx;top:540rpx;color:#333;fontSize:30rpx"
						:text="posterObj.house.title">
					</l-painter-text>
					<l-painter-view css="position:absolute;left: 55rpx;top: 600rpx;width: 500rpx;height: 30rpx;">
						<l-painter-text
							css="background: #B5F5EC;height: 30rpx;borderRadius:4rpx;color:#13C2C2;fontWeight:bold;fontSize:16rpx;textAlign:center;lineHeight:30rpx;paddingLeft:10rpx;paddingRight:10rpx;marginRight:25rpx;"
							:text="getfivenear(posterObj.house.titleDeedDate)" />
						<l-painter-text
							css="background: #B5F5EC;height: 30rpx;borderRadius:4rpx;color:#13C2C2;fontWeight:bold;fontSize:16rpx;textAlign:center;lineHeight:30rpx;paddingLeft:10rpx;paddingRight:10rpx;marginRight:25rpx;"
							:text="item.label"
							v-for="(item,index) in dictFind.dictFind(dict.type.tfw_ecommendation_level,posterObj.house.grade)" />
						<l-painter-text
							css="background: #B5F5EC;height: 30rpx;borderRadius:4rpx;color:#13C2C2;fontWeight:bold;fontSize:16rpx;textAlign:center;lineHeight:30rpx;paddingLeft:10rpx;paddingRight:10rpx;marginRight:25rpx;"
							:text="item.label"
							v-for="(item,index) in dictFind.dictFind(dict.type.tfw_decoration_situation,posterObj.house.decoration)" />
						<!-- 	<l-painter-text
							css="background: #B5F5EC;height: 30rpx;borderRadius:4rpx;color:#13C2C2;fontWeight:bold;fontSize:16rpx;textAlign:center;lineHeight:30rpx;paddingLeft:10rpx;paddingRight:10rpx;marginRight:25rpx;"
							:text="posterObj.dztuij" /> -->
					</l-painter-view>

					<l-painter-view
						css="position:absolute;left:55rpx;top:640rpx;color:#666;fontWeight:bold;fontSize:24rpx;width:700rpx">
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;"
							:text="posterObj.house.propertyArea+'㎡'" />
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;"
							:text="posterObj.house.loupanHuxing?(posterObj.house.loupanHuxing.bedRoomNum+'室'+posterObj.house.loupanHuxing.livingRoomNum+'厅'+posterObj.house.loupanHuxing.bathroomNum+'卫'):''" />
						<l-painter-text v-if="posterObj.wylx == '住宅'"
							css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;" :text="posterObj.fyhx" />
						<l-painter-text v-if="posterObj.wylx == '写字楼'"
							css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;"
							:text="posterObj.jb + ' | ' + posterObj.lx" />
						<l-painter-text v-if="posterObj.wylx == '商铺'"
							css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;"
							:text="posterObj.jb + ' | ' + posterObj.helx" />
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;" :text="item.label"
							v-for="(item,index) in dictFind.dictFind(dict.type.tfw_housing_orientation,posterObj.house.orientation)" />
						<l-painter-text css="fontWeight:bold;fontSize:24rpx;marginRight:20rpx;" :text="item.label"
							v-for="(item,index) in dictFind.dictFind(dict.type.tfw_decoration_situation,posterObj.house.decoration)" />
					</l-painter-view>

					<l-painter-image src="https://www.tianfucd.com/img/shareArea.png"
						css="position:absolute;left: 55rpx;top: 688rpx;width: 12rpx;height: 18rpx;border-radius:50%" />
					<l-painter-text
						css="position:absolute;left:75rpx;top:680rpx;color:#333;fontWeight:400;fontSize:20rpx"
						:text=" posterObj.house.loupanXq.cityName + ' '+ posterObj.house.loupanXq.areaName+ ' | ' +(posterObj.house.loupanXq.zoneCode?posterObj.house.loupanXq.zoneCode:'') " />

					<view v-if="housetype==2">
						<l-painter-text v-if="posterObj.house.type == 2"
							css="position:absolute;left:55rpx;top:715rpx;color:#F94E4E;fontWeight:bold;fontSize:32rpx"
							:text="'租金：'+posterObj.house.rental +'元'" />
						<view v-else>
							<l-painter-text
								css="position:absolute;left:55rpx;top:715rpx;color:#F94E4E;fontWeight:bold;fontSize:32rpx"
								:text="'总价：'+posterObj.house.sellingPrice+'万'" />
							<l-painter-text
								css="position:absolute;left:355rpx;top:715rpx;color:#F94E4E;fontWeight:bold;fontSize:32rpx"
								:text="Math.ceil(posterObj.house.sellingPrice * 10000 / posterObj.house.propertyArea)+' 元/㎡'" />
						</view>
					</view>
					<l-painter-text v-else-if="housetype==4"
						css="position:absolute;left:55rpx;top:715rpx;color:#F94E4E;fontWeight:bold;fontSize:32rpx"
						:text="'租金：'+posterObj.house.rental +'元'" />
					<view v-else>
						<l-painter-text
							css="position:absolute;left:55rpx;top:715rpx;color:#F94E4E;fontWeight:bold;fontSize:32rpx"
							:text="'总价：'+posterObj.house.sellingPrice+'万'" />
						<l-painter-text
							css="position:absolute;left:355rpx;top:715rpx;color:#F94E4E;fontWeight:bold;fontSize:32rpx"
							:text="Math.ceil(posterObj.house.sellingPrice * 10000 / posterObj.house.propertyArea)+' 元/㎡'" />
					</view>

					<l-painter-image :src="posterObj.loginUser.user.avatar"
						css="position:absolute;left: 35rpx;top: 820rpx;width: 130rpx;height: 130rpx;border-radius:50%;border:5rpx;border-color:#FDE364;" />
					<l-painter-text
						css="color:#1A1A1A;position:absolute;left:190rpx;top:840rpx;fontWeight:bold;fontSize:30rpx"
						:text="posterObj.loginUser.user.nickName" />
					<l-painter-text css="position:absolute;left:190rpx;top:890rpx;color:#5555ff;fontSize:20rpx"
						:text="userInfo.companyDept.deptName" />
					<l-painter-image :src="'data:image/jpeg;base64,'+wxqrcode"
						css="position:absolute;left: 490rpx;top: 820rpx;background: #ff976a;width: 140rpx;height: 140rpx" />
					<l-painter-text
						css="position:absolute;left:490rpx;top:958rpx;color:#666;fontWeight:bold;fontSize:18rpx"
						text="扫码查看详细信息" />
					<l-painter-text
						css="position:absolute;left:190rpx;top:958rpx;color:#666666;fontWeight:bold;fontSize:18rpx"
						text="好房 优价 上天府网" />
				</l-painter-view>
			</l-painter>
			<tm-message ref="toast"></tm-message>
			<tm-scroll width="590" color='blue' :show-dot="false" style="margin-top: 40rpx;">
				<image v-for="(item,index) in posterObj.imgs" :key="index" @click="check(item)"
					style="width: 200rpx;height: 110rpx;margin-right: 10rpx;" :src="item.tp" mode="aspectFill"></image>
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
				<text @click="closePopup">关闭</text>
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
		getphoneCode,
		wxtest
	} from '@/api/houst.js'
	var siteConfig = uni.getStorageSync('siteConfigs')
	export default {
		dicts: ['tfw_property_type', 'tfw_decoration_situation', 'tfw_housing_orientation', 'tfw_ecommendation_level'],
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
				show_1: false,
				showP: false,
				pos: 'center',
				showInput: false,
				posInput: 'bottom',
				show_poster: false, //显示海报
				path: '', //生成的图片地址
				posterObj: {}, //画板数据
				footer_arr: [
					'https://cdn.tianfucd.com/images/applet/poster/icon/default.png',
					'https://cdn.tianfucd.com/images/applet/poster/icon/jianyue.png',
					'https://cdn.tianfucd.com/images/applet/poster/icon/heijin.png',
					'https://cdn.tianfucd.com/images/applet/poster/icon/jianbian.png',
					'https://cdn.tianfucd.com/images/applet/poster/icon/huoli.png',
					'https://cdn.tianfucd.com/images/applet/poster/icon/more.png'
				], //底部选项
				check_idx: 0, //底部选中的下标
				wxqrcode: "",
				style: 'Default',
				color: '#333333',
				fangid: null,
				housetype: null,
				userInfo: null,
			}
		},
		onLoad(option) {
			uni.loadFontFace({
				family: 'SHUZI',
				source: 'url("https://cdn.tianfucd.com/agent/fonts/PangMenZhengDao-Regular.woff")',
				success(e) {
					console.log('success', e)
				}
			})
			this.fangid = option.id
			this.userInfo = this.$store.state.user.userdata
			console.log(this.$store.state.user.userdata, "userdata");
			this.housetype = option.type
			// this.$nextTick(()=>{
			// 	this.$refs.toast.show({model:'load',mask:true})
			// })
		},
		onShow() {
			this.getShareInfo()
		},
		methods: {
			check(item) {
				console.log(item.tp);
				console.log(item.tp.split('https://static.tianfucd.com/'));

				this.posterObj.house.coverfile = item.tp.split('https://static.tianfucd.com/')[1]
			},
			// 计算满五
			getfivenear(date_1) {
				// 计算两个日期之间的差值
				let totalDays, diffDate
				let myDate_1 = Date.parse(date_1)
				let date_2 = new Date()
				let myDate_2 = Date.parse(date_2)
				// 将两个日期都转换为毫秒格式，然后做差
				diffDate = Math.abs(myDate_1 - myDate_2) // 取相差毫秒数的绝对值
				totalDays = Math.floor(diffDate / (1000 * 3600 * 24)) // 向下取整
				let result;
				if (totalDays >= 365 * 5) {
					result = "满五";
				} else if (totalDays >= 365 * 2) {
					result = "满二";
				} else {
					result = "不满二";
				}
				return result;
			},
			/*获取小程序码*/
			getWxacode() {
				let that = this
				let map = "id=" + this.fangid
				wxtest({
					page: "pagesHouse/houseid/houseid",
					scene: map
				}).then(res => {
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
				getphoneCode({
					id: that.fangid,
				}).then(res => {
					console.log(res, "sssssss");
					that.setData({
						posterObj: res,
						showP: true
					})
					this.getWxacode()
					// #ifdef MP-WEIXIN
					// this.getWxacode()
					// #endif
					// #ifdef H5
					that.$nextTick(() => {
						that.$refs.toast.hide()
					})
					// #endif
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
			getImg(r) {

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
						that.style = 'Simplicity'
						isLad = true
						break;
					case 2:
						that.style = 'BlackGold'
						isLad = true
						break;
					case 3:
						that.style = 'Gradient'
						isLad = true
						break;
					case 4:
						that.style = 'Vitality'
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
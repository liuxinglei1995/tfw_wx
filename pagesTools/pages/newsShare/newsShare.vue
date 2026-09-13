<template>
	<view class="page">
		<tm-menubars title="资讯分享" iconColor="white"></tm-menubars>
		<view class="poster" v-if="!show_poster">
			<l-painter ref="painter" v-if="style == 'Default'">
				<l-painter-view css="background: #FFF;height: 995rpx; width: 670rpx;borderRadius: 20rpx">
					<l-painter-image
						:src="'https://static.tianfucd.com/img/share/news/'+style+'/bg.png'"
						css="position:absolute;left: 0rpx;top: 0rpx;height: 995rpx; width: 670rpx;borderRadius: 20rpx"
					/>
					<l-painter-image
						:src="'https://static.tianfucd.com/img/share/news/'+style+'/logo.png'"
						css="position:absolute;left: 30rpx;top: 50rpx;background: #ff976a;width: 184rpx;height: 50rpx"
					/>
					<l-painter-view css="position:absolute;right:-0rpx;top:5rpx;marginRight:30rpx;width:320rpx;">
						<l-painter-view css="width:140rpx;textAlign:center;fontSize:24rpx;">
							<l-painter-view css="marginRight:10rpx;">
								<l-painter-text
									css="fontSize:60rpx;fontFamily: SHUZI;lineHeight:60rpx"
									:text="posterObj.this_day"/>
								<l-painter-text
									css="marginTop:30rpx;marginLeft:5rpx;"
									text="日"/>
							</l-painter-view>
							<l-painter-text 
								css="marginRight:10rpx;"
								:text="posterObj.this_month"/>
						</l-painter-view>
						<l-painter-view css="position:absolute;right:168rpx;top:6rpx;textAlign:center;width:2rpx;height:100rpx;background: #000;"></l-painter-view>
						<l-painter-view css="position:absolute;right:-0rpx;top:6rpx;width:150rpx;textAlign:left;fontSize:24rpx;">
							<l-painter-text
								css="marginRight:10rpx;"
								:text="posterObj.this_week"/>
							<l-painter-text
								css="marginRight:10rpx;"
								:text="posterObj.weather.temperature + ' ℃ ' + posterObj.weather.weather"/>
							<l-painter-text 
								css="marginRight:10rpx;"
								:text='"农历"+posterObj.lunar[1]+posterObj.lunar[2]'/>
						</l-painter-view>
					</l-painter-view>
					<l-painter-image
						:src="posterObj.imgs[0]"
						css="position:absolute;left: 30rpx;top: 130rpx;width: 610rpx;height: 380rpx;object-fit:cover"
					/>
					<l-painter-view css="position:absolute;background: #FFF;left: 30rpx;top: 510rpx;width: 610rpx;height: 260rpx"/>
					<l-painter-text
						css="position:absolute;left:100rpx;top:520rpx;width: 470rpx;color:#000;fontWeight:bold;fontSize:36rpx;line-clamp:1;text-align:center"
						:text="posterObj.tit"/>
					<l-painter-text
						css="position:absolute;left:55rpx;top:580rpx;width: 570rpx;color:#666;fontSize:24rpx;line-clamp:5;"
						:text="posterObj.wdes" />
					<l-painter-image
						:src="posterObj.avatar_file"
						css="position:absolute;left: 35rpx;top: 795rpx;width: 130rpx;height: 130rpx;border-radius:50%;border:5rpx;border-color:#FFF;"
					/>
					<l-painter-text
						css="position:absolute;left:190rpx;top:800rpx;color:#666;fontWeight:bold;fontSize:30rpx"
						:text="posterObj.uname" />
					<l-painter-text
						css="position:absolute;left:190rpx;top:850rpx;color:#666;fontWeight:bold;fontSize:26rpx"
						:text="'服务总计 '+posterObj.djl+' 人'" />
					<l-painter-text
						css="position:absolute;left:190rpx;top:900rpx;color:#666;fontWeight:bold;fontSize:18rpx"
						text="上自家店 实在" />
					<l-painter-text
						css="position:absolute;left:190rpx;top:925rpx;color:#666;fontWeight:bold;fontSize:18rpx"
						text="好房 优价 上天府网" />
					<l-painter-image
						:src="wxqrcode"
						css="position:absolute;left: 480rpx;top: 790rpx;background: #ff976a;width: 150rpx;height: 150rpx"
					/>
					<l-painter-text
						css="position:absolute;left:488rpx;top:950rpx;color:#666;fontWeight:bold;fontSize:18rpx"
						text="扫码查看详细信息" />
				</l-painter-view>
			</l-painter>
			<l-painter ref="painter" v-if="style == 'Simplicity'">
			    <l-painter-view css="background: #FFF;height: 995rpx; width: 670rpx;borderRadius: 20rpx">
					<l-painter-image
						:src="'https://static.tianfucd.com/img/share/news/'+style+'/bg.png'"
						css="position:absolute;left: 0rpx;top: 0rpx;height: 995rpx; width: 670rpx;borderRadius: 20rpx"
					/>
					<l-painter-image
						:src="'https://static.tianfucd.com/img/share/news/'+style+'/logo.png'"
						css="position:absolute;left: 30rpx;top: 50rpx;background: #ff976a;width: 184rpx;height: 50rpx"
					/>
					<l-painter-view css="position:absolute;right:-0rpx;top:5rpx;marginRight:30rpx;width:320rpx;">
						<l-painter-view css="width:140rpx;textAlign:center;fontSize:24rpx;">
							<l-painter-view css="marginRight:10rpx;">
								<l-painter-text
									css="fontSize:60rpx;fontFamily: SHUZI;lineHeight:60rpx"
									:text="posterObj.this_day"/>
								<l-painter-text
									css="marginTop:30rpx;marginLeft:5rpx;"
									text="日"/>
							</l-painter-view>
							<l-painter-text 
								css="marginRight:10rpx;"
								:text="posterObj.this_month"/>
						</l-painter-view>
						<l-painter-view css="position:absolute;right:168rpx;top:6rpx;textAlign:center;width:2rpx;height:100rpx;background: #000;"></l-painter-view>
						<l-painter-view css="position:absolute;right:-0rpx;top:6rpx;width:150rpx;textAlign:left;fontSize:24rpx;">
							<l-painter-text
								css="marginRight:10rpx;"
								:text="posterObj.this_week"/>
							<l-painter-text
								css="marginRight:10rpx;"
								:text="posterObj.weather.temperature + ' ℃ ' + posterObj.weather.weather"/>
							<l-painter-text 
								css="marginRight:10rpx;"
								:text='"农历"+posterObj.lunar[1]+posterObj.lunar[2]'/>
						</l-painter-view>
					</l-painter-view>
					<l-painter-image
						:src="posterObj.imgs[0]"
						css="position:absolute;left: 30rpx;top: 130rpx;width: 610rpx;height: 380rpx;object-fit:cover"
					/>
					<l-painter-view css="position:absolute;background: #FFF;left: 30rpx;top: 510rpx;width: 610rpx;height: 260rpx"/>
					<l-painter-text
						css="position:absolute;left:100rpx;top:520rpx;width: 470rpx;color:#000;fontWeight:bold;fontSize:36rpx;line-clamp:1;text-align:center"
						:text="posterObj.tit"/>
					<l-painter-text
						css="position:absolute;left:55rpx;top:580rpx;width: 570rpx;color:#666;fontSize:24rpx;line-clamp:5;"
						:text="posterObj.wdes" />
					<l-painter-image
						:src="posterObj.avatar_file"
						css="position:absolute;left: 35rpx;top: 795rpx;width: 130rpx;height: 130rpx;border-radius:50%;border:5rpx;border-color:#FFF;"
					/>
					<l-painter-text
						css="color:#333333;position:absolute;left:190rpx;top:810rpx;fontWeight:bold;fontSize:30rpx"
						:text="posterObj.uname" />
					<l-painter-text
						css="color:#666666;position:absolute;left:190rpx;top:860rpx;fontWeight:bold;fontSize:26rpx"
						:text="'服务总计 '+posterObj.djl+' 人'" />
					</l-painter-view>
					<l-painter-image
						:src="wxqrcode"
						css="position:absolute;left: 490rpx;top: 780rpx;background: #ff976a;width: 130rpx;height: 130rpx"
					/>
					<l-painter-text
						css="color:#666666;position:absolute;left:488rpx;top:915rpx;fontWeight:bold;fontSize:18rpx"
						text="扫码查看详细信息" />
					<l-painter-text
						css="color:#666666;position:absolute;top:957rpx;width:100%;text-align:center;fontWeight:bold;fontSize:18rpx"
						text="上自家店 实在 好房 优价 上天府网" />
				</l-painter-view>
			</l-painter>
			<l-painter ref="painter" v-if="style == 'BlackGold'">
			    <l-painter-view css="background: #FFF;height: 995rpx; width: 670rpx;borderRadius: 20rpx">
					<l-painter-image
						:src="'https://static.tianfucd.com/img/share/news/'+style+'/bg.png'"
						css="position:absolute;left: 0rpx;top: 0rpx;height: 995rpx; width: 670rpx;borderRadius: 20rpx"
					/>
					<l-painter-image
						:src="'https://static.tianfucd.com/img/share/news/'+style+'/logo.png'"
						css="position:absolute;left: 30rpx;top: 50rpx;background: #ff976a;width: 184rpx;height: 50rpx"
					/>
					<l-painter-view css="position:absolute;right:-0rpx;top:5rpx;marginRight:30rpx;width:320rpx;color:#FFF">
						<l-painter-view css="width:140rpx;textAlign:center;fontSize:24rpx;">
							<l-painter-view css="marginRight:10rpx;">
								<l-painter-text
									css="fontSize:60rpx;fontFamily: SHUZI;lineHeight:60rpx"
									:text="posterObj.this_day"/>
								<l-painter-text
									css="marginTop:30rpx;marginLeft:5rpx;"
									text="日"/>
							</l-painter-view>
							<l-painter-text 
								css="marginRight:10rpx;"
								:text="posterObj.this_month"/>
						</l-painter-view>
						<l-painter-view css="position:absolute;right:168rpx;top:6rpx;textAlign:center;width:2rpx;height:100rpx;background: #FFF;"></l-painter-view>
						<l-painter-view css="position:absolute;right:-0rpx;top:6rpx;width:150rpx;textAlign:left;fontSize:24rpx;">
							<l-painter-text
								css="marginRight:10rpx;"
								:text="posterObj.this_week"/>
							<l-painter-text
								css="marginRight:10rpx;"
								:text="posterObj.weather.temperature + ' ℃ ' + posterObj.weather.weather"/>
							<l-painter-text 
								css="marginRight:10rpx;"
								:text='"农历"+posterObj.lunar[1]+posterObj.lunar[2]'/>
						</l-painter-view>
					</l-painter-view>
					<l-painter-image
						:src="posterObj.imgs[0]"
						css="position:absolute;left: 30rpx;top: 130rpx;width: 610rpx;height: 380rpx;object-fit:cover"
					/>
					<l-painter-view css="position:absolute;background: #FFF;left: 30rpx;top: 510rpx;width: 610rpx;height: 260rpx"/>
					<l-painter-text
						css="position:absolute;left:100rpx;top:520rpx;width: 470rpx;color:#000;fontWeight:bold;fontSize:36rpx;line-clamp:1;text-align:center"
						:text="posterObj.tit"/>
					<l-painter-text
						css="position:absolute;left:55rpx;top:580rpx;width: 570rpx;color:#666;fontSize:24rpx;line-clamp:5;"
						:text="posterObj.wdes" />
					<l-painter-image
						:src="posterObj.avatar_file"
						css="position:absolute;left: 35rpx;top: 795rpx;width: 130rpx;height: 130rpx;border-radius:50%;border:5rpx;border-color:#FDE364;"
					/>
					<l-painter-text
						css="color:#F2F2F2;position:absolute;left:190rpx;top:810rpx;fontWeight:bold;fontSize:30rpx"
						:text="posterObj.uname" />
					<l-painter-text
						css="color:#CCCCCC;position:absolute;left:190rpx;top:860rpx;fontWeight:bold;fontSize:26rpx"
						:text="'服务总计 '+posterObj.djl+' 人'" />
					<l-painter-view
						css="position:absolute;background: #FFF;left: 487rpx;top: 780rpx;width: 140rpx;height: 140rpx;">
					</l-painter-view>
					<l-painter-image
						:src="wxqrcode"
						css="position:absolute;left: 490rpx;top: 783rpx;background: #ff976a;width: 130rpx;height: 130rpx"
					/>
					<l-painter-text
						css="color:#CCCCCC;position:absolute;left:488rpx;top:925rpx;fontWeight:bold;fontSize:18rpx"
						text="扫码查看详细信息" />
					<l-painter-text
						css="color:#CCCCCC;position:absolute;top:957rpx;width:100%;text-align:center;fontWeight:bold;fontSize:18rpx"
						text="上自家店 实在 好房 优价 上天府网" />
				</l-painter-view>
			</l-painter>
			<l-painter ref="painter" v-if="style == 'Gradient'">
			    <l-painter-view css="background: #FFF;height: 995rpx; width: 670rpx;borderRadius: 20rpx">
					<l-painter-image
						:src="'https://static.tianfucd.com/img/share/news/'+style+'/bg.png'"
						css="position:absolute;left: 0rpx;top: 0rpx;height: 995rpx; width: 670rpx;borderRadius: 20rpx"
					/>
					<l-painter-image
						:src="'https://static.tianfucd.com/img/share/news/'+style+'/logo.png'"
						css="position:absolute;left: 30rpx;top: 50rpx;background: #ff976a;width: 184rpx;height: 50rpx"
					/>
					<l-painter-view css="position:absolute;right:-0rpx;top:5rpx;marginRight:30rpx;width:320rpx;">
						<l-painter-view css="width:140rpx;textAlign:center;fontSize:24rpx;">
							<l-painter-view css="marginRight:10rpx;">
								<l-painter-text
									css="fontSize:60rpx;fontFamily: SHUZI;lineHeight:60rpx"
									:text="posterObj.this_day"/>
								<l-painter-text
									css="marginTop:30rpx;marginLeft:5rpx;"
									text="日"/>
							</l-painter-view>
							<l-painter-text 
								css="marginRight:10rpx;"
								:text="posterObj.this_month"/>
						</l-painter-view>
						<l-painter-view css="position:absolute;right:168rpx;top:6rpx;textAlign:center;width:2rpx;height:100rpx;background: #000;"></l-painter-view>
						<l-painter-view css="position:absolute;right:-0rpx;top:6rpx;width:150rpx;textAlign:left;fontSize:24rpx;">
							<l-painter-text
								css="marginRight:10rpx;"
								:text="posterObj.this_week"/>
							<l-painter-text
								css="marginRight:10rpx;"
								:text="posterObj.weather.temperature + ' ℃ ' + posterObj.weather.weather"/>
							<l-painter-text 
								css="marginRight:10rpx;"
								:text='"农历"+posterObj.lunar[1]+posterObj.lunar[2]'/>
						</l-painter-view>
					</l-painter-view>
					<l-painter-image
						:src="posterObj.imgs[0]"
						css="position:absolute;left: 30rpx;top: 130rpx;width: 610rpx;height: 380rpx;object-fit:cover"
					/>
					<l-painter-view css="position:absolute;background: #FFF;left: 30rpx;top: 510rpx;width: 610rpx;height: 260rpx"/>
					<l-painter-text
						css="position:absolute;left:100rpx;top:520rpx;width: 470rpx;color:#000;fontWeight:bold;fontSize:36rpx;line-clamp:1;text-align:center"
						:text="posterObj.tit"/>
					<l-painter-text
						css="position:absolute;left:55rpx;top:580rpx;width: 570rpx;color:#666;fontSize:24rpx;line-clamp:5;"
						:text="posterObj.wdes" />
					<l-painter-image
						:src="posterObj.avatar_file"
						css="position:absolute;left: 35rpx;top: 795rpx;width: 130rpx;height: 130rpx;border-radius:50%;border:5rpx;border-color:#FFFFFF;"
					/>
					<l-painter-text
						css="color:#1A1A1A;position:absolute;left:190rpx;top:810rpx;fontWeight:bold;fontSize:30rpx"
						:text="posterObj.uname" />
					<l-painter-text
						css="color:#4D4D4D;position:absolute;left:190rpx;top:860rpx;fontWeight:bold;fontSize:26rpx"
						:text="'服务总计 '+posterObj.djl+' 人'" />
					
					<l-painter-view
						css="position:absolute;background: #FFF;left: 487rpx;top: 780rpx;width: 140rpx;height: 140rpx;">
					</l-painter-view>
					<l-painter-image
						:src="wxqrcode"
						css="position:absolute;left: 490rpx;top: 783rpx;background: #ff976a;width: 130rpx;height: 130rpx"
					/>
					<l-painter-text
						css="color:#4D4D4D;position:absolute;left:488rpx;top:925rpx;fontWeight:bold;fontSize:18rpx"
						text="扫码查看详细信息" />
					<l-painter-text
						css="color:#4D4D4D;position:absolute;top:957rpx;width:100%;text-align:center;fontWeight:bold;fontSize:18rpx"
						text="上自家店 实在 好房 优价 上天府网" />
				</l-painter-view>
			</l-painter>
			<l-painter ref="painter" v-if="style == 'Vitality'">
			    <l-painter-view css="background: #FFF;height: 995rpx; width: 670rpx;borderRadius: 20rpx">
					<l-painter-image
						:src="'https://static.tianfucd.com/img/share/news/'+style+'/bg.png'"
						css="position:absolute;left: 0rpx;top: 0rpx;height: 995rpx; width: 670rpx;borderRadius: 20rpx"
					/>
					<l-painter-image
						:src="'https://static.tianfucd.com/img/share/news/'+style+'/logo.png'"
						css="position:absolute;left: 30rpx;top: 50rpx;background: #ff976a;width: 184rpx;height: 50rpx"
					/>
					<l-painter-view css="position:absolute;right:-0rpx;top:5rpx;marginRight:30rpx;width:320rpx;">
						<l-painter-view css="width:140rpx;textAlign:center;fontSize:24rpx;">
							<l-painter-view css="marginRight:10rpx;">
								<l-painter-text
									css="fontSize:60rpx;fontFamily: SHUZI;lineHeight:60rpx"
									:text="posterObj.this_day"/>
								<l-painter-text
									css="marginTop:30rpx;marginLeft:5rpx;"
									text="日"/>
							</l-painter-view>
							<l-painter-text 
								css="marginRight:10rpx;"
								:text="posterObj.this_month"/>
						</l-painter-view>
						<l-painter-view css="position:absolute;right:168rpx;top:6rpx;textAlign:center;width:2rpx;height:100rpx;background: #000;"></l-painter-view>
						<l-painter-view css="position:absolute;right:-0rpx;top:6rpx;width:150rpx;textAlign:left;fontSize:24rpx;">
							<l-painter-text
								css="marginRight:10rpx;"
								:text="posterObj.this_week"/>
							<l-painter-text
								css="marginRight:10rpx;"
								:text="posterObj.weather.temperature + ' ℃ ' + posterObj.weather.weather"/>
							<l-painter-text 
								css="marginRight:10rpx;"
								:text='"农历"+posterObj.lunar[1]+posterObj.lunar[2]'/>
						</l-painter-view>
					</l-painter-view>
					<l-painter-image
						:src="posterObj.imgs[0]"
						css="position:absolute;left: 30rpx;top: 130rpx;width: 610rpx;height: 380rpx;object-fit:cover"
					/>
					<l-painter-view css="position:absolute;background: #FFF;left: 30rpx;top: 510rpx;width: 610rpx;height: 260rpx"/>
					<l-painter-text
						css="position:absolute;left:100rpx;top:520rpx;width: 470rpx;color:#000;fontWeight:bold;fontSize:36rpx;line-clamp:1;text-align:center"
						:text="posterObj.tit"/>
					<l-painter-text
						css="position:absolute;left:55rpx;top:580rpx;width: 570rpx;color:#666;fontSize:24rpx;line-clamp:5;"
						:text="posterObj.wdes" />
					<l-painter-image
						:src="posterObj.avatar_file"
						css="position:absolute;left: 35rpx;top: 795rpx;width: 130rpx;height: 130rpx;border-radius:50%;border:5rpx;border-color:#FDE364;"
					/>
					<l-painter-text
						css="color:#1A1A1A;position:absolute;left:190rpx;top:810rpx;fontWeight:bold;fontSize:30rpx"
						:text="posterObj.uname" />
					<l-painter-text
						css="color:#4D4D4D;position:absolute;left:190rpx;top:860rpx;fontWeight:bold;fontSize:26rpx"
						:text="'服务总计 '+posterObj.djl+' 人'" />
					<l-painter-view
						css="position:absolute;background: #FFF;left: 487rpx;top: 780rpx;width: 140rpx;height: 140rpx;">
					</l-painter-view>
					<l-painter-image
						:src="wxqrcode"
						css="position:absolute;left: 490rpx;top: 783rpx;background: #ff976a;width: 130rpx;height: 130rpx"
					/>
					<l-painter-text
						css="color:#4D4D4D;position:absolute;left:488rpx;top:925rpx;fontWeight:bold;fontSize:18rpx"
						text="扫码查看详细信息" />
					<l-painter-text
						css="color:#4D4D4D;position:absolute;top:957rpx;width:100%;text-align:center;fontWeight:bold;fontSize:18rpx"
						text="上自家店 实在 好房 优价 上天府网" />
				</l-painter-view>
			</l-painter>
			<l-painter ref="painter" v-if="style == 'Dazzle'">
			    <l-painter-view css="background: #FFF;height: 995rpx; width: 670rpx;borderRadius: 20rpx">
					<l-painter-image
						:src="'https://static.tianfucd.com/img/share/news/'+style+'/bg.png'"
						css="position:absolute;left: 0rpx;top: 0rpx;height: 995rpx; width: 670rpx;borderRadius: 20rpx"
					/>
					<l-painter-image
						:src="'https://static.tianfucd.com/img/share/news/'+style+'/logo.png'"
						css="position:absolute;left: 30rpx;top: 50rpx;background: #ff976a;width: 184rpx;height: 50rpx"
					/>
					<l-painter-view css="position:absolute;right:-0rpx;top:5rpx;marginRight:30rpx;width:320rpx;">
						<l-painter-view css="width:140rpx;textAlign:center;fontSize:24rpx;">
							<l-painter-view css="marginRight:10rpx;">
								<l-painter-text
									css="fontSize:60rpx;fontFamily: SHUZI;lineHeight:60rpx"
									:text="posterObj.this_day"/>
								<l-painter-text
									css="marginTop:30rpx;marginLeft:5rpx;"
									text="日"/>
							</l-painter-view>
							<l-painter-text 
								css="marginRight:10rpx;"
								:text="posterObj.this_month"/>
						</l-painter-view>
						<l-painter-view css="position:absolute;right:168rpx;top:6rpx;textAlign:center;width:2rpx;height:100rpx;background: #000;"></l-painter-view>
						<l-painter-view css="position:absolute;right:-0rpx;top:6rpx;width:150rpx;textAlign:left;fontSize:24rpx;">
							<l-painter-text
								css="marginRight:10rpx;"
								:text="posterObj.this_week"/>
							<l-painter-text
								css="marginRight:10rpx;"
								:text="posterObj.weather.temperature + ' ℃ ' + posterObj.weather.weather"/>
							<l-painter-text 
								css="marginRight:10rpx;"
								:text='"农历"+posterObj.lunar[1]+posterObj.lunar[2]'/>
						</l-painter-view>
					</l-painter-view>
					<l-painter-image
						:src="posterObj.imgs[0]"
						css="position:absolute;left: 30rpx;top: 130rpx;width: 610rpx;height: 380rpx;object-fit:cover"
					/>
					<l-painter-view css="position:absolute;background: #FFF;left: 30rpx;top: 510rpx;width: 610rpx;height: 460rpx"/>
					<l-painter-view css="position:absolute;background: #EC5786;left: 40rpx;top: 790rpx;width: 590rpx;height: 158rpx;radius:10rpx;">
						<l-painter-view css="background: #FFF;position:absolute;left:138rpx;marginTop:22rpx;width: 116rpx;height: 116rpx;">
							<l-painter-image
								:src="wxqrcode"
								css="background: #ff976a;width: 116rpx;height: 116rpx"
							/>
						</l-painter-view>
						<l-painter-view css="position:absolute;left:284rpx;marginTop:22rpx;">
							<l-painter-view>
								<l-painter-text
									css="color:#FFFFFF;fontSize:30rpx;fontWeight: bold;lineHeight:55rpx"
									text="扫一扫"/>
							</l-painter-view>
							<l-painter-view>
								<l-painter-text
									css="color:#FFFFFF;fontSize:24rpx;lineHeight:32rpx;"
									text="详情扫码查看\n更多咨询进入小程序"/>
							</l-painter-view>
						</l-painter-view>
					</l-painter-view>
					<l-painter-text
						css="position:absolute;left:100rpx;top:520rpx;width: 470rpx;color:#000;fontWeight:bold;fontSize:36rpx;line-clamp:1;text-align:center"
						:text="posterObj.tit"/>
					<l-painter-text
						css="position:absolute;left:55rpx;top:580rpx;width: 570rpx;color:#666;fontSize:24rpx;line-clamp:5;"
						:text="posterObj.wdes" />
				</l-painter-view>
			</l-painter>
			<l-painter ref="painter" v-if="style == 'murkyBlack'">
			    <l-painter-view css="background: #FFF;height: 995rpx; width: 670rpx;borderRadius: 20rpx">
					<l-painter-image
						:src="'https://static.tianfucd.com/img/share/news/'+style+'/bg.png'"
						css="position:absolute;left: 0rpx;top: 0rpx;height: 995rpx; width: 670rpx;borderRadius: 20rpx"
					/>
					<l-painter-image
						:src="'https://static.tianfucd.com/img/share/news/'+style+'/logo.png'"
						css="position:absolute;left: 30rpx;top: 50rpx;background: #ff976a;width: 184rpx;height: 50rpx"
					/>
					<l-painter-view css="position:absolute;right:-0rpx;top:5rpx;marginRight:30rpx;width:320rpx;color:#FFF">
						<l-painter-view css="width:140rpx;textAlign:center;fontSize:24rpx;">
							<l-painter-view css="marginRight:10rpx;">
								<l-painter-text
									css="fontSize:60rpx;fontFamily: SHUZI;lineHeight:60rpx"
									:text="posterObj.this_day"/>
								<l-painter-text
									css="marginTop:30rpx;marginLeft:5rpx;"
									text="日"/>
							</l-painter-view>
							<l-painter-text 
								css="marginRight:10rpx;"
								:text="posterObj.this_month"/>
						</l-painter-view>
						<l-painter-view css="position:absolute;right:168rpx;top:6rpx;textAlign:center;width:2rpx;height:100rpx;background: #FFF;"></l-painter-view>
						<l-painter-view css="position:absolute;right:-0rpx;top:6rpx;width:150rpx;textAlign:left;fontSize:24rpx;">
							<l-painter-text
								css="marginRight:10rpx;"
								:text="posterObj.this_week"/>
							<l-painter-text
								css="marginRight:10rpx;"
								:text="posterObj.weather.temperature + ' ℃ ' + posterObj.weather.weather"/>
							<l-painter-text 
								css="marginRight:10rpx;"
								:text='"农历"+posterObj.lunar[1]+posterObj.lunar[2]'/>
						</l-painter-view>
					</l-painter-view>
					<l-painter-image
						:src="posterObj.imgs[0]"
						css="position:absolute;left: 30rpx;top: 130rpx;width: 610rpx;height: 380rpx;object-fit:cover"
					/>
					<l-painter-view css="position:absolute;background: #FFF;left: 30rpx;top: 510rpx;width: 610rpx;height: 260rpx"/>
					<l-painter-view css="position:absolute;left: 40rpx;top: 790rpx;width: 590rpx;height: 158rpx;radius:10rpx;">
						<l-painter-view css="background: #FFF;position:absolute;left:138rpx;marginTop:22rpx;width: 116rpx;height: 116rpx;">
							<l-painter-image
								:src="wxqrcode"
								css="background: #ff976a;width: 116rpx;height: 116rpx"
							/>
						</l-painter-view>
						<l-painter-view css="position:absolute;left:284rpx;marginTop:22rpx;">
							<l-painter-view>
								<l-painter-text
									css="color:#FFFFFF;fontSize:30rpx;fontWeight: bold;lineHeight:55rpx"
									text="扫一扫"/>
							</l-painter-view>
							<l-painter-view>
								<l-painter-text
									css="color:#FFFFFF;fontSize:24rpx;lineHeight:32rpx;"
									text="详情扫码查看\n更多咨询进入小程序"/>
							</l-painter-view>
						</l-painter-view>
					</l-painter-view>
					<l-painter-text
						css="position:absolute;left:100rpx;top:520rpx;width: 470rpx;color:#000;fontWeight:bold;fontSize:36rpx;line-clamp:1;text-align:center"
						:text="posterObj.tit"/>
					<l-painter-text
						css="position:absolute;left:55rpx;top:580rpx;width: 570rpx;color:#666;fontSize:24rpx;line-clamp:5;"
						:text="posterObj.wdes" />
					<l-painter-text
						css="color:#FFF;position:absolute;top:957rpx;width:100%;text-align:center;fontWeight:bold;fontSize:18rpx"
						text="上自家店 实在 好房 优价 上天府网" />
				</l-painter-view>
			</l-painter>
			
			<tm-message ref="toast"></tm-message>
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
	import {base64ToPath} from '../../components/lime-painter/utils.js';
	
	import lPainterView from '../../components/l-painter-view/l-painter-view.vue';
	import lPainterText from '../../components/l-painter-text/l-painter-text.vue';
	import lPainterImage from '../../components/l-painter-image/l-painter-image.vue';
	import lPainterQrcode from '../../components/l-painter-qrcode/l-painter-qrcode.vue';
	import lPainter from '../../components/l-painter/l-painter.vue';
	var siteConfig = uni.getStorageSync('siteConfigs')
	export default {
		components: {
			tmMaskFlow,tmInput,tmPoup,tmMessage,
			lPainterView,lPainterText,lPainterImage,lPainter,lPainterQrcode
		},
		data() {
			return {
				show_1: false,
				showP:false,
				pos: 'center',
				showInput:false,
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
					'https://cdn.tianfucd.com/images/applet/poster/icon/xuancai.png',
					'https://cdn.tianfucd.com/images/applet/poster/icon/mohei.png'
				], //底部选项
				check_idx: 0, //底部选中的下标
				
				wxqrcode:"",
				style:'Default',
				color : '#333333',
				// style:'Vitality'
			}
		},
		onLoad(option) {
			uni.loadFontFace({
				family: 'SHUZI',
				source: 'url("https://cdn.tianfucd.com/agent/fonts/PangMenZhengDao-Regular.woff")',
				success(e) {
					console.log('success',e)
				}
			})
			this.fangid = option.id
			this.$nextTick(()=>{
				this.$refs.toast.show({model:'load',mask:true})
			})
			// #ifdef MP-WEIXIN
			this.getWxacode()
			// #endif
		},
		onShow() {
			this.getShareInfo()
		},
		methods: {
			/*获取小程序码*/
			getWxacode() {
				let that = this
				that.$apis.getShareQrcode({
					page:'pages/newDetail/newDetail',
					scene:that.fangid
				}).then(res => {
					base64ToPath(res).then(path => {
						that.setData({
							wxqrcode: path
						})
						that.$nextTick(()=>{
							that.$refs.toast.hide()
						})
					}).catch(error => {
						console.error(error)
					})
				})
			},
			getShareInfo:function(){
				let that = this
				that.$apis.getNewsShareInfo({
					'id': that.fangid,
					'area':uni.getStorageSync('cityCode')
				}).then(res => {
					if (res != '' && res != null) {
						that.setData({
							posterObj: res,
							showP: true,
						})
					}
				})
			},
			back:function(){
				uni.navigateBack({
					delta:1
				})
			},
			/**
			 * 点击预览图开始录入
			 */
			clickInput:function(){
				let that = this
				that.setData({
					showInput:true
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
					case 5:
						that.style = 'Dazzle'
						isLad = true
						break;
					case 6:
						that.style = 'murkyBlack'
						isLad = true
						break;
					default:
						uni.showToast({
							icon:'none',
							title:'敬请期待'
						})
						break;
				}
				if(isLad){
					this.check_idx = index;
					uni.showLoading({
						title: '加载中'
					});
					setTimeout(function () {
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

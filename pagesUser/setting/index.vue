<template>
	<view class="">
		<tm-menubars title="个人设置" iconColor="white"></tm-menubars>
		<tm-listitem :left-icon-size="80" :dense="true" value="打开" title="个人信息" label="查看与设置账户基本信息"
			left-icon="icon-user-fill" show-left-icon></tm-listitem>
		<tm-listitem :left-icon-size="80" :dense="true" value="" title="会员等级" left-icon-color="pink" label="查看当前账户等级信息"
			show-left-icon></tm-listitem>
		<tm-listitem v-if="passAudit != 1" :left-icon-size="80" :dense="true" :value="realAuthTip" title="实名认证"
			label="实名认证后才能发布房源" left-icon="icon-supervise" left-icon-color="green" show-left-icon></tm-listitem>
		<tm-listitem v-if="passAudit != 1" :left-icon-size="80" :dense="true" :value="PhoneAuthTip" title="手机认证"
			label="手机认证后才能发布房源" left-icon="icon-phone" left-icon-color="green" show-left-icon></tm-listitem>
		<tm-listitem :left-icon-size="80" :dense="true" value="" title="修改头像" label="请上传着正装照片" left-icon="icon-picture"
			left-icon-color="green" show-left-icon></tm-listitem>

		<tm-listitem @tap="toPath('password')" :left-icon-size="80" :dense="true" value="" title="修改密码"
			label="微信用户请先修改密码" left-icon="icon-key" left-icon-color="green" show-left-icon></tm-listitem>
		<tm-listitem title="关于天府网" left-icon="icon-question-circle-fill" show-left-icon left-icon-color="green"
			:dense="true"></tm-listitem>
		<tm-listitem @tap="logOut" title="退出登录" left-icon="icon-lock" show-left-icon left-icon-color="green"
			:dense="true"></tm-listitem>
	</view>
</template>

<script>
	import tmGrouplist from '@/pagesUser/tm-vuetify/components/tm-grouplist/tm-grouplist.vue'
	import tmListitem from '@/pagesUser/tm-vuetify/components/tm-listitem/tm-listitem.vue'
	export default {
		components: {
			tmGrouplist,
			tmListitem
		},
		data() {
			return {
				realAuthTip: '',
				PhoneAuthTip: '',
				passAudit: uni.getStorageSync('passAudit'),
			}
		},
		onShow() {
			/**
			 * 查询实名状态以及手机认证状态
			 */
			let that = this
			that.$apis.userAuthInfo({})
				.then(res => {
					let realAuthTip = ''
					switch (res.isVerified) {
						case 0:
							realAuthTip = '审核中'
							break;
						case 1:
							realAuthTip = '已认证'
							break;
						case 2:
							realAuthTip = '认证失败'
							break;
						case 3:
							realAuthTip = '未提交'
							break;
					}
					let PhoneAuthTip = ''
					switch (res.isPhoneAuth) {
						case 0:
							PhoneAuthTip = '未认证'
							break;
						case 1:
							PhoneAuthTip = '已认证'
							break;
					}
					that.setData({
						realAuthTip: realAuthTip,
						PhoneAuthTip: PhoneAuthTip
					})
				})
		},
		methods: {
			/**
			 * 退出登录
			 */
			logOut() {
				this.showConfirm("确认退出登录吗?")
					.then(res => {
						if (res.confirm) {
							this.$store.dispatch('user/LogOut')
								.then(res => {
									this.$tab.navigateTo('/pagesUser/login/login')
								});
						}
					})
			},
			/**
			 * 跳转页面
			 */
			toPath: function(path) {
				uni.navigateTo({
					url: path
				})
			},
		}
	}
</script>

<style>
</style>

<template>
	<view class="">
		<tm-menubars title="密码设置" iconColor="white"></tm-menubars>
		<tm-sheet v-if="show" color="bg-gradient-orange-accent">
			<view class="text-size-s text-weight-b mb-24">
				检测到您尚未设置登录密码，为保证您的账户安全，请完善登陆密码！
			</view>
		</tm-sheet>
		<tm-sheet :shadow="24">
			<tm-input
			v-if="!show"
			bg-color="grey-lighten-5" 
			:border-bottom="false" 
			input-type="password" 
			required 
			title-class="text-size-n text-weight-b text-primary" 
			title="原密码" 
			prefixp-icon="icon-lock" 
			:vertical="true" 
			:verify='checkOldPass'
			v-model="oldPass"
			placeholder="请输入原密码"></tm-input>
			<tm-input 
			bg-color="grey-lighten-5" 
			:border-bottom="false" 
			input-type="password" 
			required 
			title-class="text-size-n text-weight-b text-primary" 
			title="登陆密码" 
			prefixp-icon="icon-lock" 
			:vertical="true" 
			:verify='checkPass'
			v-model="pass"
			placeholder="请输入登陆密码"></tm-input>
			<tm-input 
			bg-color="grey-lighten-5" 
			:border-bottom="false" 
			input-type="password" 
			required 
			title-class="text-size-n text-weight-b text-primary" 
			prefixp-icon="icon-lock" 
			title="确认密码"  
			:vertical="true" 
			:verify='checkPass'
			v-model="confirm"
			placeholder="请确认密码"></tm-input>
			<tm-button class="mt-30 mx-20" @tap="changePass" theme="bg-gradient-orange-accent" :round="24" block>修改密码</tm-button>
		</tm-sheet>
	</view>
</template>

<script>
	import tmSheet from '@/tm-vuetify/components/tm-sheet/tm-sheet.vue'
	import tmInput from '@/tm-vuetify/components/tm-input/tm-input.vue'
	import tmButton from '@/tm-vuetify/components/tm-button/tm-button.vue'
	export default {
		components: {
			tmSheet,tmInput,tmButton
		},
		data() {
			return {
				show:false,
				oldPass:'',
				pass:'',
				confirm:'',
				
			}
		},
		onShow() {
			/**
			 * 查询实名状态以及手机认证状态
			 */
			let that = this
			that.$apis.getUserPass({})
				.then(res => {
					if(res == 'true'){
						that.show = false
					}else{
						that.show = true
					}
				})
		},
		methods: {
			checkPass:function(pass) {
				var regex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}');
				return (pass) => {
					return {
						check: !regex.test(pass) ? false : true,
						text: "您的密码复杂度太低（密码必须为8-30位字母、数字组合）！"
					};
				}
			},
			checkOldPass:function(pass) {
				return (pass) => {
					return {
						check: pass.length < 6 ? false : true,
						text: "长度应大于6位！"
					};
				}
			},
			changePass:function(){
				let that = this
				if(that.pass != that.confirm){
					uni.showToast({
						icon:"error",
						title:"密码不一致"
					})
				}else{
					that.$apis.setUserPass({
						oldPass:that.oldPass,
						pass:that.pass,
						confirm:that.confirm
					}).then(res => {
						uni.showToast({
							icon:"success",
							title:"设置成功"
						})
					})
				}
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

<template>
	<view class="box">
		<view class="bg">
			<image src="../../static/image/jing.png" />
		</view>
		<view class="login-box">
			<u--form labelPosition="left" :model="corporationsData" :rules="rules" ref="corporationsData"
				labelAlign="right" labelWidth="0">
				<u-form-item prop="mobile">
					<view style="background: #F3F5F6;border-radius: 12rpx;">
						<u-input placeholder="请输入手机号" v-model="corporationsData.mobile" :maxlength="11" />
					</view>
				</u-form-item>

				<u-form-item prop="password">
					<view style="background: #F3F5F6;border-radius: 12rpx;">
						<u-input placeholder="请输入密码" v-model="corporationsData.password" type="password" />
					</view>
				</u-form-item>
			</u--form>
			<view class="zhmm">
				<label @click="enroll">我要注册</label>
				<label @click="retrievePassword">找回密码</label>
			</view>
		</view>
		<u-button type="primary" text="登录"
			:customStyle="{ width: '75%', borderRadius: '9999px', margin: ' 0 94rpx', marginBottom: '32rpx' }"
			loadingText="登录中..." :loading="loading" @click="logins"></u-button>
		<u-button text="微信登录"
			:customStyle="{ width: '75%', borderRadius: '9999px', margin: ' 0 94rpx', marginBottom: '32rpx', border: '1px solid #2590FA', color: '#2590FA' }"
			loadingText="微信登录..." :loading="loading" @click="wxLogin"></u-button>
		<!-- <view class="dl-button" @click="wxLogin">登录</view>
		<view class="zc-button" @click="enroll">注册</view> -->
	</view>
</template>

<script>
import { login, getOpenid ,wxLogin} from "@/api/api.js";
export default {
	data() {
		return {
			checked: false,
			loading: false,
			isLogin: false,
			openId: "",
			unionid: "",
			corporationsData: {
				mobile: "",
				password: "",
			},
			rules: {
				'mobile': {
					type: 'string',
					required: true,
					message: '手机号不能为空',
					trigger: ['blur', 'change']
				},
				'password': {
					type: 'string',
					required: true,
					message: '密码不能为空',
					trigger: ['blur', 'change']
				},
			},
			inviterCode: "", //手机号
			code: "",
		};
	},
	onLoad(ope) {

		if (ope.inviterCode) {
			this.inviterCode = ope.inviterCode
		}
		if (ope.code) {
			this.code = ope.code
		}
		this.getOpenId()
	},
	onShow() {
		if (uni.getStorageSync("token") && uni.getStorageSync("openId")) {
			uni.reLaunch({
				url: "/pages/home/home"
			})
		}
	},
	methods: {
		getOpenId() {
			uni.getProvider({
				service: 'oauth',
				success: (res) => {
					if (~res.provider.indexOf('weixin')) { //支持微信、qq和微博等
						uni.login({
							provider: 'weixin',
							success: async (loginRes) => {
								let { openid, sessionKey, unionId } = await getOpenid({ code: loginRes.code }).then(res => res.data)
								this.openId = openid
								this.unionId = unionId || ''
								this.corporationsData.openId = openid
								uni.setStorageSync("openId", openid)
								uni.setStorageSync("sessionKey", sessionKey)
								this.isLogin = true;
							},
							fail(res) {
								if (res.errMsg.includes('客户端未安装')) {
									uni.showToast({
										title: '请先安装微信客户端',
										duration: 2000,
										icon: "none"
									});
								} else if (res.errMsg.includes('用户取消')) {
									uni.showToast({
										title: '用户取消授权登录',
										duration: 2000,
										icon: "none"
									});
								} else if (res.errMsg.includes(
									'Authentication failed')) {
									uni.showToast({
										title: '用户拒绝授权登录',
										duration: 2000,
										icon: "none"
									});
								} else {
									uni.showToast({
										title: res.errMsg,
										duration: 2000,
										icon: "none"
									});
								}
							}
						});
					}
				},
				fail(res) {
				}
			})
		},
		enroll() {
			this.$u.route({
				url: "/subpackageA/pages/my/enrollment/enrollment",
				params: {
					inviterCode: this.inviterCode
				}
			})
		},
		retrievePassword() {
			this.$u.route({
				url: "/subpackageA/pages/my/retrievePassword/retrievePassword",
			})
		},
		async submit() {
			let res = await login(this.corporationsData)
			if (res.code == 0) {
				uni.setStorageSync("token", res.data.token)
				uni.setStorageSync("userData", res.data)
				uni.$u.toast("登录成功")
				this.loading = false
				// uni.getStorageSync("equipCode")
				if (this.code) {
					uni.reLaunch({
						url: '/subpackageA/pages/device/increaseDevice/increaseDevice?code=' + this.code
					});
				} else {
					setTimeout(() => {
						uni.reLaunch({
							url: "/pages/home/home"
						})
					}, 1000);
				}
			} else {
				this.loading = false
				uni.$u.toast(res.msg)

			}
		},
		async login(e) {
			let data = {
				unionId: e.unionId,
				miniOpenId: e.openid
			}
			await this.$request.get("/water-platform-app-api/customer/login/miniRegisterV1", data,
				"application/json").then(res => {
					if (res.code == 0) {
						uni.setStorageSync("user", res.data)
						uni.setStorageSync("token", res.data.token)
						uni.reLaunch({
							url: "/pages/home/home"
						})
					}
				})
		},
		async logins() {
			this.$refs["corporationsData"].validate().then(res => {
				this.loading = true
				this.submit()
			}).catch(errors => {
				uni.$u.toast('校验失败')
			})
		},
		async wxLogin() {
			
				this.loading = true
				const data = {
					miniOpenId:this.openId
				}
				wxLogin(data).then(res=>{
					if(res.code == 0){
						this.loading = false
						uni.setStorageSync("token", res.data.token)
						uni.setStorageSync("userData", res.data)
						if (this.code) {
							uni.reLaunch({
								url: '/subpackageA/pages/device/increaseDevice/increaseDevice?code=' + this.code
							});
						} else {
							setTimeout(() => {
								uni.reLaunch({
									url: "/pages/home/home"
								})
							}, 1000);
						}
					} else {
						this.loading = false
						uni.$u.toast(res.msg)

					}
				})
			
		}
	}
}
</script>

<style lang="scss">
.box {
	background-color: #fff;

	.bg {
		image {
			width: 100%;
			height: 532rpx;
		}
	}

	.login-box {
		padding: 0 94rpx;
		box-sizing: border-box;
		margin-top: 128rpx;
		margin-bottom: 64rpx;

		.zhmm {
			display: flex;
			text-align: end;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 28rpx;
			color: #14171A;
			line-height: 33rpx;
			justify-content: space-between;
		}
	}

	.dl-button {
		margin: 0 94rpx;
		background: #2590FA;
		border-radius: 100rpx;
		color: #fff;
		padding: 22rpx 0;
		box-sizing: border-box;
		text-align: center;
		margin-bottom: 32rpx;
	}

	.zc-button {
		margin: 0 94rpx;
		border: 1px solid #2590FA;
		color: #2590FA;
		border-radius: 100rpx;
		padding: 22rpx 0;
		box-sizing: border-box;
		text-align: center;
	}

	//=======
	.image-text {
		text-align: center;
		margin-top: 244rpx;

		.image {
			width: 240rpx;
			height: 240rpx;
			border-radius: 50%;
		}

		.text {
			font-size: 32rpx;
			color: #14171A;
			font-weight: 700;
			margin-top: 36rpx;
		}
	}

	.login {
		width: 548rpx;
		height: 92rpx;
		background: #2590FA;
		border-radius: 100rpx 100rpx 100rpx 100rpx;
		margin: 0 auto;
		text-align: center;
		color: #FFF;
		line-height: 92rpx;
		font-size: 28rpx;
		margin-top: 64rpx;
	}
}
</style>
<template>
	<view class='retrievePassword'>
		<tito title="找回密码"></tito>
		<view class="content">
			<view class="form">
				<u--form labelPosition="left" :model="corporationsData" :rules="rules" ref="corporationsData"
					labelAlign="left" labelWidth="70" :labelStyle="{ fontSize: '28rpx',marginLeft:'10rpx' }">
					<u-form-item prop="mobile" label="手机号" required>
						
						<view style="background: #F3F5F6;border-radius: 12rpx;" >
							
							<u--input placeholder="请输入手机号" border="surround" v-model="corporationsData.mobile"
								:maxlength="11"></u--input>
								
						</view>
						
					</u-form-item>
					<u-form-item prop="code" label="验证码" required>
						<view style="background: #F3F5F6;border-radius: 12rpx;">
							<!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
							<!-- #ifndef APP-NVUE -->
							<u-input placeholder="请输入验证码" v-model="corporationsData.code">
							<!-- #endif -->
								<!-- #ifdef APP-NVUE -->
								<u--input placeholder="请输入验证码" v-model="corporationsData.code">
								<!-- #endif -->
									<template slot="suffix">
										<u-code ref="uCode" @change="codeChange" seconds="60"
											changeText="重新获取(X)"></u-code>
										<u-button @tap="getCode" :text="tips" type="primary" size="mini"></u-button>
									</template>
							<!-- #ifndef APP-NVUE -->
							</u-input>
							<!-- #endif -->
							<!-- #ifdef APP-NVUE -->
							</u--input>
							<!-- #endif -->
						</view>
					</u-form-item>

					<u-form-item prop="password" label="重置密码" required>
						<view style="background: #F3F5F6;border-radius: 12rpx;">
							<u--input placeholder="请输入密码" border="surround" v-model="corporationsData.password"
								type="password"></u--input>
						</view>
					</u-form-item>

					<u-form-item prop="data4" label="确认密码" required>
						<view style="background: #F3F5F6;border-radius: 12rpx;">
							<u--input placeholder="请输入密码" border="surround" v-model="corporationsData.data4"
								type="password"></u--input>
						</view>
					</u-form-item>

				</u--form>
			</view>
		</view>
		<view class="bottom-btn">
			<view class="btn">
				<view @click="submit">确认</view>
			</view>
			<safe-bottom-x></safe-bottom-x>
		</view>
	</view>
</template>
<script>
	import {
		loginReset,
		sendSms
	} from "@/api/api.js"
	export default {
		name: 'retrievePassword',
		data() {
			return {
				tips: '',
				value: '',
				corporationsData: {
					mobile: "",
					code: "",
					password: "",
					data4: "",
				},
				rules: {
					'mobile': {
						type: 'string',
						required: true,
						message: '手机号不能为空',
						trigger: ['blur', 'change']
					},
					'code': {
						type: 'string',
						required: true,
						message: '验证码不能为空',
						trigger: ['blur', 'change']
					},
					'password': {
						type: 'string',
						required: true,
						message: '密码不能为空',
						trigger: ['blur', 'change']
					},
					'data4': {
						type: 'string',
						required: true,
						message: '密码不能为空',
						trigger: ['blur', 'change']
					},
				},
			};
		},
		onInit() {},
		onLoad() {},
		onShow() {},
		onHide() {},
		methods: {
			submit() {
				this.$refs["corporationsData"].validate().then(res => {
					if (this.corporationsData.password !== this.corporationsData.data4) {
						uni.$u.toast('两次密码不一致');
						return
					}
					this.loading = true;
					loginReset(this.corporationsData, ).then(res => {
						uni.hideLoading();
						this.$refs.uCode.start();
						if (res.code == 0) {
							console.log(res);
							uni.$u.toast('修改成功，请重新登录');
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1000);
						}
					})
				}).catch(errors => {
					this.loading = false;
					uni.$u.toast('校验失败')
				})
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (!this.corporationsData.mobile) {
					uni.$u.toast('电话不能为空');
					return
				}
				if (this.$refs.uCode.canGetCode) {
					uni.showLoading({
						title: '正在获取验证码'
					})
					sendSms({
						phone: this.corporationsData.mobile,
						type: 3
					}, ).then(res => {
						uni.hideLoading();
						
						if (res.code == 0) {
							console.log(res);
							this.$refs.uCode.start();
							uni.$u.toast('获取成功');
						} else {
							uni.$u.toast(res.msg);
						}
					})
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},
		},
		onPullDownRefresh() {},
		onReachBottom() {},
	};
</script>
<style lang="scss">
	.retrievePassword {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background-color: #EFF2F4;


		.content {
			overflow: auto;
			box-shadow: 0rpx 12rpx 28rpx -4rpx rgba(0, 0, 0, 0.1), 0rpx -12rpx 18rpx -14rpx rgba(0, 0, 0, 0.1);
			margin: 32rpx;



			.form {
				padding: 32rpx;
				box-sizing: border-box;
				background: #FFFFFF;
				box-shadow: 0rpx 8rpx 20rpx 0rpx #F0F1F2;
				border-radius: 24rpx;
			}
		}

		.bottom-btn {
			background: #fff;
			margin-top: auto;

			.btn {
				padding: 24rpx 30rpx;
				box-sizing: border-box;

				view {
					height: 88rpx;
					background: #2590FA;
					border-radius: 8rpx;
					display: grid;
					place-content: center;
					color: #fff;
				}
			}
		}
	}
</style>
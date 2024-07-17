<template>
	<view class="box">
		<tito title="个人中心" :leftIconShow="true"></tito>
		<view class="g-container">
			<view class="g-bottom">
				<view class="icon">
					<upload @afterRead="afterRead" :maxCount="1" width="128" height="128">
						<image :src="userDate.logo || logo" style="width: 128rpx;height: 128rpx;"></image>
					</upload>
				</view>
				<view class="text-icon3">
					<view class="text-icon">
						<view class="text">
							昵称
						</view>
						<view class="text-icon-image" @click="getName('昵称',userDate.name)">
							<view class="text">
								{{userDate.name}}
							</view>
							<image src="../../../../static/image/bianji.png" mode=""></image>
						</view>
					</view>
					<view class="text-icon">
						<view class="text">
							手机号
						</view>
						<view class="text-icon-image" @click="getName('电话号码',userDate.mobile)">
							<view class="text">
								{{userDate.mobile || '请设置'}}
							</view>
							<image src="../../../../static/image/bianji.png" mode=""></image>
						</view>
					</view>
					<view class="text-icon">
						<view class="text">
							所在地址
						</view>
						<view class="text-icon-image">
							<view class="text">
								广东深圳
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bnt">
			<view class="text" @click="logOut">
				退出登录
			</view>
		</view>
		<uni-popup ref="popup" type="center" border-radius="10px 10px 0 0">
			<view class="Bluetooth">
				<view class="blue">
					{{valueCenter}}
				</view>
				<view class="text input">
					<input v-if="valueCenter == '昵称' " class="uni-input" placeholder="请输入昵称" v-model="name" />
					<input v-if="valueCenter == '电话号码' " type="number" maxlength="11" class="uni-input"
						placeholder="请输入电话号码" v-model="phone" />
				</view>
				<view class="text input" v-if="valueCenter == '电话号码' ">
					<input type="number" maxlength="11" class="uni-input" placeholder="验证码" v-model="mobileCode" />
					<text class="get_code" @click="countdown">{{code}}</text>
				</view>
				<view class="refuse-open">
					<view class="refuse" @click="$refs.popup.close()">
						取消
					</view>
					<view class="refuse open" @click="opens">
						确认
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		customerInfo,
		customerUpdateNickname,
		customerUpdatePhone,
		loginSendSms,
		customerUpdatePhoto
	} from "@/api/api.js"
	export default {
		data() {
			return {
				logo:require("@/static/image/jingLogo.png"),
				name: null,
				phone: null,
				mobileCode: null,
				codeTimes: '',
				codeTime: '',
				codes: false,
				valueCenter: null,
				userDate: {},
				inputClearValue: "",
				code: '获取验证码',
				imageStyles: {
					width: 64,
					height: 64,
					border: {
						radius: '50%'
					}
				},
			};
		},
		onShow() {
			this.sysUser()
		},
		methods: {
			logOut() {
				uni.clearStorageSync()
				uni.reLaunch({
					url: "/pages/login/login"
				})
			},
			//验证码
			countdown() {
				if (!this.phone) {
					return uni.showToast({
						title: "输入正确的手机号",
						icon: "none"
					})
				}
				if (this.codeTimes > 0) {
					uni.showToast({
						title: '不能重复获取',
						icon: "none"
					});
					return;
				} else {
					this.codes = false
					this.codeTimes = 6
					uni.showToast({
						title: '正在发送',
						icon: "none"
					});
					let timer = setInterval(() => {
						this.codeTimes--;
						if (this.codeTimes < 1) {
							this.codes = true
							clearInterval(timer);
							this.codeTime = "重新获取"
						}
						this.code = this.codes ? this.codeTime : this.codeTimes + 's'
					}, 1000)
					loginSendSms({
						phone: this.phone,
						type: 2,
					}).then(res => {
						console.log(res, '验证码成功')
						uni.showToast({
							title: "发送成功",
							icon: "none"
						})
					})
				}
			},
			clickLeft() {
				uni.navigateBack()
			},
			getName(item, e) {
				this.name = e
				this.phone = e
				this.valueCenter = item
				this.$refs.popup.open('center')
			},
			logOff() {
				uni.clearStorageSync()
				uni.reLaunch({
					url: "/pages/login/login"
				})
			},
			//获取用户信息
			async sysUser() {
				let res = await customerInfo()
				if (res.code == 0) {
					this.userDate = res.data
				}
			},
			//修改名称和电话号码
			async opens() {
				if (this.valueCenter == "昵称") {
					await customerUpdateNickname({
							nickname: this.name
						})
						.then(update => {
							if (update.code == 0) {
								uni.showToast({
									title: "修改昵称成功",
									icon: "none"
								})
							}
						})
				} else {
					await customerUpdatePhone({
							phone: this.phone,
							mobileCode: this.mobileCode
						})
						.then(update => {
							if (update.code == 0) {
								uni.showToast({
									title: "修改电话号码成功",
									icon: "none"
								})
							}
						})
				}
				this.$refs.popup.close()
				this.sysUser()
			},
			//选择头像触发
			afterRead(e) {
				console.log(e, '----------');
				customerUpdatePhoto({
					photo: e[0].url
				}).then(update => {
					console.log(update, 'updateupdate');
					if (update.code == 0) {
						this.sysUser()
						uni.showToast({
							title: "修改头像成功",
							icon: "none"
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.box {
		min-height: 100vh;
		background-color: #F0F3F5;
		padding-bottom: 234rpx;
		box-sizing: border-box;
	}

	.g-container {
		position: relative;
		width: 686rpx;
		height: 472rpx;
		background-color: #FFF;
		border-radius: 12rpx;
		margin: 160rpx auto;


		.g-bottom {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 100%;
			background: #FFF;
			padding: 32rpx;
			box-sizing: border-box;

			.icon {
				position: absolute;
				width: 128rpx;
				height: 128rpx;
				// background-color: red;
				border-radius: 50%;
				left: 50%;
				top: 0;
				transform: translate(-50%, -50%);
				border: 20rpx solid #F0F3F5;

				image {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}

				&::after,
				&::before {
					content: '';
					position: absolute;
					background: transparent;
					box-shadow: 2rpx -20rpx 0 0 #F0F3F5;
				}

				&::after {
					top: 50%;
					left: -44rpx;
					width: 40rpx;
					height: 40rpx;
					border-top-right-radius: 40rpx;
				}

				&:before {
					top: 50%;
					right: -44rpx;
					width: 40rpx;
					height: 40rpx;
					border-top-left-radius: 40rpx;
				}
			}
		}

		.text-icon3 {
			margin-top: 130rpx;

			.text-icon:last-child {
				border-bottom: none;
			}

			.text-icon {
				height: 72rpx;
				display: flex;
				justify-content: space-between;
				border-bottom: 2rpx solid #F0F3F5;
				margin-top: 32rpx;

				.text {
					font-size: 28rpx;
					color: #616466;
				}

				.text-icon-image {
					display: flex;
					align-items: center;

					.text {
						font-size: 28rpx;
						color: #14181A;
						margin-right: 16rpx;
					}

					image {
						width: 32rpx;
						height: 32rpx;
						vertical-align: middle;
					}
				}
			}
		}

	}

	.bnt {
		width: 100%;
		height: 204rpx;
		background: #FFFFFF;
		box-shadow: 0rpx -4rpx 20rpx -4rpx rgba(100, 101, 102, 0.1);
		position: fixed;
		left: 0%;
		bottom: 0%;
		padding: 24rpx 32rpx;
		box-sizing: border-box;

		.text {
			width: 686rpx;
			height: 88rpx;
			border-radius: 8rpx;
			border: 2rpx solid #1DABF2;
			text-align: center;
			line-height: 88rpx;
			font-size: 32rpx;
			color: #1DABF2;
		}
	}

	.Bluetooth {
		width: 560rpx;
		background: linear-gradient(360deg, rgba(212, 231, 250, 0) 0%, #D4E7FA 100%), #FFFFFF;
		border-radius: 40rpx;
		// text-align: center;
		padding: 32rpx 48rpx;
		box-sizing: border-box;

		.blue {
			font-size: 32rpx;
			color: #141A18;
			text-align: center;
		}

		.text {
			margin-top: 32rpx;
			font-size: 28rpx;
		}

		.input {
			padding: 10rpx 0rpx;
			box-sizing: border-box;
			border-bottom: 2rpx solid #D7D8D8;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.get_code {}
		}

		.refuse-open {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 48rpx;

			.refuse {
				width: 216rpx;
				height: 72rpx;
				border-radius: 100rpx 100rpx 100rpx 100rpx;
				border: 1rpx solid #D4E7FA;
				line-height: 72rpx;
				text-align: center;
			}

			.open {
				background-color: #D4E7FA;
				color: #000;
			}
		}
	}
</style>
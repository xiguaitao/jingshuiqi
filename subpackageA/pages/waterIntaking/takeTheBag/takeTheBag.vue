<template>
	<view class="box">
		<view class="tito">
			<u-navbar title="取带" :leftIconShow="true" :autoBack="true" bgColor="transparent" :fixed="false">
			</u-navbar>
		</view>
		<view class="image-tito">
			<image src="../../../../static/image/kap2-btn.png" mode=""></image>
		</view>
		<view class="thebag">
			<view class="money">
				<text class="icon">￥</text>
				<text class="text">5.00</text>
			</view>
			<view class="gmNumber-number-box">
				<view class="gmNumber">
					购买数量
				</view>
				<view class="number-box">
					<u-number-box v-model="value">
						<view slot="minus" class="minus border">
							<u-icon name="minus" size="12" color="#1DABF2"></u-icon>
						</view>
						<text slot="input" style="width: 66rpx;text-align: center;" class="input">{{value}}</text>
						<view slot="plus" class="plus border">
							<u-icon name="plus" color="#FFFFFF" size="12"></u-icon>
						</view>
					</u-number-box>
				</view>
			</view>
			<view class="conter-text">
				<view class="tito">
					取水介绍
				</view>
				<view class="icon-text-number">
					<view class="icon-text" v-for="(item, index) in 6" :key="index">
						<view class="number"
							:style="{ '--line-before': index == 0 ? '#fff' : '#1DABF2', '--line-after': index == 5 ? '#fff' : '#1DABF2' }">
							<view>
								<view>

									{{ index + 1 }}
								</view>
							</view>
						</view>
						<view class="text">
							点击扫码取水按钮，进入取水详情页
							点击扫码取水按钮，进入取水详情页
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="money-text-bnt">
			<view class="money-text">
				合计:￥3600.00
			</view>
			<view class="bnt" @click="moneyShow = true">
				开始取水
			</view>
		</view>
		<u-popup :show="moneyShow" @close="close" mode="center" :round="10" :safeAreaInsetBottom="false">
			<view class="popup-center">
				<view class="center-tito">
					确认订单
				</view>
				<view class="device-code-wo">
					<view class="device-code">
						<view class="device">
							水袋单价:
						</view>
						<view class="code">
							￥5.00
						</view>
					</view>
					<view class="device-code">
						<view class="device">
							购买数量
						</view>
						<view class="money">
							2
						</view>
					</view>
					<view class="device-code">
						<view class="device">
							支付金额:
						</view>
						<view class="money">
							￥10.00
						</view>
					</view>
				</view>
				<view class="bnt">
					<view class="text" @click="moneyShow = false">
						取消
					</view>
					<view class="parn" @click="getpatment">
						确认支付
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: 1,
				moneyShow: false,
			};
		},
		methods: {
			close() {
				this.moneyShow = false
			},
			getpatment() {
				this.$u.route({
					url: "/subpackageA/pages/waterIntaking/paymentSuccess/paymentSuccess",
					// params: {
					// 	title
					// }
				})
			}
		}
	}
</script>

<style lang="scss">
	.box {
		min-height: 100vh;
		background-color: #F0F3F5;
		padding-bottom: 200rpx;
		box-sizing: border-box;
	}

	.tito {
		position: absolute;
		top: 0;
		width: 100%;
	}

	.image-tito {
		image {
			width: 100%;
			height: 750rpx;
		}
	}

	.thebag {
		min-height: 614rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 12rpx 28rpx -4rpx rgba(0, 0, 0, 0.1), 0rpx -12rpx 18rpx -14rpx rgba(0, 0, 0, 0.1);
		border-radius: 8rpx;
		margin: -50rpx 32rpx 0;
		position: relative;
		padding: 32rpx;
		box-sizing: border-box;

		.money {
			color: #FA573E;

			.icon {
				font-size: 32rpx;
			}

			.text {
				font-size: 44rpx;
			}
		}

		.gmNumber-number-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 34rpx;

			.gmNumber {
				font-size: 28rpx;
				color: #14181A;
			}

			.number-box {
				.border {
					width: 44rpx;
					height: 44rpx;
					border-radius: 4rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.minus {
					border: 2rpx solid #1DABF2;
				}

				.plus {
					background: #1DABF2;
				}
			}


		}

		.conter-text {
			margin-top: 50rpx;

			.tito {
				position: relative;
				font-weight: 700;
				font-size: 32rpx;
				color: #14181A;
				margin-left: 40rpx;
			}

			.tito::after {
				content: "";
				width: 24rpx;
				height: 24rpx;
				background: linear-gradient(180deg, #04D9D9 0%, #1DABF2 100%);
				border-radius: 2rpx;
				position: absolute;
				left: -40rpx;
				top: 10rpx;
				transform: rotateZ(45deg);
			}

			.icon-text-number {
				margin-top: 50rpx;
				display: flex;
				flex-direction: column;

				.icon-text {
					flex: 1;
					display: flex;

					.number {
						width: 110rpx;
						// height: 100%;
						position: relative;
						display: flex;
						flex-direction: column;
						align-items: center;

						&::after,
						&::before {
							flex: 1;
							display: block;
							content: "";
							width: 4rpx;
							background-color: #1DABF2;
						}

						&::after {
							background-color: var(--line-after);
						}

						&::before {
							background-color: var(--line-before);
						}

						>view {
							background-color: #fff;
							flex: 1;
							position: absolute;
							left: 50%;
							top: 50%;
							transform: translate(-50%, -50%) rotateZ(45deg);
							width: 50rpx;
							height: 50rpx;
							border: 4rpx solid;
							border-image: linear-gradient(180deg, #04d9d9, #1dabf2) 4 4;
							display: grid;
							place-content: center;

							view {
								transform: rotateZ(-45deg);
							}
						}
					}

					.text {
						flex: 1;
						font-size: 28rpx;
						color: #2E3133;
						padding: 16rpx;
						box-sizing: border-box;
					}
				}
			}
		}
	}

	.money-text-bnt {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24rpx 32rpx;
		box-sizing: border-box;
		width: 100%;
		height: 166rpx;
		background: #FFFFFF;
		box-shadow: 0rpx -4rpx 20rpx -4rpx rgba(100, 101, 102, 0.1);
		position: fixed;
		bottom: 0%;
		left: 0%;

		.money-text {
			font-size: 28rpx;
			color: #FA573E;
		}

		.bnt {
			width: 296rpx;
			height: 88rpx;
			background: linear-gradient(135deg, #FA8C3E 0%, #FA573E 100%);
			border-radius: 8rpx;
			font-size: 32rpx;
			color: #FFFFFF;
			text-align: center;
			line-height: 88rpx;
		}
	}

	.popup-center {
		width: 552rpx;
		background: #FFFFFF;
		border-radius: 8rpx;

		.center-tito {
			margin-top: 48rpx;
			text-align: center;
			font-weight: 700;
			font-size: 32rpx;
			color: #14181A;
			margin-bottom: 32rpx;
		}

		.device-code-wo {
			padding: 0 152rpx;
			box-sizing: border-box;

			.device-code {
				font-size: 28rpx;
				display: flex;
				align-items: center;
				margin-top: 16rpx;

				.device {
					color: #616466;
				}

				.code {
					color: #14181A;
					margin-left: 24rpx;
				}

				.money {
					color: #FA573E;
				}
			}
		}

		.bnt {
			display: flex;
			height: 92rpx;
			font-size: 32rpx;
			justify-content: space-around;
			align-items: center;
			margin-top: 55rpx;
			border-top: 2rpx solid #E1E4E6;

			.text {
				color: #14181A;
				flex: 1;
				height: 100%;
				text-align: center;
				line-height: 92rpx;
			}

			.parn {
				color: #1DABF2;
				flex: 1;
				height: 100%;
				text-align: center;
				line-height: 92rpx;
			}
		}
	}
</style>
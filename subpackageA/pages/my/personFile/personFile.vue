<template>
	<view class="box">
		<tito title="一人一档" :leftIconShow="true"></tito>
		<view class="g-container">
			<view class="g-bottom">
				<view class="icon"></view>
				<view class="text-icon3">
					<view class="text-icon">
						<view class="text">
							昵称
						</view>
						<view class="text-icon-image">
							<view class="text">
								薛定谔的猫
							</view>
							<image src="../../../../static/image/bianji.png" mode=""></image>
						</view>
					</view>
					<view class="text-icon">
						<view class="text">
							手机号
						</view>
						<view class="text-icon-image">
							<view class="text">
								13252514514
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
				<view class="condition">
					健康状况
				</view>
				<view class="weight-kg-text-list">
					<view class="weight-kg-text" v-for="(item,index) in 8" :key="index">
						<view class="weight">
							体重
						</view>
						<view class="kg">
							47.9kg
						</view>
						<view class="text">
							标准
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.box {
		height: 100%;
		background-color: #F0F3F5;
		padding-bottom: 234rpx;
		box-sizing: border-box;
	}

	.g-container {
		position: relative;
		width: 686rpx;
		background-color: #FFF;
		border-radius: 12rpx;
		margin: 160rpx auto;

		.g-bottom {
			position: absolute;
			left: 0;
			right: 0;
			background: #FFF;
			padding: 32rpx;
			box-sizing: border-box;

			.icon {
				position: absolute;
				width: 128rpx;
				height: 128rpx;
				background-color: red;
				border-radius: 50%;
				left: 50%;
				top: 0;
				transform: translate(-50%, -50%);
				border: 20rpx solid #F0F3F5;

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

			.condition {
				font-size: 32rpx;
				color: #2E3133;
				font-family: PingFang SC, PingFang SC;
			}

			.weight-kg-text-list {
				.weight-kg-text {
					font-family: PingFang SC, PingFang SC;
					font-size: 28rpx;
					display: flex;
					align-items: center;
					margin-top: 32rpx;
					.weight {
						font-weight: 600;
						color: #14181A;
					}

					.kg {
						color: #616466;
						margin-left: auto;
					}

					.text {
						font-weight: 500;
						color: #04CC89;
						margin-left: 48rpx;
					}
				}
			}
		}


	}
</style>
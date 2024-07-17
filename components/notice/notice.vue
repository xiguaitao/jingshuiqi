<template>
	<view class="notice">
		<view class="notice-conter-text">
			<view class="notice-tito">
				<view class="image">
					<image :src="imageTop" mode=""></image>
				</view>
				<view class="way">
					{{title}}
				</view>
				<view v-if="showGd" class="more" @click="getmore(title)">
					<text style="margin-right: 20rpx;">更多</text>
					<u-icon name="arrow-right" size="15" color="#000"></u-icon>
				</view>
			</view>
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: "notice",
		props: {
			title: {
				type: String,
				default: "标题"
			},
			imageTop: {
				type: String,
				default: "../../static/image/kap1-top.png"
			},
			showGd: {
				type: Boolean,
				default: true,
			},
		},
		data() {
			return {

			};
		},
		methods: {
			getmore(title) {
				this.$emit("getmore", title)
			}
		}
	}
</script>

<style lang="scss">
	.notice {
		width: 686rpx;
		margin: 48rpx auto;
		position: relative;



		.notice-conter-text {
			position: relative;
			padding-bottom: 1rpx;
			box-sizing: border-box;

			.notice-tito {
				padding: 16rpx 0;
				box-sizing: border-box;
				overflow: hidden;
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: relative;

				.image {
					position: absolute;
					width: 100%;
					height: 100%;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.way {
					position: relative;
					font-size: 32rpx;
					color: #FFFFFF;
					margin-left: 65rpx;
					font-weight: 700;
					font-family: PingFang SC, PingFang SC;

				}

				.way::after {
					content: "";
					width: 20rpx;
					height: 20rpx;
					background: #FFFFFF;
					border-radius: 2rpx;
					position: absolute;
					left: -32rpx;
					top: 15rpx;
					transform: rotateZ(45deg);
				}

				.more {
					display: flex;
					align-items: center;
					font-size: 24rpx;
					color: #000;
					margin-right: 24rpx;
					position: relative;
					margin-bottom: 10rpx;
				}
			}

			.conter-text {
				background-color: #FFFFFF;
				margin: 8rpx;

				.corten {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 24rpx;
					box-sizing: border-box;
					border-bottom: 2rpx solid #E1E4E6;

					.videotext {
						font-weight: 600;
						font-size: 28rpx;
						color: #2E3033;
					}

					.time {
						font-size: 24rpx;
						color: #B1B2B2;
					}
				}
			}

		}
	}
</style>
<template>
	<view class="box">
		<tito title="商城" :leftIconShow="false"></tito>
		<view class="swiper">
			<u-swiper class="swipers" :list="list1" indicator height="422rpx" indicatorMode="dot"></u-swiper>
		</view>
		<view class="scrollView">
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
				<view class="scroll-list">
					<view :class="index== 0 ? 'scroll-view-item_H' : 'scroll-view-item_N'"
						v-for="(item, index) in 4" :key="index" @click="getscroll(item, index)">
						自主品牌
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list1: [
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				]
			};
		}
	}
</script>

<style lang="scss">
	.box {
		min-height: 100vh;
		background-color: #F0F3F5;

		.swiper {
			height: 422rpx;
			margin: 0 32rpx;
			box-sizing: border-box;

			::v-deep .u-swiper-indicator__wrapper__dot {
				width: 24rpx !important;
				height: 4rpx !important;
			}

			::v-deep .u-swiper-indicator__wrapper__dot--active {
				width: 24rpx !important;
				height: 4rpx !important;
			}
		}

		.scrollView {
			padding: 0rpx 30rpx;
			box-sizing: border-box;
			margin-top: 30rpx;

			.scroll-list {
				display: flex;
				align-items: center;

				.scroll-view-item_H {
					padding: 5rpx 10rpx;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					background: #E1EDFA;
					border-radius: 8rpx 8rpx 8rpx 8rpx;
					border: 2rpx solid #2590FA;
					margin-right: 16rpx;
					text-align: center;
					line-height: 50rpx;
					font-size: 24rpx;
					color: #2590FA;

					image {
						width: 32rpx;
						height: 32rpx;
						margin-right: 2.5rpx;
						vertical-align: text-bottom;
					}
				}

				.scroll-view-item_N {
					padding: 5rpx 10rpx;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					background: #E4E5E6;
					border-radius: 8rpx 8rpx 8rpx 8rpx;
					margin-right: 16rpx;
					text-align: center;
					line-height: 50rpx;
					font-size: 24rpx;
					color: #2E3033;

					image {
						width: 32rpx;
						height: 32rpx;
						margin-right: 2.5rpx;
						vertical-align: text-bottom;
					}
				}
			}
		}
	}
</style>
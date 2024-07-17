<template>
	<view>
		<view class="commodity">
			<view class="salescommodity" v-if="title">
				<view class="sales">
					{{ title }}
				</view>
			</view>
			<view class="corten-list">
				<view class="corten" v-for="(item, index) in list" :key="index" @click="getProductDetails(item)">
					<view class="image">
						<image :src="item.logo" mode=""></image>
						<view class="text">
							{{ item.sales }}人购买
						</view>
					</view>
					<view class="corten-bottom">
						<view class="tito">
							{{ item.name }}
						</view>
						<view class="text-money-yue">
							<text class="icon">￥</text>
							<text class="money">{{ item.money }}</text>
							<text class="yue">/月</text>
						</view>
						<view class="deleMoney">
							￥{{ item.originalMoney }}/月
						</view>
					</view>
					<view class="image-fenx">
						<button class="invite face" open-type="share">
							<image src="../../static/image/Button-fenxiang.png" mode=""></image>
						</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "commodity",
	props: {
		title: {
			type: String,
			default: ""
		},
		list: {
			type: Array,
			default: [],
		}
	},
	data() {
		return {

		};
	},
	// onShareAppMessage(res) {
	// 	let userId = uni.getStorageSync("user")
	// 	if (res.from === 'button') {
	// 		return {
	// 			title: `邀你一起赚积分`,
	// 			path: `pages/login/login?userId=${userId.id}`,
	// 			imageUrl: `${this.infolist.imgUrl[0]}`
	// 		};
	// 	}
	// },
	methods: {
		getProductDetails(e) {
			this.$emit("getProductDetails", e)
		}
	}
}
</script>

<style lang="scss">
.commodity {
	.salescommodity {
		.sales {
			margin-left: 40rpx;
			font-weight: 700;
			font-size: 36rpx;
			color: #14181A;
			position: relative;
		}

		.sales::after {
			content: "";
			width: 20rpx;
			height: 20rpx;
			background: linear-gradient(180deg, #04D9D9 0%, #1DABF2 100%);
			border-radius: 2rpx;
			position: absolute;
			left: -32rpx;
			top: 15rpx;
			transform: rotateZ(45deg);
		}
	}

	.corten-list {
		margin-top: 32rpx;
		margin-bottom: 32rpx;
		display: flex;
		flex-wrap: wrap;
		grid-gap: 22rpx;

		.corten {
			width: 48%;
			height: 528rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(3, 18, 26, 0.05);
			border-radius: 8rpx 8rpx 8rpx 8rpx;
			position: relative;
			overflow: hidden;

			.image {
				width: 332rpx;
				height: 336rpx;
				// background: red;
				position: relative;

				image {
					width: 100%;
					height: 100%;
				}

				.text {
					position: absolute;
					bottom: 16rpx;
					left: 24rpx;
					font-size: 20rpx;
					color: #FFFFFF;
					background: #33333355;
					border-radius: 18rpx;
					padding: 0 12rpx;
				}
			}

			.corten-bottom {
				padding: 24rpx;
				box-sizing: border-box;

				.tito {
					font-weight: 700;
					font-size: 32rpx;
					color: #2E3133;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
				}

				.text-money-yue {
					color: "#FA573E";
					margin-top: 16rpx;
					color: #FA573E;

					.icon {
						font-size: 28rpx;
					}

					.money {
						font-size: 36rpx;
					}

					.yue {
						font-size: 24rpx;
					}
				}

				.deleMoney {
					font-size: 24rpx;
					color: #AFB1B2;
					text-decoration: line-through;
				}
			}

			.image-fenx {
				position: absolute;
				bottom: -10rpx;
				right: 0;

				.invite {
					width: 80rpx;
					height: 80rpx;
					background: transparent;
					border: none;
					margin: 0;
					padding: 0;
				}

				.invite::after {
					content: none;
				}

				image {
					width: 80rpx;
					height: 80rpx;
				}
			}
		}
	}
}
</style>
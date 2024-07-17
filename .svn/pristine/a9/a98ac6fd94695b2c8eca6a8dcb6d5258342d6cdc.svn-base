<template>
	<view class="box">
		<view class="tito" v-if="menuTop" :style="{paddingTop: menuTop.top + 5 + 'px',}">
			<view class="icon" @click="getleft">
				<uni-icons type="left" size="25" color="#000"></uni-icons>
			</view>
			<view class="text">
				订单详情
			</view>
		</view>
		<view class="image-text">
			<view class="image">
				<uni-icons type="checkbox-filled" size="35" color="#1373FF"></uni-icons>
			</view>
			<view class="text">
				支付成功
			</view>
		</view>
		<view class="text-name-porn-icon">
			<view class="icon">
				<uni-icons type="location-filled" size="30" color="#1373FF"></uni-icons>
			</view>
			<view class="text-name-porn">
				<view class="text">
					{{orderList.provinceName}}
					{{orderList.cityName}}
					{{orderList.areaName}}
					{{orderList.address}}
				</view>
				<view class="name-porn">
					<text class="name">{{orderList.name}}</text>
					<text class="porn">{{orderList.mobile}}</text>
				</view>
			</view>
		</view>
		<view class="commodity" v-for="(item,index) in orderList.orderItemList" :key="item.id">
			<view class="image">
				<image :src="item.goodsLogo" mode=""></image>
			</view>
			<view class="name-text">
				<view class="name">
					{{item.goodsName}}
				</view>
				<!-- <view class="text">
					服务周期：2个月
				</view> -->
				<view class="text">
					<span v-if="item.optionName">规格：{{item.optionName}}</span>
				</view>
				<view class="money">
					<span class="money-icon">￥</span>
					<span class="moneyMonth">{{item.goodsMoney}}</span>
					<!-- <span class="moneyText">/月</span> -->
				</view>
			</view>
			<view class="xNumder">
				x{{item.number}}
			</view>
		</view>
		<view class="coupons">
			<view class="coupons-text">
				<view class="text">
					商品总价
				</view>
				<view class="icons">
					￥{{orderList.goodsMoney}}
				</view>
			</view>
			<view class="coupons-text">
				<view class="text">
					优惠金额
				</view>
				<view class="icons">
					￥{{orderList.couponMoney || 0.00}}
				</view>
			</view>
			<view class="coupons-text">
				<view class="text">
					实付款
				</view>
				<view class="icons money">
					￥{{orderList.money}}
				</view>
			</view>
		</view>
		<view class="coupons">
			<view class="coupons-text">
				<view class="text">
					订单编号
				</view>
				<view class="icons">
					<view class="number">
						{{orderList.code}}
					</view>
					<view class="cop" @click="getcop(orderList.code)">
						复制
					</view>
				</view>
			</view>
			<view class="coupons-text">
				<view class="text">
					创建时间
				</view>
				<view class="icons time">
					{{orderList.createTime}}
				</view>
			</view>
			<view class="coupons-text">
				<view class="text">
					付款时间
				</view>
				<view class="icons time">
					{{orderList.payTime}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menuTop: uni.getMenuButtonBoundingClientRect(),
				orderList:{},//订单详情
			};
		},
		onLoad(ope) {
			if (ope.orderId) {
				this.getdetail(ope.orderId)
			}

		},
		methods: {
			//订单详情
			getdetail(id) {
				this.$request.get("/water-platform-app-api/shop/goodsOrder/detail", {
					id: id
				}).then(res => {
					console.log(res, '订单详情');
					this.orderList = res.data
				})
			},
			//复制
			getcop(e) {
				uni.setClipboardData({
					data: e,
					success(res) {
						uni.showToast({
							title: '复制成功',
							icon: 'none',
						})
					},
				})
			},
			//返回
			getleft() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.box {
		min-height: 100vh;
		background: linear-gradient(360deg, #F3F5F6 0%, #F3F5F6 80%, rgba(212, 231, 250, 0) 80%, #D4E7FA 100%);
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.tito {
		display: flex;
		box-sizing: border-box;
		margin-bottom: 62rpx;

		.text {
			font-weight: 600;
			font-size: 32rpx;
			color: #14171A;
			margin-left: calc(50% - 30rpx);
			transform: translateX(-50%);
		}
	}

	.image-text {
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		box-sizing: border-box;

		.image {
			image {
				width: 52rpx;
				height: 52rpx;
				vertical-align: middle;
			}
		}

		.text {
			font-weight: 600;
			font-size: 36rpx;
			color: #2E3033;
		}
	}

	.text-name-porn-icon {
		// height: 186rpx;
		background: #FFFFFF;
		border-radius: 16rpx 16rpx 16rpx 16rpx;
		display: flex;
		// justify-content: space-between;
		padding: 24rpx;
		box-sizing: border-box;
		margin-top: 30rpx;

		.text-name-porn {
			margin-left: 8rpx;

			.text {
				font-size: 28rpx;
				color: #14171A;
			}

			.name-porn {
				font-size: 24rpx;
				color: #2E3033;
				margin-top: 16rpx;
				.name{
					margin-right: 16rpx;
				}
			}
		}
	}

	.commodity {
		margin-top: 24rpx;
		background: #FFFFFF;
		border-radius: 16rpx 16rpx 16rpx 16rpx;
		padding: 24rpx;
		box-sizing: border-box;
		display: flex;

		.image {
			image {
				width: 168rpx;
				height: 168rpx;
			}
		}

		.name-text {
			margin-left: 16rpx;

			.name {
				font-weight: 600;
				font-size: 28rpx;
				color: #2E3033;
				
			}

			.text {
				font-size: 24rpx;
				color: #616366;
				margin-top: 16rpx;
			}

			.money {
				color: #FA6B05;
				margin-top: 16rpx;
				.money-icon {
					font-size: 24rpx;
				}

				.moneyMonth {
					font-size: 32rpx;
				}

				.moneyText {
					font-size: 20rpx;
					color: #616366;
				}
			}
		}

		.xNumder {
			margin-left: auto;
			font-size: 28rpx;
			color: #616366;
		}
	}

	.coupons {
		background: #FFFFFF;
		border-radius: 16rpx 16rpx 16rpx 16rpx;
		margin-top: 24rpx;
		padding: 24rpx;
		box-sizing: border-box;

		.coupons-text:first-child {
			margin-top: 0rpx;
		}

		.coupons-text {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 32rpx;

			.text {
				font-size: 28rpx;
				color: #2E3033;
			}

			.icons {
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color: #14171A;

				.number {
					color: #616366;
				}

				.cop {
					width: 72rpx;
					height: 36rpx;
					background: #F4F5F6;
					border-radius: 100rpx 100rpx 100rpx 100rpx;
					font-size: 20rpx;
					color: #2E3033;
					line-height: 36rpx;
					text-align: center;
					margin-left: 16rpx;
				}
			}

			.money {
				color: #FA6B05;
			}

			.time {
				color: #616366;
			}
		}
	}
</style>
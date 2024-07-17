<template>
	<view class="box">
		<!-- 发货 -->
		<view class="image-text" v-if="money == 1">
			<view class="image">
				<image src="../../static/fahuo.png" mode=""></image>
			</view>
			<view class="text">
				准备发货
			</view>
		</view>
		<!-- 收货 售后中 -->
		<view class="deliveryOfGoods" v-if="money == 2 || money == 3">
			<view class="image">
				<image src="../../static/fahuo.png" mode=""></image>
			</view>
			<view class="text-time">
				<view class="text">
					商家已发货，正在通知快递取件
				</view>
				<view class="time">
					2024-01-01 19:08:00
				</view>
			</view>
			<view class="icon">
				<uni-icons type="right" size="20" color="#B1B2B2"></uni-icons>
			</view>
		</view>
		<!-- 退款 -->
		<view class="image-text" v-if="money == 5">
			<view class="image">
				<uni-icons type="checkbox-filled" size="28" color="#2590FA"></uni-icons>
			</view>
			<view class="text">
				退款成功
			</view>
		</view>
		<view class="text-name-porn-icon">
			<view class="icon">
				<uni-icons type="location-filled" size="30" color="#1373FF"></uni-icons>
			</view>
			<view class="text-name-porn">
				<view class="text">
					{{ orderList.provinceName }}
					{{ orderList.cityName }}
					{{ orderList.areaName }}
					{{ orderList.address }}
				</view>
				<view class="name-porn">
					<text class="name">{{ orderList.name }}</text>
					<text class="porn">{{ orderList.mobile }}</text>
				</view>
			</view>
		</view>
		<view class="commodity" v-for="(item, index) in orderList.orderItemList" :key="item.id">
			<view class="image">
				<image :src="item.goodsLogo" mode=""></image>
			</view>
			<view class="name-text">
				<view class="name">
					{{ item.goodsName }}
				</view>
				<!-- <view class="text">
					服务周期：2个月
				</view> -->
				<view class="text" v-if="item.optionName">
					规格：{{ item.optionName }}
				</view>
				<view class="money">
					<span class="money-icon">￥</span>
					<span class="moneyMonth">{{ item.goodsMoney }}</span>
					<!-- <span class="moneyText">/月</span> -->
				</view>
			</view>
			<view class="xNumder">
				<view class="xtwo">
					x{{ item.number }}
				</view>
				<view class="afterSales" v-if="orderList.allowAftersales && !item.aftersalesId"
					@click="getservice(item)">
					申请售后
				</view>
				<view class="afterSales" v-if="item.aftersalesId" @click="getsales(item)">
					查看售后
				</view>
				<!-- <view class="afterSales" @click="getsales(item)">
					查看售后
				</view> -->
			</view>
		</view>
		<view class="coupons" v-if="money == 5">
			<view class="coupons-text">
				<view class="text">
					商品总价
				</view>
				<view class="icons">
					￥{{ orderList.goodsMoney }}
				</view>
			</view>
			<view class="coupons-text">
				<view class="text">
					优惠金额
				</view>
				<view class="icons">
					￥0.00{{ orderList.couponMoney || 0.00 }}
				</view>
			</view>
			<view class="coupons-text">
				<view class="text">
					实付款
				</view>
				<view class="icons money">
					￥{{ orderList.money }}
				</view>
			</view>
			<view class="coupons-text">
				<view class="text">
					退款金额
				</view>
				<view class="icons money">
					-￥400.00
				</view>
			</view>
			<view class="coupons-text">
				<view class="text">
					退款原因
				</view>
				<view class="icons">
					损坏
				</view>
			</view>
		</view>
		<view class="coupons" v-else>
			<view class="coupons-text">
				<view class="text">
					商品总价
				</view>
				<view class="icons">
					￥{{ orderList.goodsMoney }}
				</view>
			</view>
			<view class="coupons-text">
				<view class="text">
					优惠金额
				</view>
				<view class="icons">
					￥{{ orderList.couponMoney || 0.00 }}
				</view>
			</view>
			<view class="coupons-text">
				<view class="text">
					实付款
				</view>
				<view class="icons money">
					￥{{ orderList.money }}
				</view>
			</view>
		</view>
		<!-- 收货 售后中 退款-->
		<view class="coupons" v-if="money == 2 || money == 3">
			<view class="coupons-text">
				<view class="text">
					订单编号
				</view>
				<view class="icons">
					<view class="number">
						{{ orderList.code }}
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
					{{ orderList.createTime }}
				</view>
			</view>
			<view class="coupons-text">
				<view class="text">
					付款时间
				</view>
				<view class="icons time">
					{{ orderList.payTime }}
				</view>
			</view>
			<view class="coupons-text">
				<view class="text">
					发货时间
				</view>
				<view class="icons time">
					{{ orderList.deliveryTime }}
				</view>
			</view>
			<view class="coupons-text">
				<view class="text">
					物流公司
				</view>
				<view class="icons time">
					{{ orderList.logisticsCompany }}
				</view>
			</view>
			<view class="coupons-text">
				<view class="text">
					快递单号
				</view>
				<view class="icons">
					<view class="number">
						{{ orderList.trackingNumber }}
					</view>
					<view class="cop" @click="getcop(orderList.trackingNumber)">
						复制
					</view>
				</view>
			</view>
		</view>
		<view class="coupons" v-else>
			<view class="coupons-text">
				<view class="text">
					订单编号
				</view>
				<view class="icons">
					<view class="number">
						{{ orderList.code }}
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
					{{ orderList.createTime }}
				</view>
			</view>
			<view class="coupons-text">
				<view class="text">
					付款时间
				</view>
				<view class="icons time">
					{{ orderList.payTime }}
				</view>
			</view>
		</view>
		<!-- 售后过多 -->
		<uni-popup ref="popup" type="center" border-radius="10px 10px 0 0" :mask-click="false">
			<view class="popur">
				<view class="delete">
					撤销超过2次，将无法再次发起售后申请。
				</view>
				<view class="cance-sbmer">
					<view class="cance" @click="$refs.popup.close()">
						取消
					</view>
					<view class="cance sbmer" @click="submit">
						确定
					</view>
				</view>
			</view>
		</uni-popup>
		<safe-bottom-x></safe-bottom-x>
	</view>
</template>

<script>
export default {
	data() {
		return {
			menuTop: uni.getMenuButtonBoundingClientRect(),
			money: "", //ope.money  1 待发货   2 待收货  3售后中  3已退款
			id: null, //订单ID
			orderList: {
				goodsName:"昵称",
				goodsMoney:"55",
				goodsName:"123",
				number:"2",
				optionName:"红"
			}, //订单详情
			isSubmit: false,
			submitId: "",
			aftersalesCount: 2,
		};
	},
	onLoad(ope) {
		if (ope) {
			//ope.money  1 待发货   2 待收货  3售后中  3已退款
			console.log(ope.money, '--------');
			this.money = ope.money
			this.id = ope.id
			uni.setNavigationBarTitle({
				title: ope.tiei
			})
		}
	},
	onShow() {
		this.getdetail(this.id)
	},
	methods: {
		//申请售后
		getservice({ id }) {
			this.$u.route({
				url: "/subpackageA/pages/my/requestRefund/requestRefund",
				params: {
					id,
				}
			})
		},
		//订单详情
		getdetail(id) {
			this.$request.get("/water-platform-app-api/shop/goodsOrder/detail", {
				id: id
			}).then(res => {
				console.log(res, '订单详情');
				this.orderList = res.data
			})
		},
		getcop(e) {
			uni.setClipboardData({
				data: e,
				success(res) {
					uni.showToast({
						title: '复制成功',
						icon: 'none',
					})
				}
			})
		},
		//返回
		getleft() {
			uni.navigateBack()
		},
		submit() {
			if (!this.isSubmit) {
				this.isSubmit = true
			} else {
				return
			}
			this.$request.get("/shop/goodsOrderAftersales/cancel", {
				id: this.submitId,
			}).then(res => {
				this.isSubmit = false
				if (res.code == 0) {
					uni.showToast({
						title: '撤销成功',
						icon: 'none',
						success() {
							this.getdetail(this.id)
						}
					})
					this.$refs.popup.close()
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none',
					})
				}
			}).catch(err => {
				this.isSubmit = false
			})
		},
		//售后
		getsales({ id, aftersalesId }) {
			// this.submitId = id;
			// this.$refs.popup.open('center')
			this.$u.route({
				url: "/subpackageA/pages/my/refundDetails/refundDetails",
				params: {
					aftersalesId
				}
			})
			// subpackageA/pages/my/refundDetails/refundDetails
			// this.aftersalesCount = aftersalesCount;
			// this.$refs.popup.open('center')
		}
	}
}
</script>

<style lang="scss">
.box {
	min-height: 100vh;
	background: #F3F5F6;
	padding: 32rpx 30rpx;
	box-sizing: border-box;
}

.deliveryOfGoods {
	height: 130rpx;
	background: #FFFFFF;
	border-radius: 16rpx;
	display: flex;
	align-items: center;
	padding: 24rpx;
	box-sizing: border-box;

	.image {
		margin-right: 16rpx;

		image {
			width: 48rpx;
			height: 48rpx;
			vertical-align: middle;
		}
	}

	.text-time {
		.text {
			font-size: 28rpx;
			color: #2590FA;
		}

		.time {
			font-size: 24rpx;
			color: #616366;
			margin-top: 8rpx;
		}
	}

	.icon {
		margin-left: auto;
	}
}

.popur {
	width: 552rpx;
	background: #FFFFFF;
	border-radius: 16rpx 16rpx 16rpx 16rpx;
	padding: 48rpx;
	box-sizing: border-box;

	.delete {
		font-size: 28rpx;
		color: #14171A;
		text-align: center;
	}

	.cance-sbmer {
		display: flex;
		justify-content: center;
		margin-top: 64rpx;

		.cance {
			width: 216rpx;
			height: 64rpx;
			border-radius: 100rpx 100rpx 100rpx 100rpx;
			font-size: 28rpx;
			color: #14171A;
			line-height: 64rpx;
			text-align: center;
			border: 2rpx solid #B5B6B6;
		}

		.sbmer {
			background: #2590FA;
			border: none;
			margin-left: 24rpx;
			color: #FFF;
		}
	}
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
		margin-right: 8rpx;

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

			.name {
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
			margin-top: 16rpx;
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
		display: flex;
		flex-direction: column;
		text-align: right;

		.xtwo {
			font-size: 28rpx;
			color: #616366;
		}

		.afterSales {
			margin-top: auto;
			width: 192rpx;
			height: 64rpx;
			border-radius: 100rpx;
			border: 2rpx solid #C1C2C2;
			text-align: center;
			line-height: 64rpx;
			font-size: 28rpx;
			color: #14171A;
		}
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
<template>
	<view class='refundDetails'>
		<view class="refundDetails-contnet">
			<view class="main">
				<view class="returnedForRefund">
					<view class="title">退货退款</view>
					<view class="content">您已提交退款申请，请等待商家处理</view>
				</view>
				<view class="refundAmount">
					<view class="text">
						<view class="title">退款金额</view>
						<view class="number">￥{{ goodsOrderData.realAmount }}</view>
					</view>
					<view class="content">按实付金额计算，原路退回</view>
				</view>
				<view class="refundProcess">
					<view class="title">退款流程</view>
					<view class="content">
						<u-steps :current="current" :dot="true">
							<u-steps-item :title="title1">
							</u-steps-item>
							<u-steps-item :title="title2">

								<view class="slot-icon" slot="icon">
									<!-- <view class="dot" v-if="goodsOrderData.step < 2"
										:style="{ '--bgColor': '#E4E5E6' }">
									</view> -->
									<view class="dot" v-if="goodsOrderData.step != 3"
										:class="{ 'b': goodsOrderData.step >= 2 }">
									</view>
									<u-icon v-if="goodsOrderData.step == 3" name="close-circle-fill" size="20"
										color="#FA4225"></u-icon>
								</view>
							</u-steps-item>
							<u-steps-item :title="title3">

								<view class="slot-icon" slot="icon">
									<u-icon name="checkmark-circle-fill" size="25"
										:color="goodsOrderData.step == 5 ? '#2590FA' : '#606266'"></u-icon>
								</view>
							</u-steps-item>
						</u-steps>
					</view>
				</view>
				<view class="refundInformation">
					<view class="title">退款信息</view>
					<view class="content">
						<view class="info">
							<view class="content-left">
								<view class="image">
									<image style="width: 100%; height: 100%;" :src="goodsOrderData1.goodsLogo">
									</image>
								</view>
								<view class="text">
									<view class="name">{{ goodsOrderData1.goodsName }}</view>
									<view class="number">x{{ goodsOrderData1.number }}</view>
								</view>
							</view>
							<view class="content-right">
								<!-- <view class="outOfPocket">退款：￥400.00无字段</view> -->
								<view class="refundable">实付：￥{{ goodsOrderData1.realAmount }}</view>
							</view>
						</view>
						<view class="reason">
							<view class="reason-left">退款原因</view>
							<view class="reason-right">{{ goodsOrderData.reason }}</view>
						</view>
						<view class="number">
							<view class="number-left">订单编号</view>
							<view class="number-right">{{ goodsOrderData.orderCode }}</view>
						</view>
					</view>
				</view>
				<view class="box-btn">
					<view class="btn" @click="kf">联系客服</view>
					<view class="btn" @click="getsales">取消退款</view>
				</view>
			</view>
		</view>
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
	import {
		goodsOrderAftersalesDetail,
		goodsOrderAftersalesOrderItemInfo,
		goodsOrderAftersalesCancel
	} from "@/api/api.js"

	export default {
		name: 'refundDetails',
		data() {
			return {
				goodsOrderData: {
					step: 5,
				},
				goodsOrderData1: {},
				current: "0",
				title1: "提交申请",
				title2: "审核通过",
				title3: "退款成功",
				submitId: "",
			};
		},
		onLoad({
			aftersalesId
		}) {
			this.getData(aftersalesId)
		},
		onShow() {},
		onHide() {},
		methods: {
			kf() {
				uni.navigateTo({
					url: "/subpackageA/pages/my/customerServiceCenter/customerServiceCenter"
				})
			},
			//取消售后
			submit() {
				if (!this.isSubmit) {
					this.isSubmit = true
				} else {
					return
				}
				goodsOrderAftersalesCancel({
					id: this.goodsOrderData.id,
				}).then(res => {
					this.isSubmit = false
					if (res.code == 0) {
						uni.showToast({
							title: '取消成功',
							icon: 'none',
							success() {
								uni.navigateBack({
									delta: 1
								})
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
			getsales() {
				console.log("5555555");
				this.$refs.popup.open('center')
			},
			//售后详情
			getData(id) {
				goodsOrderAftersalesDetail({
					id:id
				}).then(res => {
					if (res.code == 0) {
						this.goodsOrderData = res.data;
						const {
							step
						} = res.data;
						this.getGoodsOrderData(res.data.goodsOrderItemId)
						if (step == -1) {
							this.current == "0"
							this.title1 == "已取消"
						} else if (step == 1) {
							this.current == "0"
							// this.title1 == "审核中"
						} else if (step == 2) {
							this.current == "1"
							this.title2 == "审核通过"
						} else if (step == 3) {
							this.current == "1"
							this.title2 == "审核失败"
						} else if (step == 5) {
							this.current == "2"
							this.title2 == "已退款"
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			//获得售后订单商品
			getGoodsOrderData(id) {
				goodsOrderAftersalesOrderItemInfo({
					id
				}).then(res => {
					if (res.code == 0) {
						this.goodsOrderData1 = res.data;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
		},
		onPullDownRefresh() {},
		onReachBottom() {},
	};
</script>
<style lang="scss">
	.refundDetails {
		display: flex;
		flex-direction: column;

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

		.refundDetails-contnet {
			flex: 1;
			overflow: auto;
			padding: 32rpx;
			box-sizing: border-box;

			.main {
				background: #FFFFFF;
				border-radius: 24rpx;
				height: fit-content;
				padding: 32rpx;
				box-sizing: border-box;

				>view {
					&:not(:nth-last-child(-n+2)) {
						border-bottom: 1rpx solid #E4E5E6;
						padding-bottom: 32rpx;
						box-sizing: border-box;
						margin-bottom: 32rpx;
					}
				}

				.title {
					font-family: PingFang SC, PingFang SC;
					font-weight: 500;
					font-size: 28rpx;
					color: #14171A;
					line-height: 33rpx;

				}

				.returnedForRefund {
					.title {
						font-size: 36rpx;
						line-height: 42rpx;
						margin-bottom: 10rpx;
					}

					.content {
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #616366;
						line-height: 28rpx;
					}
				}

				.refundAmount {

					.text {
						display: flex;
						justify-content: space-between;
						margin-bottom: 10rpx;

						.title {}

						.number {
							font-family: PingFang SC, PingFang SC;
							font-weight: 500;
							font-size: 32rpx;
							color: #FA4225;
							line-height: 38rpx;
						}
					}

					.content {
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #B1B2B2;
						line-height: 28rpx;
						text-align: end;
					}
				}

				.refundProcess {
					.title {}

					.content {
						.slot-icon {
							.dot {
								width: 20rpx;
								height: 20rpx;
								border-radius: 50%;
								background: #606266;
							}

							.b {
								background: #2590FA;
							}
						}

						.slot-icon {}
					}
				}

				.refundInformation {
					.title {
						margin-bottom: 32rpx;
					}

					.content {

						.info {
							display: flex;
							justify-content: space-between;

							.content-left {
								display: flex;
								justify-content: space-between;

								.image {
									width: 128rpx;
									height: 128rpx;
									border-radius: 12rpx;
									margin-right: 16rpx;
								}

								.text {
									.name {
										font-family: PingFang SC, PingFang SC;
										font-weight: 500;
										font-size: 28rpx;
										color: #2E3033;
										line-height: 33rpx;
										margin-bottom: 10rpx;
									}

									.number {
										font-family: PingFang SC, PingFang SC;
										font-weight: 400;
										font-size: 28rpx;
										color: #616366;
										line-height: 33rpx;
									}
								}
							}

							.content-right {
								.outOfPocket {
									font-family: PingFang SC, PingFang SC;
									font-weight: 400;
									font-size: 28rpx;
									color: #14171A;
									line-height: 33rpx;
									margin-bottom: 10rpx;
									text-align: end;
								}

								.refundable {
									font-family: PingFang SC, PingFang SC;
									font-weight: 400;
									font-size: 24rpx;
									color: #616366;
									line-height: 28rpx;
									text-align: end;
								}
							}
						}

						.reason {
							display: flex;
							justify-content: space-between;
							margin-bottom: 32rpx;

							.reason-left {
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 28rpx;
								color: #616366;
								line-height: 33rpx;
							}

							.reason-right {
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 28rpx;
								color: #14171A;
								line-height: 33rpx;
							}
						}

						.number {
							display: flex;
							justify-content: space-between;
							margin-bottom: 48rpx;


							.number-left {
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 28rpx;
								color: #616366;
								line-height: 33rpx;
							}

							.number-right {
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 28rpx;
								color: #14171A;
								line-height: 33rpx;
							}
						}
					}
				}

				.box-btn {
					display: flex;
					justify-content: flex-end;

					.btn {
						border-radius: 100rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						line-height: 33rpx;
						padding: 12rpx 40rpx;
						border: 1rpx solid;
						margin-left: 24rpx;

						&:nth-last-child(2) {
							border-color: #2590FA;
							color: #2590FA;
						}

						&:nth-last-child(1) {
							border-color: #B5B7B7;
							color: "";
						}
					}
				}
			}
		}

	}
</style>
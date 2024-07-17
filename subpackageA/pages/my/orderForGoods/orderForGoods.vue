<template>
	<view class="box">
		<view class="header" :style="{height: menuTop.top + menuTop.height + 'px', paddingBottom:menuTop.height + 'rpx'}">
			<tito :leftIconShow="true" :slotLeft="true">
				<template v-slot:left>
					<view class="icon" @click="leftIcon">
						<u-icon name="arrow-left" color="#B1B2B2" size="28"></u-icon>
					</view>
				</template>
				<template v-slot:center>
					<view class="search">
						<view class="icon_left">
							<u-icon name="search" color="#B1B2B2" size="28"></u-icon>
						</view>
						<view class="sea">
							<u-input placeholder="搜索订单" border="surround" v-model="listData.queryGoodsName"
								@confirm="confirm" @blur="confirm" style="border: none;"></u-input>
						</view>
						<view class="icon_right" @click="clear">
							<u-icon name="close-circle-fill" color="#B1B2B2" size="20"
								v-if="listData.queryGoodsName.length > 0"></u-icon>
						</view>
					</view>
				</template>
			</tito>
		</view>
		<view class="whole" style="margin-bottom: 24rpx;">
			<uni-segmented-control :current="Number(current)" :values="items" @clickItem="onClickItem" styleType="text"
				activeColor="#2590FA"></uni-segmented-control>
		</view>
		<view class="main">
			<scroll-view :scroll-y="true" :refresher-enabled="true" :refresher-threshold="0"
				@refresherrefresh="refresherrefresh" style="height: 100%;overflow: auto;"
				:refresher-triggered="refresherTriggered" @scrolltolower="scrolltolower" :lower-threshold="20">
				<!-- <view class="main"> -->
				<u-transition :show="true" v-for="(item, index) in goodsOrderList" :key="item.id" mode="slide-left">
					<view class="commodity">
						<view class="conten">
							<view class="commod-image-payment">
								<view class="commod">
									订单号：{{ item.code }}
								</view>
								<view class="image" @click="getcop(item.code)">
									<image src="../../static/fuzhi.png" mode=""></image>
								</view>
								<view class="payment">
									{{ getStatusText(item.status) }}
								</view>
							</view>
							<view class="commoditys-image">
								<view class="commoditys" @click="getcommodity(item)"
									v-for="(item2, index2) in item.orderItemList" :key="item2.id">
									<view class="image">
										<image :src="item2.goodsLogo" mode=""></image>
									</view>
									<view class="name-text">
										<view class="name">
											<view class="cycle">
												{{ item2.goodsName }}
											</view>
											<view class="xtwo">
												￥{{ item2.goodsMoney }}
											</view>
										</view>
										<view class="cycle-xtwo">
											<view class="cycle">
												{{ item2.goodsName }}
											</view>
											<view class="xtwo">
												x{{ item2.number }}
											</view>
										</view>
										<view class="text" v-if="item2.optionName">
											规格：{{ item2.optionName }}
										</view>
									</view>
								</view>
							</view>
							<view class="sements">
								实付款: <text class="icon">￥</text> <text class="numder">{{ item.money }}</text>
							</view>
							<view class="buttonList">
								<view class="textList sales" @click="getLogistics(item)" v-if="item.status == 2">
									查看物流
								</view>
								<view class="button textList" @click="getconfirmRec(item)" v-if="item.status == 2">
									确认收货
								</view>

								<view class="paySeconds" v-if="item.status == 0">
									支付剩余：
									<uni-countdown :show-day="false" :hour="convertSecondsToHMS(item.paySeconds).hours"
										:minute="convertSecondsToHMS(item.paySeconds).minutes"
										:second="convertSecondsToHMS(item.paySeconds).remainingSeconds" color="red" />
								</view>
								<view class="button textList" @click="pameny(item)" v-if="item.status == 0">
									继续支付
								</view>
							</view>
						</view>
					</view>
				</u-transition>
				<u-loadmore v-if="goodsOrderList.length > 0" :status="status" />
				<view v-else class="nodata" v-show="goodsOrderList.length <= 0">
					<view class="content">
						<!-- <image src="../../static/img/none.png"></image> -->
						<view class="text"> 暂无数据</view>
					</view>
				</view>
				<!-- </view> -->
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menuTop: uni.getMenuButtonBoundingClientRect(),
				inputX: false,
				refresherTriggered: false,
				inputData: "",
				status: "loading",
				listData: {
					queryGoodsName: "",
					page: 1,
					limit: 10,
					status: "", //状态(不传为全部): -1-已关闭(已取消), 0-未完成, 1-待发货, 2-已发货, 3-已退款, 4-已完成
				},
				items: ['全部', '待支付', '待发货', '待收货', '退换货'],
				current: "0",
				status: null, // 状态(不传为全部): -1-已关闭(已取消), 0-未完成, 1-待发货, 2-待收货, 3-已退款, 4-已完成
				page: 1, //页
				limit: 10, //条
				goodsOrderList: [],
				terval: null,
			};
		},
		onLoad(ope) {
			if (ope) {
				this.current = ope.current;
				// this.listData.status = ope.current- 1
				if (ope.current == 0) {
					delete this.listData.status
				} else {
					this.listData.status = ope.current - 1
				}
				this.status = ope.status
				// this.getgoodsOrderList()
			} else {
				// this.getgoodsOrderList()
			}
		},
		onShow() {
			this.getgoodsOrderList()
		},
		methods: {
			leftIcon(){
				uni.navigateBack()
			},
			//去商城
			getcurrently() {
				uni.switchTab({
					url: "/pages/mall/mall"
				})
			},
			//秒 转 时分秒
			convertSecondsToHMS(seconds) {
				var hours = Math.floor(seconds / 3600);
				var remainingSeconds = seconds % 3600;
				var minutes = Math.floor(remainingSeconds / 60);
				var remainingSeconds = remainingSeconds % 60;
				return {
					"hours": hours,
					"minutes": minutes,
					"remainingSeconds": remainingSeconds
				}
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
			getStatusText(status) {
				switch (status) {
					case -1:
						return '已关闭';
					case 0:
						return '未完成';
					case 1:
						return '待发货';
					case 2:
						return '待收货';
					case 3:
						return '已退款';
					case 4:
						return '已完成';
					default:
						return '未知状态';
				}
			},
			confirm() {
				this.getgoodsOrderList()
			},
			clear() {
				this.$set(this.listData, 'queryGoodsName', '')
				this.getgoodsOrderList()
			},
			refresherrefresh() {
				this.refresherTriggered = true;
				this.status = "loading"
				this.listData.page = 1;
				this.getgoodsOrderList()
			},
			scrolltolower() {
				if (this.status == "nomore") return;
				if (!this.loading) {
					this.listData.page++;
					this.status = "loading"
					this.getgoodsOrderList(false);
				}
			},
			onClickItem(e) {
				if (e.currentIndex == 0) {
					delete this.listData.status
				} else {
					this.listData.status = e.currentIndex - 1
				}
				this.status = "loading"
				this.listData.page = 1;
				this.getgoodsOrderList();
			},
			//确认收货
			getconfirmRec(e) {
				this.$request.get("/shop/goodsOrder/confirmRec", {
					id: e.id
				}).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: "收货成功!",
							icon: "none"
						})
						this.goodsOrderList = []
						this.page = 1
						this.getgoodsOrderList()
					}
				})
			},
			//申请售后
			getservice({
				id
			}) {
				this.$u.route({
					url: "/subpackageA/pages/my/requestRefund/requestRefund",
					params: {
						id,
					}
				})
			},
			//订单列表
			getgoodsOrderList(state = true) {
				this.$request.get("/shop/goodsOrder/list", this.listData).then(res => {
					setTimeout(() => {
						this.loading = false;
					}, 200);
					this.refresherTriggered = false;
					if (res.code == 0) {
						if (this.listData.limit > res.data.length) {
							this.status = "nomore"
						} else {
							this.status = "loadmore"
						}
						if (state) {
							this.goodsOrderList = res.data;
							if (this.isInitialize) {
								this.isInitialize = false
							}
						} else {
							this.goodsOrderList.push(...res.data)
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			//查看物流
			getLogistics(e) {
				uni.navigateTo({
					url: "/subpackageA/pages/my/viewLogistics/viewLogistics?id=" + e.id
				})
			},
			//继续支付
			pameny(e) {
				let totalSum = e.orderItemList.reduce((item, items, inds) => {
					if (e.orderItemList.length - 1 != inds) {
						item.goodsIds += items.goodsId + ","
						item.goodsOptionsIds += items.optionId + ","
						item.numbers += items.number + ","
					} else {
						item.goodsIds += items.goodsId
						item.goodsOptionsIds += items.optionId
						item.numbers += items.number
					}
					return item
				}, {
					goodsIds: "",
					goodsOptionsIds: "",
					numbers: ""
				});
				this.$u.route({
					url: "/subpackageA/pages/mall/ConfirmOrderPlacement",
					params: {
						tiei: "待支付",
						data: JSON.stringify(totalSum)
					}
				})
			},
			//点击商品跳转待发货收货等 
			getcommodity(e) {
				uni.navigateTo({
					url: "/subpackageA/pages/my/xxxmoney/xxxmoney?tiei=" + this.getStatusText(e.status) + "&money=" + e
						.status +
						"&id=" + e.id
				})
			},
		}
	}
</script>

<style lang="scss">
	.box {
		background-color: #F3F5F6;
		display: flex;
		flex-direction: column;
		height: 100%;
		.header {
			height: 176rpx;
			overflow: hidden;
			position: relative;

			.bg {
				height: 100%;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.navbar {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;

				.search {
					width: 438rpx;
					height: 72rpx;
					background: #FFFFFF;
					border-radius: 100rpx 100rpx 100rpx 100rpx;
					transform: translateX(-60rpx);
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0rpx 24rpx;
					box-sizing: border-box;
					::v-deep .u-border{
						border:none !important;
					}
				}
			}
		}

		.main {
			flex: 1;
			overflow: auto;
		}

		.nodata {
			display: grid;
			place-content: center;
			height: 100%;
			margin-top: 32rpx;
			.content {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;

				image {
					width: 150px;
					height: 114px;
				}

				.text {
					font-size: 20rpx;
				}
			}

		}
	}

	.tito {
		height: 208rpx;
		background: linear-gradient(360deg, rgba(212, 231, 250, 0) 0%, #D4E7FA 100%);
		display: flex;
		overflow: hidden;

		.icons {
			height: 72rpx;
			margin-left: 30rpx;
			line-height: 72rpx;
		}

		.selected {
			width: 438rpx;
			height: 72rpx;
			background: #FFF;
			border-radius: 100rpx;
			margin-left: 30rpx;
			display: flex;
			align-items: center;
			padding: 12rpx 24rpx;
			box-sizing: border-box;

			.input {
				margin-left: 16rpx;
			}

			.iconX {
				margin-left: auto;
			}
		}
	}

	.currently {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 500rpx;

		.currentlys {
			font-size: 32rpx;
			color: #B1B2B2;
		}

		.text {
			width: 232rpx;
			height: 72rpx;
			background: #2590FA;
			border-radius: 100rpx;
			font-size: 28rpx;
			text-align: center;
			line-height: 72rpx;
			color: #FFFFFF;
			margin-top: 16rpx;
		}
	}

	.commodity {
		margin-top: 24rpx;

		.conten:first-child {
			margin-top: 0rpx;
		}

		.conten {
			background: #FFFFFF;
			border-radius: 16rpx;
			margin: 0 30rpx;
			padding: 24rpx;
			box-sizing: border-box;
			margin-top: 24rpx;

			.commod-image-payment {
				display: flex;
				align-items: center;

				.commod {
					font-size: 28rpx;
					color: #616366;
				}

				.image {
					margin-left: 8rpx;

					image {
						width: 32rpx;
						height: 32rpx;
						vertical-align: middle;
					}
				}

				.payment {
					font-size: 24rpx;
					color: #2590FA;
					margin-left: auto;
				}
			}

			.commoditys-image {
				min-height: 200rpx;

				.commoditys {
					margin-top: 24rpx;
					border-radius: 16rpx;
					display: flex;

					.image {
						image {
							width: 168rpx;
							height: 168rpx;
						}
					}

					.name-text {
						margin-left: 16rpx;
						flex: 1;

						.name {
							font-weight: 600;
							font-size: 28rpx;
							color: #2E3033;
							display: flex;
							align-items: center;
							justify-content: space-between;
							margin-top: 16rpx;
						}

						.text {
							font-size: 24rpx;
							color: #616366;
							margin-top: 16rpx;
						}

						.cycle-xtwo {
							margin-top: 16rpx;
							display: flex;
							align-items: center;
							justify-content: space-between;
							font-size: 24rpx;
							color: #616366;

							.xtwo {
								margin-left: auto;
								color: #B1B2B2;
							}
						}
					}
				}
			}

			.sements {
				text-align: right;
				font-size: 24rpx;
				color: #14171A;
				margin-top: -34rpx;

				.icon {
					font-size: 28rpx;
					color: #FA6B05;
				}

				.numder {
					font-size: 36rpx;
					color: #FA6B05;
				}
			}

			.buttonList {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				margin-top: 28rpx;
				grid-gap: 16rpx;

				.textList {
					border-radius: 100rpx;
					font-size: 28rpx;
					color: #FFFFFF;
					text-align: center;
					line-height: 64rpx;
					width: 192rpx;
					height: 64rpx;
				}

				.paySeconds {
					font-size: 24rpx;
					color: #616366;
					display: flex;
					align-items: center;
					margin-right: auto;
				}

				.button {
					background: #2590FA;
				}

				.sales {
					font-size: 28rpx;
					color: #14171A;
					border: 2rpx solid #B2B4B4;
				}
			}
		}
	}
</style>
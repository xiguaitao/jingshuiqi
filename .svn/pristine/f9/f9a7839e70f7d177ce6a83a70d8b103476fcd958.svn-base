<template>
	<view class="box">
		<view class="addrss" v-if="!goodsConten">
			<view class="image">
				<image src="../../static/tianjia.png" mode=""></image>
			</view>
			<view class="text" @click="getaddress">
				添加收货地址
			</view>
		</view>
		<view class="text-name-porn-icon" @click="getMyAddress" v-else>
			<view class="text-name-porn">
				<view class="text">
					{{ goodsConten.provinceName }}
					{{ goodsConten.cityName }}
					{{ goodsConten.areaName }}
					{{ goodsConten.address }}
				</view>
				<view class="name-porn">
					<text class="name">{{ goodsConten.name }}</text>
					<text class="porn">{{ goodsConten.mobile }}</text>
				</view>
			</view>
			<view class="icon">
				<uni-icons type="right" size="30" color="#B1B2B2"></uni-icons>
			</view>
		</view>
		<view class="commodityList">
			<view class="commodity" v-for="(tiem, index) in goodsDetaildata.goodsList" :key="index">
				<view class="image">
					<image :src="tiem.goodsLogo" mode=""></image>
				</view>
				<view class="name-text">
					<view class="name">
						{{ tiem.goodsName }}
					</view>
					<view class="text" v-if="tiem.optionName">
						规格：{{ tiem.optionName }}
					</view>
					<view class="money">
						<span class="money-icon">￥</span>
						<span class="moneyMonth">{{ tiem.money }}</span>
						<!-- <span class="moneyText">/月</span> -->
					</view>
				</view>
				<view class="number-box">
					<uni-number-box v-model="tiem.number" @change="changeValue(tiem, $event)" min="1" />
				</view>
			</view>
		</view>
		<view class="coupons">
			<view class="coupons-text" @click="getcoupon">
				<view class="text">
					优惠券
				</view>
				<view class="icons">
					<view v-if="useyhj && useyhj.money">
						{{ "优惠" + useyhj.money + "元"}}
					</view>
					<view v-else>
						{{goodsDetaildata.couponList && goodsDetaildata.couponList.length == 0 ? '暂无可用优惠券' : '请选择优惠劵' }}
					</view>
					<uni-icons type="right" size="20" color="#BEC0C0"></uni-icons>
				</view>
			</view>
			<view class="text-switch">
				<view class="text">
					可用{{ goodsDetaildata.integralMoney }}积分
				</view>
				<view class="switch">
					<switch :checked="checked" color="#2590FA" @change="defaultAddress" style="transform:scale(0.8)" />
				</view>
			</view>
		</view>
		<!-- <view class="payment">
			<view class="image-text-checkbox" v-for="(item, index) in paymentList" :key="item.id">
				<view class="image">
					<image :src="item.url" mode=""></image>
				</view>
				<view class="text">
					{{ item.name }}
				</view>
				<view class="checkbox">
					<checkbox-group @change="handleCheckboxChange">
						<label>
							<checkbox v-model="item.id" :checked="item.id == paymentId" color="#2590FA" />
						</label>
					</checkbox-group>
				</view>
			</view>
		</view> -->
		<view class="text-money-payments">
			<view class="text">
				合计:
			</view>
			<view class="money">
				￥{{ totalamount || goodsDetaildata.totalMoney }}
			</view>
			<view class="payments" @click="getpayment">
				立即支付
			</view>
		</view>
		<u-popup :show="show" :round="10" mode="bottom" @close="close" @open="open">
			<view class="popup">
				<view class="yhj">
					优惠卷
				</view>
				<view class="couponList-yhj-couponList">
					<view class="couponList-yhj" v-for="item in goodsDetaildata.couponList" :key="item.id">
						<view class="couponList">
							<view class="image-text">
								<view class="image">
									<image src="../../static/bg-yhj.png" mode=""></image>
								</view>
								<view class="money">
									<view class="ten">
										{{item.money}}<text>元</text>
									</view>
									<view class="text">
										{{item.orderMoney == 0 ? "无门槛" : "满" + item.orderMoney + "可用"}}
									</view>
								</view>
							</view>
							<view class="discount-timeYon-icon">
								<view class="discount">
									{{item.settingName}}
								</view>
								<view class="time-yon">
									<view class="time">
										{{item.fmtStartTime}}-{{item.fmtEndTime}}
									</view>
									<view class="yon" @click="getuse(item)">
										使用
									</view>
								</view>
								<view class="icon" @click="openshow(item.id)">
									使用说明
									<uni-icons :class="item.id == openShow ?  'rotate-animation' : 'rotate-animations'"
										type="down" size="15" color="#616366"></uni-icons>
								</view>
							</view>
						</view>
						<view class="bnt" v-show="item.id == openShow">
							<rich-text :nodes="item.settingRemark"></rich-text>
						</view>
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
				openShow: null,
				show: false,
				vModelValue: 0,
				paymentId: '2',
				// paymentList: [{
				// 		id: '2',
				// 		name: "微信支付",
				// 		url: require("../static/weixin.png")
				// 	},
				// 	// {
				// 	// 	id: '1',
				// 	// 	name: "支付宝支付",
				// 	// 	url: require("../static/zhifubao.png")
				// 	// }
				// ],
				checked: null, //积分是否使用 
				goodsDetaildata: {},
				goodsConten: {}, //地址信息
				dataid: null, //商品ID等信息
				totalamount: 0, //总价格
				numbers: null, //拼接后的数量字符串
				shoppingCartIds: "", //拼接后的购物车id 
				useyhj: {},
			};
		},
		onLoad(ope) {
			if (ope.tiei) {
				uni.setNavigationBarTitle({
					title: ope.tiei
				})
			}
			if (ope.data) {
				this.dataid = JSON.parse(ope.data)

			}
			if (ope.shoppingCartIds) {
				this.shoppingCartIds = ope.shoppingCartIds
			}
		},
		async onShow() {
			await this.getData(this.dataid)
			uni.$once('getcbk', (data) => {
				setTimeout(() => {
					this.goodsConten = data
				}, 500)
				uni.$off('getcbk');
			})
		},
		methods: {
			getuse(e) {
				this.useyhj = e
				this.show = false
			},
			open() {
				console.log('open');
			},
			close() {
				this.show = false
				console.log('close');
			},
			openshow(id) {
				if (this.openShow === id) {
					this.openShow = null;
				} else {
					this.openShow = id;
				}
			},
			async getData(data) {
				await this.$request.get("/water-platform-app-api/shop/goodsOrder/confirm", data).then(res => {
					if (res.code == 0) {
						this.goodsDetaildata = res.data
						this.goodsConten = res.data.customerAddressList.find(item => item.isdefault == 1) ||
							res.data.customerAddressList[0] || false;
						console.log(this.goodsConten, '接口返回的');
						this.checked = res.data.integralMoney > 0
					}
				})
			},
			//加减数量
			changeValue(e, value) {
				this.totalamount = 0
				this.goodsDetaildata.goodsList.map(item => {
					this.totalamount += item.money * item.number
				})
				const numbersArray = this.goodsDetaildata.goodsList.map(item => item.number);
				this.numbers = numbersArray.join(',');
			},
			handleCheckboxChange(event) {
				const checkedId = event.detail.value[0];
				this.paymentId = checkedId;
			},
			//支付
			async getpayment() {
				if (!this.goodsConten.id) {
					return uni.showToast({
						title: "请选择地址",
						icon: 'none'
					})
				}
				let data = {
					goodsIds: this.dataid.goodsIds, // 商品id(多个逗号拼接)
					goodsOptionsIds: this.dataid.goodsOptionsIds, // 商品SKU id(多个逗号拼接)
					numbers: this.numbers || this.dataid.numbers, //数量(多个逗号拼接)
					type: this.paymentId, //支付方式: 1-支付宝, 2-微信, 3-余额
					addressId: this.goodsConten.id, //地址id
					useIntegral: this.checked ? 2 : 1, // 使用积分: 1-不使用, 2-使用
					couponId: this.useyhj.id || 0, //优惠券id
					shoppingCartIds: this.shoppingCartIds, //购物车id(多个逗号拼接)
					openId: uni.getStorageSync("openId").openid
				}
				await this.$request.get("/water-platform-app-api/shop/goodsOrder/save", data).then(res => {
					//pay false 不需要支付  true 需要支付
					if (res.data && !res.data.pay) {
						uni.showToast({
							title: '支付成功',
							icon: 'none'
						})
						setTimeout(() => {
							uni.reLaunch({
								url: "/pages/mall/mall"
							})
						}, 1000);
					} else {
						uni.requestPayment({
							provider: "wxpay",
							nonceStr: res.data.noncestr,
							package: res.data.packages,
							signType: res.data.signType,
							paySign: res.data.sign,
							timeStamp: res.data.timestamp,
							success: res => {
								uni.showToast({
									title: '支付成功',
									icon: 'none'
								})
								setTimeout(() => {
									uni.reLaunch({
										url: "/pages/mall/mall"
									})
								}, 1000);
							},
							fail: function(err) {
								console.log('支付失败:' + JSON.stringify(err));
							}
						})
					}
				})
			},
			//跳转到添加地址
			getaddress() {
				// uni.navigateTo({
				// 	url: "/subpackageA/pages/mall/address?title=" + "添加地址"
				// })
				this.$u.route({
					url: "/subpackageA/pages/mall/address/address",
					params: {
						title: "添加地址",
					}

				})
			},
			//跳转到地址列表
			getMyAddress() {
				this.$u.route({
					url: "/subpackageA/pages/device/myAddress/myAddress",
					params: {
						myCenter: true,
					}
				})
			},
			defaultAddress: function(e) {},
			//跳转优惠劵
			getcoupon() {
				this.show = true
				// uni.navigateTo({
				// 	url: "/subpackageA/pages/my/coupon"
				// })
			},
		}
	}
</script>

<style lang="scss">
	.box {
		min-height: 100vh;
		background-color: #F3F5F6;
		padding: 32rpx 30rpx;
		box-sizing: border-box;
		position: relative;
	}

	.popup {
		height: 952rpx;
		overflow-y: auto;
		padding: 0px 0 60rpx;
		box-sizing: border-box;
		background-color: #F3F5F6;

		.yhj {
			text-align: center;
			font-weight: 700;
			font-size: 32rpx;
			padding: 30rpx 30rpx 10rpx 30rpx;
			box-sizing: border-box;
		}

		.couponList-yhj-couponList {

			.couponList-yhj {
				margin-top: 24rpx;

				.couponList {
					height: 234rpx;
					background: #FFFFFF;
					box-shadow: 0rpx 8rpx 20rpx 0rpx #F0F1F2;
					border-radius: 16rpx;
					margin: 0 30rpx;
					display: flex;

					.image-text {
						position: relative;

						.image {
							image {
								width: 220rpx;
								height: 234rpx;
							}
						}

						.money {
							position: absolute;
							text-align: center;
							left: 46rpx;
							top: 36rpx;

							.ten {
								font-size: 80rpx;
								color: #FFFFFF;

								text {
									font-size: 32rpx;
								}
							}

							.text {
								font-size: 28rpx;
								color: #FFFFFF;
								margin-top: 8rpx;
							}
						}
					}

					.discount-timeYon-icon {
						flex: 1;
						margin-left: 32rpx;

						.discount {
							font-weight: 600;
							font-size: 32rpx;
							color: #14171A;
							margin-top: 44rpx;
						}

						.time-yon {
							display: flex;
							align-items: center;
							margin-top: 16rpx;

							.time {
								font-size: 24rpx;
								color: #616366;
							}

							.yon {
								width: 112rpx;
								height: 50rpx;
								background: linear-gradient(135deg, #FA8C3E 0%, #FA573E 100%);
								border-radius: 8rpx;
								text-align: center;
								line-height: 50rpx;
								font-size: 24rpx;
								color: #FFFFFF;
								margin-left: auto;
								margin-right: 32rpx;
							}
						}

						.icon {
							margin-top: 16rpx;
							font-size: 24rpx;
							color: #616366;
							display: flex;
							align-items: center;

							/* 定义动画播放 */
							.rotate-animation {
								transition: 0.2s;
								transform: rotateZ(180deg);
							}

							.rotate-animations {
								transition: 0.2s;
								transform: rotateZ(0deg);
							}
						}
					}


				}

				.bnt {
					margin: 0 30rpx;
					height: 120rpx;
					background: #FFFFFF;
					box-shadow: 0rpx 8rpx 20rpx 0rpx #F0F1F2;
					border-top: 2rpx solid #F1F2F2;
					padding: 24rpx;
					box-sizing: border-box;

					.text {
						font-size: 20rpx;
						color: #616366;
					}
				}
			}
		}
	}

	.addrss {
		height: 186rpx;
		background: #FFFFFF;
		border-radius: 16rpx 16rpx 16rpx 16rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		.image {
			image {
				width: 48rpx;
				height: 48rpx;
				vertical-align: middle;
			}
		}

		.text {
			font-size: 32rpx;
			color: #2E3033;
			margin-left: 16rpx;
		}
	}

	.text-name-porn-icon {
		height: 186rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24rpx;
		box-sizing: border-box;
		border-bottom: 8rpx solid transparent;
		/* 设置边框的大小 */
		border-image: url('@/static/image/dizhixian.png') 50 repeat;
		/* 应用边框图片 */

		.text-name-porn {
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
		height: 224rpx;
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

		.number-box {
			margin-top: auto;
			margin-left: auto;
		}
	}

	.coupons {
		background: #FFFFFF;
		border-radius: 16rpx 16rpx 16rpx 16rpx;
		margin-top: 24rpx;
		padding: 24rpx;
		box-sizing: border-box;

		.coupons-text {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.text {
				font-size: 28rpx;
				color: #2E3033;
			}

			.icons {
				display: flex;
				align-items: center;
				font-size: 24rpx;
				color: #B1B2B2;
			}
		}

		.text-switch {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 32rpx;

			.text {
				font-size: 28rpx;
				color: #2E3033;
			}
		}
	}

	.payment {
		// height: 176rpx;
		background: #FFFFFF;
		border-radius: 16rpx 16rpx 16rpx 16rpx;
		margin-top: 24rpx;
		padding: 24rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.image-text-checkbox {
			display: flex;
			align-items: center;

			.image {
				image {
					width: 48rpx;
					height: 48rpx;
					vertical-align: middle;
				}
			}

			.text {
				margin-left: 16rpx;
				font-size: 28rpx;
				color: #2E3033;
			}

			.checkbox {
				margin-left: auto;
			}
		}
	}

	.text-money-payments {
		width: 100%;
		height: 136rpx;
		background: #FFFFFF;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		box-sizing: border-box;

		.text {
			font-size: 28rpx;
			color: #2E3033;
		}

		.money {
			font-size: 28rpx;
			color: #FA6B05;
		}

		.payments {
			width: 232rpx;
			height: 72rpx;
			background: linear-gradient(144deg, #FAA805 0%, #FA6B05 100%);
			border-radius: 100rpx 100rpx 100rpx 100rpx;
			font-size: 28rpx;
			color: #FFFFFF;
			line-height: 72rpx;
			text-align: center;
			margin-left: auto;
		}
	}
</style>
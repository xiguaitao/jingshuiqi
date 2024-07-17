<template>
	<view class="box">
		<view class="tito">
			<u-navbar title="取水" :leftIconShow="true" :autoBack="true" bgColor="transparent" :fixed="false">
			</u-navbar>
		</view>
		<view class="image-tito">
			<image :src="orderInfoData.logo" mode=""></image>
		</view>
		<view class="package">
			<view class="unit-price">
				<view class="unit">
					单价
				</view>
				<view class="price">
					￥{{ orderInfoData.waterPrice }}/L
				</view>
			</view>
			<view class="unit-price">
				<view class="unit">
					水质
				</view>
				<view class="unit">
					{{ orderInfoData.cstds }}PPM
				</view>
			</view>
			<view class="unit-price">
				<view class="unit">
					设备状态
				</view>
				<view class="unit">
					{{ orderInfoData.netStatus == 1 ? "正常" : "离线" }}
				</view>
			</view>
			<view class="unit-price">
				<view class="unit">
					取水方式
				</view>
				<view class="radio-group">
					<u-radio-group v-model="radiovalue1" @change="groupChange">
						<u-radio :customStyle="{ marginRight: '8px' }" v-for="(item, index) in radiolist1" :key="index"
							:label="item.name" :name="item.id" size="14">
						</u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="tao-can" v-if="radiovalue1 == 1">
				<view :class="packTaocan == index ? 'pack-taocan' : 'pack-taocans'"
					v-for="(item, index) in orderInfoData.setMealList" :key="item.id" @click="getTaoCan(index, item)">
					<view class="pack">
						{{ item.name }}
					</view>
					<view class="money">
						￥{{ item.finalMoney }}
					</view>
				</view>
			</view>
			<view v-else>
				<view class="text-input">
					<view class="text">
						取水金额（元）
					</view>
					<view class="input">
						<u-input type="number" v-model="moneyData" placeholder="请输入取水金额" @input="inputNumber"
							@blur="inputBlur"></u-input>
					</view>
				</view>
				<view class="unit-price">
					<view class="unit">
						取水量（升）
					</view>
					<view class="unit">
						{{ moneyNumder }}L
					</view>
				</view>
				<view class="bfb">
					建议水量为容器的80%
				</view>
			</view>
		</view>
		<view class="money-text-bnt">
			<view class="money-text">
				合计:￥{{ radiovalue1 == 2 ? moneyData : orderData.finalMoney }}
			</view>
			<view class="bnt" @click="orrQs">
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
							设备编号:
						</view>
						<view class="code" @longpress="logoTime(orderInfoData.equipCode)">
							{{ orderInfoData.equipCode }}
						</view>
					</view>
					<view class="device-code">
						<view class="device">
							设备名称:
						</view>
						<view class="code">
							{{ orderInfoData.equipName }}
						</view>
					</view>
					<view class="device-code" v-if="radiovalue1 == 1">
						<view class="device">
							套餐名称:
						</view>
						<view class="code">
							{{ orderData.name }}
						</view>
					</view>
					<view class="device-code" v-else>
						<view class="device">
							取水量(升):
						</view>
						<view class="code">
							{{ moneyNumder }}
						</view>
					</view>
					<view class="device-code">
						<view class="device">
							支付金额:
						</view>
						<view class="money">
							￥{{ radiovalue1 == 2 ? moneyData : orderData.finalMoney }}
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
	import {
		orderInfo,
		orderSave
	} from "@/api/api.js";
	export default {
		data() {
			return {
				packTaocan: 0,
				radiovalue1: 1,
				radiolist1: [{
						name: '套餐取水',
						disabled: false,
						id: 1,
					},
					{
						name: '定额取水',
						disabled: false,
						id: 2,
					}
				],
				moneyShow: false,
				moneyNumder: 0,
				orderInfoData: {},
				orderData: {}, //默认套餐数据
				moneyData: "", //取水金额
				equipCode: "",

			};
		},
		onLoad(ope) {
			if (ope.scanCode) {
				this.equipCode = ope.scanCode
				console.log(ope.scanCode, 'ope.scanCode');
				this.orderInfo(ope.scanCode)
			}
		},
		methods: {
			//取水套餐
			async orderInfo(scanCode) {
				console.log(scanCode);
				let res = await orderInfo({
					equipCode: scanCode
				})
				if (res.code == 0) {
					this.orderInfoData = res.data
					console.log(res, '----------');
					this.orderData = res.data.setMealList[0]
				}
			},
			//长按
			logoTime(e) {
				console.log(e);
				uni.setClipboardData({
					data: e,
					success: function() {
						console.log('长按', e);
						uni.$u.toast("复制成功")
					}
				});
			},
			groupChange(n) {
				console.log('groupChange', n);
				this.moneyData = ""
			},
			getTaoCan(inx, e) {
				this.packTaocan = inx
				this.orderData = e
			},
			close() {
				this.moneyShow = false
			},
			orrQs() {
				if (this.radiovalue1 != 1) {
					const regex = /^(100|[1-9][0-9]?)$/
					if (!regex.test(this.moneyData)) {
						return uni.$u.toast("金额在1~100之间")
					}else{
						this.moneyShow = true
					}
				} else {
					this.moneyShow = true
				}
			},
			inputBlur() {
				if (this.radiovalue1 != 1) {
					const regex = /^(100|[1-9][0-9]?)$/
					if (!regex.test(this.moneyData)) {
						this.moneyData = ""
						return uni.$u.toast("金额在1~100之间")
					}
				}
			},
			inputNumber(e) {
				// this.moneyNumder = Math.ceil(e * 0.4) 
				this.moneyData = e
				this.moneyNumder = e / this.orderInfoData.waterPrice
			},
			getpatment() {
				let data = {
					equipId: this.orderInfoData.id, //设备id
					openId: uni.getStorageSync('openId').openid, //微信小程序openid
					money: this.radiovalue1 == 1 ? this.orderData.finalMoney : Number(this.moneyData), //金额
					setMealId: this.radiovalue1 == 1 ? this.orderData.id : 0, //套餐id
					type: 2, //支付方式：1-支付宝，2-微信，3-余额
				}
				console.log(data, '----------')

				orderSave(data).then(res => {
					console.log(res)
					if (res.data && !res.data.pay) {
						this.$u.route({
							url: "/subpackageA/pages/waterIntaking/paymentSuccess/paymentSuccess",
							// params: {
							// 	title
							// }
						})
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
									this.$u.route({
										url: "/subpackageA/pages/waterIntaking/paymentSuccess/paymentSuccess",
										// params: {
										// 	title
										// }
									})
								}, 1000)
							},
							fail: function(err) {
								console.log('支付失败:' + JSON.stringify(err));
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.box {
		min-height: 100vh;
		background-color: #F0F3F5;
		padding-bottom: 196rpx;
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
			// background: linear-gradient(180deg, #333333 0%, rgba(128, 128, 128, 0) 100%);
		}
	}

	.package {
		// height: 514rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 12rpx 28rpx -4rpx rgba(0, 0, 0, 0.1), 0rpx -12rpx 18rpx -14rpx rgba(0, 0, 0, 0.1);
		border-radius: 8rpx;
		margin: 0 32rpx;
		padding: 0 32rpx 32rpx;
		box-sizing: border-box;
		overflow: hidden;

		.unit-price {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 32rpx;

			.unit {
				font-size: 28rpx;
				color: #2E3133;
			}

			.price {
				font-size: 28rpx;
				color: #FA573E;
			}
		}

		.bfb {
			font-size: 24rpx;
			color: #616466;
			text-align: right;
			margin-top: 16rpx;
		}

		.tao-can {
			margin-top: 48rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap;
			grid-gap: 23rpx;

			.pack-taocan {
				width: 192rpx;
				height: 146rpx;
				background: #EDF6FA;
				box-shadow: 8rpx 8rpx 8rpx 0rpx #7DA1B2,
					-8rpx -8rpx 8rpx 0rpx #FAFDFF,
					inset 4rpx 8rpx 20rpx 0rpx rgba(125, 161, 178, 0.3),
					inset -4rpx -8rpx 20rpx 0rpx #FAFDFF;
				border-radius: 8rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.pack {
					font-size: 28rpx;
					color: #1DABF2;
				}

				.money {
					margin-top: 8rpx;
					font-size: 30rpx;
					color: #1DABF2;
				}
			}

			.pack-taocans {
				width: 192rpx;
				height: 146rpx;
				background: #F0F3F5;
				box-shadow: inset -12rpx -12rpx 12rpx 0rpx #FAFDFF, inset 12rpx 12rpx 12rpx 0rpx #C8CBCC;
				border-radius: 8rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.pack {
					font-size: 28rpx;
					color: #2E3133;
				}

				.money {
					margin-top: 8rpx;
					font-size: 30rpx;
					color: #2E3133;
				}
			}
		}

		.text-input {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 32rpx;

			.text {
				font-size: 28rpx;
				color: #2E3133;
			}

			.input {
				width: 260rpx;
				height: 80rpx;
				background: #F0F3F5;
				border-radius: 4rpx;
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
		// height: 472rpx;
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
			padding: 0 98rpx;
			box-sizing: border-box;

			.device-code {
				font-size: 28rpx;
				display: flex;
				align-items: center;
				margin-top: 16rpx;
				white-space: nowrap;

				.device {
					color: #616466;
				}

				.code {
					color: #14181A;
					margin-left: 24rpx;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.money {
					color: #FA573E;
					margin-left: 24rpx;
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
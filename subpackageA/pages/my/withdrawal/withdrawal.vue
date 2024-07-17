<template>
	<view class="box">
		<view class="titos">
			<view class="deviceBj">
				<image src="../../static/tx-bg.png" mode=""></image>
			</view>
			<view class="tito" v-if="menuTop" :style="{ paddingTop: menuTop.top + 7 +'px', }">
				<view class="image-text" @click="getdevices">
					<u-icon name="arrow-left" size="24" color="#FFF"></u-icon>
				</view>
				<view class="textE">
					提现
				</view>
			</view>
			<view class="card-content">
				<view class="number">￥{{nonPresentIncome}}</view>
				<view class="ts">可提现金额 (元)</view>
			</view>

		</view>
		<view class="conter">
			<view class="tx">
				提现金额
			</view>
			<view class="input">
				<text style="font-size: 60rpx;">￥</text>
				<input class="inputs" v-model="money" type="text" placeholder="请输入"
					placeholder-style="font-size: 40rpx;" />
				<view class="text" @click="getAll">
					全部提现
				</view>
			</view>
			<view class="text-icon" @click="$refs.popup.open('bottom')">
				<view class="text">
					提现至
				</view>
				<view class="icon">
					{{ bank || bankCardData[0].bank || '去添加银行卡'}}
					<uni-icons type="right" size="15" color="#B5B6B6"></uni-icons>
				</view>
			</view>
			<view class="bont" @click="withdrawal">
				申请提现
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" :safeArea="false">
			<view class="poputView">
				<view class="text-icon">
					<view class="text">
						选择提现银行卡
					</view>
					<view class="icon" @click="$refs.popup.close()">
						<uni-icons type="closeempty" size="30" color="#000"></uni-icons>
					</view>
				</view>
				<view class="block">
					<view class="yhblock">
						<view class="blockList" v-for="(item,index) in bankCardData" :key="item.id">
							<view class="text">
								{{item.bank}}（{{originalString(item.bankAccount)}}）
							</view>
							<view class="checkbox">
								<checkbox-group @change="handleCheckboxChange">
									<label class="default">
										<checkbox v-model="index" :checked="index == paymentId" color="#2590FA" />
									</label>
								</checkbox-group>
							</view>
						</view>
					</view>
					<view class="bolk-text" @click="getAddbank">
						<view class="image">
							<image src="../../static/tjyhk.png" mode=""></image>
						</view>
						<view class="text">
							添加银行卡
						</view>
						<uni-icons style="margin-left: auto;" type="right" size="20" color="#B5B6B6"></uni-icons>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		bankCardList,
		withdrawal
	} from "@/api/api.js"
	export default {
		data() {
			return {
				menuTop: uni.getMenuButtonBoundingClientRect(),
				paymentId: '0',
				nonPresentIncome: 0,
				money: "", //金额
				bankCardData: [],
				page: 1,
				limit: 10,
				bank: "",
				bankID: '',

			};
		},
		onLoad(ope) {
			if (ope.nonPresentIncome) {
				this.nonPresentIncome = ope.nonPresentIncome
			}
		},
		onShow() {
			this.bankCardList()
		},
		methods: {
			getdevices(){
				uni.navigateBack()
			},
			originalString(e) {
				return e.slice(-4)
			},
			//银行卡列表
			async bankCardList() {
				let data = {
					page: this.page,
					limit: this.limit
				}
				let res = await bankCardList(data)
				if (res.data.length > 0) {
					this.bankCardData = res.data
					this.bankID = res.data[0].id
				}
			},
			//全部提现
			getAll() {
				this.money = this.nonPresentIncome
			},
			//发起提现
			async withdrawal() {
				if (this.money == 0) {
					return uni.showToast({
						title: "金额必须大于0",
						icon: "none"
					})
				}
				let data = {
					customerBankCardId: this.bankID,
					money: this.money
				}
				let res = await withdrawal(data)
				if (res.code == 0) {
					uni.showToast({
						title: "请等待审核!",
						icon: "none"
					})
					setTimeout(() => {
						uni.navigateBack({
							delta: 2
						})
					}, 1500)
				}
			},
			handleCheckboxChange(event) {
				const checkedId = event.detail.value[0];
				this.paymentId = checkedId;
				const found = this.bankCardData.find((element, index) => index == this.paymentId);
				this.bank = found.bank
				this.bankID = found.id
			},
			//添加银行卡
			getAddbank() {
				uni.navigateTo({
					url: "/subpackageA/pages/my/addBankCard/addBankCard"
				})
			},
		}
	}
</script>

<style lang="scss">
	.box {
		height: 100%;
		background-color: #F0F3F5;

	}

	.titos {
		position: relative;
		padding: 0 32rpx;
		box-sizing: border-box;

		.deviceBj {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			image {
				width: 100%;
				height: 530rpx;
			}
		}

		.tito {
			display: flex;
			box-sizing: border-box;
			position: relative;

			.textE {
				flex: 1;
				text-align: center;
				color: #FFF;
				font-size: 32rpx;
				margin-right: 30rpx;
			}
		}

		.card-content {
			margin-top: 70rpx;
			font-family: PingFang SC, PingFang SC;
			position: relative;

			.number {
				font-weight: 500;
				font-size: 32rpx;
				color: #FFFFFF;
			}

			.ts {
				font-size: 28rpx;
				color: rgba(255, 255, 255, 0.7);
			}
		}
	}

	.conter {
		background: #FFFFFF;
		border-radius: 8rpx;
		margin: 48rpx 32rpx;
		position: relative;
		padding: 32rpx;
		box-sizing: border-box;
		font-family: PingFang SC, PingFang SC;

		.tx {
			font-size: 28rpx;
			color: #2E3033;
		}

		.input {
			height: 160rpx;
			border-bottom: 2rpx solid #F1F2F2;
			display: flex;
			align-items: center;

			.inputs {
				height: 100%;
				font-size: 80rpx;
				color: #14171A;
				flex: 1;
			}

			.text {
				margin-left: auto;
				font-size: 28rpx;
				color: #2590FA;
			}
		}

		.text-icon {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 32rpx;

			.text {
				font-size: 28rpx;
				color: #2E3033;
			}

			.icon {
				font-size: 28rpx;
				color: #14171A;
			}
		}

		.bont {
			height: 88rpx;
			background: #2590FA;
			border-radius: 8rpx;
			font-size: 32rpx;
			color: #FFFFFF;
			text-align: center;
			line-height: 88rpx;
			margin-top: 80rpx;
		}
	}

	.poputView {
		height: 800rpx;
		background: #F4F5F6;
		border-radius: 32rpx 32rpx 0 0;

		.text-icon {
			display: flex;
			align-items: center;

			padding: 32rpx 30rpx;
			box-sizing: border-box;

			.text {
				margin-left: 50%;
				transform: translateX(-50%);
			}

			.icon {
				margin-left: auto;
			}
		}

		.block {
			background: #FFFFFF;
			box-shadow: 0rpx 8rpx 20rpx 0rpx #F0F1F2;
			border-radius: 16rpx;
			margin: 0 30rpx;
			padding: 30rpx;
			box-sizing: border-box;

			.yhblock {
				height: 260rpx;
				overflow-y: auto;

				.blockList:first-child {
					margin-top: 0rpx;
				}

				.blockList {
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 72rpx;
					border-bottom: 2rpx solid #F1F2F2;
					margin-top: 24rpx;

					.default {
						display: flex;
						align-items: center;
						font-size: 24rpx;
						color: #2590FA;
					}
				}
			}
		}

		.bolk-text {
			display: flex;
			align-items: center;
			margin-top: 28rpx;

			.image {
				image {
					width: 48rpx;
					height: 48rpx;
					vertical-align: middle;
				}
			}

			.text {
				font-size: 28rpx;
				color: #14171A;
				margin-left: 24rpx;
			}
		}
	}
</style>
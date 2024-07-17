<template>
	<view class="box">
		<view class="titos">
			<view class="deviceBj">
				<image src="../../static/tongji.png" mode=""></image>
			</view>
			<view class="tito" v-if="menuTop" :style="{ paddingTop: menuTop.top + 5 + 'px', }">
				<view class="image-text" @click="getdevices">
					<u-icon name="arrow-left" size="20" color="#FFF"></u-icon>
				</view>
				<view class="textE">
					{{tito || '收益'}}
				</view>
			</view>
			<view class="text-icon-income-expenditure">
				<view class="text-icon">
					<text class="text">当前{{tito || '收益'}}：</text>
					<view class="number-icon" @click="pickerShow = true">
						<view class="number">
							{{ yearMonth(value1) }}
						</view>
						<view class="icon">
							<u-icon name="arrow-down" color="#FFF"></u-icon>
						</view>
					</view>
				</view>
				<view class="income-expenditure" v-if="tito == '收入'">
					<view :class="index == income ? 'income' : 'expenditure'" v-for="(item,index) in incomeIture"
						:key="index" @click="getIncome(index)">
						{{item}}
					</view>
				</view>
			</view>
			<view class="amountTo">
				共收入{{statisData.number}}笔，合计
			</view>
			<view class="bnt-money">
				￥{{statisData.money}}
			</view>
		</view>
		<view class="stati">
			<view class="tito-text">
				{{tito || '收益'}}统计图
			</view>
			<histogram :days="statisData.days" :moneys="statisData.moneys" />
		</view>
		<u-datetime-picker ref="datetimePicker" :show="pickerShow" v-model="value1" mode="year-month"
			@cancel="pickerShow=false" @confirm="confirm"></u-datetime-picker>
	</view>
</template>

<script>
	import histogram from "./components/histogram.vue"
	import {
		accountStatistics,
		distributionStatisticsIncome
	}
	from "@/api/api.js"
	export default {
		components: {
			histogram
		},
		data() {
			return {
				menuTop: uni.getMenuButtonBoundingClientRect(),
				pickerShow: false,
				value1: Number(new Date()),
				incomeIture: ["收入", "支出"],
				income: 0,
				tito: "",
				goodsId: "",
				statisData: {},
				statisDatas: [50, 60, 80, 10, 100, 80]
			};
		},
		onLoad(ope) {
			if (ope.tito) {
				this.tito = ope.tito
			}
			if (ope.goodsId) {
				this.goodsId = ope.goodsId
			}
			this.getaccountStatistics()
		},
		methods: {
			getdevices() {
				uni.navigateBack()
			},
			async getaccountStatistics() {
				let data = {
					queryMonth: this.yearMonth(this.value1),
					type: this.income + 1,
					goodsId: this.goodsId == 0 ? '' : this.goodsId
				}
				if (this.tito == "收入") {
					let res = await accountStatistics(data)
					if (res.data) {
						this.statisData = res.data
					}
				} else {
					let res = await distributionStatisticsIncome(data)
					if (res.data) {
						this.statisData = res.data
					}
				}
			},
			confirm(e) {
				this.pickerShow = false
				this.value1 = e.value
				this.getaccountStatistics()
			},
			//格式化时间
			yearMonth(e) {
				const timeFormat = uni.$u.timeFormat;
				let timeValue = timeFormat(e, 'yyyy-mm');
				return timeValue
			},
			getIncome(inx) {
				this.income = inx
				this.getaccountStatistics()
			},
		}
	}
</script>

<style lang="scss">
	.box {
		min-height: 100vh;
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
			z-index: -1;

			image {
				width: 100%;
				height: 535rpx;
			}
		}

		.tito {
			display: flex;
			box-sizing: border-box;
			align-items: center;


			.textE {
				font-weight: 600;
				font-size: 32rpx;
				color: #14171A;
				margin-left: 37%;
				color: #FFF;
			}
		}

		.text-icon-income-expenditure {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 48rpx;

			.text-icon {
				display: flex;
				align-items: center;

				.text {
					font-size: 24rpx;
					color: rgba(255, 255, 255, 0.7);
				}

				.number-icon {
					display: flex;
					align-items: center;

					.number {
						font-size: 28rpx;
						color: #FFF;
					}
				}
			}

			.income-expenditure {
				display: flex;
				align-items: center;
				font-size: 24rpx;
				color: rgba(255, 255, 255, 0.7);
				flex: 1;
				justify-content: flex-end;
				grid-gap: 52rpx;

				.income {
					width: 88rpx;
					height: 42rpx;
					border-radius: 4rpx;
					border: 2rpx solid #FFFFFF;
					color: #FFF;
					text-align: center;
					line-height: 42rpx;
				}

				.expenditure {}
			}
		}

		.amountTo {
			font-size: 24rpx;
			color: rgba(255, 255, 255, 0.7);
			margin-top: 32rpx;
		}

		.bnt-money {
			font-weight: 600;
			font-size: 60rpx;
			color: #FFFFFF;
			margin-top: 24rpx;
		}

	}

	.stati {
		width: 100%;
		height: 1138rpx;
		background: #FFFFFF;
		box-shadow: 0rpx -8rpx 20rpx 0rpx rgba(33, 157, 217, 0.2);
		border-radius: 12rpx 12rpx 0 0;
		margin-top: 48rpx;
		padding: 48rpx 32rpx;
		box-sizing: border-box;

		.tito-text {
			font-weight: 600;
			font-size: 36rpx;
			color: #2E3133;
			margin-bottom: 30rpx;
		}

		.charts-box {
			width: 100%;
			height: 300px;
		}
	}
</style>
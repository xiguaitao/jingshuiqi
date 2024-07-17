<template>
	<view class='timeline-x'>
		<tito title="我的饮水" :leftIconShow="true"></tito>
		<view class="subsection">
			<subsection :list="list" :current="current" @change="sectionChange"></subsection>
		</view>
		<view class="text-icon-income-expenditure subsection">
			<view class="text-icon">
				<text class="text">当前数据：</text>
				<uni-data-select class="number-icon" v-model="value" :localdata="range" @change="change"
					:clear="false"></uni-data-select>
			</view>
		</view>
		<view class="item-month subsection">
			<!-- <view class="item-month-month" v-for="(item,index) in 3" :key="index">
				<view class="month">
					<view>{{index + 1}}月</view>
					<view>2024</view>
				</view>
				<view class="timeline">
					<view class="content" v-for="(item2,index2) in 3" :key="index2">
						<view class="line">
							<view></view>
						</view>
						<view class="content-item">
							<view class="content-item-top">
								<view class="content-item-top-date">{{index2 + 1}}日</view>
							</view>
							<view class="device">
								<view class="code">
									设备编号
								</view>
								<view class="number">
									2584658454
								</view>
							</view>
							<view class="content-item-bottom" v-for="(item3,index3) in 3" :key="index3">
								<view class="content-item-bottom-left">
									<view>取水量{{index3 + 1}}</view>
								</view>
								<view class="content-item-bottom-conter">
									<view>300ml</view>
								</view>
								<view class="content-item-bottom-right">13:01:01</view>
							</view>
						</view>
					</view>
				</view>
			</view> -->
			<dataText></dataText>
		</view>
	</view>
</template>
<script>
	import {
		drinkDataList
	} from "@/api/api.js"
	export default {
		data() {
			return {
				list: ['家用净水机', '小区净水机'],
				current: 0,
				value: 1,
				range: [{
						value: 1,
						text: "今天"
					},
					{
						value: 2,
						text: "近7天"
					},
					{
						value: 3,
						text: "近30天"
					},
				],
				drinkData: [],
			};
		},
		onLoad() {
			this.drinkList()
		},
		methods: {
			sectionChange(index) {
				this.current = index;
			},
			change(e) {
				console.log("e:", e);
				this.drinkList()
			},
			//饮水列表
			async drinkList() {
				let res = await drinkDataList({
					type: this.value
				})
				if (res.data.length > 0) {
					this.drinkData = res.data
				}
			}
		}
	}
</script>
<style lang='scss' scoped>
	.timeline-x {
		background-color: #F3F5F6;
		height: 100%;
		.subsection {
			margin: 0 32rpx;
		}

		.text-icon-income-expenditure {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			margin-top: 48rpx;
			margin-right: 32rpx;

			.text-icon {
				display: flex;
				align-items: center;

				.text {
					font-family: PingFang SC, PingFang SC;
					font-size: 24rpx;
					color: #616466;
				}

				.number-icon {
					min-width: 170rpx;
					color: #1DABF2;

					::v-deep .uni-select {
						border: 2rpx solid #1DABF2 !important;

						.uni-select__input-text {
							color: #1DABF2 !important;
						}
					}
				}
			}
		}

		.item-month {
			.item-month-month {
				display: flex;

				.month {
					margin-right: 32rpx;

					view:nth-child(1) {
						font-family: PingFang SC, PingFang SC;
						font-weight: 600;
						font-size: 44rpx;
						color: #14181A;
						line-height: 52rpx;
					}

					view:nth-child(2) {
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #616466;
						line-height: 33rpx;
					}
				}

				.timeline {
					flex: 1;

					.content {
						display: flex;

						.line {
							width: 26rpx;
							display: flex;
							flex-direction: column;
							align-items: center;
							margin-right: 32rpx;

							&::after {
								flex: 1;
								display: block;
								content: '';
								width: 0rpx;
								border-right: 2rpx dashed #1DABF2;
							}

							view {
								width: 20rpx;
								height: 20rpx;
								background: #1DABF2;
								border: 6rpx solid #C8E9FA;
								border-radius: 50%;
							}
						}

						&:not(:first-child) {
							.line {
								view {
									border: 0;
								}
							}
						}

						.content-item {
							flex: 1;

							&::after {
								display: block;
								content: "";
								height: 64rpx;
							}

							.content-item-top {
								display: flex;
								justify-content: space-between;
								margin-bottom: 30rpx;

								.content-item-top-date {
									font-family: PingFang SC, PingFang SC;
									font-weight: 500;
									font-size: 28rpx;
									color: #2E3133;
									line-height: 33rpx;
								}
							}

							.device {
								display: flex;
								font-size: 28rpx;
								font-family: PingFang SC, PingFang SC;
								background-color: #FFF;
								padding: 32rpx;
								box-sizing: border-box;
								border-bottom: 2rpx solid #F0F1F2;

								.code {
									color: #616466;
								}

								.number {
									color: #14181A;
									margin-left: 24rpx;
								}
							}

							.content-item-bottom {
								padding: 32rpx;
								background: #fff;
								box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(3, 18, 26, 0.05);
								/* border-radius: 8rpx; */
								display: flex;

								.content-item-bottom-left {
									view {
										font-family: PingFang SC, PingFang SC;
										font-weight: 400;
										font-size: 28rpx;
										color: #2E3133;
										line-height: 33rpx;
										margin-bottom: 16rpx;
									}

								}

								.content-item-bottom-conter {
									font-family: PingFang SC, PingFang SC;
									font-weight: 500;
									font-size: 28rpx;
									color: #14181A;
									line-height: 33rpx;
									margin-left: 24rpx;
								}

								.content-item-bottom-right {
									font-family: PingFang SC, PingFang SC;
									font-weight: 400;
									font-size: 28rpx;
									color: #AFB1B2;
									line-height: 33rpx;
									margin-left: auto;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
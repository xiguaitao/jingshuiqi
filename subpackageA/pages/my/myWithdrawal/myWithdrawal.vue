<template>
	<view class="box">
		<tito title="我的提现" :leftIconShow="true"></tito>
		<view class="subsection">
			<subsection :list="list" :current="current" @change="sectionChange"></subsection>
		</view>
		<view class="text-icon-income-expenditure">
			<view class="text-icon">
				<text class="text">当前明细：</text>
				<view class="number-icon" @click="pickerShow = true">
					<view class="number">
						{{ yearMonth(value1) }}
					</view>
					<view class="icon">
						<u-icon name="arrow-down" color=" #1DABF2"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="subsection-device">
			<view class="device">
				<scroll-view :scroll-y="true" :refresher-enabled="true" :refresher-threshold="0"
					@refresherrefresh="refresherrefresh" style="height: 100%;overflow: auto; "
					:refresher-triggered="refresherTriggered" @scrolltolower="scrolltolower" :lower-threshold="20">
					<view class='content'>
						<u-transition :show="true" v-for="item in deviceList" :key="item.id" mode="slide-left">
							<DeviceList :listData="item" @getBlur="getBlur" @getuse="getuse" @getRecharge="getRecharge">
							</DeviceList>
						</u-transition>
					</view>
					<u-loadmore v-if="deviceList.length > 0" :status="status" />
					<view v-if="deviceList.length == 0" class="nodata" v-show="deviceList.length <= 0">
						<view class="contents">
							<view class="text"> 暂无数据</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>

		<view class="datetime-picker">
			<u-datetime-picker ref="datetimePicker" :show="pickerShow" v-model="value1" mode="year-month"
				@cancel="pickerShow=false" @confirm="confirm"></u-datetime-picker>
		</view>
	</view>
</template>

<script>
	import DeviceList from './deviceList.vue';
	import {
		withdrawlRecordList
	}
	from "@/api/api.js"
	export default {
		components: {
			DeviceList
		},
		data() {
			return {
				list: ['全部', '提现失败', '提现成功'],
				current: 0,
				pickerShow: false,
				value1: Number(new Date()),
				deviceList: [],
				listData: {
					page: 1,
					limit: 10,
				},
				status: "loading",
				refresherTriggered: false,
			};
		},
		onLoad() {
			this.withdrawlRecord()
		},
		methods: {
			refresherrefresh() {
				this.refresherTriggered = true;
				this.status = "loading"
				this.listData.page = 1;
				this.withdrawlRecord()
			},
			scrolltolower() {
				if (this.status == "nomore") return;
				if (!this.loading) {
					this.listData.page++;
					this.status = "loading"
					this.withdrawlRecord(false);
				}
			},
			sectionChange(index) {
				this.current = index;
				this.withdrawlRecord()
			},
			confirm(e) {
				this.pickerShow = false
				this.value1 = e.value
				this.withdrawlRecord()
			},
			//格式化时间
			yearMonth(e) {
				const timeFormat = uni.$u.timeFormat;
				let timeValue = timeFormat(e, 'yyyy-mm');
				return timeValue
			},
			//提现列表
			withdrawlRecord(state = true) {
				let data = {
					yearMonth: this.yearMonth(this.value1),
					status: this.current == 0 ? '' : this.current == 1 ? '-1' : this.current,
					...this.listData
				}
				withdrawlRecordList(data).then(res => {
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
							this.deviceList = res.data;
						} else {
							this.deviceList.push(...res.data)
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.box {
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: auto;
		background-color: #F0F3F5;
	}

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
				font-size: 24rpx;
				color: #616466;
			}

			.number-icon {
				display: flex;
				align-items: center;

				.number {
					font-size: 28rpx;
					color: #1DABF2;
				}
			}
		}
	}

	.subsection-device {
		flex: 1;
		overflow: auto;
		display: flex;
		flex-direction: column;

		.subsection {
			margin: 0 32rpx;

			.u-subsection {
				padding: 8rpx;
				box-sizing: border-box;
			}
		}

		.device {
			flex: 1;
			// margin-top: 32rpx;
			width: 100%;
			height: 0px;
			overflow: hidden;

			.content {
				flex: 1;
				overflow: auto;

			}

			.contents {
				.text {}
			}

			.nodata {
				display: grid;
				place-content: center;
				height: 100%;

				.contents {
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
	}
</style>
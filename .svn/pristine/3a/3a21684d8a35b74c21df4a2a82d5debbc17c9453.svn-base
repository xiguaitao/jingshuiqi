<template>
	<view class="box">
		<view class="subsection-device">
			<view class="device">
				<scroll-view :scroll-y="true" :refresher-enabled="true" :refresher-threshold="0"
					@refresherrefresh="refresherrefresh" style="height: 100%;overflow: auto; "
					:refresher-triggered="refresherTriggered" @scrolltolower="scrolltolower" :lower-threshold="20">
					<view class='content'>
						<u-transition :show="true" v-for="item in deviceList" :key="item.id" mode="slide-left">
							<rejection :listData="item" @getRecharge="getRecharge" />
						</u-transition>
					</view>
					<u-loadmore v-if="deviceList.length > 0" :status="status" />
					<view v-if="deviceList.length == 0" class="nodata" v-show="deviceList.length <= 0">
						<view class="contents">
							<!-- <image src="../../../../static/image/zanwusheibei.png"></image> -->
							<view class="text"> 暂无数据</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import rejection from './components/rejection.vue';
	export default {
		components: {
			rejection
		},
		data() {
			return {
				deviceList: [{
						money: "123123123",
						bank: "中国工商银行",
						status: 1,
						bankAccount: "18574812099",
						auditTime: "2024-05-25",
						remitTime: "2024-05-25",
					},
					{
						money: "123123123",
						bank: "中国工商银行",
						status: 2,
						bankAccount: "18574812099",
						auditTime: "2024-05-25",
						remitTime: "2024-05-25",
					},
					{
						money: "123123123",
						bank: "中国工商银行",
						status: 2,
						bankAccount: "18574812099",
						auditTime: "2024-05-25",
						remitTime: "2024-05-25",
					},
					{
						money: "123123123",
						bank: "中国工商银行",
						status: 2,
						bankAccount: "18574812099",
						auditTime: "2024-05-25",
						remitTime: "2024-05-25",
					}
				],
				listData: {
					querySearchWords: "",
					page: 1,
					limit: 10,
				},
				status: "loading",
				refresherTriggered: false,
			};
		},
		methods: {
			refresherrefresh() {
				this.refresherTriggered = true;
				this.status = "loading"
				this.listData.page = 1;
				// this.getList()
			},
			scrolltolower() {
				if (this.status == "nomore") return;
				if (!this.loading) {
					this.listData.page++;
					this.status = "loading"
					// this.getList(false);
				}
			},
			//重新签订
			getRecharge() {
				console.log('重新签订');
				uni.navigateTo({
					url: "/subpackageA/pages/my/contractManagement/contractDetails"
				})
			}
		}
	}
</script>

<style lang="scss">
	.box {
		height: 100%;
		background-color: #F0F3F5;
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: auto;
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
			margin-top: 32rpx;
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
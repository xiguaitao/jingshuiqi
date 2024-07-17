<template>
	<view class="box">
		<view class="header"
			:style="{height: menuTop.top + menuTop.height + 'px', paddingBottom:menuTop.height + 'rpx'}">
			<tito :leftIconShow="true" :slotLeft="true">
				<template v-slot:left>
					<view class="icon" @click="leftIcon">
						<u-icon name="arrow-left" color="#000000" size="24"></u-icon>
					</view>
				</template>
				<template v-slot:center>
					<view class="search">
						<view class="icon_left">
							<u-icon name="search" color="#B1B2B2" size="28"></u-icon>
						</view>
						<view class="sea">
							<u--input placeholder="搜索设备" border="surround" v-model="listData.querySearchWords"
								@confirm="confirm" @blur="confirm" style="border: none;"></u--input>
						</view>
						<view class="icon_right" @click="clear">
							<u-icon name="close-circle-fill" size="18"
								v-if="listData.querySearchWords.length > 0"></u-icon>
						</view>
					</view>
				</template>
			</tito>
		</view>
		<view class="subsection-device">
			<view class="subsection">
				<subsection :list="list" :current="current" @change="sectionChange"></subsection>
			</view>
			<view class="device">
				<scroll-view :scroll-y="true" :refresher-enabled="true" :refresher-threshold="0"
					@refresherrefresh="refresherrefresh" style="height: 100%;overflow: auto; "
					:refresher-triggered="refresherTriggered" @scrolltolower="scrolltolower" :lower-threshold="20">
					<view class='content'>
						<u-transition :show="true" v-for="item in deviceList" :key="item.id" mode="slide-left">
							<DeviceList :listData="item" @getBlur="getBlur" @getuse="getuse" @getRecharge="getRecharge" @getshoho="getshoho">
							</DeviceList>
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
		<view class="bnt">
			<view class="text" @click="getdevice">
				添加设备
			</view>
		</view>
	</view>
</template>

<script>
	import DeviceList from './deviceList.vue';
	import {
		productList,
		productSetUse,
		productSetNamee
	} from "@/api/api.js"
	export default {
		components: {
			DeviceList
		},
		data() {
			return {
				menuTop: uni.getMenuButtonBoundingClientRect(),
				list: ['全部设备', '在线设备', '离线设备'],
				deviceList: [],
				current: 0,
				listData: {
					page: 1,
					limit: 10,
					querySearchWords: "",
					networkStatus: "", //网络状态: 0-离线, 1-在线, 不传为全部
				},
				status: "loading",
				refresherTriggered: false,
			};
		},
		onShow() {
			this.getList()
		},
		methods: {
			//售后
			getshoho(e){
				uni.navigateTo({
					url: "/subpackageA/pages/device/salesService/salesService?productId=" + e.id +
						"&detailDate=" +
						JSON.stringify(e)
				})
			},
			//添加设备
			getdevice() {
				uni.navigateTo({
					url: "/subpackageA/pages/device/increaseDevice/increaseDevice"
				})
			},
			leftIcon() {
				uni.navigateBack()
			},
			clear() {
				this.$set(this.listData, 'querySearchWords', '')
			},
			confirm() {
				this.getList()
			},
			sectionChange(index) {
				this.current = index;
				this.listData.networkStatus = index == 0 ? '' : index == 1 ? 1 : 0
				this.getList()
			},
			refresherrefresh() {
				this.refresherTriggered = true;
				this.status = "loading"
				this.listData.page = 1;
				this.getList()
			},
			scrolltolower() {
				if (this.status == "nomore") return;
				if (!this.loading) {
					this.listData.page++;
					this.status = "loading"
					this.getList(false);
				}
			},
			getList(state = true) {
				productList(this.listData).then(res => {
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
			},
			//失焦
			async getBlur(e) {
				let data = {
					id: e.id,
					name: e.remark,
				}
				let res = await productSetNamee(data)
				if (res.code == 0) {
					this.getList()
					uni.showToast({
						title: "设置成功",
						icon: "none"
					})
				}
			},
			//使用
			async getuse(e) {
				let res = await productSetUse({
					id: e.id
				})
				if (res.code == 0) {
					this.getList()
					uni.showToast({
						title: "使用成功",
						icon: "none"
					})
				}
			},
			//充值
			getRecharge(e) {
				uni.navigateTo({
					url: "/subpackageA/pages/device/recharge/recharge?productId=" + e.id
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

					::v-deep .u-border {
						border: none !important;
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

		.bnt {
			width: 100%;
			height: 204rpx;
			background: #FFFFFF;
			box-shadow: 0rpx -4rpx 20rpx -4rpx rgba(100, 101, 102, 0.1);
			padding: 24rpx 32rpx;
			box-sizing: border-box;

			.text {
				width: 686rpx;
				height: 88rpx;
				border-radius: 8rpx;
				background: #1DABF2;
				text-align: center;
				line-height: 88rpx;
				font-size: 32rpx;
				color: #FFFFFF;
			}
		}
	}
</style>
<template>
	<view class="box">
		<tito class="tito" title="优惠券" :leftIconShow="true" />
		<view class="subsection">
			<subsection :list="list" :current="current" @change="sectionChange"></subsection>
		</view>
		<scroll-view :scroll-y="true" :refresher-enabled="true" :refresher-threshold="0"
			@refresherrefresh="refresherrefresh" style="height: 100%;overflow: auto; "
			:refresher-triggered="refresherTriggered" @scrolltolower="scrolltolower" :lower-threshold="20">
			<view class='content'>
				<view class="couponList-yhj-couponList">
					<u-transition :show="true" v-for="item in couponListData" :key="item.id" mode="slide-left">
						<view class="couponList-yhj">
							<view class="couponList" :class="current != 0 ? 'current1' : ''">
								<view class="image-text">
									<view class="image" v-if="current == 0">
										<image src="../../static/bg-yhj.png" mode=""></image>
									</view>
									<view class="image" v-else>
										<image src="../../static/bj-yhj-hui.png" mode=""></image>
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
										<view class="yon" v-if="current == 0" @click="getuse">
											使用
										</view>
									</view>
									<view class="icon" @click="openshow(item.id)">
										使用说明
										<uni-icons
											:class="item.id == openShow ?  'rotate-animation' : 'rotate-animations'"
											type="down" size="15" color="#616366"></uni-icons>
									</view>
								</view>
								<view class="yishiyong" v-if="current == 1">
									<image src="../../static/yishiyong.png" mode=""></image>
								</view>
								<view class="yishiyong" v-if="current == 2">
									<image src="../../static/yiguoqi.png" mode=""></image>
								</view>
							</view>
							<view class="bnt" v-show="item.id == openShow">
								<rich-text :nodes="item.settingRemark"></rich-text>
							</view>

						</view>
					</u-transition>
				</view>
			</view>
			<u-loadmore v-if="couponListData.length > 0" :status="status" />
			<view v-if="couponListData.length == 0" class="nodata" v-show="couponListData.length <= 0">
				<view class="contents">
					<view class="text"> 暂无数据</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		getcouponlist
	} from "@/api/api.js"
	export default {
		data() {
			return {
				openShow: null,
				list: ['全部', '已使用', '已过期'],
				current: 0,
				page: 1, //页
				limit: 10, //条
				listData: {
					page: 1,
					limit: 10,
				},
				status: "loading",
				refresherTriggered: false,
				couponListData: [],
			};
		},
		onLoad() {
			this.getcouponlist()
		},
		methods: {
			getuse() {
				uni.switchTab({
					url: "/pages/mall/mall"
				})
			},
			sectionChange(index) {
				this.current = index;
					this.listData.page = 1;
				this.couponListData = []
				this.getcouponlist()
			},
			openshow(id) {
				if (this.openShow === id) {
					this.openShow = null;
				} else {
					this.openShow = id;
				}
			},
			//自定义下拉刷新被触发
			refresherrefresh() {
				this.refresherTriggered = true;
				this.status = "loading"
				this.listData.page = 1;
				this.getcouponlist()
			},
			//滚动到底部/右边，会触发 scrolltolower 事件
			scrolltolower() {
				if (this.status == "nomore") return;
				if (!this.loading) {
					this.listData.page++;
					this.status = "loading"
					this.getcouponlist(false);
				}
			},
			//优惠券列表
			getcouponlist(state = true) {
				let data = {
					...this.listData,
					...{
						useStatus: this.current
					}
				}
				getcouponlist(data).then(res => {
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
							this.couponListData = res.data;
						} else {
							this.couponListData.push(...res.data)
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}

				})
			},
			clickLeft() {
				uni.navigateBack()
			},
			onClickItem(e) {
				if (this.current != e.currentIndex) {
					this.current = e.currentIndex;
					this.page = 1
					this.couponListData = []
					this.getcouponlist()
				}
			},
		}
	}
</script>

<style lang="scss">
	.nodata {
		display: grid;
		place-content: center;
		height: 100%;

		.contents {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			margin-top: 32rpx;
			image {
				width: 150px;
				height: 114px;
			}

			.text {
				font-size: 20rpx;
			}
		}

	}

	.box {
		min-height: 100vh;
		background-color: #F3F5F6;
		display: flex;
		flex-direction: column;
	}
	
	.subsection{
		margin: 0 30rpx;
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
							background: linear-gradient( 135deg, #FA8C3E 0%, #FA573E 100%);
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

			.current1 {
				position: relative;

				.yishiyong {
					position: absolute;
					right: 40rpx;
					top: 40rpx;
					z-index: 55;

					image {
						width: 152rpx;
						height: 152rpx;
					}
				}

				.huiyhj {
					color: #D7D8D9 !important;
				}
			}

			// .current1::after{
			// 	content: "";
			// 	width: 100%;
			// 	height: 100%;
			// 	background-color: #D7D8D9;
			// 	opacity:0.8; 
			// 	position: absolute;
			// 	left: 0%;
			// 	top: 0;
			// }

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
</style>
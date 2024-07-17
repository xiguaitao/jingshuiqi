<template>
	<view class='request-refund'>
		<view class="information-on-items">
			<view class="title">退款商品</view>
			<view class="content">
				<view class="image">
					<image :src="aftermarketData.goodsLogo" style="width: 100%;height: 100%;" />

				</view>
				<view class="info">
					<view class="name">
						<view class="left">{{ aftermarketData.goodsName }}</view>
						<view class="right">x{{ aftermarketData.number }}</view>
					</view>
					<!-- <view class="cyclicality">服务周期：{{ aftermarketData.goodsName }}</view> -->
					<view class="model">价格：{{ aftermarketData.goodsMoney }}</view>
					<view class="price">
						实付款：
						<label>
							￥
							<label>{{ aftermarketData.realAmount }}</label>
						</label>
					</view>
				</view>
			</view>
		</view>
		<view class="refund-info">
			<view class="list">
				<view class="title">售后类型</view>
				<view class="content">
					<u-radio-group v-model="corporationsData.kind" @change="groupChange" size="14">
						<u-radio :customStyle="{ marginRight: '12rpx' }" v-for="(item, index) in radiolist1"
							:key="index" :label="item.name" :name="item.id">
						</u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="list">
				<view class="title">货物状态</view>
				<view class="content">
					<u-radio-group v-model="corporationsData.status" @change="groupChange" size="14">
						<u-radio :customStyle="{ marginRight: '12rpx' }" v-for="(item, index) in radiolist2"
							:key="index" :label="item.name" :name="item.id">
						</u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="list">
				<view class="title">退款份数</view>
				<view class="content">
					<u-number-box v-model="corporationsData.number" @change="valChange" disabledInput
						:max="aftermarketData.number"></u-number-box>
				</view>
			</view>
			<view class="list">
				<view class="title">退款金额</view>
				<view class="content refund-money">
					￥{{ (aftermarketData.realAmount / corporationsData.number).toFixed(2) }}
					<!-- <view style="border-bottom: 1px solid #ccc;">
						<u--input placeholder="请输入内容" v-model="corporationsData.data4" border="surround"></u--input>
					</view> -->
					<view></view>
				</view>
			</view>
			<view class="list">
				<view class="title">退款方式</view>
				<view class="content"></view>
			</view>
			<view class="list">
				<view class="title">图片</view>
				<view class="contents">
					<x_upload v-model="corporationsData.logos" :maxCount="3">
					</x_upload>
				</view>
			</view>
			<view class="list">
				<view class="title">退款说明</view>
				<view class="content">
					<u--textarea v-model="corporationsData.reason" placeholder="请输入内容"
						placeholderClass="placeholderClass" height="254rpx"></u--textarea>
				</view>
			</view>
		</view>
		<view class="submit-btn">
			<view class="btn" :style="{ '--textColor': '#fff', '--bgColor': '#2590FA' }" v-if="!isSubmit"
				@click="submit">提交申请</view>
			<view class="btn" :style="{ '--textColor': '#fff', '--bgColor': '#2590FA' }" v-else>提交中...</view>
			<safe-bottom-x></safe-bottom-x>
		</view>
	</view>
</template>
<script>
	import {
		orderItemInfo,
		goodsOrderAftersalesSave
	} from "@/api/api.js"
	export default {
		name: 'requestRefund',
		data() {
			return {
				disabled: true,
				aftermarketData: {},
				isSubmit: false,
				corporationsData: {
					kind: 1,
					status: 1,
					number: 1,
					reason: "",
					logos: "",
				},
				radiolist1: [{
						id: 1,
						name: '退货退款',
					},
					{
						id: 2,
						name: '仅退款',
					},
					{
						id: 3,
						name: '换货',
					}
				],
				radiolist2: [{
						id: 1,
						name: '已收到货',
					},
					{
						id: 2,
						name: '未收到货',
					}
				],
				radiovalue1: '退货退款',
				radiovalue2: '已收到货',
				value: 0,
			};
		},
		onLoad({
			id
		}) {
			this.geiDetail(id)
		},
		onShow() {},
		onHide() {},
		methods: {
			//发起售后
			submit() {
				if (!this.corporationsData.reason) {
					uni.showToast({
						title: "请输入退款说明",
						icon: "none"
					})
					return
				}
				this.isSubmit = true;
				goodsOrderAftersalesSave({
					...this.corporationsData,
					id: this.aftermarketData.id
				}).then(res => {
					if (res.code == 0) {
						console.log(res);
						uni.showToast({
							title: "申请成功",
							icon: "none"
						})
						setTimeout(() => {
							this.isSubmit = false;
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					} else {
						this.isSubmit = false;
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
					}
				}).catch(err => {
					this.isSubmit = false;
				})
			},
			//获得售后订单商品
			geiDetail(id) {
				orderItemInfo({
					id
				}).then(res => {
					if (res.code == 0) {
						this.aftermarketData = res.data;
						this.corporationsData.number = res.data.number;
					}
				})
			},

			groupChange() {},
		},
		onPullDownRefresh() {},
		onReachBottom() {},
	};
</script>
<style lang="scss">
	.request-refund {
		padding: 32rpx;
		box-sizing: border-box;

		>view {

			&:not(:last-child) {
				background: #fff;
				border-radius: 24rpx;
				padding: 24rpx;
				box-sizing: border-box;
			}
		}

		.information-on-items {
			font-family: PingFang SC, PingFang SC;
			font-weight: 500;
			font-size: 28rpx;
			color: #14171A;
			line-height: 33rpx;
			background: #fff;
			border-radius: 24rpx;
			padding: 24rpx;
			box-sizing: border-box;
			margin-bottom: 24rpx;

			.title {}

			.content {
				display: flex;
				margin-top: 24rpx;

				.image {
					width: 168rpx;
					height: 168rpx;
					margin-right: 16rpx;
					border-radius: 12rpx;
					overflow: hidden;
				}

				.info {
					flex: 1;

					>view {
						margin-bottom: 10rpx;
					}

					.name {
						display: flex;
						justify-content: space-between;

						.left {
							color: #2E3033;
						}

						.right {
							font-weight: 400;
							color: #616366;
						}
					}

					.cyclicality,
					.model {
						font-weight: 400;
						font-size: 24rpx;
						color: #616366;
					}

					.cyclicality {}

					.model {}

					.price {
						font-weight: 400;
						font-size: 24rpx;
						display: flex;
						justify-content: flex-end;

						label {
							color: #FA6B05;

							label {
								font-size: 32rpx;
							}
						}
					}
				}
			}
		}



		.refund-info {
			overflow: auto;

			.list {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 48rpx;

				.title {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #616366;
					line-height: 33rpx;
				}

				.content {}

				.refund-money {
					font-family: PingFang SC, PingFang SC;
					font-weight: 500;
					font-size: 32rpx;
					color: #FA4225;
					line-height: 38rpx;
				}


				&:last-child {
					flex-direction: column;
					align-items: start;

					::v-deep .u-textarea.data-v-09988a29 {
						background: #F4F5F6;
					}

					.title {

						margin-bottom: 24rpx;
					}

					.content {
						flex: 1;
						width: 100%;
						background: #F4F5F6;
						border-radius: 16rpx;
					}
				}
			}






		}

		.submit-btn {
			width: 100%;
			position: sticky;
			bottom: 0;
			margin-top: 48rpx;
			position: relative;

			.btn {
				height: 88rpx;
				color: var(--text-color);
				background: var(--bg-color);
				border-radius: 100rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 500;
				font-size: 32rpx;
				line-height: 38rpx;
				display: grid;
				place-content: center;
			}
		}

	}
</style>
<template>
	<view class="box">
		<tito title="银行卡管理" :leftIconShow="true"></tito>
		<view class="card" v-if="cardData.length > 0">
			<view class="cardList" v-for="(item,index) in cardData" :key="item.id">
				<view class="image-text-unbind">
					<view class="image">
						<image :src="item.bankIcon" mode=""></image>
					</view>
					<view class="text">
						{{item.bank}} · 储蓄卡
					</view>
					<view class="unbind" @click="getunbind(item)">
						解绑
					</view>
				</view>
				<view class="number-xin">
					<!-- 	**** **** **** 8521 -->
					{{formatNumberToMasked(item.bankAccount)}}
				</view>
			</view>
		</view>
		<view class="none" v-else>
			暂无更多
		</view>
		<view class="save_btn" @click="getaddress">
			<button>添加银行卡</button>
		</view>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog :type="msgType" cancelText="关闭" confirmText="确定" title="通知" content="是否解绑此银行卡"
				@confirm="dialogConfirm" @close="$refs.alertDialog.close()"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import {
		cardList,
		bankCardDelete
	}
	from "@/api/api.js"
	export default {
		data() {
			return {
				cardData: [], //银行卡列表
				cardId: "",
				page: 1,
				limit: 10,
			};
		},
		onShow() {
			this.cardData = []
			this.getcardList()
		},
		onReachBottom() {
			this.page++
			this.getcardList()
		},
		methods: {
			//跳转添加银行卡
			getaddress() {
				uni.navigateTo({
					url: "/subpackageA/pages/my/addBankCard/addBankCard?title=" + "添加银行卡"
				})
			},
			formatNumberToMasked(number) {
				const length = number.length;
				const lastFourDigits = number.slice(-4);
				const maskedPart = '*'.repeat(length - 4).replace(/(.{4})/g, '$1 ');
				const maskedNumber = maskedPart.trim() + ' ' + lastFourDigits;
				return maskedNumber;
			},
			//银行卡列表
			async getcardList() {
				let data = {
					page: this.page,
					limit: this.limit,
				}
				let res = await cardList(data)
				if (res.data) {
					this.cardData.push(...res.data)
				}
			},
			//确定
			async dialogConfirm() {
				let res = await bankCardDelete({
					id: this.cardId
				})
				if (res.code == 0) {
					uni.showToast({
						title: "解绑成功",
						icon: "none"
					})
					this.page = 1
					this.cardData = []
					this.getcardList()
					this.$refs.alertDialog.close()
				}
			},
			//解绑银行卡
			getunbind(e) {
				this.cardId = e.id
				this.$refs.alertDialog.open()
			},
		}
	}
</script>

<style lang="scss">
	.none {
		text-align: center;
		margin-top: 500rpx;
		font-size: 32rpx;
		color: #B1B2B2;
	}

	.save_btn {
		width: 690rpx;
		height: 88rpx;
		position: fixed;
		bottom: 98rpx;
		margin-left: 32rpx;

		button {
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			background: #2590FA;
			border-radius: 25px;
		}
	}

	.card {
		.cardList:first-child {
			margin-top: 0rpx;
		}

		.cardList {
			height: 258rpx;
			background: linear-gradient(137deg, #2590FA 0%, #96C8FA 100%);
			border-radius: 16rpx;
			margin: 0 30rpx;
			margin-top: -55rpx;
			padding: 32rpx;
			box-sizing: border-box;

			.image-text-unbind {
				display: flex;
				align-items: center;

				.image {
					image {
						width: 48rpx;
						height: 48rpx;
						border-radius: 50%;
						vertical-align: middle;
					}
				}

				.text {
					font-size: 32rpx;
					color: #FFFFFF;
					margin-left: 24rpx;
				}

				.unbind {
					width: 96rpx;
					height: 42rpx;
					background: #FFFFFF;
					border-radius: 100rpx;
					font-size: 24rpx;
					color: #2590FA;
					text-align: center;
					line-height: 42rpx;
					margin-left: auto;
				}
			}

			.number-xin {
				// text-align: center;
				font-size: 36rpx;
				color: #FFFFFF;
				margin-top: 50rpx;
			}
		}
	}
</style>
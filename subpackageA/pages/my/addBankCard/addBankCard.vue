	<template>
		<view class="container">
			<view class="address_info">
				<view class="info_item name">
					<view class="text">持卡人</view>
					<view class="input">
						<input type="text" placeholder="持卡人" v-model="userInfo.bankName">
					</view>
				</view>
				<view class="info_item tel">
					<view class="text">卡号</view>
					<view class="input">
						<input type="number" placeholder="卡号" maxlength="16" v-model="userInfo.bankAccount">
					</view>
				</view>

				<view class="info_item tel">
					<view class="text">所属银行</view>
					<view class="input">
						<uni-data-select class="selectselect" v-model="userInfo.bankId" :localdata="bankList"
							@change="change" />
					</view>
				</view>
				<view class="info_item tel">
					<view class="text">所属支行</view>
					<view class="input">
						<input type="text" placeholder="所属支行" v-model="userInfo.bankAddress">
					</view>
				</view>
			</view>
			<view class="set">
				<view class="set_default">
					<view class="text">设为默认银行卡</view>
					<view class="switch">
						<switch default color="#2590FA" style="transform:scale(0.7)" @change="defaultAddress"
							:checked="userInfo.isDefault" />
					</view>
				</view>
			</view>
			<!-- 保存按钮 -->
			<view class="save_btn">
				<button @click="saveAddr">添加</button>
			</view>
		</view>
	</template>

	<script>
		import {
			saveAddr,
			bankCardBankList
		} from "@/api/api.js"
		export default {
			data() {
				return {
					userInfo: {
						isDefault: false, //是否默认: 0-否, 1-是
						bankId: '', //银行id
						bank: "", //银行名称
						bankName: '', //开户名,
						bankAccount: "", //银行账号
						bankAddress: "", //支行名称
					},
					bank: 0, //银行
					branch: 0, //支行
					bankList: [],
				}
			},
			onLoad(ope) {
				this.bankCardBankList()
			},
			methods: {
				change(e) {
					if (e) {
						const found = this.bankList.find(element => element.value == e);
						this.userInfo.bank = found.text
						console.log(this.userInfo);
					}
				},
				defaultAddress: function(e) {
					console.log('是否为默认', e.detail.value)
					this.userInfo.isDefault = e.detail.value
				},
				//银行列表
				async bankCardBankList() {
					let res = await bankCardBankList()
					if (res.data.length > 0) {
						res.data.forEach(item => {
							item.text = item.bank
							item.value = item.id
						})
					}
					this.bankList = res.data
				},
				//添加
				async saveAddr() {
					if (this.userInfo.bankAccount.length != '16') {
						return uni.showToast({
							title: "请输入正确的银行卡号",
							icon: "none"
						})
					}
					this.userInfo.isdefault = this.userInfo.isdefault ? 0 : 1
					let res = await saveAddr(this.userInfo)
					if (res.code == 0) {
						uni.showToast({
							title: "添加成功",
							icon: "none"
						})
						setTimeout(() => {
							uni.navigateBack()
						}, 1000);
					}
				}
			}
		}
	</script>

	<style lang="scss" scoped>
		.container {
			min-height: 100vh;
			background-color: #f6f6f6;
			padding: 32rpx;

			.address_info {
				border-radius: 16rpx;
				padding: 32rpx 32rpx 18rpx 32rpx;
				box-sizing: border-box;
				background-color: #fff;

				.info_item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
					margin-bottom: 32rpx;

					.input {
						width: 494rpx;
						height: 72rpx;
						background: #F6F6F6;
						border-radius: 16rpx;
						padding: 16rpx 32rpx;
						box-sizing: border-box;

						::v-deep uni-input {
							width: 100%;
							height: 100%;
							font-size: 28rpx;
							font-family: PingFang-SC-Regular, PingFang-SC;
							font-weight: 400;
							color: #000000;
						}

						::v-deep .uni-input-placeholder {
							font-size: 28rpx;
							font-family: PingFang-SC-Regular, PingFang-SC;
							font-weight: 400;
							color: #949494;
						}
					}

					::v-deep .selectselect {
						margin-top: -18rpx;

						.uni-select {
							border: none;
						}

						.uni-stat__select {
							margin-top: -12rpx;
						}
					}
				}

			}

			.set {
				width: 100%;
				background: #FFFFFF;
				border-radius: 16rpx;
				margin-top: 32rpx;
				box-sizing: border-box;
				padding: 18rpx 32rpx;

				.set_default {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}

				.text {
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
				}

				.del_address {
					font-size: 28rpx;
					font-family: PingFang-SC-Regular, PingFang-SC;
					font-weight: 400;
					color: #EC0000;
				}
			}

			.save_btn {
				width: 622rpx;
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
		}
	</style>
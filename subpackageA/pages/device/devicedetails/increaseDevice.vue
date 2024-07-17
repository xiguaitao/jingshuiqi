<template>
	<view class="box">
		<tito title="滤芯复位"></tito>
		<view class="conter">
			<u--form labelPosition="left" :model="userInfo" :rules="rules" ref="userForm" labelWidth="70"
				:labelStyle="{ fontSize: '28rpx' }">
				<u-form-item prop="code" label="滤芯ID">
					<view style="background: #F3F5F6;border-radius: 12rpx;">
						<u-input placeholder="请输入滤芯ID" v-model="userInfo.code">
							<template slot="suffix">
								<u-icon name="scan" size="28" @click="getQs"></u-icon>
							</template>
						</u-input>
					</view>

				</u-form-item>
			</u--form>
		</view>
		<view class="bottom-btn">
			<view class="btn">
				<view @click="submit">复位</view>
			</view>
			<safe-bottom-x></safe-bottom-x>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					code: '', //设备编号
				},
				id: "", //滤芯id
				productId: "", //设备id
				rules: {
					'code': {
						type: 'string',
						required: true,
						message: '滤芯ID不能为空',
						trigger: ['blur', 'change']
					},
				},
			};
		},
		onLoad(ope) {
			if (ope.id) {
				this.id = ope.id
				this.productId = ope.productId
			}
		},
		methods: {
			//扫码
			getQs() {
				uni.scanCode({
					success: (res) => {
						const match = res.result
						if (match) {
							this.userInfo.code = match
						} else {
							uni.$u.toast("无效二维码")
						}
					}
				})
			},
			submit() {
				this.$refs["userForm"].validate().then(res => {
					let data = {
						id: this.id,
						code: this.userInfo.code,
						productId: this.productId,

					}
					uni.$emit("submitReset", data)
					uni.navigateBack()
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
		}
	}
</script>

<style lang="scss">
	.box {
		height: 100vh;
		background-color: #F3F5F6;
		display: flex;
		flex-direction: column;
	}

	.conter {
		background: #FFFFFF;
		box-shadow: 0rpx 12rpx 28rpx -4rpx rgba(0, 0, 0, 0.1), 0rpx -12rpx 18rpx -14rpx rgba(0, 0, 0, 0.1);
		border-radius: 8rpx;
		margin: 0 32rpx;
		padding: 32rpx;
		box-sizing: border-box;
		overflow: auto;

		::v-deep .u-textarea {
			background: #F3F5F6 !important;
			border-radius: 12rpx;
		}
	}

	.bottom-btn {
		background: #fff;
		margin-top: auto;

		.btn {
			padding: 24rpx 30rpx;
			box-sizing: border-box;

			view {
				height: 88rpx;
				background: #2590FA;
				border-radius: 8rpx;
				display: grid;
				place-content: center;
				color: #fff;
			}
		}
	}
</style>
<template>
	<view class='enrollment'>
		<view class="content">
			<view class="form">
				<u--form labelPosition="left" :model="inputData" :rules="rules" ref="corporationsData" labelWidth="90"
					:labelStyle="{ fontSize: '28rpx', marginLeft: '10rpx' }">

					<view style="font-size: 24rpx; color: grey;">
						扫描通讯模块上二维码 或打印的蓝牙MAC二维码
					</view>
					<u-form-item prop="code" label="设备编号" required>
						<view style="background: #F3F5F6;border-radius: 12rpx;">
							<u-input placeholder="请输入设备编号" border="surround" v-model="inputData.code">
								<template slot="suffix">
									<view class="suffix">
										<uni-icons size="24" type="scan" @tap.stop="scanDevice()"></uni-icons>
									</view>
								</template>
							</u-input>
						</view>
					</u-form-item>

					<view style="font-size: 24rpx; color: grey;margin-top: 20rpx;">
						扫描码库管理->设备码库打印的二维码
					</view>
					<u-form-item prop="codeNumber" label="设备码号" required>
						<view style="background: #F3F5F6;border-radius: 12rpx;">
							<u-input placeholder="请输入设备码号" border="surround" v-model="inputData.codeNumber">
								<template slot="suffix">
									<view class="suffix">
										<uni-icons type="scan" size="24" @tap.stop="scanQrCode()"></uni-icons>
									</view>
								</template>
							</u-input>
						</view>
					</u-form-item>
				</u--form>
			</view>
		</view>
		<view class="bottom-btn">
			<view class="btn">
				<view v-if="!loading" @click="submit">立即绑定</view>
				<view v-else>提交中...</view>
			</view>
			<safe-bottom-x></safe-bottom-x>
		</view>
	</view>
</template>

<script>
import { productBind,getProductCode } from "@/api/api.js";
export default {
	data() {
		return {
			inputData: {
				mac: '',
				code:'',
				codeNumber: '',
			},
			loading: false,
			rules: {
				'code': {
					type: 'string',
					required: true,
					message: '设备编号不能为空',
					trigger: ['blur', 'change']
				},
				'codeNumber': {
					type: 'string',
					required: true,
					message: '设备码号不能为空',
					trigger: ['blur', 'change']
				},
			},
			codeNumber: ''
		}
	},
	methods: {
		submit() {
			this.$refs["corporationsData"].validate().then(res => {
				this.loading = true;
				const data = {
					code: this.inputData.code,
					codeNumber: 'https://water.cnjly.net/?equipCode=' + this.inputData.codeNumber
				}
				productBind(data).then(resData => {

					if (resData.code == 0) {
						uni.$u.toast('绑定成功')
						// setTimeout(() => {

						// 	uni.navigateBack();
						// }, 1500);
						this.inputData.code = ''
						this.inputData.mac = '';
						this.inputData.codeNumber = ''
						this.loading = false;
					} else {
						uni.$u.toast(resData.msg)
						this.loading = false;

					}

				}).catch(err => {

					this.loading = false;
				})
			}).catch(errors => {
				this.loading = false;
				uni.$u.toast('校验失败')
			})
		},
		scanDevice() {
			uni.scanCode({
				success: (res) => {

					this.inputData.mac = this.getImeiFromInput(res.result);
					const isFifteenDigits = /^\d{15}$/.test(this.inputData.mac);
					if(isFifteenDigits){
						getProductCode({mac:this.inputData.mac}).then(res=>{
							if(res.code == 0){
								this.inputData.code = res.data
							} else {
								uni.$u.toast('获取设备编号失败')
							}
						})
					} else {
						this.inputData.code = this.inputData.mac
					}
				}
			})
		},
		scanQrCode() {
			uni.scanCode({
				success: (res) => {
					this.inputData.codeNumber = res.result.split('=')[1];


				}
			})
		},
		getImeiFromInput(input) {
			const regex = /(IMEI):([A-Za-z0-9-]+)/g;
			let match;
			let result = input; // 默认结果为原始字符串

			while ((match = regex.exec(input)) !== null) {
				if (match[1] === 'IMEI') {
					result = match[2];
					break; // 找到 IMEI 后直接跳出循环
				}
			}

			return result;
		}
	}
}
</script>

<style lang="scss">
.enrollment {
	display: flex;
	flex-direction: column;
	height: 100vh;
	background-color: #EFF2F4;


	.content {
		// flex: 1;
		overflow: auto;
		box-shadow: 0rpx 12rpx 28rpx -4rpx rgba(0, 0, 0, 0.1), 0rpx -12rpx 18rpx -14rpx rgba(0, 0, 0, 0.1);
		margin: 32rpx;

		.button {
			height: 24px;
			font-size: 28rpx;
		}

		.form {
			padding: 32rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			box-shadow: 0rpx 8rpx 20rpx 0rpx #F0F1F2;
			border-radius: 24rpx;



		}
	}

	.checkbox {
		margin: 32rpx;
		display: flex;
		align-items: center;
		font-size: 24rpx;

		text {
			color: #23ADF2;
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
}
</style>

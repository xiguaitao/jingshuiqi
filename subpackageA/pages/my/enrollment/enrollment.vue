<template>
	<view class='enrollment'>
		<tito title="注册"></tito>
		<view class="content">
			<view class="form">
				<u--form labelPosition="left" :model="corporationsData" :rules="rules" ref="corporationsData"
					labelWidth="70" :labelStyle="{ fontSize: '28rpx', marginLeft: '10rpx' }">

					<u-form-item prop="name" label="姓名" required>
						<view style="background: #F3F5F6;border-radius: 12rpx;">
							<u--input placeholder="请输入姓名" border="surround" v-model="corporationsData.name"></u--input>
						</view>
					</u-form-item>

					<u-form-item prop="mobile" label="手机号" required>
						<view style="background: #F3F5F6;border-radius: 12rpx;">
							<u--input placeholder="请输入手机号" border="surround" v-model="corporationsData.mobile"
								:maxlength="11" type="number"></u--input>
						</view>
					</u-form-item>


					<u-form-item prop="code" label="验证码" required>
						<view style="background: #F3F5F6;border-radius: 12rpx;">
							<!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
							<!-- #ifndef APP-NVUE -->
							<u-input placeholder="请输入验证码" v-model="corporationsData.code" maxlength="4" type="number">
								<!-- #endif -->
								<!-- #ifdef APP-NVUE -->
								<u--input placeholder="请输入验证码" v-model="corporationsData.code" maxlength="4"
									type="number">
									<!-- #endif -->
									<template slot="suffix">
										<u-code ref="uCode" @change="codeChange" seconds="60"
											changeText="重新获取(X)"></u-code>
										<u-button @tap="getCode" :text="tips" type="primary" size="mini"></u-button>
									</template>
									<!-- #ifndef APP-NVUE -->
							</u-input>
							<!-- #endif -->
							<!-- #ifdef APP-NVUE -->
							</u--input>
							<!-- #endif -->
						</view>
					</u-form-item>

					<u-form-item prop="password" label="设置密码" required>
						<view style="background: #F3F5F6;border-radius: 12rpx;">
							<u--input placeholder="请输入密码" border="surround" v-model="corporationsData.password"
								type="password"></u--input>
						</view>
					</u-form-item>

					<u-form-item prop="data5" label="确认密码" required>
						<view style="background: #F3F5F6;border-radius: 12rpx;">
							<u--input placeholder="请输入密码" border="surround" v-model="corporationsData.data5"
								type="password"></u--input>
						</view>
					</u-form-item>

					<u-form-item prop="refereeMobile" label="推荐人">
						<!-- <view style="padding-left: 140rpx;box-sizing: border-box;"> -->
						<view style="background: #F3F5F6;border-radius: 12rpx;box-sizing: border-box;">
							<u--input :disabled="refereeMobile" type="number" maxlength="11" placeholder="请输入推荐人手机号"
								border="surround" v-model="corporationsData.refereeMobile"></u--input>
						</view>
						<!-- </view> -->
					</u-form-item>

					<u-form-item prop="data7" label="所在地区" required>
						<view style="background: #F3F5F6;border-radius: 12rpx; position: relative;">
							<u--input placeholder="省、市、区、街道" suffixIcon="arrow-right" ref="data7"
								suffixIconStyle="color: #909399" v-model="corporationsData.data7"></u--input>
							<view style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"
								@click="data7Focus"></view>
						</view>
					</u-form-item>

					<u-form-item prop="address" label="详细地址" style="flex-direction: column;" required>
						<view style="background: #F3F5F6;border-radius: 12rpx;">
							<u--textarea v-model="corporationsData.address" placeholder="小区、写字楼、门牌号等"></u--textarea>
						</view>
					</u-form-item>
				</u--form>
			</view>
			<u-picker :show="show" :columns="columns" keyName="name" @confirm="confirm" @change="changeHandler"
				:loading="loadingPicker" @cancel="cancel"></u-picker>
		</view>
		<view class="checkbox">
			<u-checkbox-group>
				<u-checkbox labelSize="12" v-model="checked" shape="circle" label="我已阅读并同意"
					@change="checked = !checked" />
			</u-checkbox-group>
			<text @click="getrichText">《用户使用协议》</text>
		</view>
		<view class="bottom-btn">
			<view class="btn">
				<view v-if="!loading" @click="submit">注册</view>
				<view v-else>提交中...</view>
			</view>
			<safe-bottom-x></safe-bottom-x>
		</view>
	</view>
</template>
<script>
import {
	loginRegister,
	regionList,
	sendSms
} from "@/api/api.js";
export default {
	name: 'enrollment',
	data() {
		return {
			tips: '',
			value: '',
			checked: false,
			loading: false,
			loadingPicker: false,
			show: false,
			columns: [
				[],
				[],
				[]
			],
			columnData1: {},
			columnData2: {},
			corporationsData: {
				name: "",
				mobile: "",
				code: "",
				password: "",
				data5: "",
				refereeMobile: "",
				data7: "",
				address: "",
				provinceId: "",
				cityId: "",
				areaId: "",
				refereeId: "", //推荐人Id
				inviterCode: "", //电话
			},
			refereeMobile: "",
			rules: {
				'name': {
					type: 'string',
					required: true,
					message: '姓名不能为空',
					trigger: ['blur', 'change']
				},
				'mobile': {
					type: 'string',
					required: true,
					message: '手机号不能为空',
					trigger: ['blur', 'change']
				},
				'code': {
					type: 'string',
					required: true,
					message: '验证码不能为空',
					trigger: ['blur', 'change']
				},
				'password': {
					type: 'string',
					required: true,
					message: '密码不能为空',
					trigger: ['blur', 'change']
				},
				'data5': {
					type: 'string',
					required: true,
					message: '密码不能为空',
					trigger: ['blur', 'change']
				},
				// 'refereeMobile': {
				// 	type: 'string',
				// 	required: true,
				// 	message: '密码不能为空',
				// 	trigger: ['blur', 'change']
				// },
				'data7': {
					type: 'string',
					required: true,
					message: '地址不能为空',
					trigger: ['change']
				},
				'address': {
					type: 'string',
					required: true,
					message: '详细地址不能为空',
					trigger: ['blur', 'change']
				},
			},
		};
	},
	onLoad(ope) {
		if (ope.inviterCode) {
			this.refereeMobile = ope.inviterCode
			this.corporationsData.refereeMobile = ope.inviterCode
		}

	},
	onShow() { },
	onHide() { },
	methods: {
		getrichText() {
			uni.navigateTo({
				url: "/subpackageA/pages/my/enrollment/agreement"
			})
		},
		changeHandler(e) {
			const {
				columnIndex,
				value,
			} = e
			// 当第一列值发生变化时，变化第二列(后一列)对应的选项
			this.regionList(this.columns, columnIndex + 1, {
				level: value[columnIndex].level + 1,
				parentId: value[columnIndex].id
			})
		},
		cancel() {
			this.show = false
		},
		// 回调参数为包含columnIndex、value、values
		confirm({
			value
		}) {
			console.log('value::: ', value);
			let str = ""
			value.forEach((item, index) => {
				if (str.length > 0) {
					str += '-';
				}
				str += item.name
				if (index == 0) {
					this.$set(this.corporationsData, 'provinceId', item.id)
				} else if (index == 1) {
					this.$set(this.corporationsData, 'cityId', item.id)
				} else if (index == 2) {
					this.$set(this.corporationsData, 'areaId', item.id)
				}

			})
			this.corporationsData.data7 = str
			this.show = false
		},
		data7Focus() {
			this.show = true;
			this.regionList(this.columns, 0)
		},
		regionList(arr, key, data = {
			level: 1,
			parentId: 0
		}) {
			const {
				parentId,
				level
			} = data
			if (level == 4) return
			regionList(data).then(res => {
				if (res.code == 0) {
					console.log(res);
					this.$set(arr, key, res.data)
					this.regionList(arr, key + 1, {
						level: level + 1,
						parentId: res.data[0].id
					})
				}
			})
		},
		submit() {
			if (!this.checked) {
				return uni.showToast({
					title: "请勾选协议",
					icon: "none"
				})
			}
			this.$refs["corporationsData"].validate().then(res => {
				if (this.corporationsData.password !== this.corporationsData.data5) {
					uni.$u.toast('两次密码不一致');
					return
				}
				this.loading = true;
				loginRegister(this.corporationsData).then(res => {
					setTimeout(() => {
						this.loading = false;
					}, 2000);
					if (res.code == 0) {
						console.log(res.data);
						uni.setStorageSync("token", res.data.token)
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000);
						uni.$u.toast('注册成功');

					} else {
						uni.$u.toast(res.msg)
					}
				})
			}).catch(errors => {
				this.loading = false;
				uni.$u.toast('校验失败')
			})
		},
		codeChange(text) {
			this.tips = text;
		},
		getCode() {
			if (!this.corporationsData.mobile) {
				uni.$u.toast('电话不能为空');
				return
			}
			if (this.$refs.uCode.canGetCode) {
				// 模拟向后端请求验证码
				uni.showLoading({
					title: '正在获取验证码'
				})
				sendSms({
					phone: this.corporationsData.mobile,
					type: 1
				}).then(res => {
					uni.hideLoading();
					if (res.code == 0) {
						this.$refs.uCode.start();

						uni.$u.toast('获取成功');
					} else {

						uni.$u.toast(res.msg);
					}
				})
			} else {
				uni.$u.toast('倒计时结束后再发送');
			}
		},
	},
	onPullDownRefresh() { },
	onReachBottom() { },
};
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


			::v-deep .u-textarea {
				background: #F3F5F6;
				border-radius: 12rpx;
			}
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
<template>
	<view class="box">
		<tito title="添加设备"></tito>
		<view class="conter">
			<u--form labelPosition="left" :model="userInfo" :rules="rules" ref="userForm" labelWidth="70"
				:labelStyle="{ fontSize: '28rpx', marginLeft: '10rpx' }">
				<u-form-item prop="code" label="设备ID" required>
					<view style="background: #F3F5F6;border-radius: 12rpx;">
						<u-input placeholder="请输入设备ID" v-model="userInfo.code">
							<template slot="suffix">
								<u-icon name="scan" size="28" @click="getQs"></u-icon>
							</template>
						</u-input>
					</view>

				</u-form-item>
				<!-- <u-form-item prop="passWord" label="设备密码">
					<view style="background: #F3F5F6;border-radius: 12rpx;">
						<u-input placeholder="请输入6位数字" type="password" border="surround"
							v-model="userInfo.passWord"></u-input>
					</view>
				</u-form-item> -->
				<u-form-item prop="addss" label="所在地区" required>
					<view style="background: #F3F5F6;border-radius: 12rpx; position: relative;">
						<u-input placeholder="省、市、区" suffixIcon="arrow-right" ref="data7"
							suffixIconStyle="color: #909399" v-model="userInfo.addss"></u-input>
						<view style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;z-index: 999999;"
							@click="areaNmaeFocus"></view>
					</view>
				</u-form-item>
				<u-form-item prop="address" label="详细地址" style="flex-direction: column;" required>
					<view style="background: #F0F3F5;border-radius: 12rpx;">
						<u-textarea v-model="userInfo.address" placeholder="小区、写字楼、门牌号等"></u-textarea>
					</view>
				</u-form-item>
			</u--form>
			<u-picker :show="show" :columns="columns" keyName="name" @confirm="confirm" @change="changeHandler"
				:loading="loadingPicker" @cancel="cancel"></u-picker>
		</view>
		<view class="bottom-btn">
			<view class="btn">
				<view @click="submit">添加设备</view>
			</view>
			<safe-bottom-x></safe-bottom-x>
		</view>
	</view>
</template>

<script>
import {
	productActivate,
	addressRegionList
} from "@/api/api.js"
export default {
	data() {
		return {
			userInfo: {
				code: '', //设备编号
				// passWord: '', //密码
				addss: "", //所在地区 
				address: '', //详细地址,
				provinceId: "", //省份id
				cityId: "", //城市id
				areaId: "", //区域id
			},
			show: false,
			columns: [
				[],
				[],
				[]
			],
			loadingPicker: false,
			rules: {
				'code': {
					type: 'string',
					required: true,
					message: '设备ID不能为空',
					trigger: ['blur', 'change']
				},
				// 'passWord': {
				// 	type: 'string',
				// 	required: true,
				// 	message: '设备密码不能为空',
				// 	trigger: ['blur', 'change']
				// },
				'addss': {
					type: 'string',
					required: true,
					message: '所在地区不能为空',
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
	onLoad(item) {
		if (item.q) {
			const url = decodeURIComponent(item.q)
			if (!uni.getStorageSync("token")) {
				uni.clearStorageSync()
				uni.showToast({
					title: "请先登录",
					icon: "none"
				})
				uni.reLaunch({
					url: "/pages/login/login?code=" + this.extractQueryParameter(url, "equipCode")
				})
			} else {
				this.userInfo.code = this.extractQueryParameter(url, "equipCode")
			}
		} else if (item.code) {
			this.userInfo.code = item.code
		}


	},
	methods: {
		extractQueryParameter(url, parameterName) {
			const regex = new RegExp(`[?&]${parameterName}=([^&]+)`);
			const match = url.match(regex);
			return match ? match[1] : null;
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
		//扫码
		getQs() {
			uni.scanCode({
				success: (res) => {
					const match = res.result
					if (match) {
						this.userInfo.code = this.extractQueryParameter(match, 'equipCode')
					} else {
						uni.$u.toast("无效二维码")
					}
				}
			})
		},
		cancel() {
			this.show = false
		},
		// 回调参数为包含columnIndex、value、values
		confirm({
			value
		}) {
			let str = ""
			value.forEach((item, index) => {
				if (str.length > 0) {
					str += '-';
				}
				str += item.name
				if (index == 0) {
					this.$set(this.userInfo, 'provinceId', item.id)
				} else if (index == 1) {
					this.$set(this.userInfo, 'cityId', item.id)
				} else if (index == 2) {
					this.$set(this.userInfo, 'areaId', item.id)
				}

			})
			this.userInfo.addss = str
			this.show = false
		},
		areaNmaeFocus() {
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
			addressRegionList(data,).then(res => {
				if (res.code == 0) {
					this.$set(arr, key, res.data)
					this.regionList(arr, key + 1, {
						level: level + 1,
						parentId: res.data[0].id
					})
				}
			})
		},
		submit() {
			this.$refs["userForm"].validate().then(res => {
				const data = { ...this.userInfo, code: 'https://water.cnjly.net/?equipCode=' + this.userInfo.code }
				console.log('data::: ', data);
				productActivate(data).then(res => {
					if (res.code == 0) {
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000);
						uni.$u.toast('添加成功');
					} else {
						uni.$u.toast(res.msg)
					}
				})
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
	<!-- ----------新增地址------------ -->
	<template>
		<view class="container">
			<view class="address_info">
				<view class="info_item name">
					<view class="text">收货人</view>
					<view class="input">
						<input type="text" placeholder="名字" v-model="userInfo.name">
					</view>
				</view>
				<view class="info_item tel">
					<view class="text">手机号码</view>
					<view class="input">
						<input type="number" placeholder="手机号码" maxlength="11" v-model="userInfo.phone">
					</view>
				</view>
				<view class="info_item address">
					<view class="text">收货地址</view>
					<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :range="range"
						range-key="name" @change="change" :value="indextex">
						<view class="input">
							<input type="text" placeholder="省市/区(县)" v-model="userInfo.address" :disabled="true"
								@input="InputEvent()">
						</view>
						<view class="location">
							<uni-icons type="right" size="20" color="#B1B2B2"></uni-icons>
						</view>
					</picker>
				</view>
				<view class="info_item address_detail">
					<view class="text">详细地址</view>
					<view class="textarea">
						<textarea cols="30" rows="10" placeholder="街道地址" v-model="userInfo.detailAddr"></textarea>
					</view>
				</view>
			</view>
			<!-- 设置默认地址 -->
			<view class="set">
				<view class="set_default">
					<view class="text">设为默认收货地址</view>
					<view class="switch">
						<switch default color="#2590FA" style="transform:scale(0.7)" @change="defaultAddress"
							:checked="userInfo.isDefault" />
					</view>
				</view>
			</view>
			<!-- 保存按钮 -->
			<view class="save_btn">
				<button @click="saveAddr()">保存</button>
			</view>
		</view>
	</template>

	<script>
		export default {
			data() {
				return {
					display: false, //隐藏删除收货地址
					currentID: null,
					addrValue: '', //地址
					userInfo: {
						name: '', //收件人
						phone: '', //电话
						detailAddr: '', //详细地址,
						addr: '', //省市区
						provinceId: '', //省id
						cityId: '', //市id,
						areaId: '', //县id
						provinceName: '',
						cityName: '',
						areaName: '',
						address: '',
						isDefault: false,
					},
					show: true,
					range: [
						[],
						[]
					], //地址范围
					code: '', //地址id
					isNoArea: false,
					indextex: [0, 0, 0],
				}
			},
			async onLoad(option) {
				await this.getAllAddr()
				if (option) {
					uni.setNavigationBarTitle({
						title: option.title
					})
					if (option.title != "添加地址") {
						this.currentID = option.id
						await this.getaddressdetail()
						console.log(this.currentID, '----------');
					}
				}
			},
			methods: {
				//地址详情
				async getaddressdetail() {
					await this.$request.get("/water-platform-app-api/customer/address/detail", {
						id: this.currentID
					}).then(res => {
						if (res.code == 0) {
							console.log(res, '地址详情');
							this.userInfo = res.data
							this.userInfo.phone = res.data.mobile
							this.userInfo.detailAddr = res.data.address
							this.userInfo.address = res.data.provinceName + "-" + res.data.cityName + "-" + res
								.data.areaName
							this.userInfo.isDefault = res.data.isdefault == 1 ? true : false
							console.log(this.userInfo, 'this.userInfo');
						}
					})
				},
				// 有数据触发事件
				InputEvent() {
					this.display = true
				},
				defaultAddress: function(e) {
					console.log('是否为默认收货地址', e.detail.value)
					this.userInfo.isDefault = e.detail.value
				},
				async getAllAddr() {
					await this.$request.get(
						"/water-platform-app-api/customer/address/regionList", {
							parentId: 0,
							level: 1,
						}
					).then(async res => {
						console.log(res, 'ress')
						this.range.unshift(res.data)
						await this.$request.get('/water-platform-app-api/customer/address/regionList', {
							parentId: res.data[0].id,
							level: 2,
						}).then(async cityres => {
							this.range.splice(1, 1, cityres.data);
							await this.$request.get(
								'/water-platform-app-api/customer/address/regionList', {
									parentId: cityres.data[0].id,
									level: 3,
								}
							).then(areares => {
								console.log(areares, 'ress')
								this.range.splice(2, 1, areares.data);
							})
						})
					})
				},
				change(e) {
					console.log(e, 'eee')
					console.log(this.range, 'range')
					//点击确认之后获取对应的省市区，因为这个picker本身没有做限制，比如选只选择一列数据，也是允许提交的，但是获取省市区的时候，因为没有选择区，所以我用三元运算符手动设置限制，如果没选择的话会获取到一个空
					let province = this.range[0][e.detail.value[0]] ? this.range[0][e.detail.value[0]].name : '';
					let city = this.range[1][e.detail.value[1]] ? this.range[1][e.detail.value[1]].name : '';
					let area = this.range[2][e.detail.value[2]] ? this.range[2][e.detail.value[2]].name : '';
					if (!(province && city && (area || this.isNoArea))) {
						uni.showToast({
							title: '请选择完整的省市区！',
							icon: 'none',
							duration: 2000
						})
					} else {
						if (this.isNoArea) {
							this.userInfo.address = province + "-" + city + "-" + area
							this.userInfo.provinceId = this.range[0][e.detail.value[0]].id
							this.userInfo.cityId = this.range[1][e.detail.value[1]].id
							this.userInfo.areaId = ''
							this.userInfo.provinceName = province
							this.userInfo.cityName = city
							this.userInfo.areaName = ''
						} else {
							this.userInfo.address = province + "-" + city + "-" + area
							this.userInfo.provinceId = this.range[0][e.detail.value[0]].id
							this.userInfo.cityId = this.range[1][e.detail.value[1]].id
							this.userInfo.areaId = this.range[2][e.detail.value[2]].id
							this.userInfo.provinceName = province
							this.userInfo.cityName = city
							this.userInfo.areaName = area
						}

					}
				},
				//核心代码，piker中的数据动态生成
				bindMultiPickerColumnChange(e) {
					this.code = this.range[e.detail.column][e.detail.value].id;
					console.log(e, this.code, 9999999999)
					if (e.detail.column == '0') {
						this.$request.get(
							'/water-platform-app-api/customer/address/regionList', {
								parentId: this.code,
								level: 2,
							}
						).then(res => {
							console.log(res, 'ress')
							this.indextex.splice(e.detail.column, 1, e.detail.value)
							this.indextex.splice(1, 1, 0)
							this.indextex.splice(2, 1, 0)
							this.range.splice(1, 1, res.data);
							//将第三列清空，不然如果选择了新的省，但是没有选择市的时候，那么区的数据就没有更新，此处清空区的数据，等市选择之后再把区的数据更新
							// this.range.splice(2, 1, []);
							this.$request.get(
								'/water-platform-app-api/customer/address/regionList', {
									parentId: res.data[0].id,
									level: 3,
								}
							).then(cityres => {
								this.range.splice(2, 1, cityres.data);
							})
						})
					} else if (e.detail.column == '1') {
						this.$request.get(
							'/water-platform-app-api/customer/address/regionList', {
								parentId: this.code,
								level: 3,
							}
						).then(res => {
							console.log(res, 'ress')
							this.indextex.splice(e.detail.column, 1, e.detail.value)
							this.indextex.splice(2, 1, 0)
							if (res.data.length == 0) {
								this.isNoArea = true
							}
							this.range.splice(2, 1, res.data);
						})
					}

				},
				// 保存地址信息 
				saveAddr() {
					const {
						name, //收件人
						phone, //电话
						detailAddr, //详细地址,
						provinceId, //省id
						cityId, //市id,
						areaId, //县id
						provinceName,
						cityName,
						areaName,
						address, //省市区
						isDefault,
						id,
						customerId,
					} = this.userInfo

					if (name == '') {
						uni.showToast({
							title: '请输入名字',
							icon: 'none'
						})
						return
					}
					if (!/^[1][3-9]\d{9}$/.test(phone)) {
						uni.showToast({
							title: '请输入正确手机号码',
							icon: 'none'
						})
						return
					}
					if (!address) {
						uni.showToast({
							title: '请选择省市区',
							icon: 'none'
						})
						return
					}
					if (!detailAddr) {
						uni.showToast({
							title: '请输入详细地址',
							icon: 'none'
						})
						return
					}
					let data = {
						name: name,
						mobile: phone,
						provinceId,
						cityId,
						areaId,
						provinceName,
						cityName,
						areaName,
						address: detailAddr,
						isdefault: isDefault ? 1 : 0,
						id,
						customerId,
					}
					console.log(data, 'data');
					//有this.currentID 就是修改地址 否则就是添加地址
					if (this.currentID) {
						this.$request.get("/water-platform-app-api/customer/address/update", data).then(res => {
							if (res.code == 0) {
								uni.showToast({
									title: '修改成功',
									icon: 'none'
								})
								uni.navigateBack()
							}
						})
					} else {
						delete data.id
						delete data.customerId
						this.$request.get(
							'/water-platform-app-api/customer/address/save', data).then(res => {
							console.log(res, 'resss')
							if (res.code == 0) {
								uni.showToast({
									title: '添加成功',
									icon: 'none'
								})
								uni.navigateBack()
							}
						})
					}
				}
			}
		}
	</script>

	<style lang="scss" scoped>
		.container {
			height: 100vh;
			background-color: #f6f6f6;
			padding: 32rpx;

			.address_info {
				width: 100%;
				height: 512rpx;
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
				}

				.address {
					position: relative;

					::v-deep .input-value-border {
						height: 72rpx;
						margin-left: 16rpx;
						border: none;
						background-color: #F6F6F6;
						border-radius: 16rpx;

					}

					::v-deep .selected-area {
						padding-left: 16rpx;
					}

					::v-deep .placeholder {

						font-size: 28rpx;
						font-family: PingFang-SC-Regular, PingFang-SC;
						font-weight: 400;
						color: #949494;
					}

					.location {
						width: 22rpx;
						height: 26rpx;
						position: absolute;
						top: 18rpx;
						right: 32rpx;
					}
				}

				.address_detail {
					.textarea {
						width: 494rpx;
						height: 150rpx;
						background: #F6F6F6;
						border-radius: 16rpx;
						padding: 16rpx 32rpx;
						box-sizing: border-box;
					}

					textarea {
						width: 100%;
						height: 100%;
					}

					::v-deep .uni-textarea-placeholder {
						font-size: 28rpx;
						font-family: PingFang-SC-Regular, PingFang-SC;
						font-weight: 400;
						color: #949494;
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
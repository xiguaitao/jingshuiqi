	<template>
		<view class="container">
			<view class="address_info">
				<view class="info_item name">
					<view class="text">设备编号</view>
					<view class="input">
						<input type="text" placeholder="设备编号" v-model="productId">
					</view>
				</view>
				<view class="salestype-check">
					<view class="salestype">
						售后类型
					</view>
					<view class="check">
						<u-radio-group v-model="userInfo.type">
							<u-radio :customStyle="{marginRight: '32rpx'}" size="14" v-for="(item, index) in typeList"
								:key="item.value" :label="item.text" :name="item.value" @change="radioChange">
							</u-radio>
						</u-radio-group>
					</view>
				</view>

				<view class="info_item">
					<view class="text">上门地址</view>
					<view class="input" v-if="!goodsConten">
						<view style="color: #B3B3B3;" @click="getaddress">
							请选择
						</view>
					</view>
					<view class="address-name-porn" v-else @click="getaddress">
						<view class="input-name">
							{{goodsConten.name}} {{goodsConten.mobile}}
							<uni-icons style="margin-left: 16rpx;" type="right" size="15" color="#B1B2B2"></uni-icons>
						</view>
						<view class="text">
							{{goodsConten.provinceName}} {{goodsConten.cityName}}{{goodsConten.areaName}}
							{{goodsConten.address}}
						</view>
					</view>
				</view>
				<view class="salestype-check">
					<view class="salestype">
						上传图片
					</view>
					<view class="file-picker">
						<upload :fileList="userInfo.images" @afterRead="afterRead" @deletePic="deletePic"></upload>
					</view>
				</view>
				<view class=" address_detail">
					<view class="text">详细地址</view>
					<view class="textarea">
						<textarea cols="30" rows="10" placeholder="请详细描述目前机器状态…" placeholder-style="font-size: 28rpx;" v-model="userInfo.address"></textarea>
					</view>
				</view>
			</view>
			<!-- 保存按钮 -->
			<view class="save_btn">
				<button @click="saveAddr()">提交售后</button>
			</view>
		</view>
	</template>

	<script>
		import {
			aftersalesSave
		} from "@/api/api.js"
		export default {
			data() {
				return {
					userInfo: {
						name: '', //设备编号
						type: 1, //售后类型
						images: [],
						addrss: "", //上门地址
						address: '', //详细地址,
					},
					typeList: [{
							text: '水机安装',
							value: 1,
							disabled: false
						},
						// {
						// 	text: '滤芯更换',
						// 	value: 2
						// },
						{
							text: '故障报修',
							value: 3,
							disabled: false
						},
						{
							text: '其他',
							value: 4,
							disabled: false
						}
					],
					goodsConten: null, //选择后的地址
					detailDate: {}, //设备信息
					productId: "", //设备id
				}
			},
			onLoad(ope) {
				if (ope.productId && ope.detailDate) {
					this.productId = ope.productId
					this.detailDate = JSON.parse(ope.detailDate)
				}
			},
			onShow() {
				uni.$once('getcbk', (data) => {
					console.log('监听到事件来自 getcbk ，携带参数为', data);
					this.goodsConten = data
				})
			},
			methods: {
				radioChange(n) {
					this.userInfo.type = n
				},
				getaddress() {
					uni.navigateTo({
						url: "/subpackageA/pages/device/myAddress/myAddress?myCenter=" + true
					})
				},
				//图片上传
				afterRead(e) {
					this.userInfo.images = [...this.userInfo.images, ...e]
					console.log(this.userInfo.images);
				},
				//文件从列表移除时触发
				deletePic({
					file
				}) {
					const index = this.userInfo.images.findIndex(item => item.url === file.url);
					if (index !== -1) {
						this.userInfo.images.splice(index, 1);
						console.log(this.userInfo.images);
					}
				},
				//提交售后
				async saveAddr() {
					if (!this.userInfo.name) {
						return uni.showToast({
							title: "设备编号不能为空！",
							icon: "none"
						})
					}
					if (this.goodsConten == null) {
						return uni.showToast({
							title: "地址不能为空！",
							icon: "none"
						})
					}
					const logs = this.userInfo.images.map(item => item.url).join(',');
					console.log(logs, "图片转完了");
					let data = {
						productCode: this.productId, //	设备编号
						type: this.userInfo.type, //售后类型: 1-水机安装, 2-滤芯更换, 3-故障报修, 4-其他
						addressId: this.goodsConten.id, // 客户地址id
						logos: logs, //图片(多张逗号分隔)
						suppliesId: "", //滤芯id
						remark: this.userInfo.address,
					}
					let res = await aftersalesSave(data)
					if (res.code == 0) {
						uni.showToast({
							title: "提交成功",
							icon: "none"
						})
						setTimeout(() => {
							uni.navigateBack()
						}, 1500)
					}
				}
			}
		}
	</script>

	<style lang="scss" scoped>
		.imagess {
			width: 100rpx !important;
			height: 100rpx !important;
		}

		.container {
			height: 100%;
			background-color: #f6f6f6;
			padding: 32rpx;

			.address_info {
				border-radius: 16rpx;
				padding: 32rpx 32rpx 18rpx 32rpx;
				box-sizing: border-box;
				background-color: #fff;

				.salestype-check {
					display: flex;
					align-items: center;
					margin-bottom: 32rpx;
					font-size: 28rpx;

					.salestype {
						font-family: PingFangSC-Regular, PingFang SC;
						color: #000000;
					}

					.check {
						margin-left: 4%;
						flex: 1;
					}

					.file-picker {
						margin-left: 8%;

					}

					::v-deep .uni-file-picker {
						margin-left: 8% !important;
					}

					::v-deep .u-upload__wrap {
						display: flex;
						flex-direction: initial;
						flex-wrap: nowrap;
					}
				}

				.address_detail {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.text {
						font-size: 28rpx;
						color: #2E3033;
					}

					.textarea {
						width: 494rpx;
						height: 150rpx;
						background: #F6F6F6;
						border-radius: 16rpx;
						padding: 16rpx 32rpx;
						box-sizing: border-box;
						margin-left: auto;
						margin-top: 16rpx;
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

				.info_item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
					margin-bottom: 32rpx;

					.address-name-porn {
						width: 494rpx;
						padding: 16rpx 32rpx;
						box-sizing: border-box;

						.input-name {
							font-size: 28rpx;
							color: #2E3033;
							margin-bottom: 16rpx;
						}

						.text {
							font-size: 24rpx;
							color: #616366;
						}
					}

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
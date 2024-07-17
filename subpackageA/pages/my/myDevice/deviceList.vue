<template>
	<view class='deviceList'>
		<view class="content">
			<view class="devicecod-number-online-normal">
				<view class="code">
					设备编号
				</view>
				<view class="number">
					{{ listData.code }}
				</view>
				<view class="online" :style="{ '--point ': listData.networkStatus == 1 ? '#FA6B05' : '#B1B2B2' }">
					{{ listData.networkStatus == 1 ? '在线' : '离线' }}
				</view>
				<view class="normal" :style="{ '--point ': listData.status == 1 ? '#2590FA' : '#FA4225' }">
					{{ listData.status == 1 ? '正常' : '异常' }}
				</view>
			</view>
			<view class="code-input">
				<view class="code">
					自定义名称
				</view>
				<view class="input">
					<input type="text" v-model="listData.remark" placeholder="请输入" placeholder-class="placeholder"
						@blur="getBlur" />
				</view>
			</view>
			<view class="code-text">
				<view class="code">
					设备品牌
				</view>
				<view class="text">
					{{ listData.brandName }}
				</view>
			</view>
			<view class="code-text">
				<view class="code">
					设备系列
				</view>
				<view class="text">
					{{ listData.sriesName }}
				</view>
			</view>
			<view class="code-text">
				<view class="code">
					设备型号
				</view>
				<view class="text">
					{{ listData.modelName }}
				</view>
			</view>
			<view class="code-text">
				<view class="code">
					剩余服务费
				</view>
				<view class="text money">
					￥{{ listData.leftNumber }}
				</view>
			</view>
			<view class="code-text">
				<view class="code">
					激活时间
				</view>
				<view class="text">
					{{ listData.startTime }}
				</view>
			</view>
			<view class="buttons">
				<view class="usedState"
					:style="{ '--color': listData.userStatus == 1 ? '#F3F5F6' : '#2590FA', '--textColor': listData.userStatus == 1 ? '#B1B2B2' : '#FFFFFF' }"
					@click="usedClick">
					{{ listData.userStatus == 1 ? '正在使用' : '使用' }}
				</view>
				<view class="shoho" @click="getshoho">
					申请售后
				</view>
				<view class="recharged" @click="getRecharge">
					充值
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'deviceList',
		props: {
			listData: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {};
		},
		methods: {
			usedClick() {
				if (this.listData.userStatus == 0) {
					console.log("使用");
					this.$emit("getuse", this.listData)
				}
			},
			getRecharge() {
				console.log("充值");
				this.$emit("getRecharge", this.listData)
			},
			//失焦
			getBlur() {
				this.$emit("getBlur", this.listData)
			},
			//售后
			getshoho() {
				this.$emit("getshoho", this.listData)
			}
		},
	};
</script>
<style lang="scss">
	.deviceList {
		.content {
			background: #FFFFFF;
			box-shadow: 0rpx 8rpx 20rpx 0rpx #F0F1F2;
			border-radius: 16rpx;
			margin: 24rpx 30rpx;
			padding: 24rpx;
			box-sizing: border-box;

			.code {
				color: #616366;
				font-size: 28rpx;
			}

			.devicecod-number-online-normal {
				display: flex;
				font-size: 28rpx;

				.code {
					color: #616366;
				}

				.number {
					color: #14171A;
					margin-left: 24rpx;
				}

				.online {
					font-size: 24rpx;
					color: #14171A;
					margin-left: auto;
					position: relative;

					&::after {
						content: "";
						width: 12rpx;
						height: 12rpx;
						background: var(--point);
						border-radius: 50%;
						position: absolute;
						left: -20rpx;
						top: 50%;
						transform: translateY(-50%);
					}
				}


				.normal {
					font-size: 24rpx;
					color: #14171A;
					margin-left: 44rpx;
					position: relative;

					&::after {
						content: "";
						width: 12rpx;
						height: 12rpx;
						background: var(--point);
						border-radius: 50%;
						position: absolute;
						left: -20rpx;
						top: 50%;
						transform: translateY(-50%);
					}
				}

			}

			.code-input {
				display: flex;
				align-items: center;
				margin-top: 24rpx;

				.input {
					margin-left: 24rpx;
					width: 272rpx;
					border-bottom: 2rpx solid #616366;
					font-size: 28rpx;
					color: #14171A;

					.placeholder {
						font-size: 28rpx;
						color: #B1B2B2;
					}
				}
			}

			.code-text {
				display: flex;
				align-items: center;
				margin-top: 24rpx;

				.text {
					margin-left: 24rpx;
					font-size: 28rpx;
					color: #14171A;
				}

				.money {
					color: #FA4225;
				}
			}

			.buttons {
				display: flex;
				justify-content: flex-end;

				view {
					width: 176rpx;
					height: 72rpx;
					background: var(--color);
					border-radius: 8rpx;
					margin-left: 24rpx;
					font-size: 28rpx;
					color: var(--text-color);
					text-align: center;
					line-height: 72rpx;
					margin-top: 24rpx;
				}

				.recharged {
					background: #FA6B05;
					color: #fff;
				}

				.shoho {
					border: 2rpx solid #1DABF2;
					color: #1DABF2;
					font-weight: 500;
					font-size: 28rpx;
				}
			}

		}
	}
</style>
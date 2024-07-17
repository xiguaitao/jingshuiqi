<template>
	<view class='cart-list'>
		<u-swipe-action>
			<u-swipe-action-item :options="options1" @click="click">
				<view class="list">
					<view class="image">
						<image :src="item.goodsLogo" mode="scaleToFill" style="height: 100%;width: 100%;"></image>
					</view>
					<view class="main">
						<view class="name">{{ item.goodsName }}</view>
						<view class="type" v-if="item.optionName">{{ item.optionName }}</view>
						<view class="number">
							<view class="text">{{ item.optionMoney || item.goodsMoney}}</view>
							<view class="right">
								<view class="number" v-if="!del">
									<number-box-x v-model="item.number" @change="change"></number-box-x>
								</view>
								<view class="del" v-else @click="dels">
									<u-icon name="minus" color="#fff" size="12"></u-icon>
								</view>
							</view>
						</view>
					</view>
				</view>
			</u-swipe-action-item>
		</u-swipe-action>
	</view>
</template>
<script>
	export default {
		name: 'cartList',
		props: {
			value: {
				type: Object,
				default: () => ({})
			},
			max: {
				type: Number,
			},
			min: {
				type: Number,
				default: 1
			},
			del: {
				type: Boolean,
				default: false
			},
		},
		model: {
			prop: "value",
			event: "input"
		},
		data() {
			return {
				options1: [{
					text: '删除',
					style: {
						backgroundColor: '#ff0000'
					}
				}],
				value1: 0,
				item: {}
			};
		},
		beforeCreate() {},
		created() {},
		beforeMount() {},
		mounted() {},
		methods: {
			click({
				index
			}) {
				this.$emit("getDelete", index, this.item, this.options1[index]);
			},
			change(item) {
				this.$emit("change", item, this.item);
			},
			dels() {
				this.$emit("del", this.item);
			},
		},
		watch: {
			value: {
				handler(newVal) {
					this.item = newVal;
				},
				immediate: true,
				deep: true
			},
			item: {
				handler(newVal) {
					this.$emit("input", newVal);
				},
				immediate: true,
				deep: true
			}
		}
	};
</script>
<style lang="scss">
	.cart-list {

		.list {
			background: #FFFFFF;
			border-radius: 16rpx;
			padding: 32rpx;
			box-sizing: border-box;
			display: flex;

			.checkbox {
				margin-right: 28rpx;
				height: 100%;
				display: grid;

			}

			.image {
				width: 168rpx;
				height: 168rpx;
				border-radius: 12rpx;
				margin-right: 16rpx;
			}

			.main {
				flex: 1;

				.name {
					font-family: PingFang SC, PingFang SC;
					font-weight: 500;
					font-size: 32rpx;
					color: #2E3033;
					line-height: 38rpx;
					margin-bottom: 18rpx;
				}

				.type {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #616366;
					line-height: 33rpx;
				}

				.number {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 8rpx;

					.text {
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #FA6B05;
						line-height: 33rpx;
					}

					.right {

						.del {
							display: inline-block;
							width: 36rpx;
							height: 36rpx;
							background-color: red;
							display: grid;
							place-content: center;
							border-radius: 4rpx;
						}
					}
				}
			}
		}
	}
</style>
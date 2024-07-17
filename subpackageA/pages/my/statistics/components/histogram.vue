<template>
	<view class='histogram'>
		<view class="histogram-item" v-for="item in list" :key="item.id" :class="{ choose: item.id == chooseInx }">
			<view class="histogram-item-up" @click="getChoose(item)">
				<view class="histogram-item-up-number">
					￥{{item.number}}
				</view>
				<view class="histogram-item-up-text" :style="{ height: item.height }"></view>
			</view>
			<view class="histogram-item-down">
				<view class="months">{{ item.months }}月</view>
				<view class="years">{{ item.years }}年</view>
			</view>
		</view>
	</view>
</template>
<script>
	// import TnCountTo from '@/uni_modules/tuniaoui-vue3/components/count-to/src/count-to.vue'
	export default {
		props: {
			days: {
				type: Array,
				default: []
			},
			moneys: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				list: [],
				chooseInx: null,
			};
		},
		mounted() {
			this.populateList(); //初始化数据
			setTimeout(() => {
				this.startAnimation();
				this.chooseInx = this.list[this.list.length - 1]?.id;
			}, 1500);
		},
		methods: {
			getChoose(e) {
				this.chooseInx = e.id
			},
			populateList() {
				if (this.days.length === 0 || this.moneys.length === 0) return;
				const maxMoney = Math.max(...this.moneys);
				this.list = this.days.map((day, index) => {
					const [year, month] = day.split('-');
					const money = this.moneys[index];
					const height = `${(money / maxMoney) * 100}%`;

					return {
						id: index + 1,
						number: 0,
						months: month,
						years: year,
						height: '0%', // 初始化为0
						targetHeight: height, // 保存计算出的目标高度
						targetNumber: money.toFixed(2) // 金额
					};
				});
			},
			startAnimation() {
				this.list = this.list.map(item => {
					item.height = item.targetHeight; // 设置为目标高度，触发过渡效果
					item.number = item.targetNumber; // 金额
					return item;
				});
			}
		}
	}
</script>
<style lang='scss' scoped>
	.histogram {
		display: flex;
		overflow: auto;

		.histogram-item {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: flex-start;


			.histogram-item-up {
				width: 100%;
				display: flex;
				justify-content: flex-end;
				flex-direction: column;
				align-items: center;
				border-bottom: 2rpx solid #AFE1FA;
				height: 400rpx;

				.histogram-item-up-number {
					font-family: PingFang SC, PingFang SC;
					font-weight: 500;
					font-size: 28rpx;
					color: #AFE1FA;
					line-height: 33rpx;
					margin-bottom: 16rpx;
				}

				.histogram-item-up-text {
					width: 40rpx;
					/* height: 100%; */
					background: #AFE1FA;
					border-radius: 8rpx 8rpx 0 0;
					transition: all 0.5s;
				}
			}

			.histogram-item-down {
				width: 100%;
				padding-top: 24rpx;
				box-sizing: border-box;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: #616466;
				line-height: 28rpx;
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;


				.months {
					margin-bottom: 18rpx;
				}

				.years {}
			}
		}

		.choose {

			.histogram-item-up {
				.histogram-item-up-number {
					color: #1DABF2;
				}

				.histogram-item-up-text {
					background: #1DABF2;
				}
			}

			.histogram-item-down {
				color: #14181A;
			}
		}
	}
</style>
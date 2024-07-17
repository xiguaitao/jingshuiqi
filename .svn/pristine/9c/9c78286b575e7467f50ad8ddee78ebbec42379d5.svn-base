<template>
	<view class='number-box-x'>
		<u-number-box v-model="number" :max="max" :min="min" @change="change">
			<view slot="minus" class="minus">
				<view class="diminish">-</view>
			</view>
			<text slot="input" class="input">{{ number }}</text>
			<view slot="plus" class="plus">
				<view class="add">+</view>
			</view>
		</u-number-box>
	</view>
</template>
<script>
export default {
	name: 'number-box-x',
	props: {
		value: {
			type: Number,
			default: 1
		},
		max: {
			type: Number,
			default: 999
		},
		min: {
			type: Number,
			default: 1
		},
	},
	model: {
		prop: "value",
		event: "input"
	},
	data() {
		return {
			number: 0,
		};
	},
	methods: {
		change(num) {
			this.$emit('input', num.value);
			this.$emit('change', num.value);
		},
	},
	watch: {
		value: {
			handler(newVal) {
				this.number = newVal;
			},
			immediate: true
		}
	}
};
</script>
<style lang="scss">
.number-box-x {
	display: flex;
	border: 2rpx solid #E4E5E6;
	border-radius: 12rpx;
	height: 44rpx;
	overflow: hidden;

	.minus {
		padding: 10rpx 14rpx;
		box-sizing: border-box;
		border-right: 2rpx solid #E4E5E6;
		display: grid;
		place-content: center;
		/* height: 44rpx; */

	}

	.input {
		font-size: 28rpx;
		width: 72rpx;
		text-align: center;
	}

	.plus {
		padding: 10rpx 14rpx;
		box-sizing: border-box;
		border-left: 2rpx solid #E4E5E6;
		display: grid;
		place-content: center;
		/* height: 44rpx; */

	}



}
</style>
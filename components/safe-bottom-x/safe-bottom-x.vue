<template>
	<view class='safe-bottom-x'></view>
</template>
<script>
export default {
	name: 'safe-bottom-x',
	data() {
		return {};
	},
	beforeCreate() { },
	created() { },
	beforeMount() { },
	mounted() { },
	methods: {},
	beforeUpdate: {},
	onReachBottom: {},
};
</script>
<style lang="scss">
.safe-bottom-x {
	padding-bottom: 0;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
}
</style>
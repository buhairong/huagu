<template>
	<u-mask
		:show="showIdentDialog"
		:custom-style="{
			width:'100vw',
			height:'100vh',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		}"
		@click="close"
	>
		<view class="mask-warp-div">
			<view class="mask-warp">
				<view class="title">未认证</view>
				<view class="text">请先完成认证</view>
				<view class="btn" @click="go2Sign">去认证</view>
			</view>
		</view>
	</u-mask>
</template>

<script>
export default {
	props: {
		showIdentDialog: {
			type: Boolean,
			default: false
		}
	},
	
	data() {
		return {
			
		}
	},
	
	methods: {
		go2Sign() {
			this.$u.route('/pages/mine/type?back=2')
			this.close()
		},
		
		close() {
			this.$emit('update:showIdentDialog', false)
		},
	},
}
</script>

<style lang="scss" scoped>
.mask-warp-div{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.mask-warp {
	background: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 168rpx 66rpx 86rpx 66rpx;
	width: 280px;
	height: 338px;
	border-radius: 8px;
	background: #FFFFFF;
	.title {
		font-size: 40rpx;
		color: #333333;
		line-height: 56rpx;
	}
	.text {
		padding-top: 16rpx;
		font-size: 24rpx;
		line-height: 34rpx;
		color: #999999;
	}
	.btn {
		height: 100rpx;
		border-radius: 16rpx;
		background: #31C37B;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 32rpx;
		font-weight: 500;
		color: #FFFFFF;
		margin-top: 160rpx;
		width: 100%;
	}
}
</style>
<template>
	<view class="wrap">
		<view class="header">
			<image
				style="width:320rpx;height:320rpx;"
				src="https://image.51cheyaoshi.com/xcx/app/static/home/face_icon.png"
			/>
			<view class="tip">拍摄实际用车人人脸，请确保正对手机且光线充足</view>
		</view>
		<view class="btn" @click="goSignPage">立即认证</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			type: null, // 5.个人 6.企业
			idNum: '',
			username: '',
		}
	},
	onLoad(options) {
		this.type = options.type
		this.idNum = options.idNum
		this.username = options.username
	},
	
	methods: {
		goSignPage() {
			this.$u.route(`/pages/mine/identity/face-identity?type=${this.type}&idNum=${this.idNum}&username=${this.username}`)
		},
	},
}
</script>

<style lang="scss" scoped>
.wrap {
	width: 100vw;
	height: 100vh;
	padding: 40px 40rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	.header {
		text-align: center;
	}
	.btn {
		width: 100%;
		height: 116rpx;
		border-radius: 16rpx;
		background: #0A0F2D;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 17px;
		color: #FFFFFF;
	}
	.tip {
		margin-top: 16px;
		height: 44rpx;
		font-size: 14px;
		line-height: 44rpx;
		color: rgba(10, 15, 45, 0.5);
	}
}
</style>
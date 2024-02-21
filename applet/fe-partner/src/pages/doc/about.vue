<template>
  <view class="page">
		<image
			style="width:150rpx;height:150rpx;"
			src="https://image.51cheyaoshi.com/xcx/partner/static/logo.png"
		/>
		<view class="title">关于全民合伙人</view>
		<view class="section">
			1.全民合伙人是WECARS旗下的众包模式分销平台，合伙人将WECARS上的产品推荐给身边有需要的人，成交后即可获得丰厚的佣金奖励。
		</view>
		<view class="section">
			2.当您身边朋友有购车需求时，您只需要把对应车型的订阅方案推荐给TA，注册成功后，您的客户列表就会看到新增一个客户。您还可以挑选您感兴趣的车型订阅方案，直接生成海报发在朋友圈当中，只要有朋友感兴趣，您就会获得新客户。
		</view>
		<view class="section">
			3.客户成交后，您将会在账户明细中看到一笔待入账的佣金记录，待客户提车后，商户会向平台支付您的分销佣金，收到佣金后平台会100%入账至您的账户余额中。
		</view>
		<view class="section">
			4.更多关于全民合伙人，请您在「战绩」- 点击左上角头像 -「常见问题」处查看。
		</view>
  </view>
</template>

<script>
export default {
	data() {
		return {
			
		}
	},
	
	methods: {
		
	},
	
	onLoad(options) {
		
	}
}
</script>

<style lang="scss" scoped>
.page {
	padding: 20px 72rpx 100rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	.title {
		margin-top: 16px;
		margin-bottom: 36px;
		height: 42rpx;
		font-size: 18px;
		line-height: 42rpx;
		color: #333333;
	}
	.section {
		margin-bottom: 30px;
		font-size: 14px;
		line-height: 42rpx;
		color: #666666;
	}
}
</style>

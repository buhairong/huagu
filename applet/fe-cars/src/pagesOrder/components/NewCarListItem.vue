<template>
	<view @click="go2detail(item.carTypeYearProductId, 1, item.id, item.carBrandId)">
			<view class="title">
				<view class="brand">{{ item.carBrand }} {{ item.carType }}</view>
				<view class="right">
					订阅仅需
					<view class="price">{{ item.monthPayment | $numFormat }}</view>
					<view class="unit">元/月</view>
				</view>
			</view>
			
			<view class="car-type">{{item.carTypeYear}} | {{item.carTypeYearProduct}}</view>
			
			<view class="container">
				<view class="left">
					<view class="left-item">厂商指导价：{{ item.guidancePrice | $transformNum }}</view>
					<view class="left-item">订阅周期：{{ item.monthTotal }}个月</view>
					<view class="left-item">期末可选：{{ item.finalSelectStr }}</view>
				</view>
				<view class="car-img">
					<image
						class="item-img"
						mode="aspectFill"
						:src="item.imageUrl"
					/>
				</view>
			</view>
	</view>
</template>

<script>
export default {
	props: {
		item: {
			type: Object,
			required: true,
		},
		
		cityId: {
			type: Number | String,
			required: true,
		},
	},
	
	data() {
		return {
			
		}
	},
	
	methods: {
		go2detail(id, qt, proId, carBrandId) {
			uni.navigateTo({
				url: `/pages/home/profile/index?id=${id}&proId=${proId}&cityId=${this.cityId}&qt=${qt}&carBrandId=${carBrandId}`
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.title {
	display: flex;
	justify-content: space-between;
	align-items: center;
	.brand {
		font-size: 28rpx;
		color: rgba(10, 15, 45, 0.8);
		font-weight: 500;
		line-height: 48rpx;
	}
	.right {
		padding-left: 20rpx;
		display: flex;
		align-items: baseline;
		font-size: 12px;
		color: #0A0F2D;
		.price {
			padding-left: 8rpx;
			color: #f51a4e;
			font-weight: 500;
			font-size: 34rpx;
		}
		.unit {
			color: #f51a4e;
		}
	}
}

.car-type {
	color: rgba(10, 15, 45, 0.5);
	font-size: 12px;
	line-height: 34rpx;
}

.container {
	position: relative;
	margin-top: 28rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.left {
		.left-item {
			margin-top: 4px;
			height: 34rpx;
			line-height: 34rpx;
			color: #64696f;
			font-size: 24rpx;
		}
		.left-item:first-child {
			margin-top: 0;
		}
	}
	
	.car-img {
		position: absolute;
		right: -30rpx;
		bottom: -30rpx;
		width: 350rpx;
		height: 160rpx;
		.default_img {
			border-radius: 16rpx;
			width: 100%;
			height: 100%;
		}
		.item-img {
			position: absolute;
			top: 0;
			left: 0;
			border-radius: 16rpx;
			width: 100%;
			height: 100%;
			background: #fff;
		}
	}
}
</style>
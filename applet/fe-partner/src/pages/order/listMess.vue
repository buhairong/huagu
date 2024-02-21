<template>
	<view class="listMessDiv">
		<view class="list-top">
			<view class="top-img">
				<img  :src="records.imageUrl" alt="">
			</view>
			<view class="top-mess">
				<text class="top-title">{{records.carBrand}} {{records.carType}}</text>
				<text>{{records.carTypeYear}}{{records.carTypeYearProduct}}</text>
				<ul	v-if="carType=='2'">
					<li>里程数 {{records.mileage}}公里</li>
					<li>车龄 {{records.regDateStr}}</li>
				</ul>
			</view>
			<view class="top-btn">
				{{stutasText(records.orderStatus)}}
			</view>
		</view>
		
		<view class="list-mess">
			<view class="mess">
				<view class="mess-title">
					<!-- <img  src="/static/home/rectangle.png" alt=""> -->
					<text class="img"></text>
					<text>订单详情</text>
				</view>
				<view class="messList">
					<view >
						<text>客户姓名</text>
						<text style="color: #333333;">{{records.customerName}}</text>
					</view>
					<view >
						<text>购车方式</text>
						<text style="color: #333333;">{{records.buyCarType}}</text>
					</view>
					<view >
						<text>佣金金额</text>
						<text style="color: #333333;">¥{{records.commissionAmount}}</text>
					</view>
				</view>
			</view>
		</view>
		
		
		<view class="list-mess">
			<view class="mess">
				<view class="mess-title">
					<!-- <img  src="/static/home/rectangle.png" alt=""> -->
					<text class="img"></text>
					<text>订单进度</text>
				</view>
				<view class="messList">
					<view class="progress" v-for="(v,i) in records.orderSchedule" :key="i">
						<view >
							<text class="round"></text>
							<text>{{v.orderStatus}}</text>
						</view>
						<text style="color: #999999;">{{v.updateTime}}</text>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
 export default{
	 data(){
		 return{
			 records:{},
			 carType:'',//新车  二手车
		 }
	 },
	 onLoad(options) {
		 console.log(options.carType,999);
		 this.carType=options.carType
	     this.getOrderList(options.id)
	 },
	 methods:{
		 async getOrderList(id) {
		   const res = await this.$getRequest(this.$url.orderDet, 'get', {
		     id:id
		   })
		   if(res.code==0){
				this.records=res.data
		   }
		 },
		 stutasText(v){
			if(v==0){
				return '待支付'
			}
			if(v==1){
				return '审核中'
			}
			if(v==2){
				return '待签约'
			}
			if(v==3){
				return '待付款'
			}
			if(v==4){
				return '待交车'
			}
			if(v==5){
				return '待结算'
			}
			if(v==7){
				return '已入账'
			}
			if(v==8){
				return '已取消'
			}
		 },
	 }
 }
</script>

<style lang="scss" scoped> 
.listMessDiv{
	width: 100%;
	height: 100%;
	.list-top{
		margin-top: 17px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding:0 16px;
		box-sizing: border-box;
		.top-img{
			width: 130px;
			height: 54px;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.top-mess{
			margin-left: 13rpx;
			display: flex;
			flex-direction: column;
			
			.top-title{
				height: 22px;
				font-family: PingFangSC-Medium;
				font-size: 15px;
				font-weight: 500;
				line-height: 22px;
				letter-spacing: 0px;
				color: #333333;
			}
			text{
				width: 146px;
				white-space: nowrap;
				overflow:hidden;
				text-overflow: ellipsis;
				-o-text-overflow:ellipsis;
				height: 20px;
				font-family: PingFangSC-Regular;
				font-size: 12px;
				font-weight: normal;
				line-height: 20px;
				letter-spacing: 0px;
				color: #666666;
			}
			ul{
				display: flex;
				li{
					height: 18px;
					display: flex;
					flex-direction: column;
					padding: 1px 2px;
					border-radius: 2px;
					background: #F5F6F7;
					font-family: PingFangSC-Regular;
					font-size: 10px;
					font-weight: normal;
					line-height: 16px;
					text-align: center;
					letter-spacing: 0px;
					color: rgba(10, 15, 45, 0.8);
					z-index: 0;
					margin-right: 4px;
				}
			}
		}
		.top-btn{
			
			margin-left: 7rpx;
			width: 60px;
			height: 54px;
			border-radius: 8px;
			box-sizing: border-box;
			border: 1px solid #197EF5;
			display: flex;
			align-items: center;
			justify-content: center;
			font-family: PingFangSC-Medium;
			font-size: 15px;
			font-weight: 500;
			line-height: 22px;
			letter-spacing: 0px;
			color: #197EF5;
			-webkit-text-stroke: #5F19F5 0px; /* 浏览器可能不支持 */
		}
	}
	.list-mess{
		padding: 0 16px;
		box-sizing: border-box;
		.mess{
			margin-top: 12px;
			// width: 343px;
			border-radius: 12px;
			background: #FFFFFF;
			padding: 20px 16px;
			box-sizing: border-box;
			box-shadow: 0px -2px 32px 0px rgba(10, 15, 45, 0.02),0px 8px 24px 0px rgba(10, 15, 45, 0.06);
			.mess-title{
				width: 100%;
				display: flex;
				margin-bottom: 16px;
				align-items: center;
				margin-bottom: 16px;
				.img{
					width: 2px;
					height: 14px;
					border-radius: 2px;
					background: #0AEB7D;
				}
				text{
					margin-left: 8px;
					height: 24px;
					font-family: PingFangSC-Medium;
					font-size: 17px;
					font-weight: 500;
					line-height: 24px;
					letter-spacing: 0px;
					color: #0A0F2D;
				}
			}
			.messList{
				view{
					margin-top: 8px;
					margin-left: 18px;
					display: flex;
					align-items: center;
					justify-content: space-between;
					text{
						height: 22px;
						font-family: PingFangSC-Regular;
						font-size: 14px;
						font-weight: normal;
						line-height: 22px;
						letter-spacing: 0px;
						color: #666666;
					}
				}
				.progress{
					margin-left: 0px;
					margin-top: 10px;
					margin-bottom: 0;
					view{
						display: flex;
						align-items: center;
						text{
							height: 20px;
							font-family: PingFangSC-Regular;
							font-size: 14px;
							font-weight: normal;
							line-height: 20px;
							letter-spacing: 0px;
							color: #393D3F;
						}
						.round{
							border-radius: 50%;
							width: 6px;
							height: 6px;
							background: #2FC079;
							margin-right: 8px;
						}
					}
					text{
						height: 20px;
						font-family: PingFangSC-Regular;
						font-size: 14px;
						font-weight: normal;
						line-height: 20px;
						letter-spacing: 0px;
						color: #999999;
					}
				}
			}
						
		}
	}
}

</style>
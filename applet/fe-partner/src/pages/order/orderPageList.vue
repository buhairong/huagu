<template>
	<view class="orderList">
		<view class="listTop">
			<view class="list-top-left">
				<ul>
					<li v-for="(v,i) in listText" :key="i" :class="carType==v.id?'liClass':''" @click='liClassFn(v.id)'
					>
						<img v-show="carType==v.id" src="https://image.51cheyaoshi.com/xcx/partner/static/order/subtract.png" alt="">
					{{v.text}}</li>
				</ul>
			</view>
			<view class="list-top-right">
				<view>
					<text @click='stutasFn()'>{{stutasText}}</text>
					<u-icon v-show="disText==false" name="arrow-down" color="#999999" size="28" @click='stutasFn()'></u-icon>
					<u-icon v-show="disText==true" name="arrow-up" color="#999999" size="28" @click='stutasFn()'></u-icon>
					<ul class="stutas-text"  v-show="disText==true">
						<li v-for="(v,i) in stutas" :key="i" @click='stateFn(v)'>{{v.text}}</li>
					</ul>
				</view>
			</view>
		</view>
		<view class="listCenter">
			<view class="listCenterDiv" @click="carmess(v)" v-for="(v,i) in records" :key="i">
				<view class="left-center">
					<view class="leftTitle">
						{{v.carBrand}} {{v.carType}} <text>{{v.buyCarType}}</text>
					</view>
					<text>{{v.carTypeYear}} {{v.carTypeYearProduct}} </text>
					<ul class='ulClass'>
						<li>订单状态：<text>{{stutasTextFn(v.orderStatus)}}</text></li>
						<li>客户姓名：<text>{{v.customerName}}</text></li>
					</ul>
				</view>
				<view class="right-center">
					<view class="rifhtTitle">
						分销佣金 <text>¥{{v.commissionAmount}}</text>
					</view>
					<view class="car-img">
						<u-image
						  border-radius="16"
						  mode="aspectFill"
						  width="220rpx"
						  height="180rpx"
						  :src="v.imageUrl"
						/>
					</view>
				</view>
			</view>
		</view>
		<u-loadmore
		  v-show="pageCount > 1"
		  :status="status"
		  :load-text="loadText"
		/>
	</view>
</template>

<script>
 export default{
	 data(){
		 return{
			 status: 'loadmore', // 加载更多 状态
			 loadText: {
				loadmore: '轻轻上拉',
				loading: '努力加载中',
				nomore: '实在没有了'
			 },
			 carType:1,//新车  二手车
			 listText:[
				 {id:1,text:'全新车'},
				 {id:2,text:'二手车'},
			 ],
			 stutas:[
				 {id:0,text:'待支付'},
				 {id:1,text:'审核中'},
				 {id:2,text:'待签约'},
				 {id:3,text:'待付款'},
				 {id:4,text:'待交车'},
				 {id:5,text:'待结算'},
				 {id:7,text:'已入账'},
				 {id:8,text:'已取消'},
			 ],
			 stutasText:'全部订单',
			 disText:false,//下拉框显示隐藏
			 page:1,//第一页
			 orderStatus:'',//订单状态
			 createIds:[],
			 id:'',
			 limit:10,//条数
			 operator:'',
			 sessionTenantId:0,
			 records:[],
			 pageCount:0,//总页数
		 }
	 },
	 onLoad() {
	     this.getOrderList()
	 },
	 onReachBottom() {
	   if(this.page >= this.pageCount) {
	     this.status = 'nomore';
	     return;
	   }
		this.status = 'loading';
		this.page++
		setTimeout(() => {
		  this.getOrderList()
		}, 2000)
	
	 },
	 methods:{
		stateFn(v){
			this.disText=false
			this.page=1
			this.stutasText=v.text
			this.records=[]
			this.orderStatus=v.id
			this.getOrderList()
		},
		liClassFn(v){
			this.carType=v
			this.stutasText='全部订单'
			this.page=1
			this.records=[]
			this.orderStatus=''
			this.getOrderList()
		 },
		 carmess(v){
			 this.$u.route("/pages/order/listMess?id="+v.id+`&carType=`+this.carType);
		 },
		 stutasFn(){
			 this.disText=!this.disText
		 },
		 stutasTextFn(v){
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
		 async getOrderList() {
		   const res = await this.$getRequest(this.$url.orderPagelist, 'POST', {
				page: this.page,
				carType:this.carType,
				createIds:this.createIds,
				limit:this.limit,
				operator:this.operator,
				orderStatus:this.orderStatus,
				sessionTenantId:this.sessionTenantId
		   })
		   if(res.code==0){
			 // this.records=res.data.records

			 if(res.data.records.length<1){
				this.records = res.data.records
			 }else{
				this.records = this.records.concat(res.data.records)
			 }
			 this.pageCount=res.data.pages
			 if(this.page >= this.pageCount) {
			   this.status = 'nomore';
			 }else{
				this.status = 'loadmore'
			 }
		   }
		},
	}
 }
</script>

<style lang="scss" scoped>
.orderList{
	width: 100%;
	height: 100%;
	padding: 0 16px;
	box-sizing: border-box;
	.listTop{
		margin-top: 10px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		.list-top-left{
			ul{
				display: flex;
				align-items: center;
				img{
					width: 10.62px;
					height: 16px;
				}
				li{
					height: 22px;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					font-weight: normal;
					line-height: 22px;
					text-align: center;
					letter-spacing: 0px;
					color: rgba(10, 15, 45, 0.8);
					margin-right: 16px;
				}
				.liClass{
					height: 25px;
					font-family: PingFangSC-Semibold;
					font-size: 17px;
					font-weight: 600;
					line-height: 25px;
					text-align: center;
					letter-spacing: 0px;
					color: #0A0F2D;
				}
			}
		}
		.list-top-right{
			position: relative;
			view{
				width: 80px;
				text{
					height: 20px;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					font-weight: normal;
					line-height: 20px;
					text-align: center;
					letter-spacing: 0px;
					color: #333333;
					margin-right: 9px;
				}
			}
			.stutas-text{
				width: 100px;
				text-align: center;
				position: absolute;
				background-color: #FFFFFF;
				z-index: 9999;
				li{
					text-align: center;
					height: 30px;
					line-height: 30px;
				}
			}
		}
	}
	.listCenter{
		margin-top: 16px;
		padding-bottom: 16px;
		width: 100%;
		.listCenterDiv{
			display: flex;
			// flex-direction: column;
			justify-content: space-between;
			padding: 20px 16px;
			justify-content: space-between;
			box-sizing: border-box;
			margin-bottom: 12px;
			height: 136px;
			border-radius: 12px;
			background: #FFFFFF;
			box-shadow: 0px -1px 24px 0px rgba(10, 15, 45, 0.04),0px 4px 24px 0px rgba(10, 15, 45, 0.04);
			.left-center{
				height: 100%;
				display: flex;
				flex-direction: column;
				.leftTitle{
					display: flex;
					align-items: center;
					height: 22px;
					font-family: PingFangSC-Medium;
					font-size: 16px;
					font-weight: 500;
					line-height: 22px;
					letter-spacing: 0px;
					color: #333333;
					text{
						margin-left: 8px;
						height: 16px;
						display: flex;
						flex-direction: column;
						padding: 0px 6px;
						border-radius: 2px;
						background: rgba(48, 194, 122, 0.1);
						font-family: PingFangSC-Medium;
						font-size: 11px;
						font-weight: 500;
						line-height: 16px;
						letter-spacing: 0px;
						color: #30C37B;
						z-index: 0
					}
				}
				text{
					height: 17px;
					font-family: PingFangSC-Regular;
					font-size: 12px;
					font-weight: normal;
					line-height: 17px;
					letter-spacing: -0.36px;
					color: #999999;
				}
				.ulClass{
					width: 100%;
					margin-top: 22px;
					li{
						height: 18px;
						font-family: PingFangSC-Regular;
						font-size: 12px;
						font-weight: normal;
						line-height: 18px;
						color: #666666;
						text{
							height: 18px;
							font-family: PingFangSC-Regular;
							font-size: 12px;
							font-weight: normal;
							line-height: 18px;
							text-align: center;
							letter-spacing: 0px;
							color: #333333;
						}
					}
				
				}
							
			}
			.right-center{
				height: 100%;
				.rifhtTitle{
					text-align: right;
					height: 18px;
					font-family: PingFangSC-Regular;
					font-size: 12px;
					font-weight: normal;
					line-height: 18px;
					letter-spacing: 0px;
					color: #666666;
					text{
						height: 22px;
						font-family: PingFangSC-Medium;
						font-size: 16px;
						font-weight: 500;
						line-height: 22px;
						letter-spacing: 0px;
						color: #EE3833;
						margin-left: 4px;
					}
				}
				.imgCalss{
					width: 126px;
					height: 58px;
					margin-top: 19px;
					img{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}

}
</style>

/**
 * 常量预设
 */
import dayjs from "dayjs"

/** 日期筛选条件常量设置 **/
const dateCondAll = [
  { id: 0, cateName: '今天', dateFrom: dayjs(new Date()).format('YYYY-MM-DD') },
  { id: 1, cateName: '昨天', dateFrom: dayjs(new Date()).subtract(1, 'day').format('YYYY-MM-DD') },
  { id: 2, cateName: '近7天', dateFrom: dayjs(new Date()).subtract(7, 'day').format('YYYY-MM-DD') },
  { id: 3, cateName: '近30天', dateFrom: dayjs(new Date()).subtract(30, 'day').format('YYYY-MM-DD') },
  { id: 4, cateName: '自定义', dateFrom: '', dateTo: '' }
]

/** 认证状态 **/
const auditStatusAll = {
  '0': '待审核',
  '1': '初审通过',
  '2': '初审拒绝',
  '3': '等待人工审核',
  '4': '复审拒绝',
  '5': '认证通过'
}

/** 用户认证筛选条件 **/
const userStatusCond = [
  { value: 0, name: '已注册' },
  { value: 1, name: '已认证' },
  { value: 2, name: '已成交' },
]

/** 订单状态**/
const orderStatusAll = [
  { value: 0, name: '待支付订金' },
  { value: 1, name: '待签约' },
  { value: 2, name: '待支付押金' },
  { value: 3, name: '采购中' },
  { value: 4, name: '待支付合约' },
  { value: 5, name: '待交车' },
  { value: 6, name: '用车中' },
  { value: 7, name: '合约结束' },
  { value: 8, name: '已取消' },
]

/** 账户余额状态 **/
const accountStatusAll = [
  { value: 0, name: '待支付' },
  { value: 1, name: '已支付' },
  { value: 2, name: '已取消' },
  { value: 3, name: '冻结中' },
]

/** 账户余额支付方式 **/
const accountPayTypeAll = [
  { value: 0, name: '账户充值' },
  { value: 1, name: '订单扣费' },
  { value: 2, name: '订单退款' },
  { value: 3, name: '订金支付' },
  { value: 4, name: '尾款支付' },
  { value: 5, name: '购买产品' },
]

// 能源方式
const powerModeAll = [
  { value: 1, name: '汽油' },
  { value: 2, name: '柴油' },
  { value: 3, name: '纯电' },
  { value: 4, name: '油电混合' },
  { value: 5, name: '插电混合' },
  { value: 6, name: '增程式混合' },
]

export {
  orderStatusAll,
  auditStatusAll,
  dateCondAll,
  userStatusCond,
  accountStatusAll,
  accountPayTypeAll,
	powerModeAll,
}
export const formatTenThousandNumber= (num, unit1='万', unit2='') => {
	let res = ''
	
	if (num || num == 0) {
		if (num < 10000) {
			res = num + unit2
		} else {
			if (num % 10000 === 0) {
				res = num / 10000 + unit1
			} else {
				if (num % 1000 === 0) {
					res = (num/10000).toFixed(1) + unit1
				} else {
					res = (num/10000).toFixed(2) + unit1
				}
			}
		}
	}
	
	return res
}

/**
 * 千分位格式化
 * @param n number
 */
export function formatThousandNumber(n) {
    n = Math.floor(n) // 只考虑整数
 
    const s = n.toString()
    const arr = s.split('').reverse()
    return arr.reduce((prev, val, index) => {
        if (index % 3 === 0) {
            if (prev) {
                return val + ',' + prev
            } else {
                return val
            }
        } else {
            return val + prev
        }
    }, '')
}

// 金额小于1万时，显示千分位+元
export function formatPrice(price) {
	let res = ''
	if(price || price == 0) {
		if (price > 10000) {
			res = formatTenThousandNumber(price)
		} else {
			res = `${formatThousandNumber(price)}元`
		}
	}
	
	return res
}

// 保证金
export function getDeposit(num) {
	if (!num) {
		if (num === 0) {
			return '减免保证金'
		} else {
			return '-'
		}
	} else {
		return `￥${formatThousandNumber(num)}`
	}
}
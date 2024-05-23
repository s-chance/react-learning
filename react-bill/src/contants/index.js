const billListData = {
    pay: [
        {
            type: 'foods',
            name: '餐饮',
            list: [
                { type: 'food', name: '餐费' },
                { type: 'drinks', name: '饮料' },
                { type: 'dessert', name: '甜品' },
            ],
        },
        {
            type: 'taxi',
            name: '交通',
            list: [
                { type: 'taxi', name: '打车' },
                { type: 'longdistance', name: '长途' },
            ],
        },
        {
            type: 'recreation',
            name: '娱乐',
            list: [
                { type: 'bodybuilding', name: '健身' },
                { type: 'game', name: '游戏' },
                { type: 'audio', name: '影音' },
                { type: 'travel', name: '旅行' }
            ],
        },
        {
            type: 'daily',
            name: '日常支出',
            list: [
                { type: 'clothes', name: '衣服' },
                { type: 'bag', name: '背包' },
                { type: 'book', name: '书籍' },
                { type: 'promote', name: '培训' },
                { type: 'home', name: '家庭用品' },
            ],
        },
        {
            type: 'other',
            name: '其他支出',
            list: [{ type: 'community', name: '社交开销' }],
        },
    ],
    income: [
        {
            type: 'professional',
            name: '工作收入',
            list: [
                { type: 'salary', name: '工资' },
                { type: 'overtimepay', name: '加班费' },
                { type: 'bonus', name: '奖金' },
            ],
        },
        {
            type: 'other',
            name: '其他收入',
            list: [
                { type: 'financial', name: '理财' },
                { type: 'gift', name: '礼物' },
            ],
        },
    ],
}

export const billTypeToName = Object.keys(billListData).reduce((prev, key) => {
    billListData[key].forEach(bill => {
        bill.list.forEach(item => {
            prev[item.type] = item.name
        })
    })
    return prev
}, {})
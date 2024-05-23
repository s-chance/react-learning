const Icon = ({ type }) => {

    const iconMap = [
        { food: 'https://www.iconninja.com/files/1006/532/1017/food-icon.svg' },
        { drinks: 'https://www.iconninja.com/files/800/707/678/tea-hot-drink-drink-coffee-icon.svg' },
        { longdistance: 'https://www.iconninja.com/files/528/878/506/taxi-icon.svg' },
        { game: 'https://www.iconninja.com/files/92/770/540/game-control-icon.png' },
        { salary: 'https://www.iconninja.com/files/340/421/114/currency-finance-financial-business-salary-money-coin-stroke-icon.svg' },
    ]
    return (
        <img
            src={iconMap.find(item => item[type])?.[type]}
            alt="icon"
            style={{
                width: 20,
                height: 20,
            }}
        />
    )
}

export default Icon
const Icon = ({ type }) => {

    const iconMap = [
        { food: 'https://www.iconninja.com/files/1006/532/1017/food-icon.svg' },
        { drinks: 'https://www.iconninja.com/files/800/707/678/tea-hot-drink-drink-coffee-icon.svg' },
        { dessert: 'https://www.iconninja.com/files/318/92/12/candy-icon.png' },
        { taxi: 'https://www.iconninja.com/files/590/279/586/cars-icon.png' },
        { longdistance: 'https://www.iconninja.com/files/528/878/506/taxi-icon.svg' },
        { bodybuilding: 'https://www.iconninja.com/files/926/746/540/running-icon.svg' },
        { game: 'https://www.iconninja.com/files/92/770/540/game-control-icon.png' },
        { audio: 'https://www.iconninja.com/files/933/823/623/audio-multitrack-icon.svg' },
        { travel: 'https://www.iconninja.com/files/530/365/180/travel-arrivals-icon.svg' },
        { clothes: 'https://www.iconninja.com/files/828/842/569/recycle-collection-clothes-clothing-icon.png' },
        { bag: 'https://www.iconninja.com/files/916/994/436/bag-icon.svg' },
        { book: 'https://www.iconninja.com/files/154/730/415/book-icon.png' },
        { promote: 'https://www.iconninja.com/files/997/261/177/tool-blacboard-whiteboard-chalkboard-academic-teach-knowledge-learning-academy-student-handdrawn-education-teaching-university-board-school-icon.svg' },
        { home: 'https://www.iconninja.com/files/463/372/902/home-icon.png' },
        { community: 'https://www.iconninja.com/files/553/367/602/human-speak-communicate-humans-icon.svg' },
        { salary: 'https://www.iconninja.com/files/340/421/114/currency-finance-financial-business-salary-money-coin-stroke-icon.svg' },
        { overtimepay: 'https://www.iconninja.com/files/627/469/96/money-icon.svg' },
        { bonus: 'https://www.iconninja.com/files/485/374/476/game-star-bonus-icon.svg' },
        { calendar: 'https://www.iconninja.com/files/724/88/879/calendar-icon.svg' },

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
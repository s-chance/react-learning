import classNames from "classnames"
import './index.scss'

const DayBill = () => {
    return (
        <div className={classNames('dailyBill')}>
            <div className="header">
                <div className="dateIcon">
                    <span className="date">{'05月11日'}</span>
                    <span className={classNames('arrow')}></span>
                </div>
                <div className="oneLineOverview">
                    <div className="pay">
                        <span className="type">支出</span>
                        <span className="money">{100}</span>
                    </div>
                    <div className="income">
                        <span className="type">收入</span>
                        <span className="money">{200}</span>
                    </div>
                    <div className="balance">
                        <span className="type">结余</span>
                        <span className="money">{100}</span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DayBill
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"
import { getBillList } from "@/store/modules/billStore"
import {
    BillOutline,
    AddCircleOutline,
    CalculatorOutline
} from 'antd-mobile-icons'
import { TabBar } from "antd-mobile"
import './index.scss'
import { useNavigate } from "react-router-dom"

const tabs = [
    {
        key: '/month',
        title: '月度账单',
        icon: <BillOutline />,
    },
    {
        key: '/new',
        title: '记账',
        icon: <AddCircleOutline />,
    },
    {
        key: '/year',
        title: '年度账单',
        icon: <CalculatorOutline />,
    }
]

const Layout = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBillList())
    }, [dispatch])

    // 切换菜单跳转路由
    const navigate = useNavigate()
    const switchRoute = (path) => {
        console.log(path);
        navigate(path)
    }
    return (
        <div className="layout">
            <div className="container">
                <Outlet />
            </div>
            <div className="footer">
                <TabBar onChange={switchRoute}>
                    {
                        tabs.map(item =>
                            <TabBar.Item key={item.key} title={item.title} icon={item.icon} />
                        )
                    }
                </TabBar>
            </div>
        </div>
    )
}

export default Layout
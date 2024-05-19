import { Link, Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <div>
            一级路由layout组件
            {/* 配置二级路由的出口 */}
            <Link to="/">面板</Link>
            <Link to="/about">关于</Link>
            <Outlet />
        </div>
    )
}

export default Layout
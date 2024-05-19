import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <div>
            <Outlet />
            this is Layout
        </div>
    )
}

export default Layout
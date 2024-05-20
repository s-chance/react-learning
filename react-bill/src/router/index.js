// 创建路由实例 绑定path、element
import Layout from "@/page/Layout"
import Month from "@/page/Month"
import New from "@/page/New"
import Year from "@/page/Year"
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Month />
            },
            {
                path: 'month',
                element: <Month />
            },
            {
                path: 'year',
                element: <Year />
            }
        ]
    },
    {
        path: '/new',
        element: <New />
    }
])

export default router